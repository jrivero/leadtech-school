---
title: "Verificar el software generado por agentes"
description: "Convierte los criterios de aceptación en comprobaciones independientes y revisa código, permisos y resultados de un agente antes de integrar cualquier cambio."
module: "08-calidad-que-se-demuestra"
order: 10
duration: 40
level: "Intermedio"
objectives:
  - "Traducir una petición delegada en casos de aceptación que no dependan del resumen del agente."
  - "Inspeccionar diff, pruebas, dependencias y posibles efectos antes de integrar el resultado."
  - "Registrar con precisión qué verificaciones se ejecutaron y qué riesgos siguen abiertos."
prerequisites:
  - "Conocer el flujo de trabajo con agentes y leer un diff."
  - "Poder ejecutar una prueba local con datos ficticios."
updatedDate: '2026-10-08'
sources:
  - label: "AGENTS.md: límites e instrucciones para el trabajo en repositorios"
    url: "https://agents.md/"
  - label: "OWASP: revisión segura de código"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html"
---

## La verificación necesita una referencia independiente

El código generado por un agente se revisa como cualquier código nuevo y, además, se comprueba que el proceso respetó el alcance autorizado. Empieza por una fuente externa a la respuesta del agente: requisito, ejemplo aceptado, contrato o test escrito antes de examinar la solución. Si el mismo agente inventa el comportamiento, implementa el cambio y luego redacta pruebas que solo confirman su interpretación, el ciclo puede ser coherente y aun así estar equivocado.

Divide la verificación en preguntas: ¿qué comportamiento observa la persona?, ¿qué entradas límite alteran la regla?, ¿qué rutas fueron modificadas?, ¿qué dependencias o permisos aparecen?, ¿qué datos podrían salir del entorno? Examina el diff completo, incluyendo archivos ocultos, configuración, scripts y documentación. Busca operaciones de red, acceso a secretos, cambios de permisos y pruebas que hayan sido borradas o debilitadas. No ejecutes una instrucción sugerida por el agente si no entiendes qué modifica.

Prueba primero la ruta crítica y después límites y fallos. Ejecuta los tests existentes para detectar regresiones, analiza los nuevos para comprobar que realmente fallan ante el defecto y verifica build o tipos si el proyecto ya los ofrece. Una captura o demostración visual puede mostrar un estado; no revela todas las ramas. Si la tarea afecta seguridad, pagos, datos o producción, exige controles adecuados y una revisión humana con autoridad. No aceptes un despliegue como modo de “probar si funciona”.

## Ejemplo de una regla sencilla

Una lista muestra tareas numeradas desde uno, pero Python indexa desde cero. El agente debe implementar `obtener_tarea(tareas, numero)` que devuelve la tarea para un número válido y un resultado controlado si el número es cero, negativo o supera la lista. Antes de revisar el código, define cuatro casos: primera tarea, última tarea, cero y número mayor al total. La verificación independiente compara cada salida con la especificación; no necesita llamar a un servicio ni usar datos reales.

El resumen del agente podría decir “todos los tests pasan”. Comprueba qué comando se ejecutó, si el código de salida fue satisfactorio y si los tests incluyen los cuatro casos. Inspecciona también que el número se convierta una sola vez y no aparezca una ruta que termine mostrando una excepción al usuario. Si no puedes reproducir el entorno, marca la comprobación como no verificada y solicita una ejecución reproducible.

## Actividad paso a paso

1. Escribe un encargo de una frase para la regla de numeración y añade entradas válidas, límites y resultado de error esperado.
2. Pide al agente un plan antes de permitir cambios. Confirma que la conversión uno-basado/cero-basado está clara.
3. Cuando haya una propuesta, revisa archivos modificados y busca cambios ajenos al alcance, nuevas dependencias y acceso a red o secretos.
4. Ejecuta casos preparados por ti, no solo los que propuso el agente. Incluye cero, primer elemento, último y fuera de rango.
5. Ejecuta las comprobaciones del proyecto que correspondan; guarda nombre, resultado y limitaciones sin copiar datos sensibles.
6. Corrige con un diff pequeño, repite los casos y decide explícitamente si integrar o devolver para cambios.

## Verificación y solución

Para una lista de tres elementos, `1` debe seleccionar el primero y `3` el último; `0` y `4` deben rechazarse sin cambiar la colección ni mostrar una excepción sin manejar. Estos cuatro casos son una base, no prueba de cualquier lista vacía, tipo no entero o requisito adicional. Si el comportamiento de lista vacía importa, añade ese caso según el contrato. La solución está respaldada cuando los resultados coinciden y el diff no contiene efectos no autorizados.

La evidencia debe distinguir “el test pasó localmente”, “se leyó el diff” y “se propuso un test que aún no se ejecutó”. Evita frases absolutas como “el agente garantizó que es seguro”. Si hay una limitación de entorno, dependencia no disponible o duda de producto, mantenla visible antes de integrar.

## Errores frecuentes

- **Revisar solo la explicación final.** Inspecciona código y configuración, no solo el resumen.
- **Aceptar tests escritos a partir de una suposición no aprobada.** Compara cada expectativa con el requisito independiente.
- **Permitir que el agente ejecute comandos destructivos o despliegue.** Restringe herramientas y pide aprobación para efectos externos.
- **Confundir ausencia de fallo con prueba suficiente.** Añade caminos negativos y límites relevantes.
- **Escribir “verificado” por cortesía.** Registra exactamente qué se ejecutó, en qué entorno y qué sigue pendiente.

## Resumen

Verificar trabajo de agentes significa contrastarlo con requisitos independientes, inspeccionar todo el diff y ejecutar comprobaciones propias. Revisa permisos, dependencias, errores y límites, y documenta evidencia y dudas. La automatización puede acelerar el cambio, pero la integración responsable y la aceptación siguen necesitando juicio humano.
