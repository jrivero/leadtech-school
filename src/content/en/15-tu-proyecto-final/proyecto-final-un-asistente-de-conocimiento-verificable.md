---
title: "Final Project: A Verifiable Knowledge Assistant"
description: "Build a local prototype that answers with excerpts and references to your documents, abstains without evidence, and is evaluated with milestones and a rubric—without paid-service calls."
module: "15-tu-proyecto-final"
order: 1
duration: 150
level: "Intermediate"
objectives:
  - "Define scope and verifiable requirements for a local knowledge assistant."
  - "Build extractive search with citations to the file and paragraph, plus an abstention response."
  - "Evaluate the prototype with test questions, a rubric, and reproducible documentation."
prerequisites:
  - "Basic Python, verifiable requirements, functions, and introductory unit testing."
updatedDate: "2026-10-09"
sources:
  - label: "Official Python documentation: pathlib"
    url: "https://docs.python.org/3/library/pathlib.html"
  - label: "Official Python documentation: unittest"
    url: "https://docs.python.org/3/library/unittest.html"
---

## A small, verifiable, local final project

The goal is to build a knowledge assistant that answers questions about a small set of Markdown documents and shows where each answer came from. To avoid API costs, the prototype does not call external services or generate text with a model: it searches local paragraphs by matching words, returns a literal excerpt with the file name and paragraph number, and abstains if it finds no evidence. This is an extractive foundation, not a generative chatbot; that limitation is part of the documentation and evaluation.

Use three short documents you wrote yourself or have the right to reuse, with simple, known statements. A minimal contract could say: given a question about a rule that is present, the output contains the correct source paragraph; if no source covers the topic, return “I cannot find sufficient evidence.” No answer should appear without a reference. Keep the scope to local reading, with no accounts, analytics, third-party document uploads, or internet connection.

## A technical core you can check

`pathlib.Path` lets you traverse files in the authorized directory; `re` can split simple terms. This snippet illustrates an initial search, not a complete linguistic retriever:

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

The response can cite the first result verbatim; if `buscar` returns an empty list, abstain. In one example, `biblioteca.md` contains “Loans are due fourteen days after they are created.” Ask “When are loans due?” and check that the excerpt includes that sentence and the reference `biblioteca.md, paragraph 1`. Then ask “Which image format does the system accept?” if no document explains that; the correct result is not to invent an answer. The `OMITIR` list filters some common Spanish and English words to avoid matches based only on articles such as “the”. It is a small list, not a complete linguistic analyzer. Add a test with an unrelated document and a question that shares only common words. Word matching is deliberately simple and may miss synonyms or return irrelevant matches; inspect excerpts and record those limitations rather than hiding them.

## Delivery milestones

1. **Scope:** define the user, three supported questions, one question to reject, allowed documents, and exclusions.
2. **Sources:** create controlled test documents and number paragraphs reproducibly.
3. **Search:** implement local reading, deterministic ranking, and a provenance reference.
4. **Abstention and tests:** add cases with an answer, without an answer, an empty query, and a file with no useful paragraphs.
5. **Delivery:** include run instructions, limitations, privacy decisions, and a recorded demo or screenshots without sensitive data.

Run the tests with `python -m unittest`. Save a set of at least eight questions with expected results; verify that adding or editing a document changes only the answers justified by that document. You do not need tokens, an API key, an external provider, or a paid service to show this prototype.

## Evaluation rubric — 100 points

- **Faithfulness and references, 30:** every answer can be traced to a real paragraph; no absent facts are attributed to the source.
- **Testing and robustness, 25:** covers answerable, unanswerable, empty, and boundary questions; all tests run locally.
- **Privacy and security, 15:** uses owned or authorized data, limits the directory read, and does not print secrets.
- **Experience and abstention, 15:** explains what it found, presents the source, and acknowledges when it does not know.
- **Reproducibility and documentation, 15:** another person can use only standard Python, run the tests, and understand the limitations.

A project passing goal could be 80/100, as long as faithfulness and testing are not below half their points. This is a learning rubric of our own, not an official grade or credential.

## Summary

Deliver a workflow that searches, cites, and knows when to abstain. Demonstrate the behavior with known questions, negative cases, and repeatable tests. The prototype does not pretend to understand and requires no API: it produces local evidence a person can inspect and use to decide what to build next.
