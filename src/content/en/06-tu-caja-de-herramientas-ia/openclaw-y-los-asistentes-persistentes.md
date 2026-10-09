---
title: "OpenClaw and Persistent Assistants"
description: "Understand OpenClaw as a persistent assistant and design a least-permission test with fictional data, without connecting email, calendars, or broad controls."
module: "06-tu-caja-de-herramientas-ia"
order: 14
duration: 45
level: "Beginner"
objectives:
  - "Explain what persists in an assistant connected to OpenClaw and what depends on its configuration."
  - "Distinguish tool policies, approvals, and environment isolation."
  - "Design a test activity that uses neither personal accounts nor broad permissions."
prerequisites:
  - "elegir-herramientas-sin-perder-el-control"
  - "privacidad-sesgos-y-uso-responsable"
updatedDate: '2026-10-08'
sources:
  - label: "OpenClaw: what OpenClaw is"
    url: "https://docs.openclaw.ai/help/faq/what-is-openclaw"
  - label: "OpenClaw: tool permissions"
    url: "https://docs.openclaw.ai/gateway/security/tool-permissions"
  - label: "OpenClaw: execution approvals"
    url: "https://docs.openclaw.ai/tools/exec-approvals"
---

## Core Idea — Conceptual Explanation

OpenClaw is an assistant you can run on infrastructure you manage. Its Gateway is the always-available control plane; the product may offer stateful sessions, memory, and a workspace that persist between interactions, as well as configurable channels and tools. That does not mean it remembers everything forever or that a previous response is a reliable source: persistence and its scope depend on configuration, so review what is retained and how it is deleted.

Persistence is useful if an assistant needs to resume work context, but it also increases what needs protection. The Gateway responds on configured channels and may route tasks to model providers. The documentation distinguishes external providers from a local model option; therefore, hosting the Gateway on your computer is not enough to conclude where prompts are processed. Verify which model and services are active before entering data. Also decide what information may be retained and for how long; if you share the Gateway, confirm identities, roles, and channel policies. The documentation covers multi-user deployments and distinguishes who initiated or owns each session.

Permissions, approvals, and isolation are distinct controls. Current guides explain that Full Access, including the default Full Access mode, can authorize permitted changes without asking for approval; restricted modes may require it. A tool list and limited workspace define scope; the sandbox aims to isolate execution. Do not assume that enabling one of these controls compensates for the absence of the others. If you cannot confirm which policy applies to the version you use, do not enable actions.

## Concrete Example

You want an assistant to summarize a fictional list of tasks for a school project. The goal is to receive a summary in chat, not update the task manager, send messages, or create calendar events. For this task, a sample text and a written response are enough. Reading email, checking a calendar, controlling devices, or running commands adds nothing; exclude those actions by design, even if the assistant offers those integrations.

## Guided Practice — Step-by-Step

1. State the role in one verifiable sentence: “Summarize these three fictional tasks in one paragraph and do not change or send anything.”
2. Write three invented entries in a disposable sheet or document. Do not use real names, credentials, work messages, or customer information.
3. Draw a matrix with four columns: action, accessible data, possible effect, and decision. For this case, allow reading only the fictional text and writing a response; require human review before writing; deny terminal, browser, outbound messaging, email, calendar, and device control.
4. Simulate three requests: summarize the text, modify the document, and send the summary to someone else. For each, explain which tool it would require, which limit you would set, and whether the activity allows it. The last two must be stopped because they exceed the purpose.
5. Decide whether the assistant should remember anything afterward. For this exercise, nothing: record that the context is temporary and define how you would check that a future real test does not retain more than agreed.
6. Do not connect real accounts or enable Full Access to complete the activity. If you later test OpenClaw, start in an isolated instance with synthetic material, no personal channels, and tool and execution policies you have checked in the current documentation.

## Validation and Troubleshooting

The matrix is well designed if every allowed permission is necessary to summarize the text and every external or persistent action is denied or requires an explicit human decision. Also check that “Full Access” is not active and that the tool and workspace limits match the task. If the assistant says it remembers a note, that does not prove it was saved: look for evidence in the configured storage or treat the claim as unverified. If it requests an unplanned capability, stop and adjust the goal or deny the action; do not broaden all permissions to avoid a question. This manual practice evaluates your policy; it does not certify an installation's security.

## Common Mistakes

- Confusing an always-available Gateway with perfect or unlimited memory.
- Assuming that “runs on my infrastructure” means the model provider never receives data.
- Accepting Full Access because it is convenient or because the system requests an action.
- Treating approvals as isolation, or the sandbox as a complete permissions list.
- Connecting real email, calendar, or devices before demonstrating that they are needed.

## In Summary

OpenClaw can support an assistant with persistent sessions and tools; that continuity requires deciding what it remembers and what it can do. Start with invented data, minimal permissions, and no real accounts. If you cannot verify the effective policy, stop the test.
