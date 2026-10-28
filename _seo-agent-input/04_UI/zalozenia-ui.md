# UI: system i ogólne wymagania

- Za punkt wyjścia przyjmij aktualną paletę i typografię 3DPrintMe. Makieta inspiracyjna `mockup-strona-glowna-formularz.png` nie jest zobowiązującym redesignem.
- Priorytet: prosty, czytelny kontakt i prawdziwe zdjęcia. Przykładowy wizerunek na makiecie NIE jest realizacją 3DPrintMe i nie może trafiać do portfolio.
- Widoczne CTA w hero, spójne w header/footer, sticky button na telefonie tylko gdy nie zasłania treści i cookie banner.
- Układ: max-width ~1120–1200px, duże marginesy, grid 3 kart desktop / 1 mobilnie. To inspiracja, dopasuj do obecnego CSS.
- Typografia: H1 jednoznaczny lokalnie, kontrast co najmniej WCAG AA 4.5:1 dla normalnego tekstu, 3:1 dla dużego.
- Formularz ma label na stałe (nie wyłącznie placeholder), błędy aria-live i focus, droppable area ale zawsze dostępny input file.
- Testy viewport 320, 375, 768, 1024, 1440 i system light/dark jeśli strona obsługuje oba.
- Nie stosuj automatycznego slidera z rzekomymi opiniami. Animacje wyłączalne na `prefers-reduced-motion`.
