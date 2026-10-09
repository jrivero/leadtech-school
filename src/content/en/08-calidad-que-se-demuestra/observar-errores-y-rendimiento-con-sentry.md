---
title: "Observing Errors and Performance with Sentry"
description: "Design useful events to locate errors and slowdowns with Sentry, limit sensitive data, and learn to distinguish observation from automatic correction."
module: "08-calidad-que-se-demuestra"
order: 4
duration: 40
level: "Intermediate"
objectives:
  - "Distinguish an error event from a performance measurement and an operation trace."
  - "Define the minimum context that helps reproduce a failure without exposing personal data."
  - "Design a verifiable response based on a synthetic event."
prerequisites:
  - "Know application errors and the path of a request."
  - "Understand that production logs can contain sensitive data."
updatedDate: '2026-10-08'
sources:
  - label: "Sentry: official details on issues and events"
    url: "https://docs.sentry.io/product/issues/issue-details/"
  - label: "OWASP: guide to protecting sensitive information in logs"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html"
---

## Observe before trying to reproduce

In a real application, someone may report that “the screen got stuck loading” without remembering what they did. Observability collects signals to understand the journey: an event may describe an error, a measurement may show duration or resource use, and a trace may relate operations involved in a request. They are not synonyms and do not guarantee that everything that happened can be reconstructed. Each signal should answer an operational question and respect privacy boundaries.

Sentry is a monitoring platform that documents error capture and analysis, as well as related performance features. The SDK and specific options vary by platform and change; this lesson does not prescribe a specific initialization or method name. Before instrumenting an application, consult the official guide for the language, review which data is collected by default, and validate the configuration in a non-production environment. Do not send private information for more “context” if a technical identifier would be enough.

A useful event might include the environment, deployed version, operation name, and a random request identifier. Avoid logging passwords, tokens, authentication headers, complete payment details, or free-form user text. If you need to associate sessions, apply a documented pseudonymization and retention policy. Also limit who can view events, how long they are kept, and which alert should wake someone up. A dashboard with hundreds of unprioritized alerts can hide the important incident.

## Example with a fictional record

Suppose version `demo-3` produces an error while saving tasks. A synthetic record might say: environment `pruebas` (“test”), version `demo-3`, logical route `guardar_tarea` (“save task”), type `TimeoutError`, identifier `req-7f2a`, and approximate duration. It would not include the user's text or email address. That summary helps locate the code that saved the task, compare versions, and repeat the case with fictional data. It does not prove the cause; it only helps formulate a hypothesis.

Follow-up begins after observation: confirm whether the failure recurs, identify the affected version, find a local reproduction, fix the cause, and add a regression test. Then verify that the alert stops appearing under the relevant conditions. Marking an event as resolved in a console does not automatically fix the application. If the system sends notifications or takes automatic actions, also review recipients, permissions, frequency, and potential information exposure.

## Offline activity

1. Copy the fictional record above into your notes and add a hypothesis about which part of the code you would inspect.
2. Design an unsafe version that includes a password or the full task text; cross it out and explain why it is not needed to reproduce the error.
3. Add a concrete next action: check the timeout, repeat a test write, or compare behavior between versions.
4. Define when you would alert the team and who can close the alert; use one observable criterion, not “it seems fixed.”
5. Turn the record into a manual test or local test with invented values. Do not install an SDK or send the event to Sentry.

## Check and solution

The final record is useful if it helps locate a flow, a version, and a hypothesis without revealing sensitive content. A reasonable solution keeps the environment, version, operation, error type, request ID, and an approximate interval; it omits email, password, and private text. A verifiable next action could be to reproduce a timeout in a local double and confirm a regression test. The practice teaches how to design context; it does not create telemetry or confirm that a project sends events correctly.

If a real integration seems necessary, limit sending to a test environment and review filters, permissions, retention, alerts, and applicable consent before sharing data. A more detailed event is not always more useful; add each field only when it informs an operational decision and can be adequately protected.

## Common mistakes

- **Logging the complete request for convenience.** Keep only necessary fields and remove or transform sensitive data before sending.
- **Treating a trace as a causal explanation.** It is still partial evidence; compare it with the code and a reproduction.
- **Resolving alerts without fixing or verifying the issue.** Document the cause, change, and regression check.
- **Sending everything from day one.** Validate the SDK in a controlled environment and adjust data and volume.
- **Confusing this record with a Sentry integration.** State what was simulated and what requires real configuration.

## Summary

Observability helps locate problems with events, measurements, and traces, always using minimal context. Use Sentry or another platform as appropriate for the project, but verify its current guide and data privacy. Turn signals into hypotheses, reproduction, and a test; the tool does not replace analysis or guarantee that the error has disappeared.
