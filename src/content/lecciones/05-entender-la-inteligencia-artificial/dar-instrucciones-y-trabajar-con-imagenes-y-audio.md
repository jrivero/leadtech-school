---
title: "Dar instrucciones y trabajar con imágenes y audio"
description: "Estructura prompts comprobables para texto, imágenes y audio; prueba una transcripción tipo Whisper y una opción visual sin exponer datos reales."
module: "05-entender-la-inteligencia-artificial"
order: 3
duration: 35
level: "Inicial"
objectives:
  - "Redactar instrucciones que separen tarea, contexto, límites, formato y tratamiento de la incertidumbre."
  - "Reconocer errores posibles al analizar imágenes, generar contenido visual o transcribir audio."
  - "Evaluar una salida multimodal contra su material original y proteger datos y derechos."
prerequisites:
  - "como-funciona-la-ia-generativa"
updatedDate: '2026-10-08'
sources:
  - label: "OpenAI: guía de transcripción de audio"
    url: "https://developers.openai.com/api/docs/guides/transcription"
  - label: "OpenAI: imágenes y visión"
    url: "https://developers.openai.com/api/docs/guides/images-vision"
  - label: "Magnific, antes Freepik: documentación oficial de IA"
    url: "https://www.freepik.com/ai/docs"
---

## Idea central — explicación conceptual

Una instrucción útil especifica cinco cosas: la tarea, el contexto necesario, los límites, el formato esperado y qué hacer si falta información. «Extrae el nombre y la hora de este cartel ficticio; devuelve una tabla; escribe “ilegible” si no puedes distinguir un dato» se puede comprobar mejor que «mira esto». Una instrucción detallada reduce ambigüedad, pero no convierte la respuesta en una medición exacta ni corrige una entrada que no contiene la información.

En **multimodalidad**, una aplicación puede recibir texto, imagen o audio, y algunas combinan más de un tipo de entrada. El tratamiento depende del modelo y del producto concreto. Una imagen borrosa, rotada o con letra pequeña puede dar lugar a una lectura errónea. El audio con ruido, acentos, varias voces o nombres propios puede producir una transcripción incompleta. La generación de una imagen es otra tarea distinta de describir una imagen existente: no uses el resultado generado como evidencia de lo que había en una fotografía.

Whisper es el nombre conocido de una tecnología de reconocimiento de voz de OpenAI, y la documentación oficial de transcripción describe opciones de modelos y salidas que pueden variar con el tiempo. Una transcripción puede servir como borrador, subtítulo o índice para buscar momentos; no demuestra que cada palabra sea correcta. Para datos críticos —por ejemplo, una cantidad, una cita o una indicación médica— verifica la grabación original y usa un procedimiento apropiado.

La referencia histórica menciona Freepik. Sus páginas oficiales presentan actualmente la marca de IA como **Magnific**; no asumas que el nombre, las funciones, las condiciones de acceso o la disponibilidad son iguales a los de un tutorial antiguo. En cualquier generador visual, revisa las condiciones actuales y los derechos sobre el material que introduzcas o publiques. No subas rostros de otras personas, documentos ni contenido de trabajo sin permiso.

## Ejemplo concreto

Prepara un cartel inventado con dos actividades y sus horarios, y una nota de voz tuya que los lee. La tarea no es «entender el evento», sino obtener cuatro campos específicos. Si el sistema convierte «16:15» en «16:50», la frase puede seguir sonando convincente; la fuente de verdad continúa siendo el cartel y la grabación. Si generas una imagen de un cartel nuevo en Magnific, comprueba manualmente que el texto salga legible: los generadores visuales pueden deformar letras.

## Práctica guiada — receta

1. Dibuja una tarjeta con datos inventados y graba tu propia voz leyéndola. No uses voces de terceros ni materiales de una organización.
2. Escribe el prompt con tarea, campos, formato y regla de abstención: pide «no consta» o «no legible» en lugar de adivinar.
3. Si dispones de una función de análisis de imagen, envía la tarjeta ficticia. Si tienes acceso a una herramienta de transcripción compatible con Whisper, procesa la grabación por separado. Comprueba en la documentación actual qué opciones admite la herramienta concreta; no copies parámetros o código de un tutorial desactualizado.
4. Para explorar generación visual, describe una imagen original sencilla —por ejemplo, una ilustración de una biblioteca vacía— en Magnific si la función está disponible. No pidas una persona real ni una marca ajena.
5. Compara cada dato transcrito con el audio y cada lectura visual con el cartel. Anota aciertos, omisiones y casos ambiguos; no elijas silenciosamente la interpretación más conveniente.

Es una receta de evaluación sin API. Si no tienes acceso a esas funciones, puedes preparar las entradas, escribir respuestas de ejemplo y practicar la comprobación manual. No generes una cuenta, clave o suscripción solo para terminar el ejercicio.

## Validación y solución de problemas

Comprueba cada campo frente a una parte identificable de la fuente: una línea del cartel o un momento de la grabación. Si falla, examina primero el ruido, el encuadre, la resolución, el idioma y la claridad del prompt. Repite la prueba cambiando una sola condición. Si el dato sigue siendo ambiguo, conserva la duda en la salida. Antes de enviar contenido, verifica si el procesamiento es remoto o local y si tienes autorización para compartirlo.

## Errores frecuentes

- Confundir una instrucción clara con una garantía de exactitud.
- Tratar una transcripción automática como registro literal sin revisarla.
- Usar un generador de imágenes para reproducir texto pequeño y asumir que lo escribirá bien.
- Seguir un tutorial que llama Freepik a una función actual sin comprobar su nombre y condiciones.
- Subir imágenes, audio, voces o documentos reales por comodidad.

## En resumen

Define la tarea y el formato, marca cómo debe señalarse la incertidumbre y conserva el original como evidencia. Whisper y Magnific pueden servir para explorar tareas de audio e imagen, pero sus funciones y acceso deben confirmarse en documentación vigente. La validación humana y el permiso para usar el material siguen siendo parte del trabajo.
