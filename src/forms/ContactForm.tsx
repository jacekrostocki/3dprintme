import React,{useState} from "react";
import {company} from "../config";
import {prepareEmail,sendInquiry,trackEvent} from "./formUtils";
import {TurnstileWidget} from "./TurnstileWidget";

export function ContactForm() {
  const [status,setStatus]=useState("");
  const [sending,setSending]=useState(false);
  const [token,setToken]=useState("");
  const [resetCounter,setResetCounter]=useState(0);
  const online=Boolean(company.formEndpoint && company.turnstileSiteKey);
  async function submit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();if(sending)return;
    const form=event.currentTarget;
    const data=new FormData(form);
    setStatus("");
    if(!online) {
      trackEvent("contact_email_intent");
      prepareEmail("Pytanie do 3DPrintMe",[
        `Imię: ${data.get("name") || "Nie podano"}`,
        `E-mail: ${data.get("email")}`,
        `Pytanie: ${data.get("message")}`
      ],setStatus);
      return;
    }
    if(!token){setStatus("Dokończ weryfikację antyspamową przed wysłaniem.");return;}
    setSending(true);
    data.set("formType","contact");data.set("turnstileToken",token);
    try {
      const id=await sendInquiry(data);
      setStatus(`Wiadomość została zapisana. Numer: ${id}. Dziękujemy za kontakt.`);
      form.reset();setToken("");setResetCounter(n=>n+1);
      trackEvent("contact_request_confirmed");
    } catch {
      setStatus("Nie udało się potwierdzić wysłania wiadomości. Możesz napisać bezpośrednio na e-mail.");
      setToken("");setResetCounter(n=>n+1);
    } finally {setSending(false);}
  }
  return <form onSubmit={submit} aria-label="Formularz kontaktowy – pytania ogólne">
    <label htmlFor="contact-name">Imię (opcjonalnie)<input id="contact-name" name="name" autoComplete="name" maxLength={100}/></label>
    <label htmlFor="contact-email">Adres e-mail *<input id="contact-email" type="email" name="email" autoComplete="email" maxLength={200} required/></label>
    <label htmlFor="contact-message">Twoje pytanie *<textarea id="contact-message" name="message" rows={4} required minLength={5} maxLength={3000} placeholder="W czym możemy pomóc?"/></label>
    {online && <TurnstileWidget siteKey={company.turnstileSiteKey} onToken={setToken} onError={setStatus} resetCounter={resetCounter}/>}
    <p className="fine">Informacje wykorzystamy wyłącznie do obsługi wiadomości. <a href="/prywatnosc.html">Polityka prywatności</a>.</p>
    <button className="button" type="submit" disabled={sending}>{sending ? "Wysyłanie…" : online ? "Wyślij pytanie ↗" : "Przygotuj e-mail ↗"}</button>
    <p role="status" aria-live="polite" className="form-status">{status}</p>
  </form>;
}
