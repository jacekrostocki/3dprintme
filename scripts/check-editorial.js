/* Content integrity checks with no npm dependencies. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const articles = require('../content/articles.json');
const services = require('../content/service-pages.json');
const root = path.join(__dirname, '..');
let checks = 0;
const known = new Set();
function validLocal(link) {
  const clean = decodeURIComponent(link.split(/[?#]/)[0]);
  if (!clean || clean === '/') return true;
  const target = path.join(root, 'public', clean.replace(/^\//, ''));
  return fs.existsSync(target) || fs.existsSync(path.join(target, 'index.html'));
}
function validateLinks(html, slug) {
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (href.startsWith('/')) {
      assert.ok(validLocal(href), `${slug}: broken internal link ${href}`); checks++;
      assert.ok(!href.startsWith('/realizacje/'), `${slug}: portfolio not yet public`);checks++;
    }
    if (href.startsWith('https://')) {
      assert.ok(html.includes('rel="noopener noreferrer"'), `${slug}: external links should be safe`);checks++;
    }
  }
}
for (const a of articles) {
  assert.ok(!known.has(a.slug), `duplicate slug: ${a.slug}`); known.add(a.slug);checks++;
  assert.ok(a.title.length >= 20 && a.description.length >= 50, `${a.slug}: incomplete meta`);checks++;
  assert.ok((a.body.match(/<h2/g) || []).length >= 4, `${a.slug}: insufficient structure`);checks++;
  assert.ok(a.body.length > 1800, `${a.slug}: content too short`);checks++;
  assert.ok(!a.body.includes('href="/poradnik/jak-przygotowac-stl/"'), `${a.slug}: legacy broken link`);checks++;
  assert.ok(!a.body.includes('|---|'), `${a.slug}: Markdown table inside HTML`);checks++;
  const publicFile = path.join(root, 'public', 'poradnik', `${a.slug}.html`);
  const page = fs.readFileSync(publicFile, 'utf8');
  assert.equal((page.match(/<h1>/g) || []).length, 1, `${a.slug}: expected one H1`);checks++;
  validateLinks(page, a.slug);
}
const app = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8');
assert.ok(!app.includes('id="realizacje"') && !app.includes('href="/realizacje/"'), 'Portfolio visible on homepage');checks++;
const otherServices = services.filter(s => !s.slug.startsWith('realizacje'));
otherServices.forEach(s => validateLinks(s.body, s.slug));
for (const draft of services.filter(s => s.slug.startsWith('realizacje'))) {
  const publicFile = path.join(root, 'public', draft.slug, 'index.html');
  assert.match(fs.readFileSync(publicFile,'utf8'), /name="robots" content="noindex,follow"/, `${draft.slug}: missing noindex`);checks++;
}
console.log(`PASS: ${checks} editorial checks; ${articles.length} articles; ${otherServices.length} public service pages; 2 portfolio drafts hidden.`);
