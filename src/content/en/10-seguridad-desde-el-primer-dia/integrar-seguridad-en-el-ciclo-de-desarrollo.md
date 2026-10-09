---
title: "Integrating Security into the Development Lifecycle"
description: "Turn risks into testable requirements and place human review and testing in a secure workflow, from planning through change integration."
module: "10-seguridad-desde-el-primer-dia"
order: 5
duration: 30
level: "Intermediate"
objectives:
  - "Translate a product risk into a verifiable security requirement."
  - "Place human review and tests at stages of the development lifecycle."
  - "Define an integration gate proportionate to risk without deploying services."
prerequisites:
  - "Know the module's concepts of risk and trust boundaries."
  - "Know what a simple automated test checks."
updatedDate: '2026-10-08'
sources:
  - label: "NIST SP 800-218, Secure Software Development Framework (SSDF) v1.1"
    url: "https://csrc.nist.gov/pubs/sp/800/218/final"
  - label: "OWASP Secure Code Review Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html"
  - label: "OWASP Code Review Guide"
    url: "https://owasp.org/www-project-code-review-guide/"
---

Integrating security means turning risks into verifiable decisions during planning, coding, review, and maintenance. “Shift left” brings conversations and controls earlier; it does not make early tests infallible or eliminate later reviews.

NIST SP 800-218, Secure Software Development Framework (SSDF) v1.1, was published as a final version on February 3, 2022. It describes high-level practices that can be integrated into different life cycles without prescribing a single pipeline. Reference reviewed on October 8, 2026.

## From risk to requirement

Imagine a task API whose functional requirement is to allow changing a task's title. Before writing the endpoint, ask which data matters, who should be allowed to change it, and what could go wrong. A concrete rule would be: “A person may change only tasks they own; the title must be non-empty text of at most 80 characters.” You can now design a check for each part.

A useful requirement has an observable result. “The application must be secure” does not say what to do. “If the identity is missing or the task belongs to someone else, the operation does not change the state” can be turned into a test. Record the relationship among risk, requirement, control, and evidence: for example, unauthorized access → check ownership on the server → test with two synthetic identities → review the function that applies the change.

## Checkpoints throughout the lifecycle

During **planning**, identify sensitive data, actors, and trust boundaries; include acceptance criteria for permissions and errors. During **design**, decide where each control belongs and which role needs each action. During **implementation**, use validators and output mechanisms appropriate to the framework rather than inventing generic filters. During **change review**, follow the data from its entry point to where it is stored or displayed, and check that permission is verified for the specific object.

Before integration, run positive and negative tests: the owner can change their task; another identity cannot; an empty title is rejected; an error does not leave a partial update. A defensive pipeline might run formatting, unit tests, and static analysis, and request human review for sensitive changes. This is a conceptual model: no CI is configured here, no API is connected, and nothing is deployed. Tools help find signals, but a clean result does not prove that business logic is correct.

After integration, keep a way to record and fix defects, review related changes, and improve requirements. The frequency and depth of each control depend on impact, data, and context; not every line needs the same treatment, but every sensitive route needs an explicit decision.

## Local activity

Model the requirement for reading a task without creating a server. Open a local terminal and run `python3 -`; paste the block and finish with `PY`. It uses only the standard interpreter, invented data, and process memory:

```bash
python3 - <<'PY'
def puede_leer(tarea, identidad):
    return identidad is not None and identidad["id"] == tarea["owner_id"]

tarea = {"id": "T-01", "owner_id": "ana", "title": "Preparar demo"}
casos = [
    ("propietaria", {"id": "ana"}, True),
    ("otra persona", {"id": "leo"}, False),
    ("sin identidad", None, False),
]
for nombre, identidad, esperado in casos:
    resultado = puede_leer(tarea, identidad)
    assert resultado is esperado, nombre
    print(f"OK: {nombre} -> {resultado}")
PY
```


The function represents a rule; it does not authenticate anyone: `identidad` simulates the trusted context a server layer would have established. The cases are synthetic fixtures, not accounts. Relate each `assert` to the acceptance criterion that justifies it. As an extension, write in your notes what test you would add for a nonexistent task and what controlled response the application would return.

## Verification and outcome

The terminal should show three `OK` lines: owner `True`, another person `False`, and missing identity `False`. If an assertion fails, do not delete it to make the exercise pass; identify whether the rule, fixture, or requirement is wrong. Preserve the traceability between requirement and test, along with default-deny behavior when identity is missing.

## Common errors and solutions

- **Leaving security until a final review.** Add acceptance criteria before coding and review the diff again before integration.
- **Trusting only a positive test.** Add rejection cases, boundaries, and missing data; check that there are no partial changes.
- **Assuming the pipeline replaces human judgment.** Use automation as support and assign contextual review to permissions and business logic.
- **Treating SSDF as a tool recipe.** It is a framework of practices that can be integrated, not a command or mandatory pipeline.

## Summary

Integrate security by turning risks into requirements that can be reviewed and tested. Plan trust boundaries, validate controls in the diff, combine tests with human review, and use automation as support. A useful gate produces clear evidence and does not need to expose a service to teach the rule.
