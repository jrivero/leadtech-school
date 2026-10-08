// Optional network audit: checks reachability, not accuracy, authorship or freshness of every claim.
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';
const root = path.resolve(import.meta.dirname, '..');
async function walk(dir) {
  const all = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) all.push(...await walk(file)); else if (entry.name.endsWith('.md')) all.push(file);
  }
  return all;
}
const sources = new Map();
for (const file of await walk(path.join(root, 'src/content/lecciones'))) {
  const markdown = await readFile(file, 'utf8');
  const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) continue;
  const data = parse(frontmatter[1]);
  for (const source of data.sources || []) {
    const previous = sources.get(source.url) || { url: source.url, lessons: [] };
    previous.lessons.push(path.relative(root, file));
    sources.set(source.url, previous);
  }
}
const queue = [...sources.values()];
let cursor = 0;
const results = [];
await Promise.all(Array.from({ length: 6 }, async () => {
  while (cursor < queue.length) {
    const source = queue[cursor++];
    try {
      const response = await fetch(source.url, { signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'LeadtechSchoolSourceAudit/1.0' } });
      const result = { ...source, status: response.status, finalUrl: response.url, ok: response.ok };
      await response.body?.cancel();
      results.push(result);
      console.log(`${response.status} ${source.url}`);
    } catch (error) {
      results.push({ ...source, status: null, ok: false, error: String(error) });
      console.log(`ERROR ${source.url}: ${error}`);
    }
  }
}));
results.sort((a, b) => a.url.localeCompare(b.url));
await writeFile(path.join(root, 'docs/source-audit.json'), JSON.stringify({ reviewedDate: '2026-10-08', purpose: 'Disponibilidad de URLs; no valida cada afirmación ni sustituye revisión editorial.', total: results.length, reachable: results.filter((result) => result.ok).length, results }, null, 2) + '\n');
console.log(`Fuentes accesibles: ${results.filter((result) => result.ok).length}/${results.length}. Informe: docs/source-audit.json`);
