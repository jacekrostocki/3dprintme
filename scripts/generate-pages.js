const fs = require('fs');
const articles = require('../content/articles.json');
const servicePages = require('../content/service-pages.json');
const {trustpilot: trustpilotUrl} = require('../src/brand-links.json');

const escapeHtml = value => value
	.replaceAll('&', '&amp;')
	.replaceAll('"', '&quot;')
	.replaceAll('<', '&lt;')
	.replaceAll('>', '&gt;');

const images = {
	'druk-3d-w-krakowie-jak-zamowic': ['czesci-techniczne-3d', 'Ilustracja poglądowa użytkowych części wykonanych w druku 3D'],
	'jak-przygotowac-plik': ['czesci-techniczne-3d', 'Koło zębate i uchwyt wykonane w technologii druku 3D'],
	'pla-petg-tpu': ['odbojniki-3d', 'Wydrukowany dystans przy kółku meblowym'],
	'ile-kosztuje-druk-3d': ['mechanizmy-3d', 'Mechanizm z kół zębatych wykonany w druku 3D'],
	'zastosowania-druku-3d': ['organizery-3d', 'Biurkowy organizer z miejscem na telefon, długopis i drobiazgi'],
	'druk-3d-male-serie': ['klipsy-3d', 'Uchwyt na przewody USB zamocowany na krawędzi biurka'],
	'druk-3d-ze-zdjecia-szkicu': ['czesci-techniczne-3d', 'Ilustracja poglądowa części technicznych z druku 3D'],
	'wytrzymalosc-druku-3d-kierunek-warstw': ['uchwyty-3d', 'Ilustracja poglądowa drukowanego uchwytu technicznego'],
	'pasowanie-tolerancje-druk-3d': ['mechanizmy-3d', 'Ilustracja poglądowa mechanicznych elementów drukowanych 3D'],
};
// All articles now contain a single, editorially reviewed body in articles.json.
// Previous fragments remain in content/ only as archive; appending them created repetition.
const articleBodyExtensions = {};
const isPortfolioDraft = slug => slug === 'realizacje' || slug.startsWith('realizacje/');

fs.mkdirSync('public/poradnik', { recursive: true });
fs.copyFileSync('src/site.css', 'public/site.css');
// Source logo is retained for rollback. The new SVG logo lives under public/img/.
fs.copyFileSync('content/privacy.html', 'public/prywatnosc.html');

const staticFooter = () => `<footer class="site-footer" aria-label="Stopka strony">
 <div class="wrap footer-main">
  <div class="footer-about"><a class="footer-brand" href="/" aria-label="3DPrintMe — strona główna"><img src="/img/logo-new.svg" width="190" height="48" alt="3DPrintMe" loading="lazy"></a><p>Druk 3D FDM na zamówienie — części użytkowe, prototypy i krótkie serie z PLA, PETG i TPU.</p><p class="footer-location">Kraków · odbiór osobisty po umówieniu · wysyłka w Polsce</p><p>Opinie klientów: <a class="text-link" href="${escapeHtml(trustpilotUrl)}" target="_blank" rel="noopener noreferrer">Sprawdź 3DPrintMe w Trustpilot ↗</a></p></div>
  <nav class="footer-nav" aria-label="Usługi"><h2 class="footer-title">Usługi</h2><a href="/czesci-zamienne-druk-3d/">Części zamienne 3D</a><a href="/prototypowanie-3d/">Prototypowanie 3D</a><a href="/druk-3d-male-serie/">Krótkie serie</a><a href="/projektowanie-modeli-3d/">Przygotowanie modeli</a></nav>
  <nav class="footer-nav" aria-label="Poradnik i informacje"><h2 class="footer-title">Przydatne informacje</h2><a href="/poradnik/druk-3d-w-krakowie-jak-zamowic.html">Druk 3D w Krakowie — jak zamówić?</a><a href="/poradnik/ile-kosztuje-druk-3d.html">Od czego zależy cena?</a><a href="/poradnik/jak-przygotowac-plik.html">Jak przygotować plik STL?</a><a href="/poradnik/">Wszystkie poradniki</a></nav>
  <div class="footer-contact"><h2 class="footer-title">Kontakt i wycena</h2><p>Masz plik albo pomysł? Opisz projekt i zapytaj o możliwość realizacji.</p><a class="footer-cta" href="/#kontakt">Wyślij zapytanie do wyceny ↗</a><a class="footer-email" href="mailto:kontakt.3dprintme@gmail.com">kontakt.3dprintme@gmail.com</a><a href="/#pytania">Masz pytanie? Formularz kontaktowy</a></div>
 </div><div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} 3DPrintMe · Druk 3D na zamówienie w Krakowie</span><a href="/prywatnosc.html">Polityka prywatności</a></div></footer>`;

const page = (title, description, body) => `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | 3DPrintMe</title><meta name="description" content="${escapeHtml(description)}"><meta property="og:locale" content="pl_PL"><meta property="og:type" content="article"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="/site.css"><link rel="stylesheet" href="/footer-links.css"><link rel="icon" href="/img/favicon.svg" type="image/svg+xml"></head><body><main class="wrap"><article class="prose"><a class="back" href="/">← Strona główna</a><p class="eyebrow">PORADNIK DRUKU 3D</p><h1>${escapeHtml(title)}</h1>${body}<p><a class="button" href="/#kontakt">Zapytaj o swój projekt ↗</a></p><p><a class="text-link" href="/poradnik/">Wszystkie artykuły</a></p></article></main>${staticFooter()}</body></html>`;

for (const article of articles) {
	const [image, alt] = images[article.slug];
	const photo = `<img class="article-cover" src="/img/${image}.webp" alt="${escapeHtml(alt)}"><p class="image-disclaimer">Ilustracja poglądowa wygenerowana cyfrowo, nie jest zdjęciem realizacji pracowni.</p>`;
	const body = article.body + (articleBodyExtensions[article.slug] || '');
	fs.writeFileSync(`public/poradnik/${article.slug}.html`, page(article.title, article.description, photo + body));
}

const articleList = articles.map(article => {
	const [image, alt] = images[article.slug];
	return `<img class="article-cover" loading="lazy" src="/img/${image}.webp" alt="${escapeHtml(alt)}"><h2><a href="/poradnik/${article.slug}.html">${escapeHtml(article.title)} ↗</a></h2><p>${escapeHtml(article.description)}</p>`;
}).join('');

fs.writeFileSync('public/poradnik/index.html', page(
	'Poradnik druku 3D',
	'Praktyczne informacje o przygotowaniu plików, materiałach, wycenie i krótkich seriach druku 3D.',
	articleList,
));

// Static, indexable service and portfolio pages. The directory URLs return actual HTML,
// not an SPA fallback: Firebase Hosting serves folder/index.html directly.
const sections = [
 ['/czesci-zamienne-druk-3d/', 'Części zamienne'],
 ['/prototypowanie-3d/', 'Prototypowanie'],
 ['/druk-3d-male-serie/', 'Małe serie'],
 ['/projektowanie-modeli-3d/', 'Projektowanie CAD'],
 ['/wycena/', 'Wycena'],
 ['/kontakt/', 'Kontakt'],
];
function staticHeader() {
 return `<header class="static-header wrap"><a href="/" aria-label="3DPrintMe strona główna"><img src="/img/logo-new.svg" alt="3DPrintMe" width="225" height="54"></a><nav aria-label="Nawigacja podstron"><a href="/#uslugi">Usługi</a><a href="/poradnik/">Poradnik</a><a href="/#kontakt" class="button small">Zapytaj o wycenę</a></nav></header>`;
}
for (const item of servicePages) {
 const isDraft = isPortfolioDraft(item.slug);
 const dir = `public/${item.slug}/`;
 fs.mkdirSync(dir,{recursive:true});
 const crumbs = `<nav class="breadcrumbs" aria-label="Okruszki"><a href="/">Strona główna</a> / ${escapeHtml(item.title.split(' | ')[0])}</nav>`;
 const related = sections.filter(x=>x[0] !== `/${item.slug}/`).slice(0,6).map(([url,title])=>`<a href="${url}">${escapeHtml(title)} →</a>`).join('');
 const htmlBody = `${staticHeader()}<main id="main" class="wrap"><article class="prose service-prose">${crumbs}<div class="eyebrow">3DPRINTME · DRUK 3D KRAKÓW</div>${item.body}<aside class="service-cta"><h2>Masz podobny projekt?</h2><p>Opisz zastosowanie, ilość sztuk i wymiary. Wycena jest przygotowywana indywidualnie.</p><a class="button" href="/#kontakt">Zapytaj o wycenę ↗</a></aside><div class="related-pages"><h2>Poznaj inne usługi</h2>${related}</div></article></main>${staticFooter()}`;
 fs.writeFileSync(`${dir}index.html`,`<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(item.title)}</title><meta name="description" content="${escapeHtml(item.description)}">${isDraft ? '<meta name="robots" content="noindex,follow">' : ''}<meta property="og:locale" content="pl_PL"><meta property="og:type" content="website"><meta property="og:title" content="${escapeHtml(item.title)}"><meta property="og:description" content="${escapeHtml(item.description)}"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="/site.css"><link rel="stylesheet" href="/footer-links.css"><link rel="icon" href="/img/favicon.svg" type="image/svg+xml"></head><body><a class="skip" href="#main">Przejdź do treści</a>${htmlBody}</body></html>`);
}
