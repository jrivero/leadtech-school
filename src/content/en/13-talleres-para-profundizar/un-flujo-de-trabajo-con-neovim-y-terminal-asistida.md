---
title: "A Workflow with Neovim and an AI-Assisted Terminal"
description: "Practice an edit, terminal, and review cycle in Neovim; use Lua for small shortcuts and reserve assistant actions for tasks you can verify."
module: "13-talleres-para-profundizar"
order: 1
duration: 50
level: "Intermediate"
objectives:
  - "Organize a Neovim session with a file, terminal, and visible checkpoints."
  - "Create a simple Lua shortcut and explain what it does without relying on plugins."
  - "Limit a terminal assistant's help and review every change before keeping it."
prerequisites:
  - "Manage files from the terminal and know Vim or Neovim's Normal and Insert modes."
  - "Know how to read a diff and run an existing project test."
updatedDate: "2026-10-08"
sources:
  - label: "Neovim official manual: Lua and mappings"
    url: "https://neovim.io/doc/user/lua-guide/"
  - label: "Neovim official manual: integrated terminal"
    url: "https://neovim.io/doc/user/terminal/"
---

## A short workflow, not a collection of shortcuts

Neovim is useful when you reduce context switching: read the code, make a small change, run a check, and review the result in the same session. An AI-assisted terminal can suggest commands or explain errors, but it does not replace your judgment or repository review. This workshop uses a fictional task project; it does not require installing plugins, enabling external services, or granting the assistant permissions.

Before asking for help, be specific about three things: which file or behavior you are examining, what outcome you expect, and what actions you are not authorizing. A safe request would be: “Explain why this function accepts an empty title; do not edit files or run commands. Suggest two test cases.” If the tool can execute commands, start with a read-only request. Do not paste keys, personal data, private logs, or excerpts you are not allowed to send.

## Set up an understandable workspace

Open the file you want to study and split the window to show a terminal. In Neovim, you can type `:vsplit` and then `:terminal`, or open a specific process in one command with `:vsplit term://{command}`. In Terminal-mode, `Ctrl-\` followed by `Ctrl-n` returns control to Normal mode. The integrated terminal is a Neovim buffer connected to a process; it is not a sandbox. Therefore, a command there can modify files just like a command in any other terminal.

A minimal Lua shortcut can remove repetitive steps without hiding what will happen:

```lua
vim.keymap.set('n', '<leader>t', function()
  vim.cmd('vsplit')
  vim.cmd('terminal')
end, { desc = 'Abrir terminal vertical' })
```

The first string indicates Normal mode, the second is the key combination, and the function first opens a split and then the terminal. `desc` makes an explanation visible when you inspect the mappings. Save the snippet in your personal configuration only after testing it; for this exercise, it is enough to read it and check the sequence in an installation you already have.

## Activity: investigate a failure without giving up control

1. Choose a small function that filters pending tasks, or sketch this rule: an empty task is not added, and a valid one starts as incomplete.
2. Open its file in Neovim, identify the input, output, and an edge case. Before changing code, write down the expected result for `""`, spaces, and `"Read"`.
3. In the integrated terminal, run only inspections appropriate to the project, such as `pwd`, `rg -n "pendientes|agregar" .`, or the documented test. Do not run a suggested recipe without reading each argument.
4. Ask the assistant for an explanation or a narrowly scoped diff proposal. If it suggests changes, apply them yourself or review the diff line by line; reject anything that does not serve the objective.
5. Run the existing test and review `git diff --check` and `git diff` when the project uses Git. If there is no Git, compare the file before and after and keep a copy of the test case.
6. Write one sentence connecting the change to observable behavior: “after trimming spaces, validation detects that the title is still empty.”

A valid result is not “the assistant said it works,” but that the defined cases distinguish the previous behavior from the new one. If you cannot run the project, make clear that the review was static and do not present an imaginary test as evidence.

## Troubleshooting and common mistakes

If the mapping does not appear, check that it is loaded from the correct configuration and that the shortcut does not depend on a `leader` variable you did not know about; the default value does not always match your habits. If you see strange text in the terminal, check that you are in Terminal-mode before typing commands and return to Normal mode with the indicated key combination. If Neovim cannot find `rg`, use the available search or inspect the file; do not install tools just for this exercise.

A process mistake is accepting a broad suggestion that combines cleanup, dependency updates, and a bug fix. Split the task, request one change at a time, and compare the diff with the scope. Also, do not confuse “the editor and assistant share context” with “the assistant is authorized to read secrets.”

## Wrap-up

A good session alternates reading, editing, and verification through visible steps. Use Neovim to navigate and the terminal for explainable commands; use the assistant to generate hypotheses, not to validate its own work. Keep only changes you understand, that meet the objective, and that pass a reproducible check.
