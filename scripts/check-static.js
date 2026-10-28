/* Dependency-free check for generated HTML/JSON assets. Run after generate-pages.js. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const pages = require('../content/service-pages.json');
const articles = require('../content/articles.json');
const publicDir = path.join(__dirname, '..', 'public');
let checks = 0;
const load = (file) => fs.readFileSync(path.join(publicDir,file),'utf8');
for(const page of pages) {
 const file = path.join(page.slug,'index.html');
 const html = load(file);
 assert.match(html,/<html lang="pl">/);checks++;
 assert.match(html,/<h1[^>]*>[^<]+<\/h1>/);checks++;
 assert.match(html,/name="description"/);checks++;
 assert.ok(!html.includes('undefined'));checks++;
 const allAnchors = [...html.matchAll(/href="(\/[^"]+)"/g)].map(match=>match[1]);
 for (const url of allAnchors) {
  if(url.startsWith('/#')) continue;
  const stripped = url.split('#')[0].split('?')[0];
  if(!stripped)continue;
  const filePath = path.join(publicDir, stripped.replace(/^\//,''));
  assert.ok(fs.existsSync(filePath) || fs.existsSync(path.join(filePath,'index.html')), `${file}: missing internal link ${url}`);
  checks++;
 }
}
for(const article of articles) {
 const html=load(`poradnik/${article.slug}.html`);
 assert.equal((html.match(/<h1>/g)||[]).length,1, `${article.slug}: expected exactly one H1`);
 checks++;
}
for(const file of ['img/favicon.svg','img/brand-icon.svg','img/logo-new.svg','img/logo-new-dark.svg','img/logo-new.png','robots.txt']) {
 assert.ok(fs.existsSync(path.join(publicDir,file)),`Missing ${file}`);checks++;
}
const app=fs.readFileSync(path.join(__dirname, '..','src','App.tsx'),'utf8');
assert.ok(!app.includes('const testimonials = '),'Unverified testimonials remain');checks++;
console.log(`PASS: ${checks} static checks; ${pages.length} service pages, ${articles.length} articles.`);
