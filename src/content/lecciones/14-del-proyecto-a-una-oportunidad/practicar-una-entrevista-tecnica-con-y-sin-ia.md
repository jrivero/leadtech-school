---
title: "Practicar una entrevista técnica con y sin IA"
description: "Practica resolución de problemas técnicos primero sin ayudas y luego con IA como entrevistador, para mejorar claridad, pruebas y criterio sin depender de respuestas copiadas."
module: "14-del-proyecto-a-una-oportunidad"
order: 2
duration: 50
level: "Intermedio"
objectives:
  - "Seguir una secuencia observable para abordar un problema técnico en voz alta."
  - "Usar la IA como interlocutora de práctica sin pedirle que resuelva el reto."
  - "Evaluar una solución por claridad, corrección, casos límite y explicación."
prerequisites:
  - "Poder resolver problemas sencillos con funciones y colecciones"
updatedDate: "2026-10-08"
sources:
  - label: "UT Austin Career Services: preparación para entrevistas técnicas"
    url: "https://careerservices.cns.utexas.edu/resources/interviews/technical-interviews"
  - label: "Tutorial oficial de Python: estructuras de datos"
    url: "https://docs.python.org/3/tutorial/datastructures.html"
---

## La meta es mostrar cómo razonas

Una entrevista técnica puede incluir conversación, ejercicios de código o preguntas sobre proyectos; el formato y los criterios dependen del puesto y la organización. Practicar no garantiza una contratación. Sí puede ayudarte a comunicar cómo entiendes un problema, cómo eliges una solución y cómo corriges una idea cuando aparece un contraejemplo. UT Austin Career Services recomienda explicar el proceso, no limitarse a dar una respuesta final.

Usa dos rondas distintas. En la primera trabaja sin IA, como si estuvieras en una sesión real: lee el enunciado, pregunta por las ambigüedades, propone ejemplos, describe un plan, implementa y prueba. En la segunda pide a la IA que haga de entrevistadora, formule una pregunta aclaratoria o señale un caso que aún no probaste. No le pidas que escriba la solución completa y no uses asistencia no autorizada durante una evaluación real.

## Ejercicio guiado: quitar duplicados conservando el orden

Enunciado: recibe una lista de enteros y devuelve otra lista sin repeticiones, manteniendo la primera aparición de cada valor. Antes de escribir código, confirma con un ejemplo: `[3, 1, 3, 2, 1]` debe producir `[3, 1, 2]`. Pregunta si los elementos siempre son enteros y si el orden importa. Para este ejercicio asumiremos enteros y conservación del orden.

Explica el plan: recorrer la lista, mantener un conjunto de valores vistos y añadir a la salida solo el primer encuentro. Después implementa:

```python
def sin_repetidos(valores):
    vistos = set()
    resultado = []
    for valor in valores:
        if valor not in vistos:
            vistos.add(valor)
            resultado.append(valor)
    return resultado
```

Prueba la lista vacía, una lista sin duplicados y una con todos los elementos iguales. El conjunto permite comprobar pertenencia rápidamente en promedio; recorres cada elemento una vez, con coste esperado lineal y memoria adicional proporcional al número de valores únicos. Aclara que esta versión presupone valores que se pueden incluir en un conjunto, como enteros o textos.

## Dos formas de practicar

**Ronda sin IA:** ponte un límite de doce minutos, pero no sacrifiques aclarar el contrato. Di lo que sabes, plantea un ejemplo y explica por qué el conjunto no determina el orden de salida; el orden lo conserva la lista. Si te atascas, verbaliza qué dato necesitas o qué alternativa sencilla probarías. Al final, ejecuta manualmente los casos límite.

**Ronda con IA:** pega solo el enunciado y pide: «Actúa como entrevistadora. No escribas código ni des la solución; haz una pregunta de aclaración y espera mi respuesta». Tras implementar, pide que sugiera un contraejemplo, no que sustituya tu código. Revisa si el caso realmente falla y pruébalo tú. Cierra la conversación e intenta resolver un problema parecido sin ayuda al día siguiente; así verificas qué conocimiento puedes recuperar por ti misma.

## Práctica paso a paso

1. Graba una respuesta sin IA: lee el ejercicio y narra tu plan antes de codificar.
2. Anota las preguntas que debiste hacer y los supuestos que decidiste.
3. Ejecuta la solución con lista vacía, valores únicos y repetidos.
4. Repite con IA como interlocutora, solicitando una sola pista cada vez.
5. Corrige únicamente cambios que puedas explicar y respaldar con una prueba.
6. Al día siguiente, vuelve a resolver una variante sin abrir la conversación previa.

## Rúbrica de autoevaluación

Ponte de cero a dos puntos en cinco aspectos: aclaré contrato y entradas; expliqué un plan antes del código; la solución cumple el resultado; probé límites y contraejemplos; comuniqué complejidad y limitaciones. Un cero indica que falta evidencia, uno que lo hiciste parcialmente y dos que puedes mostrarlo con un ejemplo. El total sirve para elegir qué practicar, no para predecir el resultado de un proceso de selección.

## Errores frecuentes

No empieces a programar cuando el enunciado aún admite interpretaciones distintas. No confundas una solución que compila con una respuesta correcta. No memorices respuestas de IA ni uses una herramienta durante una evaluación si no está permitida. Si no puedes explicar una línea sugerida, reemplázala por una versión que comprendas y vuelve a probarla.

## Resumen

Practica la secuencia: aclarar, ejemplificar, planificar, implementar, probar y explicar. Compara una ronda independiente con otra asistida, y elige la siguiente habilidad a mejorar a partir de evidencia concreta, no de la sensación de haber terminado.
