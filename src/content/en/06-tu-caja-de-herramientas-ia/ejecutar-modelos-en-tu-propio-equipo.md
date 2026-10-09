---
title: "Running Models on Your Own Machine"
description: "Test a local model with invented data and distinguish local inference from cloud services; review performance, licensing, and data handling."
module: "06-tu-caja-de-herramientas-ia"
order: 11
duration: 30
level: "Beginner"
objectives:
  - "Explain what local inference means and what it does not guarantee about privacy."
  - "Choose a small, synthetic task to evaluate a model available on your machine."
  - "Check the result, resources, license, and data path before broader use."
prerequisites:
  - "como-funciona-la-ia-generativa"
  - "privacidad-sesgos-y-uso-responsable"
updatedDate: '2026-10-08'
sources:
  - label: "Ollama: privacy policy and local/cloud processing"
    url: "https://ollama.com/privacy"
  - label: "Ollama: information about cloud models"
    url: "https://registry.ollama.com/blog/cloud-models"
  - label: "Hugging Face: model and license documentation"
    url: "https://huggingface.co/docs/hub/model-cards"
---

## Core Idea — Conceptual Explanation

Running a model **locally** means that some inference is processed on your own machine rather than sending each prompt to a remote service. Ollama offers local options as well as cloud models; the application's name alone does not tell you which route a session uses. Before testing, check in the interface and documentation whether you selected a local model or a remote service. Do not treat local execution as an automatic privacy guarantee.

Other components may transmit data: a third-party interface, extensions, logs, synchronization, connected tools, or code that sends information elsewhere. A shared computer may also save histories. If you need to protect real information, review the full data path and your organization's rules, not just where the response is computed.

Local execution helps you learn about latency, capability, and hardware limits, but it does not mean that every model will work well on every machine. Size, memory, speed, license, and quality vary. Read the model's official card and license before using it or distributing results. For an initial practice, you do not need to choose the “best” model or install an entire catalog: use one that is already available and a low-risk task.

Evaluate the same response by the same criteria as a cloud output: accuracy against the source, unanswered cases, consistency, and errors. A result may sound less fluent and be more faithful, or sound convincing and make things up. Record the test conditions, and do not use a local model to make important decisions just because the file did not leave the machine.

## Concrete Example

You have a fictional card with three rules for a study room. You ask for a summary in a list without adding rules. The answer must preserve the hours, capacity, and one exception. If the selected tool is local, the test helps you observe capability and resource use without real data. If a cloud option appears, do not send the card until you confirm that you want to use that service and find its terms acceptable.

## Guided Practice — Step-by-Step

1. Open the official Ollama documentation and confirm whether the model shown in your environment is identified as local or cloud-based. If you cannot confirm this, do not submit content that needs protection.
2. Use an invented card with three facts and one question without an answer. Define the correct output before testing.
3. Select a model that is already available locally, if you have one. Do not download or install components just to complete this exercise; review the selected model's card and license.
4. Ask for a summary limited to the card and for the system to abstain when information is missing. Check each point and the unanswerable question.
5. Note the approximate time, whether the machine completed the task, and which errors you observed. Repeat once with one condition changed—for example, a shorter prompt—without also changing the source and criterion.

Do not include private documents, credentials, or company code. If you do not have a local model, conduct the analysis with fictional answers and do not assume a cloud version is equivalent to a local test.

## Validation and Troubleshooting

Verify the answer against the original card and record omissions, inventions, and correct abstentions. If the machine runs out of resources, reduce the input length or choose an already available option that the documentation describes as compatible; do not change parameters at random. If it is unclear where the prompt is processed, pause the test and consult the official policy or environment configuration.

## Common Mistakes

- Assuming that installing a local runner makes every connected feature private.
- Confusing local and cloud models because they appear in the same interface.
- Choosing an option based only on size or speed without reading its license and model card.
- Evaluating by fluent tone rather than fidelity to a known source.
- Installing new tools or models without checking permissions, disk space, and provenance.

## In Summary

A local model helps you learn about inference on your machine, but it does not by itself resolve privacy, licensing, or quality concerns. Check the data path, use invented examples, and measure against a source of truth. If the execution mode is unclear, do not send real data.
