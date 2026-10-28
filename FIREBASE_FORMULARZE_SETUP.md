# Firebase — uruchomienie formularza STL oraz formularza kontaktowego

## Status i ograniczenia

✅ Kod UI dwóch niezależnych formularzy, funkcja HTTPS `submitInquiry`, parsowanie i walidacja pliku,
prywatny zapis Cloud Storage, metadane Firestore, Resend i cleanup po 90 dniach są przygotowane.
✅ Nie zmieniono `src/site.css` ani `public/site.css`, układu mobile ani treści artykułów (poza wyraźnymi opisami formularzy i polityką prywatności).
⚠️ Nie uruchomiono środowiska Firebase, nie utworzono kluczy i nie wykonano deployu ani end-to-end testu wysyłki.
⚠️ Rejestr npm był niedostępny tutaj. Zależności funkcji trzeba zainstalować lokalnie w katalogu `functions`.

## Co trzeba założyć (konkretne usługi)

1. **Firebase Hosting** — już istnieje; przekierowanie `/api/inquiry` do Cloud Function `submitInquiry`.
2. **Firebase Cloud Functions, 2nd gen** — funkcja HTTP waliduje dane, antyspam i plik; zapisuje zgłoszenie, wysyła e-mail. Region `europe-west1` (Belgia).
3. **Cloud Firestore** — dwie kolekcje (tworzą się automatycznie po pierwszym zapisie): `website_inquiries` (zgłoszenia) i `inquiry_rate_limits` (limity). Utwórz bazę domyślną `(default)`, wybierz region EU i **Production mode**.
4. **Cloud Storage for Firebase** — utwórz domyślny bucket (nazwa nadawana w konsoli, zwykle `PROJECT_ID.firebasestorage.app`). Pliki trafią do `website-inquiries/{ID}/{plik}`. Nie publiczne. Region UE według wyboru w konsoli.
5. **Firebase / Google Cloud Secret Manager** — 3 sekrety: `TURNSTILE_SECRET` (ochrona antyspamowa), `RESEND_API_KEY` (wysyłka e-mail), `RATE_LIMIT_SALT` (unikalny, długi losowy tekst).
6. **Google Cloud Scheduler** — tworzony przy wdrożeniu `cleanupWebsiteInquiries`, codzienny cleanup plików i danych po 90 dniach.
7. **Cloudflare Turnstile** (usługa zewnętrzna) — darmowy widget antyspamowy, Site Key do frontendu i Secret Key do Firebase. Dodaj domeny `3dprintme.pl`, `www.3dprintme.pl` i opcjonalnie `localhost` dla prób.
8. **Resend** (usługa zewnętrzna) — zweryfikuj domenę `3dprintme.pl` przez rekordy DNS, skonfiguruj nadawcę `formularz@3dprintme.pl`. Adres odbiorcy może pozostać `kontakt.3dprintme@gmail.com`.

### Firebase ma plan Blaze, czyli potencjalne koszty
Cloud Functions i Cloud Storage wymagają **Blaze**. Przy małym ruchu część zasobów może zmieścić się w bezpłatnych limitach, ale skonfiguruj budżet i alerty w Google Cloud Billing (alert nie wyłącza automatycznie wydatków). Szczegóły: https://firebase.google.com/pricing

## Kroki w konsoli i terminalu (kolejno)

**0. Najpierw zachowaj kopię dotychczasowych reguł Firestore i Storage.** W `firestore.rules` i `storage.rules` są przykładowe bardzo restrykcyjne reguły, które blokują wszystkie inne kolekcje/ścieżki. Jeśli projekt ma inne aplikacje korzystające z DB/Storage, połącz reguły zamiast nadpisywać je w ciemno.

**1.** Firebase Console → projekt `dprintme-1579c` (zweryfikuj, czy to właściwy projekt) → Upgrade → **Blaze**. Podłącz billing i ustaw alert budżetu.

**2.** Firebase Console → Build → Firestore Database → Create database → (default) → lokalizacja w UE, tryb produkcyjny. Następnie Build → Storage → Get started → domyślny bucket, wybrana lokalizacja UE.

**3.** Cloudflare Dashboard → Turnstile → Add widget → domeny `3dprintme.pl` i `www.3dprintme.pl`. Skopiuj **Site Key** (publiczny) i **Secret Key** (prywatny).

**4.** Resend Dashboard → Domains → dodaj `3dprintme.pl` → wykonaj w DNS rekordy SPF/DKIM wymagane przez Resend. Zweryfikuj domenę i wygeneruj API Key z prawem do wysyłania wiadomości.

**5.** W katalogu projektu uruchom:

```bash
npm ci
cd functions
npm install
npm test
cd ..
```

Uwaga: w `functions` celowo nie ma `package-lock.json`, ponieważ nie miałem dostępu do npm registry. Pierwsze `npm install` wygeneruje lockfile. **Przed dalszą instalacją w CI** zapisz go w repozytorium, wtedy `cd functions && npm ci` będzie deterministyczne.

**6.** Utwórz plik `functions/.env` na podstawie `functions/.env.example`, wypełnij:

```
NOTIFY_TO=kontakt.3dprintme@gmail.com
EMAIL_FROM=3DPrintMe <formularz@3dprintme.pl>
ALLOWED_HOSTNAMES=3dprintme.pl,www.3dprintme.pl
ALLOWED_ORIGINS=https://3dprintme.pl,https://www.3dprintme.pl
```

Uwaga: `EMAIL_FROM` działa dopiero po weryfikacji domeny/nadawcy w Resend. **Nie wrzucaj pliku `.env` do Git.**

**7.** Zainstaluj Firebase CLI (jeżeli potrzeba `npm install -g firebase-tools`), zaloguj `firebase login`, sprawdź `firebase use`. W katalogu projektu ustaw 3 sekrety:

```bash
firebase functions:secrets:set TURNSTILE_SECRET
firebase functions:secrets:set RESEND_API_KEY
firebase functions:secrets:set RATE_LIMIT_SALT
```

`RATE_LIMIT_SALT` = losowy, niepubliczny tekst, np. wygenerowany komendą `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`; nie wpisuj do kodu.

**8.** Wdroż backend i reguły; **UWAGA**: poniższe dwie komendy dotyczące reguł uruchamiaj tylko po porównaniu ich z aktualnymi regułami w istniejącym projekcie:

```bash
firebase deploy --only functions
firebase deploy --only firestore:rules,storage
```

**9.** Utwórz `.env.local` w katalogu projektu (na bazie `.env.example`) z publicznym kluczem Turnstile:

```
REACT_APP_TURNSTILE_SITE_KEY=TWÓJ_PUBLICZNY_SITE_KEY
```

To klucz publiczny, nie sekret. Bez niego formularze pozostają w trybie `mailto:`.

**10.** Odbuduj i wdroż frontend + rewrite:

```bash
npm run check:static
npm run check:forms
npm run build
firebase deploy --only hosting
```

**11.** Test produkcyjny: wyślij pytanie i wycenę z testowym STL, sprawdź: (a) odpowiedź z ID na stronie, (b) Firestore → `website_inquiries`, (c) Storage → plik we wskazanej ścieżce, (d) przyjście maila na `NOTIFY_TO`, (e) logi funkcji Firebase. Wykonaj też test nieprawidłowego pliku i test z telefonu.

## Przepływ danych

```text
Przeglądarka / klient
  ├─ Formularz wyceny + plik STL/3MF do 15 MB
  └─ Formularz kontaktowy (bez pliku)
           ↓ Turnstile Site Key → token
Firebase Hosting /api/inquiry (HTTPS, same-origin)
           ↓ Rewrite
Cloud Functions submitInquiry (region europe-west1)
           ├─ Turnstile Secret → weryfikacja tokenu/hosta
           ├─ Firestore inquiry_rate_limits → limit 12 dziennie/IP (hash)
           ├─ Firestore website_inquiries → dane i status
           ├─ Cloud Storage website-inquiries/{id}/{file} → prywatny STL
           └─ Resend API Secret → e-mail do właściciela
           ↓
      HTTP 201 {ok:true,id:"..."}

Cloud Scheduler cleanupWebsiteInquiries → usunięcie po 90 dniach (pliki + Firestore)
```

**Brak anonimowych uprawnień zapisu plików do Storage** — wyłącznie Firebase Admin SDK funkcji. Nie ustawiaj publicznych URL-ów do modeli. Zweryfikuj reguły i w konsoli również uprawnienia Google Cloud IAM do bucketu.

## Prywatność i bezpieczeństwo

- Dane osobowe: adres e-mail, opis, opcjonalne imię, model; tylko administracyjne odczyty w Firebase Console.
- Walidacja po stronie serwera: dozwolone rozszerzenia i magic bytes, rozmiar, ilość sztuk, adres e-mail.
- Turnstile weryfikowane po stronie serwera; ograniczenie dzienne per zahashowany IP, limit instancji funkcji. Nie zastępuje to monitorowania spamu oraz zużycia.
- Backend wysyła **powiadomienie tekstowe, bez kopiowania załącznika do e-maila**. Model pozostaje w prywatnym Storage.
- Retencja 90 dni: zadanie Cloud Scheduler usuwa pliki **przed** wpisami Firestore. **Nie włączaj dodatkowo TTL dla `website_inquiries`**, żeby nie usuwać ścieżek, zanim cleanup usunie załączniki.
- Po aktywacji zaktualizuj dane i informacje w polityce prywatności oraz oceń zgodność z RODO i umowy powierzenia z dostawcami. Serwer Resend i Cloudflare mogą przetwarzać dane poza Polską; sprawdź ich polityki i lokalizacje.
- Nie publikuj plików `.env`, sekretów, modeli użytkowników ani prywatnych adresów.

## Testy i możliwe problemy

- W środowisku pracy nie był dostępny `npm` registry. Nie mogłem sprawdzić instalacji `functions/node_modules`, kompilacji React ani rzeczywistego połączenia z usługami.
- Cloudflare Turnstile widget może wymagać dodania `localhost` do listy domen tylko w testach; konfiguracja funkcji zawiera osobną listę dozwolonych nazw hosta.
- Jeśli cloud function zwróci HTTP 403, sprawdź `ALLOWED_ORIGINS`, `ALLOWED_HOSTNAMES` i sekrety Turnstile. Przy błędzie 503 sprawdź Firestore, Storage i uprawnienia funkcji.
- Przy zapisanym zgłoszeniu, ale nieotrzymanym e-mailu sprawdź pole `notificationStatus=failed` w Firestore i logi funkcji; powiadomienie jest niezależne od zapisu.
- Jeśli masz własne reguły Firebase, ostrożnie scal je z przykładami z paczki; nie zastępuj reguł wszystkich aplikacji ślepym deployem.
- Przed uruchomieniem na produkcji warto rozważyć integracyjny test formularza i weryfikację responsywności w realnej przeglądarce.
