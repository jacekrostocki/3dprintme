# Acceptance/QA checklist

## Zmiany treści
- [ ] 1 H1 i unikalny, prawdziwy title/description dla każdej strony.
- [ ] Czy wszystkie rzeczywiste usługi są oferowane? Wszelkie niedostępne usługi ukryte.
- [ ] Brak fikcyjnych opinii, cen, adresu, SLA i realizacji. Zdjęcia potwierdzone przez właściciela.
- [ ] Artykuły nie dublują istniejących podstron; poprawione wewnętrzne linki.
- [ ] Teksty czytelne, bez sztucznego powtarzania „druk 3d krakow”.

## Technika
- [ ] Build/lint/test według package.json, bez naruszenia innych usług.
- [ ] Canonical, sitemap, robots, noindex w staging i 404 dla błędnych tras.
- [ ] Sprawdzony HTML/rendering JS, dane strukturalne i statusy.
- [ ] Linki działają, brak 404 dla opublikowanych podstron, brak broken images.
- [ ] WebP z fallback i dopasowane srcset, brak lazy hero; alt opisowe, bez keyword stuffing.
- [ ] Mobile 320/375/768/1440; kontrast, klawiatura, reduced-motion i screen reader.

## Formularz
- [ ] Upload rzeczywiście działa z prywatnym Storage i backendem; limity po stronie klienta i serwera.
- [ ] Nie da się pobrać cudzego pliku ani ominąć limitu przez frontend.
- [ ] Rate limiting i antyspam, kontrola kosztu storage / złośliwe pliki.
- [ ] Success tylko po zakończeniu zapisu; retry/idempotencja i cleanup.
- [ ] RODO i retencja odzwierciedlają prawdziwy proces.

## Release
- [ ] Raport z diff i zrzuty desktop/mobile, wyniki testów i plan rollbacku.
- [ ] Preview adres nie jest indeksowany, nigdy nie zapisywany do sitemap produkcyjnej.
- [ ] Właściciel zatwierdził publikację i produkcyjny deploy. GSC URL inspection po deploy.
