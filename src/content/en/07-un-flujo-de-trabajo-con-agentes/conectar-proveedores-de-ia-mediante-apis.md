---
title: "Connecting AI Providers Through APIs"
description: "Design a server-side boundary for switching model providers, validating inputs, and handling errors without exposing keys or relying on a billable call."
module: "07-un-flujo-de-trabajo-con-agentes"
order: 3
duration: 45
level: "Intermediate"
objectives:
  - "Describe the path a request takes from an application to a model provider."
  - "Separate product logic from each provider's specific formats."
  - "Test a local integration with simulated responses and error handling."
prerequisites:
  - "Know HTTP requests, JSON, and basic functions."
  - "Understand the difference between a browser client and a server."
updatedDate: '2026-10-08'
sources:
  - label: "OpenAI API: platform guide and reference"
    url: "https://developers.openai.com/api/docs/"
  - label: "Anthropic: Claude Platform documentation"
    url: "https://docs.anthropic.com/"
  - label: "Google AI: Gemini API reference"
    url: "https://ai.google.dev/api"
---

## An API is a boundary, not a magic call

A typical integration receives a request from your application, validates the input, builds a request for the provider, and transforms the response into something your product understands. A provider may offer an HTTP API, a client library, or both; its models, field names, responses, errors, and capabilities are not interchangeable by default. Consult the chosen provider's current documentation before implementing specific details. This lesson avoids committing to a specific endpoint or schema that could change.

It is useful to separate the product rule from that external boundary. For example, a function `crear_borrador(texto)` expresses the domain need; an adapter converts the text to the provider's format and normalizes the result into a simple internal structure such as `{texto, proveedor, estado}`. This lets you test the rule without a network connection and switch providers without spreading model names or response fields throughout the interface. Do not turn the abstraction into a promise that every provider offers identical functions: the adapter must declare limits and errors it cannot hide.

An API key is a credential, not public configuration. The browser and compiled mobile code are under the control of whoever downloads them, so the authenticated request must come from a trusted server. In production, limit the secret's scope, store it in the approved secret manager or server environment, avoid logging it, and define how to revoke it if exposed. A local variable is suitable for development if it is excluded from version control; do not write a real value in an example, screenshot, or debug response.

Limits also include input size, timeouts, network errors, empty responses, quotas, and cost. Retrying a request can duplicate consumption; do so only under an explicit policy and after checking whether the operation can be repeated without side effects. Treat generated text as untrusted data: validate its format before using it, escape it when presenting it, and require human review for high-impact tasks.

## Practice with a simulated provider

The following example uses only the Python standard library. The fake provider returns a deterministic response: it does not open a connection, need a key, or demonstrate that a real API is working. It lets you check the internal contract before choosing a real integration.

```python
class ProveedorFalso:
    def generar(self, prompt):
        return {"texto": f"Borrador local: {prompt.strip()}"}

def crear_borrador(proveedor, prompt):
    if not isinstance(prompt, str) or not prompt.strip():
        raise ValueError("El texto no puede estar vacío")
    respuesta = proveedor.generar(prompt)
    texto = respuesta.get("texto")
    if not isinstance(texto, str) or not texto.strip():
        raise ValueError("La respuesta no contiene texto utilizable")
    return texto.strip()

fake = ProveedorFalso()
assert crear_borrador(fake, "Resumen de prueba") == "Borrador local: Resumen de prueba"
try:
    crear_borrador(fake, "   ")
except ValueError:
    print("OK: entrada vacía rechazada")
else:
    raise AssertionError("Se esperaba rechazar la entrada vacía")
print("OK: adaptador simulado, sin llamada externa")
```

## Exercise and verification

1. Run the block in an available Python 3 interpreter by pasting it after `python3 -` in a terminal. Do not install dependencies for this practice.
2. Add a second fake implementation that returns `{"texto": "   "}` and confirm that validation rejects the response.
3. Write a mapping table: internal input, data the adapter requires, internal response format, and expected error.
4. For a real provider, check its current official documentation before settling on fields, authentication, a library, or limits. Do not send a real request to pass the exercise.

The expected output includes two `OK` lines. If anything else appears, first check the contract and negative branches. The test validates your simulated boundary; it does not confirm availability, price, or remote behavior.

## Common mistakes

- **Putting the key in browser JavaScript.** Move authentication to a server and expose only a controlled operation of your own.
- **Copying the provider's first example into business logic.** Isolate provider-specific names and structures in an adapter.
- **Automatically retrying every failure.** Distinguish transient errors, limits, and requests that could be duplicated.
- **Accepting JSON because it “looks right.”** Check types, required fields, size, and expected values before using it.
- **Confusing a simulation with a real integration.** Label the mock and separately record remote checks that were not run.

## Summary

A maintainable integration controls a boundary: it validates, authenticates on the server, adapts formats, limits errors, and checks output. Start with a simulated contract at no cost, and review the official docs before committing to a specific API. Neither a mock nor a correct response replaces secret protection and result review.
