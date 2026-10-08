---
title: "Evaluar respuestas de modelos de lenguaje"
description: "Crea un conjunto pequeño de casos y criterios observables para comparar respuestas; detecta regresiones por categoría sin depender de una API o de un evaluador automático."
module: "13-talleres-para-profundizar"
order: 7
duration: 50
level: "Intermedio"
objectives:
  - "Convertir requisitos de una respuesta en criterios de evaluación observables."
  - "Preparar casos representativos con referencias, límites y ejemplos difíciles."
  - "Comparar variantes y documentar errores sin tratar una única puntuación como garantía."
prerequisites:
  - "Conocer la diferencia entre una respuesta generada y una respuesta de referencia."
  - "Poder expresar reglas de calidad y leer una tabla de datos."
updatedDate: "2026-10-08"
sources:
  - label: "OpenAI Developers: buenas prácticas para diseñar evaluaciones"
    url: "https://developers.openai.com/api/docs/guides/evaluation-best-practices"
  - label: "OpenAI Developers: conjuntos de datos y vigencia de Evals"
    url: "https://developers.openai.com/api/docs/guides/evaluation-getting-started"
---

## De «parece buena» a una prueba repetible

Una evaluación de un modelo compara el comportamiento observado con expectativas escritas. La pregunta útil no es «¿cuál respuesta suena mejor?», sino «¿qué conducta debe cumplir este sistema para esta entrada y qué error sería inaceptable?». Una prueba puede comprobar formato, exactitud respecto a una fuente, cobertura de los puntos pedidos, tono o abstención cuando faltan datos. Una sola puntuación no representa todos esos aspectos ni demuestra seguridad general.

Usaremos un asistente ficticio que clasifica solicitudes de soporte en `acceso`, `facturacion` u `otro`. Antes de mirar una salida, define reglas: la etiqueta debe pertenecer al conjunto permitido; si el mensaje no aporta información suficiente, el sistema debe preguntar; y nunca debe inventar datos de cuenta. Separa una regla binaria fácil de automatizar —etiqueta válida— de una valoración que requiere contexto —si la explicación se apoya en la solicitud—.

## Diseña el conjunto antes de retocar el prompt

Crea doce casos sintéticos sin nombres reales: cuatro ejemplos normales, dos paráfrasis, dos casos ambiguos, una consulta fuera de alcance, una petición que exige reconocer falta de datos, una instrucción citada que no debe cambiar la tarea y una entrada vacía. Guarda entrada, etiqueta esperada, condición de éxito y riesgo de fallo. Esta cantidad sirve como prueba de humo y práctica de diseño; no es suficiente para estimar fiabilidad estadística ni para aprobar un sistema de alto impacto.

Separa ocho casos de desarrollo y reserva cuatro como prueba final. Si revisas continuamente los cuatro reservados y ajustas la instrucción para ellos, dejan de ser una evaluación independiente. Anota dos versiones que compararás: el comportamiento actual y el candidato. Para que la comparación sea útil, conserva las mismas entradas y registra modelo, configuración, fecha y cambios de prompt cuando dispongas de esa información. Algunas salidas cambian entre ejecuciones; repite los casos variables en vez de esconder esa variación.

Una tabla de resultados podría tener estas columnas: caso, salida esperada, salida observada, formato válido, exactitud, explicación fundamentada, ¿debió abstenerse?, gravedad y comentario. Calcula los resultados por categoría y por tipo de riesgo. No promedies un error crítico de privacidad con muchas respuestas correctas de estilo: informa los fallos que bloquean el lanzamiento por separado.

## Actividad: prueba en papel sin API

1. Escribe seis de los doce casos y sus referencias; una compañera redacta las otras seis para introducir formulaciones que no anticipaste.
2. Simula dos respuestas por caso en una hoja o en una tabla. Una puede ser deliberadamente convincente pero errónea; otra, correcta pero más breve.
3. Puntúa cada criterio por separado. Para «explicación fundamentada», marca cada afirmación que no aparezca en la entrada o en la fuente ficticia.
4. Revisa desacuerdos entre evaluadores. Si dos personas entienden distinto «respuesta útil», transforma la rúbrica en una regla más concreta o conserva una evaluación humana documentada.
5. Cambia una sola regla del sistema y repite los casos de desarrollo. Después aplica una única vez los casos reservados y registra también los errores nuevos.
6. Decide: aceptar para otro prototipo, revisar la instrucción o bloquear la integración. Explica la decisión con resultados, no con la fluidez del texto.

Puedes convertir más adelante las reglas deterministas en una prueba de código y usar evaluación humana para matices. Un evaluador basado en otro modelo es una herramienta auxiliar: puede reproducir sesgos, pasar por alto una cita falsa y estar en desacuerdo con especialistas. Calibra su juicio con ejemplos revisados por personas y registra sus límites.

## Validación, errores y mantenimiento

Una evaluación útil incluye casos normales y difíciles, criterios estables, datos separados de los usados para ajustar y un procedimiento para investigar cada fallo. Si mejora la exactitud pero empeora la abstención, el cambio no es automáticamente bueno. Si el promedio parece estable pero falla una categoría, busca el patrón antes de concluir que no hubo regresión.

No selecciones ejemplos solo porque el modelo los resolvió bien; no uses la misma respuesta para enseñar y medir; no trates coincidencia textual como única medida de significado; y no llames «seguridad validada» a una pequeña lista de ataques. Los requisitos y las herramientas de evaluación evolucionan: mantén los casos en un formato portable, añade ejemplos después de incidentes y revisa la vigencia antes de basar el proceso en endpoints externos. Nota de vigencia al 8 de octubre de 2026: OpenAI anuncia que su plataforma Evals pasará a solo lectura el 31 de octubre de 2026 y tiene previsto cerrarla el 30 de noviembre de 2026. Este taller no depende de esa plataforma; conserva los casos y rúbricas en formatos portables.

## Cierre

Una buena evaluación es una especificación ejecutable o revisable del comportamiento esperado. Empieza pequeña, separa formato, exactitud y límites, conserva casos reservados e informa los fallos por gravedad. La meta es saber qué aprendiste del experimento y qué sigue sin demostrarse.
