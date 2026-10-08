---
title: "Introducción práctica a OpenCode"
description: "Conoce OpenCode como agente de programación y prueba una consulta de solo lectura; verifica permisos y versión antes de permitir ediciones o comandos."
module: "06-tu-caja-de-herramientas-ia"
order: 7
duration: 30
level: "Inicial"
objectives:
  - "Identificar OpenCode como un agente de programación documentado y revisar su alcance."
  - "Separar una tarea de análisis de una autorización para editar o ejecutar herramientas."
  - "Probar una tarea inocua y evaluar la respuesta y los controles disponibles."
prerequisites:
  - "elegir-herramientas-sin-perder-el-control"
  - "trabajar-con-codex-de-forma-supervisada"
updatedDate: '2026-10-08'
sources:
  - label: "OpenCode: documentación oficial"
    url: "https://opencode.ai/docs/"
  - label: "OpenCode: permisos de herramientas (V2)"
    url: "https://opencode.ai/v2/docs/permissions"
---

## Idea central — explicación conceptual

**OpenCode** aquí se refiere al agente de programación documentado en opencode.ai, no a cualquier herramienta que comparta ese nombre. Su documentación describe un entorno para interactuar con proyectos y herramientas. Las funciones y la configuración evolucionan: antes de seguir una instrucción, identifica qué edición de la documentación corresponde al producto instalado. Una guía de configuración antigua puede usar opciones distintas a las actuales.

Un agente de programación puede leer archivos y, si la configuración lo permite, proponer o realizar ediciones y acciones. Es importante separar «puedes ayudarme a entender este código» de «puedes cambiar archivos o ejecutar una orden». Los permisos deben coincidir con el objetivo y permanecer al mínimo. En las guías oficiales de OpenCode hay configuraciones de agentes y permisos; no copies un bloque de configuración sin comprobar la versión y el efecto de cada regla. El modo más potente no es automáticamente el modo más seguro.

Para empezar, elige un proyecto ficticio, una tarea concreta y un resultado verificable. Pide una explicación de solo lectura antes de permitir cambios. Si luego autorizas una edición, limita el alcance a uno o dos archivos, revisa el diff y ejecuta pruebas manuales o automatizadas. No facilites claves ni autorizaciones para acceder a cuentas. Si la herramienta propone un comando, entiende qué lee o modifica antes de aprobarlo; rechaza los comandos que descargan, borran, publican o cambian permisos si no forman parte explícita del ejercicio.

OpenCode puede conectarse a modelos y proveedores configurados, pero no asumas que todas las configuraciones se comportan igual ni que un editor local significa inferencia local. Comprueba qué proveedor recibe el prompt y el código, qué modelos aparecen y qué política se aplica. La lección no promete que un proveedor, integración o plan esté habilitado en tu cuenta.

## Ejemplo concreto

En un repositorio de práctica hay una función que clasifica una lista de mensajes ficticios. Pides a OpenCode que explique qué criterio usa y sugiera un test para un mensaje vacío. La primera parte puede evaluarse sin escribir archivos. Si posteriormente autorizas el test, compruebas que solo afecta al módulo de ejemplo y que el resultado coincide con tu respuesta esperada.

## Práctica guiada — receta

1. Prepara una carpeta de práctica sin datos privados, credenciales, configuraciones personales ni conexión a un repositorio de trabajo.
2. Abre la documentación oficial de OpenCode y confirma qué versión o edición de permisos corresponde a tu instalación. Revisa qué herramientas puede usar cada modo antes de iniciar.
3. Pide una explicación y una prueba propuesta sin conceder permiso de edición. Comprueba ambas contra el código.
4. Define un cambio opcional y acotado. Si la herramienta solicita una acción, lee su alcance; autoriza únicamente lo que entiendas y que sea necesario para el ejercicio.
5. Inspecciona cada archivo modificado, valida la prueba y compara el resultado con el requisito inicial. Rechaza o revierte cualquier cambio no solicitado.

No se incluye una receta de comandos ni una configuración copiable porque la documentación distingue versiones y políticas que pueden cambiar. Usa la guía oficial vigente para tu instalación en vez de adaptar una muestra antigua.

## Validación y solución de problemas

Si el agente intenta actuar más allá de la consulta, cancela y revisa la política de permisos antes de continuar. Si una regla no produce el efecto esperado, no sigas experimentando sobre un proyecto valioso: vuelve a una carpeta desechable y verifica la sintaxis vigente. Para medir calidad, registra errores factuales, archivos tocados y acciones aprobadas, además de si la tarea terminó.

## Errores frecuentes

- Confundir OpenCode con otro asistente por un nombre parecido.
- Suponer que un modo llamado «plan» u «ask» elimina toda capacidad de acción sin comprobarlo.
- Pegar configuraciones de otra versión o conceder todos los permisos para evitar avisos.
- Dar por privado un proyecto solo porque el editor se ejecuta localmente.
- Aceptar cambios de formato o archivos adicionales que no resuelven el objetivo.

## En resumen

OpenCode es una opción de agente de programación que requiere una lectura cuidadosa de su documentación vigente. Identifica versión y proveedor, empieza con una consulta inocua y revisa cada permiso. El agente puede proponer trabajo; tú validas y decides qué cambios se conservan.
