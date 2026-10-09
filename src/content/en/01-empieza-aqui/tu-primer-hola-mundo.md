---
title: "Your First Hello World"
description: "Write, run, and modify a minimal program to understand what code does, where its output appears, and how to check that your first test works."
module: "01-empieza-aqui"
order: 1
duration: 25
level: "Beginner"
objectives:
  - "Explain what a program is and distinguish code from output."
  - "Run a Python file from a terminal or editor."
  - "Modify an example and check the result."
prerequisites: []
updatedDate: "2026-10-08"
sources:
  - label: "Official Python Tutorial: An Informal Introduction"
    url: "https://docs.python.org/3/tutorial/introduction.html"
---

## The Idea Behind a First Program

A program is a sequence of instructions that a computer interprets or executes to produce a result. You do not need to understand the entire language yet: your first goal is to go through the complete work cycle. You write an instruction, save it, run it, observe what happened, and compare the result with what you expected. Repeating that cycle many times is part of everyday programming.

We will use Python because its syntax makes the instruction easy to see. In a local setup, a file usually ends in `.py`. You can edit it with any text editor; a code editor adds features such as syntax highlighting and error detection, but it does not change what the program means.

## Guided Example

Create a file named `hola.py` and write exactly this:

```python
print("¡Hola, mundo!")
```

Save the file. Open a terminal in the folder that contains it and run `python3 hola.py`; on some computers, the command is `python hola.py` or `py hola.py`. You should see one line containing the greeting. `print` asks Python to display a value; the parentheses group what is passed to the function, and the quotation marks delimit text. The output appears in the terminal; it is not automatically saved inside the file.

Now customize the example:

```python
nombre = "Lucía"
print(f"¡Hola, {nombre}!")
```

The first line assigns text to a name, called a variable. The second builds another piece of text using that value. Replace the name in the example with your own, save, and run it again. Before running it, predict what will appear: anticipating the result is a simple way to check whether you understand each change.

## Step-by-Step Practice

1. Create a folder named `primer-programa` and save `hola.py` inside it. Notice that the file name and folder name are different things.
2. Run the original example and copy the expected result into a note.
3. Change the greeting so it appears on two lines, using two calls to `print`.
4. Add a variable named `objetivo` with a topic you want to learn, then display a sentence that includes it.
5. Deliberately misspell one letter in `print`, run the program, and read the error message. Then restore the correct spelling.
6. Describe in your own words what you wrote, what you ran, and what result you saw. That explanation is more valuable than memorizing the line.

## Check Your Work and Troubleshoot

The exercise is complete if you can run the file twice, change the text without help, and explain why the greeting appears. If the terminal says it cannot find the file, check the current folder with `pwd` on macOS/Linux or `cd` on Windows, and list its contents with `ls` or `dir`. If it says `python3` does not exist, the interpreter may not be installed or may have a different command name; try `python --version` or `py --version` and check the Python installation before continuing.

A `SyntaxError` often points to a misspelled quotation mark, parenthesis, or character. Check the indicated line and the one before it: the location shown by the interpreter is a clue, but not always the exact source. If nothing appears, confirm that you saved the right file and that it contains a call to `print`.

## Common Mistakes

Do not confuse writing code with running it: saving only updates the file. Also avoid changing several things at once at the beginning; if the result changes, it will be hard to know which modification caused it. Pay attention to uppercase and lowercase letters: `print` and `Print` are different names. Do not paste typographic quotation marks such as `“ ”` instead of straight quotation marks; Python expects the punctuation used by the language.

## Summary

You created a file, ran an instruction, and compared the result with a prediction. That small method—make a small change, run it, observe, and explain—will serve you throughout the following topics. The next step is not to write a lot, but to get one small idea working and understand why it works.
