---
title: "From Problem to Maintenance: The Software Lifecycle"
description: "Understand software work as a learning cycle spanning problem, design, delivery, operation, and maintenance, with feedback loops."
module: "03-disenar-antes-de-programar"
order: 1
duration: 35
level: "Beginner"
objectives:
  - "Identify common activities in a software lifecycle."
  - "Explain why phases can repeat and feed back into one another."
  - "Propose evidence for reviewing a product after delivery."
prerequisites:
  - "Have built a small program and tested its behavior"
updatedDate: "2026-10-08"
sources:
  - label: "NASA Software Engineering Handbook: Lifecycle Activities"
    url: "https://swehb.nasa.gov/spaces/SWEHBVD/pages/133235373/A.00%2BActivity%2BView"
  - label: "Agile Manifesto: Values for Software Development"
    url: "https://agilemanifesto.org/iso/es/manifesto.html"
---

## Software Lives Longer Than Its First Version

A software product begins with a need, not with a screen or a programming language. From there, a team explores the problem, defines behaviors, makes design decisions, implements changes, and checks results. It may then make the solution available to users, observe how it works, and fix or extend it. This collection of activities is commonly called the software lifecycle.

There is no single sequence that works for every project. The NASA Software Engineering Handbook organizes activities that can be used with traditional, agile, or other cycles, and notes that some tasks repeat throughout a project. This is useful even for a small application: clarifying a rule may reveal that the design needs to change; a test may show that a requirement was ambiguous; real use may bring a need no one anticipated.

## Example: Reminding Someone About a Loan That Is Almost Due

Suppose a library wants to send reminders. During discovery, ask who should be notified, how far in advance, and which channel is allowed. In the requirements, agree on a verifiable rule: “The system provides a list of loans due tomorrow.” During design, decide how to represent the date and where to read loan data. During implementation, create a function that selects those loans. In testing, check a date before, on, and after the target date.

Delivery does not mean the work is finished. During operation, someone might report that dates shift because of the time zone, or that they do not want to receive emails. The team investigates, adjusts the rule or design, and checks it again. If the feature is retired, the team must also consider data already stored and communicate the change. Maintenance means preserving the product’s usefulness and security over time, not just fixing incidents.

## A Practical Way to Move Through the Lifecycle

For a learning project, use these questions as a guide:

1. **Problem:** Who needs what, and what do they do now?
2. **Requirements:** What observable result defines success, and what is out of scope?
3. **Design:** Which data, rules, and boundaries are needed?
4. **Build and test:** What is the smallest change I can demonstrate?
5. **Delivery:** Who reviews it, and how does the user receive it?
6. **Operation:** How will I know it works in its environment?
7. **Maintenance:** What evidence would lead me to fix, improve, or retire the feature?

An iterative cycle repeats parts of this list through small deliveries. It does not mean improvising without a plan; it means seeking feedback before costly decisions accumulate. A regulated or high-risk project may require stricter documentation and formal reviews. A personal exercise can use a requirements note and three tests, as long as the evidence matches the actual risk.

## Step-by-Step Practice

1. Choose a specific improvement for the task manager, such as filtering completed tasks.
2. Write down who needs it and what they do today to solve the problem.
3. Draft a condition you can observe before and after the change.
4. Sketch which function, data, or interface might be involved, without choosing a library yet.
5. List an ordinary test, a boundary input, and a way to show the result to someone else.
6. Imagine a problem that occurs after delivery and write down what information you would need to investigate it.

## Check Your Work and Common Mistakes

Your map is useful if it connects a need to a rule, an implementation, tests, and a way to observe usage. If “done” only means that the code compiles, you have not yet checked whether it meets the need. If maintenance is absent from the plan, the team may be relying on no one reporting problems. If no one can describe the user or the benefit, revisit the problem before adding features.

Do not confuse a lifecycle with a rigid chain of phases that never repeat. Do not copy a large organization’s process for a one-afternoon exercise, either. Adapt documentation and review gates to the risk, but keep basic traceability: what you wanted to achieve, what you changed, and what evidence you obtained.

## Summary

Software work includes exploration, requirements, design, building, testing, delivery, operation, and maintenance. These activities feed back into one another and repeat differently depending on the context. Treat delivery as a milestone, not the end: learning from real use is part of development.
