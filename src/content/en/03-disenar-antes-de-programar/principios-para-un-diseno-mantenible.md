---
title: "Principles of Maintainable Design"
description: "Apply cohesion, low coupling, consistent names, and gradual refactoring to make software easier to change."
module: "03-disenar-antes-de-programar"
order: 5
duration: 40
level: "Beginner"
objectives:
  - "Explain cohesion and coupling with examples of functions."
  - "Separate responsibilities without creating unnecessary abstractions."
  - "Refactor a small change while preserving tests and behavior."
prerequisites:
  - "Have written functions and basic tests"
updatedDate: "2026-10-08"
sources:
  - label: "PEP 8: Style Guide for Python Code"
    url: "https://peps.python.org/pep-0008/"
  - label: "PEP 20: The Zen of Python"
    url: "https://peps.python.org/pep-0020/"
---

## Design for the Changes We Actually Know About

Maintainable design reduces the effort needed to understand, test, and modify a program without changing what works. It does not mean building a huge architecture on day one. It means making rules visible, limiting surprises, and keeping changes contained. PEP 8 reminds us that code is read frequently and that local consistency matters; a shared style helps a team focus on the logic.

Two concepts can guide you. **Cohesion** asks whether the pieces inside a function or module work toward a recognizable purpose. **Coupling** asks how many decisions from other parts a piece must know about. A function that validates a title, saves it, opens a window, and sends an email has low cohesion. If changing the title rule also requires changing the email, there is unnecessary coupling.

## An Example of Separation

Suppose `gestionar_tarea` (“manage_task”) asks for the title, checks that it is not empty, creates the data, and prints it. Separate the responsibilities for observable reasons: `validar_titulo` (“validate_title”) checks the rule; `crear_tarea` (“create_task”) builds the data; the interface requests input and displays the result. You do not need a different module for every line; the goal is for each responsibility to be changed and tested with fewer side effects.

```python
def crear_tarea(titulo):
    titulo = titulo.strip()
    if not titulo:
        raise ValueError("El título no puede estar vacío")
    return {"titulo": titulo, "hecha": False}
```

The function does not read from the terminal or write files. That is why you can test it with ordinary text and whitespace without simulating a console. If the product later needs a maximum title length, add the rule here and create a test documenting the new limit. If the interface changes, the central rule can remain intact.

## Make Changes Safely, One Step at a Time

First, capture the existing behavior with a test or a reproducible example. Then change one aspect at a time: rename something, extract a function, or remove duplication. Run the tests after each step. Introduce an abstraction only if two parts share a stable rule or a frequent change requires separating a dependency. A small amount of repetition may be clearer than a premature generic hierarchy.

A name should express intent, not an accidental implementation detail. `es_titulo_valido` (“is_title_valid”) communicates a question; `check1` does not. Comments are useful for explaining reasons, constraints, or decisions that cannot be inferred from the code. If they repeat exactly what a line says, they can become outdated and add noise. Keep comments close to the code they justify.

## Step-by-Step Practice

1. Choose a function in your project that reads input, applies a rule, and produces output.
2. Mark in different colors the responsibilities that might change for different reasons.
3. Write a test for the current result before reorganizing the function.
4. Extract just one responsibility with a descriptive name and run the test.
5. Check that the new function can be called without starting the whole application.
6. Review whether you added a necessary abstraction or just more files; mentally undo any complexity without a verifiable benefit.

## Check Your Work and Common Mistakes

A design improves if a rule is quick to locate, a unit can be tested in isolation, and a small change does not force you to review unrelated layers. If a function needs many parameters, find out whether it is mixing jobs or whether you need a well-defined context object. If extracting it merely moves the complexity into a differently named function, reconsider the boundary.

Do not apply “one responsibility” as a rule that every function must have only one line. Do not optimize for reuse no one needs. Do not refactor a critical area without a way to detect regressions. And do not confuse more layers with better design: clarity and ease of change are the outcomes to observe.

## Summary

Group together what changes together, reduce unnecessary dependencies, use consistent names, and refactor in steps covered by tests. Keep the design proportional to the problem: the best structure makes current rules understandable without blocking reasonable changes.
