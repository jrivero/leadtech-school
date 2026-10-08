---
title: "Ejecutar modelos en tu propio equipo"
description: "Prueba un modelo local con datos inventados y distingue inferencia local de servicios en la nube; revisa rendimiento, licencia y tratamiento de datos."
module: "06-tu-caja-de-herramientas-ia"
order: 11
duration: 30
level: "Inicial"
objectives:
  - "Explicar qué significa ejecutar inferencia local y qué no garantiza sobre privacidad."
  - "Elegir una tarea pequeña y sintética para evaluar un modelo disponible en el equipo."
  - "Comprobar resultado, recursos, licencia y ruta de datos antes de un uso más amplio."
prerequisites:
  - "como-funciona-la-ia-generativa"
  - "privacidad-sesgos-y-uso-responsable"
updatedDate: '2026-10-08'
sources:
  - label: "Ollama: política de privacidad y tratamiento local/nube"
    url: "https://ollama.com/privacy"
  - label: "Ollama: información sobre modelos en la nube"
    url: "https://registry.ollama.com/blog/cloud-models"
  - label: "Hugging Face: documentación de modelos y licencias"
    url: "https://huggingface.co/docs/hub/model-cards"
---

## Idea central — explicación conceptual

Ejecutar un modelo **localmente** significa que una parte de la inferencia se procesa en tu propio equipo, en vez de enviar cada prompt a un servicio remoto. Ollama ofrece opciones locales y también modelos en la nube; el nombre de la aplicación no basta para saber qué ruta usa una sesión. Antes de probar, comprueba en la interfaz y en la documentación si elegiste un modelo local o un servicio remoto. No trates la ejecución local como garantía automática de privacidad.

Hay otras piezas que pueden transmitir datos: una interfaz de terceros, extensiones, registros, sincronización, herramientas conectadas o código que envía información fuera. Un ordenador compartido también puede guardar historiales. Si necesitas proteger información real, revisa el recorrido completo y las reglas de tu organización, no solo dónde se calcula la respuesta.

La ejecución local aporta aprendizaje sobre latencia, capacidad y límites del hardware, pero no implica que cualquier modelo funcione bien en cualquier equipo. El tamaño, la memoria, la velocidad, la licencia y la calidad varían. Lee la ficha oficial del modelo y la licencia antes de usarlo o distribuir resultados. Para una práctica inicial no necesitas elegir el «mejor» modelo ni instalar todo el catálogo: utiliza uno que ya esté disponible y una tarea de bajo riesgo.

La misma respuesta debe evaluarse con el mismo criterio que una salida en la nube: exactitud respecto a la fuente, casos sin respuesta, consistencia y errores. Un resultado puede parecer menos fluido y ser más fiel, o sonar convincente e inventar. Registra las condiciones de prueba y no uses el modelo local para tomar decisiones importantes solo porque el archivo no salió del equipo.

## Ejemplo concreto

Tienes una ficha ficticia con tres normas para una sala de estudio. Pides resumirlas en una lista sin añadir reglas. La respuesta debe conservar horario, aforo y una excepción. Si la herramienta seleccionada es local, esa prueba ayuda a observar capacidad y recursos sin datos reales. Si aparece una opción de nube, no envíes la ficha hasta confirmar que quieres usar ese servicio y que sus condiciones son aceptables.

## Práctica guiada — receta

1. Abre la documentación oficial de Ollama y confirma si el modelo que aparece en tu entorno se identifica como local o como nube. Si no puedes confirmarlo, no envíes contenido que necesite protección.
2. Usa una ficha inventada con tres datos y una pregunta sin respuesta. Define la salida correcta antes de probar.
3. Selecciona un modelo que ya esté disponible localmente, si lo tienes. No descargues ni instales componentes solo para completar este ejercicio; revisa la ficha y licencia del modelo elegido.
4. Pide un resumen limitado a la ficha y una abstención cuando falte información. Comprueba cada punto y la pregunta no respondible.
5. Anota el tiempo aproximado, si el equipo pudo terminar y qué errores observaste. Repite una vez una condición —por ejemplo, un prompt más breve— sin cambiar a la vez la fuente y el criterio.

No incluyas documentos privados, credenciales ni código de empresa. Si no tienes un modelo local, realiza el análisis con respuestas ficticias y no asumas que la versión en nube equivale a una prueba local.

## Validación y solución de problemas

Verifica la respuesta contra la ficha original y registra omisiones, invenciones y abstenciones correctas. Si el equipo se queda sin recursos, reduce la longitud de la entrada o elige una opción ya presente que la documentación describa como compatible; no cambies parámetros al azar. Si no está claro dónde se procesa el prompt, pausa la prueba y consulta la política oficial o la configuración del entorno.

## Errores frecuentes

- Suponer que instalar un ejecutor local vuelve privadas todas las funciones conectadas.
- Confundir modelos locales y de nube porque aparecen en la misma interfaz.
- Elegir una opción solo por tamaño o velocidad sin leer su licencia y ficha.
- Evaluar por tono fluido y no por fidelidad a una fuente conocida.
- Instalar herramientas o modelos nuevos sin revisar permisos, espacio y procedencia.

## En resumen

Un modelo local permite aprender sobre inferencia en el equipo, pero no resuelve por sí solo privacidad, licencias ni calidad. Comprueba la ruta de datos, utiliza ejemplos inventados y mide con una fuente de verdad. Si el modo de ejecución no está claro, no envíes datos reales.
