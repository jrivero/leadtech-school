---
title: "Descomponer problemas y pensar en algoritmos"
description: "Transforma una necesidad amplia en pasos ordenados, casos límite y una receta que puedas ejecutar a mano antes de convertirla en código."
module: "02-bases-para-crear-software"
order: 1
duration: 35
level: "Inicial"
objectives:
  - "Identificar entradas, salidas y reglas de un problema."
  - "Dividir una tarea en pasos pequeños y ordenados."
  - "Probar un algoritmo con ejemplos normales y casos límite antes de codificarlo."
prerequisites:
  - "Tu primer hola mundo"
updatedDate: "2026-10-08"
sources:
  - label: "Tutorial oficial de Python: herramientas de control de flujo"
    url: "https://docs.python.org/3/tutorial/controlflow.html"
---

## Antes del código, una receta comprobable

Un algoritmo es una secuencia finita de pasos que transforma unas entradas en un resultado. No tiene que estar escrito en un lenguaje de programación: una lista de instrucciones, una tabla o un diagrama pueden bastar para entender la solución. Pensar algorítmicamente significa precisar qué datos recibes, qué resultado debes producir, qué reglas aplican y qué debe ocurrir cuando faltan datos o aparece un caso especial.

Considera la pregunta «¿qué tareas están pendientes?». La entrada es una colección de tareas; la salida será solo las que tengan estado pendiente. Antes de escribir código, elige un ejemplo pequeño: tres tareas, dos pendientes y una terminada. Ejecuta la receta a mano y comprueba que conserva las dos correctas, en el mismo orden.

## Descomponer el problema

Una estrategia útil tiene cuatro movimientos. Primero, reformula el problema sin palabras vagas. Segundo, separa la entrada de la salida. Tercero, convierte cada regla en una decisión observable. Cuarto, organiza las decisiones en un orden que puedas seguir. Para la lista de tareas, la receta podría ser:

1. Crear una lista vacía para el resultado.
2. Recorrer cada tarea de la entrada, una por una.
3. Comprobar su campo `hecha`.
4. Si vale `False`, añadir esa tarea al resultado.
5. Devolver la lista final.

Este esquema ya anticipa un bucle, una condición y una colección de salida, pero todavía no depende de la sintaxis. Esa separación ayuda cuando cambias de lenguaje o descubres que interpretaste mal una regla.

## Del algoritmo a un ejemplo en Python

```python
def pendientes(tareas):
    resultado = []
    for tarea in tareas:
        if not tarea["hecha"]:
            resultado.append(tarea)
    return resultado
```

La función recibe una lista de diccionarios. `for` visita cada elemento; `if` decide si lo agrega; `return` entrega el resultado. Prueba mentalmente una lista vacía: el bucle no se ejecuta y la función devuelve otra lista vacía. Prueba una tarea terminada: no se agrega. Esos casos muestran por qué los ejemplos pequeños son más útiles que probar solo una lista grande al final.

No todas las tareas necesitan varios niveles de descomposición. La meta es reducir la carga mental hasta que cada paso tenga un verbo claro: leer, comparar, sumar, seleccionar, guardar. Si una instrucción como «gestionar tareas» contiene muchas decisiones, divídela en operaciones independientes: agregar, listar, completar y guardar.

## Práctica paso a paso

1. Elige un problema cotidiano, por ejemplo calcular el total de una compra.
2. Anota las entradas: lista de precios y, si aplica, un descuento.
3. Define la salida con una frase precisa: importe final en la misma moneda.
4. Escribe la receta sin código. Decide qué pasa con una lista vacía, un precio cero y un precio negativo.
5. Prueba la receta a mano con `[3, 5, 2]`; el total antes de descuentos debe ser `10`.
6. Traduce solo entonces la receta a una función y prueba los mismos casos.

## Comprobación y errores frecuentes

Un algoritmo está suficientemente claro para comenzar cuando otra persona puede ejecutar los pasos con los mismos datos y llegar al mismo resultado. Comprueba un caso normal, un caso vacío y un límite relevante. Si una regla no puede describirse como una decisión comprobable —por ejemplo, «que la lista se sienta más útil»—, vuelve a aclarar la necesidad antes de codificar.

Evita empezar por herramientas o por una interfaz antes de saber qué debe ocurrir. No agrupes en un único paso tareas que ocultan varias reglas. No confundas «termina» con «produce la salida correcta»: una función puede acabar y aun así incluir una tarea completada por usar la condición equivocada.

## Resumen

Especifica entradas, salida y reglas; descompón el trabajo en pasos ordenados; prueba la receta a mano y después codifícala. Los casos límite no son adornos: revelan supuestos antes de que se conviertan en errores difíciles de localizar.
