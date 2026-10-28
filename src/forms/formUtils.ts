import { company } from "../config";

export const FILE_MAX_BYTES = 15 * 1024 * 1024;
export const ACCEPTED_EXTENSIONS = ["stl", "3mf", "obj", "step", "stp", "jpg", "jpeg", "png", "pdf"];

export function validateFile(file: File | null): string | null {
  if (!file) return null;
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  if (!ACCEPTED_EXTENSIONS.includes(ext)) return "Dopuszczalne formaty: STL, 3MF, OBJ, STEP, JPG, PNG, PDF.";
  if (file.size < 1) return "Wybierz niepusty plik.";
  if (file.size > FILE_MAX_BYTES) return "Maksymalny rozmiar pliku to 15 MB.";
  return null;
}
export function trackEvent(eventName: string) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & {gtag?: (...args: unknown[]) => void}).gtag;
  if (typeof gtag === "function") gtag("event", eventName, {event_category: "lead", page_location: window.location.pathname});
}
export function prepareEmail(subject: string, lines: string[], setStatus: (s:string)=>void) {
  if (!company.email) {setStatus("Kontakt e-mail jest chwilowo niedostępny.");return;}
  const body = lines.join("\n");
  window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setStatus("Otworzono szkic wiadomości w aplikacji pocztowej. Nic nie zostało jeszcze wysłane — wyślij wiadomość samodzielnie.");
}
export async function sendInquiry(data: FormData): Promise<string> {
  const abort = new AbortController();
  const timeout = window.setTimeout(() => abort.abort(), 60000);
  try {
    const response = await fetch(company.formEndpoint, {
      method: "POST", body: data, signal: abort.signal, credentials: "same-origin"
    });
    let result: {ok?: boolean; id?: string; error?: string} = {};
    try {result = await response.json();} catch { /* Nie pokazuj niekontrolowanych błędów HTML. */ }
    if (!response.ok || !result.ok || !result.id) throw new Error(result.error || `HTTP ${response.status}`);
    return result.id;
  } finally {window.clearTimeout(timeout);}
}
