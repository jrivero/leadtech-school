---
title: "Your Environment: Terminal, Git, and Editor"
description: "Identify the parts of a development environment and practice safe commands, editing, and version control without confusing Git with the whole project."
module: "02-bases-para-crear-software"
order: 2
duration: 40
level: "Beginner"
objectives:
  - "Distinguish a terminal, working folder, editor, and interpreter."
  - "Navigate folders and run a file with basic commands."
  - "Explain what Git, the staging area, and a commit record."
prerequisites:
  - "Have run a Python file"
updatedDate: "2026-10-08"
sources:
  - label: "Pro Git: Version Control and Recording Changes"
    url: "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control.html"
  - label: "Visual Studio Code: Getting Started"
    url: "https://code.visualstudio.com/docs/getstarted/overview"
---

## The Parts of Your Workbench

An editor is used to read and change files. A terminal accepts text commands and runs them through a command interpreter called a shell. The current folder determines which files some commands operate on. Python, in turn, runs `.py` files. These tools may appear in separate windows or be integrated into an editor; understanding their roles helps you avoid blaming the wrong tool for an error.

A project is a folder containing related files. You can open it in an editor as a workspace, create a file, and use the integrated terminal to run the program. Git is a separate tool: it records changes over time so you can compare versions and recover earlier ones. Git is not required to run Python, although it becomes valuable when you start changing a project.

## Navigate with Confidence

Some useful commands are `pwd` to show the current folder, `ls` on macOS/Linux or `dir` on Windows to list its contents, and `cd folder-name` to enter another folder. `python3 hola.py` runs the file if Python is installed and the terminal is in the right location. On Windows, the command may be `py hola.py`. Start with commands that inspect things, and avoid copying commands that delete or overwrite files unless you understand what they do.

In the editor, create a practice folder, open that folder, and add `hola.py`. Change a line, save, and run it from the terminal. If the file does not appear, check that the editor opened the correct folder rather than just an empty window. Folder and file names are part of the path; `hola.py` inside `ejercicios` is not the same destination as `hola.py` somewhere else.

## A First Pass with Git

In a Git repository, `git status` summarizes what has changed. `git add hola.py` stages the specific content you want to include in the next commit; it does not necessarily mean “save forever.” `git commit -m "Añade saludo inicial"` creates an identifiable snapshot of the staged state. The file can still change afterward, so check `git status` again.

The usual sequence is to edit, review the diff, stage intentional changes, and commit with a message that explains their purpose. You do not need Git to finish this exercise. If the current folder is not a repository, `git status` will say so; that does not mean Python failed. Do not initialize a repository or connect a remote account unless you know why you are doing it or the project policy allows it.

## Step-by-Step Practice

1. Open a new folder named `entorno-practica` in the editor.
2. Create `hola.py`, save a `print` instruction, and run it from the integrated terminal.
3. Use `pwd`/`ls` or `cd`/`dir` to check your current folder and the files it contains.
4. If you have Git installed, run `git status` only in a folder that is already a repository. If it is not, continue without Git.
5. In your own practice repository, modify the file and inspect the change with `git diff`; then you can stage and commit it if you understand each command.
6. Change folders and run the file again. Explain why the same command may or may not find the file depending on your location.

## Check Your Work and Common Mistakes

You have completed the practice if you can explain which tool edits, which one runs the program, where it looks for the file, and what a Git commit does. “No such file” or “file not found” usually points to a wrong path; check the current folder before randomly renaming files. If `python` is not recognized, check the command name and the installation. If Git says you are not in a repository, do not try to fix it with destructive commands: using a repository is optional.

Do not type sensitive commands you find in an automated response without reading them. A command can delete files even if it looks routine. First learn to distinguish commands that inspect from commands that modify the disk; when in doubt, consult the documentation or ask for a specific explanation.

## Summary

The editor, terminal, interpreter, and Git serve different purposes. Practice in your own folder, always check where you are, and use Git to preserve changes when the project calls for it. A clear environment reduces errors, but you do not need to configure every tool to learn.
