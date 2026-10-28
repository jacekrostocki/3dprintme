# Zmiany w 3DPrintMe — 28 października 2026

## Cel
Lokalne SEO Kraków + szybsze pozyskiwanie zapytań bez publikowania duplikatu strony głównej. Zachowanie dotychczasowej szaty i responsywności.

## Wdrożone

- `src/App.tsx` — sekcja pierwszego ekranu: „Szybka wycena druku 3D — bez tracenia czasu”, łącze do formularza oraz stopka z czterema grupami: oferta, lokalność, wiedza i kontakt.
- `content/articles.json` — dziewiąty, autorski poradnik „Druk 3D w Krakowie — jak zamówić wydruk i umówić odbiór?”, o informacyjnej intencji lokalnej. Dodatkowo opisuje realną procedurę: kontakt, wycena, odbiór po wcześniejszym uzgodnieniu, wysyłka w Polsce. Nie deklaruje fikcyjnego adresu, gwarantowanego terminu wyceny ani liczby klientów.
- `scripts/generate-pages.js` — nowa strona poradnika + stopka na wszystkich stronach statycznych (w tym listing), bez duplikacji istniejących URL-i.
- `scripts/finalize-build.tsx` — obraz metadata dla nowego wpisu; sitemap dodaje go automatycznie w `postbuild`.
- `public/footer-links.css` — wyłącznie lokalne reguły stopki i bloku wyceny. **Główny plik `src/site.css` pozostaje niezmieniony.** Usunięto starą, nieużywaną regułę nadpisującą rozmiar logo w nagłówku.
- `content/privacy.html` — zgodna wizualnie stopka.
- `scripts/check-local-seo.js` i `package.json` — kontrola treści, linków, formularzy i responsywnych breakpointów.
- `TASKS.md` — status SEO-036–039.

## SEO — dlaczego nie druga strona usługowa
Strona główna już celuje w „druk 3D Kraków”. Artykuł nie jest kopią oferty, ale prowadzi użytkownika przez przygotowanie zamówienia i logistykę. Google nie obiecuje pozycji za samą obecność nazwy miasta — warto mierzyć wyniki w Search Console.

## Uruchomienie
```
npm ci
npm run check:local-seo
npm run check:editorial
npm run check:static
npm run check:forms
npm run build
npm start
```
W `npm start` zobaczysz widok strony React i wygenerowane artykuły w `public/`. Ostateczny plik sitemap i canonical powstają w `npm run build` / `postbuild`.

## Czego nie robiono
- Nie zmieniano dwóch formularzy ani konfiguracji Firebase.
- Nie usunięto ukrytego portfolio.
- Nie zmieniano oryginalnego arkusza `src/site.css` ani istniejących artykułów poza dodaniem dziewiątego.
- Nie przeprowadzono pełnego build React ani potwierdzonego testu wizualnego mobilnego; przeglądarka headless nie zakończyła renderowania w środowisku.
