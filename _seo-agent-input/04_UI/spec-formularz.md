# UI formularza wyceny (inspiracja wizualna)

**Patrz:** `mockup-strona-glowna-formularz.png` (referencja AI, niedokładny tekst i formaty). **Implementacja:** `05_TECH/spec-formularz.md` jest nadrzędną specyfikacją funkcjonalną.

## Desktop
Dwa obszary: obok krótkiego opisu procesu formularz w osobnej karcie, max-width 680–760 px dla samego formularza, obszar drag-and-drop i wyraźny upload status. Informacja o prywatności pod polem plików. Przyciski CTA "Wyślij zapytanie" bez obietnicy ceny w 60 sekund.

## Mobile
Jeden pionowy layout, duże pola i przycisk szerokości sekcji. Pod formularzem krótkie FAQ.

## Stany
Empty: opis obsługiwanych plików. Selected: nazwy, rozmiary i usuń. Uploading: postęp i anulowanie jeśli wdrożone. Error: konkretny powód; nie usuwaj tekstu użytkownika. Success: ID zgłoszenia tylko po potwierdzeniu backendu.

## Czego NIE kopiować z obrazka
Plik STEP/OBJ/PDF i limit 50 MB są tylko wizualną makietą i wymagają zatwierdzenia backendu. Nie dopisuj "wszystkie materiały" ani automatycznej wyceny.
