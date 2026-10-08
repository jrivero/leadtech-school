---
title: Detectar oportunidades de IA en una empresa
description: Aprende a acotar un problema de trabajo, revisar datos y riesgos, y proponer una prueba pequeña de IA con una medida de éxito observable.
module: 12-crece-como-profesional
order: 4
duration: 35
level: Inicial
objectives:
  - Describir una tarea problemática con un resultado observable y un alcance limitado.
  - Comparar datos, riesgos y medidas de éxito para un posible uso de IA.
  - Diseñar una prueba pequeña que contraste la propuesta con el proceso actual.
prerequisites: []
updatedDate: '2026-10-08'
sources:
  - label: NIST — AI Risk Management Framework
    url: https://www.nist.gov/itl/ai-risk-management-framework
---

## Empieza por la fricción real

Una oportunidad de IA no empieza con “queremos usar IA”, sino con una tarea que hoy consume tiempo, produce errores o dificulta encontrar información. Antes de pensar en una herramienta, describe quién hace qué, con qué frecuencia y qué resultado necesita. “Automatizar la atención al cliente” es demasiado amplio; “ayudar a ordenar consultas repetidas para que una persona las asigne” permite investigar una necesidad concreta.

Imagina un equipo que recibe solicitudes por correo. Algunas son preguntas frecuentes y otras describen situaciones nuevas. Una respuesta generada automáticamente podría ahorrar trabajo, pero también confundir una excepción con una pregunta rutinaria. Quizá baste con mejorar una página de ayuda, añadir una búsqueda o crear una plantilla. Compara esas opciones: usar IA no es un objetivo por sí mismo.

Este ejercicio enlaza con el recorrido del curso: una necesidad convertida en requisito verificable permite comparar soluciones; los ejemplos y criterios de aceptación sirven para comprobar calidad; y revisar permisos, efectos y revisión humana traslada la seguridad al contexto de trabajo. Si retomas el proyecto de preguntas sobre documentos, evalúa primero si una búsqueda que muestra fuentes y se abstiene sin evidencia resuelve la necesidad. No siempre hace falta generar una respuesta nueva.

## Analiza la idea con una matriz

Completa una fila por tarea candidata. La matriz obliga a considerar qué datos harían falta, qué puede salir mal y cómo sabrías si la prueba aporta valor. Estos ejemplos son hipotéticos; adapta los criterios al contexto y a las reglas de tu equipo.

| Problema | Datos necesarios | Riesgo principal | Medida de éxito |
|---|---|---|---|
| Clasificar consultas repetidas antes de asignarlas | Ejemplos ficticios o autorizados con categorías revisadas por una persona | Una consulta urgente queda en la categoría equivocada | Porcentaje de categorías correctas y número de errores importantes |
| Encontrar un procedimiento dentro de documentación | Documentos vigentes y fuentes que se puedan consultar | Respuesta desactualizada o sin respaldo localizable | La persona encuentra el párrafo correcto y puede comprobar su origen |

Al hablar de datos, anota su procedencia, vigencia, formato y permisos de uso. No pegues información personal, confidencial o interna en una herramienta externa si no sabes si está aprobada para ello. Si no hay una opción autorizada, practica con ejemplos inventados o material público. También pregunta quién revisaría el resultado y qué impacto tendría un error. Una tarea con consecuencias importantes necesita controles humanos más fuertes que una sugerencia fácil de corregir.

La medida de éxito debe incluir calidad, no solo rapidez. Cuenta el tiempo actual, los errores, las correcciones manuales y las veces que el sistema tendría que abstenerse. Acordad los criterios antes de la prueba; así no se cambia la definición de “éxito” después de ver los resultados.

## Diseña una prueba pequeña y reversible

Empieza con un flujo limitado y sin decisiones automáticas. Puedes hacer la primera comparación en una hoja local o incluso sobre papel; no hace falta contratar una plataforma para formular la hipótesis.

1. **Registra la situación actual.** Observa una muestra pequeña y representativa. Si no puedes usar casos reales, crea ejemplos sintéticos. Describe cuánto tarda el proceso y qué errores aparecen.
2. **Escribe una hipótesis comprobable.** Por ejemplo: “En esta muestra, una propuesta de categoría reduce el tiempo de clasificación sin aumentar los errores que requieren corrección”. No la presentes como un resultado ya demostrado.
3. **Compara alternativas.** Prueba una regla sencilla, una búsqueda mejorada o una plantilla junto a la propuesta de IA. Usa los mismos casos y una persona que conozca la tarea para revisar las respuestas.
4. **Incluye casos difíciles.** Prueba mensajes incompletos, ambiguos y fuera de tema. Anota si la herramienta señala que no sabe o inventa una respuesta convincente pero incorrecta.
5. **Decide qué hacer.** Si no alcanza los criterios, detén la prueba o cambia el diseño. Si los alcanza, documenta las limitaciones y pide la aprobación necesaria antes de ampliar el alcance.

El NIST AI Risk Management Framework puede servirte como referencia para pensar de forma ordenada sobre el contexto, los riesgos y su seguimiento. NIST indica que AI RMF 1.0 está en revisión y es de uso voluntario: comprueba el estado de la página si vuelves a consultarlo y no lo trates como requisito universal. No sustituye el conocimiento del proceso ni convierte una prueba pequeña en una garantía de funcionamiento.

## Práctica verificable

Elige una tarea rutinaria que conozcas y completa una matriz con una fila por idea. Escribe el problema en una frase, indica qué datos usarías sin copiarlos, apunta el principal daño posible y define una medida de calidad y otra de esfuerzo. Después, añade una alternativa que no use IA y una condición para detener el experimento.

La práctica está lista cuando otra persona puede leer la matriz y responder: qué se probaría, con qué ejemplos, quién revisaría los resultados y qué evidencia permitiría continuar. Si alguno de esos puntos queda en blanco, la siguiente acción no es automatizar: es aclarar la necesidad.
