# 3DPrintMe — aktualizacja poradnika i ukrycie portfolio

**Baza projektu:** archiwum `3DPrintMe_FORMULARZE_STL_FIREBASE_FIX_TS_2026-10-27.zip` z naprawionym `Promise<void>` w TurnstileWidget.
**Data zmian:** 28.10.2026.
**Wdrożenie na produkcję:** NIE, projekt gotowy do lokalnej weryfikacji.

## Co zmieniono

- Ukryto portfolio na stronie głównej, w menu i w stopce. Materiały i kod do przyszłej galerii zachowano w repo.
- Dwa wcześniej publiczne adresy `/realizacje/` i `/realizacje/odbojnik-ikea-raskog/` mają teraz `noindex,follow` i nie są linkowane z pozostałych stron ani dodawane do **nowej** sitemap generowanej w `npm run build`. Uwaga: pozostają fizycznie dostępne po bezpośrednim wejściu na URL; po wdrożeniu Google musi je ponownie odwiedzić, aby zastosować noindex.
- Sekcja „Poradnik druku 3D” pozostała w dotychczasowym layoucie. Pokazuje trzy dobrane teksty: wycena, druk ze zdjęcia oraz dobór materiału. `/poradnik/` wyświetla wszystkie osiem.
- Pięć istniejących poradników zostało zredagowanych od nowa lub znacząco przeredagowanych, zamiast tworzyć dla nich nowe adresy.
- Powstały trzy nowe artykuły: druk ze zdjęcia, wytrzymałość i kierunek warstw, tolerancje i pasowanie FDM.
- Usunięto wcześniejsze dodatkowe fragmenty HTML doklejane do dwóch poradników, które powtarzały treści lub powodowały brak konsekwentnej struktury; zachowano je jako archiwalne pliki w `content/`.
- Poprawiono link do nieistniejącej ścieżki `/poradnik/jak-przygotowac-stl/`.
- Dodano kontekstowe linki wewnętrzne do formularza, usług i powiązanych poradników oraz odnośniki do dokumentacji Prusa Knowledge Base.
- Obecne pliki CSS, komponenty formularzy, funkcje Firebase i fonty **nie zostały zmodyfikowane**.

## Mapa intencji wyszukiwania / brak duplikacji

| Istniejący / nowy URL | Intencja | Sposób pracy |
|---|---|---|
| `/poradnik/jak-przygotowac-plik.html` | Jak wysłać poprawny model i kontekst techniczny | Zachowany URL, redakcja i checklisty |
| `/poradnik/pla-petg-tpu.html` | Wybór materiału i ograniczenia | Zachowany URL, redakcja i źródła |
| `/poradnik/ile-kosztuje-druk-3d.html` | Składniki ceny wydruku | Zachowany URL, przykład wyceny bez wymyślonych stawek |
| `/poradnik/zastosowania-druku-3d.html` | Pomysły na elementy użytkowe i ich ograniczenia | Zachowany URL, rozbudowa |
| `/poradnik/druk-3d-male-serie.html` | Planowanie powtarzalnych partii | Zachowany URL, rozbudowa |
| `/poradnik/druk-3d-ze-zdjecia-szkicu.html` | Brak STL, przygotowanie dokumentacji i pomiarów | **Nowy** poradnik |
| `/poradnik/wytrzymalosc-druku-3d-kierunek-warstw.html` | Orientacja i właściwości mechaniczne FDM | **Nowy** poradnik |
| `/poradnik/pasowanie-tolerancje-druk-3d.html` | Otwory, luzy, zatrzaski, próby dopasowania | **Nowy** poradnik |

Podstrony ofertowe pozostają odrębne: mają zachęcać do złożenia zapytania, poradniki zaś wyjaśniają konkretne problemy. Nie dodano nieuzasadnionych, lokalnych „kopii” tekstów dla miast wokół Krakowa.

## Wykorzystane zewnętrzne źródła (umieszczone kontekstowo)

- Prusa, „Modeling with 3D printing in mind”: https://help.prusa3d.com/article/modeling-with-3d-printing-in-mind_164135
- Prusa, „Przewodnik po materiałach”: https://help.prusa3d.com/pl/filament-material-guide
- Prusa, „Drying filament”: https://help.prusa3d.com/article/drying-filament_332086

Nie zakładamy, że sam link wychodzący jest czynnikiem zapewniającym wyższą pozycję. Jego celem jest udokumentowanie informacji i ułatwienie pogłębienia wiedzy. Teksty są napisane od nowa; nie kopiowano artykułów producentów.

## Testy

Uruchom lokalnie w katalogu projektu:

```bash
npm ci
npm run check:static
npm run check:forms
npm run check:editorial
npm run build
npm start
```

Sprawdź w szczególności: stronę główną (brak portfolio), mobilne menu, układ trzech kart poradnika, `/#kontakt`, `/#pytania`, osiem adresów poradnika, sitemap w `build/sitemap.xml`, a także tag `noindex` na dwóch starych URL portfolio. Uruchom serwer statyczny dla katalogu `build` (np. `npx serve build`) — `npm start` pokazuje środowisko CRA, a finalne metadane oraz sitemap tworzy dopiero `postbuild`.

**W tej sesji potwierdzono:** `node scripts/check-static.js`, `node scripts/check-forms.js`, `node scripts/check-editorial.js` — PASS; ponadto porównanie SHA-256 CSS z poprzednią paczką wykazało identyczność. Pełnego builda React, testów urządzeń mobilnych oraz deployu nie przeprowadzono tutaj — nadal konieczna lokalna weryfikacja.

## Co dalej

Nie przywracaj portfolio, dopóki nie ma zatwierdzonych zdjęć i opisów. Gdy je zbierzesz, przywróć sekcję, usuniesz noindex z dwóch podstron oraz dodasz adresy ponownie do mapy witryny. Można to zrobić w osobnym commicie. Po wdrożeniu dodaj nowe URL-e poradników do monitorowania w Google Search Console i sprawdzaj rzeczywiste zapytania, kliknięcia oraz pozyskiwane zgłoszenia.
