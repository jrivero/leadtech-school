---
title: "Frameworks, RAG y ajuste de modelos"
description: "Distingue frameworks, RAG y fine-tuning, explora LlamaIndex con documentos ficticios y elige una prueba mínima antes de sumar infraestructura."
module: "05-entender-la-inteligencia-artificial"
order: 4
duration: 35
level: "Inicial"
objectives:
  - "Describir qué piezas puede coordinar un framework de aplicaciones con modelos de lenguaje."
  - "Comparar recuperación RAG y ajuste fino según el problema y la evidencia disponible."
  - "Diseñar una evaluación pequeña de recuperación, fidelidad y abstención con datos inventados."
prerequisites:
  - "como-funciona-la-ia-generativa"
updatedDate: '2026-10-08'
sources:
  - label: "LlamaIndex: documentación oficial sobre RAG"
    url: "https://developers.llamaindex.ai/python/framework/understanding/rag/"
  - label: "OpenAI Platform: estado de la plataforma de fine-tuning"
    url: "https://platform.openai.com/pricing"
  - label: "OpenAI: optimización y ajuste de modelos"
    url: "https://developers.openai.com/api/docs/guides/model-optimization"
  - label: "NIST: perfil de riesgos de IA generativa"
    url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf"
---

## Idea central — explicación conceptual

Un **framework** reúne piezas que una aplicación puede necesitar: conectores, instrucciones, recuperación, herramientas y formato de salida. **LlamaIndex** es uno de los proyectos que documenta cómo conectar datos y modelos para construir aplicaciones, incluida la recuperación aumentada. Un framework ahorra código repetitivo y ofrece convenciones, pero añade configuración y dependencias. No mejora por sí solo la calidad de tus documentos ni obliga al modelo a responder con verdad.

**RAG** —generación aumentada por recuperación— busca fragmentos relevantes de una colección y los añade como contexto al pedido enviado al modelo. Para que funcione, hay que preparar documentos, dividirlos en partes útiles, indexarlos y recuperar evidencia apropiada para cada pregunta. Las representaciones vectoriales pueden ayudar a buscar por similitud, pero una similitud alta no demuestra que un fragmento respalde una afirmación. RAG puede recuperar mal, omitir una excepción o presentar una respuesta sin citar el documento correcto.

El **fine-tuning** o ajuste fino modifica parámetros del modelo usando ejemplos para mejorar un patrón de respuesta, formato o tarea. No es una forma general de actualizar hechos que cambian cada día ni un mecanismo que garantice veracidad. Requiere datos representativos, controles de calidad y evaluación con ejemplos que no se usaron durante el ajuste. Para información cambiante, recuperar documentos vigentes suele ser más fácil de actualizar que volver a preparar un conjunto de entrenamiento.

Estas técnicas resuelven problemas distintos y pueden combinarse, pero no son el primer paso obligatorio. Además, la disponibilidad depende del proveedor: en la fecha de revisión, OpenAI indica que su plataforma de fine-tuning está en proceso de retirada y no incorpora nuevos usuarios. Esto no significa que el concepto haya desaparecido de toda la industria; demuestra que no se debe prometer acceso a una función concreta sin comprobar su estado actual.

## Ejemplo concreto

Una biblioteca inventada publica reglas de préstamo que cambian cada mes. Si el asistente debe contestar «¿cuántos libros puedo pedir ahora?», RAG puede recuperar el párrafo vigente y mostrarlo como evidencia. Si una respuesta necesita siempre el mismo tono y estructura, algunos ejemplos podrían ayudar a definir o evaluar ese estilo; ajustar el modelo no es una forma fiable de memorizar el reglamento nuevo. Si la búsqueda trae un párrafo antiguo, una respuesta fluida no corrige el índice desactualizado.

## Práctica guiada — receta

1. Escribe dos páginas ficticias: una política y un calendario. Incluye cinco hechos comprobables, una excepción y una pregunta cuya respuesta no aparezca.
2. Prepara seis preguntas y sus respuestas esperadas antes de consultar nada. Etiqueta cada una como respondible, ambigua o ausente.
3. Simula un RAG manual: para cada pregunta, selecciona el fragmento que serviría de contexto. Si exploras LlamaIndex, sigue la documentación oficial actual y usa exclusivamente estos documentos inventados; no instales componentes ni ejecutes servicios para completar la práctica conceptual.
4. Puntúa por separado si se recuperó el fragmento correcto, si la respuesta lo representa fielmente y si el sistema se abstiene cuando falta evidencia.
5. Describe un posible objetivo de fine-tuning con dos ejemplos sintéticos, como devolver siempre una tabla de tres columnas. No entrenes ni envíes datos a un servicio. Compara esa necesidad de formato con una instrucción sencilla antes de proponer un ajuste.

## Validación y solución de problemas

Reserva preguntas nuevas para una comprobación posterior. Si RAG trae un texto irrelevante, revisa primero la división, las etiquetas y la colección; cambiar de modelo puede ocultar el problema sin resolverlo. Si la respuesta cita una frase que no respalda la conclusión, cuenta como fallo. Si un ajuste funciona con ejemplos conocidos y falla con otros, aumenta la variedad representativa y revisa si la tarea está mal definida. Empieza con una línea base simple y añade una pieza solo cuando reduzca un error observable.

## Errores frecuentes

- Elegir un framework por popularidad antes de saber qué tarea resolverá.
- Confundir similitud vectorial con evidencia suficiente o RAG con una garantía factual.
- Usar fine-tuning como base de datos de hechos que cambian con frecuencia.
- Medir solo respuestas conocidas y no probar preguntas ambiguas o sin respuesta.
- Suponer que una función documentada está disponible en cada cuenta o proveedor.

## En resumen

Framework, recuperación y ajuste fino son herramientas diferentes. Define primero el error, el conjunto de prueba y la evidencia necesaria. LlamaIndex puede ayudar a coordinar una solución con documentos, pero el sistema completo aún necesita fuentes actuales, medidas y revisión humana. Empieza pequeño y confirma disponibilidad antes de adoptar una función.
