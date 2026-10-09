---
title: "Hands-On Introduction to OpenCode"
description: "Get to know OpenCode as a coding agent and try a read-only query; check permissions and version before allowing edits or commands."
module: "06-tu-caja-de-herramientas-ia"
order: 7
duration: 30
level: "Beginner"
objectives:
  - "Identify OpenCode as a documented coding agent and review its scope."
  - "Separate an analysis task from authorization to edit or run tools."
  - "Try a harmless task and evaluate the response and available controls."
prerequisites:
  - "elegir-herramientas-sin-perder-el-control"
  - "trabajar-con-codex-de-forma-supervisada"
updatedDate: '2026-10-08'
sources:
  - label: "OpenCode: official documentation"
    url: "https://opencode.ai/docs/"
  - label: "OpenCode: tool permissions (V2)"
    url: "https://opencode.ai/v2/docs/permissions"
---

## Core Idea — Conceptual Explanation

**OpenCode** here refers to the coding agent documented at opencode.ai, not to any tool that happens to share that name. Its documentation describes an environment for interacting with projects and tools. Features and configuration evolve: before following an instruction, identify which edition of the documentation applies to the installed product. An old setup guide may use different options from those available now.

A coding agent can read files and, if its configuration allows, propose or make edits and take actions. It is important to distinguish “can you help me understand this code?” from “can you change files or run a command?” Permissions should match the goal and remain minimal. OpenCode's official guides describe agent configurations and permissions; do not copy a configuration block without checking the version and the effect of each rule. The most powerful mode is not automatically the safest mode.

To get started, choose a fictional project, a specific task, and a verifiable result. Ask for a read-only explanation before allowing changes. If you later authorize an edit, limit the scope to one or two files, review the diff, and run manual or automated tests. Do not provide keys or authorization to access accounts. If the tool proposes a command, understand what it reads or modifies before approving it; reject commands that download, delete, publish, or change permissions unless they are explicitly part of the exercise.

OpenCode can connect to configured models and providers, but do not assume that all configurations behave the same or that a local editor means local inference. Check which provider receives the prompt and code, which models are listed, and which policy applies. This lesson does not promise that a provider, integration, or plan is enabled in your account.

## Concrete Example

A practice repository contains a function that classifies a list of fictional messages. Ask OpenCode to explain the criterion it uses and suggest a test for an empty message. The first part can be evaluated without writing files. If you later authorize a test, check that it affects only the sample module and that its result matches your expected answer.

## Guided Practice — Step-by-Step

1. Prepare a practice folder without private data, credentials, personal configuration, or a connection to a work repository.
2. Open the official OpenCode documentation and confirm which version or permissions edition applies to your installation. Review which tools each mode can use before starting.
3. Ask for an explanation and a proposed test without granting edit permission. Check both against the code.
4. Define an optional, narrowly scoped change. If the tool requests an action, read its scope; authorize only what you understand and what is necessary for the exercise.
5. Inspect every modified file, validate the test, and compare the result with the initial requirement. Reject or revert any unrequested change.

No command recipe or copyable configuration is included because the documentation distinguishes versions and policies that may change. Use the current official guide for your installation instead of adapting an old example.

## Validation and Troubleshooting

If the agent tries to do more than answer the query, cancel and review the permissions policy before continuing. If a rule does not have the expected effect, do not continue experimenting on a valuable project: return to a disposable folder and verify the current syntax. To measure quality, record factual errors, files touched, and approved actions, as well as whether the task was completed.

## Common Mistakes

- Confusing OpenCode with another assistant because of a similar name.
- Assuming a mode called “plan” or “ask” removes all ability to act without checking.
- Pasting configuration from another version or granting every permission to avoid warnings.
- Assuming a project is private just because the editor runs locally.
- Accepting formatting changes or extra files that do not solve the goal.

## In Summary

OpenCode is a coding-agent option that requires careful reading of its current documentation. Identify the version and provider, start with a harmless query, and review each permission. The agent can propose work; you validate it and decide which changes to keep.
