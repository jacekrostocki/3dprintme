# 3DPrintMe — integracja profilu Trustpilot (28.10.2026)

## Zakres

Wdrożono **lekkie, bezpośrednie odwołanie do publicznego profilu Trustpilot** bez widgetów, zewnętrznego skryptu, API, odczytywania lub ręcznego zapisywania ocen.

- W stopce **strony głównej**, **wszystkich generowanych stron usługowych i poradników** oraz **polityki prywatności** dodano tekstowy link „Sprawdź 3DPrintMe w Trustpilot”. Otwiera się w nowej karcie, ma `rel="noopener noreferrer"`.
- Na stronie głównej, w generowanych danych `Organization` (JSON-LD), dodano `sameAs` z adresem profilu.
- Jedna wartość URL do użycia w React, generatorze HTML oraz Schema: `src/brand-links.json` (polityka prywatności ma dodatkowo literalny odnośnik, aby otwierała się także jako dokument statyczny).
- **Nie dodano** `Review`/`AggregateRating`, liczby recenzji, oceny numerycznej, znaków firmowych ani deklaracji „5 gwiazdek”. Dzięki temu nie publikujemy potencjalnie nieaktualnego wyniku ani nie sugerujemy, że własne recenzje zapewnią Google stars rich snippets.
- **Nie zmieniano CSS** (`src/site.css`, `public/site.css`, `public/footer-links.css`) ani layoutu mobile. Wykorzystano istniejącą klasę linku `text-link` i istniejącą kolumnę stopki.
- Brak kosztów infrastruktury i usług zewnętrznych. Brak zmian backendu Firebase, formularzy, routingu oraz poradników.

## Pliki źródłowe

- `src/brand-links.json` — jedyne źródło adresu Trustpilot dla kodu aplikacji i generatorów.
- `src/config.ts` — eksport `company.trustpilotUrl`.
- `src/App.tsx` — link w stopce React.
- `scripts/generate-pages.js` — link w stopkach stron statycznych.
- `content/privacy.html` — analogiczny link w statycznej polityce prywatności.
- `scripts/finalize-build.tsx` — `Organization.sameAs` w JSON-LD strony głównej, wstawiane podczas `npm run build` / `postbuild`.
- `scripts/check-trustpilot.js` — testy integralności linku i struktury.

## Weryfikacja lokalna

```bash
npm ci
npm run check:trustpilot
npm run check:local-seo
npm run check:editorial
npm run check:static
npm run check:forms
npm run build
npm start
```

> `npm start` nie dodaje JSON-LD (ten jest generowany przez `postbuild`). Po `npm run build` sprawdź `build/index.html` pod kątem `sameAs` oraz `https://pl.trustpilot.com/review/3dprintme.pl`. Również w statycznych plikach `build/poradnik/...` link powinien być widoczny.

### Wynik testów w dostarczonym środowisku

- `check:trustpilot` — PASS.
- `check:local-seo` — PASS.
- `check:editorial` — PASS, 492 kontrole.
- `check:static` — PASS, 201 kontroli.
- `check:forms` — PASS, 15 kontroli.
- Typowanie nowych odwołań sprawdzono przez transpile TS/TSX, **nie przez pełny build**.
- **Nie uruchomiono** pełnego `npm run build` ani testów przeglądarkowych, ponieważ w środowisku nie ma zależności `node_modules`.

## Strategia SEO — co dalej

Obecna zmiana zwiększa dostępność wiarygodnego, zewnętrznego źródła opinii dla potencjalnego klienta. **Nie jest gwarantowanym czynnikiem podnoszącym pozycję na „druk 3D Kraków”.** Ważniejsze dla map i wyszukiwania lokalnego są: realna i zweryfikowana obecność w Google Business Profile, spójne dane, autentyczne opinie Google oraz lokalne podstrony odpowiadające na rzeczywiste pytania klienta.

Poniższe obszary są niezależnymi zadaniami właściciela, nie zostały zautomatyzowane:
1. Uzupełnienie i ewentualna weryfikacja Google Business Profile, jeśli działalność kwalifikuje się do tego profilu; adres obsługi ujawniać wyłącznie zgodnie z zasadami Google.
2. Zapraszanie rzeczywistych klientów do **bezstronnego** wystawienia opinii po zakończeniu realizacji, bez wynagrodzeń lub nagród za pozytywną recenzję.
3. Porównywanie zapytań, CTR, pozycji i zgłoszeń w Google Search Console/Analytics (gdy zostaną skonfigurowane).

Źródła oficjalne:
- Google — Organization sameAs: https://developers.google.com/search/docs/appearance/structured-data/organization
- Google — self-serving reviews: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- Trustpilot — publiczny profil: https://pl.trustpilot.com/review/3dprintme.pl
