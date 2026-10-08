import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const dir = path.resolve(import.meta.dirname, '../src/content/lecciones');
async function files(root) {
  const result = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) result.push(...await files(full));
    else if (entry.name.endsWith('.md')) result.push(full);
  }
  return result;
}
test('Los bloques Python tienen sintaxis válida (sin ejecutar código ni acceder a servicios)', async (t) => {
  const interpreter = spawnSync('python3', ['--version'], { encoding: 'utf8' });
  if (interpreter.error || interpreter.status !== 0) { t.skip('Python 3 no está instalado; el sitio no depende de Python.'); return; }
  let count = 0;
  for (const file of await files(dir)) {
    const markdown = await readFile(file, 'utf8');
    for (const [index, block] of [...markdown.matchAll(/^```(?:python|py)\s*\n([\s\S]*?)^```/gm)].entries()) {
      const result = spawnSync('python3', ['-c', 'import ast, sys; ast.parse(sys.stdin.read())'], { input: block[1], encoding: 'utf8' });
      assert.equal(result.status, 0, `${path.relative(dir, file)}, bloque ${index + 1}: ${result.stderr}`);
      count++;
    }
  }
  assert.ok(count > 0, 'Hay ejemplos de código, no solo descripción de herramientas');
  t.diagnostic(`${count} bloques Python revisados sintácticamente; no se afirma ejecución de todos los ejercicios.`);
});
