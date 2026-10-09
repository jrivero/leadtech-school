import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(file)); else if (entry.name.endsWith('.html')) out.push(file);
  }
  return out;
}
const files = await walk(dist);
const pages = new Map();
for (const file of files) pages.set(file, await readFile(file, 'utf8'));
let checked = 0;
for (const [file, html] of pages) {
  const relative = path.relative(dist, file);
  const locale = relative.startsWith(`en${path.sep}`) ? 'en' : 'es';
  assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`), `Page language: ${relative}`);
  assert.match(html, /<link[^>]*rel="canonical"[^>]*href="https:\/\/leadtech-school\.vercel\.app\//, `Canonical URL: ${relative}`);
  for (const alternate of ['es', 'en']) {
    assert.match(html, new RegExp(`<link[^>]*rel="alternate"[^>]*hreflang="${alternate}"`), `Language alternate ${alternate}: ${relative}`);
  }
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `H1 único: ${file}`);
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /name="description"/);
  for (const match of html.matchAll(/\bhref="([^"<>]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (/^(?:https?:|mailto:|tel:|data:)/.test(href)) continue;
    const from = `https://local.invalid/${path.relative(dist, file).replace(/index\.html$/, '')}`;
    const url = new URL(href, from);
    let target = path.join(dist, decodeURIComponent(url.pathname));
    if (!path.extname(target)) target = path.join(target, 'index.html');
    assert.ok((await stat(target).catch(() => null))?.isFile(), `Enlace roto: ${href} desde ${path.relative(dist, file)}`);
    if (url.hash && target.endsWith('.html')) {
      const targetHtml = pages.get(target) || await readFile(target, 'utf8');
      const anchor = decodeURIComponent(url.hash.slice(1));
      assert.ok(targetHtml.includes(`id="${anchor}"`), `Ancla inexistente: ${href} desde ${path.relative(dist, file)}`);
    }
    checked++;
  }
}
const curriculum = JSON.parse(await readFile(path.join(root, 'src/data/curriculum.json'), 'utf8'));
const ids = curriculum.modules.flatMap((module) => module.lessons.map((lesson) => `${module.id}/${lesson.slug}`));
for (const locale of ['es', 'en']) {
  const prefix = locale === 'es' ? '/lecciones/' : '/en/lessons/';
  const home = pages.get(path.join(dist, locale === 'es' ? 'index.html' : 'en/index.html'));
  assert.ok(home, `Missing ${locale} home`);
  for (const id of ids) {
    const href = `${prefix}${id}/`;
    assert.ok(home.includes(`href="${href}"`), `Home does not link to: ${href}`);
    const html = pages.get(path.join(dist, href, 'index.html'));
    assert.ok(html, `Missing lesson page: ${href}`);
    const counterpart = `${locale === 'es' ? '/en/lessons/' : '/lecciones/'}${id}/`;
    assert.ok(html.includes(`href="${counterpart}"`), `Missing counterpart link: ${href}`);
    const other = locale === 'es' ? 'en' : 'es';
    assert.match(html, new RegExp(`<link[^>]*rel="alternate"[^>]*hreflang="${other}"[^>]*href="https://leadtech-school\\.vercel\\.app${counterpart}"`), `Wrong alternate lesson: ${href}`);
  }
  assert.equal(files.filter((file) => path.relative(dist, file).startsWith(prefix.slice(1))).length, ids.length);
}
console.log(`Build verificado: ${ids.length} artículos por idioma (192 en total), ${files.length} páginas, ${checked} enlaces internos y anclas válidos.`);
