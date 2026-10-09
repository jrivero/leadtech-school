---
title: "How Generative AI Works"
description: "Understand tokens, embeddings, and attention through an analogy; test outputs with Hugging Face and Google AI Studio, and check the status of GitHub Models."
module: "05-entender-la-inteligencia-artificial"
order: 2
duration: 35
level: "Beginner"
objectives:
  - "Explain what tokens, vector representations, and attention are without confusing them with human understanding."
  - "Describe how a language model generates text from context and successive predictions."
  - "Compare two small experiments and check a tool's availability in official documentation."
prerequisites:
  - "que-es-la-ia-y-que-no-es"
updatedDate: '2026-10-08'
sources:
  - label: "Hugging Face: language model and tokenizer course"
    url: "https://huggingface.co/learn/llm-course/en/chapter1/4"
  - label: "Google AI Studio: official quickstart guide"
    url: "https://ai.google.dev/gemini-api/docs/ai-studio-quickstart"
  - label: "GitHub Models: official retirement notice"
    url: "https://docs.github.com/en/github-models"
  - label: "Vaswani et al.: Attention Is All You Need"
    url: "https://arxiv.org/abs/1706.03762"
---

## Core Idea — Conceptual Explanation

A generative model learns patterns from many examples. In a language model, the input is first converted into **tokens**: units that may be a word, part of a word, a number, or a symbol. There is no fixed one-to-one correspondence between words and tokens; each model uses its own tokenizer. The text is converted into numerical identifiers that the model can process.

Each identifier is associated with an **embedding**, a numerical representation—a vector—that helps the model calculate relationships between elements. It is not a dictionary definition or a label that a person can read directly. Later layers transform these representations according to the context. That is why the same word can play a different role depending on the sentence around it.

**Attention** is a mechanism that lets the model weight which parts of the context help it process other parts. In “Marta left the umbrella because it was wet,” a system may relate “it was wet” to earlier elements, even though the sentence remains ambiguous to a person. Attention does not mean that the model looks with intent or explains why an answer is true. It is a mathematical operation inside an architecture.

The model then calculates likely continuations and produces a sequence one token at a time, conditioned on the instruction and available context. The application may add rules, filters, or external tools. Fluency depends on learned patterns; it does not demonstrate verification, access to recent information, or human understanding. Different models and products may behave differently.

## Concrete Example

Imagine a fictional note: “The workshop starts at 10:00; bring a notebook.” You ask, “What time does it start?” The answer can be brief because the note provides context. If you ask who will teach the workshop, the text does not say: a plausible continuation is not evidence. One tokenizer may split “10:00” differently from another; that does not change the fact, but it does change how it is processed internally.

## Guided Practice — Step-by-Step

1. Write a fictional card with three facts and one question whose answer is not included. Save a copy of the expected answer before trying anything.
2. On Hugging Face, look for a model suitable for text and read its model card: task, stated data or limitations, license, and current availability. Use an interactive demo only if the page itself offers one and you find its terms acceptable; otherwise, review the model card without submitting content.
3. If you have access to Google AI Studio, enter the same invented note and the same question. Do not add credentials, private files, or real information. Record the model name and the date shown in the interface, because the options may change.
4. Compare the answers using three criteria written in advance: preserve the facts, do not invent the missing answer, and produce the requested format. A test with two different products is an observation, not a universal benchmark.
5. For GitHub Models, consult the official retirement notice: as of this lesson, the model service stopped being available on July 30, 2026. Note what was retired and do not try to use an old API or guide. GitHub Models is not the same as GitHub Copilot, and a retired product does not offer a live experiment.

This practice does not train a model. It teaches you to distinguish internal concepts, an interface, and actual access to a service. None of the steps requires an API key or deliberate spending.

## Validation and Troubleshooting

Keep the original note and a table with the question, expected answer, received answer, and evidence. If a fact is missing, it is correct for the tool to say “not stated.” Repeat once, changing only the wording of the question. If the result changes, record that instead of choosing the answer you like best. Token counters and execution options are not automatically comparable across providers: each model may tokenize and configure generation differently.

## Common Mistakes

- Believing that every word equals one token or that an embedding is a readable explanation of meaning.
- Imagining attention as consciousness or as a guarantee that the right source was chosen.
- Treating a fluent answer as a verified fact.
- Following an old GitHub Models tutorial as if the service were still active, or confusing it with Copilot.
- Comparing products without recording the model, date, input, and evaluation criterion.

## In Summary

Tokens, embeddings, and attention describe parts of processing, not a mind or proof of truth. To observe generation, use invented information, fixed criteria, and current documentation. Also check whether the tool exists and is available before following old instructions.
