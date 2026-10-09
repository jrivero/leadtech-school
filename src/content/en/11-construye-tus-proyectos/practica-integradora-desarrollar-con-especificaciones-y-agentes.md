---
title: "Capstone Practice: Developing with Specifications and Agents"
description: "Turn a small need into scope, a specification, agent-supervised changes, and tests that help decide whether the result meets its requirements."
module: "11-construye-tus-proyectos"
order: 5
duration: 120
level: "Intermediate"
objectives:
  - "Translate a need into scope and observable acceptance criteria."
  - "Assign an agent bounded tasks with limits and review every change."
  - "Verify the result with tests, evidence, and a brief retrospective."
prerequisites:
  - "Know basic functions, data structures, and tests."
  - "Be able to run the project locally and read a diff."
updatedDate: '2026-10-08'
sources:
  - label: "OpenCode: agents and permissions"
    url: "https://opencode.ai/docs/agents/"
  - label: "Ollama: local integration with OpenCode"
    url: "https://github.com/ollama/ollama/blob/main/docs/integrations/opencode.mdx"
  - label: "OpenCode: project MIT license"
    url: "https://github.com/anomalyco/opencode/blob/dev/LICENSE"
  - label: "Ollama: project MIT license"
    url: "https://github.com/ollama/ollama/blob/main/LICENSE"
  - label: "GitHub Docs: collaborating through pull requests"
    url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests"
---

## Brief: a small issue tracker

This capstone brings together the course: start from verifiable requirements and programming fundamentals, use an agent to support implementation, and finish with tests, review, and evidence of decisions. The criterion is not how much code was generated, but whether you can explain and check every change, including those involving permissions and data.

A study team needs to record problems found in a practice application and check which ones remain open. Build a local version that lets people create an issue with a title and description, view the list, and change its status between open and resolved. Do not add accounts, notifications, real-time collaboration, or cloud services. The goal is to demonstrate a complete specification-led cycle, not to maximize features.

## Minimum scope and specification

Before coding, write one page describing who uses the tool, what problem it solves, what is out of scope, and what minimum data is kept. Add user stories with verifiable criteria. For example: “As a student, I want to create an issue so I can remember a bug.” Criteria: a non-empty title creates a visible item; an empty title shows a readable error and is not saved; changing the status updates the list. Also define the empty-list behavior and what “resolved” means.

Choose the language and dependencies already in the project; do not add services or purchases. If there is no existing project, create the smallest application you can run locally. The tracker may use memory or the browser's local storage, as long as you explain whether data survives closing it. Do not store sensitive data.

## Step-by-step plan

1. **Record the starting point.** Run existing tests, note prior failures, and locate the project instructions. This prevents attributing an existing problem to the agent.
2. **Close the scope.** Write user stories, fields, and acceptance criteria. Explicitly list three exclusions to prevent tempting additions.
3. **Request a plan before code.** If you use OpenCode, start with its planning agent: ask for relevant files, risks, and a short sequence, not changes. Keep editing and terminal access denied or pending approval, and do not authorize modifications during this phase. Correct assumptions and approve the plan yourself.
4. **Delegate one small piece.** Give the agent one story, its criteria, and the files it may touch. Example: “Implement title validation; do not change persistence or design; add a test; explain the diff and stop if a decision is missing.” Use permissions that require approval to edit or run commands. To avoid remote services, one option is to connect a compatible agent to a local model with Ollama; check the model's licenses and your machine's compatibility first. Do not enable cloud providers or paid APIs.
5. **Review; do not just read the summary.** Inspect every modified file and the diff. Compare each change with the specification; reject out-of-scope modifications. Ask the review agent to list defects without writing code, then decide which suggestions to apply.
6. **Test from the criteria.** Run existing and new tests. Also walk through the app: create an issue, reject an empty title, resolve an item, and check the empty list. If you use GitHub, record context, tests, and review questions in a pull request; the final decision remains with a person.

## Verifiable deliverables

Submit `docs/alcance.md`, `docs/especificacion.md`, the minimal application, repeatable tests, and `docs/revision-agente.md`. In the last document, summarize what you requested, what you accepted or rejected, what changed, and which tests you ran. Add startup instructions and a screenshot or terminal output showing the flow, without personal data.

## Acceptance criteria and suggested solution

The deliverable meets the criteria if every acceptance criterion has an associated test or manual check; the application performs the three agreed actions; errors are explained; tests pass; and the diff contains no secrets, unexpected dependencies, or unreviewed changes. A simple design can model each issue with an ID, title, description, and status; separate create, list, and resolve operations; and keep the presentation independent from those rules. You do not need a complex architecture to demonstrate explicit decisions.

Common mistakes include asking “build the whole app” without limits, letting the agent choose requirements, accepting tests that do not match the problem, running commands without understanding them, and declaring success just because the model says so. If a test fails, return to the criterion, reproduce the failure, and ask for a localized fix. Keep the specification and tests as the source of truth; the agent proposes changes, but you authorize and verify the result.
