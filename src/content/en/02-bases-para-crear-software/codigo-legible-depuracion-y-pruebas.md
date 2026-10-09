---
title: "Readable Code, Debugging, and Testing"
description: "Improve code readability and reliability with clear names, systematic debugging, and small tests that check observable results."
module: "02-bases-para-crear-software"
order: 6
duration: 45
level: "Beginner"
objectives:
  - "Apply names and formatting that make Python code easier to read."
  - "Investigate a failure by comparing expected and observed results."
  - "Write and run a minimal unit test."
prerequisites:
  - "Know functions and control structures"
updatedDate: "2026-10-08"
sources:
  - label: "PEP 8: Style Guide for Python Code"
    url: "https://peps.python.org/pep-0008/"
  - label: "Official Python Documentation: unittest"
    url: "https://docs.python.org/3/library/unittest.html"
  - label: "Official Python Documentation: The pdb Debugger"
    url: "https://docs.python.org/3/library/pdb.html"
---

## Code Is Also Written for the Person Who Will Read It

A program can produce the correct answer and still be difficult to change if its names hide intent, its functions mix tasks, or its formatting is inconsistent. PEP 8 brings together conventions for Python, such as using four spaces per indentation level and keeping naming and spacing consistent. It is not an automatic quality test, and a team may have its own rules; its main value is reducing friction when reading.

Compare `x = p * q` with `total = unit_price * quantity`. The second example lets you recognize the rule without reconstructing what each letter means. A small function such as `calculate_total` is easier to test than one that asks for input, calculates, writes a file, and displays messages. Split work when each part can have a clear name and responsibility.

## Debug with Evidence

Debugging means investigating why actual behavior differs from expected behavior. Start with a reproducible input: write down what you ran, what result you wanted, and what you got. Reduce the case until the failure remains with the smallest amount of data. Read a traceback from the bottom to identify the exception type and the indicated line; then inspect the variables in that area.

For example, if a sum returns `None`, check whether the function prints the total instead of returning it. If an index is out of range, compare the number a person sees—which often starts at one—with the Python list index, which starts at zero. You can use a temporary print to see intermediate values, or `breakpoint()` to pause and inspect the state. Remove diagnostic prints when they are no longer useful.

## A Small Test

Tests preserve examples the program should continue to satisfy. To test an addition function with the standard `unittest` module:

```python
import unittest


def sumar(a, b):
    return a + b


class TestSumar(unittest.TestCase):
    def test_suma_enteros(self):
        self.assertEqual(sumar(2, 3), 5)
```

The identifiers `sumar`, `TestSumar`, and `test_suma_enteros` mean “add,” “TestAdd,” and “test_add_integers.” Save the file as `test_suma.py` and run `python -m unittest`. The test asserts an observable result: with inputs `2` and `3`, the return value should be `5`. Then add a test for negative numbers or zero, depending on what the program should accept. A test does not prove that no errors exist; it protects the behaviors you have defined.

## Step-by-Step Practice

1. Write a function `es_titulo_valido` (“is_title_valid”) that returns `True` when the text is not empty after trimming whitespace.
2. Run the function with `"Comprar leche"` (“Buy milk”), `"   "`, and `""`; record the expected output before testing.
3. Turn those examples into automated tests.
4. Deliberately change the condition so one case fails. Run the test suite and read which assertion failed.
5. Fix the function without changing the test’s expectation, then run all the tests again.
6. Review names, indentation, and each function’s boundaries before saving the change.

## Check Your Work and Common Mistakes

A useful test fails when the behavior does not meet the rule and passes when it does. If it fails, distinguish whether the expectation is wrong or the code does not follow an agreed rule. Do not delete the test just to get a green result. If a test depends on a global variable or the actual time, it may be fragile; pass those values as parameters when reasonable.

Do not try to debug the whole program at once. Do not ignore a traceback because it looks long; first locate the final line and error type. Do not automatically equate more tests with more quality, either: each test should check meaningful behavior and produce output that is easy to interpret.

## Summary

Write for people, reproduce the failure, inspect evidence, and preserve rules with small tests. Consistent formatting makes code easier to read; debugging explains the current failure, and tests warn you when a change breaks known behavior.
