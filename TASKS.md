# TASKS — rzeczywisty stan wdrożenia 27.10.2026

Oznaczenie **DONE** oznacza zmianę przygotowaną w kodzie, **nie opublikowaną na Firebase**. Status **PARTIAL** oznacza wdrożoną część bez pełnej weryfikacji/zdjęć/backendu. **BLOCKED_OWNER** wymaga danych właściciela, **BLOCKED_ENV** — instalacji pakietów i testu lokalnego.

**Aktualizacja formularzy (27.10, druga iteracja):** SEO-019 nadal PARTIAL (UI i backend napisane, usługi niewdrożone). Dodano SEO-026–SEO-029. Poprzednie zestawienie liczby zadań dotyczyło tylko SEO-001–SEO-025.

**Aktualizacja 28.10.2026:** Portfolio zostało celowo wycofane z publikowanego UI i sitemap. SEO-010 oraz SEO-011 pozostają w kodzie jako materiał do późniejszego przywrócenia (nie oznaczamy ich jako ukończonych publicznie). Przeredagowano 5 dotychczasowych artykułów i dodano 3 nowe.

## Lista zadań (wykonane przekreślone)

- [ ] SEO-001 — S0 Audyt repo, mapa routingu i baseline — **PARTIAL**. Rozpoznano rzeczywiste CRA+SSR w postbuild, hosting, URL, meta i artykuły; bazowego builda nie wykonano z braku npm.
- [x] ~~SEO-002 — Usunięcie fikcyjnych opinii i niepotwierdzonych claimów~~ — **DONE**. Usunięto sześć niezweryfikowanych opinii i automatyczny slider; nie dodano fikcyjnych rekomendacji.
- [x] ~~SEO-003 — Title, description, H1, nagłówki i CTA strony głównej~~ — **DONE**. Zaktualizowano H1, title, meta description, ofertę i CTA, zachowano naturalny język.
- [x] ~~SEO-004 — Lokalne informacje o Krakowie i obsłudze zamówień~~ — **DONE**. Zaktualizowano komunikację lokalną, kontakt, odbiór po umówieniu i wysyłkę, bez publikacji adresu prywatnego.
- [x] ~~SEO-005 — Przejrzysta sekcja FAQ i linkowanie do zleceń~~ — **DONE**. Dodano semantyczne FAQ (details/summary) i linki do wyceny i usług.
- [ ] SEO-006 — Menedżer SEO: per-route metadata i kanoniczne URL — **PARTIAL**. Rozbudowano pipeline unikalnych meta/title i canonical per URL; działanie postbuild wymaga pełnego React build.
- [ ] SEO-007 — robots.txt, sitemap.xml i weryfikacja indeksacji — **PARTIAL**. Rozszerzono generator sitemap o 8 adresów, robots działa w pipeline; weryfikacja GSC po publikacji.
- [ ] SEO-008 — Dane strukturalne firmowe i artykułów — **PARTIAL**. JSON-LD Organization/WebSite/Service, Article i BreadcrumbList w finalize-build; test rich results po build.
- [ ] SEO-009 — Optymalizacja obrazów i Core Web Vitals — **PARTIAL**. Logo SVG, favicon, małe obrazy WebP, lazy-loading, rozmiary obrazów, alt i reduced-motion; brak pomiaru CWV/PSI.
- [ ] SEO-010 — Portfolio i katalog realizacji — **PAUSED / HIDDEN**. Sekcja wycofana z home, nawigacji oraz indeksacji do czasu posiadania dokumentacyjnych zdjęć. Kod i treści zachowano.
- [ ] SEO-011 — Case study odbojnika IKEA RÅSKOG — **PAUSED / HIDDEN**. Tekst zachowany, podstrona noindex do czasu zatwierdzenia zdjęć i publikacji portfolio.
- [x] ~~SEO-012 — Podstrona /czesci-zamienne-druk-3d/~~ — **DONE**. Dodano statyczną, indeksowalną /czesci-zamienne-druk-3d/ z ofertą, ograniczeniami i CTA.
- [x] ~~SEO-013 — Podstrona /prototypowanie-3d/~~ — **DONE**. Dodano statyczną /prototypowanie-3d/ z opisem metody i CTA.
- [x] ~~SEO-014 — Podstrona /druk-3d-male-serie/~~ — **DONE**. Dodano statyczną /druk-3d-male-serie/ z SEO i CTA.
- [x] ~~SEO-015 — Podstrona /projektowanie-modeli-3d/~~ — **DONE**. Dodano statyczną /projektowanie-modeli-3d/ z warunkowym opisem zakresu, bez obietnic.
- [x] ~~SEO-016 — Nowy poradnik: PLA, PETG czy TPU?~~ — **DONE**. Rozszerzono istniejący artykuł PLA/PETG/TPU, bez tworzenia konkurencyjnego duplikatu URL.
- [x] ~~SEO-017 — Nowy poradnik: Jak przygotować plik STL do wyceny~~ — **DONE**. Rozszerzono istniejący artykuł o modelowaniu i checkliście STL, bez duplikatu URL.
- [x] ~~SEO-018 — Nowy poradnik: Co wpływa na koszt druku 3D~~ — **DONE**. Rozszerzono istniejący artykuł o kosztach wydruku, bez duplikatu URL.
- [ ] SEO-019 — Projekt formularza wyceny z uploadem pliku — **PARTIAL**. UI i walidacja STL/3MF/OBJ/STEP/obrazów, funkcja Firebase HTTP, zapis Firestore/Storage, powiadomienia Resend i zabezpieczenie Turnstile są już w kodzie. Wdrożenie usług, klucze, end-to-end i zgody nadal po stronie właściciela; fallback mailto zachowany.
- [ ] SEO-020 — Opcjonalny kalkulator ceny: discovery, NIE implementacja w ciemno — **DEFERRED**. Kalkulator był opcjonalny (osobna faza); brak danych kosztowych i wyceny materiałów, nie wprowadzono fikcyjnych stawek.
- [ ] SEO-021 — Analytics: zdarzenia i śledzenie konwersji — **PARTIAL**. Dodano zdarzenia quote_email_intent i quote_request_confirmed wyłącznie gdy jest aktywne gtag; brak GA4/GSC.
- [ ] SEO-022 — Dostępność WCAG / responsywność — **PARTIAL**. Poprawiono semantykę, klawiaturę, focus, responsive i reduced-motion; brak pełnego audytu czytnikiem i mobile w realnej przeglądarce.
- [ ] SEO-023 — Google Business Profile, dane lokalne, autentyczne opinie — **BLOCKED_OWNER**. Profil Google, dane firmowe i opinie wymagają dostępu i autentycznych danych właściciela; nie symulowano wizytówki.
- [ ] SEO-024 — Publikacja etapowa, QA i pomiar SEO — **BLOCKED_ENV**. 139 testów generatora statycznego i transpile TSX zaliczone. Build/deploy/realna przeglądarka/GSC po npm ci w lokalnym środowisku.
- [x] ~~SEO-025 — Nowe logo i favicon 3DPrintMe~~ — **DONE**. Nowe autorskie logo SVG/PNG, wariant ciemny, ikona i favicon w public/img; podłączone w JSX i stronach statycznych.

## Zmiany w tej iteracji — formularze (27.10 wieczorem)

- [x] ~~SEO-026 — Oddzielny formularz kontaktowy dla pytań~~ — **DONE (kod)**. `src/forms/ContactForm.tsx`; `/#pytania`; fallback e-mail.
- [x] ~~SEO-027 — Backend Firebase formularzy wyceny i kontaktu~~ — **DONE (kod)**. Cloud Functions HTTP (`functions/index.js`), prywatne Cloud Storage, Firestore, limitowanie, Turnstile, Resend i cleanup. **Nie wdrożono** zewnętrznych usług.
- [x] ~~SEO-028 — Instrukcje i konfiguracja Firebase~~ — **DONE (dokumentacja)**. `FIREBASE_FORMULARZE_SETUP.md`, `.env.example`, `functions/.env.example`, rules, rewrite.
- [ ] SEO-029 — Deploy i test E2E na Firebase/telefonie — **BLOCKED_OWNER / BLOCKED_ENV**. Niezbędne: Blaze, bucket, Firestore, klucze Resend i Turnstile, DNS domeny, działające npm.

**Nie zmieniono** plików stylów `src/site.css` i `public/site.css`, układu responsywnego oraz artykułów (poza tekstami wyjaśniającymi formularze i polityką prywatności).

## Co jeszcze trzeba zrobić przed produkcją

1. Na komputerze z działającym npm uruchom `npm ci`, `npm run check:static`, `npm run check:forms`, `npm run check:editorial`, `npm run build` (postbuild wytwarza sitemap, canonical i SSR).
2. Uruchom lokalny serwer dla katalogu `build/` i zweryfikuj stronę główną oraz stronę portfolio na desktopie i mobile.
3. Zatwierdź opisy usług i produkt RÅSKOG, a następnie wstaw *rzeczywiste*, nieedytowane zdjęcia produktu do galerii.
4. Formularz włącza się dopiero po wpisaniu publicznego Turnstile Site Key w `.env.local` i deployu Cloud Functions. Patrz `FIREBASE_FORMULARZE_SETUP.md`.
5. Wykonaj osobno Google Business Profile, prawdziwe opinie i weryfikację GSC.
6. Dopiero po testach wykonaj `firebase deploy --only hosting` samodzielnie, po zatwierdzeniu.

## Krótki raport techniczny

- Projekt: **Create React App (react-scripts 5) + TypeScript**, nie Vite; statyczne SEO po `postbuild` w `scripts/finalize-build.tsx`.
- Generator podstron: `scripts/generate-pages.js` + JSON `content/service-pages.json`; istniejące URL-e `/poradnik/*.html` utrzymano.
- Test: `npm run check:static` — **PASS: 139 checks** (8 podstron + 5 artykułów).
- TSX: `typescript.transpileModule` syntax — **PASS** dla `src/App.tsx` i `scripts/finalize-build.tsx`.
- Build: **NIEURUCHOMIONY**. `npm ci` nie pobrał paczek z `registry.npmjs.org` (DNS `EAI_AGAIN`). Nie stwierdzamy pozytywnego builda ani testów przeglądarkowych.
- Publikacja: **NIE** — w ZIP-ie wyłącznie przygotowany kod.

## Niedokończone funkcjonalności, których nie należy ukrywać

- Automatyczny upload plików i powiadomienie e-mail **nie działają** bez backendu; obecnie działa tylko otwarcie klienta pocztowego z przygotowaną wiadomością.
- Nie ma automatycznej wyceny ani potwierdzonych danych kosztowych.
- Portfolio ma case study i schemat, ale brakuje zweryfikowanych dokumentacyjnych fotografii — oryginały do oceny w `_seo-agent-input/03_ASSETS/`.
- Dane lokalizacyjne, GBP i realne opinie wymagają decyzji właściciela.


## Poprawka po lokalnym `npm start` — 27.10.2026

- [x] ~~SEO-030 — Usunięcie błędu typów TypeScript w `TurnstileWidget.tsx`~~ — **DONE (kod)**. Zmieniono konstruktor na `new Promise<void>(...)`, aby `scriptPromise`, `resolve()` i wartość zwracana z `loadTurnstile` miały poprawne typy. Nie wymaga Firebase. Konieczna ostateczna weryfikacja `npm start` i `npm run build` u właściciela (zależności npm niedostępne w tym środowisku). Brak zmian CSS i responsywności.

## Zmiany editorial/SEO — 28.10.2026 (zrealizowane)

- [x] ~~SEO-031 — Schowanie portfolio do czasu zgromadzenia fotografii~~ — **DONE (kod)**. Brak sekcji i odnośników na stronie głównej, w menu i stopce; istniejące URL-e `realizacje` otrzymują `noindex,follow` i nie trafiają do nowej sitemap. Źródła pozostają do późniejszego wykorzystania.
- [x] ~~SEO-032 — Przeredagowanie pięciu istniejących artykułów bez duplikatów URL~~ — **DONE (kod)**. Lepsza struktura, poprawione błędne odnośniki, treści dostosowane do intencji odbiorcy.
- [x] ~~SEO-033 — Trzy nowe poradniki o odrębnych intencjach~~ — **DONE (kod)**. Artykuły: zdjęcie/szkic, wytrzymałość FDM, pasowanie/tolerancje. Dodane do generatora i listy poradnika.
- [x] ~~SEO-034 — Linkowanie wewnętrzne i zewnętrzne źródła techniczne~~ — **DONE (kod)**. Powiązane materiały, linki do usług i formularza oraz oficjalnych publikacji technicznych Prusa.
- [x] ~~SEO-035 — Testy źródeł, odnośników i niezmienionych stylów~~ — **DONE (testy statyczne)**. Kontrole editorial + checks statyczne i formularzy PASS; CSS bez zmian. **Pełny build, Lighthouse i testy mobilne niepotwierdzone w tym środowisku.**

**Wersja do wdrożenia:** patrz `AKTUALIZACJA_SEO_PORADNIK_28_10_2026.md`.

## Zmiany SEO lokalnego — 28.10.2026 (footer + szybka wycena)

- [x] ~~SEO-036 — Stopka z lokalnym kontekstem i linkowaniem wewnętrznym~~ — **DONE (kod)**. Nowy czterosekcyjny footer w `src/App.tsx`; ta sama semantyczna stopka na generowanych stronach usługowych, poradnikach i stronie prywatności. Linki do usług, poradnika Kraków, wyceny, kontaktu i polityki prywatności. Bez przypadkowych katalogów linków i upychania fraz.
- [x] ~~SEO-037 — Komunikat „szybka wycena” w pierwszym ekranie~~ — **DONE (kod)**. Podkreślono jeden zestaw informacji przesyłanych do wyceny i link `#kontakt`; **bez obietnicy 24 h**, bo SLA nie zostało uzgodnione.
- [x] ~~SEO-038 — Poradnik „Druk 3D w Krakowie — jak zamówić wydruk i umówić odbiór?”~~ — **DONE (kod)**. Unikalny URL `/poradnik/druk-3d-w-krakowie-jak-zamowic.html`, opis 6 etapów, checklista i odnośniki do usług oraz formularzy. Odmienna intencja od strony głównej: edukacja i logistyka, nie druga kopia landing page. Artykuł jest w `content/articles.json`, generatorze, poradniku i w mapie witryny generowanej przez `postbuild`.
- [x] ~~SEO-039 — Zachowanie styli oraz weryfikacja linków i struktury~~ — **DONE (testy statyczne)**. `src/site.css` jest identyczny z poprzednią paczką, nowy responsywny layout stopki jest tylko w `public/footer-links.css` (istniejący plik). Usunięto nieaktualne nadpisanie `.brand-logo`. QA: `npm run check:local-seo`, `check:editorial`, `check:static`, `check:forms` — PASS, transpilacja TSX i walidacja HTML — PASS. **Pełny build React, mobilny podgląd w przeglądarce i Lighthouse nadal nieweryfikowane** w środowisku, więc wymagają przetestowania lokalnie.

**Do przetestowania przed publikacją:**

1. `npm ci && npm run check:local-seo && npm run check:editorial && npm run check:static && npm run check:forms && npm run build`.
2. `npm start` i obejrzyj stronę na 375–430 px, tablecie ok. 768 px i desktopie. W szczególności sprawdź, czy menu rozwija się niezależnie od stopki oraz czy linki i adres e-mail nie wychodzą poza ekran.
3. Uruchom podgląd `build/` i zweryfikuj, że nowy adres jest w `build/sitemap.xml` oraz ma prawidłowy canonical.
4. Formularze wyceny i kontaktowy nie były zmieniane; backend Firebase nadal wymaga konfiguracji usług zgodnie z `FIREBASE_FORMULARZE_SETUP.md`.

## Integracja Trustpilot — 28.10.2026

- [x] ~~SEO-040 — Link do autentycznego profilu Trustpilot w stopce wszystkich typów stron~~ — **DONE (kod)**. `src/App.tsx`, `scripts/generate-pages.js`, `content/privacy.html`. Jeden tekstowy link, bez sztucznych ocen i skryptów widgetu. URL w `src/brand-links.json`; zachowano responsywne style bez zmian.
- [x] ~~SEO-041 — Powiązanie profilu Trustpilot przez `Organization.sameAs`~~ — **DONE (kod)**. `scripts/finalize-build.tsx`; dane strukturalne trafiają do HTML dopiero przez `postbuild`. Bez `AggregateRating` ani `Review` dla własnej firmy.
- [x] ~~SEO-042 — Testy źródeł, generatora i integralności linków Trustpilot~~ — **DONE (testy statyczne)**. `npm run check:trustpilot`, `check:local-seo`, `check:editorial`, `check:static` i `check:forms` — PASS. Bez nowych bibliotek.
- [ ] SEO-043 — Test w przeglądarce i produkcji — **BLOCKED_ENV / OWNER**. Po `npm ci` uruchom `npm run build`, sprawdź HTML i przejścia do Trustpilot w przeglądarce mobilnej. Dopiero po akceptacji wykonaj deploy Firebase.

Dokument zmian: `ZMIANY_TRUSTPILOT_SEO_28_10_2026.md`.


## Naprawy po uruchomieniu lokalnym — 28.10.2026

- [x] ~~SEO-044 — Naprawa importu Trustpilot poza `src` (CRA ModuleScopePlugin)~~ — **DONE (kod)**: wspólny JSON `src/brand-links.json`, poprawione importy w React i generatorze, test regresji `check:cra-imports`. Zero zmian CSS.
- [ ] SEO-045 — **DO SPRAWDZENIA LOKALNIE**: `npm start` i `npm run build` po aktualizacji, ponieważ w środowisku wykonawczym nie ma zależności React. Nie jest to problem Firebase.
