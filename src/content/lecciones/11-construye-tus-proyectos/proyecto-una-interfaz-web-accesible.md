---
title: "Proyecto: una interfaz web accesible"
description: "Diseña una lista de tareas con HTML semántico y evalúa su uso con teclado, foco, etiquetas y contraste, tomando WCAG 2.2 como guía verificable."
module: "11-construye-tus-proyectos"
order: 1
duration: 120
level: "Intermedio"
objectives:
  - "Organizar una lista interactiva con HTML semántico y controles nativos."
  - "Comprobar el uso por teclado, etiquetas, errores y contraste con una lista de pruebas."
  - "Distinguir evidencias de criterios WCAG 2.2 de una declaración de conformidad total."
prerequisites:
  - "HTML, CSS y JavaScript básicos."
  - "Uso básico de la terminal y del navegador."
updatedDate: '2026-10-08'
sources:
  - label: "W3C — WCAG 2.2"
    url: "https://www.w3.org/TR/WCAG22/"
---

## Brief del proyecto

Una asociación vecinal prepara una jornada de limpieza y necesita una página para coordinar tareas: añadir una, marcarla como hecha y eliminarla. Algunas personas navegarán solo con teclado, ampliarán la pantalla o usarán un lector de pantalla. El reto no es decorar una tarjeta, sino hacer comprensibles las acciones, los errores y el estado de cada tarea. Trabaja como prototipo local: no hay cuentas, datos personales ni servidor.

## Alcance mínimo

Construye una vista única con HTML, CSS y JavaScript nativos; no necesitas un framework ni un servicio externo. Incluye un título claro, una etiqueta visible y un campo de texto, un botón para añadir, una lista y controles para completar o borrar cada tarea. Diseña también los estados de lista vacía, tarea completada, entrada inválida y alta correcta. Guarda los elementos solo en memoria: al recargar la página pueden desaparecer. La persistencia es opcional y no debe distraerte de la accesibilidad. Este proyecto enlaza los requisitos verificables y el HTML/JavaScript de los módulos anteriores con el trabajo de calidad: cada criterio se convierte en una prueba observable. Si pides a un asistente de IA que proponga la estructura, entrégale el brief y solicita un cambio pequeño; revisa tú el marcado, el foco y los mensajes antes de aceptar el resultado.

## Plan paso a paso

1. **Define las pruebas antes del estilo.** Escribe tres recorridos: añadir una tarea, completarla y borrarla. Añade casos para enviar el formulario vacío y para una lista sin elementos. Para cada recorrido, anota qué debe ver y escuchar la persona.
2. **Construye la estructura.** Usa regiones y encabezados con sentido, una etiqueta asociada al campo y botones reales. Un patrón inicial puede ser `<label for="nueva-tarea">Nueva tarea</label>` junto a `<input id="nueva-tarea" name="tarea">`. No uses el texto de ejemplo del campo como sustituto de la etiqueta.
3. **Implementa las acciones.** Al enviar, recorta espacios y rechaza una cadena vacía con un mensaje textual cercano al campo. Presenta las tareas en una lista; usa una casilla con etiqueta para cambiar su estado y un botón con nombre claro para borrar. Conserva el texto de la tarea, no solo un cambio de color.
4. **Aplica estilos y prueba.** Mantén un indicador de foco visible, buen contraste, orden de lectura natural y controles fáciles de pulsar. Con `Tab` y `Mayús+Tab`, recorre la página; usa `Enter` o `Espacio` para activar controles. Comprueba que no hay trampas de teclado. Amplía el navegador al 200 % y estrecha la ventana: el contenido y las acciones deben seguir disponibles.
5. **Registra evidencias.** Contrasta colores con una herramienta gratuita o con las herramientas del navegador. Para texto normal, salvo las excepciones del criterio, WCAG 2.2 AA fija como referencia un contraste mínimo de 4,5:1; para texto grande, 3:1. Repite la prueba con una tarea completada y con el error visible.

## Entregables y criterios de aceptación

Entrega `index.html`, `styles.css`, `app.js` y una lista breve de comprobaciones con resultado y método. Se acepta el prototipo si permite añadir, completar y borrar con ratón y teclado; el foco siempre se distingue; cada entrada tiene etiqueta; los errores se explican con texto; el estado no se comunica solo con color; y el contraste de los textos cumple el objetivo declarado. Anota también el ancho o el nivel de zoom en que revisaste el diseño, para que otra persona pueda repetirlo.

## Solución orientativa y errores frecuentes

Prefiere elementos HTML nativos antes de añadir atributos ARIA: un formulario, una etiqueta, una casilla y un botón ya comunican propósito y comportamiento al navegador. Mantén el foco visible con un estilo `:focus-visible` y usa una región de estado discreta para anunciar “Tarea añadida” o el error. Una comprobación automática puede señalar problemas, pero no demuestra por sí sola que se cumplan todas las pautas: verifica manualmente el teclado, el orden de lectura y los mensajes.

Errores típicos: usar solo `placeholder` como etiqueta; convertir un `div` en botón sin teclado; eliminar el contorno de foco; marcar “hecha” únicamente con verde; o probar solo con ratón y una lista ya completa. Haz la revisión con datos vacíos, largos y cortos. Este ejercicio no es una auditoría profesional ni una certificación WCAG; antes de publicar un producto real habría que ampliar las pruebas, revisar todos los flujos y consultar a personas usuarias con distintas necesidades de acceso.
