---
title: "Solved Challenge: Approve Expenses"
description: "Design a transparent expense approval policy, apply thresholds with decimal precision, and validate edge cases with a reasoned solution."
module: "04-arquitectura-que-puedes-entender"
order: 3
duration: 60
level: "Intermediate"
objectives:
  - "Turn an expense policy into explicit, ordered branches."
  - "Use Decimal to compare monetary amounts without binary float errors."
  - "Test boundaries, rejections, and referrals for manual review."
prerequisites:
  - "Clean Architecture, conditionals, and basic Python testing"
updatedDate: "2026-10-08"
sources:
  - label: "Python: decimal Module for Decimal Arithmetic"
    url: "https://docs.python.org/3/library/decimal.html"
  - label: "NASA Systems Engineering Handbook: Requirements Verification Matrix"
    url: "https://www.nasa.gov/wp-content/uploads/2018/09/nasa_systems_engineering_handbook_0.pdf"
---

## Define the Policy First, Then Write the Code

This challenge uses a fictional policy for design practice; it does not represent a legal obligation or a universal accounting rule. Suppose only positive expenses in euros are processed and every request must include a receipt. Up to 100 euros is approved automatically; more than 100 and up to 500 requires a manager; more than 500 and up to 2,000 goes to finance; above 2,000 requires finance and management. If the receipt is missing, the status is incomplete. Another currency is referred for manual review because conversion has not yet been defined.

The boundaries are deliberate: exactly 100 is automatically approved, exactly 500 requires a manager, and exactly 2,000 goes to finance. Write those decisions in natural language and prepare examples before building branches. For money, `Decimal` represents decimal amounts more appropriately than `float`, whose binary fractions may not be exact. Construct the value from text, such as `Decimal("100.00")`, not from a `float` that has already been approximated.

## Implement the Evaluator

```python
from decimal import Decimal, InvalidOperation


def decidir_gasto(importe, moneda, tiene_recibo):
    try:
        cantidad = Decimal(str(importe))
    except InvalidOperation as error:
        raise ValueError("Importe no válido") from error
    if not cantidad.is_finite():
        raise ValueError("El importe debe ser finito")
    if cantidad <= 0:
        return {"estado": "rechazado", "aprobadores": []}
    if moneda != "EUR":
        return {"estado": "revision_manual", "aprobadores": ["finanzas"]}
    if not tiene_recibo:
        return {"estado": "incompleto", "aprobadores": []}
    if cantidad <= Decimal("100.00"):
        return {"estado": "aprobado", "aprobadores": []}
    if cantidad <= Decimal("500.00"):
        return {"estado": "pendiente", "aprobadores": ["responsable"]}
    if cantidad <= Decimal("2000.00"):
        return {"estado": "pendiente", "aprobadores": ["finanzas"]}
    return {"estado": "pendiente", "aprobadores": ["finanzas", "direccion"]}
```

The order matters: first we validate that the amount can be interpreted and is finite; then we reject non-positive values; next we handle currency and receipt; finally, we evaluate the thresholds. Each branch returns a status and the people who need to act. The pure function does not send emails, write to a database, or pay the expense; those tasks belong to other components.

## Reasoning Through the Cases

Test `75.00 EUR` with a receipt: it should be approved. `100.01 EUR` goes to the manager; `500.00` remains in that band, while `500.01` goes to finance. `2.000,00` in Spanish number format is not an appropriate decimal literal for this example interface; send `"2000.00"` and check that it stays in finance. `2000.01` needs both approvals. Zero or a negative amount is rejected; another currency is referred for review, and a missing receipt produces an incomplete status.

Add tests for every boundary: 100, 100.01, 500, 500.01, 2000, and 2000.01. Also add an invalid amount, infinity, an expense without a receipt, and an unknown currency. If a policy changes, first update the rule and expected cases; do not “fix” the function in isolation just to pass a single example.

## Step-by-Step Practice

1. Copy the policy and underline every threshold, prerequisite, and exception.
2. Write a table with input, expected status, and approvers before coding.
3. Implement one branch at a time and check its exact boundaries.
4. Keep comparisons with `Decimal` and create values from decimal strings.
5. Separate this decision from the mechanism that saves the expense or notifies someone.
6. Ask another person to review whether the table and function say the same thing.

## Check Your Work and Common Mistakes

The solution is correct if each row in the table produces the agreed status and no boundary falls into two bands. If `Decimal` reports an invalid value, catch only the expected conversion exception and return a clear error; do not turn every program failure into an approval. If you change the order of branches, test the boundary cases again. In a real system, also record the reason for a decision so it can be audited.

Do not confuse the amount with the approval status or authorize a request because the notification service failed. Approval and sending a notification are separate operations. Do not apply silent currency conversions: require an agreed source and exchange-rate date, or refer the request for review.

## Summary

A verifiable policy becomes ordered decisions, explicit results, and tests at every boundary. `Decimal` avoids relying on binary approximations when comparing money. Keep the rule separate from storage and notifications, and treat the example policy as a decision the business must confirm.
