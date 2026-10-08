---
title: "Un flujo de trabajo con Neovim y terminal asistida"
description: "Practica un ciclo de edición, terminal y revisión en Neovim; usa Lua para atajos pequeños y reserva las acciones del asistente para tareas comprobables."
module: "13-talleres-para-profundizar"
order: 1
duration: 50
level: "Intermedio"
objectives:
  - "Organizar en Neovim una sesión con archivo, terminal y puntos de control visibles."
  - "Crear un atajo Lua sencillo y explicar qué hace sin depender de plugins."
  - "Limitar la ayuda de un asistente de terminal y revisar cada cambio antes de conservarlo."
prerequisites:
  - "Manejar archivos desde la terminal y conocer los modos Normal e Insert de Vim o Neovim."
  - "Saber leer un diff y ejecutar una prueba existente del proyecto."
updatedDate: "2026-10-08"
sources:
  - label: "Manual oficial de Neovim: Lua y mapeos"
    url: "https://neovim.io/doc/user/lua-guide/"
  - label: "Manual oficial de Neovim: terminal integrada"
    url: "https://neovim.io/doc/user/terminal/"
---

## Un ciclo corto, no una colección de atajos

Neovim resulta útil cuando reduces el cambio de contexto: lees el código, haces una modificación pequeña, ejecutas una comprobación y revisas el resultado desde una misma sesión. Una terminal asistida puede proponer comandos o explicar errores, pero no sustituye tu criterio ni la revisión del repositorio. El taller usa un proyecto ficticio de tareas; no requiere instalar plugins, activar servicios externos ni conceder permisos al asistente.

Antes de pedir ayuda, concreta tres cosas: qué archivo o comportamiento estás examinando, qué resultado esperas y qué acciones no autorizas. Una petición segura sería: «Explica por qué esta función acepta un título vacío; no edites archivos ni ejecutes comandos. Sugiere dos casos de prueba». Si la herramienta puede ejecutar comandos, empieza con una solicitud de solo lectura. No pegues claves, datos personales, registros privados ni fragmentos cuyo envío no esté permitido.

## Prepara un puesto de trabajo entendible

Abre el archivo que quieres estudiar y divide la ventana para ver una terminal. En Neovim puedes escribir `:vsplit` y después `:terminal`, o abrir en una orden un proceso concreto con `:vsplit term://{comando}`. En Terminal-mode, `Ctrl-\` seguido de `Ctrl-n` devuelve el control al modo Normal. El terminal integrado es un búfer de Neovim conectado a un proceso; no es una caja de arena. Por ello, un comando allí puede modificar archivos igual que en cualquier otra terminal.

Un atajo Lua mínimo puede quitar pasos repetitivos sin esconder lo que va a ocurrir:

```lua
vim.keymap.set('n', '<leader>t', function()
  vim.cmd('vsplit')
  vim.cmd('terminal')
end, { desc = 'Abrir terminal vertical' })
```

La primera cadena indica modo Normal, la segunda es la combinación y la función abre primero una división y luego el terminal. `desc` deja una explicación visible al consultar los mapeos. Guarda el fragmento en tu configuración personal solo después de probarlo; para el ejercicio basta con leerlo y comprobar la secuencia en una instalación que ya tengas.

## Actividad: investigar un fallo sin delegar el control

1. Escoge una función pequeña que filtre tareas pendientes, o dibuja esta regla: una tarea vacía no se agrega y una válida comienza sin completar.
2. Abre su archivo en Neovim, identifica la entrada, la salida y un caso límite. Antes de modificar código, anota el resultado esperado para `""`, espacios y `"Leer"`.
3. En la terminal integrada ejecuta únicamente inspecciones adecuadas al proyecto, como `pwd`, `rg -n "pendientes|agregar" .` o la prueba ya documentada. No ejecutes una receta sugerida sin leer cada argumento.
4. Pide al asistente una explicación o una propuesta de diff acotada. Si propone cambios, aplícalos tú o revisa el diff línea por línea; rechaza toda parte que no responda al objetivo.
5. Ejecuta la prueba existente y revisa `git diff --check` y `git diff` cuando el proyecto use Git. Si no hay Git, compara el archivo antes y después y conserva una copia del caso de prueba.
6. Escribe una frase que conecte la modificación con el comportamiento observable: «al quitar espacios, la validación detecta que el título sigue vacío».

El resultado válido no es «el asistente dijo que funciona», sino que los casos definidos distinguen la conducta anterior de la nueva. Si no puedes ejecutar el proyecto, deja claro que la revisión fue estática y no presentes una prueba imaginaria como evidencia.

## Diagnóstico y errores frecuentes

Si el mapeo no aparece, revisa que esté cargado desde la configuración correcta y que el atajo no dependa de una variable `leader` que no conocías; el valor por defecto no siempre coincide con tus hábitos. Si ves texto extraño en la terminal, comprueba que estás en Terminal-mode antes de escribir comandos y vuelve a Normal-mode con la combinación indicada. Si Neovim no encuentra `rg`, usa la búsqueda disponible o inspecciona el archivo; no instales herramientas solo por este ejercicio.

Un error de proceso es aceptar una sugerencia amplia que mezcla limpieza, actualización de dependencias y arreglo de un fallo. Divide la tarea, solicita un cambio por vez y compara el diff con el alcance. Tampoco confundas «el editor y el asistente comparten contexto» con «el asistente está autorizado a leer secretos».

## Cierre

Una buena sesión alterna lectura, edición y verificación con pasos visibles. Usa Neovim para navegar y la terminal para comandos explicables; usa el asistente para generar hipótesis, no para validar su propio trabajo. Guarda solo los cambios que entiendes, cumplen el objetivo y superan una comprobación reproducible.
