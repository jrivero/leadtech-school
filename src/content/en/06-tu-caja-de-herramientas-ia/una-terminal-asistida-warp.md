---
title: "An AI-Assisted Terminal: Warp"
description: "Use Warp to understand a harmless terminal task and review each proposed command before running it; protect history and secrets."
module: "06-tu-caja-de-herramientas-ia"
order: 12
duration: 30
level: "Beginner"
objectives:
  - "Recognize that an AI-assisted terminal can propose actions that affect files and systems."
  - "Ask for help with a read-only task and check the command before allowing it to run."
  - "Review privacy, permissions, and results without entering secrets in the history."
prerequisites:
  - "tu-entorno-terminal-git-y-editor"
  - "elegir-herramientas-sin-perder-el-control"
updatedDate: '2026-10-08'
sources:
  - label: "Warp: official quickstart documentation"
    url: "https://docs.warp.dev/quickstart/"
  - label: "Warp: agent permissions"
    url: "https://docs.warp.dev/agents/capabilities/agent-profiles-permissions/"
  - label: "Warp: privacy and security"
    url: "https://docs.warp.dev/support-and-community/privacy-and-security/privacy"
---

## Core Idea — Conceptual Explanation

A terminal runs instructions that can read, create, modify, or delete files and communicate with services. According to its current documentation, Warp combines a terminal with AI-assisted features. A suggested command is not harmless just because it appears as text: if you run it, it has the effects of the tools and permissions on your system. Modes, profiles, and capabilities can evolve, so check the official guide and the options visible in the version you use.

Ask the AI to explain a task before asking it to perform the task. For a beginner, “I want to see the names of the files in this practice folder; explain what you propose and do not run anything” sets a safer scope than “clean up my project.” If you then run an action, confirm the path, check whether it writes or deletes data, and read the output. Cancel if the proposal contains parts you do not understand.

Terminals may also keep a history or send context to a service. Warp publishes documentation on privacy and permissions; check the current terms for your account and organization before working with private code. Never paste passwords, tokens, keys, customer data, or environment variables into a request. Carefully review commands that install software, change permissions, download scripts, publish files, or delete content.

AI may correctly describe an instruction that it then runs incorrectly if the active folder is not the one you assume. Always check the directory and affected files using an application you know. To learn, keep a test folder with disposable data and use the terminal only for a read operation. You do not need to grant access to your entire computer.

## Concrete Example

You have created a practice folder with three fictional text files. You want to see what it contains without changing anything. Ask Warp to explain a listing operation, read the suggested command, and verify that it points to that folder. If the response proposes a command that deletes, moves, or downloads files, do not run it: it is unnecessary to complete the task.

## Guided Practice — Step-by-Step

1. Create a disposable folder with no sensitive information. Confirm its location in your file manager.
2. Open Warp and check the documentation to see which assisted features and permission controls are available in your environment. Do not enable automatic execution for this exercise.
3. Write a read-only request: ask it to explain how to list the folder's contents and not to run the action.
4. Read the proposal line by line. Check the path, arguments, and effects; ask what any element you do not understand does.
5. Run only a harmless operation you can verify. Compare the output with the file manager and confirm that nothing was created, moved, or deleted.
6. Check whether the input remained in the history and which data policy applies. Delete or protect the folder when finished, without including secrets in the session.

If Warp is not available, complete the same exercise with a terminal you already know and keep the explanation outside an AI tool. Do not install another tool to test a read command.

## Validation and Troubleshooting

Confirm that the result lists only files from the test folder and that the modification times have not changed. If the terminal returns an error, read the current directory before trying again; do not add administrator permissions to solve a path-selection mistake. If the AI recommends a write or network command, stop, check the documentation, and consider a manual alternative.

## Common Mistakes

- Running a generated instruction without checking the path or effects.
- Pasting a secret into a prompt or leaving it in the terminal history.
- Approving broad profiles or permissions to avoid confirmations.
- Treating Warp's explanation as a guarantee that the command is safe.
- Testing on a work or production folder instead of a disposable sample.

## In Summary

Warp can help explain terminal operations, but a command that runs can affect files and services. Start with a read-only query, review permissions, and confirm the path before acting. Keep secrets out of context and retain human control over every change.
