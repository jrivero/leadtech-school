---
title: "Secrets, Validation, and Application Security"
description: "Protect credentials, validate data on the server, and apply least privilege through local practice that uses no real keys or external services."
module: "08-calidad-que-se-demuestra"
order: 5
duration: 40
level: "Intermediate"
objectives:
  - "Distinguish a secret from public configuration and keep it outside the client."
  - "Design input validation and server-side authorization for a specific case."
  - "Explain how to reduce the impact of a leaked credential and verify controls with synthetic data."
prerequisites:
  - "Know forms, requests, and responses in a web application."
  - "Understand identity and basic permissions."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP: Secrets Management Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html"
  - label: "OWASP: Input Validation Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
---

## Two different controls

A secret allows an operation to authenticate or be authorized: a password, API key, session token, or private certificate. It is not the same as public configuration, such as a function name or the application's public URL. Any value distributed in JavaScript, a mobile application, or a downloadable file should be considered visible to the person using the client. Do not put credentials in the frontend, documentation examples, screenshots, logs, or commits. If a key leaks, rotating or revoking it matters more than deleting it from the latest version: it may remain in history, caches, or copies.

Validation checks whether a value meets the expected format and rules. Authorization decides whether an identity may perform an action on a resource. They are different controls: the fact that `task_id` is a valid integer does not prove that the person sending it owns that task. Validate on the server even if the interface already helps the user; a request can be constructed outside the application. For an identifier, use the permitted format; for a title, set its type and length; for an operation, check the authenticated identity and its relationship to the resource before making a change.

For example, a profile form might accept a name between 1 and 80 characters after trimming whitespace. The server must obtain the identity from a verified session, not accept a browser-submitted `owner_id` field as proof of ownership. Return errors that explain what can be corrected, but do not reveal stack traces, queries, tokens, or another person's information. When saving, escape or encode the content for its output context; validation and encoding are not interchangeable.

A credential needs an appropriate location, permissions, rotation, and limited access. In development, use approved environment mechanisms and exclude local files from version control. In production, prefer a secret store or server-side mechanism managed by the team. Grant only the permission the task needs, separate test and production credentials, do not print them for debugging, and avoid sharing them with unapproved agents or services. “It's in an environment variable” describes a location, not a complete management plan.

## Defensive exercise with invented inputs

Use a fictional profile (`usuario_id` means “user ID” and `propietario` means “owner”): `usuario_id = "ana"`, task `{id: "T-2", propietario: "ana"}`, and submitted title `"  Plan  "`. Define three server outcomes: `aceptado` (“accepted”), `rechazado_por_formato` (“rejected for invalid format”), and `denegado` (“denied”). Include at least these cases: an empty title, a title with 81 characters, the same identity, and a different identity. Do not use real names or tokens.

1. First write the rule: only the task's owner may change the title; the allowed length is 1–80 after trimming whitespace.
2. Mark each input as valid or invalid and each actor as authorized or denied.
3. Describe where identity is checked, where text is validated, and which outcome each case returns.
4. Repeat the analysis imagining that the browser sends `propietario: "ana"` but the session belongs to `leo`. The server's authenticated identity must take precedence.
5. Note what credential an external integration would need and which component would read it; do not write an example value that could be mistaken for a real key.

## Check and solution

The rule returns `aceptado` (“accepted”) for Ana with “Plan”; `rechazado_por_formato` (“rejected for invalid format”) for an empty string or one with 81 characters; and `denegado` (“denied”) for Leo even if the title is valid. The identity in the request body does not change the result. Verify the activity by comparing each case with these rules; it does not need an API, account, or network. If your matrix leaves a case without an outcome or assigns two outcomes to one case, clarify the validation order and document the expected behavior.

For real code, add negative tests and review the configuration too: look for sensitive values in the diff and logs, check that the key is used only on the server side, and confirm that read and write permissions are separated where feasible. A local test demonstrates the case it exercises; it does not prove that the entire application is protected.

## Common mistakes

- **Trusting that hiding a frontend variable makes it a secret.** If it is delivered to the client, it can be inspected; move the operation to the server.
- **Validating only in JavaScript.** Repeat checks at the trusted boundary and reject invalid input before using it.
- **Confusing format with permission.** Check identity and ownership for every resource, not just whether the identifier exists.
- **Leaving a leaked key in place and deleting the file.** Revoke or rotate the credential, investigate its scope, and remove secondary exposure.
- **Granting broad permissions to avoid errors.** Reduce the scope and add only the capability the workflow needs.

## Summary

Keep secrets outside the client, limit access to them, and prepare a response to leaks. Validate types, sizes, and rules on the server, and check resource-level authorization using the authenticated identity. A synthetic matrix makes decisions visible without real credentials; no single test guarantees complete security.
