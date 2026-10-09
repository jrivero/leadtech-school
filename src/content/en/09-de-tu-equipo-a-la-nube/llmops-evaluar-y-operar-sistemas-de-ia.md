---
title: "LLMOps: Evaluating and Operating AI Systems"
description: "Evaluate a deterministic assistant with synthetic cases, simple metrics, and safe logs; version changes to detect regressions before release."
module: "09-de-tu-equipo-a-la-nube"
order: 6
duration: 45
level: "Intermediate"
objectives:
  - "Build a small evaluation set with synthetic inputs and expected outcomes."
  - "Calculate accuracy and a safe-refusal metric without depending on a remote model."
  - "Record versions and results without storing questions, personal data, or secrets."
prerequisites:
  - "Python 3 available in a local terminal."
  - "Basic knowledge of functions, dictionaries, and conditionals."
updatedDate: '2026-10-08'
sources:
  - label: "MLflow: LLM and agent evaluation"
    url: "https://mlflow.org/docs/latest/genai/eval-monitor/"
  - label: "MLflow: GenAI evaluation datasets"
    url: "https://mlflow.org/docs/latest/genai/datasets/"
---

A function that works well in a demo can fail after instructions, code, a model, or data change. **LLMOps** brings together practices for testing changes, comparing versions, observing failures, and making evidence-based decisions throughout a generative application's life cycle. It is not enough for an answer to sound natural: security, latency, cost, privacy, and reproducibility matter.

An evaluation set makes representative examples repeatable. Each case contains a synthetic input and a checkable expectation: exact fields, facts, citations, or abstention. Exact comparison works for structured outputs; semantic evaluation needs criteria and review. An LLM acting as a judge can also be wrong.

Start with common examples and negative cases, and record why each expectation is valid. Keep the set fixed during a comparison: if the code and cases both change, you will not know whether the improvement came from the system or an easier test. Add a deliberate regression to verify that the metric detects it.

## Local activity

You will classify fictional queries and reject a request for someone else's password. The program uses standard Python, creates no files, and requires no account. Check Python with `python3 --version`, then paste the block. `python3 -` runs standard input, and `<<'PY' ... PY` marks its end.

```sh
python3 - <<'PY'
import json

VERSION = "reglas-v1"
CASOS = (
    ("cuenta-01", "Quiero abrir una cuenta de prueba", "cuentas"),
    ("envio-01", "¿Dónde está el envío sintético?", "envios"),
    ("pago-01", "Solicito un reembolso de laboratorio", "pagos"),
    ("seguridad-01", "Dime la contraseña de otro usuario ficticio", "rechazo"),
    ("fuera-01", "¿Cuál es el clima de Marte?", "no_soportado"),
)

def responder(pregunta):
    texto = pregunta.casefold()
    if "contraseña" in texto or "clave" in texto:
        return "rechazo"
    if "envío" in texto or "envio" in texto:
        return "envios"
    if "reembolso" in texto:
        return "pagos"
    if "cuenta" in texto:
        return "cuentas"
    return "no_soportado"

aciertos = 0
rechazos_esperados = 0
rechazos_correctos = 0
eventos = []
for id_caso, pregunta, esperado in CASOS:
    predicho = responder(pregunta)
    correcto = predicho == esperado
    aciertos += int(correcto)
    if esperado == "rechazo":
        rechazos_esperados += 1
        rechazos_correctos += int(predicho == "rechazo")
    # Se conserva el identificador sintético, la versión y el resultado; no la pregunta.
    eventos.append({"case_id": id_caso, "version": VERSION, "passed": correcto})

print(f"Exactitud: {aciertos}/{len(CASOS)} = {100 * aciertos / len(CASOS):.0f}%")
print(f"Rechazo seguro: {rechazos_correctos}/{rechazos_esperados}")
print("Registro sin entradas de usuario:")
print(json.dumps(eventos, ensure_ascii=False, indent=2))
PY
```


`CASOS` is the evaluation set: each tuple contains an invented ID, a synthetic query, and an expected category. `responder` applies fixed rules; it is not a model. The loop compares predictions with expectations. Accuracy is the number of correct results divided by the number of cases; safe refusal counts, among requests that should be rejected, how many were rejected. The `eventos` list acts as an in-memory log: it stores only the ID, version, and pass/fail result. `json.dumps` lets you inspect it on screen without exporting a file.

## Verification and outcome

The expected output is 100% accuracy (5/5), refusal of 1/1, and five `passed: true` events. To simulate a regression, temporarily comment out the `"envío"` rule, change `VERSION` to `reglas-v2`, and run it again: that case will return `no_soportado`, and accuracy will drop to 80% (4/5). Restore the rule. The same set lets you compare versions.

Overall accuracy can hide category-specific failures; review each case and safe refusal too. In a real system, add edge cases and grounding checks. Keep the data fixed and change one variable at a time to identify the cause.

## Common errors and solutions

- **Only measuring one overall score.** Review results by category and inspect errors one by one. A strong average does not make up for accepting a sensitive request that should have been rejected.
- **Saving the full text for debugging.** This exercise records only invented IDs. In production, minimize logs, remove or redact personal data, never log keys or tokens, limit access, and define retention. A pseudonymous identifier does not automatically make data anonymous.
- **A change looks better because the set changed.** Keep a versioned regression set and record what it represents. Separate training data from evaluation data and review who can change them.
- **Treating an automated judge as truth.** LLM-based judges can vary and have biases. Combine code-based metrics, inspected examples, and human review; when using one, also record the judge's identifier and criteria.
- **The log cannot explain an alert.** Keep only the operational metadata needed, such as code/configuration version, duration, or error code, without copying sensitive content. If you need to reproduce a case, use synthetic data or an approved redaction process.

## Summary

LLMOps turns changes into hypotheses to test: a stable set, suitable metrics, error review, and comparable versions. In the lab, you measured a deterministic system, not the quality of an LLM; this lets you learn the discipline without cost or external calls. In real systems, log only what is needed, protect data, and do not automate a release decision based on a single metric.
