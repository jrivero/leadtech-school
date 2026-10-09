---
title: "Think About Security Before Writing Code"
description: "Learn to identify assets and trust boundaries, prioritize risks, and define mitigations with evidence before implementing a feature."
module: "10-seguridad-desde-el-primer-dia"
order: 1
duration: 40
level: "Intermediate"
objectives:
  - "Identify assets, actors, and trust boundaries in a small feature."
  - "Describe a risk in terms of impact, control, and verifiable evidence."
  - "Create an initial threat model before implementing a solution."
prerequisites:
  - "Know basic variables, functions, and data structures."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP Threat Modeling"
    url: "https://owasp.org/www-community/Threat_Modeling"
---

## Security as a design decision

Security is not a checklist added at the end: it means deciding what must be protected, who may use each feature, and what evidence will show that the boundary works. Threat modeling organizes that conversation before a difficult-to-change decision becomes hidden in code. It does not require predicting every possibility; it helps focus on plausible scenarios and important consequences.

Start by scoping a specific feature, for example, saving and sharing private notes. Identify the assets—content, accounts, and permissions—legitimate actors, components, and trust boundaries. In this example, the browser sends a request, the server decides which account is authenticated, and the database stores the notes. A note ID arrives from the client, but it is not proof that the client owns the note.

A useful model answers four questions: What are we building? What could go wrong? What will we do about it? How will we know whether it worked? For each risk, write down the affected asset, a concrete scenario, the impact, an assigned mitigation, and evidence that can be reviewed. That turns “the app could be insecure” into “one account could read another account's private note; the server will check ownership on every read; a test with two fictional accounts must allow the owner to read it and deny the other account.”

## Local activity

Work offline in a temporary folder. Save the following block as `modelo.py` and run it with `python3 modelo.py`. It uses only built-in Python functions and data structures; the names and records are fictional.

```python
notas = {
    "nota-demo": {"propietario": "ana", "visibilidad": "privada"},
    "guia-demo": {"propietario": "ana", "visibilidad": "publica"},
}

def puede_leer(usuario, identificador):
    nota = notas.get(identificador)
    return nota is not None and (
        nota["visibilidad"] == "publica"
        or nota["propietario"] == usuario
    )

assert puede_leer("ana", "nota-demo")
assert not puede_leer("luis", "nota-demo")
assert puede_leer("luis", "guia-demo")
assert not puede_leer("luis", "id-inexistente")

riesgos = [
    {"activo": "nota-demo", "escenario": "otra cuenta solicita la nota privada",
     "impacto": "exposición de contenido", "control": "comprobar propietario",
     "evidencia": "pruebas con titular y otra cuenta"},
    {"activo": "texto de las notas", "escenario": "el cuerpo aparece en registros",
     "impacto": "divulgación", "control": "registrar eventos sin el contenido",
     "evidencia": "revisión de los campos registrados"},
]
campos = {"activo", "escenario", "impacto", "control", "evidencia"}
assert all(campos.issubset(riesgo) for riesgo in riesgos)
assert all(riesgo[campo] for riesgo in riesgos for campo in campos)
print("Modelo completo: 2 riesgos; política de lectura validada.")
```


The `puede_leer` function applies default denial: an unknown ID does not grant access. The four assertions express expected cases for the private note, the public guide, and a nonexistent record. The `riesgos` list turns observations into verifiable work; the final assertions require each risk to have an asset, scenario, impact, control, and evidence. In a real application, identity would come from the server's authenticated session, not from a name the client could choose.

## Verification and outcome

The expected output is `Modelo completo: 2 riesgos; política de lectura validada.` If an assertion fails, Python points to the line that does not match the intended policy. First review the test data, then the access condition; do not remove the check just to “make the exercise pass.” The result does not certify a complete application: it shows that one small rule and its evidence are explicit. Also record who will review each mitigation and when you will check it again, for example, when sharing, exporting, or permissions change.

## Common errors and solutions

- **Listing risks without context.** Scope the model to one feature and the data it uses; expand it when the flow changes.
- **Confusing authentication with authorization.** Knowing which account signed in is not enough: decide whether that account may read or modify this particular resource.
- **Trusting the interface or hard-to-guess IDs.** Hiding a button or using random IDs does not replace authorization on the server.
- **Logging private data for debugging.** Keep events minimal and useful; exclude note contents, credentials, and tokens.
- **Treating the model as a finished document.** Update it when data, integrations, permissions, or assumptions change.

## Summary

Thinking about security before writing code means scoping the system, naming assets and boundaries, describing concrete scenarios, and assigning mitigations with evidence. A small model that changes with the product is more useful than a long list without owners or tests. Start with one feature, verify allowed and denied behavior using fictional data, and keep that criterion in the project's tests.
