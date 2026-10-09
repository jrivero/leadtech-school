---
title: "Identify AI Opportunities in a Company"
description: "Narrow down a workplace problem, review data and risks, and propose a small AI test with an observable measure of success."
module: 12-crece-como-profesional
order: 4
duration: 35
level: Beginner
objectives:
  - Describe a problematic task with an observable outcome and limited scope.
  - Compare data, risks, and measures of success for a potential AI use.
  - Design a small test that compares the proposal with the current process.
prerequisites: []
updatedDate: '2026-10-08'
sources:
  - label: NIST — AI Risk Management Framework
    url: https://www.nist.gov/itl/ai-risk-management-framework
---

## Start with real friction

An AI opportunity does not start with “we want to use AI,” but with a task that currently takes time, produces errors, or makes information hard to find. Before thinking about a tool, describe who does what, how often, and what outcome they need. “Automate customer support” is too broad; “help sort repeated inquiries so a person can assign them” makes it possible to investigate a specific need.

Imagine a team that receives requests by email. Some are frequently asked questions, while others describe new situations. An automatically generated answer might save work, but it could also mistake an exception for a routine question. It may be enough to improve a help page, add search, or create a template. Compare those options: using AI is not an objective in itself.

This exercise connects to the course journey: a need turned into a verifiable requirement lets you compare solutions; examples and acceptance criteria help check quality; and reviewing permissions, effects, and human oversight brings security into the work context. If you revisit the document-question project, first assess whether a search that shows sources and abstains without evidence meets the need. It is not always necessary to generate a new answer.

## Analyze the idea with a matrix

Fill in one row for each candidate task. The matrix requires you to consider what data would be needed, what could go wrong, and how you would know whether the test adds value. These examples are hypothetical; adapt the criteria to your context and your team's rules.

| Problem | Data needed | Main risk | Measure of success |
|---|---|---|---|
| Classify repeated inquiries before assigning them | Fictional or authorized examples with categories reviewed by a person | An urgent inquiry is put in the wrong category | Percentage of correct categories and number of significant errors |
| Find a procedure within documentation | Current documents and sources that may be consulted | An outdated answer or one with no traceable source | The person finds the correct paragraph and can verify where it came from |

When discussing data, note its origin, currency, format, and usage permissions. Do not paste personal, confidential, or internal information into an external tool if you do not know whether it is approved for that use. If there is no authorized option, practice with invented examples or public material. Also ask who would review the result and what impact an error would have. A task with significant consequences needs stronger human controls than an easy-to-correct suggestion.

The measure of success should include quality, not just speed. Count the current time, errors, manual corrections, and instances when the system would need to abstain. Agree on the criteria before the test so the definition of “success” is not changed after seeing the results.

## Design a small, reversible test

Start with a limited workflow and no automated decisions. You can make the first comparison in a local spreadsheet or even on paper; you do not need to pay for a platform to formulate the hypothesis.

1. **Record the current situation.** Observe a small, representative sample. If you cannot use real cases, create synthetic examples. Describe how long the process takes and what errors occur.
2. **Write a testable hypothesis.** For example: “In this sample, a suggested category reduces classification time without increasing errors that require correction.” Do not present it as a result that has already been proven.
3. **Compare alternatives.** Test a simple rule, improved search, or a template alongside the AI proposal. Use the same cases and have someone familiar with the task review the answers.
4. **Include difficult cases.** Test incomplete, ambiguous, and off-topic messages. Note whether the tool says it does not know or invents a convincing but incorrect answer.
5. **Decide what to do.** If the criteria are not met, stop the test or change the design. If they are met, document the limitations and get the necessary approval before expanding the scope.

The NIST AI Risk Management Framework can be a reference for thinking systematically about context, risks, and follow-up. NIST says that AI RMF 1.0 is under review and voluntary: check the page's status if you consult it again, and do not treat it as a universal requirement. It does not replace knowledge of the process or turn a small test into a guarantee that something will work.

## Verifiable practice

Choose a routine task you know and complete a matrix with one row per idea. State the problem in one sentence, indicate what data you would use without copying it, note the main possible harm, and define one quality measure and one effort measure. Then add an alternative that does not use AI and a condition for stopping the experiment.

The practice is ready when another person can read the matrix and answer: what would be tested, with which examples, who would review the results, and what evidence would allow the work to continue? If any of those points is blank, the next step is not automation: it is clarifying the need.
