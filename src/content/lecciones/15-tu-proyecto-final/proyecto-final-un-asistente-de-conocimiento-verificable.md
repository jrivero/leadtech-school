---
title: "Proyecto final: un asistente de conocimiento verificable"
description: "Construye un prototipo local que responda con extractos y referencias a tus documentos, se abstenga sin evidencia y se evalúe con hitos y rúbrica, sin llamadas a servicios de pago."
module: "15-tu-proyecto-final"
order: 1
duration: 150
level: "Intermedio"
objectives:
  - "Definir alcance y requisitos verificables para un asistente de conocimiento local."
  - "Construir búsqueda extractiva con citas al archivo y párrafo y una respuesta de abstención."
  - "Evaluar el prototipo con preguntas de prueba, una rúbrica y documentación reproducible."
prerequisites:
  - "Python básico, requisitos verificables, funciones y pruebas unitarias introductorias"
updatedDate: "2026-10-09"
sources:
  - label: "Documentación oficial de Python: pathlib"
    url: "https://docs.python.org/3/library/pathlib.html"
  - label: "Documentación oficial de Python: unittest"
    url: "https://docs.python.org/3/library/unittest.html"
---

## Un proyecto final pequeño, verificable y local

El objetivo es construir un asistente de conocimiento que responda preguntas sobre un conjunto pequeño de documentos Markdown y muestre de dónde procede cada respuesta. Para evitar coste de API, el prototipo no llama a servicios externos ni genera texto con un modelo: busca párrafos locales por coincidencia de palabras, devuelve un extracto literal con nombre de archivo y número de párrafo, y se abstiene si no encuentra evidencia. Es una base extractiva, no un chatbot generativo; esa limitación es parte de la documentación y de la evaluación.

Usa tres documentos breves que hayas escrito tú o que tengas derecho a reutilizar, con afirmaciones sencillas y conocidas. Un contrato mínimo podría decir: dada una pregunta sobre una regla presente, la salida contiene el párrafo fuente correcto; si ninguna fuente habla del tema, devuelve «No encuentro evidencia suficiente». Ninguna respuesta debe aparecer sin referencia. Mantén el alcance en lectura local, sin cuentas, analítica, carga de documentos de terceros ni conexión a Internet.

## Un núcleo técnico que puedes comprobar

`pathlib.Path` permite recorrer archivos del directorio autorizado; `re` puede separar términos sencillos. Este fragmento ilustra una búsqueda inicial, no un recuperador lingüístico completo:

```python
from pathlib import Path
import re

OMITIR = {
    "que", "qué", "cuando", "cuándo", "los", "las", "del", "de", "la", "el",
    "a", "an", "the", "and", "or", "of", "to", "in", "on", "is", "are",
    "was", "were", "be", "when", "which", "what", "how", "does", "do", "did",
}

def tokens(texto):
    return {t for t in re.findall(r"\w+", texto.casefold()) if t not in OMITIR}

def buscar(pregunta, carpeta):
    consulta = tokens(pregunta)
    hallazgos = []
    for archivo in sorted(Path(carpeta).glob("*.md")):
        for numero, parrafo in enumerate(archivo.read_text(encoding="utf-8").split("\n\n"), 1):
            texto = parrafo.strip()
            puntos = len(consulta & tokens(texto))
            if texto and puntos:
                hallazgos.append((puntos, archivo.name, numero, texto))
    return sorted(hallazgos, key=lambda h: (-h[0], h[1], h[2]))[:3]
```

La respuesta puede citar el primer resultado literal; si `buscar` devuelve una lista vacía, abstente. En un ejemplo, `biblioteca.md` contiene «Los préstamos vencen catorce días después de su creación». Pregunta «¿Cuándo vencen los préstamos?» y valida que el extracto incluya esa frase y la referencia `biblioteca.md, párrafo 1`. Pregunta después «¿Qué formato de imagen acepta el sistema?» si ningún documento lo explica; el resultado correcto es no inventar una respuesta. La lista `OMITIR` filtra algunas palabras frecuentes en español e inglés para evitar coincidencias basadas únicamente en artículos como «the». Es una lista pequeña, no un analizador lingüístico completo. Añade una prueba con un documento no relacionado y una pregunta que solo comparta palabras frecuentes. La coincidencia por palabras es deliberadamente sencilla y puede perder sinónimos o devolver coincidencias irrelevantes; inspecciona los extractos y registra esas limitaciones, no las ocultes.

## Hitos de entrega

1. **Alcance:** define usuario, tres preguntas soportadas, una que deba rechazarse, documentos permitidos y exclusiones.
2. **Fuentes:** crea documentos de prueba controlados y numera los párrafos de forma reproducible.
3. **Búsqueda:** implementa lectura local, ranking determinista y referencia de procedencia.
4. **Abstención y pruebas:** añade casos con respuesta, sin respuesta, consulta vacía y archivo sin párrafos útiles.
5. **Entrega:** incluye instrucciones para ejecutar, limitaciones, decisiones de privacidad y una demostración grabada o capturas sin datos sensibles.

Ejecuta las pruebas con `python -m unittest`. Guarda un conjunto de al menos ocho preguntas con resultado esperado; verifica que añadir o editar un documento cambia solo las respuestas justificadas por ese documento. No necesitas tokens, clave API, proveedor externo ni servicio de pago para mostrar este prototipo.

## Rúbrica de evaluación — 100 puntos

- **Fidelidad y referencias, 30:** cada respuesta se puede rastrear a un párrafo real; no se atribuyen hechos ausentes.
- **Pruebas y robustez, 25:** cubre preguntas contestables, no contestables, vacías y límites; todas se ejecutan localmente.
- **Privacidad y seguridad, 15:** usa datos propios o autorizados, limita el directorio leído y no imprime secretos.
- **Experiencia y abstención, 15:** explica qué encontró, presenta la fuente y reconoce cuando no sabe.
- **Reproducibilidad y documentación, 15:** otra persona puede instalar solo Python estándar, ejecutar pruebas y comprender las limitaciones.

Una meta de aprobación del proyecto puede ser 80/100, siempre que fidelidad y pruebas no queden por debajo de la mitad de sus puntos. Es una rúbrica de aprendizaje propia, no una calificación oficial ni una credencial.

## Resumen

Entrega un flujo que busca, cita y sabe abstenerse. Demuestra el comportamiento con preguntas conocidas, casos negativos y pruebas repetibles. El prototipo no finge comprender ni requiere API: produce evidencia local que una persona puede inspeccionar y usar para decidir qué construir después.
