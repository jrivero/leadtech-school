---
title: "Frameworks, RAG, and Model Fine-Tuning"
description: "Distinguish frameworks, RAG, and fine-tuning, explore LlamaIndex with fictional documents, and choose a minimal test before adding infrastructure."
module: "05-entender-la-inteligencia-artificial"
order: 4
duration: 35
level: "Beginner"
objectives:
  - "Describe which pieces an application framework for language models can coordinate."
  - "Compare RAG retrieval and fine-tuning based on the problem and available evidence."
  - "Design a small evaluation of retrieval, faithfulness, and abstention using invented data."
prerequisites:
  - "como-funciona-la-ia-generativa"
updatedDate: '2026-10-08'
sources:
  - label: "LlamaIndex: official documentation on RAG"
    url: "https://developers.llamaindex.ai/python/framework/understanding/rag/"
  - label: "OpenAI Platform: fine-tuning platform status"
    url: "https://platform.openai.com/pricing"
  - label: "OpenAI: model optimization and fine-tuning"
    url: "https://developers.openai.com/api/docs/guides/model-optimization"
  - label: "NIST: generative AI risk profile"
    url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf"
---

## Core Idea — Conceptual Explanation

A **framework** brings together pieces an application may need: connectors, instructions, retrieval, tools, and output formatting. **LlamaIndex** is one of the projects that documents how to connect data and models to build applications, including retrieval-augmented applications. A framework saves repetitive coding and provides conventions, but it adds configuration and dependencies. It does not improve your documents' quality by itself or force the model to answer truthfully.

**RAG**—retrieval-augmented generation—searches a collection for relevant passages and adds them as context to the request sent to the model. For it to work, documents must be prepared, divided into useful chunks, indexed, and searched for evidence appropriate to each question. Vector representations can help search by similarity, but high similarity does not prove that a passage supports a claim. RAG may retrieve the wrong material, omit an exception, or produce an answer without citing the right document.

**Fine-tuning** modifies a model's parameters using examples to improve a response pattern, format, or task. It is not a general way to update facts that change every day or a mechanism that guarantees truthfulness. It requires representative data, quality controls, and evaluation with examples that were not used for fine-tuning. For changing information, retrieving current documents is usually easier to update than preparing a new training set.

These techniques solve different problems and can be combined, but none is a mandatory first step. Availability also depends on the provider: at the time of review, OpenAI states that its fine-tuning platform is in the process of being retired and is not onboarding new users. This does not mean the concept has disappeared from the entire industry; it shows why you should not promise access to a specific feature without checking its current status.

## Concrete Example

A fictional library publishes borrowing rules that change each month. If the assistant must answer “How many books can I borrow now?”, RAG can retrieve the current paragraph and show it as evidence. If an answer always needs the same tone and structure, some examples might help define or evaluate that style; fine-tuning the model is not a reliable way to memorize the new rules. If the search retrieves an old paragraph, a fluent answer will not fix the outdated index.

## Guided Practice — Step-by-Step

1. Write two fictional pages: a policy and a calendar. Include five verifiable facts, one exception, and one question whose answer does not appear.
2. Prepare six questions and their expected answers before looking anything up. Label each one answerable, ambiguous, or absent.
3. Simulate RAG manually: for each question, select the passage that would serve as context. If you explore LlamaIndex, follow the current official documentation and use only these invented documents; do not install components or run services to complete the conceptual exercise.
4. Score separately whether the right passage was retrieved, whether the answer represents it faithfully, and whether the system abstains when evidence is missing.
5. Describe a possible fine-tuning goal using two synthetic examples, such as always returning a three-column table. Do not train a model or send data to a service. Compare this formatting need with a simple instruction before proposing fine-tuning.

## Validation and Troubleshooting

Reserve new questions for a later check. If RAG retrieves irrelevant text, first review the chunking, labels, and collection; switching models may hide the problem without solving it. If the answer cites a sentence that does not support the conclusion, count it as a failure. If fine-tuning works on familiar examples and fails on others, increase the representative variety and check whether the task is poorly defined. Start with a simple baseline and add a component only when it reduces an observable error.

## Common Mistakes

- Choosing a framework because it is popular before knowing what task it will solve.
- Confusing vector similarity with sufficient evidence, or RAG with a factual guarantee.
- Using fine-tuning as a database for facts that change frequently.
- Measuring only answers that are already known and not testing ambiguous or unanswered questions.
- Assuming that a documented feature is available on every account or from every provider.

## In Summary

Frameworks, retrieval, and fine-tuning are different tools. First define the error, the test set, and the evidence required. LlamaIndex can help coordinate a solution using documents, but the complete system still needs current sources, measurements, and human review. Start small and confirm availability before adopting a feature.
