---
title: "Qué es la IA y qué no es"
description: "Distingue sistemas de IA, aprendizaje automático y automatización con ejemplos cotidianos, y aprende a comprobar qué tarea resuelve cada uno."
module: "05-entender-la-inteligencia-artificial"
order: 1
duration: 25
level: "Inicial"
objectives:
  - "Explicar con palabras propias qué caracteriza a un sistema de inteligencia artificial."
  - "Diferenciar automatización por reglas, aprendizaje automático e IA generativa."
  - "Identificar una tarea concreta y proponer una prueba sencilla para evaluar el resultado."
prerequisites: []
updatedDate: '2026-10-08'
sources:
  - label: "OECD: definición actualizada de sistema de IA"
    url: "https://www.oecd.org/en/publications/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system_623da898-en.html"
  - label: "NIST: AI Risk Management Framework"
    url: "https://www.nist.gov/itl/ai-risk-management-framework"
---

## Idea central — explicación conceptual

Inteligencia artificial (IA) es un nombre amplio para sistemas informáticos que, a partir de objetivos e información de entrada, producen salidas como predicciones, recomendaciones, decisiones o contenido. La definición de la OCDE enfatiza que un sistema puede inferir cómo generar esas salidas y que su autonomía varía. Eso no significa que tenga conciencia, deseos o comprensión humana. «Inteligente» describe una capacidad diseñada para una tarea, no una mente dentro del ordenador.

Conviene separar tres ideas. **Automatización por reglas** ejecuta instrucciones explícitas: si el formulario está incompleto, muestra un aviso. **Aprendizaje automático** ajusta parámetros a partir de ejemplos y aprende patrones útiles para una tarea, como clasificar un mensaje como correo no deseado. **IA generativa** produce material nuevo —texto, imágenes, audio o código— a partir del contexto recibido. Las categorías pueden combinarse: una aplicación generativa puede usar un clasificador y reglas normales alrededor del modelo.

La pregunta útil no es «¿esto es IA?» a secas, sino: ¿qué entrada recibe, qué salida ofrece, para qué se usará y qué pasa cuando se equivoca? Una hoja de cálculo con una fórmula fija puede ser muy útil sin ser un modelo de IA. Un sistema que estima la categoría de una petición a partir de ejemplos sí usa aprendizaje, aunque su interfaz parezca una caja de texto común.

## Ejemplo concreto

Imagina una pequeña biblioteca que recibe solicitudes de préstamo. Una regla automática rechaza una solicitud si faltan el título o el número de socio. Un modelo entrenado con solicitudes anteriores podría sugerir qué categoría de libro busca una persona. Un modelo generativo podría redactar una respuesta amable explicando el horario de recogida. Ninguno debería inventar que un ejemplar está disponible: esa respuesta necesita consultar el catálogo actualizado. El ejemplo enseña que una solución puede mezclar software corriente e IA, y que cada pieza requiere una prueba distinta.

## Práctica guiada — receta

1. Escoge una tarea cotidiana pequeña, por ejemplo ordenar cinco comentarios ficticios en «pregunta», «queja» o «felicitación». No uses mensajes privados reales.
2. Escribe la entrada y la salida esperada en una frase. Señala si la tarea podría resolverse con reglas simples o si exige inferir patrones ambiguos.
3. Crea cinco ejemplos inventados y clasifícalos a mano. Guarda la respuesta esperada antes de consultar una herramienta.
4. Pide a un asistente que sugiera categorías para los mismos ejemplos. Solicita que marque como «dudoso» cualquier caso que no pueda decidir con claridad.
5. Compara cada salida con tu clasificación manual. Anota aciertos, errores y casos en que las categorías necesitan una mejor definición.

Esto es una práctica conceptual: no estás entrenando un modelo ni demostrando que toda IA funciona igual. Estás aprendiendo a describir la tarea y a observar evidencia antes de confiar en una etiqueta.

## Validación y solución de problemas

La evaluación debe usar ejemplos que no hayas usado para explicar la tarea al asistente. Si las categorías se confunden, revisa primero sus definiciones y añade un ejemplo límite; no cambies el criterio después de ver cada respuesta solo para declarar un acierto. Si el resultado inventa una categoría nueva, pídele que use exclusivamente la lista dada y comprueba si la nueva instrucción reduce el problema. En un caso real, mide los errores que tienen consecuencias, no solo el porcentaje total de aciertos.

## Errores frecuentes

- Llamar «IA» a cualquier programa automático y perder de vista qué mecanismo resuelve la tarea.
- Suponer que una respuesta fluida demuestra comprensión, intención o acceso a datos actuales.
- Tratar una predicción como una decisión correcta por defecto; una persona debe definir cuándo revisar o detener el proceso.
- Comparar dos sistemas con ejemplos distintos y atribuir la diferencia únicamente al modelo.

## En resumen

IA agrupa técnicas diversas; automatización, aprendizaje automático e IA generativa no son sinónimos. Empieza por definir entrada, salida, propósito y riesgo. Después prepara ejemplos con respuesta esperada y valida los resultados. Esa forma de pensar funciona tanto si al final eliges una regla sencilla como si eliges un modelo.
