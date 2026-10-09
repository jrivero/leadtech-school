---
title: "A Simple RAG with Python and LangChain"
description: "Build a two-step retrieval flow with synthetic documents, cited context, and a source-limited answer; compare the search with a local fallback."
module: "09-de-tu-equipo-a-la-nube"
order: 5
duration: 45
level: "Intermediate"
objectives:
  - "Distinguish retrieval, context, and generation in a two-step RAG flow."
  - "Run a local lexical search with synthetic data and show the retrieved source."
  - "Recognize when context is insufficient and explain the limits of a deterministic fallback."
prerequisites:
  - "Python 3 available in a local terminal."
  - "Basic familiarity with Python functions, lists, and sets."
updatedDate: '2026-10-08'
sources:
  - label: "LangChain: official semantic search and RAG tutorials"
    url: "https://docs.langchain.com/oss/python/learn"
---

Imagine a support team receives questions about three internal procedures. Copying the entire manual into every query would be cumbersome; answering from memory alone can lead to invented details. Retrieval-augmented generation, or RAG, first searches for relevant passages and then uses them as context to draft an answer. It does not retrain the model: it supplies information at answer time.

## Retrieve before generating

In a **2-step RAG** flow, the application receives a question, retrieves a few passages, and only then sends them to the generator. The order is easy to inspect: you can review what entered the context before generation and limit the number of calls. It is useful when an answer must be traceable to documents.

In a real implementation, documents are split into passages with IDs and metadata. *Embeddings* help retrieve texts by meaning; a *retriever* selects candidates. The current LangChain guide includes semantic-search tutorials for PDFs and a RAG agent. Details depend on versions and providers.

Retrieval quality and answer quality are separate stages. If the correct passage is not among the top results, the generator cannot cite it; if it is present, the generator can still summarize it incorrectly. Keep synthetic questions with expected IDs and compare changes to `k` and `minimo` using the same corpus. This helps detect regressions before adding a model or real documents.

**Optional extension, not executable:** you would replace lexical search with a chain for loading, splitting, indexing, and retrieving passages, and then pass the context to a model. This is an outline, not copyable or verified code. It requires installing the components you choose and having local embeddings or a provider; the latter may need credentials or incur a cost. We do not use one here.

## Local activity

You will use three invented notes. In a terminal with Python 3, `python3 --version` displays the available version. Paste the entire block: `python3 -` reads from standard input, and `<<'PY' ... PY` delimits the text without creating files or calling services.

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


`DOCUMENTOS` stores the synthetic corpus and citation ID. `tokens` normalizes capitalization and removes common words. `recuperar` counts shared terms, applies the `minimo` threshold, sorts with a stable tie-breaker, and returns up to `k` passages. The score is lexical, not confidence or semantic understanding.

## Verification and outcome

The first query should retrieve `POL-01` and show that backups are reviewed every Friday. The ID lets you check the source: this is basic *grounding*, not a guarantee of truth or currency. The lunch question should abstain rather than invent a fact.

To evaluate, record the expected ID for each question and check whether it appears among the top `k`: a simple *recall@k*. Review failures and distinguish passage relevance, fidelity to context, and final correctness.

## Common errors and solutions

- **The expected document does not appear.** The count uses exact words (“copia” and “copias” may differ). Adjust the question or normalization; in an extension, compare embeddings and keep tests.
- **An irrelevant note appears.** Common words can bias the score. Filter terms or raise `minimo`, checking that you do not hide valid results. This score is not production confidence.
- **The answer adds unsupported facts.** This snippet is not an LLM. In an integration, request citations and abstention without evidence; validate every ID against the context.
- **Real documents contain sensitive data.** This activity uses fictional data only. Before indexing real sources, enforce per-user access and minimize the information included.

## Summary

RAG combines retrieval with generation, and a 2-step design makes the context visible before answering. Today you ran lexical retrieval and a deterministic extractive output; you did not run LangChain, embeddings, or an LLM. Citations, abstention, and retrieval tests are controls worth keeping as you expand the prototype.
