---
title: "Choosing Tools Without Losing Control"
description: "Choose an AI tool based on the task, data, and permissions; test a small case and keep a clear way to review and stop it."
module: "06-tu-caja-de-herramientas-ia"
order: 1
duration: 25
level: "Beginner"
objectives:
  - "Define the problem before comparing assistants, editors, and automations."
  - "Review a tool's data, permissions, autonomy, and current terms."
  - "Design a small test that lets you accept, correct, or reject an option."
prerequisites:
  - "privacidad-sesgos-y-uso-responsable"
updatedDate: '2026-10-08'
sources:
  - label: "NIST: AI Risk Management Framework"
    url: "https://www.nist.gov/itl/ai-risk-management-framework"
  - label: "OECD: definition of an AI system"
    url: "https://www.oecd.org/en/publications/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system_623da898-en.html"
---

## Core Idea — Conceptual Explanation

The best tool is not the one with the most features, but the one that solves a specific task with risks you can manage. Before opening a catalog, describe the input, the desired result, who will review it, and what will happen if it is wrong. “Help me with AI” is too broad; “classify five fictional questions into three categories and flag uncertain ones” can be tested.

Compare at least five dimensions. **Fit**: is the tool designed for writing, programming, design, or automation? **Data**: what would you send, and what does its current documentation say about processing and retention? **Permissions**: can it read files, change code, execute actions, or communicate outside your team? **Review**: can you see sources, changes, and results before using them? **Dependency**: can you export your work or switch providers? An affirmative answer to one question does not replace the others.

Features and terms change. A familiar name does not tell you which model is behind it, whether a capability is enabled for an account, or whether an organization has restricted its use. Check the official documentation, the visible version or date, and internal policy before using real data. Do not confuse “runs on my computer” with “risk-free”: extensions, remote services, logs, or files may share data in other ways.

Start with the minimum intervention. If an ordinary rule solves the task transparently, you may not need generation. If the model proposes an answer, limit the first experiment to a draft that a person approves. The more actions a system can take, the more attention you should give to permissions, reversibility, and oversight.

## Concrete Example

A small association wants to answer frequently asked questions about a book club. It could choose a text assistant to draft replies using a fictional schedule, a local document to store questions, or an automation with access to email. To learn, it is enough to test the wording with an invented guide. Connecting the mailbox adds permissions and consequences that are not needed to check whether a draft follows the information.

## Guided Practice — Step-by-Step

1. Write a low-impact task in one sentence and create fictional data to test it.
2. Note the output you would accept and two failures that would make you reject it—for example, inventing a date or ignoring an exception.
3. Choose two types of tools, not brands right away. For each one, check the current official documentation, data handling, permissions, review options, and whether you can stop or reverse the action.
4. Test the least autonomous option with the same example. Do not enter credentials, personal information, work data, or API keys.
5. Compare the result with your expected answer, record errors, and decide whether to use it only for drafts, try again with better instructions, or not adopt it.
6. If the tool does not explain its limits or let you review what it will do, do not give it more access to compensate.

## Validation and Troubleshooting

Evaluate using criteria written before the test: accuracy, omitted data, clarity, review time, and consequential errors. If it fails, find out whether the cause is the input, prompt, source, model, or configuration. Change one variable and try again. Keep a person responsible for the final decision, especially when the result affects others.

## Common Mistakes

- Choosing an application because it is popular or has an impressive demo.
- Pasting confidential information and discovering afterward that this was not an authorized environment.
- Granting write, terminal, or email permissions when a text response would have been enough.
- Assuming a feature's name guarantees its availability or privacy.
- Measuring only how long generation takes and ignoring the human time spent reviewing and correcting it.

## In Summary

Describe the task first; then compare data, permissions, reversibility, and evidence. Run a fictional test, limit autonomy, and set a condition for stopping. A tool is justified when it improves measurable work without obscuring who is accountable for the result.
