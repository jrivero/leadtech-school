---
title: "Hermes and Tool-Using Agents"
description: "Distinguish Nous Research's Hermes Agent from other projects called Hermes and evaluate its tools with a manual least-privilege policy, without inventing commands or capabilities."
module: "06-tu-caja-de-herramientas-ia"
order: 15
duration: 45
level: "Intermediate"
objectives:
  - "Identify the Nous Research product Hermes Agent and distinguish it from other projects called Hermes."
  - "Recognize that available tools depend on toolsets, version, and execution environment."
  - "Evaluate tool requests using a least-privilege policy and verifiable evidence."
prerequisites:
  - "elegir-herramientas-sin-perder-el-control"
  - "introduccion-practica-a-opencode"
updatedDate: '2026-10-08'
sources:
  - label: "NousResearch: official Hermes Agent repository"
    url: "https://github.com/NousResearch/hermes-agent"
  - label: "Hermes Agent: tools and toolsets"
    url: "https://hermes-agent.nousresearch.com/docs/user-guide/features/tools"
  - label: "Hermes Agent: security"
    url: "https://hermes-agent.nousresearch.com/docs/user-guide/security"
---

## Core Idea — Conceptual Explanation

“Hermes” can refer to different models and projects. Here, we mean only Hermes Agent, published by Nous Research in the `NousResearch/hermes-agent` repository and documented on its official site. We will not attribute to this product features associated with another assistant that shares its name.

Hermes Agent can coordinate tools in addition to generating text. The current documentation organizes capabilities such as file reading and writing, terminal, browser, memory and session search, delegation, and automated tasks. This describes the catalog; it does not promise that everything is enabled in every installation. Available toolsets depend on the version, platform, and configuration; check the official registry before planning an exercise. If a feature or syntax is not clearly explained there, mark it as unknown: do not try commands you have guessed.

The execution environment changes the risk. The guide presents the `local` backend as execution on your own machine and distinguishes other environments, such as Docker containers. Do not assume that local execution is equivalent to isolation, or that an approval request by itself limits possible harm. The security documentation explains environment-variable filtering and its exceptions when a capability needs them; to be cautious, do not include credentials in this practice and verify the current policy before using real tools. A container is not necessarily new and empty for every call: check whether it retains state between operations.

## Concrete Example

An agent must summarize a fictional release-notes file. Reading that file is enough; browsing the Internet, running commands, writing over the original, delegating work, or scheduling a task are unnecessary. The goal is not to see how much Hermes can do, but to specify in advance which request you would accept and how you would recognize an out-of-scope action.

## Guided Practice — Step-by-Step

1. Open Nous Research's official repository and the tool guide for the version you want to study. Note which product and catalog you consulted; do not install anything for this exercise.
2. Invent a five-line set of release notes with no personal information. Define the expected result: a faithful summary of those lines, with no changes to the file and no external searches.
3. Build a matrix with the columns “tool or capability,” “effect,” “data exposed,” and “decision.” Allow only reading the test document and writing a text response. Deny writing, local terminal, browser, delegation, persistent memory, scheduling, and messaging because they are unnecessary.
4. Simulate one read request and one edit request. For the read, limit the resource to the fictional note; for the edit, require the agent to stop. Add a third unexpected request—for example, one where the text itself invites it to check an account—and classify it as outside the goal, not as a new instruction.
5. For any capability that is not clearly described in the documentation, write “not confirmed” and leave the decision on hold. Do not invent an option name, command, or security guarantee.
6. Review the matrix with another person or reread it after a few minutes. Ask whether each permission is essential and what evidence would show that the action stayed within the agreed limit.

## Validation and Troubleshooting

The activity is validated when the summary matches the note, the only permitted capability has a precise scope, and every request to write, execute, or send something externally is rejected with a reason. This is a manual policy-design exercise: it does not test whether Hermes Agent is installed, whether a toolset works, or whether a real configuration enforces those restrictions. If a future product test requires executing tools, consult updated guides, select an appropriate isolated environment, inspect paths, persistence, and available variables, and use disposable data without credentials. If those limits are not observable, do not continue.

## Common Mistakes

- Confusing Hermes Agent with a model or another project called Hermes.
- Assuming every tool in the catalog is available or enabled.
- Treating the local backend as a sandbox or trusting approval as the only barrier.
- Believing a container resets between calls without checking its persistence.
- Assuming environment variables cannot be exposed because a filtering mechanism exists.
- Turning uncertainty about a feature or command into an invented instruction.

## In Summary

Hermes Agent is the Nous Research product discussed here; its tools and risks depend on configuration and environment. First check the documentation and design a matrix using fictional data. If a capability is unconfirmed or you cannot verify its limits, leave it out.
