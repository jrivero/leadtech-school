---
title: "From Copilots to Development Agents"
description: "Recognize when an assistant only suggests code and when an agent observes, plans, and acts, and learn to constrain each change with verifiable criteria."
module: "07-un-flujo-de-trabajo-con-agentes"
order: 1
duration: 35
level: "Intermediate"
objectives:
  - "Distinguish a code suggestion from an agentic workflow that uses tools and feedback."
  - "Define scope, permissions, and a stopping condition for a delegated task."
  - "Evaluate an agent's work through the diff and reproducible checks."
prerequisites:
  - "Know the files, functions, and basic tests in a software project."
  - "Be able to read a diff and run a local check."
updatedDate: '2026-10-08'
sources:
  - label: "AGENTS.md: Open guide for development agents"
    url: "https://agents.md/"
  - label: "OpenAI API: Platform documentation"
    url: "https://developers.openai.com/api/docs/"
---

## From a response to a work cycle

A copilot usually suggests text or code where you are working; you choose what to accept and when to continue. A development agent can follow a broader cycle: read relevant files, formulate a plan, use authorized tools, observe the result, and adjust its next step. The difference is not that one is “intelligent” and the other is not, nor does it depend on a commercial label. What matters is which tools are available, how much autonomy the system has, and who retains the final decision.

A useful cycle starts with a clear goal and bounded context. The agent inspects the task, interprets it, proposes or makes changes, and receives signals such as test failures or browser differences. An explicit exit condition prevents it from exploring indefinitely—for example, “finish when the local validation passes and the diff contains only the requested change; ask if a business rule is missing.” The model's output is a proposal; a passing test alone does not prove that the requirement itself is correct.

## An example with a task manager

Suppose an application stores tasks with a title and status. The request is to also show a due date. An open-ended request—“add dates”—leaves questions about format, time zone, tasks without a date, and editing. A verifiable assignment instead says: “Add an optional `fecha_limite` field to the task view; leave existing entries without a date; do not change persistence or the API format; include one case with a date and another without one; stop before modifying files outside the view and its tests.”

The agent can read the component and its test, locate the rendering point, propose a small change, and run the available test. Your oversight is still necessary: confirm that no date is invented for existing records, that the diff contains no unexpected configuration changes, and that the format is understandable. If the agent decides to migrate the database even though it was told not to touch it, that is not useful initiative: it has crossed the boundary and must explain why before continuing.

## Step-by-step activity

1. Choose a reversible improvement to a practice project, such as sorting a list by name.
2. Write down the visible outcome, two acceptance criteria, and one explicit exclusion.
3. Specify which files the agent may inspect and edit, and which local checks it may run. Do not give it access to production, payments, email, or secrets.
4. First ask for a brief plan and any questions that could change behavior. Correct assumptions before authorizing edits.
5. Review the diff file by file. Compare each change with the criteria and discard unexplained changes.
6. Run the existing tests and the new ones. If a dependency or network call appears, stop and ask for a justification.

The exercise does not require a remote provider: you can write a simulated plan on paper and review a small change manually. If you use an agent, use suggestion mode or an approved learning environment; do not copy a token into the prompt to “make the test easier.”

## Verification and completion criteria

Mark the task complete only if someone else can repeat the check and get the same observable result. For this example, both cases—with and without a date—must display as agreed; the tests must pass; and the diff must be limited to the authorized paths. Record which command you ran and a brief summary of its output, without presenting it as evidence for something you did not run. If the agent cannot validate because the environment is unavailable, note that limitation rather than declaring success.

A quick review asks three questions: Was the requested behavior implemented? Were scope and permissions respected? Is there enough evidence to accept the change? “The agent says it works” answers none of them on its own.

## Common pitfalls

- **Asking for a complete application in one sentence.** Break the work into verifiable outcomes and agree on open questions.
- **Confusing autonomy with authority.** Permission to edit does not imply permission to publish or access real data.
- **Accepting a plan without checking it.** A plan may omit compatibility, error paths, or existing cases.
- **Reviewing only the agent's summary.** Open the diff and inspect files, configuration, and tests.
- **Treating green tests as a total guarantee.** They are evidence about the cases covered, not a product certification.

## Summary

An agent expands the work cycle by combining context, tools, and feedback. Assign it a small unit of work with defined scope, permissions, criteria, and a stopping condition. Review the diff and run reproducible checks; keep decisions, sensitive data, and any publication in human hands.
