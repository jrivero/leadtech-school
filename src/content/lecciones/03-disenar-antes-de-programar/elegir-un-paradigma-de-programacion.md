---
title: "Elegir un paradigma de programación"
description: "Elige entre estilos de programación según los datos, cambios y reglas del problema, no por modas ni por una preferencia universal."
module: "03-disenar-antes-de-programar"
order: 4
duration: 35
level: "Inicial"
objectives:
  - "Reconocer los estilos procedural, orientado a objetos y funcional."
  - "Relacionar paradigmas con el estado y las transformaciones de un problema."
  - "Justificar una elección simple y revisarla si cambian las necesidades."
prerequisites:
  - "Comprender funciones, colecciones y objetos básicos"
updatedDate: "2026-10-08"
sources:
  - label: "Tutorial oficial de Python: clases"
    url: "https://docs.python.org/3/tutorial/classes.html"
  - label: "Python HOWTO: programación funcional"
    url: "https://docs.python.org/3/howto/functional.html"
---

## El paradigma sirve al problema

Un paradigma ofrece una forma de organizar una solución. En el estilo procedural, el programa se entiende como pasos y funciones que transforman entradas. En orientación a objetos, agrupas estado y operaciones alrededor de conceptos del dominio. En programación funcional, destacas transformaciones explícitas y procuras que una función produzca un resultado a partir de sus entradas, con pocos efectos ocultos. Python admite los tres estilos; no necesitas usar solo uno en toda la aplicación.

El tutorial oficial de Python describe clases como una forma de agrupar datos y funcionalidad, y su HOWTO funcional presenta operaciones que transforman entradas en salidas. Esas herramientas ayudan a pensar, pero ninguna etiqueta reemplaza una decisión concreta sobre el modelo del problema.

## Tres miradas a una lista de tareas

**Procedural:** una lista de diccionarios y funciones `agregar`, `completar` y `listar`. El flujo se entiende fácilmente en un programa pequeño. **Orientado a objetos:** una clase `Tarea` puede agrupar título, estado y una operación para completarla. Puede convenir cuando varias reglas protegen el estado de cada tarea; una clase por cada dato trivial puede ser peso innecesario. **Funcional:** una función filtra pendientes y devuelve una lista nueva, sin modificar la entrada.

```python
def pendientes(tareas):
    return [tarea for tarea in tareas if not tarea["hecha"]]
```

Esta función es predecible si ninguna tarea cambia durante la operación: los mismos datos producen la misma selección. En cambio, guardar en un archivo, imprimir un menú o mandar una notificación tiene efectos externos que conviene hacer visibles. Es normal combinar una función pura que decide qué mostrar con una capa procedural que escribe en pantalla.

## Criterios para decidir

Pregunta dónde se encuentra el estado y quién puede cambiarlo. Si la regla consiste sobre todo en transformar colecciones, funciones pequeñas ayudan a componer y probar. Si una entidad tiene invariantes que deben mantenerse siempre —por ejemplo, un préstamo no puede extenderse después de ser devuelto—, encapsular las operaciones junto al estado puede evitar cambios inconsistentes. Si el flujo es lineal y breve, una secuencia procedural suele ser más clara que varias capas.

Considera también cuántas personas modificarán la solución, qué cambios son probables y qué forma resulta más fácil de verificar. No optimices para un futuro hipotético: registra la razón de tu decisión y revísala cuando aparezca una necesidad real, como estados compartidos difíciles de controlar o reglas repetidas en varias pantallas.

## Práctica paso a paso

1. Modela tres tareas como diccionarios con `titulo` y `hecha`.
2. Escribe una operación procedural para añadir una tarea y otra para completarla.
3. Escribe `pendientes` como transformación sin modificar la lista original.
4. Dibuja, sin implementar, una clase que impida completar dos veces la misma tarea.
5. Describe qué estilo hace más evidente cada regla y cuál requiere menos conceptos para el tamaño actual.
6. Elige una estructura, prueba su comportamiento y anota qué cambio futuro justificaría reconsiderarla.

## Comprobación y errores frecuentes

Tu elección es razonable si cada regla tiene un lugar claro, puedes probar los resultados y otra persona entiende cómo se modifica el estado. Si el objeto cambia desde muchos sitios, identifica quién debería ser responsable. Si una función altera una lista recibida, nómbralo o devuelve una nueva lista para evitar sorpresas.

No uses herencia solo porque existe una relación de «es un», ni conviertas cada dato en una clase. No llames funcional a cualquier código que use `map`; el enfoque tiene que ver también con cómo maneja efectos y estado. Evita debates de etiquetas: muestra un ejemplo, compara costes y cambia de diseño cuando la evidencia lo justifique.

## Resumen

Procedural organiza pasos, objetos hacen explícitos estado y comportamiento, y el estilo funcional expresa transformaciones. Elige la estructura más sencilla que represente bien las reglas actuales y deja abierta la posibilidad de mejorarla cuando cambien el problema o sus riesgos.
