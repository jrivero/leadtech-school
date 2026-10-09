---
title: "Patterns for Coordinating Multiple Agents"
description: "Compare sequential execution, parallel tasks, and independent review, and coordinate agents with small contracts, clear ownership, and human integration points."
module: "08-calidad-que-se-demuestra"
order: 8
duration: 40
level: "Intermediate"
objectives:
  - "Choose between sequencing, parallelism, or review according to dependencies and risk."
  - "Define inputs, outputs, and file ownership for delegated tasks."
  - "Integrate results with tests and review instead of trusting consensus among agents."
prerequisites:
  - "Understand the workflow of a development agent."
  - "Know how to describe dependencies between software tasks."
updatedDate: '2026-10-08'
sources:
  - label: "OpenAI API: documentation for agents and tools"
    url: "https://developers.openai.com/api/docs/"
  - label: "Model Context Protocol: architecture and interoperability"
    url: "https://modelcontextprotocol.io/introduction"
---

## Coordination means reducing dependencies

Using several agents does not guarantee that a change will be faster or better. Coordination adds costs: distributing context, resolving incompatible decisions, and checking interfaces. It is useful to start with one task and parallelize only work with clear boundaries. Three common patterns are sequencing—one stage hands off to the next—parallel work on independent tasks, and a separate review that looks for problems in an existing result.

In a sequential workflow, a person defines the contract; one agent proposes an implementation; another reviews the diff; and a person integrates and verifies it. The next stage receives concrete artifacts, not an unordered, complete conversation. In parallel, two tasks are truly independent only if they do not write to the same file, change the same interface, and can be tested separately. If both invent names for a shared operation, any savings disappear during integration.

A reviewing agent can offer a different perspective if asked to look for specific errors and given the same acceptance criteria. It is not inherently an authority or an independent auditor: it can repeat the implementer's assumptions, ignore context, or confirm a nonexistent defect. A useful review identifies evidence, impact, assumptions, and a way to reproduce the finding. The final decision belongs to a person responsible for the system.

## Example: adding CSV export

A large task can be divided into: defining the column format; implementing data conversion; adding an interface action; and reviewing documentation. Before distributing the work, the responsible person agrees on the contract: exact columns, their order, included rows, and behavior for quotation marks or line breaks. Conversion and guide updates could proceed in parallel if they share that contract; the interface depends on the export function having a stable signature. Review must assess the final diff, not just each participant's summary.

Assign ownership of files and deliverables: one task returns the function and its tests; another returns updated text and supported claims. If a change must touch the same interface, serialize the work or appoint a single editor. Do not let automatic coordination publish, delete data, or expand permissions to resolve a conflict. Orchestration manages dependencies and checks; it does not remove security policies.

## Step-by-step activity

1. Choose a small function that could be divided into three deliverables.
2. Draw arrows between deliverables only when one needs a decision or file from another.
3. For each task, write its input, expected output, permitted files, and one check.
4. Mark which activities could run in parallel without sharing files or contradicting interfaces.
5. Assign a person to own the contract and an integration point where results will be reviewed.
6. Imagine that two results propose different CSV columns. Stop the merge, return to the contract, and ask for a decision rather than choosing based on an agent's preference.

## Verification and solution

In the example, conversion depends on the CSV criteria; the interface depends on the function signature; and documentation depends on confirmed behavior. The latter two can start in parallel only if the contract is settled and the documentation remains a draft until a test supports it. Check each output separately, review the combined diff, run tests, and reopen the screen. The number of agents or completed tasks does not replace these criteria.

If the dependencies cannot be explained in a simple diagram, the assignment may still be too tightly coupled. Reduce the scope or perform the steps sequentially. If a task raises a business question, do not delegate an invented decision: raise the question and wait for confirmation.

## Common mistakes

- **Parallelizing by default.** Assess whether deliverables are independent and whether integration will cost more than waiting.
- **Sharing an editable workspace without ownership.** Define paths and responsible people to prevent concurrent changes.
- **Asking an agent to review “everything.”** Narrow the focus to observable criteria, paths, and risks.
- **Accepting agreement as evidence.** Compare results with requirements, tests, and human review.
- **Letting the orchestrator expand permissions.** Keep boundaries the same or stricter at every stage.

## Summary

Useful coordination separates work with explicit contracts, orders dependencies, and assigns ownership. Use sequence when decisions are chained, parallel work when outputs do not conflict, and independent review to surface specific questions. Integrate with tests and human judgment; more agents do not mean more certainty.
