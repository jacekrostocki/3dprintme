---
slug: /poradnik/jak-przygotowac-stl/
title: "Jak przygotować STL do wyceny i druku 3D?"
description: "Sprawdź jednostki, szczelność siatki, wymiary, ściany i pasowania przed wysłaniem pliku STL do druku 3D na zamówienie."
status: "draft; merge jeśli istnieje podobny poradnik"
---
# Jak przygotować plik STL do wyceny druku 3D? Lista kontrolna

STL to popularny format siatki trójkątów opisujących powierzchnię obiektu. W przeciwieństwie do plików parametrycznych CAD nie zawiera pełnej historii edycji ani uniwersalnie gwarantowanej informacji o jednostkach. Nawet model, który wygląda prawidłowo na ekranie, może wymagać naprawy przed drukiem.

## 1. Zadbaj o właściwe jednostki i skalę

Sprawdź, czy element zaprojektowany jako 50 mm ma po imporcie rzeczywiście 50 mm, a nie 50 cm lub 50 cali. W STL łatwo o błędy skali między programami. Jeżeli eksportujesz z Fusion 360, zwróć uwagę na ustawienia jednostek i wymiary w docelowym slicerze.

## 2. Sprawdź, czy geometria tworzy zamkniętą bryłę

Slicer musi wiedzieć, co jest wnętrzem, a co zewnętrzem modelu. Niepołączone powierzchnie, samoprzecięcia, odwrócone normalne i dziury w siatce mogą utrudnić przygotowanie ścieżek druku. Jeśli w slicerze pojawiają się nieoczekiwane braki ścianek lub ostrzeżenia, wróć do programu CAD i sprawdź geometrię.

## 3. Nie projektuj bardzo cienkich ścian bez konsultacji

Cienka przegroda może być poprawna w CAD, ale niemożliwa do odwzorowania przy konkretnej średnicy dyszy i ustawieniach druku. Przed wykonaniem elementów zatrzaskowych lub obudów warto wskazać, które fragmenty są funkcjonalnie krytyczne. Nie ma jednej grubości ściany gwarantującej poprawność każdego modelu.

## 4. Przemyśl orientację i podpory

Nawisy, wysokie smukłe elementy i poziome otwory mogą wymagać podpór. Ich zastosowanie wpływa na czas, cenę i jakość powierzchni styku. Ułożenie części wpływa też na sposób przenoszenia obciążeń, bo w FDM połączenie między warstwami może być słabsze od wytrzymałości w innej orientacji.

## 5. Zaznacz ważne wymiary i pasowania

Jeżeli część ma nasuwać się na rurkę, współpracować z magnesem lub wkrętem czy zatrzaskiwać na krawędzi, podaj docelowy wymiar i wymagany luz. „Idealnie spasowane” nie jest parametrem technicznym. W projektach o ciasnym pasowaniu może być potrzebna mała próbka testowa.

## 6. Dołącz kontekst zastosowania

Do wyceny, oprócz STL, przydatne są informacje o zastosowaniu, liczbie sztuk, kolorze, oczekiwanej jakości powierzchni i środowisku pracy. Jeżeli wykonujesz część zamienną, zdjęcie miejsca montażu i miarka mogą wyjaśnić więcej niż sama bryła.

## 7. Sprawdź prawa do pliku

Upewnij się, że możesz zlecić wykonanie modelu i że jego licencja pozwala na planowane użycie. Nie każdy plik udostępniony w internecie dopuszcza sprzedaż gotowych wydruków lub modyfikację w celach komercyjnych.

## Checklist przed wysłaniem

- [ ] Wymiary i skala sprawdzone w milimetrach.
- [ ] Model ma oczekiwaną liczbę części.
- [ ] Brak widocznych błędów siatki i niezamkniętych powierzchni.
- [ ] Wskazane krytyczne pasowania, otwory i gwinty.
- [ ] Podano materiał albo opisano wymagania użytkowe.
- [ ] Podano liczbę sztuk i preferowaną kolorystykę.
- [ ] Jeżeli niezbędne — dołączono zdjęcia miejsca montażu.
- [ ] Ustalono prawa do wykorzystania modelu.

## A co, jeśli mam tylko zdjęcie lub szkic?

Nie próbuj odtwarzać wszystkich wymiarów z jednego zdjęcia bez punktu odniesienia. Prześlij kilka ujęć, podstawowe pomiary oraz opis działania. [Zapytaj o możliwość modelowania i wycenę](/wycena/).
