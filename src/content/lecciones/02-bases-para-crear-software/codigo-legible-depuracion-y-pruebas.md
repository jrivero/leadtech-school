---
title: "Código legible, depuración y pruebas"
description: "Mejora la lectura y la fiabilidad del código con nombres claros, depuración sistemática y pruebas pequeñas que comprueban resultados observables."
module: "02-bases-para-crear-software"
order: 6
duration: 45
level: "Inicial"
objectives:
  - "Aplicar nombres y formato que faciliten leer código Python."
  - "Investigar un fallo comparando resultados esperados y observados."
  - "Escribir y ejecutar una prueba unitaria mínima."
prerequisites:
  - "Conocer funciones y estructuras de control"
updatedDate: "2026-10-08"
sources:
  - label: "PEP 8: guía de estilo para código Python"
    url: "https://peps.python.org/pep-0008/"
  - label: "Documentación oficial de Python: unittest"
    url: "https://docs.python.org/3/library/unittest.html"
  - label: "Documentación oficial de Python: depurador pdb"
    url: "https://docs.python.org/3/library/pdb.html"
---

## El código también se escribe para quien lo leerá

Un programa puede producir la respuesta correcta y aun así ser difícil de cambiar si sus nombres ocultan la intención, sus funciones mezclan tareas o su formato es inconsistente. La guía PEP 8 reúne convenciones para Python, como usar cuatro espacios por nivel de sangría y mantener consistencia en nombres y espacios. No es una prueba automática de calidad, y un equipo puede tener reglas propias; su valor principal es reducir fricción al leer.

Compara `x = p * q` con `total = precio_unitario * cantidad`. El segundo ejemplo permite reconocer la regla sin reconstruir el significado de cada letra. Una función pequeña como `calcular_total` es más fácil de probar que una función que pide datos, calcula, escribe un archivo y muestra mensajes. Divide cuando cada parte pueda tener un nombre y una responsabilidad comprensible.

## Depura con evidencia

Depurar es investigar por qué el comportamiento real difiere del esperado. Empieza con una entrada reproducible: anota qué ejecutaste, qué resultado querías y cuál obtuviste. Reduce el caso hasta conservar el fallo con el menor número de datos. Lee el traceback desde el final para identificar el tipo de excepción y la línea señalada; después inspecciona las variables de esa zona.

Por ejemplo, si una suma devuelve `None`, revisa si la función imprime el total en lugar de devolverlo. Si el índice está fuera de rango, compara el número que ve la persona —a menudo empieza en uno— con el índice de lista de Python, que empieza en cero. Puedes usar una impresión temporal para ver valores intermedios, o `breakpoint()` para detenerte e inspeccionar el estado. Quita las impresiones de diagnóstico cuando ya no ayuden.

## Una prueba pequeña

Las pruebas guardan ejemplos que el programa debe seguir cumpliendo. Para probar una función de suma con el módulo estándar `unittest`:

```python
import unittest


def sumar(a, b):
    return a + b


class TestSumar(unittest.TestCase):
    def test_suma_enteros(self):
        self.assertEqual(sumar(2, 3), 5)
```

Guarda el archivo como `test_suma.py` y ejecuta `python -m unittest`. La prueba afirma un resultado observable: con entradas `2` y `3`, el retorno debe ser `5`. Añade luego una prueba de números negativos o de cero según lo que el programa deba admitir. Una prueba no demuestra que no existan errores; protege los comportamientos que has definido.

## Práctica paso a paso

1. Escribe una función `es_titulo_valido` que devuelva `True` cuando el texto, tras quitar espacios, no esté vacío.
2. Ejecuta la función con `"Comprar leche"`, `"   "` y `""`; registra la salida esperada antes de probar.
3. Convierte esos ejemplos en pruebas automatizadas.
4. Cambia deliberadamente la condición para que falle un caso. Ejecuta la suite y lee qué aserción falló.
5. Repara la función sin cambiar la expectativa del test y vuelve a ejecutar todas las pruebas.
6. Revisa nombres, sangría y límites de cada función antes de guardar el cambio.

## Comprobación y errores frecuentes

Una prueba útil falla cuando el comportamiento no cumple la regla y pasa cuando sí la cumple. Si falla, distingue si la expectativa está equivocada o el código no respeta una regla aceptada. No borres el test solo para conseguir una salida verde. Si un test depende de una variable global o de la hora real, puede ser frágil; pasa esos valores como parámetros cuando sea razonable.

No intentes depurar todo el programa a la vez. No ignores un traceback porque parezca largo; localiza primero la última línea y el tipo de error. Tampoco confundas más tests con más calidad automáticamente: cada test debe comprobar una conducta significativa y mantener una salida fácil de interpretar.

## Resumen

Escribe para personas, reproduce el fallo, inspecciona evidencia y fija reglas con pruebas pequeñas. El formato consistente ayuda a leer; la depuración explica el fallo actual y los tests advierten si un cambio rompe un comportamiento conocido.
