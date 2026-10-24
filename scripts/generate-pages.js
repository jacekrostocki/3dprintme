const fs = require('fs');
const articles = require('../content/articles.json');

const escapeHtml = value => value
	.replaceAll('&', '&amp;')
	.replaceAll('"', '&quot;')
	.replaceAll('<', '&lt;')
	.replaceAll('>', '&gt;');

const images = {
	'jak-przygotowac-plik': ['czesci-techniczne-3d', 'Koło zębate i uchwyt wykonane w technologii druku 3D'],
	'pla-petg-tpu': ['odbojniki-3d', 'Wydrukowany dystans przy kółku meblowym'],
	'ile-kosztuje-druk-3d': ['mechanizmy-3d', 'Mechanizm z kół zębatych wykonany w druku 3D'],
	'zastosowania-druku-3d': ['organizery-3d', 'Biurkowy organizer z miejscem na telefon, długopis i drobiazgi'],
	'druk-3d-male-serie': ['klipsy-3d', 'Uchwyt na przewody USB zamocowany na krawędzi biurka'],
};
const articleBodyExtensions = {
	'jak-przygotowac-plik': fs.readFileSync('content/article-modeling-links.html', 'utf8'),
	'pla-petg-tpu': fs.readFileSync('content/pla-petg-tpu-materials.html', 'utf8'),
};

fs.mkdirSync('public/poradnik', { recursive: true });
fs.copyFileSync('src/site.css', 'public/site.css');
fs.copyFileSync('content/LOGO.png', 'public/img/logo.png');
fs.copyFileSync('content/privacy.html', 'public/prywatnosc.html');

const page = (title, description, body) => `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | 3DPrintMe</title><meta name="description" content="${escapeHtml(description)}"><meta property="og:locale" content="pl_PL"><meta property="og:type" content="article"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="/site.css"><link rel="icon" href="/img/logo.png" type="image/png"></head><body><main class="wrap"><article class="prose"><a class="back" href="/">← Strona główna</a><p class="eyebrow">PORADNIK DRUKU 3D</p><h1>${escapeHtml(title)}</h1>${body}<p><a class="button" href="/#kontakt">Zapytaj o swój projekt ↗</a></p><p><a class="text-link" href="/poradnik/">Wszystkie artykuły</a></p></article></main></body></html>`;

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
