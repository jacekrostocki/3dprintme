---
slug: /poradnik/pla-petg-tpu/
title: "PLA, PETG czy TPU? Porównanie materiałów do druku 3D"
description: "Do czego wybrać PLA, PETG lub TPU? Praktyczne zastosowania, ograniczenia i pytania, które pomagają dobrać filament do części drukowanej w 3D."
status: "draft; sprawdzić czy istnieje artykuł o tej samej intencji"
---
# PLA, PETG czy TPU? Jak wybrać materiał do druku 3D

Wybór filamentu zależy od tego, **co ma robić gotowa część**, a nie tylko od koloru i wyglądu. Innego tworzywa potrzebuje model na półkę, innego obudowa urządzenia, a jeszcze innego elastyczny odbojnik. W druku FDM na właściwości elementu wpływają także liczba obrysów, temperatura dyszy, orientacja warstw, wypełnienie i geometria.

## PLA — do prototypów, modeli i elementów wewnętrznych

PLA jest częstym punktem wyjścia w druku FDM. Pozwala otrzymywać estetyczne modele demonstracyjne, pomoce warsztatowe, organizery i prototypy, w których priorytetem jest kształt. Nie należy automatycznie wybierać go do elementów w nagrzanych miejscach, np. pozostawianych na słońcu w samochodzie. Długotrwałe obciążenie również może powodować odkształcenia.

**Przykład:** szablon do przymiarki, organizer do biurka lub obudowa demonstracyjna, której nie poddaje się dużym obciążeniom i podwyższonej temperaturze.

## PETG — do wielu części codziennego użytku

PETG jest rozsądnym kandydatem do uchwytów, pojemników technicznych i obudów użytkowych. W porównaniu z typowym PLA często oferuje lepszą odporność na pękanie przy uderzeniu i większą tolerancję na temperaturę, ale nie jest materiałem uniwersalnie odpornym na każdą chemikalię, środowisko i obciążenie. Na jakość montażu wpływa dokładność wydruku oraz kształt zaczepów.

**Przykład:** uchwyt przewodu, pokrywa skrzynki lub dystans wewnątrz niewymagającej konstrukcji.

## TPU — elastyczne osłony i amortyzujące akcesoria

TPU to rodzina elastomerów wykorzystywanych tam, gdzie detal musi się uginać, a następnie wracać do kształtu. Elastyczność zależy od twardości Shore, geometrii i parametrów wydruku. **TPU 95A** to nie to samo co bardzo miękka guma: gruba ścianka może pozostać stosunkowo sztywna. Materiał jest przydatny do stopek, nakładek, odbojników i osłon, ale dla uszczelnień oraz kontaktu z chemikaliami należy sprawdzić szczegółowe wymagania.

**Przykład z prac nad projektem:** do autorskiego odbojnika narożnego dla wózka RÅSKOG rozważano elastyczny TPU, ponieważ wymaga on pewnej podatności przy kontakcie z otoczeniem. [Zobacz opis projektu](/realizacje/odbojnik-ikea-raskog/).

## Szybkie zestawienie

| Pytanie | PLA | PETG | TPU |
|---|---|---|---|
| Model pokazowy | Często dobry wybór | Tak | Rzadziej potrzebny |
| Uchwyt / obudowa użytkowa | Czasem | Często | Dla elastycznych elementów |
| Odbojnik lub miękka nakładka | Zwykle nie | Zwykle nie | Często |
| Część przy źródle ciepła | Wymaga szczególnej ostrożności | Nadal wymaga oceny | Wymaga oceny gatunku |
| Dokładny zatrzask | Zależnie od geometrii | Wymaga próby | Podatny, lecz wymaga próby |

To porównanie orientacyjne, nie karta techniczna filamentu. Właściwości konkretnych marek i gatunków mogą się różnić.

## Dlaczego sama nazwa materiału nie wystarcza?

FDM buduje część warstwa po warstwie. W kierunku prostopadłym do warstw wytrzymałość połączeń może się różnić od właściwości w płaszczyźnie warstwy. Znaczenie mają również ostre narożniki, przekrój w najcieńszym miejscu, otwory pod wkręty i obciążenia cykliczne. Dlatego nawet z dobrego tworzywa można wykonać słaby uchwyt, jeśli jego geometria nie jest dopasowana do zadania.

## Co napisać w zapytaniu o materiał?

Najlepiej wskazać: do czego służy część, czy będzie uderzana lub zginana, czy pracuje na zewnątrz, jaka temperatura i chemikalia mogą na nią działać, czy wymaga precyzyjnego pasowania i ile egzemplarzy potrzebujesz. Zdjęcia kontekstu często pomogą bardziej niż opis „ma być mocne”.

**Masz już model?** [Wyślij go do wyceny](/wycena/). Jeśli nie, przeczytaj również [jak przygotować STL](/poradnik/jak-przygotowac-stl/).
