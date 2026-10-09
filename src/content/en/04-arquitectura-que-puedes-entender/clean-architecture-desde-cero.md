---
title: "Clean Architecture from Scratch"
description: "Separate business rules from mechanisms such as the web and databases by following the direction of dependencies in an understandable architecture."
module: "04-arquitectura-que-puedes-entender"
order: 1
duration: 45
level: "Intermediate"
objectives:
  - "Distinguish business rules from external technical details."
  - "Explain the dependency rule toward the core in Clean Architecture."
  - "Trace a use case and locate its ports and adapters."
prerequisites:
  - "Know functions, separation of responsibilities, and requirements"
updatedDate: "2026-10-08"
sources:
  - label: "Robert C. Martin: The Clean Architecture"
    url: "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html"
---

## Protect the Rules That Define the Product

Clean Architecture is a family of ideas for separating important business policies from the mechanisms used to carry them out. A library system might enforce the rule “an active member cannot have more than three loans.” That rule should be understandable without knowing whether the application uses a web page, a terminal, or a particular database.

Robert C. Martin describes the central rule as having code dependencies point toward more internal policies. The core does not import classes from a web framework or query a table directly. External details adapt to interfaces defined toward the inside. This does not prevent a request from traveling from the web to a use case and then saving data at runtime; the direction of control flow and the direction of code dependencies are different questions.

## Layers Through a Use Case

Imagine the operation “borrow a book.” An interface receives the data and turns it into an application request. The use case checks the member’s status, checks availability through a repository abstraction, applies the rule, and returns a result. A concrete adapter might read or save data in SQLite, a file, or another service. Another adapter might be a console screen.

You can picture it like this:

```text
Interfaz web/terminal → caso de uso → reglas del dominio
                           ↓
                    puerto de repositorio
                           ↑
              adaptador de archivo o base de datos
```

The core knows about the port, not the concrete adapter. A test can provide a fake in-memory repository to check the rules without starting a server or setting up a real database. If the persistence technology changes, you implement another compatible adapter and keep the use case as long as the contract remains valid.

## It Is Not a Folder Template

A folder name does not make an architecture clean. You can have folders called `entities`, `use_cases`, and `infrastructure` and still couple business logic to an external library. The useful questions are which module imports which other module and which details can change without spreading changes. In a tiny application, two functions and a clear interface may be enough; adding many layers can hide a simple rule.

Apply the pattern where there is a reason: a volatile integration, business rules that need separate testing, or multiple channels that use the same use cases. If there is only a one-afternoon script, separating every instruction into an adapter adds maintenance without isolating risk. Architecture is a decision about boundaries, not a mandatory ceremony.

## Step-by-Step Practice

1. Choose an operation, such as approving an expense or borrowing a book.
2. Underline the rules that would exist even without a screen or database.
3. Mark the external details: HTTP input, clock, storage, and email.
4. Draw which component invokes the use case and what information it must return.
5. Define a small storage interface, such as `buscar_libro(id)` (“find_book”) and `guardar_prestamo(prestamo)` (“save_loan”).
6. Test the rule with in-memory data and check that it does not need to import the external framework.

## Check Your Work and Common Mistakes

The boundary is well designed if you can change a detail—for example, the persistence mechanism—without rewriting the business rule, and if the use case can be tested without real connections. If the domain knows table names or HTTP responses, the dependency probably crosses outward. If an interface reproduces the entire database, the abstraction may be too broad.

Do not confuse Clean Architecture with microservices, and do not create interfaces for every function without a need. Do not hide storage errors as if the loan had been saved. Make the result of each operation visible and define what the system does if a dependency does not respond.

## Summary

Separate central policies from external mechanisms, and make internal code depend on small contracts rather than frameworks. Trace both calls and imports, test rules with fake adapters, and add layers only when a boundary reduces a real cost.
