"use strict";
const path = require("node:path");
const MAX_FILE = 15 * 1024 * 1024;
const ALLOWED_EXT = new Set(["stl","3mf","obj","step","stp","jpg","jpeg","png","pdf"]);
const VALID_MATERIALS = new Set(["Nie wiem", "PLA", "PETG", "TPU", "Inny / do ustalenia"]);
const VALID_DELIVERY = new Set(["Do ustalenia", "Odbiór osobisty w Krakowie (po uzgodnieniu)", "Wysyłka"]);
function clean(value,max=3000) {
  if (typeof value !== "string") return "";
  return value.replace(/\r/g, "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0,max+1);
}
function validateFields(f) {
  if (!f || typeof f !== "object") throw new Error("Nieprawidłowe zgłoszenie.");
  const type=clean(f.formType,20);
  if (type !== "quote" && type !== "contact") throw new Error("Nieznany rodzaj formularza.");
  const name=clean(f.name,100);
  const email=clean(f.email,200);
  const message=clean(f.message,3000);
  if (name.length>100) throw new Error("Zbyt długa nazwa.");
  if (email.length>200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Podaj prawidłowy adres e-mail.");
  if (message.length<(type === "quote" ? 10 : 5) || message.length>3000) throw new Error("Nieprawidłowa długość wiadomości.");
  const result={type,name,email,message};
  if (type==="quote") {
    const quantity=Number(clean(f.quantity,8));
    if (!Number.isSafeInteger(quantity)||quantity<1||quantity>100000) throw new Error("Nieprawidłowa liczba sztuk.");
    const material=clean(f.material,60);
    const delivery=clean(f.delivery,100);
    if (!VALID_MATERIALS.has(material)||!VALID_DELIVERY.has(delivery)) throw new Error("Nieprawidłowy materiał lub dostawa.");
    Object.assign(result,{quantity,material,delivery});
  }
  return result;
}
function validAttachment(filename,bytes) {
  if (!Buffer.isBuffer(bytes)||bytes.length<1||bytes.length>MAX_FILE) throw new Error("Nieprawidłowy rozmiar pliku (maks. 15 MB).");
  const extension=path.extname(filename).toLowerCase().slice(1);
  if (!ALLOWED_EXT.has(extension)) throw new Error("Niedozwolony format pliku.");
  const ascii=bytes.subarray(0,Math.min(bytes.length,350)).toString("utf8").trimStart();
  const sig=(...b)=>b.every((v,i)=>bytes[i]===v);
  let ok=false;
  if (extension==="3mf") ok=sig(0x50,0x4b,0x03,0x04) || sig(0x50,0x4b,0x05,0x06);
  else if (extension==="png") ok=sig(0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a);
  else if (extension==="jpg" || extension==="jpeg") ok=sig(0xff,0xd8,0xff);
  else if (extension==="pdf") ok=bytes.subarray(0,5).toString()==="%PDF-";
  else if (extension==="step" || extension==="stp") ok=ascii.startsWith("ISO-10303-21;");
  else if (extension==="obj") ok=/^(?:#|v\s|o\s|g\s|f\s|mtllib\s)/m.test(ascii);
  else if (extension==="stl") {
    const count=bytes.length>=84?bytes.readUInt32LE(80):-1;
    const binaryValid=count>0 && 84+50*count===bytes.length;
    const asciiValid=/^solid(?:\s|$)/i.test(ascii) && /facet\s+normal/i.test(bytes.subarray(0,Math.min(bytes.length,10000)).toString("utf8"));
    ok=binaryValid || asciiValid;
  }
  if (!ok) throw new Error("Plik nie pasuje do deklarowanego formatu.");
  return extension;
}
function safeName(filename) {
  return path.basename(String(filename).replaceAll("\\","/")).replace(/[^\p{L}\p{N}._-]/gu,"_").slice(-120) || "plik";
}
module.exports={MAX_FILE,clean,validateFields,validAttachment,safeName};
