---
title: "Lab: Library Loans"
description: "Implement a library loan with explicit rules, a small use case, and tests covering availability, membership, and limits."
module: "04-arquitectura-que-puedes-entender"
order: 2
duration: 60
level: "Intermediate"
objectives:
  - "Model a loan result with a due date."
  - "Implement loan rules independently of an interface or database."
  - "Check acceptance, rejection, and date calculation with reproducible cases."
prerequisites:
  - "Clean Architecture from Scratch and an understanding of functions"
updatedDate: "2026-10-08"
sources:
  - label: "Python: dataclasses"
    url: "https://docs.python.org/3/library/dataclasses.html"
  - label: "Python: Basic Date and timedelta Types"
    url: "https://docs.python.org/3/library/datetime.html"
---

## Lab Scope

We will implement only the rule for creating a loan, not a web application or a complete catalog. We will use a fictional policy for the exercise: the copy must be available, the member must be active, each member may have at most three active loans, and each new loan is due fourteen days after the request date. In a real product, the library confirms these rules; here they are input for the exercise, not a universal policy.

The use case will receive the information it needs and return a loan object. We will inject the current date as a parameter instead of reading the clock inside the function. That way, a test can fix the day and repeat the same result. `dataclass` lets us represent data concisely, and `timedelta` expresses a duration that can be added to a date.

## Domain Solution

```python
from dataclasses import dataclass
from datetime import date, timedelta


@dataclass(frozen=True)
class Prestamo:
    libro_id: str
    socio_id: str
    fecha_vencimiento: date


def crear_prestamo(libro_id, socio_id, *, libro_disponible,
                   socio_activo, prestamos_activos, hoy):
    if not socio_activo:
        raise ValueError("El socio no está activo")
    if not libro_disponible:
        raise ValueError("El ejemplar no está disponible")
    if len(prestamos_activos) >= 3:
        raise ValueError("El socio ya alcanzó el límite de préstamos")
    return Prestamo(
        libro_id=libro_id,
        socio_id=socio_id,
        fecha_vencimiento=hoy + timedelta(days=14),
    )
```

The function does not access the database or know about a screen. An adapter would provide the values `libro_disponible` (“book_available”), `socio_activo` (“member_active”), and `prestamos_activos` (“active_loans”); the approval logic stays in the use case. The dataclass is immutable to prevent the due date from being changed accidentally after the loan is created. In a complete application, the adapter must also save the loan and handle storage failures.

## Tests That Explain the Rule

Set `hoy` (the Spanish identifier for “today”) to `date(2026, 10, 8)`. With an active member, an available copy, and two active loans, the result should have a due date of October 22, 2026. This case checks both the decision and the date arithmetic. If the conditions are valid, also check that the received identifiers are preserved.

Then test each rejection separately: an inactive member, an unavailable copy, and three active loans. Each attempt should produce `ValueError` with a message that helps explain the rule. Do not pass two invalid conditions to the test at the same time, because you would not know which one caused the rejection. Add a case with zero loans to verify the lower boundary and confirm that `hoy` is not read from a global variable.

## Step-by-Step Practice

1. Copy the solution into a file and run it once with valid inputs.
2. Check the expected date with `assert prestamo.fecha_vencimiento == date(2026, 10, 22)`.
3. Write a separate test for each rejection and check the error message.
4. Add a policy function or constant for the maximum number of loans and the duration; decide whether it improves readability.
5. Design a small repository port that can check availability, member status, and active loans.
6. Sketch an in-memory fake adapter and describe what must be persisted after the rule approves the loan.

## Check Your Work and Common Mistakes

The lab is complete if allowed cases create a loan with the correct date and each rejection condition prevents it from being created. If a date is off by one day, check whether you are adding fourteen days or counting the starting day as day one; the requirement must choose a convention. If a test depends on the real date, inject `hoy` to make it deterministic.

Do not query the database inside the date logic. Do not use a generic exception without a message, and do not hide the reason for rejection. In a system with multiple concurrent users, checking availability and then saving could allow two requests to take the same copy; persistence needs a transaction or an atomic operation to handle that race.

## Summary

The use case validates known inputs, applies limits, and returns a loan calculated with a controllable date. The tests make the policy explicit. Repositories, transactions, and the interface remain at the edges, where they can change without hiding the central rule.
