# Analityka konwersji i SEO — wymagania

## Przed wdrożeniem
- Zweryfikuj Google Search Console i czy domena jest własnością właściciela; pobierz raport Zapytań, Stron i Indeksowanie (3 miesiące); bez danych nie zakładaj pozycji.
- Jeśli GA4/Metricool/Pixels już istnieją, unikaj duplikowania tagów i sprzecznych eventów.

## Zdarzenia
`quote_form_view`, `quote_form_start`, `quote_upload_success`, `quote_submit_success`, `quote_submit_error`, `email_link_click`, `case_study_click`.

Parametry: `page_path`, `material_selected`, `files_count` (liczba), `source_cta` — **nie** przesyłaj w eventach emaila, telefonu, treści wiadomości, nazwy pliku, URL signed linku ani danych innych osób. Ustal politykę zgód dla trackingów zgodną z prawem.

## Raport po 30/60/90 dniach
- GSC: clicks, impressions, CTR, średnia pozycja dla lokalnych fraz / stron, wykluczenia indeksowania.
- Leady: liczba formularzy zakończonych sukcesem, źródła ruchu, udział klientów z rzeczywistym zapytaniem, wartość zleceń.
- Testuj tylko po zmianie, porównuj podobne okna sezonowe. Nie przypisuj skutków na podstawie 2 kliknięć.
