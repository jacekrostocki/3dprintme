"use strict";
const crypto = require("node:crypto");
const Busboy = require("busboy");
const {onRequest} = require("firebase-functions/v2/https");
const {onSchedule} = require("firebase-functions/v2/scheduler");
const {defineSecret} = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore,Timestamp,FieldValue} = require("firebase-admin/firestore");
const {getStorage} = require("firebase-admin/storage");
const {MAX_FILE,clean,validateFields,validAttachment,safeName} = require("./validation");

initializeApp();
const db=getFirestore();
const resendKey=defineSecret("RESEND_API_KEY");
const turnstileKey=defineSecret("TURNSTILE_SECRET");
const rateSalt=defineSecret("RATE_LIMIT_SALT");
const MAX_BODY=17*1024*1024;
const REGION="europe-west1";
const RETENTION_DAYS=90;

function reject(res,status,error) {res.status(status).json({ok:false,error});}
function parseMultipart(req) {
  return new Promise((resolve,reject) => {
    const fields={};let file=null;let failure=null;let fileCount=0;
    let bb;
    try {bb=Busboy({headers:req.headers,limits:{fileSize:MAX_FILE,files:1,fields:20,parts:25,fieldSize:4000}});}
    catch {reject(new Error("Nieprawidłowy formularz multipart."));return;}
    bb.on("field",(name,value,info)=>{if(info.nameTruncated || info.valueTruncated) failure=new Error("Zbyt duże pole formularza.");fields[name]=value;});
    bb.on("file",(name,stream,info)=>{
      fileCount++;
      if (name!=="file" || fileCount>1) {failure=new Error("Niedozwolony załącznik.");stream.resume();return;}
      const chunks=[];let length=0;
      stream.on("data",chunk=>{length+=chunk.length;if(length<=MAX_FILE)chunks.push(chunk);});
      stream.on("limit",()=>{failure=new Error("Plik przekracza 15 MB.");});
      stream.on("end",()=>{if(length>0 && length<=MAX_FILE)file={name:info.filename,content:Buffer.concat(chunks)};});
    });
    bb.on("filesLimit",()=>{failure=new Error("Dołącz tylko jeden plik.");});
    bb.on("partsLimit",()=>{failure=new Error("Za dużo pól formularza.");});
    bb.on("fieldsLimit",()=>{failure=new Error("Za dużo pól formularza.");});
    bb.on("error",reject);
    bb.on("close",()=>failure?reject(failure):resolve({fields,file}));
    // Cloud Functions udostępnia oryginalne, niezmienione bajty żądania.
    bb.end(req.rawBody);
  });
}
async function verifyTurnstile(token,remoteIp) {
  if (!token||token.length>2048) return false;
  const form=new URLSearchParams({secret:turnstileKey.value(),response:token,remoteip:remoteIp});
  const abort=new AbortController();const timer=setTimeout(()=>abort.abort(),8000);
  try {
    const response=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
      method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:form,signal:abort.signal
    });
    if (!response.ok) return false;
    const json=await response.json();
    const allowed=(process.env.ALLOWED_HOSTNAMES||"3dprintme.pl,www.3dprintme.pl").split(",").map(x=>x.trim());
    return json.success===true && allowed.includes(json.hostname);
  } catch (e) {logger.warn("Turnstile verification unavailable",{message:e.message});return false;}
  finally {clearTimeout(timer);}
}
async function rateLimit(ip) {
  const today=new Date().toISOString().slice(0,10);
  const hash=crypto.createHash("sha256").update(`${rateSalt.value()}-${ip}`).digest("hex");
  const ref=db.collection("inquiry_rate_limits").doc(`${today}_${hash}`);
  await db.runTransaction(async tx=>{
    const snap=await tx.get(ref);
    const count=snap.exists ? Number(snap.get("count")) : 0;
    if (count>=12) throw new Error("RATE_LIMIT");
    tx.set(ref,{count:count+1,lastSeenAt:Timestamp.now(),expiresAt:Timestamp.fromMillis(Date.now()+3*86400000)}, {merge:true});
  });
}
async function sendEmail(inquiry,reference) {
  const to=process.env.NOTIFY_TO;
  const from=process.env.EMAIL_FROM;
  if (!to||!from) throw new Error("NOTIFY_TO/EMAIL_FROM not configured");
  const lines=[`Numer zgłoszenia: ${reference}`,`Typ: ${inquiry.type}`,`Imię: ${inquiry.name||"—"}`,`E-mail: ${inquiry.email}`];
  if(inquiry.type==="quote")lines.push(`Ilość: ${inquiry.quantity}`,`Materiał: ${inquiry.material}`,`Odbiór: ${inquiry.delivery}`);
  lines.push(`Opis / pytanie:\n${inquiry.message}`,inquiry.file ? `Załącznik (PRYWATNY): ${inquiry.file.name}\nŚcieżka w Firebase Storage: ${inquiry.file.path}` : "Bez załącznika.");
  const response=await fetch("https://api.resend.com/emails",{
    method:"POST",
    headers:{Authorization:`Bearer ${resendKey.value()}`,"Content-Type":"application/json"},
    body:JSON.stringify({from,to:[to],reply_to:inquiry.email,subject:`3DPrintMe – ${inquiry.type==="quote"?"nowa wycena":"pytanie"} [${reference}]`,text:lines.join("\n")})
  });
  if(!response.ok)throw new Error(`Resend HTTP ${response.status}`);
}

exports.submitInquiry=onRequest({
  region:REGION,timeoutSeconds:90,memory:"512MiB",maxInstances:5,concurrency:5,
  secrets:[resendKey,turnstileKey,rateSalt],
}, async (req,res)=>{
  res.set("Cache-Control","no-store");res.set("X-Content-Type-Options","nosniff");
  if(req.method!=="POST")return reject(res,405,"Użyj POST.");
  const origins=(process.env.ALLOWED_ORIGINS||"https://3dprintme.pl,https://www.3dprintme.pl").split(",").map(x=>x.trim());
  if(req.headers.origin && !origins.includes(req.headers.origin))return reject(res,403,"Niedozwolone pochodzenie.");
  if(!req.is("multipart/form-data"))return reject(res,415,"Oczekiwano multipart/form-data.");
  if(!Buffer.isBuffer(req.rawBody) || req.rawBody.length>MAX_BODY)return reject(res,413,"Żądanie jest za duże.");
  let parsed,inquiry;
  try {
    parsed=await parseMultipart(req);
    inquiry=validateFields(parsed.fields);
    if(inquiry.type==="contact" && parsed.file)throw new Error("Załączniki tylko w formularzu wyceny.");
    if(parsed.file) {
      validAttachment(parsed.file.name,parsed.file.content);
      parsed.file.name=safeName(parsed.file.name);
    }
  } catch(e) {return reject(res,400,clean(e.message,200));}
  const verified=await verifyTurnstile(clean(parsed.fields.turnstileToken,2048),req.ip||"unknown");
  if(!verified)return reject(res,403,"Weryfikacja antyspamowa nie powiodła się. Spróbuj ponownie.");
  try {await rateLimit(req.ip||"unknown");}
  catch(e){if(e.message==="RATE_LIMIT")return reject(res,429,"Zbyt dużo zapytań. Spróbuj później.");logger.error("Rate limit unavailable",e);return reject(res,503,"Serwer jest chwilowo niedostępny.");}
  const ref=db.collection("website_inquiries").doc();
  let attachment=null;
  try {
    if(parsed.file){
      const filename=parsed.file.name;
      const path=`website-inquiries/${ref.id}/${filename}`;
      await getStorage().bucket().file(path).save(parsed.file.content,{
        resumable:false,validation:"crc32c",metadata:{contentType:"application/octet-stream",contentDisposition:`attachment; filename=\"${filename.replace(/[\"\\]/g, "_")}\"`,cacheControl:"private, no-store"}
      });
      attachment={name:filename,path,size:parsed.file.content.length};
    }
    const record={...inquiry,attachment,source:"3dprintme.pl",createdAt:FieldValue.serverTimestamp(),
      expiresAt:Timestamp.fromMillis(Date.now()+RETENTION_DAYS*86400000),notificationStatus:"pending",status:"new"};
    await ref.set(record);
  } catch(e){
    logger.error("Inquiry persistence failed",e);
    if(attachment) {try {await getStorage().bucket().file(attachment.path).delete({ignoreNotFound:true});} catch{} }
    return reject(res,503,"Nie udało się bezpiecznie zapisać zapytania.");
  }
  try {
    await sendEmail({...inquiry,file:attachment},ref.id);
    await ref.update({notificationStatus:"sent"});
  } catch(e) {
    logger.error("Inquiry saved but email notification failed",{reference:ref.id,error:e.message});
    await ref.update({notificationStatus:"failed"}).catch(()=>{});
  }
  return res.status(201).json({ok:true,id:ref.id});
});

// Retencja: pliki usuń PRZED usunięciem metadanych Firestore.
// Nie ustawiaj osobnego TTL Firestore dla website_inquiries: zarządzamy tym tutaj.
exports.cleanupWebsiteInquiries=onSchedule({schedule:"every day 03:00",timeZone:"Europe/Warsaw",region:REGION},async()=>{
  const now=Timestamp.now();
  const expired=await db.collection("website_inquiries").where("expiresAt","<=",now).limit(100).get();
  for(const doc of expired.docs){
    const file=doc.get("attachment");
    try {
      if(file?.path)await getStorage().bucket().file(file.path).delete({ignoreNotFound:true});
      await doc.ref.delete();
    } catch(e){logger.error("Could not clean inquiry",{id:doc.id,error:e.message});}
  }
  const stale=await db.collection("inquiry_rate_limits").where("expiresAt","<=",now).limit(200).get();
  for(const doc of stale.docs)await doc.ref.delete();
});
