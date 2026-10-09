---
title: "What AI Is and What It Isn't"
description: "Distinguish AI systems, machine learning, and automation through everyday examples, and learn how to check what task each one solves."
module: "05-entender-la-inteligencia-artificial"
order: 1
duration: 25
level: "Beginner"
objectives:
  - "Explain in your own words what characterizes an artificial intelligence system."
  - "Distinguish rule-based automation, machine learning, and generative AI."
  - "Identify a specific task and propose a simple test to evaluate the result."
prerequisites: []
updatedDate: '2026-10-08'
sources:
  - label: "OECD: updated definition of an AI system"
    url: "https://www.oecd.org/en/publications/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system_623da898-en.html"
  - label: "NIST: AI Risk Management Framework"
    url: "https://www.nist.gov/itl/ai-risk-management-framework"
---

## Core Idea — Conceptual Explanation

Artificial intelligence (AI) is a broad name for computer systems that produce outputs such as predictions, recommendations, decisions, or content based on objectives and input information. The OECD definition emphasizes that a system can infer how to generate these outputs and that its level of autonomy varies. This does not mean it has consciousness, desires, or human understanding. “Intelligent” describes a capability designed for a task, not a mind inside the computer.

It helps to distinguish three ideas. **Rule-based automation** follows explicit instructions: if a form is incomplete, show a warning. **Machine learning** adjusts parameters based on examples and learns patterns useful for a task, such as classifying a message as spam. **Generative AI** produces new material—text, images, audio, or code—from the context it receives. These categories can be combined: a generative application may use a classifier and ordinary rules around the model.

The useful question is not simply “Is this AI?” but: What input does it receive, what output does it provide, what will it be used for, and what happens when it gets something wrong? A spreadsheet with a fixed formula can be very useful without being an AI model. A system that estimates the category of a request from examples does use machine learning, even if its interface looks like an ordinary text box.

## Concrete Example

Imagine a small library that receives book-loan requests. An automated rule rejects a request if the title or member number is missing. A model trained on earlier requests might suggest which book category someone is looking for. A generative model might draft a friendly reply explaining the pickup hours. None of them should invent that a book is available: that response requires checking the up-to-date catalog. The example shows that a solution can combine ordinary software and AI, and that each part needs a different test.

## Guided Practice — Step-by-Step

1. Choose a small everyday task, such as sorting five fictional comments into “question,” “complaint,” or “compliment.” Do not use real private messages.
2. Write the input and expected output in one sentence. Note whether simple rules could solve the task or whether it requires inferring ambiguous patterns.
3. Create five fictional examples and classify them by hand. Save the expected answers before consulting a tool.
4. Ask an assistant to suggest categories for the same examples. Ask it to mark any case it cannot decide clearly as “uncertain.”
5. Compare each output with your manual classification. Record correct answers, errors, and cases where the categories need a clearer definition.

This is a conceptual exercise: you are not training a model or proving that all AI works the same way. You are learning to describe the task and observe evidence before trusting a label.

## Validation and Troubleshooting

The evaluation should use examples you did not use to explain the task to the assistant. If categories are confused, first review their definitions and add an edge case; do not change the criterion after seeing each answer just to declare it correct. If the result invents a new category, ask it to use only the given list and check whether the new instruction reduces the problem. In a real case, measure errors that have consequences, not just the overall percentage of correct answers.

## Common Mistakes

- Calling any automated program “AI” and losing sight of the mechanism that solves the task.
- Assuming that a fluent answer demonstrates understanding, intent, or access to current data.
- Treating a prediction as a correct decision by default; a person must define when to review or stop the process.
- Comparing two systems using different examples and attributing the difference solely to the model.

## In Summary

AI encompasses diverse techniques; automation, machine learning, and generative AI are not synonyms. Start by defining the input, output, purpose, and risk. Then prepare examples with expected answers and validate the results. This way of thinking works whether you ultimately choose a simple rule or a model.
