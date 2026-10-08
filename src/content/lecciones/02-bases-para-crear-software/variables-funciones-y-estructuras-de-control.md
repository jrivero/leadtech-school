---
title: "Variables, funciones y estructuras de control"
description: "Aprende a nombrar datos, agrupar operaciones en funciones y elegir condiciones y bucles para expresar reglas sencillas en Python."
module: "02-bases-para-crear-software"
order: 3
duration: 40
level: "Inicial"
objectives:
  - "Crear variables con nombres que expliquen los datos."
  - "Definir funciones que reciban parámetros y devuelvan resultados."
  - "Usar condiciones y bucles para expresar decisiones y repeticiones."
prerequisites:
  - "Haber escrito y ejecutado una instrucción print en Python"
updatedDate: "2026-10-08"
sources:
  - label: "Tutorial oficial de Python: herramientas de control de flujo"
    url: "https://docs.python.org/3/tutorial/controlflow.html"
---

## Datos con nombre y acciones reutilizables

Una variable asocia un nombre con un valor: `cantidad = 3` deja que el resto del programa use la cantidad sin repetir el número. El nombre debería comunicar su propósito. `precio_unitario` explica más que `x`, y `tareas_pendientes` es más claro que `datos`. En Python, el tipo del valor también importa: `3` es un entero, `3.5` un número decimal aproximado, y `"3"` texto. Aunque puedan verse parecidos, no son intercambiables en todas las operaciones.

Una función agrupa pasos que forman una operación con nombre. Recibe parámetros, puede calcular un resultado y lo entrega con `return`. Por ejemplo:

```python
def calcular_total(precios):
    total = 0
    for precio in precios:
        if precio > 0:
            total += precio
    return total
```

La función recorre cada precio. `for` repite el bloque para cada elemento; `if` incluye solo valores positivos; `+=` acumula. Si la entrada es `[4, 6]`, el resultado es `10`. Si hay un valor no positivo, se omite según esta regla concreta. En una aplicación real quizá convenga rechazarlo, no ignorarlo; la decisión debe reflejar los requisitos, no la comodidad de la sintaxis.

## Condiciones y bucles expresan reglas

`if`, `elif` y `else` permiten elegir una ruta. Una condición puede combinar comparaciones con `and` u `or`. Por ejemplo, una tarea se puede marcar como vencida si no está hecha **y** su fecha límite es anterior a hoy. Escribe las condiciones con nombres y paréntesis cuando eso facilite la lectura; no intentes comprimir decisiones en una sola línea.

Un bucle `for` es útil cuando sabes qué colección quieres recorrer. `while` repite mientras una condición siga siendo verdadera, por ejemplo, mientras la persona no elija salir de un menú. En un `while`, confirma qué cambio hará que la condición deje de cumplirse; si no cambia, puedes crear un bucle infinito. `break` sale del bucle, pero úsalo solo cuando mejora la comprensión frente a una condición más explícita.

## Práctica paso a paso

1. Define una función `calcular_total` que reciba una lista de precios y devuelva la suma, sin mostrarla dentro de la función.
2. Añade una condición documentada: decide si un precio negativo debe ignorarse o provocar un error. Anota por qué.
3. Llama a la función con `[4, 6]`, con `[0]` y con una lista vacía. Predice el resultado antes de ejecutar.
4. Añade `descuento` como parámetro y calcula el descuento como una fracción entre `0` y `1`, por ejemplo `0.1` para diez por ciento.
5. Prueba un descuento de `0`, `0.1` y `1`. Si no quieres permitir valores fuera de ese intervalo, comprueba y rechaza entradas inválidas.
6. Cambia el nombre de alguna variable para que quien lea el código pueda adivinar qué contiene.

## Comprueba el comportamiento

La función debe devolver un número y producir resultados consistentes para las entradas de prueba. Distingue entre un resultado visible (`print`) y un resultado que otra función puede reutilizar (`return`). Si aparece `TypeError`, mira el tipo de cada argumento: quizá sumaste texto y número. Si obtienes `None`, comprueba si olvidaste `return` o si llamaste una función que solo imprime.

Prueba también los límites de cada condición. Una expresión `importe < 100` no acepta exactamente `100`; quizá necesitabas `<=`. Lee la regla en castellano y compárala con el operador. Si un bucle procesa un elemento demasiadas veces, imprime temporalmente el valor de la iteración o prueba una lista de dos elementos antes de ampliar el caso.

## Errores frecuentes

Evita funciones largas que mezclan entrada, cálculo y presentación. No uses variables globales para compartir cualquier dato: pásalo como parámetro cuando sea parte de la operación. No nombres `total` a un dato que todavía no es total. Tampoco supongas que una función calcula algo porque se llama `calcular`; la ejecución y las pruebas determinan su comportamiento.

## Resumen

Las variables nombran valores, las funciones agrupan operaciones, las condiciones eligen y los bucles repiten. Expresa una regla de forma sencilla, prueba entradas normales y límites, y decide conscientemente cómo tratar datos inválidos.
