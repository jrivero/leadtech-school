---
title: "Generative AI Risks and the OWASP LLM Top 10"
description: "Learn the OWASP GenAI LLM Top 10 2026, scope an assistant's risks, and validate fictional outputs without using external services."
module: "10-seguridad-desde-el-primer-dia"
order: 4
duration: 50
level: "Intermediate"
objectives:
  - "Recognize the ten codes and names in OWASP GenAI LLM Top 10 2026."
  - "Relate context, permissions, retrieval, and outputs to defensive controls."
  - "Validate a synthetic response locally before accepting it in an application."
prerequisites:
  - "Understand prompts, data, and the functions of an AI application at a basic level."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP GenAI LLM Top 10 2026"
    url: "https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/"
  - label: "OWASP GenAI LLM Top 10 2026 canonical source"
    url: "https://github.com/GenAI-Security-Project/GenAI-LLM-Top10/blob/main/2026/README.md"
  - label: "OWASP GenAI LLM Top 10: current and previous releases"
    url: "https://github.com/GenAI-Security-Project/GenAI-LLM-Top10/blob/main/README.md"
---

## The model is part of a system

A generative model receives instructions and data, produces responses, and may consult documents or tools. Security depends on the system: what context it receives, what permissions each component has, and how the output is validated. A prompt does not replace authorization enforced by code.

The curriculum heading uses “OWASP GenAI LLM Top 10 2026,” but the course label alone does not demonstrate that an official edition exists. The lesson checked the OWASP GenAI Security Project page and OWASP's active repository: the page is titled “OWASP GenAI LLM Top 10 2026” and describes the guide as “OWASP Top 10 for LLM Applications 2026”; the repository identifies 2026 as the current release and 2025 as the previous one. Therefore, as of October 8, 2026, this lesson uses the official 2026 edition, not the 2025 or 2023 numbering. There is a one-day difference between the date on the official page (August 3, 2026) and the release date in the canonical README (August 4, 2026); the publication is described as “in early August.”

| Code and official name | Defensive interpretation |
|---|---|
| LLM01:2026 Prompt Injection | Treat documents and tool results as untrusted content. |
| LLM02:2026 Sensitive Information Disclosure | Minimize sensitive data in context, responses, and logs. |
| LLM03:2026 Excessive Agency | Limit tools and permissions; require approval for sensitive actions. |
| LLM04:2026 Supply Chain | Verify the provenance and integrity of models, packages, and services. |
| LLM05:2026 Data and Model Poisoning | Review the provenance of and changes to data and artifacts. |
| LLM06:2026 Unbounded Consumption | Limit size, time, concurrency, and budget. |
| LLM07:2026 Misinformation | Check claims and require review for important decisions. |
| LLM08:2026 Hidden Context Exposure | Do not store secrets in context or rely on hidden instructions. |
| LLM09:2026 Vector and Embedding Weaknesses | Filter results by permission and provenance before retrieval. |
| LLM10:2026 Improper Output Handling | Validate structure and encode outputs; do not execute free text. |

Useful distinctions: **LLM01:2026** concerns content that influences behavior; **LLM02:2026**, data exposure; **LLM03:2026**, permissions and autonomy; **LLM08:2026**, possible disclosure of internal context; **LLM10:2026**, unsafe handling of output. No single filter replaces application controls: permissions, validation, and review must exist outside the model.

## Local activity

Save the block as `validar_respuesta.py` and run it with `python3 validar_respuesta.py`. It does not call models or the Internet; it uses only synthetic data and standard functions.

```python
fuentes_aprobadas = {"manual-demo-v1"}

def validar_respuesta(salida):
    if not isinstance(salida, dict) or set(salida) != {"texto", "fuente"}:
        return False
    texto = salida["texto"]
    fuente = salida["fuente"]
    return (
        isinstance(texto, str)
        and 0 < len(texto) <= 280
        and isinstance(fuente, str)
        and fuente in fuentes_aprobadas
    )

respuesta_local = {
    "texto": "La guía ficticia recomienda revisión humana.",
    "fuente": "manual-demo-v1",
}
respuesta_sin_respaldo = {
    "texto": "Afirmación sintética sin fuente aprobada.",
    "fuente": "documento-desconocido",
}
assert validar_respuesta(respuesta_local)
assert not validar_respuesta(respuesta_sin_respaldo)
print("OK: estructura, longitud y fuente verificadas localmente.")
```


The function accepts a dictionary with the two expected fields, bounded text, and an approved source. The local response is accepted; the second one should be rejected. This illustrates LLM10:2026, but does not prove truth or prevent untrusted input. Retrieval permissions and tool permissions require separate controls.

## Verification and outcome

The expected output is `OK: estructura, longitud y fuente verificadas localmente.` If an assertion fails, check the field names and fixture source, or confirm that the approved list is closed. Validate in trusted code before displaying or processing the response. A valid format does not authorize actions: each tool must check permissions and arguments separately.

## Common errors and solutions

- **Trusting the prompt as authorization.** Enforce permissions in code, outside the model.
- **Providing overly broad tools.** Reduce capabilities and require confirmation for sensitive actions.
- **Treating a well-formed answer as true.** Check sources and indicate uncertainty.
- **Using generated text directly.** Validate its schema and length, encode it when displayed, and do not execute it.
- **Forgetting retrieval and memory.** Filter documents by permission and control persistence.
- **Using only prompt-level controls.** Combine provenance, consumption limits, review, and logs without secrets.

## Summary

OWASP GenAI LLM Top 10 2026 groups risks involving data, context, permissions, dependencies, consumption, truthfulness, and outputs. Keep the codes from that edition and apply defenses in the application, not only in the prompt. The exercise validates a synthetic output; a complete assessment also reviews sources, capabilities, limits, and human oversight.
