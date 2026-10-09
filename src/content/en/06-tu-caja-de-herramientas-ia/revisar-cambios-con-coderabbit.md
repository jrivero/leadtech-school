---
title: "Reviewing Changes with CodeRabbit"
description: "Learn to use CodeRabbit to review pull request diffs, compare its findings with tests, and keep the merge decision in human hands."
module: "06-tu-caja-de-herramientas-ia"
order: 13
duration: 35
level: "Beginner"
objectives:
  - "Distinguish an assisted review from a person's approval of a change."
  - "Compare each comment with the diff, requirements, and project tests."
  - "Practice a review without auto-merge or automatic application of fixes."
prerequisites:
  - "copilot-en-el-flujo-de-github"
  - "codigo-legible-depuracion-y-pruebas"
updatedDate: '2026-10-08'
sources:
  - label: "CodeRabbit: pull request reviews"
    url: "https://docs.coderabbit.ai/guides/code-review-overview"
  - label: "CodeRabbit: security"
    url: "https://docs.coderabbit.ai/security"
---

## Core Idea — Conceptual Explanation

CodeRabbit is an assisted pull request review service. Once connected to an authorized provider and repository, it analyzes changes and can publish a summary and comments on the diff. Its contribution is another perspective: it may flag an edge case, a security risk, or a missing test. The documentation also describes suggestions for fixing code. None of these features replaces someone who understands the requirement, and none by itself certifies that a change is correct.

Treat each comment as a hypothesis to check, not as an instruction. Open the cited line and follow the flow until you understand what might happen. Compare the claim with the previous behavior, requirements, input and output data, and tests. A finding may be real, based on a misunderstanding, or already mitigated elsewhere. A severity label helps prioritize, but it does not prove impact. Conversely, no comments do not prove that no defects remain: an automated review has a scope and limitations.

In this practice, we will examine only the diff and tests. Do not enable auto-merge in the repository provider, do not merge because a check is green, and do not apply fixes with one click. If you decide to fix something, write or review the change yourself, read the new diff, and validate it again.

## Concrete Example

Imagine a small pull request that changes a calculation function, and CodeRabbit flags that it does not handle an empty list. Read the specification: if the expected answer is zero, check whether the code already meets that contract and whether a test demonstrates it. If the comment is a false positive, keep the evidence and explain why. If it finds a real defect, manually correct the function or add a test. In either case, the decision comes from the requirement and a reproducible result, not from accepting or rejecting the suggestion based on its tone.

## Guided Practice — Step-by-Step

1. Choose a practice repository with no secrets, personal data, or code you are not authorized to share. Prepare a small, reversible change, such as a validation and its test.
2. Write an acceptance statement and at least one edge case before making the change. This gives you an independent reference for judging both the code and the review.
3. Connect CodeRabbit only to that test repository and review the access granted by the integration. Open an ordinary pull request; do not change auto-merge settings or permissions for other repositories to speed up the exercise.
4. Read the diff without assistance first. Then, for each comment, note four things: claim, affected line, evidence that would confirm it, and provisional decision.
5. Check each finding against the requirement and a manual or automated test. If the code needs to change, make the change yourself in a separate commit; do not use the apply-fix option during this exercise.
6. Reread the complete diff and test results. Leave the pull request unmerged: the goal is to practice review judgment, not publish the change.

## Validation and Troubleshooting

The practice is complete when all comments are classified, every decision has a verifiable reason, and only the expected files appear in the diff. A correct result may include a well-explained false positive. If no review appears, confirm that the integration has access to the test repository and that review rules cover the pull request; consult the official controls before broadening permissions. If a comment provides no evidence, you can ask for clarification in the pull request conversation, but verify the response just as you would the first suggestion. If a test fails, reproduce the case and fix the change before considering any approval.

## Common Mistakes

- Confusing a convincing comment with proof of a defect.
- Dismissing a warning just because its severity seems low.
- Treating a review with no findings as a guarantee of quality or security.
- Applying an automatic fix without inspecting the resulting diff.
- Enabling auto-merge or sharing a sensitive repository to test a tool.

## In Summary

CodeRabbit can add a useful perspective when reviewing a pull request, but its comments must be checked against the code, requirement, and tests. Keep merging under human control: no auto-merge in this exercise and no accepted change without rereading it.
