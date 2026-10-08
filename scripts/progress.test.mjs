import test from 'node:test';
import assert from 'node:assert/strict';
import { parseProgress, toggleCompleted, nextPending, PROGRESS_KEY } from '../src/lib/progress.ts';
const ids = ['01/a', '01/b', '02/c'];
test('El progreso tolera JSON corrupto, valores inválidos y lecciones retiradas', () => {
  for (const raw of [null, '', '{bad', '{}', 'null', '42', '"hola"']) assert.deepEqual(parseProgress(raw, ids), []);
  assert.deepEqual(parseProgress('["01/a","01/a",99,"gone","02/c"]', ids), ['01/a', '02/c']);
  assert.equal(PROGRESS_KEY, 'leadtech:completed:v1');
});
test('Completar/desmarcar es reversible y no muta los datos de entrada', () => {
  const original = ['01/a'];
  assert.deepEqual(toggleCompleted(original, '01/b'), ['01/a', '01/b']);
  assert.deepEqual(toggleCompleted(original, '01/a'), []);
  assert.deepEqual(original, ['01/a']);
});
test('Continuar selecciona la primera lección pendiente en orden editorial', () => {
  assert.equal(nextPending([], ids), '01/a');
  assert.equal(nextPending(['01/a', '02/c'], ids), '01/b');
  assert.equal(nextPending(ids, ids), undefined);
});
