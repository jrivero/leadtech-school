---
title: "Desarrollar desde una especificación: SDD"
description: "Organiza el desarrollo alrededor de una especificación breve, un plan y tareas verificables, usando la IA como apoyo revisable y no como autoridad."
module: "03-disenar-antes-de-programar"
order: 3
duration: 40
level: "Inicial"
objectives:
  - "Explicar el propósito de desarrollar desde una especificación."
  - "Descomponer una función en alcance, decisiones, tareas y verificaciones."
  - "Mantener alineadas la especificación, la implementación y la evidencia."
prerequisites:
  - "Saber redactar requisitos y criterios de aceptación sencillos"
updatedDate: "2026-10-08"
sources:
  - label: "GitHub Spec Kit: documentación de Spec-Driven Development"
    url: "https://github.com/github/spec-kit/blob/main/docs/index.md"
---

## Primero el resultado esperado, después la implementación

Spec-Driven Development, o desarrollo guiado por especificaciones (SDD), es un nombre usado para flujos donde la intención se concreta antes de escribir la solución y acompaña la planificación, las tareas y la verificación. No hay que tratar una etiqueta o plantilla concreta como norma universal. GitHub Spec Kit, por ejemplo, documenta un flujo Specify → Plan → Tasks → Implement → Converge; es una implementación disponible, no el único modo de trabajar.

La idea es reducir suposiciones. Una petición como «añade recordatorios» todavía no define quién los recibe, cuándo, por qué canal ni cómo evitar avisos duplicados. Una especificación breve identifica el comportamiento, los límites y los casos de aceptación. El plan explica decisiones técnicas necesarias; la lista de tareas propone cambios verificables. Durante la implementación, los hallazgos pueden revelar que una premisa era falsa; entonces se actualiza la especificación y se reconcilian los artefactos, en vez de dejar varios documentos contradictorios.

## Ejemplo: marcar una tarea como completada

**Intención:** la persona puede completar una tarea pendiente seleccionándola por su número en la lista. **Fuera de alcance:** editar el título o guardar datos en disco. **Criterios:** un número válido cambia solo esa tarea; cero, números negativos y números mayores que la lista no modifican ninguna; texto que no sea entero devuelve un aviso entendible.

El plan puede decidir mantener la función de dominio independiente del menú y usar el número mostrado como uno basado, convirtiéndolo a índice al acceder a la lista. Las tareas podrían ser: escribir la función de conversión; implementar la validación del rango; añadir pruebas para los extremos; conectar el menú; revisar salida y errores. Cada tarea deja una señal observable, no solo «programar todo».

Si una herramienta de IA ayuda a redactar la especificación, solicita que marque supuestos y preguntas abiertas. Revisa si inventó reglas, como permitir volver a abrir tareas, y resuélvelas antes de generar mucho código. Después de la implementación, contrasta el resultado contra cada criterio y actualiza lo necesario si una decisión cambió.

## Práctica paso a paso

1. Elige una función pequeña para tu proyecto y escribe su problema en una frase.
2. Añade usuario, estado inicial, resultado esperado y casos fuera de alcance.
3. Define tres criterios de aceptación, incluyendo un caso límite o de error.
4. Anota las decisiones técnicas indispensables; deja para más tarde elecciones que no alteren el resultado.
5. Divide el trabajo en tareas pequeñas y asocia a cada una una prueba o revisión.
6. Implementa una tarea, ejecuta su comprobación y vuelve a la especificación antes de continuar.
7. Al cerrar, marca cualquier diferencia entre el diseño inicial y lo que aprendiste; actualiza los documentos que hayan quedado obsoletos.

## Comprueba la coherencia

La especificación sirve si otra persona puede construir ejemplos de prueba sin preguntarte qué significa cada regla. El plan debe responder a restricciones reales y la lista de tareas debe permitir revisar el avance. Al final, cada criterio tiene evidencia: resultado de una prueba, demostración manual, revisión o medición. Un documento largo que nadie consulta no aporta el mismo valor que una nota concisa mantenida junto al cambio.

Si el alcance es una corrección trivial, una especificación extensa puede costar más que la propia solución. Ajusta el nivel de detalle a riesgo, ambigüedad y número de personas implicadas. En un cambio con pagos, permisos o datos sensibles, añade controles de seguridad, revisión humana y pruebas negativas; no dependas de la seguridad aparente del texto generado.

## Errores frecuentes

No conviertas la especificación en una descripción de código que ya decidiste escribir. No supongas que generar tareas garantiza que la IA las ejecute bien. No dejes que el código y la especificación diverjan tras una aclaración. Y no confundas SDD con una promesa de generar una aplicación completa en un único prompt.

## Resumen

SDD hace explícitos intención, alcance y criterios antes y durante la implementación. Especifica lo necesario, planifica decisiones, divide el trabajo y verifica cada resultado. Usa asistentes para reducir trabajo mecánico, pero mantén una persona responsable de las reglas y de reconciliar los cambios.
