---
title: "VS Code and GitHub Copilot in Practice"
description: "Use VS Code and GitHub Copilot to understand or modify a small function; inspect the change and check its behavior before keeping it."
module: "06-tu-caja-de-herramientas-ia"
order: 2
duration: 30
level: "Beginner"
objectives:
  - "Distinguish the VS Code editor from GitHub Copilot's assistance features."
  - "Request a narrowly scoped change with context and observable acceptance criteria."
  - "Review the diff and manually validate suggested code before incorporating it."
prerequisites:
  - "elegir-herramientas-sin-perder-el-control"
  - "codigo-legible-depuracion-y-pruebas"
updatedDate: '2026-10-08'
sources:
  - label: "Visual Studio Code: setting up Copilot"
    url: "https://code.visualstudio.com/docs/setup/copilot"
  - label: "GitHub Docs: Copilot guide for the IDE"
    url: "https://docs.github.com/en/copilot"
---

## Core Idea — Conceptual Explanation

**Visual Studio Code** is a code editor that can be extended with extensions and assistants. **GitHub Copilot** is a family of assistance features that integrates into different environments, including VS Code. The exact interface and available capabilities may change depending on the version, account, organization, and configuration. Consult the official instructions for your installation; do not treat an old video as confirmation that a button is still there.

An inline suggestion can complete code as you type; a conversation can explain a function or propose a change. Some configurations offer modes with greater ability to explore the project or suggest actions. These are not the same as accepting an autocomplete line: when an assistant can read more files or propose broad changes, check what context it uses and what it intends to modify. The assistant does not automatically know your team's rules or the application's expected behavior.

To work effectively, narrow the task to a function or file and describe the expected result, constraints, and how to test it. Ask for an explanation or plan first if you do not understand the code. Then compare the proposal with the requirements, review the diff, and run the project's existing checks. Do not accept code just because it compiles: it may still mishandle an edge case, expose information, or break an interaction.

The code you share also has context. Before opening a work repository, check the applicable privacy, extension, and telemetry policies; do not paste secrets or customer data into a chat. In a company project, confirm which provider and configuration are authorized. If Copilot is not available in your account or environment, you can do the same exercise by writing the solution yourself and using the checklist.

## Concrete Example

Imagine a function that receives a list of fictional activities and must sort them by date. The expected result is clear: keep all activities, sort from soonest to latest, and do not modify the original list. Copilot can propose an implementation or test cases, but you must check what happens with an empty list, matching dates, and incomplete data.

## Guided Practice — Step-by-Step

1. Open a test project with no credentials or real data. Find a small function whose purpose you can explain.
2. Write down the input, output, and two edge cases in plain language. Ask Copilot to explain the current function and point out possible bugs, without changing anything yet.
3. If the explanation matches the code, ask for a proposed change that meets the criteria you recorded. Limit the scope to one file; do not ask it to clean up or rewrite the whole project.
4. Read every part of the diff. Check names, conditions, default values, and dependencies. Reject lines you cannot explain.
5. Run the existing tests or carry out the manual cases in a copy. Record one case that passes and one that previously failed; keep the change only if it meets the criterion.

This practice describes a conceptual workflow, not installation instructions or a promise that all accounts have identical features. The official VS Code and GitHub documentation is the reference for the current interface controls.

## Validation and Troubleshooting

If Copilot modifies files you did not request, revert that part and ask again for a narrower change. If it proposes a new library, ask what need it addresses and avoid adding it just because it appears in the response. If tests fail, do not ask it to change the tests too until they pass without understanding why: first compare the behavior with the original criteria.

## Common Mistakes

- Confusing the editor with the AI provider or assuming both products have the same controls.
- Accepting a batch of changes without reading the diff.
- Using file names, examples, or variables that contain real secrets.
- Asking “improve this project” without a limit or acceptance test.
- Believing that a correct answer in one case proves the code is safe and general.

## In Summary

VS Code provides the workspace; Copilot can help explain, propose, or complete code depending on the available configuration. Define a small task, ask for context before making changes, and review every line. The result that counts is the one that passes a verifiable test and that you can explain yourself.
