import brandLinks from "./brand-links.json";
// Ustaw REACT_APP_TURNSTILE_SITE_KEY w .env.local dopiero po konfiguracji backendu.
// W przeciwnym razie oba formularze korzystają z aplikacji pocztowej (bez automatycznego uploadu).
const siteKey = process.env.REACT_APP_TURNSTILE_SITE_KEY?.trim() || "";
export const company = {
  name: "3DPrintMe",
  email: "kontakt.3dprintme@gmail.com",
  phone: "",
  location: "Kraków",
  siteUrl: "https://3dprintme.pl",
  trustpilotUrl: brandLinks.trustpilot,
  turnstileSiteKey: siteKey,
  formEndpoint: siteKey ? "/api/inquiry" : "",
};
