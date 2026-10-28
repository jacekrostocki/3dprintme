# Funkcjonalność: formularz wyceny STL — ETAP L

## Cel użytkownika
Bez opuszczania serwisu użytkownik może opisać zamówienie i opcjonalnie dołączyć plik, a właściciel otrzymuje prywatne zgłoszenie. **To jest formularz zapytania, nie automatyczna wycena ani sprzedaż online.**

## UX
- Pola obowiązkowe: e-mail (typ email), opis zastosowania (10-3000 znaków) oraz ilość sztuk (całkowita ≥1). W przypadku wyceny bez pliku opis musi wyjaśniać projekt.
- Opcjonalne: imię, telefon (nie wymuszaj), materiał (PLA/PETG/TPU/nie wiem), kolor, preferowany odbiór, wymiar/uwagi, załączniki.
- Przyjmij początkowo tylko `STL`, `3MF`, `OBJ`, `STEP/STP` i popularne zdjęcia/PDF, ALE tylko jeśli backend rzeczywiście obsługuje ich przechowywanie/oglądanie; pliki CAD nie muszą być analizowane automatycznie. ZIP tylko z uzasadnieniem i skanowaniem.
- Limity startowe do dyskusji: do 3 plików, <= 20MB każdy i 30MB suma (nie są gwarantowaną cechą). Nazwy plików sanitize. Informuj o limitach obok kontrolki.
- Drag-and-drop + zwykły file input, lista plików, usuwanie plików, pasek upload, walidacja błędów, focus na pierwszym błędzie.
- Wyraźny loading, disabled przy wysyłaniu, timeout z bezpieczną możliwością retry, potwierdzenie przyjęcia DOPIERO po sukcesie backendu (z identyfikatorem zapytania).
- Formularz dostępny z klawiatury, kontrast, aria-live status. Responsywny od 320px.

## Firebase — zalecany model bezpieczeństwa (dostosować do konfiguracji)
1. Frontend wysyła metadata do uwierzytelnionej logicznie funkcji server-side (Cloud Functions v2 / Cloud Run). Endpoint chroniony App Check (jako warstwa pomocnicza) + rate limiting/reCAPTCHA Enterprise lub inna skuteczna warstwa antybot.
2. Funkcja sprawdza token, Content-Type, rozszerzenie, limity MIME/rozmiaru i podpis pliku tam, gdzie to możliwe. Nie ufa samej nazwie.
3. Użyj identyfikatora losowego request; prześlij pliki do prywatnego bucketu przez krótkotrwały podpisany URL lub pośrednictwem bezpiecznego backendu. Bez publicznych odczytów, bez globalnego ACL, bez bezpośredniej publicznej zapisywalności. Dla Firebase Storage ustaw restrykcyjne reguły i ograniczenia. Weryfikuj koszt oraz abuse.
4. Backend wiąże metadata i pliki z jednym zgłoszeniem, zapisuje w Firestore (o ile rzeczywiście używany) i wysyła powiadomienie przez autoryzowany serwis (sekrety przez Secret Manager). Nie ujawniaj nazwy bucketu/pełnych linków w publicznym mailu; lepiej przesłać identyfikator i otwierać w panelu admina.
5. Jeśli upload udał się częściowo, stan błędu musi dać się ponowić bez duplikacji. Zaplanuj obsługę osieroconych uploadów i idempotency key.
6. Ustal z właścicielem retencję np. [N DNI], procedurę usuwania i dostęp. Egzekwuj TTL + storage lifecycle i privacy policy. Nie wpisuj z góry arbitralnego okresu.
7. Przed zapisaniem plików zawierających własność intelektualną: polityka bezpieczeństwa, żądania usunięcia, logowanie bez PII, wersjonowanie zmian.

## Bezpieczny MVP, jeśli nie ma backendu
Nie udawaj wysyłki. Pozostaw `mailto` z jasną informacją lub wdroż tylko bezplikowy formularz przez bezpieczny provider z zaakceptowanym RODO/umową. Plik dopiero w etapie backendu.

## QA
- Normalne STL, 3MF i JPG, błędna nazwa `.stl.exe`, zero-byte, plik >limit, wiele plików, podwójne kliknięcie submit, utrata sieci, spam i 429.
- Test braku możliwości listowania i odczytu plików jednego klienta przez innego; URL z tokenem musi wygasać.
- Testy user journey desktop/mobile, potwierdzenie backend, notyfikacja do właściciela, cleanup, cookies consent i polityka prywatności.

## Deployment
Backend oznacza nowy koszt/zależność. Wymaga explicite zgody właściciela, osobnej konfiguracji środowisk i secretów. Nie uruchamiaj produkcyjnego przesyłania plików na prywatny adres email przez skrypt frontendowy.
