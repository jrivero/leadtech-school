---
title: "Choose a Programming Paradigm"
description: "Choose a programming style based on a problem’s data, changes, and rules, not on trends or a universal preference."
module: "03-disenar-antes-de-programar"
order: 4
duration: 35
level: "Beginner"
objectives:
  - "Recognize procedural, object-oriented, and functional styles."
  - "Relate paradigms to a problem’s state and transformations."
  - "Justify a simple choice and revisit it if needs change."
prerequisites:
  - "Understand functions, collections, and basic objects"
updatedDate: "2026-10-08"
sources:
  - label: "Official Python Tutorial: Classes"
    url: "https://docs.python.org/3/tutorial/classes.html"
  - label: "Python HOWTO: Functional Programming"
    url: "https://docs.python.org/3/howto/functional.html"
---

## The Paradigm Serves the Problem

A paradigm offers a way to organize a solution. In the procedural style, a program is understood as steps and functions that transform inputs. In object-oriented programming, you group state and operations around concepts in the domain. In functional programming, you emphasize explicit transformations and aim for a function to produce a result from its inputs with few hidden effects. Python supports all three styles; you do not need to use only one throughout an application.

The official Python tutorial describes classes as a way to group data and functionality, and its functional programming HOWTO presents operations that transform inputs into outputs. These tools help you think, but no label replaces a concrete decision about the problem model.

## Three Ways to Look at a Task List

**Procedural:** a list of dictionaries and the functions `agregar` (“add”), `completar` (“complete”), and `listar` (“list”). The flow is easy to understand in a small program. **Object-oriented:** a `Tarea` (“Task”) class can group a title, status, and an operation to complete it. This can help when several rules protect each task’s state; a class for every trivial piece of data may be unnecessary overhead. **Functional:** a function filters pending tasks and returns a new list without modifying the input.

```python
def pendientes(tareas):
    return [tarea for tarea in tareas if not tarea["hecha"]]
```

This function is predictable if no task changes during the operation: the same data produces the same selection. By contrast, saving a file, printing a menu, or sending a notification has external effects that are best made visible. It is normal to combine a pure function that decides what to display with a procedural layer that writes to the screen.

## Criteria for Deciding

Ask where the state is and who can change it. If the rule mainly transforms collections, small functions help with composition and testing. If an entity has invariants that must always hold—for example, a loan cannot be extended after it has been returned—encapsulating operations with the state can prevent inconsistent changes. If the flow is linear and short, a procedural sequence is usually clearer than several layers.

Also consider how many people will modify the solution, which changes are likely, and which form is easiest to verify. Do not optimize for a hypothetical future: record the reason for your decision and revisit it when a real need arises, such as shared state that is difficult to control or rules repeated on several screens.

## Step-by-Step Practice

1. Model three tasks as dictionaries with `titulo` (“title”) and `hecha` (“done”).
2. Write a procedural operation to add a task and another to complete it.
3. Write `pendientes` (“pending”) as a transformation that does not modify the original list.
4. Sketch, without implementing, a class that prevents the same task from being completed twice.
5. Describe which style makes each rule most apparent and which requires the fewest concepts for the current size.
6. Choose a structure, test its behavior, and note what future change would justify reconsidering it.

## Check Your Work and Common Mistakes

Your choice is reasonable if each rule has a clear place, you can test the results, and another person understands how the state changes. If an object changes from many places, identify who should be responsible. If a function changes a list it receives, make that clear in its name or return a new list to avoid surprises.

Do not use inheritance just because there is an “is a” relationship, or turn every piece of data into a class. Do not call any code that uses `map` functional; the approach is also about how it handles effects and state. Avoid debates over labels: show an example, compare the costs, and change the design when the evidence justifies it.

## Summary

Procedural programming organizes steps, objects make state and behavior explicit, and the functional style expresses transformations. Choose the simplest structure that represents the current rules well, and leave room to improve it when the problem or its risks change.
