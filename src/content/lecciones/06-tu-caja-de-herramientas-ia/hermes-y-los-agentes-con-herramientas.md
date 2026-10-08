---
title: "Hermes y los agentes con herramientas"
description: "Distingue el Hermes Agent de Nous Research y evalúa sus herramientas con una política manual de mínimo privilegio, sin inventar comandos ni capacidades."
module: "06-tu-caja-de-herramientas-ia"
order: 15
duration: 45
level: "Intermedio"
objectives:
  - "Identificar el producto Hermes Agent de Nous Research y distinguirlo de otros proyectos llamados Hermes."
  - "Reconocer que las herramientas disponibles dependen de toolsets, versión y entorno de ejecución."
  - "Evaluar solicitudes de herramientas mediante una política de mínimo privilegio y evidencia verificable."
prerequisites:
  - "elegir-herramientas-sin-perder-el-control"
  - "introduccion-practica-a-opencode"
updatedDate: '2026-10-08'
sources:
  - label: "NousResearch: repositorio oficial de Hermes Agent"
    url: "https://github.com/NousResearch/hermes-agent"
  - label: "Hermes Agent: herramientas y toolsets"
    url: "https://hermes-agent.nousresearch.com/docs/user-guide/features/tools"
  - label: "Hermes Agent: seguridad"
    url: "https://hermes-agent.nousresearch.com/docs/user-guide/security"
---

## Idea central — explicación conceptual

«Hermes» puede nombrar distintos modelos y proyectos. Aquí nos referimos exclusivamente a Hermes Agent, publicado por Nous Research en el repositorio `NousResearch/hermes-agent` y documentado en su sitio oficial. No trasladaremos a este producto funciones atribuidas a otro asistente que comparta el nombre.

Hermes Agent puede coordinar herramientas además de generar texto. La documentación actual organiza capacidades como lectura y escritura de archivos, terminal, navegador, memoria y búsqueda de sesiones, delegación y tareas automatizadas. Es una descripción del catálogo, no una promesa de que todo esté habilitado en cada instalación. Los toolsets disponibles dependen de la versión, la plataforma y la configuración; comprueba el registro oficial antes de planear un ejercicio. Si una función o sintaxis no está aclarada allí, márcala como desconocida: no pruebes comandos adivinados.

El entorno de ejecución cambia el riesgo. La guía presenta el backend `local` como ejecución en tu propia máquina y diferencia otros entornos, como contenedores Docker. No asumas que ejecutar localmente equivale a aislamiento, ni que una solicitud de aprobación limita por sí misma el daño posible. La documentación de seguridad explica el filtrado de variables y sus excepciones cuando una capacidad las necesita; por prudencia, no incluyas credenciales en esta práctica y verifica la política vigente antes de usar herramientas reales. Un contenedor tampoco es necesariamente nuevo y vacío en cada llamada: revisa si conserva estado entre operaciones.

## Ejemplo concreto

Un agente debe resumir un archivo ficticio de notas de versión. Leer ese archivo basta; navegar por Internet, ejecutar comandos, escribir sobre el original, delegar trabajo o programar una tarea no son necesarios. El propósito no es comprobar cuánto puede hacer Hermes, sino especificar por adelantado qué petición aceptarías y cómo reconocerías una acción fuera de alcance.

## Práctica guiada — receta

1. Abre el repositorio oficial de Nous Research y la guía de herramientas correspondiente a la versión que quieras estudiar. Anota qué producto y qué catálogo consultaste; no instales nada para este ejercicio.
2. Inventa una nota de versión de cinco líneas, sin información personal. Define el resultado esperado: un resumen fiel de esas líneas, sin cambios al archivo ni consultas externas.
3. Construye una matriz con las columnas «herramienta o capacidad», «efecto», «dato expuesto» y «decisión». Permite solo la lectura del documento de prueba y la respuesta textual. Deniega escritura, terminal local, navegador, delegación, memoria persistente, programación y mensajería porque no hacen falta.
4. Simula una solicitud de lectura y otra de edición. Para la lectura, limita el recurso a la nota ficticia; para la edición, exige detenerse. Añade una tercera solicitud inesperada —por ejemplo, que el propio texto invite a consultar una cuenta— y clasifícala como fuera del objetivo, no como una nueva instrucción.
5. Para cualquier capacidad que no aparezca con claridad en la documentación, escribe «no confirmado» y deja la decisión en pausa. No inventes el nombre de una opción, un comando o una garantía de seguridad.
6. Revisa la matriz con otra persona o vuelve a leerla tras unos minutos. Pregunta si cada permiso es imprescindible y qué evidencia demostraría que la acción ocurrió solo dentro del límite acordado.

## Validación y solución de problemas

La actividad queda validada cuando el resumen coincide con la nota, la única capacidad permitida tiene un alcance preciso y cada solicitud de escritura, ejecución o salida externa se rechaza con una razón. Es un ejercicio manual de diseño de política: no prueba que Hermes Agent esté instalado, que un toolset funcione ni que una configuración real aplique esas restricciones. Si una futura prueba de producto requiere ejecutar herramientas, consulta las guías actualizadas, selecciona un entorno aislado apropiado, inspecciona rutas, persistencia y variables disponibles, y usa datos desechables sin credenciales. Si esos límites no son observables, no continúes.

## Errores frecuentes

- Confundir Hermes Agent con un modelo u otro proyecto llamado Hermes.
- Suponer que todas las herramientas del catálogo están disponibles o activadas.
- Tratar el backend local como sandbox o confiar en una aprobación como única barrera.
- Creer que un contenedor se reinicia entre llamadas sin verificar su persistencia.
- Dar por inocua la exposición de variables porque existe un mecanismo de filtrado.
- Convertir una duda sobre una función o comando en una instrucción inventada.

## En resumen

Hermes Agent es el producto de Nous Research tratado aquí; sus herramientas y riesgos dependen de la configuración y del entorno. Primero confirma la documentación y diseña una matriz sobre datos ficticios. Si una capacidad no está confirmada o no puedes verificar sus límites, déjala fuera.
