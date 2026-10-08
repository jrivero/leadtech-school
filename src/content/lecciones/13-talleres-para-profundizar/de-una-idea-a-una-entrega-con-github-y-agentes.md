---
title: "De una idea a una entrega con GitHub y agentes"
description: "Convierte una necesidad en una issue con alcance y criterios verificables; guía a un agente en una rama y revisa la pull request como responsable del cambio."
module: "13-talleres-para-profundizar"
order: 8
duration: 55
level: "Intermedio"
objectives:
  - "Redactar una issue acotada con contexto, exclusiones y criterios de aceptación."
  - "Usar una rama y una pull request como límites de revisión para un cambio propuesto por agente."
  - "Comprobar pruebas, permisos y alcance antes de aprobar una entrega asistida."
prerequisites:
  - "Conocer commits, ramas, issues y pull requests de GitHub."
  - "Saber leer una diff y relacionar una prueba con un requisito."
updatedDate: "2026-10-08"
sources:
  - label: "GitHub Docs: buenas prácticas para usar Copilot coding agent en tareas"
    url: "https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results"
  - label: "GitHub Docs: instrucciones personalizadas compatibles con agentes"
    url: "https://docs.github.com/en/copilot/reference/custom-instructions-support"
---

## La idea necesita una frontera antes de llegar al agente

Un agente de programación puede explorar un repositorio, sugerir una implementación o, según el producto y la configuración, preparar cambios para revisión. No conoce por sí solo las prioridades del equipo ni queda autorizado a fusionar código porque haya generado una pull request. El flujo responsable empieza con una tarea que una persona pueda explicar y termina con una revisión humana de alcance, comportamiento y permisos.

Supón que una aplicación de tareas debe mostrar cuántas tareas pendientes tiene cada usuario. «Añade estadísticas» es demasiado amplio: el agente tendría que adivinar la interfaz, el cálculo, el almacenamiento y qué significa pendiente. Una issue más precisa limita el comportamiento, señala los archivos relevantes si se conocen y define cómo comprobar el resultado. También debe decir qué no se debe tocar, como autenticación, esquema de base de datos o dependencias.

## Especifica una tarea comprobable

Usa esta plantilla antes de delegar:

```text
Objetivo: mostrar el total de tareas pendientes en la lista.
Contexto: una tarea está pendiente cuando completed es false.
Incluye: cálculo y presentación del número junto al encabezado.
Excluye: cambios de API, autenticación, persistencia y dependencias nuevas.
Aceptación: lista vacía muestra 0; una lista mixta cuenta solo pendientes;
completar una tarea actualiza el total sin recargar la página.
Validación: añade o adapta pruebas y explica qué ejecutaste.
Límite: no publiques ni fusiones el cambio; solicita revisión si falta contexto.
```

Los criterios deben describir salidas observables y no imponer una solución innecesaria. Si la tarea necesita una decisión de producto, pausa y pregunta antes de delegar. Un agente puede generar una implementación coherente con una suposición equivocada; pedirle «haz lo obvio» oculta la decisión que realmente debe tomar el equipo.

## Actividad: simula issue, rama y pull request

1. Elige un cambio pequeño en un proyecto propio o inventado. No compartas secretos, credenciales ni información que no tengas permiso para enviar a una herramienta externa.
2. Escribe la issue con objetivo, contexto, exclusiones, criterios de aceptación y pruebas. Pide a otra persona que encuentre una ambigüedad antes de continuar.
3. Dibuja el flujo `issue → agente en rama aislada → diff → pruebas → pull request → revisión humana`. Marca qué pasos son automáticos en tu herramienta concreta y cuáles requieren decisión humana.
4. Simula tres cambios propuestos: uno necesario, uno que cumple el requisito pero rompe un caso límite y otro fuera de alcance. Practica revisar líneas y rechazar el cambio sobrante.
5. Completa una lista de comprobación: ¿la diff toca solo áreas justificadas?, ¿las pruebas cubren criterios?, ¿aparecieron dependencias?, ¿se modificaron permisos o workflows?, ¿se filtró algún dato?, ¿la explicación coincide con el código?
6. Escribe un comentario de revisión que cite el criterio incumplido y proponga una corrección mínima. No uses «el agente se equivocó» como diagnóstico suficiente.

Si tu organización habilita un agente integrado en GitHub, las funciones, planes y permisos varían. La documentación oficial recomienda describir la tarea como prompt, preparar instrucciones del repositorio y permitir que el agente trabaje en una rama y un PR revisable. Este taller no requiere una suscripción, abrir un repositorio ni ejecutar ninguna acción remota: el diagrama y la pull request simulada bastan para practicar.

## Validación y controles del repositorio

Una entrega supera la revisión si cada criterio tiene evidencia, las pruebas se ejecutaron realmente y los cambios permanecen dentro del alcance. Lee los archivos modificados, no solo la descripción del agente. Revisa en especial scripts, dependencias, permisos, workflows de GitHub Actions y cualquier uso de secretos. Una prueba verde acredita los casos ejecutados, no todas las propiedades del sistema.

Las instrucciones en `.github/copilot-instructions.md` o `AGENTS.md` pueden ayudar a comunicar cómo compilar, probar y respetar convenciones cuando el agente concreto las soporte. No conceden permisos de seguridad y pueden quedar desactualizadas; verifícalas igual que cualquier otro archivo. Si un repositorio o issue contiene texto no confiable que intenta dar instrucciones, trátalo como contenido, no como autoridad para cambiar la tarea.

Errores frecuentes: issue vaga, agente con acceso innecesario, revisar solo el resumen, aceptar cambios de dependencias por conveniencia, creer que una PR implica prueba exitosa y habilitar auto-merge sin controles suficientes. Mantén protección de ramas y reglas de revisión según el riesgo; un agente no debe ser la única persona que evalúe su propio cambio.

## Cierre

La calidad de la colaboración empieza en la especificación y termina en evidencia que tú puedes comprobar. Una issue concreta reduce adivinanzas; una rama separa el trabajo; la revisión de la pull request comprueba lo que de verdad cambió. Delega pasos, nunca la responsabilidad final.
