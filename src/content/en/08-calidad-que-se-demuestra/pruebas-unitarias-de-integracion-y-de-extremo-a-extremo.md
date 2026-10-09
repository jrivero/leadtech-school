---
title: "Unit, Integration, and End-to-End Tests"
description: "Choose the test level according to risk: check an isolated rule, real collaboration between components, and a user-visible journey."
module: "08-calidad-que-se-demuestra"
order: 1
duration: 40
level: "Intermediate"
objectives:
  - "Distinguish unit, integration, and end-to-end tests by the boundary they exercise."
  - "Choose positive, negative, and boundary cases for a small function."
  - "Use a test failure to locate which behavior needs review."
prerequisites:
  - "Know functions, inputs, and outputs in a programming language."
  - "Have run a local test."
updatedDate: '2026-10-08'
sources:
  - label: "Python: unittest framework documentation"
    url: "https://docs.python.org/3/library/unittest.html"
  - label: "Playwright: browser test assertions"
    url: "https://playwright.dev/docs/test-assertions"
---

## Choose which boundary to test

A unit test checks a small rule in isolation, usually without a real network, browser, or database. An integration test observes whether two or more pieces collaborate correctly across a boundary—for example, whether a repository translates a domain task into the expected persistence format. An end-to-end (E2E) test follows the product from an interface similar to the one a user sees through to a visible result. There is no universal ratio between levels; cost and confidence depend on the system and its risk.

Imagine the “create a task” function. A unit test can reject an empty title and normalize whitespace. An integration test can save and read a task back through a temporary repository. An E2E test can open the screen, enter the title, click “Add,” and check that it appears in the list. If the defect is in pure validation, the unit test usually locates it with less setup. If the problem is the wiring between the form and API, an E2E journey can reveal a difference that the unit test cannot see.

Each level answers a different question. Tests should be deterministic, describe important behavior, and produce understandable failures. A test that merely repeats the internal code can preserve a defect. Set the expected outcome from the requirement first, not from the implementation you want to justify. Also avoid relying on remote accounts, billable services, or personal data to teach the idea: test doubles and temporary resources let you verify many rules locally.

## Runnable unit-test example

This snippet uses `unittest`, which is included with Python. The function is deliberately small; it tests both a useful input and boundaries that could break the rule. Paste it into a terminal after `python3 -` to run it using only the standard library.

```python
import unittest

def normalizar_titulo(valor):
    if not isinstance(valor, str):
        raise TypeError("El título debe ser texto")
    titulo = valor.strip()
    if not titulo:
        raise ValueError("El título no puede estar vacío")
    return titulo

class PruebasTitulo(unittest.TestCase):
    def test_quita_espacios_exteriores(self):
        self.assertEqual(normalizar_titulo("  Leer  "), "Leer")

    def test_rechaza_texto_vacio(self):
        with self.assertRaises(ValueError):
            normalizar_titulo("   ")

    def test_rechaza_tipo_incorrecto(self):
        with self.assertRaises(TypeError):
            normalizar_titulo(None)

resultado = unittest.TextTestRunner(verbosity=2).run(
    unittest.defaultTestLoader.loadTestsFromTestCase(PruebasTitulo)
)
if not resultado.wasSuccessful():
    raise SystemExit(1)
```

## Step-by-step activity

1. Before reading the solution, note what should happen with a regular string, whitespace alone, and a value that is not text.
2. Run the block and match each test name to one of those behaviors: `test_quita_espacios_exteriores` trims surrounding whitespace, `test_rechaza_texto_vacio` rejects empty text, and `test_rechaza_tipo_incorrecto` rejects the wrong type.
3. Temporarily change the expected result from `"Leer"` to `"leer"`. Observe that the runner reports a difference and fails.
4. Restore the correct value. On paper, design what an integration test would need to save the title and what an E2E test would observe on screen.
5. Choose the smallest level that demonstrates each rule, and reserve broader journeys for important integration errors.

## Verification and diagnosis

The expected result is three passing tests. If the process fails, inspect the assertion and actual value before editing the function. If the expected behavior is unclear, return to the requirement: the test cannot decide by itself whether internal spaces should be preserved or an overly long title accepted. This practice verifies a function and its boundaries, not persistence or the browser; those boundaries do not yet exist in the example.

A good test suite balances speed and realism: use pure functions for rules, integration tests for contracts, and E2E tests for journeys that matter to the user. A test that fails intermittently often points to the clock, network, ordering, or shared state; isolating that dependency is better than rerunning it until it passes.

## Common mistakes

- **Using only E2E tests for every rule.** Setup takes time and the message can hide the cause; use the smallest boundary that can reproduce it.
- **Testing private details.** If an equivalent internal change breaks the test, you may have tied the test to implementation details rather than behavior.
- **Mocking everything.** This removes the integration risk the test was supposed to observe.
- **Claiming a green suite proves there are no errors.** It reports only on behavior and environments that were actually covered.
- **Deleting a test because it is inconvenient.** First determine whether it revealed a defect, an ambiguous requirement, or a fragile test.

## Summary

Unit, integration, and E2E tests exercise different boundaries and complement one another. Start with concrete cases based on requirements, include failures and edge cases, and preserve repeatable evidence. Choose the level according to risk; no test runner turns an incomplete suite into a total guarantee.
