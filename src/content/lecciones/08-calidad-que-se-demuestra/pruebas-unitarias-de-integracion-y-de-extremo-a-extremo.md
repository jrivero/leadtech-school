---
title: "Pruebas unitarias, de integración y de extremo a extremo"
description: "Elige el nivel de prueba según el riesgo: comprueba una regla aislada, una colaboración real entre componentes y un recorrido visible para la persona."
module: "08-calidad-que-se-demuestra"
order: 1
duration: 40
level: "Intermedio"
objectives:
  - "Diferenciar pruebas unitarias, de integración y de extremo a extremo por el límite que ejercitan."
  - "Elegir casos positivos, negativos y de frontera para una función pequeña."
  - "Usar el fallo de una prueba para localizar qué comportamiento necesita revisión."
prerequisites:
  - "Conocer funciones, entradas y salidas en un lenguaje de programación."
  - "Haber ejecutado alguna prueba local."
updatedDate: '2026-10-08'
sources:
  - label: "Python: documentación del framework unittest"
    url: "https://docs.python.org/3/library/unittest.html"
  - label: "Playwright: aserciones para pruebas de navegador"
    url: "https://playwright.dev/docs/test-assertions"
---

## Elegir qué límite probar

Una prueba unitaria comprueba una regla pequeña de forma aislada, normalmente sin red, navegador ni base de datos reales. Una prueba de integración observa si dos o más piezas colaboran correctamente en un límite: por ejemplo, si el repositorio traduce una tarea de dominio al formato de persistencia esperado. Una prueba de extremo a extremo (E2E) recorre el producto desde una interfaz similar a la de la persona usuaria hasta un resultado visible. No existe una proporción universal entre niveles; el coste y la confianza dependen del sistema y del riesgo.

Imagina la función “crear una tarea”. La regla unitaria puede rechazar un título vacío y normalizar espacios. La prueba de integración puede guardar y volver a leer una tarea usando un repositorio temporal. La E2E puede abrir la pantalla, escribir el título, pulsar “Añadir” y comprobar que aparece en la lista. Si el error está en la validación pura, el test unitario suele localizarlo con menos preparación. Si el problema está en el cableado entre formulario y API, el recorrido E2E puede revelar una diferencia que el unit test no conoce.

Cada nivel responde una pregunta distinta. Las pruebas deben ser deterministas, describir comportamiento importante y producir fallos entendibles. Un test que solo repite el código interno puede conservar un defecto. Conviene fijar primero el resultado esperado desde el requisito, no desde la implementación que se quiere justificar. También hay que evitar depender de cuentas remotas, servicios facturables o datos personales para enseñar la idea: los dobles y recursos temporales permiten verificar localmente muchas reglas.

## Ejemplo unitario ejecutable

Este fragmento usa `unittest`, incluido en Python. La función es deliberadamente pequeña; se prueban tanto una entrada útil como límites que podrían romper la regla. Pégalo en una terminal tras `python3 -` para ejecutar solo la biblioteca estándar.

```python
import unittest

def normalizar_titulo(valor):
    if not isinstance(valor, str):
        raise TypeError("El título debe ser texto")
    titulo = valor.strip()
    if not titulo:
        raise ValueError("El título no puede estar vacío")
    return titulo

class PruebasTitulo(unittest.TestCase):
    def test_quita_espacios_exteriores(self):
        self.assertEqual(normalizar_titulo("  Leer  "), "Leer")

    def test_rechaza_texto_vacio(self):
        with self.assertRaises(ValueError):
            normalizar_titulo("   ")

    def test_rechaza_tipo_incorrecto(self):
        with self.assertRaises(TypeError):
            normalizar_titulo(None)

resultado = unittest.TextTestRunner(verbosity=2).run(
    unittest.defaultTestLoader.loadTestsFromTestCase(PruebasTitulo)
)
if not resultado.wasSuccessful():
    raise SystemExit(1)
```

## Actividad paso a paso

1. Antes de leer la solución, anota qué debería ocurrir con una cadena normal, espacios solos y un valor que no sea texto.
2. Ejecuta el bloque y relaciona cada nombre de prueba con uno de esos comportamientos.
3. Cambia temporalmente el resultado esperado de `"Leer"` a `"leer"`. Observa que el runner informa una diferencia y devuelve fallo.
4. Restaura el valor correcto. Diseña, en papel, qué necesitaría una prueba de integración para guardar el título y qué vería una prueba E2E en la pantalla.
5. Elige el nivel más pequeño que demuestra cada regla y reserva los recorridos más amplios para errores de integración importantes.

## Verificación y diagnóstico

El resultado esperado son tres pruebas correctas. Si el proceso falla, inspecciona la aserción y el valor real antes de editar la función. Si el comportamiento esperado no está claro, vuelve al requisito: el test no puede decidir por sí mismo si se deben conservar espacios internos o aceptar un título demasiado largo. La práctica verifica una función y sus límites, no la persistencia ni el navegador; esas fronteras todavía no existen en el ejemplo.

Un buen conjunto equilibra rapidez y realismo: funciones puras para reglas, integración para contratos y E2E para recorridos que importan a la persona. Un test que falla de forma intermitente suele señalar reloj, red, orden o estado compartido; aislar esa dependencia es mejor que repetirlo hasta que pase.

## Errores habituales

- **Usar solo E2E para cualquier regla.** El setup tarda y el mensaje puede ocultar la causa; baja al límite más pequeño que permita reproducirla.
- **Probar detalles privados.** Si un cambio interno equivalente rompe el test, quizá fijaste implementación en lugar de comportamiento.
- **Hacer mock de todo.** Desaparece el riesgo de integración que el test debía observar.
- **Afirmar que una suite verde prueba ausencia de errores.** Solo informa sobre comportamientos y entornos efectivamente cubiertos.
- **Eliminar un test que molesta.** Entiende primero si reveló un defecto, un requisito ambiguo o una prueba frágil.

## Resumen

Las pruebas unitarias, de integración y E2E ejercitan límites distintos y se complementan. Empieza con casos concretos basados en requisitos, incluye fallos y fronteras, y conserva evidencia repetible. Ajusta el nivel al riesgo; ningún runner convierte un conjunto incompleto de tests en una garantía total.
