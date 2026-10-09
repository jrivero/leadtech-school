---
title: "Refactoring and Managing Technical Debt"
description: "Improve internal structure without changing observable behavior, and prioritize technical debt by cost, risk, and evidence rather than aesthetic intuition."
module: "08-calidad-que-se-demuestra"
order: 2
duration: 35
level: "Intermediate"
objectives:
  - "Distinguish a refactoring from a functional change using observable criteria."
  - "Apply a small transformation protected by characterization tests."
  - "Record technical debt with its impact, context, and a verifiable next step."
prerequisites:
  - "Know functions, conditions, and basic automated tests."
  - "Be able to compare behavior before and after a change."
updatedDate: '2026-10-08'
sources:
  - label: "Martin Fowler: definition and scope of refactoring"
    url: "https://martinfowler.com/bliki/DefinitionOfRefactoring.html"
  - label: "Python: unittest framework for characterizing behavior"
    url: "https://docs.python.org/3/library/unittest.html"
---

## Change the form without changing the contract

Refactoring means improving a program's internal structure while preserving its observable behavior. The contract includes what a person can see, values consumed by other modules, and effects such as a write or an expected error. If a new rule is decided at the same time, two kinds of change are mixed together; separating refactoring from functionality makes it easier to attribute failures and review the diff.

Technical debt describes a decision that makes it easier to move forward now but may make future changes more expensive. Not all old code is debt, and not all debt should be paid immediately. Duplication that already causes inconsistent rules may cost more with each change; an inelegant but stable abstraction may not justify a rewrite. Record the symptom, context, observed impact, and a next action instead of labeling a folder “bad.” The metaphor of interest is useful for thinking about accumulated cost, but it does not produce an exact amount without data.

Suppose two screens calculate free-shipping costs using different thresholds by mistake. The functional goal may be to unify the approved rule, but first establish whether the intent is to correct behavior or reorganize code. For a pure refactor, capture the result that must remain unchanged with examples. For a rule change, explicitly document which screen was wrong and the expected value. In either case, preserve the tests and review boundary cases.

## Example protected by tests

The block compares an old function with an extracted version. Both use the same fictional rule: free shipping is offered at or above 50 currency units; below that threshold, the charge is 5. The extraction names the threshold so it is not hidden, without changing the result.

```python
def envio_antes(total):
    if total >= 50:
        return 0
    return 5

UMBRAL_ENVIO_GRATIS = 50

def envio_refactorizado(total):
    if total >= UMBRAL_ENVIO_GRATIS:
        return 0
    return 5

for importe, esperado in [(0, 5), (49.99, 5), (50, 0), (75, 0)]:
    assert envio_antes(importe) == esperado
    assert envio_refactorizado(importe) == esperado
    assert envio_antes(importe) == envio_refactorizado(importe)
print("OK: cuatro casos conservan el comportamiento")
```

## Step-by-step practice

1. Select a small function with at least two known cases; do not start with a complete architecture migration.
2. Write down example inputs and results before editing, including the boundary where a condition changes.
3. Run those checks and save their result. If the project already has tests, identify which ones protect the function.
4. Make one structural transformation, such as extracting a repeated condition or naming a constant.
5. Repeat exactly the same cases and review the diff to confirm that no rule, dependency, or out-of-scope file changed.
6. If a functional need appears, open a separate change with new criteria and tests expressing the agreed rule.

Paste the example into Python 3 with `python3 -` to check equivalence without libraries. Then temporarily change the `>=` operator to `>` in the refactored version: the case at 50 must detect the difference. Restore the condition and run it again.

## Verification and debt tracking

A small refactoring is supported when the before-and-after cases pass, the public result is preserved, and another person understands why the change was made. A test does not need to compare line by line; it should assert relevant rules. To prioritize debt, note where it appears, what change made it visible, what risk it creates, and—based on available evidence—how much it costs to defer intervention. Revisit the record when working in that area, not as part of an automatic rewrite campaign.

## Common mistakes

- **Changing structure and rules at the same time.** Split the stages or clearly label the new tests that justify the functional change.
- **Rewriting to suit personal taste.** Require an observable improvement in comprehension, security, changeability, or testing cost.
- **Adding abstractions before there is real repetition.** Extract once duplication or variation creates work and can be clearly named.
- **Accumulating vague debt tickets.** Record impact and the next action, not just “clean up later.”
- **Trusting that existing tests cover the behavior.** Check their cases and add characterization where evidence is missing.

## Summary

Refactoring preserves behavior while improving a specific structure. Protect each step with examples and tests, review the diff, and separate functional changes. Manage debt through verifiable symptoms and impact; avoid both ignoring recurring costs and starting an aimless rewrite.
