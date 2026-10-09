---
title: "Code Review Between People and AI"
description: "Combine human review and AI assistance to find specific defects in a diff, ask for evidence, and check each finding before changing code."
module: "08-calidad-que-se-demuestra"
order: 9
duration: 35
level: "Intermediate"
objectives:
  - "Review a diff against the requirement, error paths, and impact on other parts of the system."
  - "Ask an assistant for scoped findings with evidence and explicit assumptions."
  - "Turn a valid finding into a reproducible test before accepting a fix."
prerequisites:
  - "Know how to read functions, tests, and a change diff."
  - "Know basic validation and data boundaries."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP: Secure Code Review Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html"
  - label: "GitHub Docs: reviewing changes in a pull request"
    url: "https://docs.github.com/en/pull-requests/how-tos/review-pull-requests"
---

## Review a change, not a reputation

A code review checks whether a change fulfills its intent, fits into the system, and leaves acceptable risks. The object of analysis is the diff plus the necessary context: requirements, affected calls, tests, and security boundaries. Neither “an expert wrote it” nor “a model generated it” replaces that review. AI can summarize, enumerate cases, and suggest questions, but it can also miss the relevant flow, assume a rule, or invent a defect.

Start with the intent and external result. Read what was added and removed; follow input through validation, rules, storage, and output. Look for functional errors, compatibility, authorization, data handling, accessibility, and missing tests according to the change's risk. Not every diff needs an extensive audit: a text update raises different questions from a change to permissions or payments. Record the evidence and explain why a risk does or does not apply.

In an assisted review, share only authorized context and ask for something that can be checked: “Review this fictional diff for boundary and state errors; cite the condition involved, state assumptions, and propose a local test. Do not run commands or add dependencies.” An answer that says “looks correct” is not helpful. A useful finding identifies a path and a reproducible case. If it points to a file that did not change, ask which part of the diff causes the problem.

## Example: reserving all available inventory

A practice rule allows reserving up to and including the available units. The change introduces this condition:

```python
def reservar_defectuoso(stock, unidades):
    if unidades <= 0:
        return "cantidad_invalida"
    if unidades >= stock:
        return "sin_stock"
    return "reservada"

def reservar_corregido(stock, unidades):
    if unidades <= 0:
        return "cantidad_invalida"
    if unidades > stock:
        return "sin_stock"
    return "reservada"

assert reservar_defectuoso(4, 4) == "sin_stock"  # reproduce el defecto
assert reservar_corregido(4, 4) == "reservada"
assert reservar_corregido(4, 5) == "sin_stock"
print("OK: el caso límite se acepta y el exceso se rechaza")
```

If four units remain and four are requested, the code rejects the request even though the contract allows it. To demonstrate the defect, define one test for `(stock=4, unidades=4)` and another for `(4, 5)`. The first should accept and the second reject. The defect is at the boundary, not an aesthetic issue. An assistant can point out the condition; the reviewer checks the requirement and runs the cases before suggesting changing `>=` to `>`.

## Step-by-step activity

1. Read the intent of a small change and write expected outcomes for a normal case, a boundary, and a disallowed input.
2. Inspect each changed file and check whether the tests cover those outcomes.
3. If you use AI, share a synthetic snippet or authorized diff, never keys, real data, or code you are not allowed to transmit.
4. Ask for findings with a location, reasoning, assumption, and reproducible test. Classify each as confirmed, not applicable, or awaiting context.
5. For the inventory example, check both inputs before changing the operator. Then run the same pair of cases with the fix.
6. Review the final diff and confirm that the solution does not change other rules or silence a test.

## Verification and resolution

The test distinguishes the cases: requesting four out of four must succeed; requesting five out of four must fail. The condition change is justified because it satisfies both criteria, not because a model suggested it. If the actual requirement does not define whether the last unit can be reserved, the finding remains unresolved: ask the person who defines the product before imposing a rule.

On a review platform, the most useful comments describe an action and its expected impact. Separate optional suggestions from defects that block merging. Check that the reviewed version matches the diff that will be tested; if new changes arrive, the earlier evidence may be out of date.

## Common mistakes

- **Asking for a general security verdict.** Break the review down by observable risks, paths, and assumptions.
- **Accepting a finding without reproducing it.** Connect it to the requirement, code, and a test that would distinguish the failure.
- **Dismissing an observation because it came from AI.** Check its evidence; an imperfect source can point to a real case.
- **Reviewing style alone.** Prioritize behavior, boundaries, security, and maintainability over cosmetic preferences.
- **Confusing approval with a guarantee.** Review reduces known risks; it does not demonstrate the absence of defects.

## Summary

Review combines intent, diff, context, and evidence. AI can help formulate questions, but every observation needs human confirmation and an appropriate test. Resolve ambiguities before changing rules, review the corrected diff again, and keep clear what was checked and what remains unresolved.
