---
title: "Communication, Feedback, and Collaboration"
description: "Practice clear conversations, fact-based feedback, and asynchronous collaboration with short templates for reviews, disagreements, and team agreements."
module: "12-crece-como-profesional"
order: 2
duration: 60
level: "Beginner"
objectives:
  - "Describe an observation, its impact, and a specific request without judging the person."
  - "Receive feedback by listening, asking questions, and agreeing on a next step."
  - "Document decisions and reviews so remote collaborators can understand them."
prerequisites: []
updatedDate: '2026-10-08'
sources:
  - label: "GitHub Docs: collaborating on pull requests"
    url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests"
  - label: "GitHub Docs: reviewing changes in pull requests"
    url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests"
---

## Communicate so the work can move forward

The previous practices produced specifications, diffs, tests, and security decisions. To collaborate, that evidence needs readable context: this lets a human reviewer question your code or an AI suggestion without turning a technical disagreement into a personal judgment.

Collaboration does not mean always agreeing. It means making the problem understandable, separating what was observed from what is assumed, and agreeing on who will do what. In a technical conversation, a phrase like “this is wrong” does not say what behavior fails or what help is needed. Replace the general judgment with a fact another person can check.

Try this structure when giving feedback:

> **Context:** What task or situation is this about?<br />
> **Observable fact:** What did you see or read, without describing the person with an adjective?<br />
> **Impact or risk:** What specific effect does it have?<br />
> **Request:** What change, explanation, or decision would help?<br />
> **Next step:** Who will do it, and when will it be reviewed?

For example, instead of saying “you never document anything,” describe how an installation instruction does not say how to configure a required variable, explain that a newcomer cannot start the project, and ask for an example to be added. The request can be a question if you do not yet know the intent: “Could we clarify this step, or is there an alternative I am not seeing?”

## Receive and respond

When you receive an observation, listen to the end before defending yourself. Summarize what you understood: “If I follow you, the no-results case is confusing because we do not show a message.” Then ask for an example, the expected criterion, or the priority. You can accept the change, suggest another solution with reasons, or point out missing information. Feedback is not an automatic order; it does deserve an explicit, respectful response.

Close with a verifiable agreement: “I’ll add an empty state and a test; I’ll let you know when it’s ready.” If you cannot commit to a date, offer the next time you will update the team. In a disagreement, first confirm the shared objective, then compare options and consequences. If the conversation gets heated, pause, summarize what you understood, and suggest picking it up again with facts or with a facilitator.

## Asynchronous collaboration

In an incident or pull request, make it easier for someone to review without having to guess. Use this template:

```text
Objetivo y contexto:
Qué cambió / qué no cambió:
Cómo probarlo (pasos y resultado esperado):
Riesgos o límites conocidos:
Pregunta concreta para quien revisa:
```

When reviewing code, comment on the line or behavior, not the intelligence or intent of the person who wrote it. Separate a blocker that affects the requirement from an optional suggestion. If you ask a question, explain the consequence you are concerned about. When a team uses GitHub, a pull request brings together a description, discussion, review, and changes; consult the official guide to learn about its options and adapt them to the team's process.

Important decisions deserve a short note: decision, reason, alternatives considered, owner, and date to review whether the decision is still valid. Do not turn every exchange into a meeting; bring people together when shared context is missing or the disagreement is hard to resolve in writing.

## 15-minute exercise

Choose a fictional situation: a test fails because the error message does not say how to correct the input. First write the impulsive reaction you might have. Rewrite it using the observation, impact, and request structure. In pairs, one person gives the feedback and the other receives it; the listener must summarize it before responding. Switch roles, then finish by writing down an action, an owner, and a way to verify it.

Review the result: Could a third person understand what happened? Can the request be completed or clarified? Is a fact distinguished from an interpretation? If something sounds accusatory, describe the specific behavior and its effect again. This exercise works for both a conversation and a written review.

## Mistakes to avoid

Do not accumulate observations for weeks and present them as a list of flaws. Do not use sarcasm, absolutes such as “always,” or vague messages that force someone to guess. Also, do not ask an AI tool to decide who is right: it can help make a sentence clearer, but you must validate the tone, context, and proposal. Do not enter private code, customer data, or confidential conversations into external services; if using a tool is not authorized, prepare for the conversation without it. Avoid activating paid services for this exercise: paper, an already available shared document, or an authorized local option are enough.
