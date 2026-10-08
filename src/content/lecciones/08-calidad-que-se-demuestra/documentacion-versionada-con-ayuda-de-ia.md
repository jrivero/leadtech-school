---
title: "Documentación versionada con ayuda de IA"
description: "Actualiza documentación junto al cambio de código y usa asistentes para redactar borradores que se contrastan con pruebas, fuentes y comandos realmente ejecutables."
module: "08-calidad-que-se-demuestra"
order: 6
duration: 35
level: "Intermedio"
objectives:
  - "Elegir qué documentación debe cambiar cuando varía un comportamiento."
  - "Revisar un borrador de IA contrastándolo con código y evidencia del proyecto."
  - "Mantener ejemplos, requisitos previos y comandos precisos dentro del mismo ciclo de revisión."
prerequisites:
  - "Saber leer un diff y localizar la documentación de un proyecto."
  - "Poder distinguir una comprobación ejecutada de una propuesta."
updatedDate: '2026-10-08'
sources:
  - label: "GitHub Docs: escritura y formato Markdown"
    url: "https://docs.github.com/en/get-started/writing-on-github"
  - label: "AGENTS.md: instrucciones versionadas para agentes"
    url: "https://agents.md/"
---

## La documentación también cambia con el producto

Un README de inicio, una guía de uso, una referencia de configuración y una nota operativa responden preguntas diferentes. Cuando cambia una función, no siempre hay que reescribir todos esos documentos; hay que encontrar cuáles contienen una afirmación que dejó de ser cierta. Si una aplicación ahora exporta CSV, la persona necesita conocer la ubicación de la opción, el formato de columnas y límites relevantes. Quien mantiene el sistema quizá necesite además saber dónde se aplica la regla y qué prueba protege el formato.

La IA puede resumir un diff, proponer una lista de secciones afectadas y redactar un borrador en el tono del proyecto. No conoce necesariamente el comportamiento que falta, los comandos disponibles, las políticas de publicación ni las decisiones que nunca se anotaron. Contrasta cada afirmación con código, tests, configuración y documentación oficial de dependencias. Si el borrador agrega una variable de entorno, un permiso o un comando que no existe, elimina la invención en lugar de adaptar el proyecto a un texto convincente.

Una buena documentación está versionada junto al código para que el mismo cambio incluya explicación y comportamiento. Mantén ejemplos pequeños y ejecutables cuando sea posible. Indica requisitos, datos de entrada, resultado esperado y limitaciones. No marques una operación como probada si solo se generó un fragmento. En instrucciones para agentes, deja límites operativos y convenciones estables; los procedimientos especializados pueden estar en una skill, pero cada archivo debe tener una función clara y revisable.

La documentación también es una superficie de seguridad. No incluyas claves, direcciones privadas, datos personales, instrucciones de despliegue no autorizadas ni capturas con identificadores reales. Un ejemplo necesita valores inventados y coherentes, no una credencial falsa con apariencia de ser válida. Si una actividad requiere una cuenta o puede causar un gasto, indícalo antes del paso y ofrece una comprobación local cuando sea posible.

## Ejemplo: añadir exportación de tareas

Supón que el cambio incorpora un botón para descargar tareas completadas como CSV. Antes, el README describía únicamente la lista en pantalla. El diff y el test muestran que ahora se incluyen las columnas `titulo` y `estado`, se omiten las tareas pendientes y las comillas del título se escapan según el formato. La guía de usuario debe describir el botón y el filtro; la nota de desarrollo puede explicar qué función genera el CSV. Si aún no se probó abrir el archivo con una hoja de cálculo, no prometas compatibilidad universal con todos los programas.

Puedes pedir a un asistente: “Resume el diff y señala qué frases del README podrían quedar obsoletas. No inventes comandos; vincula cada sugerencia a un archivo modificado y marca las dudas”. Después lee el diff original y abre las fuentes citadas. La sugerencia es un mapa de revisión, no una prueba de que los documentos estén completos.

## Actividad paso a paso

1. Elige una modificación pequeña y enumera las afirmaciones documentadas que dependen de ella.
2. Lee el código y los tests antes de escribir; separa los hechos observados de las decisiones todavía pendientes.
3. Redacta un párrafo de usuario y, si hace falta, otro para mantenimiento. Usa términos visibles en la interfaz y valores ficticios.
4. Si utilizas IA, comparte solo el diff permitido y pide que indique supuestos y referencias; no envíes secretos ni código sensible a un servicio no aprobado.
5. Contrasta cada frase con la implementación. Ejecuta los ejemplos y comandos que afirmas que funcionan; si no puedes, decláralos como ilustrativos o pendientes.
6. Revisa el diff completo de código y documentos como una sola unidad, buscando contradicciones, rutas erróneas y promesas no verificadas.

## Verificación y solución

Para el ejemplo CSV, una guía coherente explica que solo se exportan tareas completadas y que las columnas son `titulo` y `estado`; el documento técnico nombra la función real; ningún texto afirma que se probaron aplicaciones externas si no se hizo. La verificación consiste en comparar frase a frase con los tests y el comportamiento. Si las columnas cambian mañana, el test y la documentación deben actualizarse en el mismo cambio o dejar una tarea explícita con responsable.

## Errores frecuentes

- **Copiar el resumen generado sin abrir los archivos.** Comprueba hechos, nombres y alcance contra el código.
- **Documentar una opción que aún no existe.** Distingue propuesta, prototipo y funcionalidad disponible.
- **Dejar comandos no ejecutables.** Usa scripts reales del proyecto y anota las condiciones que requieren.
- **Duplicar instrucciones completas en muchos archivos.** Mantén una fuente principal y enlaces internos cuando sean estables.
- **Añadir datos sensibles a ejemplos.** Sustitúyelos por fixtures inventados antes de versionar o compartir.

## Resumen

La documentación explica el contrato del producto y debe evolucionar con él. Usa asistentes para localizar cambios o redactar borradores, pero verifica cada frase contra el diff y pruebas. Mantén ejemplos seguros, comandos reales y límites explícitos; un texto claro pero falso empeora la calidad del software.
