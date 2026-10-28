# 3DPrintMe — pakiet wdrożeniowy SEO i konwersji dla Copilot Agent

**Data:** 27.10.2026 | **Adres:** https://3dprintme.pl | **Technologia zgłoszona przez właściciela:** React/Vite + Firebase Hosting.

## Jak korzystać (ważne)

1. Rozpakuj ZIP do repozytorium jako katalog np. `_seo-agent-input/` lub udostępnij Copilotowi pliki w workspace.
2. Przeczytaj `00_START/INSTRUKCJA_DLA_COPILOTA.md` oraz `01_TASKS/tasks.json`.
3. Każde zadanie ma jednoznaczny ticket `01_TASKS/tickets/SEO-NNN.md`. Uruchamiaj jedno po drugim (zaczynając od SEO-001 i SEO-002); wymagane zgody zatrzymują publikację, a nie analizę.
4. Gotowe teksty: `02_CONTENT/`; materiały produktowe: `03_ASSETS/`; wizualizacje i referencje UI: `04_UI/`; specyfikacje techniczne: `05_TECH/`.
5. To NIE jest patch do istniejącego repo i NIE jest poleceniem natychmiastowego deploymentu. Dopasuj implementację do faktycznej struktury projektu.

## Najważniejsze zasady
- Nie wymyślaj projektów klientów, faktur, opinii, ocen, terminów, adresów czy wskaźników.
- W portfolio można rozważyć wyłącznie dostarczony projekt RÅSKOG po zatwierdzeniu właściciela; pozostałe gotowe teksty to usługi/poradnik, nie referencje klientów.
- W katalogu `03_ASSETS/portfolio_do_weryfikacji/` są **materiały źródłowe z wcześniejszych uploadów użytkownika**, ale ich pochodzenie i zgodność z faktycznym wydrukiem musi być zweryfikowana. Żadne AI-generated przedstawienie części nie jest udokumentowaną fotografią wykonania.
- `04_UI/mockup-strona-glowna-formularz.png` to **wygenerowana makieta inspiracyjna**, nie zrzut istniejącej strony i nie dowód realizacji.
- W celu ochrony reputacji obecnych opinii nie utrzymuj bez potwierdzenia. Automatyczne generowanie ofertowego portfolio z grafikami AI jest zabronione.
- Nie twórz stron lokalnych dla każdej dzielnicy i nie stosuj keyword stuffing.
- Zanim opublikujesz jakąkolwiek usługę lub formę kontaktu, potwierdź z właścicielem, że jest świadczona.

## Priorytetowa kolejność
**P0:** SEO-001, SEO-002, SEO-024 (kontrola produkcji). **P1:** SEO-003,004,005,006,007,010,011,019,023. **P2:** pozostałe zadania. **P3:** SEO-020 opcjonalnie.

## Stan weryfikacji
Publiczne dane konkurenta Faktoria3D były dostępne pod druk3dkrakow.pl 27.10.2026. Aktualne `3dprintme.pl` nie było technicznie dostępne do pełnego pobrania w tym środowisku; **nie** potwierdzono rzeczywistej struktury DOM, odpowiedzi HTTP ani aktualnego repo. Pierwszy ticket jest obligatoryjnym audytem faktów.

## Źródła i dalsze kroki
`07_REFERENCJE/zrodla-i-ograniczenia.md`; `06_QA/qa-checklist.md`; `06_QA/manual-owner-tasks.md`.
