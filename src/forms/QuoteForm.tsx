import React, {useState} from "react";
import {company} from "../config";
import {prepareEmail,sendInquiry,trackEvent,validateFile} from "./formUtils";
import {TurnstileWidget} from "./TurnstileWidget";

export function QuoteForm() {
  const [status,setStatus] = useState("");
  const [sending,setSending] = useState(false);
  const [fileName,setFileName] = useState("");
  const [token,setToken] = useState("");
  const [resetCounter,setResetCounter] = useState(0);
  const [success,setSuccess] = useState(false);
  const online = Boolean(company.formEndpoint && company.turnstileSiteKey);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("");
    const quantity = Number(data.get("quantity"));
    if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 100000) {setStatus("Podaj prawidłową liczbę sztuk.");return;}
    const selectedFile = data.get("file");
    const file = selectedFile instanceof File && selectedFile.size > 0 ? selectedFile : null;
    const fileError = validateFile(file);
    if (fileError) {setStatus(fileError);return;}
    if (!online) {
      trackEvent("quote_email_intent");
      prepareEmail("Wycena wydruku 3D – 3DPrintMe", [
        `Imię / firma: ${data.get("name") || "Nie podano"}`,
        `E-mail: ${data.get("email")}`,
        `Liczba sztuk: ${data.get("quantity")}`,
        `Materiał: ${data.get("material")}`,
        `Odbiór: ${data.get("delivery")}`,
        `Opis projektu: ${data.get("message")}`,
        "\nPlik nie jest załączany automatycznie. Dołącz STL/3MF/zdjęcie w aplikacji pocztowej."
      ],setStatus);
      return;
    }
    if (!token) {setStatus("Dokończ weryfikację antyspamową przed wysłaniem.");return;}
    setSending(true);
    data.set("formType","quote");
    data.set("turnstileToken",token);
    try {
      const id = await sendInquiry(data);
      setStatus(`Zapytanie zostało zapisane. Numer: ${id}. Skontaktujemy się mailowo.`);
      setSuccess(true);
      form.reset();setFileName("");setToken("");setResetCounter(n=>n+1);
      trackEvent("quote_request_confirmed");
    } catch {
      setStatus("Nie udało się potwierdzić wysyłki. Spróbuj ponownie lub wyślij e-mail. Nie wysyłaj wielu kopii tego samego zgłoszenia.");
      setToken("");setResetCounter(n=>n+1);
    } finally {setSending(false);}
  }
  return <form onSubmit={submit} aria-label="Formularz wyceny druku 3D">
    <label htmlFor="quote-name">Imię lub nazwa firmy (opcjonalnie)<input id="quote-name" name="name" autoComplete="name" maxLength={100}/></label>
    <label htmlFor="quote-email">Adres e-mail *<input id="quote-email" name="email" type="email" autoComplete="email" required maxLength={200}/></label>
    <div className="form-row">
      <label htmlFor="quote-quantity">Liczba sztuk *<input id="quote-quantity" name="quantity" type="number" min="1" max="100000" defaultValue="1" step="1" required/></label>
      <label htmlFor="quote-material">Materiał<select id="quote-material" name="material" defaultValue="Nie wiem"><option>Nie wiem</option><option>PLA</option><option>PETG</option><option>TPU</option><option>Inny / do ustalenia</option></select></label>
    </div>
    <label htmlFor="quote-delivery">Odbiór<select id="quote-delivery" name="delivery" defaultValue="Do ustalenia"><option>Do ustalenia</option><option>Odbiór osobisty w Krakowie (po uzgodnieniu)</option><option>Wysyłka</option></select></label>
    <label htmlFor="quote-message">Opis projektu *<textarea id="quote-message" name="message" required minLength={10} maxLength={3000} rows={5} placeholder="Zastosowanie, wymiary, kolor, wymagana wytrzymałość i pasowanie..."/></label>
    <label htmlFor="quote-file">Plik STL / 3MF / OBJ / STEP lub zdjęcie (opcjonalnie, maks. 15 MB)
      <input id="quote-file" type="file" name="file" accept=".stl,.3mf,.obj,.step,.stp,.jpg,.jpeg,.png,.pdf" onChange={e=>setFileName(e.target.files?.[0]?.name || "")}/>
      {fileName && <span className="fine">Wybrano: {fileName}</span>}
    </label>
    {!online && <div className="upload-explainer"><strong>Wysyłka automatyczna jeszcze nieaktywna</strong><p>Formularz otworzy program pocztowy. Dołącz plik w wiadomości — samo wybranie pliku tutaj go nie wysyła.</p></div>}
    {online && <TurnstileWidget siteKey={company.turnstileSiteKey} onToken={setToken} onError={setStatus} resetCounter={resetCounter}/>}
    <p className="fine">Dane i pliki są wykorzystywane do obsługi zapytania. <a href="/prywatnosc.html">Polityka prywatności</a>.</p>
    <button className="button" type="submit" disabled={sending}>{sending ? "Wysyłanie…" : online ? "Prześlij projekt do wyceny ↗" : "Przygotuj e-mail do wyceny ↗"}</button>
    <p role="status" aria-live="polite" className="form-status">{status}</p>
    {online && !success && <p className="fine">Możesz też napisać bezpośrednio: <a href={`mailto:${company.email}`}>{company.email}</a>.</p>}
  </form>;
}
