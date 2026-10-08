---
title: "VS Code y GitHub Copilot en la práctica"
description: "Usa VS Code y GitHub Copilot para entender o modificar una función pequeña; inspecciona el cambio y comprueba su comportamiento antes de conservarlo."
module: "06-tu-caja-de-herramientas-ia"
order: 2
duration: 30
level: "Inicial"
objectives:
  - "Distinguir el editor VS Code de las funciones de asistencia de GitHub Copilot."
  - "Pedir una modificación acotada con contexto y criterios de aceptación observables."
  - "Revisar el diff y validar manualmente el código sugerido antes de incorporarlo."
prerequisites:
  - "elegir-herramientas-sin-perder-el-control"
  - "codigo-legible-depuracion-y-pruebas"
updatedDate: '2026-10-08'
sources:
  - label: "Visual Studio Code: configurar Copilot"
    url: "https://code.visualstudio.com/docs/setup/copilot"
  - label: "GitHub Docs: guía de Copilot en el IDE"
    url: "https://docs.github.com/en/copilot"
---

## Idea central — explicación conceptual

**Visual Studio Code** es un editor de código que puede ampliarse con extensiones y asistentes. **GitHub Copilot** es una familia de funciones de asistencia que se integra en distintos entornos, incluido VS Code. La interfaz exacta y las capacidades disponibles pueden cambiar según la versión, la cuenta, la organización y la configuración. Consulta las instrucciones oficiales que correspondan a tu instalación; no tomes un vídeo antiguo como confirmación de que un botón sigue ahí.

Una sugerencia en línea puede completar código mientras escribes; una conversación puede explicar una función o proponer un cambio. Algunas configuraciones ofrecen modos con más capacidad para explorar el proyecto o sugerir acciones. No son lo mismo que aceptar una línea de autocompletado: cuando un asistente puede leer más archivos o proponer cambios amplios, debes comprobar qué contexto usa y qué pretende modificar. El asistente no conoce automáticamente las reglas de tu equipo ni el comportamiento esperado de la aplicación.

Para trabajar bien, reduce la tarea a una función o archivo y describe el resultado esperado, las restricciones y cómo probarlo. Pide primero una explicación o un plan si no entiendes el código. Después compara la propuesta con los requisitos, revisa el diff y ejecuta las comprobaciones existentes del proyecto. No aceptes código porque compile: aún puede tratar mal un caso límite, filtrar información o romper una interacción.

El código que compartes también tiene contexto. Antes de abrir un repositorio de trabajo, comprueba las políticas de privacidad, extensiones y telemetría aplicables; no pegues secretos ni datos de clientes en un chat. En un proyecto de empresa, confirma qué proveedor y configuración están autorizados. Si Copilot no está disponible en tu cuenta o entorno, puedes realizar la misma práctica escribiendo la solución a mano y usando la lista de verificación.

## Ejemplo concreto

Imagina una función que recibe una lista de actividades ficticias y debe ordenarlas por fecha. El resultado esperado es claro: conservar todas las actividades, ordenar de la más próxima a la más lejana y no modificar la lista original. Copilot puede proponer una implementación o casos de prueba, pero tú debes comprobar qué ocurre con una lista vacía, fechas iguales y un dato incompleto.

## Práctica guiada — receta

1. Abre un proyecto de prueba sin credenciales ni datos reales. Localiza una función pequeña cuyo propósito puedas explicar.
2. Escribe en lenguaje corriente la entrada, la salida y dos casos límite. Pide a Copilot que explique la función actual y señale posibles fallos, sin modificar nada todavía.
3. Si la explicación coincide con el código, pide una propuesta de cambio que respete los criterios anotados. Limita el alcance a un archivo; no pidas limpiar o reescribir todo el proyecto.
4. Lee cada bloque del diff. Comprueba nombres, condiciones, valores por defecto y dependencias. Rechaza las líneas que no puedes explicar.
5. Ejecuta las pruebas existentes o realiza los casos manuales en una copia. Registra un caso que pasa y uno que antes fallaba; conserva el cambio solo si satisface el criterio.

La práctica describe un flujo conceptual, no una receta de instalación ni una promesa de funciones idénticas en todas las cuentas. La documentación oficial de VS Code y GitHub es la referencia para los controles de la interfaz actual.

## Validación y solución de problemas

Si Copilot modifica archivos no solicitados, revierte esa parte y vuelve a pedir un cambio más estrecho. Si propone una biblioteca nueva, pregunta qué necesidad resuelve y evita incorporarla solo porque aparece en la respuesta. Si los tests fallan, no le pidas que cambie también los tests hasta hacerlos pasar sin entender el motivo: primero compara el comportamiento con los criterios originales.

## Errores frecuentes

- Confundir el editor con el proveedor de IA o asumir que ambos productos tienen los mismos controles.
- Aceptar cambios en bloque sin leer el diff.
- Usar nombres de archivos, ejemplos o variables que contienen secretos reales.
- Pedir «mejora este proyecto» sin límite ni prueba de aceptación.
- Creer que una respuesta correcta en un caso demuestra que el código es seguro y general.

## En resumen

VS Code proporciona el espacio de trabajo; Copilot puede ayudar a explicar, proponer o completar código según la configuración disponible. Define una tarea pequeña, pide contexto antes de cambios y revisa cada línea. El resultado que cuenta es el que supera una prueba verificable y que puedes explicar tú mismo.
