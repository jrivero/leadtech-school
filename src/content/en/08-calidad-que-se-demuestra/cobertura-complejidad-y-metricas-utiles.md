---
title: "Coverage, Complexity, and Useful Metrics"
description: "Interpret line and branch coverage, complexity, and change signals as clues for deciding where to test, never as absolute quality scores."
module: "08-calidad-que-se-demuestra"
order: 3
duration: 35
level: "Intermediate"
objectives:
  - "Distinguish line coverage from branch coverage through a small example."
  - "Explain what a complexity metric indicates and what it cannot establish."
  - "Prioritize an additional test based on risk and behavior, not an isolated percentage."
prerequisites:
  - "Know conditionals and simple unit tests."
  - "Know how to read an expected result and an observed result."
updatedDate: '2026-10-08'
sources:
  - label: "Coverage.py: measuring branch coverage"
    url: "https://coverage.readthedocs.io/en/latest/branch.html"
  - label: "Python: unittest framework"
    url: "https://docs.python.org/3/library/unittest.html"
---

## A metric describes a signal, not overall quality

Coverage indicates which part of the observed code a test run reached. Line coverage asks which instructions ran; branch coverage also analyzes the possible outcomes of a decision. A high figure does not confirm that assertions are relevant, every requirement has been tested, or no security errors exist. A test can execute an entire function without checking the important result.

Consider a function that offers free shipping if the total reaches 50, a reduced charge if the user has a membership, and the regular charge otherwise. A single test with a total of 80 executes the free-shipping path but checks none of the remaining conditions. To observe the branches, we need cases at the threshold, below it with membership, and below it without membership. The exact number a tool reports depends on how it measures and presents decisions and conditions; read its definition before comparing percentages.

Cyclomatic complexity and other static complexity measures approximate aspects such as the number of paths or structures. They can help identify functions that may be hard to understand and prioritize for review, but they do not automatically establish that every value above a threshold should be split up. A long function may be linear and clear; a short function may hide a critical case. Combine the signal with recent changes, failure frequency, impact, and difficulty of testing.

A metric becomes dangerous when it turns into the sole objective. If a team pursues “100% coverage,” it may add empty assertions or tests that repeat the implementation; if it pursues fewer lines, it may compress logic into one expression that is hard to review. Present the trend and context alongside the number: which folder it measures, whether the scope changed, which important paths are missing, and what decision followed from the reading.

## Example of branches and cases

For a function `coste_envio(total, miembro)`, define four decision outcomes: the first `if` is true or false; when it is false, the second `if` can also be true or false. Three scenarios cover the four possible outcomes: total 50; total 20 with membership; and total 20 without membership. A total of 49.99 also confirms which side of the boundary it falls on. The point is to design tests for behavior paths, not to increase the counter for its own sake.

## Step-by-step activity

1. Write the three scenarios above in a table with columns for input, condition path, and expected result.
2. Mark which outcome of each decision each case observes. Check that both the true and false branches of each condition appear at least once.
3. Add one case at the exact boundary and another just below it; explain which defect each would detect.
4. Examine a small real function and identify a metric available in your editor or report; do not install a tool to complete this exercise.
5. Formulate a quality question the figure cannot answer, such as “Is an invalid currency rejected?” and design a test for it.

## Verification and solution

The table is complete if it covers free shipping, the reduced charge, and the regular charge, and distinguishes the limit of 50 from 49.99. Even 100% coverage of these paths would not show whether the function handles `None`, another currency, or inadequate decimal precision; those behaviors depend on the contract. If the report is hard to interpret, narrow the assessment to one function and compare concrete cases before summarizing it as a percentage.

Coverage.py documents branch measurement as an option in addition to executed lines. If your project already uses a tool, consult its documentation so you do not confuse “not covered,” “not applicable,” and “not run.” The activity can be completed manually with the table: it does not require downloading coverage tools, uploading a repository, or sending data to an external service.

## Common mistakes

- **Turning coverage into a guarantee.** Review assertions and criteria, not just the instructions reached.
- **Comparing figures with different denominators.** Keep the scope constant or disclose the change.
- **Refactoring only to reduce complexity.** First confirm which specific difficulty a maintainer experiences.
- **Ignoring boundaries.** Failures often cluster where a condition changes or a type is transformed.
- **Rewarding the number instead of the learning.** Use metrics to decide what to inspect or test next.

## Summary

Coverage, complexity, and trends help focus questions. Check lines and branches with explicit scenarios; treat complexity as a signal to review, not a verdict. A useful metric leads to an explainable test or decision and always makes its limitations clear.
