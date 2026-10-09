---
title: "Multi-Agent Systems with Google ADK"
description: "Model coordination among agents, tools, and handoffs with deterministic functions; decide when to separate responsibilities and when to keep one flow."
module: "09-de-tu-equipo-a-la-nube"
order: 7
duration: 45
level: "Intermediate"
objectives:
  - "Distinguish the roles of an agent, a tool, and a transfer of control."
  - "Run local coordination among specialists using deterministic Python functions."
  - "Assess the costs and limits of splitting a flow across multiple agents."
prerequisites:
  - "Python 3 available in a local terminal."
  - "Basic knowledge of functions, dictionaries, and conditionals."
  - "Conceptual familiarity with assistants that use tools."
updatedDate: '2026-10-08'
sources:
  - label: "Google ADK: multi-agent and multi-node workflows"
    url: "https://adk.dev/agents/multi-agents/"
  - label: "Google ADK: collaborative workflows with a coordinator and subagents"
    url: "https://adk.dev/workflows/collaboration/"
  - label: "Google ADK: status of workflow agents"
    url: "https://adk.dev/agents/workflow-agents/"
  - label: "Google ADK: agent evaluation"
    url: "https://adk.dev/evaluate/"
---

A multi-agent system distributes work among components with defined responsibilities. Imagine a fictional help desk: a coordinator distinguishes questions about a demo shipment from questions about library hours, then routes them to specialists. Google Agent Development Kit (ADK) can build these flows. Here we will look at the design without installing ADK or invoking models.

## Agents, tools, and handoffs

An **agent** has a role and instructions; it can request that a tool be run. A **tool** performs a bounded action—for example, looking up a status—with validated inputs. The agent chooses when to request it, and the function performs only what is allowed. Do not give it more data or permissions than needed.

A **handoff** transfers control and the necessary context to another agent or step. The coordinator can delegate to a specialist and receive its result; define what information is passed, how the response returns, and what to do when no suitable route exists. In ADK 2.0, graph and dynamic workflows combine agents with deterministic nodes; collaborative workflows use a coordinator and subagents. Sequential, loop, and parallel templates also exist. The documentation considers them superseded by graph or dynamic workflows in Python and Go since version 2.0. Check the version and language before adopting an API.

When designing a handoff, specify what input each specialist accepts, what data it returns, and what happens if a tool fails. A structured result and an explicit error path make testing easier. The coordinator must not assume that a transferred response is authorized for every subsequent action.

Use multiple agents when there are distinct specialties, tools, or permissions, useful parallelism, or context limits. A function or a single agent is usually enough for a simple decision: every extra component adds latency, cost, failure modes, and debugging complexity.

## Local activity

The demo uses fictional information. Check Python with `python3 --version` and paste the block into a terminal: `python3 -` reads standard input, delimited by `<<'PY' ... PY`, without creating files. These are deterministic Python functions, **not ADK, LLM agents, or calls to Google Cloud or models**.

```sh
python3 - <<'PY'
ESTADOS = {"DEMO-01": "En preparación (dato sintético)"}

def herramienta_consultar_estado(codigo):
    return ESTADOS.get(codigo, "Sin estado disponible")

def herramienta_consultar_horario():
    return "Biblioteca de demostración: 09:00–17:00"

def especialista_envios(codigo):
    estado = herramienta_consultar_estado(codigo)
    return f"Estado de {codigo}: {estado}. Fuente: ESTADOS de prueba."

def especialista_horarios():
    return herramienta_consultar_horario()

def coordinador(solicitud):
    texto = solicitud.casefold()
    if "envío" in texto or "envio" in texto:
        print("Transferencia local: coordinador -> especialista_envios")
        return especialista_envios("DEMO-01")
    if "horario" in texto:
        print("Transferencia local: coordinador -> especialista_horarios")
        return especialista_horarios()
    return "Sin transferencia: esta solicitud queda fuera del ejemplo."

for solicitud in (
    "¿Qué ocurre con el envío DEMO-01?",
    "¿Cuál es el horario de la biblioteca ficticia?",
    "¿Cuál es el precio del almuerzo?",
):
    print(f"\nSolicitud: {solicitud}")
    print(coordinador(solicitud))
PY
```


`ESTADOS` is a fictional record. The `herramienta_...` functions look up data; each specialist calls one and returns a result. `coordinador` applies fixed rules to transfer control. The loop tests two routes and an out-of-scope question. There is no model interpretation: only phrases matching the programmed words are routed.

## Verification and outcome

The first request should go to shipping and show the fictional status of `DEMO-01`; the second should show the hours, and the third should not be transferred. Each value comes from a local function, not a real request.

In ADK, delegation and tools depend on the runtime and version; a flow with a model also requires the appropriate configuration. There is no executable ADK code here. Validate arguments, limit tools, test each route, and log only what is needed.

## Common errors and solutions

- **A route fails because of an accidental match.** Substring matching is fragile; test positive, negative, and ambiguous cases, and ask for clarification when the intent is unclear.
- **Too much context is passed.** Transfer only necessary, authorized fields; the full history can expose data and increase errors.
- **There are too many agents.** Compare with a single function or agent, and split only when distinct responsibilities or parallelism justify the cost.
- **A tool changes systems without control.** Start with read access and minimum permissions. For write actions, require authorization, confirmation, and tests.
- **The exercise is confused with ADK.** This is Python routing, not the ADK runtime. Check the documentation for the relevant version before integrating models.

## Summary

Agents organize tasks, tools perform bounded operations, and a handoff defines who continues. The local exercise makes routes inspectable, but does not imitate a model or the ADK runtime. Use multiple agents only when they provide measurable value, with tests, minimum permissions, and a safe exit path.
