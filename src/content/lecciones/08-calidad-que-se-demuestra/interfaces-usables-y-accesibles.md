---
title: "Interfaces usables y accesibles"
description: "Diseña un formulario comprensible con teclado, etiquetas y errores claros, y combina revisión manual con criterios WCAG sin prometer conformidad automática."
module: "08-calidad-que-se-demuestra"
order: 7
duration: 40
level: "Intermedio"
objectives:
  - "Relacionar una tarea de usuario con etiquetas, estructura y feedback comprensibles."
  - "Revisar una interacción con teclado y comprobar el tratamiento de un error."
  - "Usar WCAG 2.2 como referencia sin confundir un escáner automático con una evaluación completa."
prerequisites:
  - "Conocer HTML básico y formularios."
  - "Poder navegar una página usando teclado y ratón."
updatedDate: '2026-10-08'
sources:
  - label: "W3C: Web Content Accessibility Guidelines (WCAG) 2.2"
    url: "https://www.w3.org/TR/WCAG22/"
  - label: "Playwright: localizadores por rol y etiqueta"
    url: "https://playwright.dev/docs/locators"
---

## La tarea de la persona guía la interfaz

Una interfaz usable permite entender qué hacer, reconocer el estado y recuperarse cuando algo falla. La accesibilidad evita que la interacción dependa exclusivamente de una capacidad sensorial o de un dispositivo de entrada. No son una capa decorativa ni un único atributo HTML. La estructura semántica, el orden de foco, las etiquetas, la claridad del lenguaje, el contraste visual y la respuesta a errores afectan a personas distintas y deben comprobarse en el contexto real de la tarea.

Imagina un formulario para crear una tarea con título y fecha opcional. Un `placeholder` como “Escribe aquí” desaparece al escribir y no explica bien el campo. Una etiqueta visible asociada a la entrada mantiene su nombre disponible; el botón debe tener un texto que describa la acción. Al enviar un título vacío, el mensaje necesita identificar el problema y quedar relacionado con el campo. Si un agente o una prueba automatizada no puede reconocer el control mediante su nombre y rol, eso puede indicar un problema de accesibilidad o un test frágil, no siempre la misma causa.

WCAG 2.2 organiza criterios de éxito verificables, pero la conformidad es una evaluación de requisitos aplicables sobre páginas y procesos definidos. Pasar un escáner automático no prueba por sí solo que la experiencia sea correcta: algunas comprobaciones necesitan interpretación, teclado, ampliación, lector de pantalla y revisión de contenido. Tampoco hay que proclamar “cumple WCAG” por añadir `aria-label` a cada elemento; ARIA no reemplaza HTML semántico cuando el elemento nativo ya expresa la función.

## Ejemplo de marcado

Este fragmento asocia etiqueta e instrucciones sin depender de un servicio externo. En una aplicación real, el mensaje de error debe aparecer cuando corresponda, anunciarse adecuadamente y no basarse solo en color. El fragmento no valida por sí mismo el formulario ni constituye una auditoría completa.

```html
<form>
  <label for="titulo">Título de la tarea</label>
  <p id="ayuda-titulo">Escribe entre 1 y 80 caracteres.</p>
  <input id="titulo" name="titulo" aria-describedby="ayuda-titulo">
  <button type="submit">Crear tarea</button>
</form>
```

## Actividad paso a paso

1. Abre una interfaz local de práctica y completa una tarea usando solo Tab, Mayús+Tab, Enter y Espacio.
2. Anota el orden del foco y si puedes ver siempre qué control lo tiene. Comprueba que no quedas atrapado en un elemento.
3. Identifica cada campo por su etiqueta, no por el texto temporal. Activa el botón y observa cómo se informa un dato ausente.
4. Repite con una ampliación del navegador o un lector de pantalla disponible; si no dispones de esos medios, registra esa limitación en lugar de inferir el resultado.
5. Comprueba que el mensaje de error nombra el campo y su corrección, y que el estado no se comunica solo mediante rojo/verde.
6. Si añades un test Playwright, localiza por rol y nombre accesible; evita selectores que dependan de clases visuales sin relación con el uso.

## Verificación y resultado esperado

La revisión está lista cuando puedes terminar el recorrido sin ratón, percibir el foco, identificar cada entrada y entender cómo corregir un error. La etiqueta debe seguir disponible después de escribir; el botón debe expresar qué ocurrirá. Corrige los bloqueos encontrados y repite exactamente los mismos pasos. Esta comprobación manual ayuda a descubrir barreras, pero no equivale a probar todas las pautas WCAG 2.2 ni todos los dispositivos de asistencia.

Prioriza según el impacto: una persona que no puede enviar un formulario tiene un bloqueo mayor que una diferencia menor de presentación. Registra la página, el criterio o principio revisado, el entorno y la evidencia. Un informe accionable permite repetir el problema y verificar la solución sin incluir datos personales.

## Errores frecuentes

- **Usar solo el color para señalar éxito o error.** Añade texto o iconografía con nombre accesible y comprueba contraste.
- **Poner un placeholder en lugar de una etiqueta.** Conserva un nombre visible y asociado al control.
- **Añadir roles ARIA sin entender su efecto.** Prefiere elementos HTML nativos y revisa el árbol accesible resultante.
- **Confiar en una auditoría automática como certificado.** Combina herramientas con pruebas manuales y evaluación de criterios aplicables.
- **Probar únicamente con ratón.** Repite acciones con teclado y con las tecnologías de apoyo disponibles.

## Resumen

La usabilidad y accesibilidad se comprueban recorriendo tareas reales con distintos modos de interacción. Construye con semántica nativa, etiquetas, foco visible y errores comprensibles; contrasta con WCAG 2.2 y repite el flujo tras corregirlo. Los tests automatizados ayudan, pero no ofrecen una garantía total ni sustituyen la evaluación humana.
