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
  assert.match(html, /<html[^>]*lang="es"/);
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
const expected = curriculum.modules.flatMap((module) => module.lessons.map((lesson) => `/lecciones/${module.id}/${lesson.slug}/`));
const home = pages.get(path.join(dist, 'index.html'));
for (const href of expected) assert.ok(home?.includes(`href="${href}"`), `La landing no enlaza: ${href}`);
assert.equal(files.filter((file) => file.includes('/lecciones/')).length, expected.length);
console.log(`Build verificado: ${expected.length} artículos, ${files.length} páginas, ${checked} enlaces internos y anclas válidos.`);
