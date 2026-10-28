import React, { useEffect, useRef } from "react";

type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
  reset: (id: string) => void;
};
declare global {interface Window {turnstile?: Turnstile;}}
let scriptPromise: Promise<void> | undefined;
function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("Brak przeglądarki"));
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve,reject) => {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true; script.defer = true;
      script.onload = () => window.turnstile ? resolve() : reject(new Error("Turnstile niedostępne"));
      script.onerror = () => reject(new Error("Nie udało się załadować ochrony antyspamowej"));
      document.head.appendChild(script);
    }).catch(error => {scriptPromise = undefined; throw error;});
  }
  return scriptPromise;
}
export function TurnstileWidget({siteKey,onToken,onError,resetCounter}: {
  siteKey: string; onToken:(token:string)=>void; onError:(message:string)=>void;resetCounter:number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  useEffect(() => {
    let active = true;
    loadTurnstile().then(() => {
      if (!active || !host.current || !window.turnstile) return;
      widgetId.current = window.turnstile.render(host.current, {
        sitekey: siteKey, theme: "auto", size: "compact",
        callback: (token:string) => onToken(token),
        "expired-callback": () => onToken(""),
        "error-callback": () => { onToken(""); onError("Nie udało się zweryfikować formularza. Spróbuj ponownie lub skorzystaj z e-maila."); },
      });
    }).catch(() => {if (active) onError("Ochrona antyspamowa jest niedostępna. Możesz skorzystać z e-maila.");});
    return () => {
      active = false;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
    // Stabilizujemy instancję widgetu na czas życia komponentu.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);
  useEffect(() => {
    if (widgetId.current && window.turnstile && resetCounter) window.turnstile.reset(widgetId.current);
  },[resetCounter]);
  return <div><div ref={host} aria-label="Weryfikacja antyspamowa"/><p className="fine">Zabezpieczenie przed spamem: Cloudflare Turnstile.</p></div>;
}
