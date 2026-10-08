---
title: "Comunicación, feedback y colaboración"
description: "Practica conversaciones claras, feedback centrado en hechos y colaboración asíncrona con plantillas breves para revisiones, desacuerdos y acuerdos de equipo."
module: "12-crece-como-profesional"
order: 2
duration: 60
level: "Inicial"
objectives:
  - "Expresar una observación, su impacto y una petición concreta sin juzgar a la persona."
  - "Recibir feedback con escucha, preguntas y un siguiente paso acordado."
  - "Dejar decisiones y revisiones comprensibles para quienes colaboran en remoto."
prerequisites: []
updatedDate: '2026-10-08'
sources:
  - label: "GitHub Docs: colaborar en pull requests"
    url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests"
  - label: "GitHub Docs: revisar cambios en pull requests"
    url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests"
---

## Comunicar para que el trabajo avance

Las prácticas anteriores han producido especificaciones, diffs, pruebas y decisiones de seguridad. Para colaborar, esas evidencias necesitan contexto legible: así una revisión humana puede cuestionar el código propio o una sugerencia de IA sin convertir un desacuerdo técnico en un juicio personal.

Colaborar no significa estar siempre de acuerdo. Significa hacer comprensible el problema, separar lo observado de lo que suponemos y acordar quién hará qué. En una conversación técnica, una frase como “esto está mal” no indica qué comportamiento falla ni qué ayuda se necesita. Cambia el juicio general por un hecho que otra persona pueda comprobar.

Prueba esta estructura al dar feedback:

> **Contexto:** ¿en qué tarea o situación ocurre?  
> **Hecho observable:** ¿qué viste o leíste, sin adjetivar a la persona?  
> **Impacto o riesgo:** ¿qué efecto concreto tiene?  
> **Petición:** ¿qué cambio, explicación o decisión ayudaría?  
> **Siguiente paso:** ¿quién lo hará y cuándo se revisará?

Por ejemplo, en lugar de “nunca documentas”, describe que una instrucción de instalación no indica cómo configurar una variable necesaria, explica que alguien nuevo no puede arrancar el proyecto y pide añadir un ejemplo. La petición puede ser una pregunta si aún no conoces la intención: “¿podemos aclarar este paso o hay una alternativa que no estoy viendo?”.

## Recibir y responder

Cuando recibas una observación, escucha hasta el final antes de justificarte. Resume lo que entendiste: “Si te sigo, el caso sin resultados queda confuso porque no mostramos un mensaje”. Luego pide un ejemplo, el criterio esperado o la prioridad. Puedes aceptar el cambio, proponer otra solución con razones o señalar información que falta. Feedback no equivale a una orden automática; sí merece una respuesta respetuosa y explícita.

Cierra con un acuerdo verificable: “Añadiré un estado vacío y una prueba; te aviso cuando esté listo”. Si no puedes comprometer una fecha, ofrece el próximo momento en que actualizarás al equipo. En desacuerdos, primero confirma el objetivo común, después compara opciones y consecuencias. Si la conversación se calienta, pausa, resume lo entendido y propone retomarla con hechos o con una persona facilitadora.

## Colaboración asíncrona

En una incidencia o pull request, facilita que alguien pueda revisar sin tener que adivinar. Usa esta plantilla:

```text
Objetivo y contexto:
Qué cambió / qué no cambió:
Cómo probarlo (pasos y resultado esperado):
Riesgos o límites conocidos:
Pregunta concreta para quien revisa:
```

Al revisar código, comenta la línea o el comportamiento, no la inteligencia ni la intención de quien lo escribió. Separa un bloqueo que afecta al requisito de una sugerencia opcional. Si haces una pregunta, explica qué consecuencia te preocupa. Cuando el equipo usa GitHub, una pull request reúne descripción, discusión, revisión y cambios; consulta la guía oficial para conocer sus opciones y adaptarlas al proceso del equipo.

Las decisiones importantes merecen una nota corta: decisión, motivo, alternativas consideradas, responsable y fecha para revisar si sigue siendo válida. No conviertas cada intercambio en una reunión; reúne a las personas cuando falte contexto compartido o sea difícil resolver el desacuerdo por escrito.

## Ejercicio de 15 minutos

Elige una situación ficticia: una prueba falla porque el mensaje de error no indica cómo corregir la entrada. Escribe primero la reacción impulsiva que te saldría. Reescríbela con la plantilla de observación, impacto y petición. En pareja, una persona da el feedback y otra lo recibe; quien escucha debe resumirlo antes de contestar. Cambiad los papeles y terminad anotando una acción, una persona responsable y una forma de verificarla.

Revisa el resultado: ¿podría una tercera persona entender qué ocurrió?, ¿la petición se puede cumplir o aclarar?, ¿se distingue un hecho de una interpretación? Si algo suena acusatorio, vuelve a describir la conducta concreta y el efecto. Este ejercicio sirve tanto para una conversación como para una revisión escrita.

## Errores que conviene evitar

No acumules observaciones durante semanas y las presentes como una lista de defectos. No uses sarcasmo, absolutos como “siempre” ni mensajes vagos que obligan a adivinar. Tampoco pidas a una herramienta de IA que decida quién tiene razón: puede ayudarte a hacer una frase más clara, pero tú debes validar el tono, el contexto y la propuesta. No introduzcas código privado, datos de clientes ni conversaciones confidenciales en servicios externos; si el uso de una herramienta no está autorizado, prepara la conversación sin ella. Evita activar servicios de pago para este ejercicio: papel, un documento compartido ya disponible o una opción local autorizada bastan.
