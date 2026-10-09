---
title: "Validation, Authorization, and Defensive Encoding"
description: "Separate format checks from business rules, enforce permissions on the server, encode for the output context, and report errors without exposing internals."
module: "10-seguridad-desde-el-primer-dia"
order: 6
duration: 35
level: "Intermediate"
objectives:
  - "Validate inputs using allowlist rules for type, length, and meaning."
  - "Explain why authorization is checked on the server for each resource."
  - "Choose context-specific encoding and controlled errors for safe output."
prerequisites:
  - "Understand the difference between trusted and untrusted input."
  - "Know basic Python functions, dictionaries, and assertions."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP Input Validation Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
  - label: "OWASP Authorization Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
  - label: "OWASP Cross Site Scripting Prevention Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
  - label: "OWASP Error Handling Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html"
---

A well-formed request can still ask for a forbidden action. Separate three controls: validate the data, authorize the identity for the object, and encode the output for its context. No character filter protects every destination.

## Validation with explicit rules

Validate on the server even if the interface catches errors early. Define type, size, format, and business rule. For `status`, accept only known options (`abierta`, `hecha`). For a title, allow legitimate punctuation, trim spaces if appropriate, and limit its length. An allowlist states what is accepted; a denylist tries to anticipate every “bad” form and may block valid cases without replacing the right control.

Validation should happen after interpreting the received format and before using the data. Accepting a number as an integer does not prove its value makes sense. If a request includes fields the function is not allowed to modify—such as `owner_id` or `role`—do not copy them automatically onto the object. Validate each field and reject the operation if the structure is not what was expected.

## Authorization for every action

Authentication answers “Who is this identity?”; authorization answers “May it perform this action on this object?” The interface may hide a button, but that is not a security boundary: the decision must be made in the server layer that performs the operation. Check permission on every request and for every record; knowing or guessing an ID does not grant access. Start by denying by default and grant only the minimum capability needed.

In a task example, the identity context must come from a session or trusted mechanism managed by the server, not from an editable request-body field. To change a task, verify that the acting person's ID and the owner match, as well as the required permission. Tests should include an allowed case and a denied one.

## Contextual encoding and errors

Encoding output means transforming data so it is interpreted as text in the context where it is inserted. HTML, attributes, URLs, JavaScript, and CSS have different rules. In a modern template, keep automatic escaping for text; if you display text in an HTML node with Python, `html.escape` illustrates that context—it is not a solution for building JavaScript, URLs, or SQL queries. Use parameterized queries for SQL: HTML escaping is not valid for that destination.

When something fails, return a code and a useful but limited message, such as “Check the fields” or “The operation could not be completed.” Do not send stack traces, queries, internal paths, or configuration details to the client. If diagnosis is needed, keep technical context in protected logs and avoid unnecessary secrets or personal data.

## Local activity

Test the rules as isolated functions using standard Python. Run `python3 -` in a terminal; paste the block and end the input with `PY`. No API is started: the two profiles and task are invented fixtures.

```bash
python3 - <<'PY'
from html import escape

def validar_titulo(valor):
    if not isinstance(valor, str):
        return None
    valor = valor.strip()
    return valor if 1 <= len(valor) <= 80 else None

def puede_editar(tarea, identidad):
    return (
        identidad is not None
        and identidad["id"] == tarea["owner_id"]
        and "tasks:edit" in identidad["permissions"]
    )

tarea = {"id": "T-01", "owner_id": "ana"}
ana = {"id": "ana", "permissions": {"tasks:edit"}}
leo = {"id": "leo", "permissions": {"tasks:edit"}}
titulo = validar_titulo("  Revisión & notas  ")
assert titulo == "Revisión & notas"
assert validar_titulo("   ") is None
assert puede_editar(tarea, ana)
assert not puede_editar(tarea, leo)
assert escape(titulo, quote=True) == "Revisión &amp; notas"
print("OK: validación, permiso por propietario y escape HTML")
PY
```


`validar_titulo` checks type, whitespace, and length; `puede_editar` separates permission from validation; `escape` is used only for an HTML-text example. In production, do not infer identity from user-supplied data: the profiles here only simulate trusted context.

## Verification and outcome

The expected output is `OK: validación, permiso por propietario y escape HTML`. Every `assert` should pass: an ordinary title is retained, an empty one fails, Ana can edit her task, Leo cannot, and the ampersand is represented as text in HTML. The original value can be stored as ordinary text and encoded when rendered in the appropriate context.

## Common errors and solutions

- **Validating only in the browser.** Repeat the rules on the server, which makes the final decision.
- **Blocking punctuation to avoid problems.** Define type, length, and semantics; do not confuse a business allowlist with filters for “malicious” characters.
- **Hiding the button as authorization.** Verify each action on the server and for each object.
- **Escaping everything once when received.** Encode at output for the specific context; use parameters for SQL queries.
- **Returning the full exception.** Give the user a controlled error and limit internal detail to protected logs.

## Summary

Validation, authorization, and encoding are different but complementary controls. Accept only data that meets explicit rules, make permission decisions on the server for each resource, and encode values for the context where they are presented. Deny by default and report failures without leaking internal details.
