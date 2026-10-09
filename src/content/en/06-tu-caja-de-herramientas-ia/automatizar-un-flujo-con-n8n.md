---
title: "Automating a Workflow with n8n"
description: "Design a small n8n automation with test data, add approval before any external effect, and check every step."
module: "06-tu-caja-de-herramientas-ia"
order: 10
duration: 35
level: "Beginner"
objectives:
  - "Explain how a workflow connects a trigger, transformations, and actions."
  - "Build a safe prototype using fictional data and no external effects."
  - "Add human review and check for errors before automating a real action."
prerequisites:
  - "elegir-herramientas-sin-perder-el-control"
  - "privacidad-sesgos-y-uso-responsable"
updatedDate: '2026-10-08'
sources:
  - label: "n8n: official documentation"
    url: "https://docs.n8n.io/"
  - label: "n8n: human approval for AI tools"
    url: "https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools.md"
---

## Core Idea — Conceptual Explanation

n8n is a tool for connecting workflow steps through nodes. A workflow usually begins with a trigger, processes data, and performs one or more actions. The visual diagram makes the flow easier to understand, but it does not make an automation harmless: an action can send a message, change a record, or expose information. Credentials and permissions should be limited to what the task requires.

AI can be one step in a workflow, for example, proposing a category or a draft. Its output remains uncertain and may not follow the expected format. The rest of the workflow must therefore handle errors, empty fields, and questionable responses. The n8n documentation includes human-approval controls for AI tool calls; do not confuse adding an AI node with having a complete security control.

Start with a manual run and fictional data. Do not connect Gmail, production databases, or real accounts for a first practice. Design an output you can review and add an approval before any action with external effects. The goal is not complete automation, but demonstrating that each transformation does what you expect and that a person can stop the workflow.

Interfaces and available nodes may change, and integrations may require specific credentials or configuration. Consult the current documentation for the exact node you are using. Do not publish credentials in screenshots or copy them into prompts. If you do not understand what data a node sends or which service it sends it to, stop before running it.

## Concrete Example

A fictional team receives a list of questions about a workshop. The test workflow receives an invented object, trims spaces, extracts the topic, and prepares a draft reply based on a local note. The output remains a draft for approval; it does not send email or change a real record. This lets you evaluate the flow without risking an accidental communication.

## Guided Practice — Step-by-Step

1. In n8n, create a new practice workflow and use a manual trigger or equivalent described in the current documentation. Do not connect a production account.
2. Enter a fictional example with two fields, such as `topic` and `question`. Record the expected output in advance.
3. Add simple steps to normalize the text and generate a draft. If you test an AI feature, limit its instruction to the sample information and require a clear format.
4. Before an external action, insert a human-approval step following n8n's official guide. In this practice, stop the workflow before sending or saving anything outside the test space.
5. Test a normal case, an empty field, and a request with no answer in the note. Check each node, the error path, and the data passed to the next step.
6. Save a screenshot without secrets or a diagram of the workflow and note which step needs review. Do not publish or share credentials.

The recipe focuses on logic and human control; node names may vary. If you do not have an authorized environment, represent the workflow on paper using the same fictional inputs and outputs.

## Validation and Troubleshooting

Compare the input and output at every step, not just the final result. If the draft contains an invented fact, review the prompt and local source. If a field disappears, inspect the previous transformation. Run the three cases again and confirm that no real route is activated. Before using authentic data, review permissions, organizational policy, retention, and the access each credential would provide.

## Common Mistakes

- Activating a trigger that processes real data before testing.
- Connecting email or databases before knowing what information will leave the workflow.
- Letting a generated response perform an action without approval.
- Storing keys in plain text, screenshots, or model instructions.
- Checking only a happy path and ignoring empty inputs or connection errors.

## In Summary

n8n lets you visualize and coordinate automations, but every node can have effects. Build with fictional data first, inspect every step, and require approval before any external action. Automate only when errors and stop paths are understood.
