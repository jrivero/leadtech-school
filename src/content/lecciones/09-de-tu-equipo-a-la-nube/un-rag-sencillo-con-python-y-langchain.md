---
title: "Un RAG sencillo con Python y LangChain"
description: "Construye un flujo de recuperación en dos pasos con documentos sintéticos, contexto citado y una respuesta limitada a fuentes; compara la búsqueda con un fallback local."
module: "09-de-tu-equipo-a-la-nube"
order: 5
duration: 45
level: "Intermedio"
objectives:
  - "Distinguir recuperación, contexto y generación dentro de un flujo RAG de dos pasos."
  - "Ejecutar una búsqueda léxica local con datos sintéticos y mostrar la fuente recuperada."
  - "Detectar cuándo el contexto no basta y explicar los límites del fallback determinista."
prerequisites:
  - "Python 3 disponible en una terminal local."
  - "Nociones básicas de funciones, listas y conjuntos en Python."
updatedDate: '2026-10-08'
sources:
  - label: "LangChain: tutoriales oficiales de búsqueda semántica y RAG"
    url: "https://docs.langchain.com/oss/python/learn"
---

Imagina que un equipo de soporte recibe preguntas sobre tres procedimientos internos. Copiar el manual completo en cada consulta sería incómodo; contestar solo de memoria puede inventar detalles. La generación aumentada por recuperación, o RAG, busca primero fragmentos pertinentes y después los usa como contexto para redactar una respuesta. No vuelve a entrenar el modelo: aporta información en el momento de responder.

## Recuperar antes de generar

En un flujo **2-step RAG**, la aplicación recibe una pregunta, recupera unos pocos fragmentos y solo después los entrega al generador. El orden es fácil de inspeccionar: puedes revisar qué llegó al contexto antes de generar y limitar el número de llamadas. Es útil cuando la respuesta debe rastrearse a documentos.

En una implementación real, los documentos se dividen en fragmentos con IDs y metadatos. Los *embeddings* ayudan a recuperar textos por significado; un *retriever* selecciona candidatos. La guía actual de LangChain incluye tutoriales de búsqueda semántica sobre PDF y de un agente RAG. Los detalles dependen de versiones y proveedores.

Calidad de recuperación y calidad de respuesta son etapas distintas. Si el fragmento correcto no aparece entre los primeros resultados, el generador no puede citarlo; si aparece, aún puede resumirlo mal. Conserva preguntas sintéticas con IDs esperados y compara cambios de `k` y `minimo` usando el mismo corpus. Así detectas regresiones antes de añadir un modelo o documentos reales.

**Extensión opcional, no ejecutable:** sustituirías la búsqueda léxica por una cadena de carga, división, indexación y recuperación de fragmentos, y después pasarías el contexto a un modelo. Es un esquema, no código copiable ni verificado. Requiere instalar los componentes elegidos y disponer de embeddings locales o un proveedor; este último puede necesitar credenciales o tener coste. Aquí no lo usamos.

## Actividad local

Usarás tres notas inventadas. En una terminal con Python 3, `python3 --version` muestra la versión disponible. Pega el bloque completo: `python3 -` lee desde la entrada estándar y `<<'PY' ... PY` delimita el texto sin crear archivos ni llamar a servicios.

```sh
python3 - <<'PY'
import re

DOCUMENTOS = (
    ("POL-01", "Las copias de seguridad se revisan cada viernes y se conservan treinta días."),
    ("RUN-02", "El equipo reinicia el servicio solo después de revisar su estado."),
    ("CAT-03", "El catálogo de demostración se actualiza los lunes a las ocho."),
)
OMITIR = {"a", "al", "cada", "de", "del", "el", "la", "las", "los", "se", "y", "cuándo"}

def tokens(texto):
    return {palabra for palabra in re.findall(r"\w+", texto.casefold()) if palabra not in OMITIR}

def recuperar(pregunta, k=2, minimo=2):
    consulta = tokens(pregunta)
    ranking = []
    for identificador, texto in DOCUMENTOS:
        coincidencias = len(consulta & tokens(texto))
        if coincidencias >= minimo:
            ranking.append((coincidencias, identificador, texto))
    ranking.sort(key=lambda fila: (-fila[0], fila[1]))
    return ranking[:k]

for pregunta in ("¿Cuándo revisan copias de seguridad?", "¿Cuál es el precio del almuerzo?"):
    resultados = recuperar(pregunta)
    print(f"\nPregunta: {pregunta}")
    if not resultados:
        print("No hay contexto suficiente; abstenerse de responder.")
        continue
    print("Fragmento de respuesta extractiva (no es un LLM):")
    for puntos, identificador, texto in resultados:
        print(f"[{identificador}] {texto} (coincidencias: {puntos})")
PY
```

`DOCUMENTOS` guarda el corpus sintético y el ID de cita. `tokens` normaliza mayúsculas y descarta palabras frecuentes. `recuperar` cuenta términos compartidos, aplica el umbral `minimo`, ordena con desempate estable y devuelve hasta `k` fragmentos. La puntuación es léxica, no confianza ni comprensión semántica.

## Verificación y resultado

La primera consulta debe recuperar `POL-01` y mostrar que las copias se revisan cada viernes. El ID permite comprobar la fuente: es *grounding* básico, no garantía de verdad o vigencia. La pregunta del almuerzo debe abstenerse, no inventar un dato.

Para evaluar, anota el ID esperado para cada pregunta y comprueba si aparece entre los `k` primeros: un *recall@k* sencillo. Revisa los fallos y separa relevancia de fragmentos, fidelidad al contexto y corrección final.

## Errores habituales y soluciones

- **No aparece el documento esperado.** El conteo usa palabras exactas (“copia” y “copias” pueden diferir). Ajusta pregunta o normalización; en una extensión, compara embeddings y conserva pruebas.
- **Aparece una nota irrelevante.** Palabras comunes sesgan la puntuación. Filtra términos o eleva `minimo`, comprobando que no ocultes resultados válidos. Esa puntuación no es confianza de producción.
- **La respuesta añade datos ausentes.** Este fragmento no es un LLM. En una integración, pide citas y abstención sin evidencia; valida cada ID contra el contexto.
- **Los documentos reales contienen datos sensibles.** Aquí solo hay datos ficticios. Antes de indexar fuentes reales, aplica acceso por usuario y minimiza la información incluida.

## Resumen

RAG combina recuperación con generación, y el diseño 2-step hace visible el contexto antes de responder. Hoy ejecutaste una recuperación léxica y una salida extractiva determinista; no ejecutaste LangChain, embeddings ni un LLM. Las citas, la abstención y las pruebas de recuperación son controles que conviene mantener al ampliar el prototipo.
