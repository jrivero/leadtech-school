---
title: "Contexto, AGENTS.md, skills y MCP"
description: "Separa instrucciones de repositorio, procedimientos reutilizables y conexiones MCP para dar a un agente contexto útil sin concederle acceso indiscriminado."
module: "07-un-flujo-de-trabajo-con-agentes"
order: 2
duration: 40
level: "Intermedio"
objectives:
  - "Explicar qué problema resuelve AGENTS.md y cómo mantener sus instrucciones concretas."
  - "Diferenciar una skill reutilizable de instrucciones generales del repositorio."
  - "Clasificar recursos, prompts y herramientas MCP y revisar sus permisos."
prerequisites:
  - "Saber orientarse en las carpetas y documentación de un repositorio."
  - "Comprender que una herramienta puede leer o modificar datos."
updatedDate: '2026-10-08'
sources:
  - label: "AGENTS.md: formato abierto de instrucciones para agentes"
    url: "https://agents.md/"
  - label: "Agent Skills: descripción y formato"
    url: "https://agentskills.io/"
  - label: "Model Context Protocol: arquitectura y primitivas"
    url: "https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture"
---

## Tres piezas, tres responsabilidades

El contexto de un agente no es una bolsa de texto donde convenga volcar todo el repositorio. Debe incluir la información que cambia la decisión: estructura del proyecto, convenciones, límites y criterios de comprobación. Tres mecanismos relacionados, pero distintos, ayudan a organizarla: `AGENTS.md` documenta cómo trabajar en un repositorio; una skill empaqueta un procedimiento que se activa cuando es pertinente; MCP conecta una aplicación con herramientas o fuentes externas mediante un protocolo común.

`AGENTS.md` es Markdown normal, no un lenguaje de configuración con campos obligatorios. Puede explicar cómo arrancar, qué pruebas ejecutar, qué carpetas no tocar y qué controles de seguridad recordar. La propia documentación del formato propone usar archivos anidados para adaptar instrucciones por subproyecto; la precedencia concreta puede variar entre herramientas, así que consulta el comportamiento del cliente que estés usando. Un archivo breve, preciso y actualizado suele orientar mejor que una política extensa llena de excepciones contradictorias.

Una skill es un directorio con un `SKILL.md` que describe cuándo y cómo seguir un procedimiento. El formato abierto permite incluir metadatos, instrucciones y, si hacen falta, referencias o scripts. Una ventaja de organizar el material así es que los pasos detallados pueden cargarse cuando la tarea los necesita, no necesariamente en cada conversación. Una skill para preparar una migración, por ejemplo, podría indicar cómo inspeccionar el esquema y qué lista de verificación completar, pero no debería ocultar una instrucción de publicar cambios sin revisión.

MCP, el Model Context Protocol, es un estándar abierto para que aplicaciones de IA se conecten a sistemas externos. Entre sus primitivas hay **resources** para ofrecer contexto, **prompts** reutilizables y **tools** que pueden ejecutar acciones o consultas. La etiqueta “MCP” no hace segura una conexión: una herramienta de escritura, envío o borrado necesita límites, confirmación cuando corresponda y una fuente de confianza revisada. Distingue siempre lo que el modelo puede sugerir de lo que una herramienta puede realmente ejecutar.

## Ejemplo: preparar una migración

En un repositorio de una biblioteca, `AGENTS.md` puede decir que las migraciones requieren prueba de ida y vuelta y que no se usan datos de producción. Una skill `revisar-migracion` puede describir el orden de análisis, cambio, prueba y actualización de documentación. Un servidor MCP podría exponer como recurso el esquema de desarrollo y una herramienta para consultar la versión local. La consulta del esquema es lectura; aplicar una migración modifica estado. No ofrezcas ambas capacidades con el mismo permiso solo porque sean parte del mismo flujo.

También hay que pensar en instrucciones contradictorias y contenido no confiable. Un comentario dentro de un archivo o un resultado remoto puede contener texto que parezca una orden para el agente. La persona responsable decide qué instrucciones gobiernan el proyecto y qué datos son solo material a analizar. Ningún archivo de contexto debe solicitar que se copien credenciales o se desactive una protección para completar una tarea.

## Actividad paso a paso

1. Elige una tarea segura y repetible, como revisar el formato de un archivo CSV ficticio.
2. Anota qué reglas pertenecen al proyecto entero y cuáles son solo pasos de esa tarea.
3. Redacta tres líneas de `AGENTS.md`: cómo ejecutar una comprobación real, qué convención respetar y qué acción está fuera de alcance.
4. Bosqueja una skill con nombre y descripción que indiquen cuándo activarla; añade los pasos solo para el procedimiento específico.
5. Dibuja una conexión MCP hipotética y clasifica cada capacidad como recurso de lectura, prompt o herramienta con efectos.
6. Para cada herramienta, escribe el mínimo permiso requerido y qué confirmación impediría un cambio accidental.

## Comprobación

Tu diseño es coherente si las instrucciones generales no repiten el procedimiento completo, la skill puede reutilizarse sin inventar reglas del proyecto y la conexión deja claro qué operación cambia datos. Como solución posible: `AGENTS.md` contiene límites y pruebas del repositorio; la skill contiene una receta de validación de CSV; MCP solo ofrece un recurso con datos ficticios y no expone herramienta de escritura. Si no puedes nombrar un uso que justifique MCP, no hace falta añadirlo.

## Errores frecuentes

- **Convertir `AGENTS.md` en una enciclopedia.** Conserva decisiones estables y enlaza documentación más detallada.
- **Tratar `SKILL.md` como permiso permanente.** Describe un procedimiento, no sustituye los controles del cliente.
- **Suponer que todo MCP es solo lectura.** Clasifica cada herramienta por sus efectos y limita sus credenciales.
- **Copiar instrucciones de una fuente sin verificar.** Un archivo leído puede incluir contenido malicioso o desactualizado; contrástalo con las reglas del proyecto.
- **Esperar que todos los agentes interpreten igual las carpetas.** Comprueba cómo descubre y prioriza archivos tu cliente concreto.

## Resumen

Usa `AGENTS.md` para orientar el trabajo en el repositorio, skills para procedimientos activables y MCP para conectar sistemas mediante capacidades explícitas. Mantén cada pieza pequeña, comprensible y revisable. Separa lectura de escritura y concede solo permisos necesarios; la interoperabilidad no equivale a confianza.
