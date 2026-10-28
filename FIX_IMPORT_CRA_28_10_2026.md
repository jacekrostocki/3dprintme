# FIX — Create React App: import poza `src` (28.10.2026)

## Co było przyczyną błędu
`src/config.ts` importował `../content/brand-links.json`. Create React App 5 nie dopuszcza importowania plików spoza `src` — to błąd kompilacji niezależny od Firebase.

## Naprawa
- Przeniesiono **jedyne źródło** `brand-links.json` do `src/brand-links.json`.
- `src/config.ts` importuje teraz `./brand-links.json`.
- Generator statycznych podstron `scripts/generate-pages.js` czyta ten sam `src/brand-links.json`.
- `scripts/check-trustpilot.js` sprawdza teraz nową lokalizację oraz wykrywa przypadkową drugą kopię poza `src`.
- Dodano kontrolę `npm run check:cra-imports`, która sygnalizuje niedozwolone importy względne spoza `src`.
- Nie zmieniono CSS, treści artykułów ani formularzy.

## Jak przetestować
```bash
npm run check:cra-imports
npm run check:trustpilot
npm run check:static
npm start
```

Test `npm start` i `npm run build` musi być ostatecznie potwierdzony lokalnie w środowisku z zainstalowanymi zależnościami.

Uwaga: integracja Firebase i Turnstile nie jest potrzebna do kompilacji strony.
