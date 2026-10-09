---
title: "Variables, Functions, and Control Structures"
description: "Learn to name data, group operations into functions, and choose conditions and loops to express simple rules in Python."
module: "02-bases-para-crear-software"
order: 3
duration: 40
level: "Beginner"
objectives:
  - "Create variables with names that explain the data they hold."
  - "Define functions that receive parameters and return results."
  - "Use conditions and loops to express decisions and repetitions."
prerequisites:
  - "Have written and run a Python print instruction"
updatedDate: "2026-10-08"
sources:
  - label: "Official Python Tutorial: Control Flow Tools"
    url: "https://docs.python.org/3/tutorial/controlflow.html"
---

## Named Data and Reusable Actions

A variable associates a name with a value: `cantidad = 3` (Spanish for “quantity”) lets the rest of the program use the quantity without repeating the number. A name should communicate its purpose. `precio_unitario` (“unit price”) explains more than `x`, and `tareas_pendientes` (“pending tasks”) is clearer than `datos` (“data”). In Python, the value’s type matters too: `3` is an integer, `3.5` is an approximate decimal number, and `"3"` is text. Although they may look similar, they are not interchangeable in every operation.

A function groups steps that form a named operation. It receives parameters, may calculate a result, and provides it with `return`. For example:

```python
def calcular_total(precios):
    total = 0
    for precio in precios:
        if precio > 0:
            total += precio
    return total
```

The function `calcular_total` (“calculate total”) goes through each price. `for` repeats the block for each item; `if` includes only positive values; `+=` accumulates them. If the input is `[4, 6]`, the result is `10`. A non-positive value is skipped under this particular rule. In a real application, it might be better to reject it instead; the decision should reflect the requirements, not the convenience of the syntax.

## Conditions and Loops Express Rules

`if`, `elif`, and `else` let you choose a path. A condition can combine comparisons with `and` or `or`. For example, a task can be marked overdue if it is not done **and** its due date is earlier than today. Write conditions with names and parentheses when that makes them easier to read; do not try to compress decisions into a single line.

A `for` loop is useful when you know which collection you want to go through. A `while` loop repeats as long as a condition remains true, for example, while someone has not chosen to exit a menu. In a `while` loop, make sure you know what will cause the condition to stop being true; otherwise, you may create an infinite loop. `break` exits the loop, but use it only when it improves understanding over a more explicit condition.

## Step-by-Step Practice

1. Define a function `calcular_total` (“calculate total”) that takes a list of prices and returns the sum without displaying it inside the function.
2. Add a documented condition: decide whether a negative price should be ignored or raise an error. Write down why.
3. Call the function with `[4, 6]`, `[0]`, and an empty list. Predict the result before running it.
4. Add `descuento` (“discount”) as a parameter and calculate the discount as a fraction between `0` and `1`, for example `0.1` for ten percent.
5. Test discounts of `0`, `0.1`, and `1`. If you do not want to allow values outside that range, check and reject invalid inputs.
6. Rename a variable so that someone reading the code can guess what it contains.

## Check the Behavior

The function should return a number and produce consistent results for the test inputs. Distinguish between a visible result (`print`) and a result another function can reuse (`return`). If a `TypeError` appears, check the type of each argument: perhaps you added text to a number. If you get `None`, check whether you forgot `return` or called a function that only prints.

Also test the boundaries of each condition. An expression `amount < 100` does not accept exactly `100`; perhaps you need `<=`. Read the rule in plain language and compare it with the operator. If a loop processes an item too many times, temporarily print the iteration value or test a two-item list before expanding the case.

## Common Mistakes

Avoid long functions that mix input, calculation, and presentation. Do not use global variables to share every piece of data; pass it as a parameter when it belongs to the operation. Do not name a value `total` before it is actually a total. And do not assume a function calculates something just because it is named `calcular`; execution and tests determine its behavior.

## Summary

Variables name values, functions group operations, conditions choose, and loops repeat. Express a rule simply, test ordinary inputs and boundaries, and decide deliberately how to handle invalid data.
