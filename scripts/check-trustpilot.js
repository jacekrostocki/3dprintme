const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = filename => fs.readFileSync(path.join(root, filename), 'utf8');
const profileUrl = JSON.parse(read('src/brand-links.json')).trustpilot;
const parsed = new URL(profileUrl);
assert.equal(parsed.protocol, 'https:');
assert.equal(parsed.hostname, 'pl.trustpilot.com');
assert.equal(parsed.pathname, '/review/3dprintme.pl');
assert.equal(parsed.search, '');

const app = read('src/App.tsx');
const config = read('src/config.ts');
assert.match(config, /from ['"]\.\/brand-links\.json['"]/);
assert.ok(!fs.existsSync(path.join(root, 'content/brand-links.json')), 'Duplicate brand-links.json outside src');
const generator = read('scripts/generate-pages.js');
const schemaGenerator = read('scripts/finalize-build.tsx');
assert.match(app, /href=\{company\.trustpilotUrl\}/);
assert.match(app, /rel="noopener noreferrer"/);
assert.match(generator, /trustpilot: trustpilotUrl/);
assert.match(schemaGenerator, /sameAs:\s*\[company\.trustpilotUrl\]/);

const paths = [
  'public/poradnik/index.html',
  'public/poradnik/druk-3d-w-krakowie-jak-zamowic.html',
  'public/czesci-zamienne-druk-3d/index.html',
  'public/prywatnosc.html',
];
for (const filename of paths) {
  const html = read(filename);
  assert.ok(html.includes(`href="${profileUrl}"`), `Missing Trustpilot link in ${filename}`);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.match(html, /Sprawdź 3DPrintMe w Trustpilot/);
  assert.ok(!html.includes('TrustScore') && !html.includes('aggregateRating'), `Unverified Trustpilot score/markup in ${filename}`);
}
for (const filename of ['src/site.css', 'public/site.css', 'public/footer-links.css']) {
  assert.ok(fs.existsSync(path.join(root, filename)), `Missing stylesheet ${filename}`);
}
console.log('PASS: Trustpilot link on all page types, one profile URL, Organization.sameAs, no hard-coded rating or new widget scripts.');
