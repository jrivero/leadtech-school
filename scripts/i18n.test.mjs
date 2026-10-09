import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';
import { homeHref, lessonHref, otherLocale, locales } from '../src/lib/i18n.ts';

const root = path.resolve(import.meta.dirname, '..');
const data = JSON.parse(await readFile(path.join(root, 'src/data/curriculum.json'), 'utf8'));
const contentRoot = path.join(root, 'src/content');
const englishRoot = path.join(root, 'src/data/i18n/en');
function readArticle(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  assert.ok(match, 'YAML frontmatter required');
  return { data: parse(match[1]), body: match[2] };
}
const codeBlocks = (body) => [...body.matchAll(/^```[^\n]*\n[\s\S]*?^```\s*$/gm)].map((match) => match[0].trimEnd());
const prose = (body) => body.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, ' ');
const wordCount = (body) => prose(body).trim().split(/\s+/).length;
const headings = (body) => (prose(body).match(/^#{2,6} /gm) || []);
const shape = (module) => ({
  id: module.id, order: module.order, phase: module.phase, supplement: module.supplement,
  lessons: module.lessons.map(({ slug, order, optional }) => ({ slug, order, optional })),
});
async function markdownFiles(dir, prefix = '') {
  const out = [];
  for (const file of await readdir(dir, { withFileTypes: true })) {
    const id = `${prefix}${file.name}`;
    if (file.isDirectory()) out.push(...await markdownFiles(path.join(dir, file.name), `${id}/`));
    else if (file.name.endsWith('.md')) out.push(id);
  }
  return out;
}

test('Stable Spanish URLs and explicit English counterparts with shared lesson IDs', () => {
  assert.deepEqual(locales, ['es', 'en']);
  assert.equal(homeHref('es'), '/');
  assert.equal(homeHref('en'), '/en/');
  for (const locale of locales) {
    assert.equal(otherLocale(otherLocale(locale)), locale);
    assert.equal(lessonHref('module/lesson', locale), locale === 'es' ? '/lecciones/module/lesson/' : '/en/lessons/module/lesson/');
  }
});

test('English curriculum translates every module and preserves the complete learning path', async () => {
  const metadata = JSON.parse(await readFile(path.join(root, 'src/data/i18n/en.json'), 'utf8'));
  assert.equal(metadata.name, data.name);
  assert.equal(metadata.reviewedDate, data.reviewedDate);
  assert.notEqual(metadata.scope, data.scope);
  assert.deepEqual(metadata.phases.map(({ id }) => id), data.phases.map(({ id }) => id));
  metadata.phases.forEach((phase, index) => assert.notEqual(phase.title, data.phases[index].title));
  assert.equal((await readdir(englishRoot)).filter((file) => file.endsWith('.json')).length, data.modules.length);
  for (const module of data.modules) {
    const translated = JSON.parse(await readFile(path.join(englishRoot, `${module.id}.json`), 'utf8'));
    assert.deepEqual(shape(translated), shape(module));
    assert.equal(translated.level, module.level === 'Inicial' ? 'Beginner' : 'Intermediate');
    assert.notEqual(translated.title, module.title);
    assert.notEqual(translated.description, module.description);
    translated.lessons.forEach((lesson, index) => assert.notEqual(lesson.title, module.lessons[index].title));
  }
});

test('All 96 English lessons are full translations with metadata, sections, sources and unchanged executable examples', async (t) => {
  for (const module of data.modules) {
    const translatedModule = JSON.parse(await readFile(path.join(englishRoot, `${module.id}.json`), 'utf8'));
    for (const [index, lesson] of module.lessons.entries()) await t.test(`${module.id}/${lesson.slug}`, async () => {
      const file = `${module.id}/${lesson.slug}.md`;
      const es = readArticle(await readFile(path.join(contentRoot, 'lecciones', file), 'utf8'));
      const en = readArticle(await readFile(path.join(contentRoot, 'en', file), 'utf8'));
      assert.equal(en.data.title, translatedModule.lessons[index].title);
      assert.ok(en.data.title.length >= 8);
      for (const field of ['module', 'order', 'duration', 'updatedDate']) assert.deepEqual(en.data[field], es.data[field], field);
      assert.equal(en.data.level, es.data.level === 'Inicial' ? 'Beginner' : 'Intermediate');
      assert.ok(en.data.description.length >= 40 && en.data.description.length <= 260);
      assert.notEqual(en.data.description, es.data.description);
      assert.equal(en.data.objectives.length, es.data.objectives.length);
      assert.ok(en.data.objectives.every((item) => typeof item === 'string' && item.length >= 8));
      en.data.objectives.forEach((item, i) => assert.notEqual(item, es.data.objectives[i]));
      assert.equal(en.data.prerequisites.length, es.data.prerequisites.length);
      assert.deepEqual(en.data.sources.map(({ url }) => url), es.data.sources.map(({ url }) => url));
      assert.ok(en.data.sources.every(({ label }) => typeof label === 'string' && label.length >= 3));
      assert.deepEqual(codeBlocks(en.body), codeBlocks(es.body), 'Code samples must remain identical to the tested originals');
      assert.deepEqual(headings(en.body), headings(es.body), 'Every source section must be retained');
      assert.ok(wordCount(en.body) >= 380, 'Full article, not a summary');
      assert.ok(wordCount(en.body) >= wordCount(es.body) * 0.72, 'Translation must not omit most of the article');
      assert.doesNotMatch(prose(en.body), /<script[\s>]|<iframe[\s>]|javascript:|\]\(\/lecciones\//i);
      assert.doesNotMatch(prose(en.body), /^# /m);
      assert.doesNotMatch(prose(en.body), /\bTODO\b|Lorem ipsum|translation pending|coming soon/i);
      assert.match(prose(en.body), /exercise|activity|practice|lab|challenge|workshop|step.by.step|project|prototype/i);
      assert.match(prose(en.body), /verif|check|criteria|result|acceptance|solution|rubric/i);
      assert.doesNotMatch(prose(en.body), /^#{2,6} (?:Resumen|Errores frecuentes|Ejercicio|Práctica|Objetivos|Conclusión)\b/m);
    });
  }
});

test('English content has exactly the same IDs with no missing or orphan lessons', async () => {
  const expected = data.modules.flatMap((module) => module.lessons.map((lesson) => `${module.id}/${lesson.slug}.md`)).sort();
  assert.deepEqual((await markdownFiles(path.join(contentRoot, 'en'))).sort(), expected);
});
