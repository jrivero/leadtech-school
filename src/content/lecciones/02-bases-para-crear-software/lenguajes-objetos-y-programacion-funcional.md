---
title: "Lenguajes, objetos y programación funcional"
description: "Compara estilos procedural, orientado a objetos y funcional con ejemplos pequeños para elegir la forma más clara según el problema y sus necesidades de estado."
module: "02-bases-para-crear-software"
order: 4
duration: 40
level: "Inicial"
objectives:
  - "Distinguir los lenguajes de programación de los paradigmas que organizan el código."
  - "Explicar cuándo agrupar datos y comportamiento en objetos."
  - "Reconocer funciones puras y transformaciones como recursos del estilo funcional."
prerequisites:
  - "Conocer variables, funciones y condiciones básicas"
updatedDate: "2026-10-08"
sources:
  - label: "Tutorial oficial de Python: clases"
    url: "https://docs.python.org/3/tutorial/classes.html"
  - label: "Documentación oficial de Python: módulos de estilo funcional"
    url: "https://docs.python.org/3/library/functional.html"
---

## Lenguaje y paradigma son ideas distintas

Un lenguaje define cómo escribir instrucciones y qué operaciones ofrece; un paradigma es una manera de organizar el razonamiento y el código. Python permite usar varios estilos, así que no tienes que elegir una identidad única para toda tu carrera. La mejor estructura depende de los datos, las reglas y la facilidad con que otra persona pueda entender el cambio siguiente.

En el estilo procedural, un programa se organiza como una secuencia de pasos y funciones: leer tareas, filtrar pendientes y mostrarlas. Es directo para scripts pequeños. En orientación a objetos, agrupas datos y operaciones relacionadas en objetos que tienen estado y comportamiento. En el estilo funcional, compones transformaciones y prefieres que las funciones dependan de sus entradas y produzcan resultados sin efectos ocultos. Son lentes que pueden combinarse, no categorías que siempre se excluyen.

## Un mismo problema, tres organizaciones

Con una lista de tareas, el enfoque procedural puede mantener una lista y llamar a `agregar`, `completar` y `listar`. Una clase podría representar cada tarea y guardar su título y estado; otra clase podría coordinar la colección. Esto resulta útil cuando las reglas y el estado pertenecen claramente a una entidad, pero crear clases para cada dato simple también añade capas innecesarias.

El enfoque funcional puede crear una función que filtre tareas sin modificar la lista original:

```python
def pendientes(tareas):
    return [tarea for tarea in tareas if not tarea["hecha"]]
```

Si se le entrega la misma lista, la función calcula un resultado y no cambia sus elementos. Una función así es más fácil de probar porque se puede revisar la relación entre entrada y salida. En cambio, guardar un archivo, imprimir en pantalla o cambiar un objeto compartido son efectos que conviene hacer en un lugar visible.

## Cómo decidir

Pregunta primero dónde vive el estado. Si son pocos datos y reglas simples, una función con diccionarios puede ser suficiente. Si muchas operaciones deben proteger invariantes de una entidad —por ejemplo, un préstamo no puede tener dos devoluciones—, encapsular sus reglas puede mejorar la coherencia. Si la tarea consiste en transformar colecciones, funciones pequeñas que no cambian su entrada suelen ser claras.

También considera el coste de aprender el diseño, el tamaño del problema y los cambios probables. Una clase no vuelve automáticamente mantenible un programa; una cadena de funciones anónimas tampoco es necesariamente funcional en un sentido útil. Prioriza una estructura fácil de probar, nombra la intención y evita ocultar cambios de estado detrás de operaciones que parecen de lectura.

## Práctica paso a paso

1. Define tres tareas como diccionarios con claves `titulo` y `hecha`.
2. Escribe una función procedural que añada una tarea y otra que filtre las pendientes.
3. Reescribe la transformación de filtrado como una comprensión de lista, cuidando de no cambiar la entrada.
4. Dibuja una clase `Tarea` con atributos título y estado, pero no la implementes todavía.
5. Compara qué estilo hace más obvia la regla «una tarea completada no puede volver a aparecer como pendiente».
6. Decide cuál usarías para este caso pequeño y escribe qué cambio futuro justificaría revisar esa decisión.

## Comprobación y errores frecuentes

Comprueba que las funciones de filtrado devuelven las mismas tareas esperadas y dejan intacta la lista original. Si un objeto se modifica desde varios sitios, averigua quién es responsable de ese estado. Si para explicar una clase necesitas frases como «por si acaso», quizá aún no tienes una necesidad concreta para introducirla.

No confundas «orientado a objetos» con poner todo dentro de clases ni «funcional» con evitar toda variable. El objetivo no es seguir una etiqueta: es hacer visibles los datos, las reglas y los efectos. Tampoco compares lenguajes solo por la dicotomía compilado/interpretado; sus implementaciones pueden traducir o ejecutar el código de varias maneras.

## Resumen

Procedural organiza pasos, objetos agrupan estado y comportamiento, y el estilo funcional destaca transformaciones explícitas. Python admite los tres. Empieza con la estructura más simple que represente bien tus reglas y cámbiala cuando una necesidad concreta lo justifique.
