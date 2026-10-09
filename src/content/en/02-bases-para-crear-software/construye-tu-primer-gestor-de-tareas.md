---
title: "Build Your First Task Manager"
description: "Build a console task manager with add, list, and complete actions, and check its normal cases and boundaries before expanding it."
module: "02-bases-para-crear-software"
order: 7
duration: 50
level: "Beginner"
objectives:
  - "Represent a task with a title and status using Python data structures."
  - "Implement actions to add, display, and complete tasks."
  - "Check empty inputs, valid indexes, and menu boundaries."
prerequisites:
  - "Know lists, dictionaries, functions, conditions, and loops"
updatedDate: "2026-10-08"
sources:
  - label: "Official Python Tutorial: Data Structures"
    url: "https://docs.python.org/3/tutorial/datastructures.html"
  - label: "Official Python Documentation: JSON"
    url: "https://docs.python.org/3/library/json.html"
---

## First Define What It Should Do

An initial task manager can meet three needs: add a title, display tasks, and mark one as complete. We will not add accounts, synchronization, or a database; keeping the scope small makes it possible to understand every part. A task will have two pieces of data: `titulo` (Spanish for “title”), which is text, and `hecha` (Spanish for “done”), which starts as `False`. A list will store the tasks in memory while the program is open.

You can save the following program as `tareas.py` and run it with `python3 tareas.py` or `py tareas.py`. Write each part in order and run it before continuing; that way, you can locate an error as soon as it appears.

```python
def agregar(tareas, titulo):
    titulo = titulo.strip()
    if not titulo:
        print("Escribe un título.")
        return
    tareas.append({"titulo": titulo, "hecha": False})


def listar(tareas):
    if not tareas:
        print("No hay tareas.")
    for numero, tarea in enumerate(tareas, start=1):
        estado = "✓" if tarea["hecha"] else " "
        print(f"{numero}. [{estado}] {tarea['titulo']}")


def completar(tareas, numero):
    if numero < 1 or numero > len(tareas):
        print("Número fuera de rango.")
        return
    tareas[numero - 1]["hecha"] = True


tareas = []
while True:
    print("1 Añadir | 2 Listar | 3 Completar | 0 Salir")
    opcion = input("> ").strip()
    if opcion == "1":
        agregar(tareas, input("Título: "))
    elif opcion == "2":
        listar(tareas)
    elif opcion == "3":
        try:
            numero = int(input("Número: "))
            completar(tareas, numero)
        except ValueError:
            print("Introduce un número entero.")
    elif opcion == "0":
        break
    else:
        print("Opción desconocida.")
```

## Read the Example’s Decisions

`strip()` removes spaces at the beginning and end, so a title made up of spaces is treated as empty. `enumerate(..., start=1)` displays human-friendly numbers starting at one; before accessing the list, the program subtracts one because list positions start at zero. The `try` block prevents input such as “two” from closing the program when it is converted with `int`.

The functions receive the list explicitly, so they can be tested with different lists. The menu loop is the console interface; the rules for adding and completing live in separate functions. In this version, data disappears when the program closes. That limitation is intentional: verify the behavior first, then add persistence with JSON as an extension.

## Step-by-Step Practice

1. Create the file and write only `agregar` (“add”) and `listar` (“list”); run a manual test with a list created in the interpreter.
2. Add `completar` (“complete”) and confirm that selecting the first task changes its status.
3. Add the menu one branch at a time: first add, then list, complete, and exit.
4. Add two tasks, complete one, and check that the mark changes only on the selected task.
5. Test an empty title, an unknown option, text instead of a number, zero, and a number larger than the list.
6. Before considering it finished, explain what happens when the program closes and write down a future improvement without implementing it yet.

## Check Your Work and Troubleshoot

The task manager meets its scope if it adds a non-empty title, lists all tasks in order, changes only the selected task, and keeps the menu open after invalid input. If the program stops when you enter letters for the number, check that the conversion to `int` is inside `try`. If it completes the wrong task, review the difference between the displayed number and the index. If a newly added task does not appear, check that both functions receive the same list and that you did not reset `tareas` inside the loop.

A safe extension is to save the list on exit and load it at startup. Before working with JSON, define what should happen if the file does not exist or contains malformed data; those cases should not silently erase a valid list. Add persistence only after adding, listing, and completing work, and test the same rules again after each change.

Do not add editing, dates, and users yet: first make these three actions reliable. When saving to JSON, treat a missing or invalid file as a case that must be handled, and keep a copy before changing important data.

## Summary

This project brings together variables, lists, dictionaries, functions, conditions, loops, and console interaction. The important thing is not having many options, but making each rule visible and being able to demonstrate it with ordinary and error cases.
