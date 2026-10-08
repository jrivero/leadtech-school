---
title: "Principios para un diseño mantenible"
description: "Aplica cohesión, bajo acoplamiento, nombres consistentes y refactorización gradual para que el software sea más fácil de cambiar."
module: "03-disenar-antes-de-programar"
order: 5
duration: 40
level: "Inicial"
objectives:
  - "Explicar cohesión y acoplamiento con ejemplos de funciones."
  - "Separar responsabilidades sin crear abstracciones innecesarias."
  - "Refactorizar un cambio pequeño conservando pruebas y comportamiento."
prerequisites:
  - "Haber escrito funciones y pruebas básicas"
updatedDate: "2026-10-08"
sources:
  - label: "PEP 8: guía de estilo para código Python"
    url: "https://peps.python.org/pep-0008/"
  - label: "PEP 20: el Zen de Python"
    url: "https://peps.python.org/pep-0020/"
---

## Diseñar para el cambio que sí conocemos

El diseño mantenible reduce el esfuerzo necesario para entender, probar y modificar el programa sin alterar lo que funciona. No significa construir una arquitectura enorme desde el primer día. Significa hacer visibles las reglas, limitar sorpresas y permitir que un cambio quede acotado. La PEP 8 recuerda que el código se lee con frecuencia y que la consistencia local importa; un estilo compartido ayuda al equipo a concentrarse en la lógica.

Dos conceptos sirven como brújula. **Cohesión** pregunta si las piezas dentro de una función o módulo colaboran en un propósito reconocible. **Acoplamiento** pregunta cuántas decisiones de otras partes debe conocer una pieza. Una función que valida un título, lo guarda, abre una ventana y envía un correo tiene baja cohesión. Si para cambiar la regla de título también hay que modificar el correo, existe acoplamiento innecesario.

## Un ejemplo de separación

Supón que `gestionar_tarea` pregunta el título, comprueba que no esté vacío, crea el dato y lo imprime. Sepárala por razones observables: `validar_titulo` comprueba la regla; `crear_tarea` construye los datos; la interfaz solicita la entrada y muestra el resultado. No hace falta crear un módulo diferente para cada línea; el objetivo es que cada responsabilidad pueda cambiarse y probarse con menos efectos colaterales.

```python
def crear_tarea(titulo):
    titulo = titulo.strip()
    if not titulo:
        raise ValueError("El título no puede estar vacío")
    return {"titulo": titulo, "hecha": False}
```

La función no lee del terminal ni escribe archivos. Por eso puedes probarla con texto normal y con espacios sin simular una consola. Si luego el producto necesita un título máximo, añade la regla aquí y crea un test que documente el nuevo límite. Si la interfaz cambia, la regla central puede permanecer intacta.

## Cambia en pasos seguros

Primero fija el comportamiento existente con una prueba o un ejemplo reproducible. Después cambia un aspecto por vez: renombra, extrae una función o elimina duplicación. Ejecuta las pruebas tras cada paso. Solo introduce una abstracción si dos partes comparten una regla estable o si un cambio frecuente exige separar una dependencia. La repetición pequeña puede ser más clara que una jerarquía genérica prematura.

Un nombre debe expresar intención, no implementación accidental. `es_titulo_valido` comunica una pregunta; `check1` no. Los comentarios son útiles para explicar motivos, restricciones o decisiones que no se deducen del código. Si repiten exactamente lo que dice una línea, pueden quedarse obsoletos y aumentar el ruido. Mantén los comentarios cerca del código que justifican.

## Práctica paso a paso

1. Elige una función de tu proyecto que lea entrada, aplique una regla y produzca salida.
2. Marca con distintos colores las responsabilidades que podrían cambiar por motivos diferentes.
3. Escribe una prueba para el resultado actual antes de reorganizarla.
4. Extrae solo una responsabilidad con un nombre descriptivo y ejecuta la prueba.
5. Comprueba que la nueva función se puede llamar sin iniciar toda la aplicación.
6. Revisa si añadiste una abstracción necesaria o solo más archivos; revierte mentalmente cualquier complejidad sin beneficio comprobable.

## Comprobación y errores frecuentes

Un diseño mejora si una regla se localiza rápido, una unidad se puede probar aisladamente y un cambio pequeño no obliga a revisar capas sin relación. Si una función requiere muchos parámetros, averigua si está mezclando trabajos o si necesitas un objeto de contexto bien definido. Si extraerla solo traslada la complejidad a una función con nombre distinto, vuelve a evaluar el corte.

No apliques «una responsabilidad» como mandato de que cada función tenga una sola línea. No optimices para reutilización que nadie necesita. No refactorices una zona crítica sin una forma de detectar regresiones. Y no confundas más capas con mejor diseño: la claridad y la facilidad de cambio son los resultados que debes observar.

## Resumen

Agrupa lo que cambia junto, reduce dependencias innecesarias, usa nombres consistentes y refactoriza en pasos cubiertos por pruebas. Mantén el diseño proporcional al problema: la mejor estructura es la que hace comprensibles las reglas presentes sin bloquear cambios razonables.
