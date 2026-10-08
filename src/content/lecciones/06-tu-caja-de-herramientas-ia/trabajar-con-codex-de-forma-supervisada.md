---
title: "Trabajar con Codex de forma supervisada"
description: "Trabaja con Codex en una tarea acotada: define permisos, pide primero un análisis, revisa cada cambio y valida el resultado en un entorno controlado."
module: "06-tu-caja-de-herramientas-ia"
order: 5
duration: 30
level: "Inicial"
objectives:
  - "Describir Codex como asistente de programación y distinguir sus superficies de uso."
  - "Limitar una tarea a un directorio y a cambios que una persona pueda revisar."
  - "Validar con pruebas y diff antes de conservar una modificación sugerida por Codex."
prerequisites:
  - "elegir-herramientas-sin-perder-el-control"
  - "vs-code-y-github-copilot-en-la-practica"
updatedDate: '2026-10-08'
sources:
  - label: "OpenAI Docs: Codex CLI"
    url: "https://learn.chatgpt.com/docs/codex/cli"
  - label: "OpenAI Docs: permisos de ChatGPT y Codex"
    url: "https://learn.chatgpt.com/docs/permission-modes"
---

## Idea central — explicación conceptual

**Codex** es un agente de programación de OpenAI que puede ayudar a entender y modificar proyectos. OpenAI documenta más de una forma de usarlo; la interfaz y los controles disponibles dependen de la superficie y la configuración elegidas. Antes de iniciar una tarea, comprueba la documentación oficial correspondiente a tu entorno. No asumas que un comportamiento de la aplicación de escritorio se aplica también a una terminal o a otra integración.

La supervisión tiene dos partes. **Permisos** indican qué archivos, comandos o servicios puede intentar utilizar la herramienta; **sandboxing** limita el entorno o las operaciones que puede realizar. Una frontera configurada no hace que el código propuesto sea correcto, y una aprobación de acción no significa que debas aceptarla. Revisa qué se permite antes de entregar el repositorio y evita incluir contraseñas, tokens, claves, archivos personales o datos de clientes. Las restricciones concretas dependen de la configuración y no deben tratarse como una garantía universal de aislamiento.

Una tarea pequeña necesita un objetivo comprobable y un alcance visible: «explica qué hace esta función» permite comenzar sin cambios; «modifica una condición en un archivo y añade un caso de prueba» delimita una intervención. Pide primero un plan, decide si los archivos y acciones son necesarios y autoriza solo el paso que entiendes. Cuando finalice, inspecciona el diff, no la descripción que el agente hace de su propio trabajo. Ejecuta las pruebas apropiadas y verifica que no haya cambios adicionales.

Codex puede acelerar un ciclo de trabajo, pero la persona sigue responsable de la decisión y del resultado. Una ejecución aislada tampoco elimina los riesgos de dependencias, código malicioso, datos compartidos o errores lógicos. Para aprender, usa una carpeta desechable o un repositorio de ejemplo, y conserva una copia recuperable antes de permitir cualquier escritura.

## Ejemplo concreto

Tienes una página de práctica con un botón que muestra un saludo. Pides a Codex que localice el componente y explique cómo cambia el texto al pulsarlo, sin modificar archivos. Si la explicación coincide con el código, puedes pedir una actualización acotada del saludo y una prueba manual. No hace falta acceso a credenciales, conexión con servicios externos ni permisos para cambiar otros módulos.

## Práctica guiada — receta

1. Crea o abre un proyecto de ejemplo que no contenga datos privados, secretos ni código de trabajo. Asegúrate de que puedes restaurar la versión inicial.
2. Comprueba en la documentación oficial qué modo de trabajo y qué permisos están activos. Mantén la tarea en un espacio reducido y no amplíes acceso a Internet o a archivos personales.
3. Pide un análisis de solo lectura: archivo pertinente, explicación del comportamiento y posible caso límite. No autorices cambios todavía.
4. Escribe un criterio de aceptación que puedas comprobar. Si quieres seguir, pide una propuesta que afecte únicamente al elemento necesario y espera cualquier solicitud de acción antes de aprobarla.
5. Revisa el diff archivo por archivo. Ejecuta las pruebas que ya ofrece el proyecto o reproduce el caso manualmente. Conserva el cambio solo si cumple el criterio y puedes explicar las líneas nuevas.

No se necesita un comando específico en esta lección; la forma de iniciar Codex cambia entre productos y versiones. Sigue la guía oficial actual de la interfaz que realmente uses.

## Validación y solución de problemas

Si Codex explora más archivos de los necesarios, detén la tarea y reduce el contexto. Si propone cambios inesperados, recházalos o restaura la copia antes de continuar. Si el test falla, compara el comportamiento con el requisito original en vez de pedir al agente que siga cambiando cosas hasta que desaparezca el error. Anota qué permiso y qué intervención resultaron necesarios.

## Errores frecuentes

- Confundir una explicación convincente del agente con una revisión del diff.
- Dar acceso a un repositorio real antes de comprobar permisos y políticas de datos.
- Aprobar un comando o cambio sin saber qué archivos puede afectar.
- Suponer que el sandbox hace seguro ejecutar cualquier código o dependencia.
- Pedir una tarea amplia que no se pueda evaluar en una sesión corta.

## En resumen

Codex puede participar en análisis y cambios de código, pero necesita un alcance, permisos mínimos y una persona que revise. Empieza en lectura, autoriza solo acciones necesarias y verifica el diff con pruebas. La aceptación siempre es una decisión humana.
