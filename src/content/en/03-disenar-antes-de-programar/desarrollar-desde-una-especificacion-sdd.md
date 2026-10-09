---
title: "Develop from a Specification: SDD"
description: "Organize development around a concise specification, a plan, and verifiable tasks, using AI as reviewable support rather than an authority."
module: "03-disenar-antes-de-programar"
order: 3
duration: 40
level: "Beginner"
objectives:
  - "Explain the purpose of specification-driven development."
  - "Break a feature down into scope, decisions, tasks, and checks."
  - "Keep the specification, implementation, and evidence aligned."
prerequisites:
  - "Know how to write simple requirements and acceptance criteria"
updatedDate: "2026-10-08"
sources:
  - label: "GitHub Spec Kit: Spec-Driven Development Documentation"
    url: "https://github.com/github/spec-kit/blob/main/docs/index.md"
---

## Define the Expected Outcome Before the Implementation

Spec-Driven Development, or SDD, is a name used for workflows in which intent is made concrete before writing the solution and guides planning, tasks, and verification. Do not treat a particular label or template as a universal standard. GitHub Spec Kit, for example, documents a Specify → Plan → Tasks → Implement → Converge workflow; it is one available implementation, not the only way to work.

The idea is to reduce assumptions. A request such as “add reminders” still does not define who receives them, when, through which channel, or how duplicate notices are prevented. A concise specification identifies behavior, boundaries, and acceptance cases. The plan explains necessary technical decisions; the task list proposes verifiable changes. During implementation, findings may reveal that an assumption was false; in that case, update the specification and reconcile the artifacts instead of leaving contradictory documents behind.

## Example: Marking a Task as Complete

**Intent:** A person can complete a pending task by selecting its number in the list. **Out of scope:** editing the title or saving data to disk. **Criteria:** a valid number changes only that task; zero, negative numbers, and numbers greater than the list do not change anything; text that is not an integer produces an understandable message.

The plan might decide to keep the domain function independent of the menu and treat the displayed number as one-based, converting it to an index when accessing the list. Tasks might include writing the conversion function, implementing range validation, adding tests for the boundaries, connecting the menu, and reviewing output and errors. Each task leaves an observable signal, rather than just “program everything.”

If an AI tool helps draft the specification, ask it to mark assumptions and open questions. Check whether it invented rules, such as allowing tasks to be reopened, and resolve them before generating much code. After implementation, compare the result with every criterion and update what is necessary if a decision changed.

## Step-by-Step Practice

1. Choose a small feature for your project and describe its problem in one sentence.
2. Add the user, initial state, expected outcome, and cases that are out of scope.
3. Define three acceptance criteria, including an edge or error case.
4. Note the essential technical decisions; defer choices that do not affect the outcome.
5. Divide the work into small tasks and associate each with a test or review.
6. Implement one task, run its check, and revisit the specification before continuing.
7. At the end, mark any differences between the initial design and what you learned; update any documents that have become outdated.

## Check the Consistency

The specification is useful if another person can create test examples without asking what each rule means. The plan should address real constraints, and the task list should make progress reviewable. At the end, each criterion has evidence: a test result, a manual demonstration, a review, or a measurement. A long document no one consults is not as valuable as a concise note kept alongside the change.

If the scope is a trivial fix, an extensive specification may cost more than the solution itself. Adjust the level of detail to the risk, ambiguity, and number of people involved. For a change involving payments, permissions, or sensitive data, add security controls, human review, and negative tests; do not rely on the apparent confidence of generated text.

## Common Mistakes

Do not turn the specification into a description of code you have already decided to write. Do not assume that generating tasks guarantees the AI will carry them out correctly. Do not let code and the specification diverge after a clarification. And do not confuse SDD with a promise to generate a complete application in a single prompt.

## Summary

SDD makes intent, scope, and criteria explicit before and during implementation. Specify what is necessary, plan decisions, break down the work, and verify each result. Use assistants to reduce mechanical work, but keep a person responsible for the rules and for reconciling changes.
