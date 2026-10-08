import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../src/content/lecciones');
async function block(file) {
  const body = await readFile(path.join(root, file), 'utf8');
  const match = body.match(/^```python\s*\n([\s\S]*?)^```/m);
  assert.ok(match, `Ejemplo Python esperado en ${file}`);
  return match[1];
}
function run(t, code) {
  const python = spawnSync('python3', ['-c', code], { encoding: 'utf8', timeout: 5000 });
  if (python.error?.code === 'ENOENT') { t.skip('Python 3 no instalado'); return; }
  assert.equal(python.status, 0, python.stderr);
  return python.stdout;
}

test('Ejecutar la solución de biblioteca: fecha, aprobación y tres rechazos', async (t) => {
  const code = await block('04-arquitectura-que-puedes-entender/laboratorio-prestamos-de-una-biblioteca.md');
  run(t, code + `\nargs = dict(libro_disponible=True, socio_activo=True, prestamos_activos=['a','b'], hoy=date(2026,10,8))
prestamo = crear_prestamo('libro-1','socio-1', **args)
assert prestamo.fecha_vencimiento == date(2026,10,22)
assert prestamo.libro_id == 'libro-1'
for cambio in [dict(libro_disponible=False),dict(socio_activo=False),dict(prestamos_activos=['a','b','c'])]:
    try:
        crear_prestamo('libro-1','socio-1', **(args | cambio))
    except ValueError:
        pass
    else:
        raise AssertionError('Se permitió un préstamo no válido')
`);
});

test('Ejecutar la política de gastos: fronteras, datos inválidos y recibo', async (t) => {
  const code = await block('04-arquitectura-que-puedes-entender/reto-resuelto-aprobar-gastos.md');
  run(t, code + `\nfor importe,aprobadores in [('100',[]),('100.01',['responsable']),('500',['responsable']),('500.01',['finanzas']),('2000',['finanzas']),('2000.01',['finanzas','direccion'])]:
    assert decidir_gasto(importe,'EUR',True)['aprobadores'] == aprobadores
assert decidir_gasto('0','EUR',True)['estado'] == 'rechazado'
assert decidir_gasto('10','USD',True)['estado'] == 'revision_manual'
assert decidir_gasto('10','EUR',False)['estado'] == 'incompleto'
for invalido in ['no-numero','NaN','Infinity']:
    try:
        decidir_gasto(invalido,'EUR',True)
    except ValueError:
        pass
    else:
        raise AssertionError('Se aceptó un importe no válido')
`);
});

test('Ejecutar las funciones del gestor de tareas sin abrir su menú interactivo', async (t) => {
  const code = await block('02-bases-para-crear-software/construye-tu-primer-gestor-de-tareas.md');
  const functionsOnly = code.split('\ntareas = []')[0];
  run(t, functionsOnly + `\ntareas=[]
agregar(tareas,'   ')
assert tareas == []
agregar(tareas,' Leer docs ')
agregar(tareas,'Practicar')
assert tareas[0]['titulo'] == 'Leer docs'
completar(tareas,1)
assert tareas[0]['hecha'] and not tareas[1]['hecha']
completar(tareas,0)
completar(tareas,99)
assert not tareas[1]['hecha']
`);
});

test('Ejecutar el laboratorio SQL/JSON/vectorial en memoria', async (t) => {
  const body = await readFile(path.join(root, '09-de-tu-equipo-a-la-nube/bases-de-datos-relacionales-documentales-y-vectoriales.md'), 'utf8');
  const match = body.match(/python3 - <<'PY'\n([\s\S]*?)\nPY/);
  assert.ok(match);
  const result = run(t, match[1]);
  if (result !== undefined) assert.equal(result.trim(), "[(2, 'Cielo mecánico')]\nnaturaleza\nbosque 0.994");
});
