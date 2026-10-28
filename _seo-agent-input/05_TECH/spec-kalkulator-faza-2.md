# Kalkulator ceny — osobne zadanie discovery (NIE automatyczny feature)

## Dlaczego nie od razu?
STL opisuje geometrię powierzchni, ale nie zawiera czasu druku, kosztu podpór, kosztu przygotowania, rzeczywistej orientacji, ilości obrysów, wypełnienia ani ryzyk. Szacowanie "masa × cena" bywa niewystarczające. OBJ/3MF mogą zawierać inne ustawienia, STEP nie jest bezpośrednio slicowalnym siatką STL.

## Etap 1: wymagania do zatwierdzenia
- Realny model cen: koszt materiału wg filamentu, czas maszyny, energia i amortyzacja, koszty przygotowania, podpory, obróbka, porażki wydruku, dostawa, podatki i marża.
- Kalkulator tylko orientacyjny vs wiążąca oferta — komunikat dla klientów.
- Sposób analizy: slicowanie na backendzie dla konkretnych profili P1S zamiast uproszczonego wolumenu; sandbox CPU i koszty kolejki.
- Obsługa zagrożeń w przesłanych plikach, limity triangulacji/objętości, timeout workerów i worker isolation.
- Właściwości i polityka aktualizacji profili druku, dokładność wyników na zbiorze 20+ realnych zleceń.

## Kryterium go/no-go
Właściciel zatwierdził ceny oraz legalny sposób wyceny, koszt backendu i ograniczenia; testy pokazują akceptowalny rozjazd między wyceną online a produkcją. W przeciwnym razie zostań przy formularzu indywidualnej wyceny.
