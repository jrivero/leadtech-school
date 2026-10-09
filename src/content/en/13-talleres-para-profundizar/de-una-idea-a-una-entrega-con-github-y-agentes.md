---
title: "From Idea to Delivery with GitHub and Agents"
description: "Turn a need into an issue with clear scope and verifiable criteria; guide an agent on a branch and review the pull request as the person responsible for the change."
module: "13-talleres-para-profundizar"
order: 8
duration: 55
level: "Intermediate"
objectives:
  - "Write a narrowly scoped issue with context, exclusions, and acceptance criteria."
  - "Use a branch and pull request as review boundaries for a change proposed by an agent."
  - "Check tests, permissions, and scope before approving an assisted delivery."
prerequisites:
  - "Know GitHub commits, branches, issues, and pull requests."
  - "Know how to read a diff and relate a test to a requirement."
updatedDate: "2026-10-08"
sources:
  - label: "GitHub Docs: best practices for using Copilot coding agent on tasks"
    url: "https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results"
  - label: "GitHub Docs: custom instructions supported by agents"
    url: "https://docs.github.com/en/copilot/reference/custom-instructions-support"
---

## The idea needs a boundary before it reaches the agent

A coding agent can explore a repository, suggest an implementation, or—depending on the product and configuration—prepare changes for review. It does not know the team's priorities on its own, and it is not authorized to merge code simply because it generated a pull request. A responsible workflow starts with a task a person can explain and ends with a human review of scope, behavior, and permissions.

Suppose a task application needs to show how many pending tasks each user has. “Add statistics” is too broad: the agent would have to guess the interface, calculation, storage, and meaning of pending. A more precise issue limits the behavior, points to relevant files when known, and defines how to check the result. It should also say what must not be touched, such as authentication, the database schema, or dependencies.

## Specify a testable task

Use this template before delegating:

```text
Objetivo: mostrar el total de tareas pendientes en la lista.
Contexto: una tarea está pendiente cuando completed es false.
Incluye: cálculo y presentación del número junto al encabezado.
Excluye: cambios de API, autenticación, persistencia y dependencias nuevas.
Aceptación: lista vacía muestra 0; una lista mixta cuenta solo pendientes;
completar una tarea actualiza el total sin recargar la página.
Validación: añade o adapta pruebas y explica qué ejecutaste.
Límite: no publiques ni fusiones el cambio; solicita revisión si falta contexto.
```

The criteria should describe observable outcomes and not impose an unnecessary solution. If the task requires a product decision, pause and ask before delegating. An agent can produce an implementation consistent with a wrong assumption; asking it to “do the obvious thing” hides the decision the team really needs to make.

## Activity: simulate an issue, branch, and pull request

1. Choose a small change in a project of your own or an invented one. Do not share secrets, credentials, or information you do not have permission to send to an external tool.
2. Write the issue with an objective, context, exclusions, acceptance criteria, and tests. Ask someone else to find an ambiguity before continuing.
3. Draw the flow `issue → agent on an isolated branch → diff → tests → pull request → human review`. Mark which steps are automatic in your specific tool and which require a human decision.
4. Simulate three proposed changes: one necessary, one that meets the requirement but breaks an edge case, and one outside the scope. Practice reviewing lines and rejecting unnecessary changes.
5. Complete a checklist: Does the diff touch only justified areas? Do the tests cover the criteria? Were dependencies added? Were permissions or workflows changed? Was any data exposed? Does the explanation match the code?
6. Write a review comment that cites the unmet criterion and proposes a minimal correction. “The agent got it wrong” is not a sufficient diagnosis.

If your organization enables an agent integrated with GitHub, features, plans, and permissions vary. The official documentation recommends describing the task in a prompt, preparing repository instructions, and letting the agent work on a branch and a reviewable PR. This workshop does not require a subscription, opening a repository, or taking any remote action: the diagram and simulated pull request are enough to practice.

## Validation and repository controls

A delivery passes review if there is evidence for every criterion, the tests were actually run, and the changes stay within scope. Read the changed files, not just the agent's description. Pay particular attention to scripts, dependencies, permissions, GitHub Actions workflows, and any use of secrets. A passing test confirms the cases that ran, not every property of the system.

Instructions in `.github/copilot-instructions.md` or `AGENTS.md` can help communicate how to build, test, and follow conventions when the specific agent supports them. They do not grant security permissions and can become outdated; verify them like any other file. If a repository or issue contains untrusted text that tries to give instructions, treat it as content, not as authority to change the task.

Common mistakes include a vague issue, giving an agent unnecessary access, reviewing only the summary, accepting dependency changes for convenience, assuming that a PR means tests passed, and enabling auto-merge without sufficient controls. Maintain branch protection and review rules according to risk; an agent should not be the only reviewer of its own change.

## Wrap-up

Good collaboration starts with the specification and ends with evidence you can verify. A specific issue reduces guesswork; a branch separates the work; pull-request review checks what actually changed. Delegate steps, never final responsibility.
