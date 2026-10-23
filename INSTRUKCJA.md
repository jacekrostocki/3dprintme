# Twoja strona usług druku 3D

Projekt oparty na Landy React Template (licencja MIT w LICENSE). Zachowano React, TypeScript, lokalne fonty i paletę szablonu. Nowy układ korzysta z lekkiego CSS, bez ładowania bibliotek UI szablonu.

## Uruchomienie w VS Code
1. Rozpakuj ZIP i otwórz folder `druk3d-strona` w VS Code.
2. W terminalu wpisz `npm ci` (potrzebny Node.js i npm).
3. Wpisz `npm start`. Otwórz adres pokazany w terminalu, zwykle http://localhost:3000.
4. Zmiany w kodzie React zobaczysz automatycznie. Po zmianach CSS i treści artykułów zatrzymaj serwer (Ctrl+C) i uruchom go ponownie.

## Zmień przed publikacją
- `src/config.ts`: nazwa pracowni, e-mail, telefon, lokalizacja. Puste e-mail i telefon są celowe: nie ma fikcyjnych odbiorców. Bez adresu formularz pokaże komunikat i niczego nie wyśle.
- `src/index.tsx`: oferta i treści głównej strony. Potwierdź rzeczywiście oferowane usługi, materiały i lokalizację (roboczo Kraków).
- `src/site.css`: kolory, układ, typografia.
- `public/index.html`: tytuł SEO i opis — aktualizuj je osobno przy zmianie miejscowości lub nazwy.
- `content/articles.json`: trzy artykuły. Ich treść jest w polu body (HTML). Nowy artykuł dodaj tu i do listy articles w src/index.tsx.
- `public/prywatnosc.html`: wyraźnie oznaczony szkic do uzupełnienia własnymi danymi i rzeczywistymi warunkami przetwarzania. Nie jest gotową polityką do publikacji.

## Formularz i pliki
W domyślnej wersji przycisk przygotowuje e-mail przez mailto. Potrzebny jest skonfigurowany program pocztowy. Strona nie wysyła danych sama. Użytkownik ręcznie dołącza model w poczcie.

Opcjonalnie ustaw formEndpoint w config.ts na własny endpoint HTTPS. Formularz wyśle pola name, email, message, file jako multipart/form-data. W tym trybie pojawi się pole pliku (20 MB). Endpoint musi faktycznie zapisywać/wysyłać zapytania, obsługiwać CORS i zwracać błąd przy niepowodzeniu. Po stronie serwera trzeba zweryfikować pliki, limit rozmiaru i zabezpieczyć endpoint przed spamem. Nie wklejaj sekretów do kodu React. Zaktualizuj informacje o prywatności po wybraniu dostawcy.

## Gotowa wersja i Firebase Hosting
Folder build zawiera sprawdzoną kompilację do publikacji. NIE edytuj go ręcznie. Po zmianach wpisz `npm run build`, aby go odtworzyć. Polecenie generuje też strony poradnika jako osobne HTML z własnymi tytułami i opisami. Nie wymagają JavaScript.

Build domyślnie używa domeny `https://3dprintme.pl` z `src/config.ts` do wygenerowania canonicali, sitemap.xml i odnośnika w robots.txt. Jeśli zmienisz domenę, zaktualizuj `company.siteUrl`. Możesz też jednorazowo nadpisać ją przed buildem, np. w PowerShell: `$env:SITE_URL="https://inna-domena.pl"`.

Dostarczony firebase.json wskazuje folder build. Jeśli masz Firebase CLI: zaloguj się `firebase login`, wybierz swój projekt `firebase use --add`, a następnie `firebase deploy --only hosting`. Po podpięciu domeny zgłoś `https://3dprintme.pl/sitemap.xml` w Google Search Console. Alternatywnie skopiuj zawartość build na zwykły hosting statyczny w katalogu głównym domeny. Nie otwieraj build/index.html podwójnym kliknięciem: wymaga serwera HTTP.

Nie wdrożono strony ani nie podłączono zewnętrznych usług. Po wdrożeniu zweryfikuj domenę w Google Search Console i prześlij mapę witryny. Nie ma płatności, śledzenia ani wymyślonych opinii i realizacji. Ilustracja jest poglądowa.

## Weryfikacja
Kompilacja produkcyjna sprawdzona komendą npm run build. Stos Create React App pochodzi z dostarczonego szablonu; instalacja może zgłaszać ostrzeżenia o starszych zależnościach. Modernizacja toolchainu jest osobnym zadaniem. Nie wykonuj automatycznego npm audit fix --force, bo może uszkodzić zgodność szablonu.
