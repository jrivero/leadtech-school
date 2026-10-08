---
title: "Dónde encaja la IA al crear software"
description: "Sitúa la IA en el ciclo del software: úsala para tareas acotadas y conserva el criterio humano al definir, revisar, probar y mantener un producto."
module: "01-empieza-aqui"
order: 4
duration: 30
level: "Inicial"
objectives:
  - "Reconocer etapas habituales del trabajo de software."
  - "Elegir una tarea acotada donde la IA pueda ayudar sin asumir responsabilidad final."
  - "Revisar y probar cualquier cambio sugerido antes de integrarlo."
prerequisites:
  - "Conocer el ciclo básico de escribir y ejecutar código"
updatedDate: "2026-10-08"
sources:
  - label: "GitHub Docs: escribir pruebas con GitHub Copilot"
    url: "https://docs.github.com/en/copilot/tutorials/write-tests"
---

## La IA participa en un proceso, no lo reemplaza

Crear software no consiste solo en producir código. Primero se entiende una necesidad; después se acuerda qué comportamiento importa, se diseña una solución, se implementa, se prueba, se entrega y se mantiene. En la práctica estas actividades pueden repetirse en ciclos pequeños. Una función lista para ejecutar no demuestra que resuelva la necesidad de una persona, que no rompa otra función o que pueda mantenerse.

La IA puede colaborar en tareas parciales: explicar un mensaje de error, generar preguntas para aclarar requisitos, sugerir un ejemplo de prueba o proponer un primer borrador. Sin embargo, no conoce automáticamente las decisiones ocultas de un proyecto. Quien desarrolla debe aportar contexto, revisar cambios y responsabilizarse de la aceptación. GitHub documenta cómo usar Copilot para proponer pruebas y advierte que las pruebas generadas pueden no cubrir todos los escenarios; por eso revisa y amplía los casos.

## Ejemplo: corregir una tarea que no se marca como hecha

Imagina un gestor sencillo donde pulsar «completar» no cambia el estado visible. No empieces pidiendo a un agente que reescriba toda la aplicación. Primero describe el comportamiento esperado: «Al elegir el número de una tarea pendiente, su estado pasa a completada; las demás no cambian». Indica qué archivos intervienen y qué observaste.

Pide a la IA que sugiera causas y una prueba que pueda distinguirlas. Quizá el número mostrado empieza por uno mientras la lista de Python empieza por cero; quizá se cambia una copia de la tarea. Reproduce el fallo con dos tareas y registra el resultado real. Luego solicita un cambio pequeño. Antes de aceptarlo, inspecciona el diff: ¿solo cambió la lógica necesaria?, ¿añadió dependencias?, ¿alteró otra regla?, ¿introdujo datos sensibles o una operación destructiva?

Ejecuta la prueba nueva y las pruebas existentes. Prueba también un índice fuera del rango y confirma que se informa de forma comprensible. Si todo pasa, explica por qué la corrección resuelve el problema y qué no cubre. Si falla, comparte el nuevo mensaje con la IA y continúa desde evidencia concreta, no desde suposiciones.

## Dónde ayuda y dónde requiere más cuidado

Para tareas repetitivas y reversibles, como redactar una prueba inicial o resumir un archivo, una sugerencia puede acelerar el comienzo. Para decisiones con impacto en seguridad, pagos, privacidad o datos irreversibles, exige revisión más estricta y participación de personas con conocimiento del dominio. Un modelo puede pasar por alto una regla que no aparece en el contexto o proponer una dependencia con mantenimiento incierto.

Separa la tarea en pasos: define el resultado, pide una propuesta pequeña, revisa el cambio, ejecútalo y anota la evidencia. Limita los permisos del asistente a lo necesario. No compartas secretos ni datos de clientes. Si delegas una acción sobre archivos, comprende antes qué va a modificar y conserva una forma de deshacer el cambio.

## Práctica paso a paso

1. Elige un error inocuo en un ejercicio propio y descríbelo con resultado esperado y observado.
2. Pide primero hipótesis y pruebas, no código terminado.
3. Reproduce el problema sin IA y conserva una entrada mínima que lo active.
4. Solicita un cambio que afecte a una sola regla y revisa línea por línea la propuesta.
5. Ejecuta la prueba del fallo y otra prueba de una función relacionada.
6. Escribe qué comprobaste y qué limitación queda pendiente.

## Errores frecuentes

No uses «la IA lo generó» como explicación de una decisión técnica. No aceptes un diff grande porque la demostración visual parece correcta. Tampoco delegues el criterio de producto: una aplicación puede cumplir una orden literal y seguir siendo incómoda o injusta. Si no puedes explicar el cambio, pide que se reduzca o vuelve a implementarlo con apoyo más gradual.

## Resumen

La IA puede ayudar en análisis, borradores y tareas de apoyo, pero el proceso incluye necesidades, pruebas y mantenimiento. Delimita cada encargo, limita el acceso, revisa el diff y exige evidencia ejecutable antes de dar un cambio por bueno.
