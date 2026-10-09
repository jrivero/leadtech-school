---
title: "Break Down Problems and Think in Algorithms"
description: "Turn a broad need into ordered steps, edge cases, and a procedure you can execute by hand before turning it into code."
module: "02-bases-para-crear-software"
order: 1
duration: 35
level: "Beginner"
objectives:
  - "Identify a problem’s inputs, outputs, and rules."
  - "Divide a task into small, ordered steps."
  - "Test an algorithm with ordinary examples and edge cases before coding it."
prerequisites:
  - "Your First Hello World"
updatedDate: "2026-10-08"
sources:
  - label: "Official Python Tutorial: Control Flow Tools"
    url: "https://docs.python.org/3/tutorial/controlflow.html"
---

## Before Code, Write a Procedure You Can Check

An algorithm is a finite sequence of steps that transforms inputs into a result. It does not have to be written in a programming language: a list of instructions, a table, or a diagram may be enough to understand the solution. Algorithmic thinking means being precise about what data you receive, what result you must produce, which rules apply, and what should happen when data is missing or an unusual case appears.

Consider the question “which tasks are pending?” The input is a collection of tasks; the output will contain only those whose status is pending. Before writing code, choose a small example: three tasks, two pending and one completed. Follow the procedure by hand and check that it keeps the two correct tasks in the same order.

## Break Down the Problem

A useful strategy has four moves. First, restate the problem without vague language. Second, separate the input from the output. Third, turn each rule into an observable decision. Fourth, arrange the decisions in an order you can follow. For the task list, the procedure might be:

1. Create an empty list for the result.
2. Go through each task in the input, one at a time.
3. Check its `hecha` field (`hecha` is the Spanish identifier for “done”).
4. If its value is `False`, add that task to the result.
5. Return the final list.

This outline already suggests a loop, a condition, and an output collection, but it does not depend on syntax yet. That separation helps when you change languages or discover that you misunderstood a rule.

## From Algorithm to a Python Example

```python
def pendientes(tareas):
    resultado = []
    for tarea in tareas:
        if not tarea["hecha"]:
            resultado.append(tarea)
    return resultado
```

The function `pendientes` (“pending”) receives a list of dictionaries. `for` visits each item; `if` decides whether to add it; `return` provides the result. Mentally test an empty list: the loop does not run, and the function returns another empty list. Test a completed task: it is not added. These cases show why small examples are more useful than testing only a large list at the end.

Not every task needs several levels of decomposition. The goal is to reduce the mental load until every step has a clear verb: read, compare, add, select, save. If an instruction such as “manage tasks” contains many decisions, divide it into separate operations: add, list, complete, and save.

## Step-by-Step Practice

1. Choose an everyday problem, such as calculating the total cost of a purchase.
2. Write down the inputs: a list of prices and, if applicable, a discount.
3. Define the output in a precise sentence: the final amount in the same currency.
4. Write the procedure without code. Decide what happens with an empty list, a price of zero, and a negative price.
5. Test the procedure by hand with `[3, 5, 2]`; the total before discounts should be `10`.
6. Only then translate the procedure into a function and test the same cases.

## Check Your Work and Common Mistakes

An algorithm is clear enough to begin when another person can follow the steps with the same data and reach the same result. Check an ordinary case, an empty case, and a relevant boundary. If a rule cannot be described as a testable decision—for example, “make the list feel more useful”—clarify the need again before coding.

Avoid starting with tools or an interface before you know what should happen. Do not group several tasks into one step that hides multiple rules. Do not confuse “it finishes” with “it produces the correct output”: a function can finish and still include a completed task because it used the wrong condition.

## Summary

Specify inputs, output, and rules; break the work into ordered steps; test the procedure by hand, then code it. Edge cases are not decorative: they reveal assumptions before they turn into errors that are hard to find.
