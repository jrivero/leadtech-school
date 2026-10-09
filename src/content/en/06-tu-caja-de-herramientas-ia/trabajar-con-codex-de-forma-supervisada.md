---
title: "Working with Codex Under Supervision"
description: "Work with Codex on a narrowly scoped task: define permissions, ask for analysis first, review every change, and validate the result in a controlled environment."
module: "06-tu-caja-de-herramientas-ia"
order: 5
duration: 30
level: "Beginner"
objectives:
  - "Describe Codex as a coding assistant and distinguish its different interfaces."
  - "Limit a task to one directory and changes a person can review."
  - "Validate a suggested Codex change with tests and a diff before keeping it."
prerequisites:
  - "elegir-herramientas-sin-perder-el-control"
  - "vs-code-y-github-copilot-en-la-practica"
updatedDate: '2026-10-08'
sources:
  - label: "OpenAI Docs: Codex CLI"
    url: "https://learn.chatgpt.com/docs/codex/cli"
  - label: "OpenAI Docs: ChatGPT and Codex permissions"
    url: "https://learn.chatgpt.com/docs/permission-modes"
---

## Core Idea — Conceptual Explanation

**Codex** is an OpenAI coding agent that can help understand and modify projects. OpenAI documents more than one way to use it; the available interface and controls depend on the chosen surface and configuration. Before starting a task, check the official documentation for your environment. Do not assume that behavior in the desktop app also applies to a terminal or another integration.

Supervision has two parts. **Permissions** indicate which files, commands, or services the tool may try to use; **sandboxing** limits the environment or operations it can perform. A configured boundary does not make proposed code correct, and approving an action does not mean you should accept it. Check what is allowed before handing over the repository and avoid including passwords, tokens, keys, personal files, or customer data. Specific restrictions depend on configuration and should not be treated as a universal guarantee of isolation.

A small task needs a verifiable goal and visible scope: “explain what this function does” lets you start without changes; “change one condition in a file and add a test case” limits an intervention. Ask for a plan first, decide whether the files and actions are necessary, and authorize only the step you understand. When it finishes, inspect the diff, not the agent's description of its own work. Run appropriate tests and check that there are no additional changes.

Codex can speed up a work cycle, but the person remains responsible for the decision and the result. An isolated run also does not eliminate the risks of dependencies, malicious code, shared data, or logic errors. To learn, use a disposable folder or sample repository, and keep a recoverable copy before allowing any writes.

## Concrete Example

You have a practice page with a button that displays a greeting. Ask Codex to locate the component and explain how the text changes when the button is clicked, without modifying files. If the explanation matches the code, you can ask for a narrowly scoped update to the greeting and a manual test. It does not need access to credentials, external services, or permission to change other modules.

## Guided Practice — Step-by-Step

1. Create or open a sample project with no private data, secrets, or work code. Make sure you can restore the initial version.
2. Check the official documentation to see which working mode and permissions are active. Keep the task in a limited space and do not broaden access to the Internet or personal files.
3. Ask for read-only analysis: the relevant file, an explanation of its behavior, and a possible edge case. Do not authorize changes yet.
4. Write an acceptance criterion you can check. If you want to continue, ask for a proposal affecting only the necessary element and wait for any action request before approving it.
5. Review the diff file by file. Run the tests the project already provides or reproduce the case manually. Keep the change only if it meets the criterion and you can explain the new lines.

This lesson does not require a specific command; how you start Codex varies across products and versions. Follow the current official guide for the interface you actually use.

## Validation and Troubleshooting

If Codex explores more files than necessary, stop the task and reduce the context. If it proposes unexpected changes, reject them or restore the copy before continuing. If a test fails, compare the behavior with the original requirement instead of asking the agent to keep changing things until the error disappears. Note which permission and intervention were necessary.

## Common Mistakes

- Confusing a convincing explanation from the agent with a review of the diff.
- Giving it access to a real repository before checking permissions and data policies.
- Approving a command or change without knowing which files it can affect.
- Assuming the sandbox makes it safe to run any code or dependency.
- Asking for a broad task that cannot be evaluated in a short session.

## In Summary

Codex can participate in code analysis and changes, but it needs a clear scope, minimal permissions, and a person who reviews the work. Start with reading, authorize only necessary actions, and verify the diff with tests. Acceptance is always a human decision.
