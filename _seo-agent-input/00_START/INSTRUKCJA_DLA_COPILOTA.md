# Operacyjna instrukcja dla VS Code Copilot Agent

## Twoja rola
Pracujesz nad istniejącą stroną 3DPrintMe w React/Vite/Firebase. Repozytorium i realny kod są źródłem prawdy. Pakiet opisuje zamierzone zmiany, a nie zakłada nazw komponentów. Wszystko zapisuj w języku polskim, chyba że kod/nazwy symboli wymagają angielskiego.

## Tryb obowiązkowy: jedno zadanie naraz
1. Pokaż użytkownikowi kolejny ticket `SEO-xxx`, uzasadnienie i plan. Czekaj na wybór/zgodę przed wykonaniem większego zakresu; działania diagnostyczne są dozwolone.
2. Przeczytaj dependencies, poszukaj odpowiednich plików i istniejących podobnych funkcji.
3. Utwórz osobny branch `seo/SEO-xxx-krotki-opis` (chyba że repo ma inne uzgodnione reguły). Nie nadpisuj lokalnej pracy; przed startem sprawdź `git status`.
4. Zmiany wprowadzaj minimalnie, zgodnie z konwencją projektu. Nie usuwaj istniejących danych bez backupu i diffu.
5. Uruchom `npm run build`, odpowiedni lint/test zgodny z package.json, sprawdź responsywność i dostępność. Gdy komend nie ma, NIE zgaduj; opisz to.
6. Podaj listę plików, dokładny diff lub streszczenie, wykonane testy, błędy, sposób rollbacku i pytania do właściciela.
7. Zatrzymaj się i czekaj na akceptację. **Nie deployuj produkcji** bez wyraźnej decyzji właściciela.
8. Własny status pracy zapisz w `_seo-agent-input/01_TASKS/STATUS_IMPLEMENTACJI.md` lub analogicznym pliku poza public/.

## Zakazy
- Nie generuj samodzielnie autentycznie brzmiących opinii klientów, zdjęć fikcyjnych projektów opisywanych jako faktyczne realizacje, liczników Google/Trustpilot.
- Nie twórz automatycznie adresu, telefonu ani godzin otwarcia. Nie wymyślaj cen, SLA, stanu magazynu i certyfikatów.
- Nie publikuj przykładowych wartości ze schematów (`example.com`, placeholdery) ani makiet jako działających elementów.
- Nie zmieniaj routera/bundlera/architektury całego projektu bez potrzeby. Nie dodawaj ciężkich bibliotek dla prostych funkcji.
- Nie wysyłaj modeli STL do publicznych buckietów ani w e-mailu z nieautoryzowanych endpointów.
- Nie usuwaj własnych tekstów właściciela, jeśli mają lepszą zgodność z rzeczywistością niż drafty.

## Sposób korzystania z contentu
- Pliki Markdown mają proponowany `slug`, `title`, `description`, `intent`, `status`. Zachowaj lub dopasuj istniejące ścieżki, nie twórz duplikatów pod względem intencji.
- Materiały źródłowe w assets wymagają zgody; nie ma zgody na automatyczną publikację.
- W razie artykułu już obecnego w serwisie zaproponuj merge z obecnym zamiast nowego URL (kanibalizacja).
- Prawidłowe anchor links z tekstów dostosuj do faktycznego routera.

## Kiedy pytać właściciela
Przy danych osobowych/adresie, realnej dostępności CAD, terminach, źródłach opinii, autentyczności zdjęć RÅSKOG, polityce retencji plików, minimalnej cenie, budżecie Firebase i produkcyjnym deployu.

## Gotowy prompt na pierwszą sesję
> Zapoznaj się z `_seo-agent-input/00_START/INSTRUKCJA_DLA_COPILOTA.md` i `_seo-agent-input/01_TASKS/tasks.json`. Wykonaj wyłącznie SEO-001: audyt repozytorium, routing, SEO head, istniejące poradniki, formularz, polityka prywatności, Firebase hosting i opinie. Nie edytuj kodu. Zapisz raport i zaproponuj 3 pierwsze bezpieczne działania, podając konkretne pliki. Nie wykonuj deployu.
