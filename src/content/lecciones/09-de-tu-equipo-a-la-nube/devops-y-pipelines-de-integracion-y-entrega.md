---
title: "DevOps y pipelines de integración y entrega"
description: "Aprende a convertir cambios pequeños en entregas confiables con integración continua, pruebas locales y un workflow real que no despliega ni accede a la nube."
module: "09-de-tu-equipo-a-la-nube"
order: 1
duration: 35
level: "Intermedio"
objectives:
  - "Diferenciar DevOps, integración continua, entrega continua y despliegue continuo."
  - "Ejecutar pruebas unitarias estándar como una compuerta local antes de proponer un cambio."
  - "Interpretar un workflow real de GitHub Actions sin confundirlo con una simulación local."
prerequisites:
  - "Poder ejecutar comandos en una terminal."
  - "Conocer funciones y pruebas básicas en Python."
updatedDate: '2026-10-08'
sources:
  - label: "GitHub Actions: conceptos y workflows"
    url: "https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows"
  - label: "Sintaxis de workflows de GitHub Actions"
    url: "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax"
  - label: "Versiones publicadas de actions/checkout"
    url: "https://github.com/actions/checkout/releases"
---

## DevOps como forma de trabajo

Publicar software no termina al escribir código: desarrollo y operaciones comparten construcción, comprobación y mantenimiento. DevOps es una forma de colaborar para reducir esperas y repetir pasos fiables; no es una herramienta ni garantiza que automatizar arregle un proceso deficiente.

La integración continua (CI) propone integrar cambios pequeños con frecuencia y ejecutar comprobaciones automáticas en cada cambio. La entrega continua mantiene una versión comprobada lista para publicar, normalmente con una aprobación humana. El despliegue continuo va un paso más allá: publica automáticamente cada cambio que supera las reglas acordadas. Son prácticas distintas; no hace falta empezar automatizando producción.

Un pipeline enlaza etapas —preparar, analizar, probar y construir— y detiene las siguientes si falla una. Ejecuta pruebas rápidas en cada cambio; publicar además requiere permisos, revisión, reversión y vigilancia. Conserva el artefacto comprobado para no reconstruir otra versión.

La automatización no convierte una mala prueba en una buena prueba. Conviene que cada comprobación tenga un propósito y un resultado claro. También importa limitar permisos: una tarea de CI que solo lee el repositorio no necesita credenciales para desplegar. Los secretos no deben escribirse en el YAML, imprimirse en registros ni exponerse a código no confiable. Empieza con pruebas y añade publicación solo cuando puedas explicar quién la autoriza y cómo se revierte.

## Un workflow real y una ejecución local

Este YAML es configuración real, solo para lectura. Guardado como `.github/workflows/calidad.yml` y subido a un repositorio, activa un runner remoto ante una solicitud de cambios o un push a `main`; no lo guardes ni hagas push en esta lección. Ejecuta pruebas, no despliega. La actividad ejecutable será el bloque Python local.

```yaml
name: calidad
on:
  pull_request:
  push:
    branches: [main]
permissions:
  contents: read
jobs:
  pruebas:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - name: Ejecutar pruebas
        run: python3 -m unittest discover -v
```

`on` declara los eventos; `jobs` agrupa trabajos; `runs-on` elige el runner; y cada `step` obtiene el código o ejecuta un comando. El permiso de solo lectura reduce el alcance del token. El workflow presupone que el proyecto contiene pruebas descubribles por `unittest`; en un repositorio real, adapta el comando al lenguaje y a sus pruebas. El fragmento no es un comando de terminal: no lo pegues en Python ni lo presentes como una prueba ejecutada localmente.

## Actividad local

1. Abre una terminal con Python 3 ya disponible. El siguiente bloque usa solo la biblioteca estándar: `python3 -` lee el programa desde la entrada y evita crear archivos o instalar paquetes.
2. Pega el bloque completo. La función calcula un total sintético y rechaza cantidades negativas; dos pruebas comprueban ambos casos.

```sh
python3 - <<'PY'
import unittest

def total(precio, unidades):
    if precio < 0 or unidades < 0:
        raise ValueError("Los valores no pueden ser negativos")
    return round(precio * unidades, 2)

class PruebasTotal(unittest.TestCase):
    def test_multiplica_precio_y_unidades(self):
        self.assertEqual(total(2.5, 4), 10.0)

    def test_rechaza_unidades_negativas(self):
        with self.assertRaises(ValueError):
            total(2.5, -1)

resultado = unittest.TextTestRunner(verbosity=2).run(
    unittest.defaultTestLoader.loadTestsFromTestCase(PruebasTotal)
)
if not resultado.wasSuccessful():
    raise SystemExit(1)
print("DRY-RUN: pruebas superadas; no se ha publicado nada.")
PY
```

`unittest` informa de cada caso; `wasSuccessful()` hace que el proceso termine con error si alguno falla. Esa señal de salida es lo que permite que una etapa posterior se detenga. El mensaje final es solo una confirmación local: no simula credenciales, red, artefactos ni una publicación real.

## Verificación y resultado

El resultado esperado son dos pruebas correctas y el mensaje `DRY-RUN: pruebas superadas; no se ha publicado nada.` Cambia temporalmente `10.0` por `9.0` y repite: la prueba debe fallar y el proceso devolver un código distinto de cero. Restaura el valor. Has practicado la misma idea de una compuerta CI, pero sin subir código, abrir una cuenta ni contactar con un runner remoto.

## Errores habituales y soluciones

Si aparece `python3: command not found`, Python no está disponible con ese nombre; no instales nada para este ejercicio, comprueba si ya existe el comando `python` o déjalo para otro equipo. Si una prueba falla, compara el valor calculado con el esperado y corrige la causa, no borres la comprobación. En un proyecto, `unittest discover` puede no encontrar pruebas si sus nombres no empiezan por `test`; revisa el patrón y el directorio. No intentes activar este workflow durante la lección; en un proyecto propio autorizado, revisa su ruta y eventos antes de cualquier cambio. Evita solucionar permisos insuficientes añadiendo secretos: un pipeline de pruebas no necesita acceso a producción.

## Resumen

DevOps coordina personas y automatización a lo largo del ciclo de vida. CI comprueba cambios con frecuencia; entrega continua deja una versión lista y despliegue continuo la publica sin aprobación manual. Un pipeline debe fallar con claridad, usar permisos mínimos y producir resultados repetibles. La prueba local de esta actividad valida una regla y una señal de error; el YAML muestra una configuración real independiente. Puedes empezar con esa compuerta, observar sus resultados y añadir nuevas etapas solo cuando entiendas su riesgo y su mecanismo de recuperación.
