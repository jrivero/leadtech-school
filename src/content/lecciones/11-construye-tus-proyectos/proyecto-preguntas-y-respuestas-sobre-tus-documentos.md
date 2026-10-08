---
title: "Proyecto: preguntas y respuestas sobre tus documentos"
description: "Diseña una demo local que recupera pasajes de documentos, muestra evidencias y distingue una respuesta extractiva de una respuesta generada por un modelo."
module: "11-construye-tus-proyectos"
order: 4
duration: 90
level: "Intermedio"
objectives:
  - "Separar la recuperación de fragmentos de la generación de una respuesta."
  - "Construir una búsqueda local sencilla y mostrar la procedencia de cada resultado."
  - "Evaluar preguntas respondibles y abstenciones con criterios verificables."
prerequisites:
  - "Manejo básico de archivos y funciones en Python."
  - "Saber ejecutar un programa desde la terminal."
updatedDate: '2026-10-08'
sources:
  - label: "Artículo original de RAG, actas de NeurIPS (2020)"
    url: "https://proceedings.neurips.cc/paper/2020/hash/6b493230-Abstract.html"
  - label: "Documentación de la biblioteca estándar de Python"
    url: "https://docs.python.org/3/library/index.html"
  - label: "Ollama: ejecutar un modelo local y enviar una petición de chat"
    url: "https://docs.ollama.com/quickstart"
---

## Brief del proyecto

Esta práctica continúa el trabajo de requisitos y fundamentos: no basta con pedir “una IA que sepa mis documentos”; defines qué preguntas cubre, qué evidencia debe mostrar y cuándo se abstiene. El proyecto conecta implementación con calidad y seguridad mediante una colección local, datos no sensibles y una evaluación repetible que también puedes documentar en tu portafolio.

Construye una pequeña herramienta que permita hacer preguntas sobre un conjunto acotado de documentos y devuelva pasajes relevantes con el nombre del archivo. El propósito no es crear un producto listo para clientes, sino comprobar de manera visible qué datos encuentra el sistema y qué puede afirmar con ellos.

RAG significa generación aumentada por recuperación. En un sistema RAG hay dos tareas distintas: un recuperador localiza fragmentos útiles en una colección y un generador usa esos fragmentos y la pregunta para redactar una respuesta. La recuperación selecciona evidencia; la generación crea una formulación nueva. Si tu programa solo ordena fragmentos y los imprime, has demostrado búsqueda y recuperación, no generación mediante un modelo. Esa distinción evita presentar una búsqueda sencilla como si fuera un asistente generativo.

## Alcance mínimo

Trabaja con tres a cinco documentos de texto o Markdown, públicos o inventados para el ejercicio. Admite solo esos formatos; deja fuera PDF, usuarios, permisos, despliegue, internet y bases de datos externas. Divide los textos en párrafos o bloques breves, conserva el nombre de archivo y calcula cuáles se parecen más a la consulta. La primera versión puede puntuar coincidencias de palabras con una fórmula sencilla, como TF-IDF, sin instalar paquetes ni crear una clave de API.

La respuesta inicial debe mostrar hasta tres fragmentos literales, su archivo y un aviso cuando no haya evidencia suficiente. Es una demo extractiva: no resume, no deduce y no inventa una frase nueva. Puedes ejecutar el prototipo desde la terminal con una consulta como `python3 consulta.py "¿Qué plazo indica el documento?"`.

## Plan paso a paso

1. **Prepara datos seguros.** Crea una carpeta `documentos/` con textos breves de ejemplo. No uses historiales de clientes, contratos reales ni información personal.
2. **Define el formato de fragmento.** Para cada bloque guarda texto, archivo de origen e índice. Usa bloques pequeños que mantengan juntas una idea y su contexto; prueba dos tamaños en lugar de asumir que existe uno perfecto.
3. **Implementa la recuperación.** Con la biblioteca estándar de Python, lee archivos, normaliza mayúsculas y signos, tokeniza y calcula una puntuación entre cada fragmento y la consulta. Ordena los resultados y descarta coincidencias vacías.
4. **Expón evidencia.** Imprime el fragmento, el nombre del archivo y una puntuación comprensible. Añade un umbral mínimo configurable: cuando nada lo supera, responde que no hay datos suficientes.
5. **Prueba casos variados.** Escribe al menos cinco preguntas cuya respuesta esté en los documentos y tres que no puedan contestarse. Registra qué fragmento debería aparecer y qué ocurrió.
6. **Documenta cómo repetirlo.** En un `README`, indica versión de Python, estructura esperada, comando de ejecución, limitaciones y ejemplos de consultas.

## Entregables y aceptación

Entrega `consulta.py`, la carpeta con documentos de prueba, `README` y una tabla de evaluación con pregunta, evidencia esperada, resultado recuperado y veredicto. La práctica se acepta si funciona sin conexión ni claves, muestra una fuente para cada resultado, encuentra evidencia pertinente en los casos positivos y se abstiene en los negativos. Comprueba también una carpeta vacía y una pregunta formada solo por espacios; ninguna debe provocar un error ni producir una respuesta engañosa.

## Solución orientativa y errores frecuentes

Una solución clara puede separar cuatro funciones: leer archivos, dividir textos, puntuar y presentar resultados. Para puntuar, compara los términos de la pregunta con cada fragmento y reduce el peso de palabras que aparecen en todos los documentos. Conserva siempre la referencia original junto al texto; no intentes reconstruirla después de ordenar. Si el resultado solo muestra pasajes, descríbelo como recuperación extractiva.

Como ampliación opcional, añade un modelo que se ejecute en tu equipo con Ollama: primero recupera los fragmentos y luego envía únicamente esos fragmentos y la pregunta al endpoint local `http://localhost:11434/api/chat`. En la instrucción, pide responder solo con el contexto y reconocer cuando falte evidencia; muestra las fuentes al lado de la respuesta. Esa segunda etapa sí incorpora generación, aunque puede equivocarse y necesita evaluación propia. No uses un endpoint remoto ni una API de pago para este ejercicio; antes de descargar un modelo, revisa su licencia y si tu equipo puede ejecutarlo.

Errores típicos: fragmentos enormes que mezclan temas, confundir una puntuación alta con certeza, omitir la fuente, no probar consultas sin respuesta y enviar datos privados a un servicio externo. Mantén una pequeña colección y mide primero la recuperación: un generador no arregla evidencia irrelevante.
