---
title: "Protecting APIs with the 2023 OWASP API Top 10"
description: "Understand the ten OWASP 2023 API risks and practice object- and field-level authorization using synthetic data in local Python."
module: "10-seguridad-desde-el-primer-dia"
order: 3
duration: 50
level: "Intermediate"
objectives:
  - "Identify the ten official categories in the OWASP API Security Top 10 2023."
  - "Distinguish object-, property-, and function-level authorization in an API."
  - "Verify a locally allowed response and a denied response with fictional data."
prerequisites:
  - "Know the purpose of an API and basic data structures."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP API Security Top 10 2023 — Introduction"
    url: "https://api-security.owasp.org/editions/2023/en/0x03-introduction/"
  - label: "OWASP API Security Top 10 2023 — Release Notes"
    url: "https://api-security.owasp.org/editions/2023/en/0x04-release-notes/"
---

## An API has boundaries of its own

An API lets clients and services request data or actions. The interface may hide options, but the API must validate identity, permission, requested properties, and consumption limits on its own. The curriculum specifically calls for OWASP API Security Top 10 2023; this lesson uses only that edition and keeps codes such as `API1:2023` so they are not confused with other catalogs.

Three similar controls answer different questions. **API1:2023 Broken Object Level Authorization** asks whether this account may act on this record. **API3:2023 Broken Object Property Level Authorization** asks which fields of the record the account may read or change. **API5:2023 Broken Function Level Authorization** asks whether the account may use that operation. Authentication alone does not resolve any of these three decisions.

| Code and official name | Defensive focus |
|---|---|
| API1:2023 Broken Object Level Authorization | Check the account's permission for each object and action. |
| API2:2023 Broken Authentication | Protect authentication, sessions, tokens, and account recovery. |
| API3:2023 Broken Object Property Level Authorization | Allow only properties appropriate to each role and operation. |
| API4:2023 Unrestricted Resource Consumption | Limit operation size, concurrency, frequency, and cost. |
| API5:2023 Broken Function Level Authorization | Verify that the account is allowed to run each function. |
| API6:2023 Unrestricted Access to Sensitive Business Flows | Protect sensitive processes with appropriate business controls and limits. |
| API7:2023 Server Side Request Forgery | Explicitly restrict the destinations a server can contact. |
| API8:2023 Security Misconfiguration | Keep options, errors, permissions, and environments securely configured. |
| API9:2023 Improper Inventory Management | Maintain an inventory of versions, routes, owners, and retirement plans. |
| API10:2023 Unsafe Consumption of APIs | Validate responses and failures from external services before trusting them. |

## Local activity

Implement a small rule with a fictional document. Save the code as `lectura_api.py` and run it with `python3 lectura_api.py`. It uses no HTTP, real credentials, additional packages, or external services.

```python
documentos = {
    "doc-demo": {
        "propietario": "ana",
        "titulo": "Plan de prueba",
        "estado": "borrador",
        "nota_interna": "dato sintético no visible al cliente",
    }
}

def leer_documento(usuario, identificador):
    documento = documentos.get(identificador)
    if documento is None or documento["propietario"] != usuario:
        return None
    return {
        "id": identificador,
        "titulo": documento["titulo"],
        "estado": documento["estado"],
    }

propio = leer_documento("ana", "doc-demo")
otro = leer_documento("luis", "doc-demo")
assert propio is not None
assert "nota_interna" not in propio
assert otro is None
assert leer_documento("ana", "id-inexistente") is None
print("OK: objeto autorizado, campos permitidos y denegación comprobados.")
```


The first check in `leer_documento` denies missing objects and objects belonging to someone else; that illustrates object-level authorization. The response is built field by field rather than returning the whole record, demonstrating an allowlist of properties. The four assertions check access by the owner, absence of the internal field, denial to another account, and denial for an unknown ID. A real API would add function-level permissions and input validation, but would not infer them from the object ID.

## Verification and outcome

The expected output is `OK: objeto autorizado, campos permitidos y denegación comprobados.` If an assertion fails, first compare the written policy with the fixture; keep the assertion that represents an important denial. The example shows the shape of a unit test; it does not test a deployed API. To apply the criterion to your project, add tests in its own code covering every route, role, and action, without sending requests to systems outside your scope.

## Common errors and solutions

- **Thinking a hard-to-guess ID authorizes access.** The server must evaluate permission for every object.
- **Returning the whole record and hiding fields in the interface.** Build responses from explicit properties, and validate fields that may be changed too.
- **Mixing up API1, API3, and API5.** Separate object, property, and function checks; an operation may need all three.
- **Adding authentication and declaring security complete.** Review resource limits, business flows, inventory, configuration, and external dependencies.
- **Automatically trusting a consumed API.** Treat its responses as inputs: validate format, fields, size, and error handling.

## Summary

The 2023 API Security Top 10 edition helps identify risks specific to programmatic interfaces. Keep the codes and names from that edition, distinguish object-, property-, and function-level authorization, and apply resource and inventory controls. The activity locally checks a safe read with fictional data; real tests must run in your own environment and within authorized scope.
