---
title: "Defensive Lab: Fixing an Application"
description: "Combine validation, owner-level permissions, immutable updates, controlled errors, and tests in a local task model, without a server or network."
module: "10-seguridad-desde-el-primer-dia"
order: 8
duration: 40
level: "Intermediate"
objectives:
  - "Model task API controls with local functions and synthetic data."
  - "Test object permissions, field allowlists, and rejection of invalid states."
  - "Verify that a denial does not modify data and that HTML output is contextually encoded."
prerequisites:
  - "Have completed the lessons on validation, authorization, and defensive encoding."
  - "Know how to run Python 3 and read simple assertions."
updatedDate: '2026-10-09'
sources:
  - label: "OWASP Application Security Verification Standard (ASVS)"
    url: "https://owasp.org/www-project-application-security-verification-standard/"
  - label: "OWASP Input Validation Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
  - label: "OWASP Authorization Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
  - label: "OWASP Secure Code Review Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html"
---

The fictional case is a task API where each person edits their own items. There is no deployed server or vulnerable target. The exercise does not open ports, make requests, or scan systems, and needs no accounts, external services, dependencies, or payments. Everything lives in memory while Python runs.

The example contract allows changing only `title` and `status`. The title must be text of 1 to 80 characters after trimming surrounding whitespace; the status must belong to a fixed allowlist. The identity and its permissions represent context the application would obtain from a validated server-side session, never from the editable request body. The person must own the task and have the `tasks:edit` capability. The function returns a controlled status and a new copy of the store, so a rejection does not leave a partial change.

Before running it, relate each rule to its evidence: field → allowlist; actor → owner and capability; result → new copy or denial. The lab does not implement cryptographic authentication or HTTP transport: those components are outside this local model.

## Local activity

Open a local terminal and paste the entire block, including `python3 - <<'PY'` and the final `PY` line. Do not use accounts or real information: Ana, Leo, and the tasks are synthetic fixtures. The code uses only standard Python, in-memory collections, and assertions.

```bash
python3 - <<'PY'
from html import escape

ESTADOS = {"abierta", "hecha"}
CAMPOS = {"title", "status"}

def validar(cambios):
    if not isinstance(cambios, dict) or not cambios or set(cambios) - CAMPOS:
        return None
    limpios = {}
    if "title" in cambios:
        titulo = cambios["title"]
        if not isinstance(titulo, str):
            return None
        titulo = titulo.strip()
        if not 1 <= len(titulo) <= 80:
            return None
        limpios["title"] = titulo
    if "status" in cambios:
        estado = cambios["status"]
        if not isinstance(estado, str) or estado not in ESTADOS:
            return None
        limpios["status"] = estado
    return limpios

def autorizado(tarea, actor):
    if not isinstance(actor, dict):
        return False
    permisos = actor.get("permissions", ())
    return (
        actor.get("id") == tarea["owner_id"]
        and isinstance(permisos, (set, frozenset))
        and "tasks:edit" in permisos
    )

def actualizar(datos, tid, actor, cambios):
    tarea = datos.get(tid)
    if tarea is None or not autorizado(tarea, actor):
        return "denied", datos
    limpios = validar(cambios)
    if limpios is None:
        return "invalid", datos
    nuevo = dict(datos)
    nueva = dict(tarea)
    nueva.update(limpios)
    nuevo[tid] = nueva
    return "ok", nuevo

mensajes = {"ok": "Guardado.", "invalid": "Revisa campos."}
datos = {"T-01": {"owner_id": "ana", "title": "Preparar demo", "status": "abierta"}}
ana = {"id": "ana", "permissions": frozenset({"tasks:edit"})}
leo = {"id": "leo", "permissions": frozenset({"tasks:edit"})}

estado, nuevo = actualizar(datos, "T-01", ana, {"title": "  Repasar permisos  ", "status": "hecha"})
assert estado == "ok" and nuevo["T-01"]["title"] == "Repasar permisos"
assert nuevo["T-01"]["status"] == "hecha" and datos["T-01"]["title"] == "Preparar demo"
estado, igual = actualizar(datos, "T-01", leo, {"title": "Cambio"})
assert estado == "denied" and igual is datos
assert actualizar(datos, "T-01", ana, {"status": "pausada"})[0] == "invalid"
assert actualizar(datos, "T-01", ana, {"owner_id": "leo"})[0] == "invalid"
assert mensajes.get("denied", "No se pudo completar") == "No se pudo completar"
assert escape("Plan & revisión", quote=True) == "Plan &amp; revisión"
print("OK: aserciones defensivas completadas")
PY
```


The order in `actualizar` is deliberate: find and authorize; validate all fields; only then return a modified copy. `actor` simulates context established by the server; it does not come from `cambios`, and ownership cannot be edited. The `denied` response unifies a missing resource and a lack of permission. In a real API, map statuses to stable messages and log only necessary diagnostic information in a protected location. `escape` illustrates HTML text only; an API serializes JSON and keeps its templates' automatic escaping.

## Verification and outcome

One line should appear: `OK: aserciones defensivas completadas` (defensive assertions completed). Check that the owner can save the trimmed title and allowed status while `datos` remains unchanged; another identity should receive `denied` and the same store. An unknown status and an `owner_id` field are rejected. The public message does not reveal internals. These assertions check specific rules in the model; they do not test a real API or all its layers. Repeat the test after each small change.

## Common errors and solutions

- **Taking `actor` from the request body.** In a real application, use the authenticated context established by the server; the dictionaries here are only fixtures.
- **Checking the role but not the object.** Compare owner and resource on every operation; having edit capability does not grant access to every task.
- **Validating after mutation.** Validate the complete set before creating and returning the new state.
- **Copying every submitted field.** Define editable fields and reject the rest; do not allow this function to change ownership or permissions.
- **Using `escape` as a universal defense.** Encode for the right output context; rich HTML, SQL, and URLs each need their own controls.
- **Exposing stack traces to help with debugging.** Return limited messages to the client and keep necessary diagnostics only in protected logs.

## Summary

The lab combines field and value allowlists, owner-level authorization on the server, least privilege, updates without partial mutation, controlled errors, and context-specific encoding. Test success, denial, and boundaries. Keep the exercise local, deterministic, and synthetic: a pure function and its assertions let you practice controls without attacking or deploying a service.
