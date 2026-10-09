---
title: "Turn Needs into Verifiable Requirements"
description: "Translate user needs into clear, prioritized, and verifiable requirements using examples and acceptance criteria."
module: "03-disenar-antes-de-programar"
order: 2
duration: 40
level: "Beginner"
objectives:
  - "Distinguish needs, functional requirements, and quality attributes."
  - "Write specific requirements that can be verified with evidence."
  - "Turn requirements into acceptance criteria and test cases."
prerequisites:
  - "Know the basic cycle of building and checking software"
updatedDate: "2026-10-08"
sources:
  - label: "NASA Systems Engineering Handbook: Requirements and Verification"
    url: "https://www.nasa.gov/wp-content/uploads/2018/09/nasa_systems_engineering_handbook_0.pdf"
  - label: "NASA Handbook: Requirements and Verification Matrix Appendix"
    url: "https://www.nasa.gov/reference/system-engineering-handbook-appendix/"
---

## From a Need to a Testable Condition

A need expresses an outcome someone wants to achieve. A requirement turns that need into an obligation, constraint, or quality the product must meet. “I want it to be easy” communicates a real concern, but it is not enough to implement or test. Ask what task the person performs, what obstacle they encounter, and what evidence would show them that the problem is solved.

Functional requirements describe behavior: “The person can mark a task as complete.” Quality requirements describe properties such as accessibility, availability, performance, or privacy. There may also be constraints: a team policy, an adopted technology, or an agreed date. Not every constraint is a user need; name its source and avoid presenting a technical decision as if it were the problem.

## Example: Requesting a Library Loan

An initial rule might say: “An active member may borrow an available book if they have fewer than three active loans; the new loan is due fourteen days later.” To make this verifiable, agree on what “active” means, how loans are counted, and which date is used. If those concepts are undefined, two people could implement different results and both believe they have met the requirement.

Write acceptance criteria with context, action, and outcome:

- **Given** an active member with two loans and an available book, **when** they request that book on October 8, **then** the loan is recorded with a due date of October 22.
- **Given** a member with three active loans, **when** they request another, **then** no loan is created and the reason is reported.
- **Given** an inactive member, **when** they try to request a book, **then** the request is rejected even if the book is available.

The date example removes ambiguity about whether the current day is counted. Negative cases are just as important as the allowed path: they show which limits must hold and help detect authorization or counting errors.

## Verification Is Not the Same as Validation

Verification asks, “Did we build the product according to the requirements?” An automated test can check the limit of three loans. Validation asks, “Does the product solve the right need?” A conversation or test with a librarian might reveal a need to reserve copies, which was not yet in the specification.

For each requirement, record an identifier, its source, priority, acceptance criterion, and verification method. A matrix helps prevent requirements from being lost and reveals rules that have no test. Do not choose arbitrary numbers for quality attributes: “respond in less than two seconds” needs context, workload, and agreement with the people who will use the system.

## Step-by-Step Practice

1. Choose a small operation in the task manager, such as completing a task.
2. Write the need in the words of a user.
3. Formulate a requirement with a clear subject, an action, and a verifiable condition.
4. Add an allowed case, a rejected case, and a boundary such as an empty list or an already-completed task.
5. Associate each case with a manual or automated test and specify what evidence you will keep.
6. Ask someone else to interpret the rule without further explanation; note any questions that arise.

## Check Your Work and Common Mistakes

A requirement is ready for design if it has a source, describes one idea, avoids vague words or defines them, and can be checked through observation, analysis, or testing. “It must be secure” needs to be broken down into threats and behaviors; a single test cannot verify it. “It must use a table named loans” may be a design detail unless a justified constraint requires it.

Do not use “and” to pile several obligations into a sentence that is hard to review. Do not forget negative requirements, permissions, and errors. Do not assume a criterion becomes true just because the team wrote it: review it with someone who understands the need and update it if understanding changes.

## Summary

A need explains why; a requirement specifies what must be met; an acceptance criterion describes concrete evidence. Clarify vocabulary, edge cases, source, and priority. Verify the implementation and validate with people that the result is still what they need.
