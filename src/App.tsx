import React, { useState } from "react";
import {QuoteForm} from "./forms/QuoteForm";
import {ContactForm} from "./forms/ContactForm";
import { company } from "./config";

const services = [
  {number: "01", title: "Części zamienne i użytkowe", text: "Uchwyty, mocowania, dystanse, osłony i elementy dopasowane do konkretnego zastosowania.", href: "/czesci-zamienne-druk-3d/"},
  {number: "02", title: "Prototypowanie 3D", text: "Modele do sprawdzenia wymiarów, ergonomii, montażu i kolejnych wariantów projektu.", href: "/prototypowanie-3d/"},
  {number: "03", title: "Druk 3D małych serii", text: "Pojedyncze sztuki i krótkie partie powtarzalnych detali bez kosztów formy produkcyjnej.", href: "/druk-3d-male-serie/"},
  {number: "04", title: "Pomoc w przygotowaniu modelu", text: "Masz szkic i wymiary, ale nie masz pliku STL? Zapytaj o możliwość opracowania geometrii.", href: "/projektowanie-modeli-3d/"},
];
// Wybrane poradniki na stronie głównej; pełna biblioteka jest w /poradnik/.
const articles = [
  ["druk-3d-w-krakowie-jak-zamowic", "KRAKÓW · PRAKTYCZNIE", "Jak zamówić druk 3D w Krakowie?", "Od przygotowania modelu i wyceny po odbiór osobisty lub wysyłkę."],
  ["ile-kosztuje-druk-3d", "WYCENA", "Ile kosztuje druk 3D?", "Zrozum, co wpływa na cenę: geometria, podpory i przygotowanie modelu."],
  ["druk-3d-ze-zdjecia-szkicu", "OD POMYSŁU DO MODELU", "Druk 3D ze zdjęcia lub szkicu", "Co zmierzyć i sfotografować, gdy nie masz gotowego pliku STL?"],
];
const articleImages: Record<string, {file: string; alt: string}> = {
  "druk-3d-w-krakowie-jak-zamowic": {file: "czesci-techniczne-3d", alt: "Ilustracja poglądowa detali technicznych drukowanych w 3D"},
  "jak-przygotowac-plik": {file: "czesci-techniczne-3d", alt: "Ilustracja poglądowa kół zębatych i uchwytów z druku 3D"},
  "pla-petg-tpu": {file: "odbojniki-3d", alt: "Ilustracja poglądowa osłony koła meblowego"},
  "ile-kosztuje-druk-3d": {file: "mechanizmy-3d", alt: "Ilustracja poglądowa mechanizmu drukowanego w 3D"},
  "zastosowania-druku-3d": {file: "organizery-3d", alt: "Ilustracja poglądowa organizera biurkowego"},
  "druk-3d-male-serie": {file: "klipsy-3d", alt: "Ilustracja poglądowa uchwytów na przewody"},
  "druk-3d-ze-zdjecia-szkicu": {file: "czesci-techniczne-3d", alt: "Ilustracja poglądowa detali technicznych z druku 3D"},
};
const faq = [
  ["Ile kosztuje druk 3D na zamówienie?", "Cena zależy m.in. od geometrii, zużycia materiału, czasu pracy drukarki, podpór i liczby sztuk. Wycenę przygotowujemy indywidualnie po sprawdzeniu projektu."],
  ["Czy mogę zamówić pojedynczą sztukę?", "Tak. Druk FDM nadaje się również do wykonania pojedynczego egzemplarza, prototypu lub próbki."],
  ["Czy mogę zamówić wydruk bez pliku STL?", "Możesz przesłać zdjęcia, wymiary i szkic. Ocenimy, czy możemy przygotować potrzebny model lub dostosować istniejący projekt."],
  ["Jakie materiały drukujecie?", "Podstawowe materiały to PLA, PETG i TPU. Dostępność wybranego koloru i filamentu potwierdzimy przed przyjęciem zamówienia."],
  ["Czy mogę odebrać wydruk w Krakowie?", "Odbiór osobisty jest możliwy po wcześniejszym uzgodnieniu. Możemy również uzgodnić wysyłkę na terenie Polski."],
  ["Czy mogę dołączyć plik STL?", "Tak, formularz wyceny obsługuje STL, 3MF i inne formaty. Przed uruchomieniem zabezpieczonej wysyłki online możesz dołączyć plik do przygotowanej wiadomości e-mail."],
];

export default function App() {
  const [menu, setMenu] = useState(false);
  return <>
    <a className="skip" href="#main">Przejdź do treści</a>
    <header className="header wrap">
      <a className="brand" href="/" aria-label="3DPrintMe — strona główna"><img className="brand-logo" src="/img/logo-new.svg" width="235" height="56" alt="3DPrintMe" /></a>
      <button className="menu-toggle" type="button" aria-expanded={menu} aria-controls="navigation" onClick={()=>setMenu(!menu)}>{menu ? "Zamknij" : "Menu"}</button>
      <nav id="navigation" className={menu ? "open" : ""} aria-label="Główna nawigacja">
        {[ ["uslugi", "Usługi"], ["materialy", "Materiały"], ["poradnik", "Poradnik"], ["pytania", "Kontakt"], ["kontakt", "Wyceń druk"] ].map(([id,label]) => <a className={id === "kontakt" ? "button small" : ""} key={id} href={`/#${id}`} onClick={()=>setMenu(false)}>{label}</a>)}
      </nav>
    </header>
    <main id="main">
      <section className="hero wrap">
        <div><p className="eyebrow">LOKALNY DRUK 3D · KRAKÓW · WYSYŁKA W POLSCE</p>
          <h1>Druk 3D na <span>zamówienie</span> w Krakowie</h1>
          <p className="lead">Funkcjonalne części zamienne, prototypy, uchwyty i krótkie serie FDM z PLA, PETG i TPU. Masz plik STL albo pomysł? Opisz swój projekt i zapytaj o wycenę.</p>
          <div className="actions"><a className="button" href="#kontakt">Poproś o wycenę <span aria-hidden="true">↗</span></a><a className="text-link" href="#poradnik">Przeczytaj poradnik ↓</a></div>
          <p className="hero-fast-quote"><strong>Szybka wycena druku 3D — bez tracenia czasu.</strong> Prześlij model, liczbę sztuk i wymagania w jednym zgłoszeniu. <a href="#kontakt">Przejdź do formularza wyceny</a>.</p>
          <p className="fine">Od pojedynczego elementu do małej serii · Odbiór osobisty po uzgodnieniu</p>
        </div>
        <figure className="hero-art"><img src="/img/drukarka.svg" width="540" height="450" alt="Schemat drukarki FDM nakładającej kolejne warstwy modelu"/><figcaption>Druk 3D FDM — od projektu do elementu użytkowego.</figcaption></figure>
      </section>
      <section className="section wrap" id="uslugi"><p className="eyebrow">USŁUGI DRUKU 3D W KRAKOWIE</p><h2>Co możemy wykonać?</h2><p className="section-intro">Dobieramy zakres pracy do konkretnego zastosowania. Zapoznaj się z opisami usług i ograniczeniami technologii FDM.</p>
        <div className="cards services-grid">{services.map(s=><article className="card" key={s.number}><span className="number">{s.number}</span><h3>{s.title}</h3><p>{s.text}</p><a className="text-link" href={s.href}>Dowiedz się więcej ↗</a></article>)}</div>
      </section>
      <section className="tint" id="materialy"><div className="section wrap material-layout"><div><p className="eyebrow">MATERIAŁ MA ZNACZENIE</p><h2>PLA, PETG i TPU – dobór do zastosowania</h2><p>Powiedz, czy część pracuje pod obciążeniem, na zewnątrz lub w podwyższonej temperaturze. Dostępność konkretnego koloru i filamentu potwierdzamy przy wycenie.</p><a className="text-link" href="/poradnik/pla-petg-tpu.html">Porównaj materiały ↗</a></div><div className="materials">
        {[["PLA","Modele i przymiarki","Do elementów demonstracyjnych, organizacji przestrzeni i prototypów."],["PETG","Elementy użytkowe","Do obudów, uchwytów i akcesoriów wymagających większej odporności niż PLA."],["TPU","Elastyczne osłony","Do odbojników, stopków i części, które powinny się uginać."],["Pozostałe","Zapytaj o dostępność","Inne tworzywa dobieramy indywidualnie — nie wszystkie są stale dostępne."]].map(([name,title,text])=><div className="material" key={name}><strong>{name}</strong><div><h3>{title}</h3><p>{text}</p></div></div>)}
      </div></div></section>
      <section className="tint"><div className="section wrap note"><p className="eyebrow">LOKALNA PRACOWNIA · KRAKÓW</p><h2>Indywidualny druk 3D, bez zbędnych formalności</h2><p>Realizujemy zapytania od klientów z Krakowa i innych miast. Odbiór osobisty jest możliwy po wcześniejszym uzgodnieniu; realizujemy również wysyłkę. Nie prowadzimy otwartego punktu obsługi bez umawiania wizyt.</p><a className="text-link" href="/poradnik/druk-3d-w-krakowie-jak-zamowic.html">Jak zamówić druk 3D w Krakowie? ↗</a></div></section>
      <section className="section wrap" id="faq"><div className="section-top"><div><p className="eyebrow">PYTANIA I ODPOWIEDZI</p><h2>Najczęstsze pytania o druk 3D</h2></div></div><div className="faq-list">{faq.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
      <section className="tint" id="poradnik"><div className="section wrap"><div className="section-top"><div><p className="eyebrow">WARTO WIEDZIEĆ</p><h2>Poradnik druku 3D</h2></div><a className="text-link" href="/poradnik/">Wszystkie artykuły ↗</a></div><div className="cards article-grid">{articles.map(([slug,tag,title,text])=><article className="card article" key={slug}><a href={`/poradnik/${slug}.html`}><img className="article-image" src={`/img/${articleImages[slug].file}.webp`} width="400" height="300" alt={articleImages[slug].alt} loading="lazy" decoding="async"/></a><span className="eyebrow">{tag}</span><h3><a href={`/poradnik/${slug}.html`}>{title}</a></h3><p>{text}</p><a className="text-link" href={`/poradnik/${slug}.html`}>Czytaj artykuł ↗</a></article>)}</div><p className="fine">Grafiki przy artykułach są ilustracjami poglądowymi, a nie fotografiami realizacji klientów.</p></div></section>
      <section className="section wrap contact" id="kontakt">
        <div><p className="eyebrow">WYCENA I UPLOAD STL / 3MF</p><h2>Wyceń swój projekt</h2>
          <p>Masz plik STL, 3MF, STEP lub zdjęcie elementu? Opisz zastosowanie, wymiary, liczbę sztuk i preferowany materiał. Przygotujemy indywidualną wycenę.</p>
          <p><a className="text-link" href={`mailto:${company.email}`}>{company.email}</a></p>
          <p className="fine">Wytrzymałość druku FDM zależy od materiału, geometrii i kierunku warstw. Części do zastosowań krytycznych wymagają odrębnej oceny.</p>
        </div>
        <QuoteForm/>
      </section>
      <section className="tint" id="pytania"><div className="section wrap contact">
        <div><p className="eyebrow">KONTAKT Z 3DPRINTME</p><h2>Masz pytanie?</h2>
          <p>Nie potrzebujesz jeszcze wyceny? Napisz w sprawie materiałów, sposobu realizacji, możliwości odbioru lub innych kwestii związanych z drukiem 3D.</p>
          <p>Możesz też skontaktować się bezpośrednio: <a className="text-link" href={`mailto:${company.email}`}>{company.email}</a>.</p>
        </div>
        <ContactForm/>
      </div></section>
    </main>
    <footer className="site-footer" aria-label="Stopka strony">
      <div className="wrap footer-main">
        <div className="footer-about">
          <a href="/" className="footer-brand" aria-label="3DPrintMe — strona główna"><img src="/img/logo-new.svg" width="190" height="48" alt="3DPrintMe" loading="lazy" /></a>
          <p>Druk 3D FDM na zamówienie — części użytkowe, prototypy i krótkie serie z PLA, PETG i TPU.</p>
          <p className="footer-location">Kraków · odbiór osobisty po umówieniu · wysyłka w Polsce</p>
          <p>Opinie klientów: <a className="text-link" href={company.trustpilotUrl} target="_blank" rel="noopener noreferrer">Sprawdź 3DPrintMe w Trustpilot ↗</a></p>
        </div>
        <nav className="footer-nav" aria-label="Usługi">
          <h2 className="footer-title">Usługi</h2>
          <a href="/czesci-zamienne-druk-3d/">Części zamienne 3D</a>
          <a href="/prototypowanie-3d/">Prototypowanie 3D</a>
          <a href="/druk-3d-male-serie/">Krótkie serie</a>
          <a href="/projektowanie-modeli-3d/">Przygotowanie modeli</a>
        </nav>
        <nav className="footer-nav" aria-label="Poradnik i informacje">
          <h2 className="footer-title">Przydatne informacje</h2>
          <a href="/poradnik/druk-3d-w-krakowie-jak-zamowic.html">Druk 3D w Krakowie — jak zamówić?</a>
          <a href="/poradnik/ile-kosztuje-druk-3d.html">Od czego zależy cena?</a>
          <a href="/poradnik/jak-przygotowac-plik.html">Jak przygotować plik STL?</a>
          <a href="/poradnik/">Wszystkie poradniki</a>
        </nav>
        <div className="footer-contact">
          <h2 className="footer-title">Kontakt i wycena</h2>
          <p>Masz plik albo pomysł? Opisz projekt i zapytaj o możliwość realizacji.</p>
          <a className="footer-cta" href="/#kontakt">Wyślij zapytanie do wyceny ↗</a>
          <a className="footer-email" href={`mailto:${company.email}`}>{company.email}</a>
          <a href="/#pytania">Masz pytanie? Formularz kontaktowy</a>
        </div>
      </div>
      <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} 3DPrintMe · Druk 3D na zamówienie w Krakowie</span><a href="/prywatnosc.html">Polityka prywatności</a></div>
    </footer>
  </>;
}
