---
title: "Cómo funciona la IA generativa"
description: "Comprende tokens, embeddings y atención con una analogía; prueba salidas con Hugging Face y Google AI Studio, y verifica el estado de GitHub Models."
module: "05-entender-la-inteligencia-artificial"
order: 2
duration: 35
level: "Inicial"
objectives:
  - "Explicar qué son los tokens, las representaciones vectoriales y la atención sin confundirlos con comprensión humana."
  - "Describir cómo un modelo de lenguaje genera texto a partir de contexto y predicciones sucesivas."
  - "Comparar dos experimentos pequeños y comprobar la disponibilidad de una herramienta en documentación oficial."
prerequisites:
  - "que-es-la-ia-y-que-no-es"
updatedDate: '2026-10-08'
sources:
  - label: "Hugging Face: curso de modelos de lenguaje y tokenizadores"
    url: "https://huggingface.co/learn/llm-course/en/chapter1/4"
  - label: "Google AI Studio: guía oficial de inicio"
    url: "https://ai.google.dev/gemini-api/docs/ai-studio-quickstart"
  - label: "GitHub Models: aviso oficial de retirada"
    url: "https://docs.github.com/en/github-models"
  - label: "Vaswani y otros: Attention Is All You Need"
    url: "https://arxiv.org/abs/1706.03762"
---

## Idea central — explicación conceptual

Un modelo generativo aprende regularidades a partir de muchos ejemplos. En un modelo de lenguaje, la entrada primero se convierte en **tokens**: unidades que pueden ser una palabra, parte de una palabra, un número o un signo. No existe una equivalencia fija entre palabra y token; cada modelo usa su propio tokenizador. El texto se convierte en identificadores numéricos que el modelo puede procesar.

Cada identificador se relaciona con un **embedding**, una representación numérica —un vector— que ayuda al modelo a calcular relaciones entre elementos. No es una definición de diccionario ni una etiqueta que una persona pueda leer directamente. Las capas posteriores transforman esas representaciones según el contexto. Por eso una misma palabra puede adquirir un papel distinto según la frase que la rodea.

La **atención** es un mecanismo que permite ponderar qué partes del contexto ayudan a procesar otras partes. En «Marta dejó el paraguas porque estaba mojado», un sistema puede relacionar «estaba mojado» con elementos anteriores, aunque la frase siga siendo ambigua para una persona. Atención no significa que el modelo mire con intención ni que explique por qué una respuesta es verdadera. Es una operación matemática dentro de una arquitectura.

Después, el modelo calcula continuaciones probables y produce una secuencia token a token, condicionada por la instrucción y el contexto disponible. La aplicación puede añadir reglas, filtros o herramientas externas. La fluidez depende de patrones aprendidos; no demuestra verificación, acceso a información reciente ni comprensión humana. Distintos modelos y productos pueden comportarse de manera diferente.

## Ejemplo concreto

Imagina una nota ficticia: «El taller empieza a las 10:00; trae un cuaderno». Preguntas «¿a qué hora empieza?». La respuesta puede ser breve porque la nota aporta contexto. Si preguntas quién impartirá el taller, el texto no lo indica: una continuación plausible no constituye evidencia. Un tokenizador puede dividir «10:00» de forma distinta a otro; eso no cambia el hecho, pero sí el modo interno de procesarlo.

## Práctica guiada — receta

1. Escribe una tarjeta ficticia con tres datos y una pregunta cuya respuesta no aparezca. Guarda una copia de la respuesta esperada antes de probar nada.
2. En Hugging Face, busca un modelo apropiado para texto y lee su ficha: tarea, datos o limitaciones que declara, licencia y disponibilidad actual. Usa una demostración interactiva solo si la propia página la ofrece y las condiciones te resultan aceptables; si no, observa la ficha sin enviar contenido.
3. Si tienes acceso a Google AI Studio, introduce la misma nota inventada y la misma pregunta. No añadas credenciales, archivos privados ni información real. Registra el nombre del modelo y la fecha que muestra la interfaz, porque las opciones pueden cambiar.
4. Compara respuestas con tres criterios escritos de antemano: conservar los hechos, no inventar la respuesta ausente y producir el formato solicitado. Una prueba con dos productos distintos es una observación, no un benchmark universal.
5. Para GitHub Models, consulta el aviso oficial de retirada: a fecha de esta lección, el servicio de modelos dejó de estar disponible el 30 de julio de 2026. Anota qué se retiró y no intentes usar una API o guía antigua. GitHub Models no es lo mismo que GitHub Copilot, y un producto retirado no ofrece un experimento en vivo.

Esta práctica no entrena un modelo. Enseña a distinguir conceptos internos, interfaz y acceso real a un servicio. Ninguno de los pasos necesita una clave de API ni un gasto deliberado.

## Validación y solución de problemas

Conserva la nota original y una tabla con pregunta, respuesta esperada, respuesta recibida y evidencia. Si falta un dato, cuenta como correcto que la herramienta diga «no consta». Repite una vez cambiando solo la forma de la pregunta. Si cambia el resultado, regístralo en vez de escoger la respuesta que más te guste. Los contadores de tokens y las opciones de ejecución no son comparables automáticamente entre proveedores: cada modelo puede tokenizar y configurar la generación de forma diferente.

## Errores frecuentes

- Creer que cada palabra equivale a un token o que un embedding es una explicación legible del significado.
- Imaginar la atención como conciencia o garantía de que se eligió la fuente correcta.
- Tratar una respuesta fluida como un dato contrastado.
- Seguir un tutorial antiguo de GitHub Models como si el servicio siguiera activo, o confundirlo con Copilot.
- Comparar productos sin guardar el modelo, la fecha, la entrada y el criterio de evaluación.

## En resumen

Tokens, embeddings y atención describen piezas del procesamiento, no una mente ni una prueba de verdad. Para observar generación, usa información inventada, criterios fijos y documentación vigente. Comprueba también si la herramienta existe y está disponible antes de seguir instrucciones antiguas.
