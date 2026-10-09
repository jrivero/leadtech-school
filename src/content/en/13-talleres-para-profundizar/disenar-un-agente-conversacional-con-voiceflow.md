---
title: "Designing a Conversational Agent with Voiceflow"
description: "Prototype a support agent with clear boundaries, choose between a playbook and a workflow, and validate conversations before connecting tools or publishing."
module: "13-talleres-para-profundizar"
order: 3
duration: 55
level: "Intermediate"
objectives:
  - "Separate global instructions, knowledge, playbooks, and workflows in a conversational design."
  - "Define a safe fallback when the agent does not know an answer or needs an external action."
  - "Build a manual set of conversations to validate routes, content, and boundaries."
prerequisites:
  - "Know how to describe a user need and its edge cases."
  - "Understand the basics of generative assistants and sensitive data."
updatedDate: "2026-10-08"
sources:
  - label: "Voiceflow official documentation: agent-building concepts"
    url: "https://www.voiceflow.com/docs/documentation/introduction"
  - label: "Voiceflow official documentation: testing"
    url: "https://www.voiceflow.com/docs/courses/chat-agent-quick-start"
---

## Design the conversation before opening the editor

A conversational agent is more than a prompt. You need to decide what it knows, what it can do, how it responds when a request is out of scope, and what tests will show that the flow is acceptable. Voiceflow documents different components for these roles: prompt and global instructions, playbooks for open-ended conversations, workflows for deterministic paths, a knowledge base, and connected tools. This workshop uses a fictional training center; all information and actions are simulated, so no account, integration, or publishing is required.

First write the agent's contract: “Help people find public workshop information; do not change registrations, promise places, or access personal data.” Decide who will use the conversation, in which channel, and which outcome remains under human control. A good boundary prevents a natural-language request from being interpreted as permission to perform an irreversible action.

## Choose the component based on the problem

Suppose the center publishes an invented office schedule and address for the exercise. An open-ended question such as “Which workshop would suit me if I am new to Python?” allows several conversations and may benefit from a playbook that guides exploration. In contrast, if a user asks to check a place, a real process would have precise steps: collect an identifier, verify it, show the authorized result, and confirm before any change. That path is better represented as a workflow with explicit conditions, not as free-form autonomy.

The prototype does not check a real place: the correct response is to explain that availability is not connected and direct the user to a person. This distinction should appear in the global instructions and in every test. Keep those instructions brief: role, objective, tone, boundaries, and fallback response. If you put every rule, data point, and decision into one paragraph, it becomes difficult to tell which layer produced the behavior.

## Activity: map a conversation on paper

1. Draw an initial entry point and three intents: ask about hours, choose a workshop, and request an unavailable action.
2. Write an expected response and the supporting information for each intent. For a question not covered, set an uncertainty response: “I do not have that information in the published material; please contact the team.”
3. Classify each branch as a flexible playbook or strict workflow. Mark in red every operation that would change an account, reservation, or payment; it must remain disabled in this exercise.
4. Prepare a short knowledge sheet with fictional facts, a review date, and internal provenance. Do not mix test notes with real documents or upload confidential material to an external service.
5. Write eight test conversations: a greeting, a direct question, synonyms, missing information, an ambiguous question, a user changing the subject, a request for someone else's data, and a malicious instruction embedded in quoted text.
6. Define an observable condition for each case: correct content, clarification question, handoff, or no tool call. Do not grade only whether it “sounds friendly.”

If you have access to a Voiceflow workspace, you can transfer the map to an unpublished test project: first configure the prompt and instructions, add the deterministic route, and load only the fictional sheet. If the Tests feature is enabled in your environment, use it with the conversations above; if it is not available, replay each turn manually and record the results in a table. Feature availability varies by product and workspace. Leave real tools disconnected and record the expected result, observed result, and cause of failure for each case.

## Validation and troubleshooting

A case passes if the agent gives the correct fact or acknowledges that it is missing, respects the boundaries, and does not trigger an unexpected side effect. If it invents a schedule, correct the source or the unknown-answer rule; do not add a vague “be precise” instruction and assume the problem is solved. If an open-ended route changes between attempts, reduce its autonomy at the step that requires certainty. If a fixed route takes the wrong path, first review the conditions and variable names.

Common mistakes include mixing playbooks and workflows without a purpose, enabling an API before defining permissions, loading documents without checking whether they are current, and testing only ideal questions. Automated evaluations can help review many transcripts, but they do not replace human inspection for privacy, potential harm, or authorization errors. A lab test should also be renewed when documents, tools, or instructions change.

## Wrap-up

The prototype is complete when it has boundaries, a traceable fictional source, eight tests, and a results table. Only after you understand those results would it make sense to connect a real tool, add access controls, and repeat the validation in an authorized environment. Designing an agent means designing its capabilities and refusals, not just its personality.
