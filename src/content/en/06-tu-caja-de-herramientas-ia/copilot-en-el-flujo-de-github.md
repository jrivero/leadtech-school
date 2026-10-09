---
title: "Copilot in the GitHub Workflow"
description: "Explore how Copilot can support a pull request review, and check its comments against visible changes, tests, and human judgment."
module: "06-tu-caja-de-herramientas-ia"
order: 4
duration: 30
level: "Beginner"
objectives:
  - "Place Copilot assistance within GitHub's change and pull request workflow."
  - "Request a narrowly scoped review and classify its findings as verifiable or uncertain."
  - "Keep human review and testing in place before approving or merging changes."
prerequisites:
  - "elegir-herramientas-sin-perder-el-control"
  - "vs-code-y-github-copilot-en-la-practica"
updatedDate: '2026-10-08'
sources:
  - label: "GitHub Docs: using Copilot for code review"
    url: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review"
  - label: "GitHub Docs: exploring pull requests with Copilot"
    url: "https://docs.github.com/en/copilot/tutorials/explore-pull-requests"
---

## Core Idea — Conceptual Explanation

GitHub organizes code work around repositories, branches, and **pull requests**: proposed changes that other people can inspect before merging. GitHub Copilot includes assistance features at some points in this workflow, including summaries and code reviews when enabled. GitHub's documentation explains how to request reviews, but availability depends on the current account, repository, and organization configuration. Check the current guide rather than assuming that every project has the same button.

An assisted review may draw attention to a suspicious snippet or suggest an improvement. It is not an independent approval or a complete security test. It may miss a defect, suggest a change that alters the requirement, or flag correct code. The author and reviewers remain responsible for understanding the change. Do not configure an integration to merge a proposal automatically just because the AI left no comments.

A good workflow starts with a small change and a verifiable criterion. The pull request should explain its purpose and how to test it. Treat the automated review as an additional source of questions: reproduce each comment or dismiss it with evidence. Project tests, permission review, and behavior checks are still necessary even if the interface summarizes the change confidently.

For practice, use a toy repository and valueless data. Do not connect the account to private repositories or enable applications with broader permissions than required. If the organization restricts Copilot, respect that policy and carry out the same evaluation manually. Comments and summaries may also expose code content to the configured service, so check which data handling is allowed.

## Concrete Example

Create a fictional function that calculates the duration of an event. In a test branch, deliberately introduce a simple error: treat an exclusive upper bound as inclusive. The pull request explains the expected behavior. If the feature is available, request a Copilot review; the experiment is to see whether it detects the edge case and explains why. Its failure to find the error does not mean the function is correct.

## Guided Practice — Step-by-Step

1. Prepare a disposable repository or local copy with a simple function, a test, and a deliberate error you can revert.
2. Write down the requirement and expected result before requesting a review. Open a pull request only if you already know who can see it and what data it contains.
3. Request an assisted review through the interface described in the current official documentation. Do not grant write or merge permissions for this practice.
4. Classify each comment: reproducible bug, style suggestion, false positive, or claim without evidence. Add a small test to check the real case.
5. Correct only what you understand, run the tests again, and review the complete diff. Ask a person to make the final approval decision.

You do not need to publish code or connect an organization. If the review feature is not enabled, evaluate the same diff manually and compare it with the requirements checklist; lack of access is not a failure of the exercise.

## Validation and Troubleshooting

The evaluation has three independent results: whether it found the introduced error, whether its comments are correct, and whether the tests pass after the fix. Save reproducible evidence. If a comment does not identify a verifiable file or condition, ask for an explanation or dismiss it; do not change code just to silence it. If Copilot makes no comments, add tests for the edge cases you defined.

## Common Mistakes

- Treating an automated review as formal approval or a security guarantee.
- Accepting a comment without reproducing the scenario it describes.
- Merging changes or automatically broadening permissions to speed up the test.
- Opening a pull request with keys, personal data, or unauthorized code.
- Measuring usefulness by the number of comments instead of the relevant defects it catches.

## In Summary

Copilot can add observations to the GitHub workflow, but they do not replace tests or human review. Keep the experiment narrow, preserve a reproducible error, and decide based on evidence. A pull request should be merged only when a person understands the change and its effects.
