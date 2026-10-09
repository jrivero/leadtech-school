---
title: "Web Risks and the OWASP Top 10"
description: "Interpret OWASP Top 10:2025 for web applications and practice an access check with fictional data and verifiable controls."
module: "10-seguridad-desde-el-primer-dia"
order: 2
duration: 45
level: "Intermediate"
objectives:
  - "Recognize the ten official categories in OWASP Top 10:2025."
  - "Relate a defensive decision to the web risk it helps reduce."
  - "Check a local access rule using fictional identities and records."
prerequisites:
  - "Understand web requests, functions, and basic conditionals."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP Top 10:2025 — Introduction"
    url: "https://top10.owasp.org/2025/0x00_2025-Introduction/"
  - label: "OWASP Top 10 — publication status"
    url: "https://owasp.org/projects/top-ten"
---

## What OWASP Top 10:2025 represents

As of October 8, 2026, the project's official page identifies OWASP Top 10:2025 as the most recently published edition. This lesson reflects that edition, not the 2021 edition. Its categories help people discuss web application risks; they are not a testing recipe, a security guarantee, or an automatic severity rating for a particular application. The number identifies a category, but the priority of a case depends on its data, exposure, and impact.

The names below are kept in their official form so they can be found in documentation and reviews. The defensive explanation indicates a decision associated with each risk.

| Code and official name | Defensive focus |
|---|---|
| A01:2025 Broken Access Control | Authorize each action and resource on the server; deny by default. |
| A02:2025 Security Misconfiguration | Review secure defaults, debugging options, permissions, and exposed configuration. |
| A03:2025 Software Supply Chain Failures | Know dependencies and artifacts; review their provenance, versions, and build process. |
| A04:2025 Cryptographic Failures | Classify data and protect it with appropriate mechanisms and key management. |
| A05:2025 Injection | Keep data separate from instructions and encode output for its context. |
| A06:2025 Insecure Design | Define security requirements and abuse scenarios before implementation. |
| A07:2025 Authentication Failures | Protect sign-in, account recovery, sessions, and sensitive operations. |
| A08:2025 Software or Data Integrity Failures | Verify the integrity and provenance of software, configuration, and trusted data. |
| A09:2025 Security Logging & Alerting Failures | Record useful events, alert on relevant signals, and rehearse follow-up. |
| A10:2025 Mishandling of Exceptional Conditions | Handle errors and abnormal states in a controlled way, without failing open. |

## Defensive example: access to a note

A screen can hide other people's notes, but that visual decision is not authorization. The server must check who is authenticated and whether they may perform the requested action on that record. This local example represents that rule and risk A01:2025; it does not start a server or send requests.

## Local activity

Save the block as `acceso_web.py` in a temporary folder and run it with `python3 acceso_web.py`. The dictionary contains synthetic records; Python 3 and `assert` are enough.

```python
documentos = {
    "nota-demo": {"propietario": "ana", "publica": False},
    "guia-demo": {"propietario": "ana", "publica": True},
}

def puede_leer(usuario, identificador):
    documento = documentos.get(identificador)
    return documento is not None and (
        documento["publica"] or documento["propietario"] == usuario
    )

assert puede_leer("ana", "nota-demo")
assert not puede_leer("luis", "nota-demo")
assert puede_leer("luis", "guia-demo")
assert not puede_leer("ana", "id-inexistente")
print("OK: permisos explícitos comprobados con cuatro casos ficticios.")
```


`documentos` is the test set. The function first looks up the record and allows reading only if it is public or belongs to the identity it receives. If it does not exist, the condition returns `False`. The assertions cover the owner, another account, a public resource, and an unknown resource; together they prevent a single “happy path” from hiding an overly broad rule. In production, identity must come from the server's authenticated context, and the check must be repeated on every route that accesses the data.

## Verification and outcome

The correct result is `OK: permisos explícitos comprobados con cuatro casos ficticios.` A failed assertion indicates that the example implementation does not follow one of the documented decisions. You can change the fixture to represent another policy, but update the expectations too and record why. The exercise checks only one local access rule; it does not cover authentication, cryptography, logging, dependencies, or the other risks in the table.

## Common errors and solutions

- **Treating the Top 10 as an exhaustive list.** Use it to start questions; complement the analysis with requirements, architecture, and product context.
- **Relying on visual-only controls.** Enforce authorization on the server for reading, editing, exporting, and deleting, even when the interface already hides the action.
- **Confusing identity with permission.** Authentication answers which account this is; authorization decides what it may do to this resource.
- **Stopping at a category name.** Write down a concrete control and evidence: a test, review, or expected configuration.
- **Using a different edition out of habit.** When comparing documentation, check that the codes match OWASP Top 10:2025; do not mix in names from another edition.

## Summary

OWASP Top 10:2025 provides shared vocabulary for ten families of web risks, not automatic approval of a product. Learn the official names, relate each to design controls, and verify at least one rule with fictional data. In particular, resource authorization must be enforced on the server and tested for both allowed and denied access.
