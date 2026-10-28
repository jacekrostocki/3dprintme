# NAJNOWSZA AKTUALIZACJA — 27.10.2026: DWA FORMULARZE

Najpierw otwórz **`FIREBASE_FORMULARZE_SETUP.md`**: zawiera aktualne komponenty Firebase, konfigurację sekretnych kluczy, kroki wdrożenia i testy.

**Uwaga:** poniższa treść opisuje stan wcześniejszej wersji. Backend formularzy został teraz dodany do `functions/`, lecz nie jest wdrożony ani przetestowany w Firebase. Style CSS i responsywność pozostały niezmienione.

---

# 3DPrintMe — zmodyfikowany kod (27.10.2026)

To zaktualizowany projekt źródłowy przygotowany na podstawie dostarczonej kopii strony. **Nie jest to gotowy, przetestowany build produkcyjny.** Publiczny serwis nie został przeze mnie zmieniony.

## Co jest gotowe

- Nowe logo i favicon SVG/PNG, wersja na jasne i ciemne tło: `public/img/logo-new*`, `public/img/brand-icon.svg`, `public/img/favicon.svg`.
- Rozbudowana strona główna: sekcje ofertowe, lokalne, FAQ, autorski projekt RÅSKOG, CTA oraz formularz zapytania.
- Usunięty slider niezweryfikowanych opinii.
- 8 nowych statycznych podstron w `content/service-pages.json`, generowanych przez `scripts/generate-pages.js`; linkowane ze strony głównej.
- Aktualizacja 3 istniejących artykułów SEO bez duplikowania adresów URL.
- Rozszerzona konfiguracja SSR/metadanych, JSON-LD, canonical i sitemap w `scripts/finalize-build.tsx`.
- `TASKS.md` i `_seo-agent-input/01_TASKS/tasks.json` ze szczegółowymi statusami zadań.

## Jak wdrożyć lokalnie na swoim komputerze

1. Użyj nowego brancha Git; zachowaj oryginalną kopię i swoje aktualne `public/fonts/` — **fonty nie są dołączone do archiwum zwrotnego**, pozostają w twojej oryginalnej kopii projektu.
2. Przenieś zmodyfikowane pliki na ten branch, zachowując oryginalne `public/fonts/`.
3. `npm ci`
4. `npm run check:static` — lokalne testy generatora.
5. `npm run build` — generuje React bundle, HTML z SSR, pliki canonical i sitemap.xml. Polecenie uruchamia `postbuild` automatycznie.
6. Przegląd `build/index.html`, `build/poradnik/`, `build/realizacje/`, `build/czesci-zamienne-druk-3d/`, `build/sitemap.xml`, `build/robots.txt` oraz wyniki mobile/desktop i PageSpeed.
7. Po akceptacji zmian: `firebase deploy --only hosting` (wykonaj samodzielnie).

**W obecnym środowisku `npm ci` nie zadziałał z powodu niedostępności rejestru npm (EAI_AGAIN), więc nie potwierdziłem pełnego React builda ani testów przeglądarkowych.** Syntax TSX i generator 139 kontroli statycznych zaliczone.

## Formularz i dane klientów

Brak skonfigurowanego backendu do uploadu; `src/config.ts` ma celowo pusty `formEndpoint`. Formularz przygotowuje wiadomość w domyślnym programie pocztowym. Klient sam dołącza plik. Nie ustawiaj `formEndpoint` bez bezpiecznego backendu oraz weryfikacji polityki prywatności i powiadomień.

W kodzie istnieje ścieżka POST `multipart/form-data` po skonfigurowaniu endpointu, ale produkcyjne reguły plików i zabezpieczeń muszą być wymuszane po stronie backendu. Sam frontend nie stanowi zabezpieczenia.

## Portfolio

Tekst projektu RÅSKOG opiera się na dostępnych opisach, ale zdjęcia w materiałach przekazanych wcześniej to również kolaże i grafiki prezentacyjne. **Nie prezentujemy ich jako nieedytowanych zdjęć z produkcji.** W kodzie portfolio jest czytelny schemat, a dokumentacyjne zdjęcia trzeba dołączyć po weryfikacji. Zob. `DESIGN_REFERENCES/portfolio-zdjecia-DO_WERYFIKACJI.md`.

## Nie ukończono

- Backend uploadu, prywatny storage, antyspam, sekret API i powiadomienia.
- Kalkulator ceny (brak parametrów kosztowych); świadomie odroczony.
- Publikacja i weryfikacja Google Business Profile, autentyczne opinie, GSC.
- Pełny build, kontrola mobilna w przeglądarce, wdrożenie na hosting.

Aktualna lista zadań w `TASKS.md`.
