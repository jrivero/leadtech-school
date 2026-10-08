---
title: "Patrones para coordinar varios agentes"
description: "Compara ejecución secuencial, tareas paralelas y revisión independiente, y coordina agentes con contratos pequeños, propiedad clara y puntos de integración humanos."
module: "08-calidad-que-se-demuestra"
order: 8
duration: 40
level: "Intermedio"
objectives:
  - "Elegir entre secuencia, paralelismo o revisión según dependencias y riesgo."
  - "Definir entradas, salidas y propiedad de archivos para tareas delegadas."
  - "Integrar resultados con pruebas y revisión en lugar de confiar en consenso entre agentes."
prerequisites:
  - "Comprender el ciclo de trabajo de un agente de desarrollo."
  - "Saber describir dependencias entre tareas de software."
updatedDate: '2026-10-08'
sources:
  - label: "OpenAI API: documentación de agentes y herramientas"
    url: "https://developers.openai.com/api/docs/"
  - label: "Model Context Protocol: arquitectura e interoperabilidad"
    url: "https://modelcontextprotocol.io/introduction"
---

## Coordinar significa reducir dependencias

Usar varios agentes no garantiza que un cambio avance más rápido ni sea mejor. La coordinación añade costes: repartir contexto, resolver decisiones incompatibles y comprobar interfaces. Conviene empezar con una sola tarea y paralelizar únicamente trabajo que tenga límites claros. Tres patrones comunes son la secuencia —una etapa entrega a la siguiente—, el paralelismo de tareas independientes y una revisión separada que busca problemas en un resultado ya producido.

En un flujo secuencial, una persona define el contrato; un agente propone implementación; otro revisa el diff; y una persona integra y ejecuta la verificación. La etapa posterior recibe artefactos concretos, no una conversación completa sin orden. En paralelo, dos tareas solo son realmente independientes si no escriben sobre el mismo archivo, no cambian la misma interfaz y pueden probarse por separado. Si ambas inventan nombres para una operación compartida, el ahorro desaparece durante la integración.

Un agente revisor puede aportar una perspectiva distinta si se le pide buscar errores específicos y se le da el mismo criterio de aceptación. No es una autoridad ni un auditor independiente por definición: puede repetir supuestos del implementador, ignorar contexto o confirmar un defecto inexistente. Una revisión útil señala evidencia, impacto, supuesto y una forma de reproducir el hallazgo. La decisión final pertenece a una persona responsable del sistema.

## Ejemplo: añadir exportación CSV

Una tarea grande puede dividirse en: definir formato de columnas; implementar conversión de datos; añadir una acción de interfaz; revisar documentación. Antes de repartir, la persona responsable acuerda el contrato: columnas exactas, orden, filas incluidas y comportamiento ante comillas o saltos de línea. La conversión y la actualización de la guía podrían avanzar en paralelo si comparten ese contrato; la interfaz depende de que la función de exportación tenga una firma estable. La revisión debe evaluar el diff final y no solo los resúmenes de cada participante.

Asigna propiedad de archivos y resultados: una tarea devuelve la función y sus tests; otra, el texto actualizado y las afirmaciones respaldadas. Si un cambio debe tocar la misma interfaz, serialízalo o designa una única persona editora. No permitas que una coordinación automática publique, borre datos o amplíe permisos para resolver un conflicto. La orquestación controla dependencias y verificaciones; no elimina políticas de seguridad.

## Actividad paso a paso

1. Elige una función pequeña que podría dividirse en tres entregables.
2. Dibuja flechas entre entregables solo cuando uno necesite una decisión o archivo del otro.
3. Escribe para cada tarea su entrada, salida esperada, archivos permitidos y una comprobación.
4. Marca qué actividades podrían ejecutarse en paralelo sin compartir archivos ni contradecir interfaces.
5. Asigna una persona responsable del contrato y un punto de integración donde se revisen resultados.
6. Imagina que dos resultados proponen columnas CSV distintas. Detén el merge, vuelve al contrato y pide una decisión antes de resolver por preferencia del agente.

## Verificación y solución

Para el ejemplo, la conversión depende de los criterios de CSV; la interfaz depende de la firma; la documentación depende del comportamiento confirmado. Las dos últimas pueden comenzar en paralelo solo si el contrato está cerrado y la documentación se mantiene como borrador hasta que el test lo respalde. Comprueba cada salida por separado, revisa el diff conjunto, ejecuta pruebas y vuelve a abrir la pantalla. El conteo de agentes o tareas terminadas no sustituye esos criterios.

Si las dependencias no se pueden explicar en un diagrama sencillo, es señal de que el encargo todavía está demasiado acoplado. Reduce el alcance o realiza los pasos en secuencia. Si una tarea produce preguntas de negocio, no delegues una decisión inventada: eleva la duda y espera confirmación.

## Errores frecuentes

- **Paralelizar por defecto.** Evalúa si los entregables son independientes y si la integración costará más que la espera.
- **Compartir un espacio editable sin propiedad.** Define rutas y responsables para prevenir cambios concurrentes.
- **Pedir a un agente que revise “todo”.** Acota el foco a criterios, rutas y riesgos observables.
- **Aceptar acuerdo como evidencia.** Contrasta resultados con requisitos, pruebas y revisión humana.
- **Dejar que el orquestador amplíe permisos.** Mantén límites iguales o más estrictos en cada etapa.

## Resumen

La coordinación útil separa trabajos con contratos explícitos, ordena las dependencias y asigna propiedad. Usa secuencia cuando las decisiones encadenan, paralelo cuando las salidas no chocan y revisión independiente para hallar preguntas concretas. Integra con pruebas y criterio humano; más agentes no significan más certeza.
