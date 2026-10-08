---
title: "De copilotos a agentes de desarrollo"
description: "Reconoce cuándo un asistente solo propone código y cuándo un agente observa, planifica y actúa, y aprende a limitar cada cambio con criterios verificables."
module: "07-un-flujo-de-trabajo-con-agentes"
order: 1
duration: 35
level: "Intermedio"
objectives:
  - "Distinguir una sugerencia de código de un flujo agentivo con herramientas y retroalimentación."
  - "Definir alcance, permisos y condición de parada para una tarea delegada."
  - "Evaluar el trabajo de un agente mediante el diff y comprobaciones reproducibles."
prerequisites:
  - "Conocer archivos, funciones y pruebas básicas de un proyecto de software."
  - "Poder leer un diff y ejecutar una comprobación local."
updatedDate: '2026-10-08'
sources:
  - label: "AGENTS.md: guía abierta para agentes de desarrollo"
    url: "https://agents.md/"
  - label: "OpenAI API: documentación de la plataforma"
    url: "https://developers.openai.com/api/docs/"
---

## De la respuesta a un ciclo de trabajo

Un copiloto suele proponer texto o código en el punto donde estás trabajando; tú eliges qué aceptar y cuándo continuar. Un agente de desarrollo puede recorrer un ciclo más amplio: leer archivos pertinentes, formular un plan, usar herramientas autorizadas, observar el resultado y ajustar el siguiente paso. La diferencia no es que uno sea “inteligente” y el otro no, ni depende de una etiqueta comercial. Importan las herramientas disponibles, el grado de autonomía y quién conserva la decisión final.

Un ciclo útil empieza con un objetivo y un contexto acotados. El agente inspecciona, interpreta una tarea, propone o ejecuta cambios, y recibe señales como errores de pruebas o diferencias del navegador. Una condición de salida explícita evita que siga explorando indefinidamente: por ejemplo, “termina cuando la validación local pase y el diff solo contenga el cambio solicitado; si falta una regla de negocio, pregunta”. La salida del modelo es una propuesta; que una prueba pase tampoco demuestra por sí sola que el requisito sea correcto.

## Un ejemplo con un gestor de tareas

Supón que una aplicación guarda tareas con título y estado. Se solicita mostrar también una fecha límite. Una petición abierta —“añade fechas”— deja dudas sobre formato, zona horaria, tareas sin fecha y edición. En cambio, un encargo comprobable dice: “Añade un campo opcional `fecha_limite` en la vista de tareas; conserva sin fecha las entradas anteriores; no cambies persistencia ni formato de la API; incorpora un caso con fecha y otro sin ella; detente antes de modificar archivos fuera de la interfaz y sus pruebas”.

El agente puede leer el componente y su test, localizar el punto de renderizado, proponer un cambio pequeño y ejecutar la prueba disponible. Tu supervisión sigue siendo necesaria: confirma que la fecha no se inventa para registros existentes, que el diff no contiene cambios de configuración inesperados y que el formato resulta comprensible. Si el agente decide migrar la base de datos aunque se pidió no tocarla, no es iniciativa útil: se salió del límite y debe explicar el motivo antes de continuar.

## Actividad paso a paso

1. Elige una mejora reversible de un proyecto de práctica, como ordenar una lista por nombre.
2. Escribe el resultado visible, dos criterios de aceptación y una exclusión explícita.
3. Indica los archivos que puede inspeccionar, los que puede editar y las comprobaciones locales permitidas. No le des acceso a producción, pagos, correo ni secretos.
4. Pide primero un plan breve y las dudas que podrían cambiar el comportamiento. Corrige supuestos antes de autorizar edición.
5. Revisa el diff por archivo. Compara cada modificación con los criterios y descarta cambios no explicados.
6. Ejecuta las pruebas que existían antes y las nuevas. Si aparece una dependencia o una llamada de red, para y solicita una justificación.

La práctica no requiere un proveedor remoto: puedes redactar una simulación de plan en papel y revisar una modificación pequeña manualmente. Si usas un agente, emplea el modo de sugerencias o el entorno de aprendizaje aprobado; no copies un token en el prompt para “facilitar” la prueba.

## Verificación y criterio de cierre

Marca la tarea como terminada solo si otra persona puede repetir la comprobación y obtener el mismo resultado observable. Para el ejemplo, los dos casos de fecha con y sin valor deben mostrarse como acordado; los tests deben pasar; el diff debe limitarse a las rutas autorizadas. Registra qué comando ejecutaste y su salida resumida, sin presentarlo como prueba de lo que no ejecutaste. Si el agente no puede validar por falta de entorno, deja esa limitación escrita en lugar de declarar éxito.

Una revisión rápida tiene tres preguntas: ¿se implementó el comportamiento pedido?, ¿se respetaron alcance y permisos?, ¿hay evidencia suficiente para aceptar el cambio? “El agente dice que funciona” no responde a ninguna por sí solo.

## Errores habituales

- **Pedir una aplicación completa en una sola frase.** Divide el cambio por resultado comprobable y acuerda preguntas pendientes.
- **Confundir autonomía con autoridad.** Permitir que edite no implica permitir que publique o acceda a datos reales.
- **Aceptar un plan sin comprobarlo.** Un plan puede omitir compatibilidad, rutas de error o casos existentes.
- **Revisar solo el resumen del agente.** Abre el diff y examina archivos, configuración y pruebas.
- **Interpretar pruebas verdes como garantía total.** Son evidencia de los casos cubiertos, no una certificación del producto.

## Resumen

Un agente amplía el ciclo de trabajo al combinar contexto, herramientas y retroalimentación. Encárgale una unidad pequeña con alcance, permisos, criterios y condición de parada. Revisa el diff y ejecuta comprobaciones reproducibles; mantén en manos humanas las decisiones, los datos sensibles y cualquier publicación.
