import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import articles from '../content/articles.json';
import App from '../src/App';
import { company } from '../src/config';

const buildDirectory = path.resolve('build');

function getSiteUrl() {
  const value = process.env.SITE_URL?.trim() || company.siteUrl;

  const url = new URL(value);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL must be the HTTPS origin of the public website, for example https://example.com');
  }

  return url.origin;
}

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function addHeadTags(html: string, tags: string) {
  if (!html.includes('</head>')) throw new Error('Could not find </head> in a generated page');
  return html.replace('</head>', `${tags}</head>`);
}

function metadataTags(url: string, image: string) {
  const safeUrl = escapeAttribute(url);
  const safeImage = escapeAttribute(image);
  return `<link rel="canonical" href="${safeUrl}"><meta property="og:url" content="${safeUrl}"><meta property="og:image" content="${safeImage}"><meta name="twitter:image" content="${safeImage}">`;
}

function articleJsonLd(url: string, title: string, description: string, image: string) {
  const json = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    mainEntityOfPage: url,
    inLanguage: 'pl-PL',
  }).replaceAll('<', '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

async function main() {
  const siteUrl = getSiteUrl();
  const indexPath = path.join(buildDirectory, 'index.html');
  let indexHtml = await readFile(indexPath, 'utf8');
  const markup = renderToString(<React.StrictMode><App /></React.StrictMode>);
  const rootPattern = /<div id="root"><\/div>/;
  if (!rootPattern.test(indexHtml)) throw new Error('Could not find the empty React root in build/index.html');
  indexHtml = indexHtml.replace(rootPattern, `<div id="root">${markup}</div>`);

  if (siteUrl) {
    const homeUrl = `${siteUrl}/`;
    const homeImage = `${siteUrl}/img/czesci-techniczne-3d.webp`;
    indexHtml = addHeadTags(indexHtml, metadataTags(homeUrl, homeImage));

    const locations = [
      '/',
      '/poradnik/',
      ...articles.map(article => `/poradnik/${article.slug}.html`),
    ];

    for (const article of articles) {
      const articlePath = `/poradnik/${article.slug}.html`;
      const articleUrl = `${siteUrl}${articlePath}`;
      const imageName = article.slug === 'jak-przygotowac-plik' ? 'czesci-techniczne-3d'
        : article.slug === 'pla-petg-tpu' ? 'odbojniki-3d'
          : article.slug === 'ile-kosztuje-druk-3d' ? 'mechanizmy-3d'
            : article.slug === 'zastosowania-druku-3d' ? 'organizery-3d' : 'klipsy-3d';
      const articleImage = `${siteUrl}/img/${imageName}.webp`;
      const filePath = path.join(buildDirectory, articlePath);
      const html = await readFile(filePath, 'utf8');
      const tags = metadataTags(articleUrl, articleImage)
        + articleJsonLd(articleUrl, article.title, article.description, articleImage);
      await writeFile(filePath, addHeadTags(html, tags));
    }

    const guidePath = path.join(buildDirectory, 'poradnik', 'index.html');
    const guideHtml = await readFile(guidePath, 'utf8');
    await writeFile(guidePath, addHeadTags(guideHtml, metadataTags(`${siteUrl}/poradnik/`, homeImage)));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations.map(location => `  <url><loc>${siteUrl}${location}</loc></url>`).join('\n')}\n</urlset>\n`;
    await writeFile(path.join(buildDirectory, 'sitemap.xml'), sitemap);

    const robotsPath = path.join(buildDirectory, 'robots.txt');
    const robots = (await readFile(robotsPath, 'utf8')).replace(/^Sitemap:.*\r?\n?/gm, '').trimEnd();
    await writeFile(robotsPath, `${robots}\nSitemap: ${siteUrl}/sitemap.xml\n`);
  }

  await writeFile(indexPath, indexHtml);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});