---
title: "Languages, Objects, and Functional Programming"
description: "Compare procedural, object-oriented, and functional styles using small examples to choose the clearest approach for a problem and its state needs."
module: "02-bases-para-crear-software"
order: 4
duration: 40
level: "Beginner"
objectives:
  - "Distinguish programming languages from the paradigms that organize code."
  - "Explain when to group data and behavior into objects."
  - "Recognize pure functions and transformations as tools of the functional style."
prerequisites:
  - "Know basic variables, functions, and conditions"
updatedDate: "2026-10-08"
sources:
  - label: "Official Python Tutorial: Classes"
    url: "https://docs.python.org/3/tutorial/classes.html"
  - label: "Official Python Documentation: Functional Programming Modules"
    url: "https://docs.python.org/3/library/functional.html"
---

## A Language and a Paradigm Are Different Ideas

A language defines how to write instructions and which operations it offers; a paradigm is a way to organize reasoning and code. Python lets you use several styles, so you do not have to choose one identity for your entire career. The best structure depends on the data, the rules, and how easily another person can understand the next change.

In the procedural style, a program is organized as a sequence of steps and functions: read tasks, filter pending ones, and display them. It is direct for small scripts. In object-oriented programming, you group related data and operations into objects that have state and behavior. In the functional style, you compose transformations and prefer functions that depend on their inputs and produce results without hidden effects. These are lenses that can be combined, not categories that always exclude one another.

## One Problem, Three Organizations

With a task list, the procedural approach might keep a list and call `agregar` (“add”), `completar` (“complete”), and `listar` (“list”). A class could represent each task and store its title and status; another class could coordinate the collection. This is useful when rules and state clearly belong to an entity, but creating classes for every simple piece of data also adds unnecessary layers.

The functional approach can create a function that filters tasks without modifying the original list:

```python
def pendientes(tareas):
    return [tarea for tarea in tareas if not tarea["hecha"]]
```

The function `pendientes` (“pending”) receives a list of tasks. If it is given the same list, it calculates a result without changing its items. A function like this is easier to test because you can inspect the relationship between input and output. By contrast, saving a file, printing to the screen, or changing a shared object are effects that are best kept in a visible place.

## How to Decide

First ask where the state lives. If there is little data and the rules are simple, a function with dictionaries may be enough. If many operations must protect an entity’s invariants—for example, a loan cannot be returned twice—encapsulating its rules may improve consistency. If the task is to transform collections, small functions that do not change their input are often clear.

Also consider the cost of learning the design, the size of the problem, and the changes that are likely. A class does not automatically make a program maintainable; a chain of anonymous functions is not necessarily functional in a useful sense either. Prioritize a structure that is easy to test, name the intent, and avoid hiding state changes behind operations that look like reads.

## Step-by-Step Practice

1. Define three tasks as dictionaries with the keys `titulo` (“title”) and `hecha` (“done”).
2. Write a procedural function to add a task and another to filter pending tasks.
3. Rewrite the filtering transformation as a list comprehension, taking care not to change the input.
4. Sketch a `Tarea` (“Task”) class with title and status attributes, but do not implement it yet.
5. Compare which style makes the rule “a completed task must not appear again as pending” most obvious.
6. Decide which style you would use for this small case and write down what future change would justify revisiting that decision.

## Check Your Work and Common Mistakes

Check that the filtering functions return the expected tasks and leave the original list unchanged. If an object is modified from several places, find out who is responsible for that state. If you need to explain a class with phrases like “just in case,” you may not yet have a concrete need for introducing it.

Do not confuse “object-oriented” with putting everything into classes or “functional” with avoiding every variable. The goal is not to follow a label: it is to make data, rules, and effects visible. Do not compare languages only through the compiled/interpreted dichotomy, either; their implementations can translate or run code in several ways.

## Summary

Procedural programming organizes steps, objects group state and behavior, and the functional style emphasizes explicit transformations. Python supports all three. Start with the simplest structure that represents your rules well, and change it when a concrete need justifies doing so.
