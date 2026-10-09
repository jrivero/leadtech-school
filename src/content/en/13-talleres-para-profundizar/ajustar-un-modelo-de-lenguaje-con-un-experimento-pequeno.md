---
title: "Fine-Tuning a Language Model with a Small Experiment"
description: "Design a supervised fine-tuning pilot from examples and evaluation: narrow the task, prepare clean data, and decide whether training makes sense."
module: "13-talleres-para-profundizar"
order: 2
duration: 60
level: "Intermediate"
objectives:
  - "Distinguish supervised fine-tuning, prompt-based instructions, and information retrieval based on the problem."
  - "Design input and response examples with quality criteria and a separate evaluation set."
  - "Validate a JSONL file and define a pilot without assuming a GPU is needed."
prerequisites:
  - "Understand what a model, instruction, and generated response are."
  - "Read JSON and run simple Python scripts."
updatedDate: "2026-10-08"
sources:
  - label: "Hugging Face TRL official documentation: SFT Trainer"
    url: "https://huggingface.co/docs/trl/en/sft_trainer"
  - label: "Hugging Face PEFT official documentation"
    url: "https://huggingface.co/docs/peft/en/methods/overview"
---

## Fine-tuning is not an automatic answer to every problem

Supervised fine-tuning changes a model's learned behavior using input and response examples. It can help maintain a relatively stable format, tone, or task pattern. It does not automatically turn a model into an up-to-date database or guarantee better reasoning for every question. If the problem is answering questions about policies or documents that change, first consider information retrieval: it lets you replace or correct the source without retraining.

Design the experiment before choosing a library or model. Here the task is to classify fictional library inquiries into a structured output: category, priority, and a short explanation. Define the exact contract before writing examples; for instance, `categoria` must be one of `acceso`, `prestamo`, or `otro`; `prioridad` can only be `normal` or `urgente`; and the explanation must not contain personal data. An ambiguous output will not be fixed by increasing the number of epochs: first fix the label and the rule.

## Small, deliberate, separate datasets

To practice the format, create a teaching set of 30 synthetic cases: 20 for training, 5 for validation during development, and 5 final test cases that are not consulted while adjusting instructions. This amount is only enough to check the process and find inconsistencies; it does not support a claim that a model is reliable in production. Include easy cases, edge cases, and examples that use similar vocabulary but have different intent. Do not create the split after duplicating nearly identical paraphrases: group them first so the same situation does not appear on both sides.

A prompt-completion record can look like this; the response should be the target output, not an explanation of how it was created:

```json
{"prompt":"Clasifica: no puedo entrar en mi cuenta","completion":"{\"categoria\":\"acceso\",\"prioridad\":\"normal\",\"motivo\":\"Solicita ayuda de inicio de sesión\"}"}
```

Save one object per line in `train.jsonl`. This validator uses only the Python standard library and detects structural errors before any training:

```python
import json
from pathlib import Path

for numero, linea in enumerate(Path("train.jsonl").read_text(encoding="utf-8").splitlines(), 1):
    fila = json.loads(linea)
    assert set(fila) == {"prompt", "completion"}, f"Línea {numero}: claves inesperadas"
    assert all(isinstance(fila[k], str) and fila[k].strip() for k in fila)
print("Estructura básica correcta")
```

Add a human review: every response must be correct, consistent with the contract, and authorized for use. For sensitive information, do not use real conversations for convenience; replace names and other identifiers with synthetic data before deciding whether the material may be processed at all.

## An evaluation that can refute your idea

Write down in advance what improvement you want and which output would invalidate the pilot. For the five reserved cases, measure at least: parseable JSON, values within the allowed vocabulary, exact classification, and an explanation faithful to the inquiry. Save the base model's response and the fine-tuned candidate's response for each case. A high format score combined with more category errors can be a regression. Also include a refusal rule: if there is not enough information to classify, the model should ask for clarification instead of inventing an answer.

TRL documentation accepts supervised datasets in text, conversational, and prompt-completion formats; its current examples use `SFTTrainer` and `SFTConfig`. This describes one implementation option, not a requirement of this workshop. First produce the dataset and a reviewable evaluation. If a future experiment involves training, record the model name and license, dependency versions, configuration, approved cost, and method for restoring the base model. Parameter-efficient adapters such as PEFT can reduce the number of trainable parameters, but do not remove memory, compute, licensing, or evaluation requirements.

## Mistakes to catch early

Do not mix ideal responses with several incompatible policies; do not fine-tune on the test examples; do not use training loss as the only measure of usefulness; and do not declare success based on one convincing output. If the output fails because a label is poorly specified, correct the guidance and relabel a subset. If it fails only on an underrepresented class, review coverage before changing hyperparameters.

## Wrap-up

A small experiment starts with a data decision: a narrow task, unambiguous format, authorized examples, and an independent test. The goal of this practice is to finish with a reproducible plan and a validated JSONL file, not to pay for compute or pretend that a model was trained.
