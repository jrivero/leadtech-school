---
title: "Where AI Fits in Software Development"
description: "Place AI within the software lifecycle: use it for bounded tasks while keeping human judgment in defining, reviewing, testing, and maintaining a product."
module: "01-empieza-aqui"
order: 4
duration: 30
level: "Beginner"
objectives:
  - "Recognize common stages of software work."
  - "Choose a bounded task where AI can help without taking final responsibility."
  - "Review and test every suggested change before integrating it."
prerequisites:
  - "Know the basic cycle of writing and running code"
updatedDate: "2026-10-08"
sources:
  - label: "GitHub Docs: Writing Tests with GitHub Copilot"
    url: "https://docs.github.com/en/copilot/tutorials/write-tests"
---

## AI Participates in a Process; It Does Not Replace It

Creating software is not just a matter of producing code. First, someone’s need is understood; then the important behavior is agreed on, a solution is designed, implemented, tested, delivered, and maintained. In practice, these activities may repeat in short cycles. A function that runs successfully does not prove that it meets someone’s need, leaves other features intact, or can be maintained.

AI can help with parts of the work: explaining an error message, generating questions to clarify requirements, suggesting a test example, or proposing an initial draft. However, it does not automatically know the hidden decisions in a project. The developer must provide context, review changes, and take responsibility for accepting them. GitHub documents using Copilot to suggest tests and warns that generated tests may not cover every scenario; review and extend the cases for that reason.

## Example: Fixing a Task That Will Not Mark as Done

Imagine a simple task manager where clicking “complete” does not change the visible status. Do not start by asking an agent to rewrite the entire application. First describe the expected behavior: “When I choose the number of a pending task, its status changes to complete; the others stay the same.” Say which files are involved and what you observed.

Ask the AI to suggest possible causes and a test that could distinguish them. Perhaps the displayed number starts at one while Python’s list starts at zero; perhaps a copy of the task is being changed. Reproduce the bug with two tasks and record the actual result. Then request a small change. Before accepting it, inspect the diff: did only the necessary logic change? Were dependencies added? Was another rule altered? Was sensitive data or a destructive operation introduced?

Run the new test and the existing tests. Also try an index outside the range and confirm that the program reports it clearly. If everything passes, explain why the fix solves the problem and what it does not cover. If it fails, share the new message with the AI and proceed from concrete evidence rather than assumptions.

## Where It Helps and Where It Needs More Care

For repetitive, reversible tasks, such as drafting an initial test or summarizing a file, a suggestion can speed up the start. For decisions that affect security, payments, privacy, or irreversible data, require closer review and involvement from people who understand the domain. A model may miss a rule that is not included in its context or suggest a dependency with uncertain maintenance.

Break the task into steps: define the outcome, request a small proposal, review the change, run it, and record the evidence. Limit the assistant’s permissions to what it needs. Do not share secrets or customer data. If you delegate an action on files, understand what it will modify first and keep a way to undo the change.

## Step-by-Step Practice

1. Choose a harmless bug in one of your exercises and describe the expected and observed results.
2. Ask for hypotheses and tests first, not finished code.
3. Reproduce the problem without AI and keep a minimal input that triggers it.
4. Request a change that affects just one rule and review the proposal line by line.
5. Run the failing-case test and another test for a related feature.
6. Write down what you checked and what limitation remains.

## Common Mistakes

Do not use “the AI generated it” as an explanation for a technical decision. Do not accept a large diff just because the visual demonstration looks right. Do not delegate product judgment, either: an application can follow a literal instruction and still be awkward or unfair. If you cannot explain the change, ask for a smaller one or implement it again with more gradual support.

## Summary

AI can help with analysis, drafts, and supporting tasks, but the process also includes needs, testing, and maintenance. Bound each request, limit access, review the diff, and require executable evidence before accepting a change.
