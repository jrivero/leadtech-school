---
title: "Using AI to Review Security Without Blind Trust"
description: "Use AI to help review a synthetic snippet, protect the context you share, and validate every hypothesis through human review and tests."
module: "10-seguridad-desde-el-primer-dia"
order: 7
duration: 30
level: "Intermediate"
objectives:
  - "Prepare a review request that does not share secrets or sensitive data."
  - "Evaluate AI findings as hypotheses that require evidence and context."
  - "Turn a useful observation into a local regression test."
prerequisites:
  - "Know how to follow an input through to its use."
  - "Know basic validation, authorization, and unit testing."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP Secure Coding with AI Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_with_AI_Cheat_Sheet.html"
  - label: "OWASP Secure Code Review Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html"
  - label: "OWASP Code Review Guide"
    url: "https://owasp.org/www-project-code-review-guide/"
---

An AI assistant can suggest review questions, summarize a diff, or suggest edge cases. Its response does not prove the code is secure: it may miss a route, assume nonexistent business rules, or claim there is a problem without evidence. Treat it as a list of hypotheses that a person must compare with the code, requirements, and reproducible tests.

## Prepare a small, safe context

Before sharing code, check the policy of the approved service. Do not paste keys, tokens, personal data, real logs, internal addresses, or sensitive proprietary code. Replace identifiers with invented values and remove re-identifiable details: changing a name is not enough. If you cannot confirm permission or sanitize the snippet, do not send it; use a local checklist. Review the product's privacy settings too. A conversation that seems private is not necessarily confidential.

## Ask for evidence, not a verdict

Use a scoped instruction: “Review this fictional example. Point out possible validation, object-level authorization, and error-handling failures. For each observation, cite the relevant line or condition, state what assumption is missing, and propose a local unit test. Distinguish facts from hypotheses; do not run commands or invent dependencies.” A useful response identifies what data the user controls, which function consumes it, and what rule would demonstrate the problem.

Deliberately incomplete, invented example, never connected to a real service:

```python
def renombrar(tarea, actor, titulo):
    if not isinstance(titulo, str) or not titulo.strip():
        return None
    return {"id": tarea["id"], "title": titulo.strip()}
```


The function checks that the title is non-empty text, but it does not express a rule about who may rename the task or limit its length. That is not enough to conclude that a real application has a vulnerability: the caller, identity model, and requirements are missing. AI can point out those questions; the reviewer must look for evidence in the code and decide whether they apply.

## Confirm every suggestion

For each finding, ask: Which requirement does it violate? What observable evidence supports it? What context does the model lack? What test distinguishes the allowed case from the denied one? Read the full diff and follow data from input through persistence and output. Review suggested changes like any new code: do not accept dependencies, commands, policies, or broad modifications without understanding them. A unit test confirms one specific behavior; it does not certify every route or replace a full review.

## Local activity

Use the prompt with the fictional snippet only in an approved tool; otherwise, practice the checklist without AI. Do not share real code. Then test this pure function with standard Python using `python3 -`:

```bash
python3 - <<'PY'
def renombrar(tarea, actor, titulo):
    if not isinstance(titulo, str):
        return "invalid", None
    titulo = titulo.strip()
    if not 1 <= len(titulo) <= 80:
        return "invalid", None
    if actor is None or actor["id"] != tarea["owner_id"]:
        return "denied", None
    return "ok", {"id": tarea["id"], "title": titulo}

tarea = {"id": "T-01", "owner_id": "ana"}
assert renombrar(tarea, {"id": "ana"}, "  Nota  ") == (
    "ok", {"id": "T-01", "title": "Nota"}
)
assert renombrar(tarea, {"id": "leo"}, "Nota") == ("denied", None)
assert renombrar(tarea, {"id": "ana"}, "   ") == ("invalid", None)
print("OK: propietario, identidad distinta y título vacío")
PY
```


The profiles and task are synthetic; the function does not read the network or modify files. Compare each test with the finding: the owner test should allow, the other-identity test should deny, and the empty title should be rejected. If the AI review suggests a different fix, require the same evidence and rerun the relevant tests.

## Verification and outcome

The expected result is one `OK` line after all three cases pass. Keep only the validated finding, its assumption, the control, and the test in your notes; do not copy outputs containing sensitive data. If the assistant finds nothing, keep the human checklist: “no findings” is not proof that none exist.

## Common errors and solutions

- **Pasting an entire file to get more context.** Reduce the snippet and use invented fixtures; if you cannot sanitize it, review locally.
- **Asking “Is this secure?” and accepting yes or no.** Request evidence, assumptions, and a test that would fail if the control were missing.
- **Accepting a generic claim as a confirmed defect.** Find the route, business rule, and data destination before prioritizing it.
- **Applying a suggested fix without testing it.** Inspect the diff and run positive, negative, and boundary tests.
- **Confusing assisted review with an audit.** Combine automated assistance, human judgment, and independent controls.

## Summary

AI can broaden the questions, but it cannot take responsibility or certify security. Share the minimum permitted context without secrets or sensitive data; ask for observations with evidence and assumptions; confirm each one by reading the code and testing the rule locally. Keep human review even when the model finds no problems.
