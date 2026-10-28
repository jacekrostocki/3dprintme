# Specyfikacja techniczna: React/Vite/Firebase + SEO

## 1. Audyt bez założeń o strukturze repo
- Zidentyfikuj router (`react-router-dom`, inny, własny), źródło wpisów blogowych (JSON/TS/MDX), generowanie meta, komponent Head.
- Sprawdź czy ścieżki istnieją i czy aplikacja generuje statyczny HTML lub CSR. `curl -I` i "View Source" to różne rzeczy niż DOM w DevTools.
- Zidentyfikuj Firebase Hosting rewrites i obsługę nieznanych tras: soft 404 dla SPA to realny problem, jeśli nieznany adres zwraca 200 i UI 404.
- Zapisz baseline: Lighthouse/PSI mobile + desktop, HTML size, LCP image, CLS, INP (jeśli field data), indexability, powielone meta, aktualną liczbę indeksowanych URL.

## 2. Meta per route
- Jedna prawdziwa meta canonical na dokument, `https://3dprintme.pl/<path>/` zgodnie z podjętą decyzją o slash.
- `title` i meta description po polsku unikalne, nie upychaj dokładnej frazy w każdej linii; dane w `02_CONTENT/meta/metadane.json`.
- `og:title`, `og:description`, `og:url`, `og:type`, `og:image` tylko gdy faktycznie istnieje obraz publiczny.
- `lang="pl"` w HTML, na mobile viewport. Nie generuj indexowalnych `?filter=` i duplikatów; parametry tylko dla UI.
- Jeśli CSR ogranicza renderowanie, rozważ prerendering treści statycznych (np. Vite SSG/bezpieczny crawler-based prerender) lub SSR, zależnie od projektu. Nie zakładaj, że CSR nie indeksuje się w Google.

## 3. Host, statusy, sitemap
- Sprawdź host canonical i 301 z `www` (jeśli skonfigurowany) na `https://3dprintme.pl`.
- Sprawdź dostępność `/robots.txt` i `/sitemap.xml`. Nie zakładaj, że istnieją; wygeneruj tylko dla aktywnych opublikowanych stron.
- Dla nowej strony w sitemap używaj pełnego canonical i `<lastmod>` tylko, gdy znasz prawdziwą datę aktualizacji.
- Sitemapy nie powinny zawierać `/wycena/` jeśli strona jeszcze nie jest produkcyjna; strony wyłączone do czasu publikacji.
- Render nieznanego URL nie może udawać strony działającej — zweryfikuj właściwy HTTP 404 w hostingu. Uwaga: proste SPA fallback `"**" -> /index.html` często zwraca 200. Wymaga to dostosowania do faktycznego hostingu i routingu (np. generowane statyczne strony lub SSR dla wielostronicowych sekcji).
- Nie przenoś aktywnych URL bez 301 i aktualizacji linków.

## 4. Schema.org
W pliku `schema-snippets.json` są WARUNKOWE szablony. Kopiuj tylko prawdziwe dane, sprawdź wyniki w Rich Results Test i schema validator. `LocalBusiness` nie gwarantuje rich result ani pozycji Maps; bez realnych danych firmy rozważ samo Organization/WebSite.

## 5. Wydajność / dostępność
- Zapisz pomiary przed zmianą; cele p75 field data: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.
- Renderuj `width` i `height` lub `aspect-ratio` dla wszystkich zdjęć, szczególnie hero.
- Duże zdjęcia w `<picture>` z WebP i fallback, responsive `srcset`, `loading="lazy"` dla poniżej folda, `fetchpriority="high"` tylko dla krytycznego LCP image.
- Lazyload nie dotyczy głównego widocznego hero. Katalog zdjęć w `03_ASSETS` to źródła, nie automatycznie opublikowane galerie.
- Zminimalizuj nadmiar JS, sprawdź duplikaty React dependencies, lazy route code split, preload tylko czcionek faktycznie używanych.
- Zadbaj o strukturę H1-H3, linki klikalne przez klawiaturę, anchor text i opisowe alty bez spamu.

## 6. Testy akceptacji technicznej
- `npm run build`, ewentualnie `npm run lint` i `npm test` jeśli skrypty istnieją.
- Przetestuj bez JS / w statycznym HTML: czy ważna treść jest dostępna dla crawlera lub poprawnie renderowana przez Google.
- Sprawdź status 200 prawidłowych artykułów, 404 fałszywych; canonical; preview/test noindex; mobile 320px.
- Po wdrożeniu: inspekcja URL GSC, sitemap status, błędy indeksowania, ruch i wyświetlenia.
