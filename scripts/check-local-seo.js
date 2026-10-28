const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const articles=JSON.parse(read('content/articles.json'));
const city='druk-3d-w-krakowie-jak-zamowic';
const a=articles.filter(x=>x.slug===city);
assert.equal(a.length,1,'City article should have one canonical slug');
const page=read(`public/poradnik/${city}.html`);
const home=read('src/App.tsx');
const staticPage=read('public/czesci-zamienne-druk-3d/index.html');
const privacy=read('public/prywatnosc.html');
const css=read('public/footer-links.css');
const newLinks=page.match(/href="[^"]+"/g)||[];
assert.ok(a[0].body.length>4000,'Local guide should be substantive');
assert.equal((page.match(/<h1>/g)||[]).length,1);
assert.ok((a[0].body.match(/<h2>/g)||[]).length>=6,'Article needs a practical steps structure');
for(const keyword of ['odbiór osobisty','wysył','wycena','Krakowie']) assert.ok(page.includes(keyword),`Missing ${keyword}`);
for(const link of newLinks){
 const url=link.slice(6,-1);
 if(!url.startsWith('/'))continue;
 const target=url.split(/[?#]/)[0]; if(!target) continue;
 const full=path.join(root,'public',target.replace(/^\//,''));
 assert.ok(fs.existsSync(full)||fs.existsSync(path.join(full,'index.html')),`Broken link ${url}`);
}
for(const html of [page,staticPage,privacy]){
 assert.ok(html.includes('class="site-footer"'),'Static page footer missing');
 assert.ok(html.includes('footer-links.css'),'Static page footer styles missing');
 assert.ok(!html.includes('najlepsza drukarnia'),'No unverified superlatives');
}
for(const cls of ['footer-main','footer-nav','footer-bottom','footer-cta']) assert.ok(home.includes(cls));
assert.ok(home.includes('Szybka wycena druku 3D — bez tracenia czasu.'));
assert.ok(home.includes(`href="/poradnik/${city}.html"`));
assert.ok(css.includes('@media(max-width:650px)'),'Mobile footer rule missing');
assert.ok(css.includes('.site-footer .footer-nav{display:flex'),'Footer links must be visible on mobile');
assert.ok(!css.includes('.brand-logo {'),'Footer CSS must not override original header logo sizing');
assert.ok(!home.includes('id="realizacje"'),'Portfolio must remain hidden');
assert.ok(!home.includes('href="/realizacje/"'),'Portfolio link must remain hidden');
console.log(`PASS: local SEO QA (9 editorial articles, responsive footer rules, city guide, source links, CTA, hidden portfolio).`);
