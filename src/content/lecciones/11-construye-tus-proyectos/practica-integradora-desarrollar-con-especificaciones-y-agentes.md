---
title: "Práctica integradora: desarrollar con especificaciones y agentes"
description: "Convierte una necesidad pequeña en alcance, especificación, cambios supervisados por un agente y pruebas que permitan decidir si el resultado cumple."
module: "11-construye-tus-proyectos"
order: 5
duration: 120
level: "Intermedio"
objectives:
  - "Traducir una necesidad en alcance y criterios de aceptación observables."
  - "Asignar a un agente tareas acotadas con límites y revisar cada cambio."
  - "Verificar el resultado con pruebas, evidencias y una retrospectiva breve."
prerequisites:
  - "Conocer funciones, estructuras de datos y pruebas básicas."
  - "Poder ejecutar el proyecto localmente y leer un diff."
updatedDate: '2026-10-08'
sources:
  - label: "OpenCode: agentes y permisos"
    url: "https://opencode.ai/docs/agents/"
  - label: "Ollama: integración local con OpenCode"
    url: "https://github.com/ollama/ollama/blob/main/docs/integrations/opencode.mdx"
  - label: "OpenCode: licencia MIT del proyecto"
    url: "https://github.com/anomalyco/opencode/blob/dev/LICENSE"
  - label: "Ollama: licencia MIT del proyecto"
    url: "https://github.com/ollama/ollama/blob/main/LICENSE"
  - label: "GitHub Docs: colaboración mediante pull requests"
    url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests"
---

## Brief: un registro pequeño de incidencias

Esta integración recoge el hilo del curso: parte de requisitos verificables y fundamentos de programación, usa un agente como apoyo de implementación y termina con pruebas, revisión y evidencia de decisiones. El criterio no es cuánto código generó, sino poder explicar y comprobar cada cambio, también en permisos y datos.

Un equipo de estudio necesita anotar problemas encontrados en una aplicación de práctica y comprobar cuáles siguen abiertos. Construye una versión local que permita crear una incidencia con título y descripción, ver la lista y cambiar su estado entre abierta y resuelta. No añadas cuentas, notificaciones, colaboración en tiempo real ni servicios en la nube. El objetivo es demostrar un ciclo completo dirigido por especificaciones, no maximizar funciones.

## Alcance mínimo y especificación

Antes de programar, escribe una página con quién usa la herramienta, qué problema resuelve, qué queda fuera y qué dato mínimo se conserva. Añade historias con criterios verificables. Por ejemplo: “Como estudiante, quiero crear una incidencia para recordar un fallo”. Criterios: un título no vacío crea un elemento visible; un título vacío muestra un error legible y no lo guarda; cambiar el estado actualiza la lista. Define también el comportamiento de una lista vacía y qué significa “resuelta”.

Elige el lenguaje y las dependencias que ya tenga el proyecto; no agregues servicios ni compras. Si no existe un proyecto previo, crea la aplicación más pequeña que puedas ejecutar en local. El registro puede usar memoria o almacenamiento local del navegador, siempre que expliques si los datos sobreviven al cierre. No guardes datos sensibles.

## Plan paso a paso

1. **Anota el punto de partida.** Ejecuta las pruebas existentes, registra los fallos previos y localiza las instrucciones del proyecto. Así no atribuyes al agente un problema que ya existía.
2. **Cierra el alcance.** Redacta historias, campos y criterios de aceptación. Escribe explícitamente tres exclusiones para frenar las ampliaciones tentadoras.
3. **Pide un plan antes del código.** Si utilizas OpenCode, comienza con su agente de planificación: solicita archivos relevantes, riesgos y una secuencia breve, no cambios. Deja edición y terminal denegadas o pendientes de aprobación, y no autorices modificaciones durante esta fase. Corrige las suposiciones y aprueba tú el plan.
4. **Delega una pieza pequeña.** Entrega al agente una historia, los criterios y los archivos que puede tocar. Ejemplo: “Implementa validación del título; no cambies persistencia ni diseño; añade una prueba; explica el diff y detente si falta una decisión”. Usa permisos que pidan aprobación para editar o ejecutar comandos. Para evitar servicios remotos, una opción es conectar un agente compatible a un modelo local con Ollama; comprueba antes las licencias del modelo y la compatibilidad del equipo. No actives proveedores de nube ni APIs de pago.
5. **Revisa, no solo leas el resumen.** Inspecciona cada archivo modificado y el diff. Contrasta cada cambio con la especificación; rechaza modificaciones ajenas al alcance. Pide al agente revisor que enumere defectos sin escribir código y decide tú qué sugerencias aplicar.
6. **Prueba desde los criterios.** Ejecuta pruebas existentes y nuevas. Recorre además la app: crear una incidencia, rechazar un título vacío, resolver un elemento y comprobar la lista vacía. Si usas GitHub, registra contexto, pruebas y preguntas de revisión en un pull request; la decisión final sigue siendo humana.

## Entregables verificables

Presenta `docs/alcance.md`, `docs/especificacion.md`, la aplicación mínima, pruebas reproducibles y `docs/revision-agente.md`. En la última página resume qué solicitaste, qué aceptaste o rechazaste, qué cambió y qué pruebas ejecutaste. Añade instrucciones para arrancar y una captura o salida de terminal que evidencie el recorrido, sin incluir datos personales.

## Criterios de aceptación y solución orientativa

La entrega cumple si cada criterio de aceptación tiene una prueba o comprobación manual asociada; la aplicación hace las tres acciones acordadas; los errores se explican; las pruebas pasan; y el diff no contiene secretos, dependencias inesperadas ni cambios sin revisar. Una estructura simple puede modelar cada incidencia con identificador, título, descripción y estado; separar crear, listar y resolver; y mantener la presentación independiente de esas reglas. No necesitas una arquitectura compleja para mostrar decisiones explícitas.

Errores frecuentes: pedir “haz toda la app” sin límites, dejar que el agente elija requisitos, aceptar pruebas que no se corresponden con el problema, ejecutar comandos sin entenderlos y declarar éxito solo porque el modelo lo afirma. Si la prueba falla, vuelve al criterio, reproduce el fallo y pide una corrección localizada. Guarda la especificación y las pruebas como fuente de verdad; el agente propone cambios, pero tú autorizas y verificas el resultado.
