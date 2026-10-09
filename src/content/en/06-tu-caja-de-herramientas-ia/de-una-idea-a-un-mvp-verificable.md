---
title: "From an Idea to a Verifiable MVP"
description: "Reduce an idea to a useful flow, define acceptance criteria, and evaluate a minimal prototype with examples before adding more features."
module: "06-tu-caja-de-herramientas-ia"
order: 9
duration: 35
level: "Beginner"
objectives:
  - "Turn a broad idea into a user hypothesis and a minimal flow."
  - "Write observable acceptance criteria before asking a tool for help."
  - "Test an MVP with fictional cases and decide what to fix, keep, or discard."
prerequisites:
  - "elegir-herramientas-sin-perder-el-control"
  - "prototipar-interfaces-con-ayuda-de-ia"
updatedDate: '2026-10-08'
sources:
  - label: "GitHub Docs: exploring pull requests with Copilot"
    url: "https://docs.github.com/en/copilot/tutorials/explore-pull-requests"
  - label: "NIST: AI Risk Management Framework"
    url: "https://www.nist.gov/itl/ai-risk-management-framework"
---

## Core Idea — Conceptual Explanation

A **minimum viable product** (MVP) is a small way to check an important hypothesis with users or a representative test. “Minimum” means reducing scope, not lowering standards of care. The first prototype does not need accounts, integrations, automation, or a database if you are still checking whether a task makes sense. Every additional piece increases what you need to review and maintain.

Start with one person, one need, and one outcome. Form a hypothesis: “Someone who organizes a club needs to find the date and place of the next meeting in under a minute.” Then define the shortest flow that can check it. An MVP could be a static page with three fictional meetings and a filter; there is no need to send notifications or collect personal data.

AI can suggest requirements, interface text, test cases, or an initial code draft. It is a way to explore options, not evidence that someone needs the product. Before requesting an implementation, write down what must happen and what is out of scope. A verifiable criterion prevents the assistant from expanding the idea, inventing features, or changing the goal to declare success.

Also define how you will decide. If the prototype is for learning, evaluate it with fictional data and clear cases. If it affects real people, you need permission, data protection, and an appropriate process for observing and managing failures. Do not use a small internal test to claim the product works for everyone. Feedback should be tied to the hypothesis, not just personal taste in design.

## Concrete Example

A broad idea says: “Create an AI event app.” You narrow it to: “Help a club member find the next event.” The MVP shows a fictional name, date, place, and number of available spots; a person can search by title. Personalized recommendations, payments, accounts, and automatic messages are out of scope. The prototype succeeds if a person finds the right event and can explain what information is missing.

## Guided Practice — Step-by-Step

1. Write the idea in one sentence and add who has the problem and what outcome they want.
2. Define a testable hypothesis and choose one essential flow. Note at least three features you deliberately will not build.
3. Write acceptance criteria before using a tool: what should appear, which action should work, and what should happen with an empty or missing result.
4. Ask an assistant to propose a plan for a one-screen prototype. Reject dependencies, user registration, APIs, keys, or external services if they are not necessary for the hypothesis.
5. Build a local version or sketch with fictional data. Test three cases: the successful flow, missing data, and a search with no matches.
6. Record what worked, what failed, and what decision you would make. The goal is not to claim you have a viable business, but to discover the next useful question.

## Validation and Troubleshooting

Measure each criterion as met, not met, or not testable. If the person cannot find the information, observe where they get stuck instead of asking them to guess. If an assistant adds features, return to the hypothesis and remove them from scope. If the test passes only with a perfect example, prepare a different case before calling it valid. Save the limitations and date of the exercise alongside the conclusion.

## Common Mistakes

- Calling a large application an MVP just because it still needs tests.
- Starting with the model or framework instead of the need you want to test.
- Accepting generated code without written criteria or test data.
- Collecting real user data when fictional inputs would have been enough.
- Treating a working demo as proof of adoption or impact.

## In Summary

An MVP reduces scope to test a hypothesis, not to avoid validation. Define a user, a flow, and observable criteria; build only what is essential and record limitations. AI can speed up drafts, but evidence of usefulness comes from a carefully designed test.
