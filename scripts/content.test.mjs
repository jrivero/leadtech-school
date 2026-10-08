import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';

const root = path.resolve(import.meta.dirname, '..');
const curriculum = JSON.parse(await readFile(path.join(root, 'src/data/curriculum.json'), 'utf8'));
const core = curriculum.modules.filter((module) => !module.supplement);
const all = curriculum.modules.flatMap((module) => module.lessons.map((lesson) => ({ ...lesson, module })));
const contentDir = path.join(root, 'src/content/lecciones');
function frontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  assert.ok(match, 'Frontmatter YAML obligatorio');
  return { data: parse(match[1]), body: match[2] };
}

test('El currículo tiene 12 bloques / 83 lecciones y 13 complementos', () => {
  assert.equal(core.length, 12);
  assert.equal(core.reduce((total, module) => total + module.lessons.length, 0), 83);
  assert.equal(all.length, 96);
  assert.equal(new Set(curriculum.modules.map((module) => module.id)).size, 15);
  for (const [index, module] of curriculum.modules.entries()) {
    assert.equal(module.order, index + 1);
    assert.ok(module.phase >= 1 && module.phase <= 4);
    assert.equal(new Set(module.lessons.map((lesson) => lesson.slug)).size, module.lessons.length);
    module.lessons.forEach((lesson, i) => {
      assert.equal(lesson.order, i + 1);
      assert.match(lesson.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    });
  }
});

test('Todos los temas tienen Markdown original, metadatos, práctica y fuentes', async (t) => {
  for (const lesson of all) await t.test(`${lesson.module.id}/${lesson.slug}`, async () => {
    const file = path.join(contentDir, lesson.module.id, `${lesson.slug}.md`);
    const raw = await readFile(file, 'utf8');
    const { data, body } = frontmatter(raw);
    assert.equal(data.title, lesson.title);
    assert.equal(data.module, lesson.module.id);
    assert.equal(data.order, lesson.order);
    assert.ok(typeof data.description === 'string' && data.description.length >= 40 && data.description.length <= 260);
    assert.ok(Number.isInteger(data.duration) && data.duration >= 5 && data.duration <= 360);
    assert.ok(['Inicial', 'Intermedio'].includes(data.level));
    assert.ok(Array.isArray(data.objectives) && data.objectives.length >= 3);
    assert.ok(data.objectives.every((item) => typeof item === 'string' && item.length >= 8));
    assert.ok(Array.isArray(data.prerequisites));
    assert.equal(String(data.updatedDate), '2026-10-08');
    assert.ok(Array.isArray(data.sources) && data.sources.length > 0);
    for (const source of data.sources) {
      assert.ok(source.label.length >= 3);
      assert.equal(new URL(source.url).protocol, 'https:');
    }
    const prose = body.replace(/```[\s\S]*?```/g, ' ');
    assert.doesNotMatch(prose, /<script[\s>]|<iframe[\s>]|javascript:/i, 'Artículos sin scripts remotos ni embeds activos');
    assert.ok(prose.trim().split(/\s+/).length >= 380, 'Artículo desarrollado, no un resumen/placeholder');
    assert.ok((body.match(/^## /gm) || []).length >= 3, 'Secciones didácticas');
    assert.doesNotMatch(body, /^# /m, 'H1 lo genera la plantilla');
    assert.match(body, /ejercicio|actividad|práctica|laboratorio|reto|taller|paso a paso/i, 'Aplicación práctica');
    assert.match(body, /verific|comproba|criterio|resultado|aceptación|solución|rúbrica/i, 'Evidencia de aprendizaje');
    assert.doesNotMatch(body, /\bTODO\b/);
    assert.doesNotMatch(body, /\bLorem ipsum\b|contenido pendiente|próximamente disponible/i);
    const fences = body.match(/^```/gm) || [];
    assert.equal(fences.length % 2, 0, 'Bloques de código bien cerrados');
  });
});

test('No hay archivos o temas huérfanos', async () => {
  const expected = new Set(all.map((lesson) => `${lesson.module.id}/${lesson.slug}.md`));
  let count = 0;
  for (const module of await readdir(contentDir, { withFileTypes: true })) {
    if (!module.isDirectory()) {
      assert.ok(!module.name.endsWith('.md'), `Artículo en raíz sin módulo: ${module.name}`);
      continue;
    }
    for (const file of await readdir(path.join(contentDir, module.name))) {
      if (!file.endsWith('.md')) continue;
      assert.ok(expected.has(`${module.name}/${file}`), `Archivo huérfano: ${module.name}/${file}`);
      count++;
    }
  }
  assert.equal(count, expected.size);
});
