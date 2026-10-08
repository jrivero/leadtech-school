---
title: "Sistemas multiagente con Google ADK"
description: "Modela coordinación entre agentes, herramientas y transferencias con funciones deterministas; decide cuándo separar responsabilidades y cuándo mantener un solo flujo."
module: "09-de-tu-equipo-a-la-nube"
order: 7
duration: 45
level: "Intermedio"
objectives:
  - "Diferenciar el papel de un agente, una herramienta y una transferencia de control."
  - "Ejecutar una coordinación local de especialistas mediante funciones Python deterministas."
  - "Valorar los costes y límites de dividir un flujo en varios agentes."
prerequisites:
  - "Python 3 disponible en una terminal local."
  - "Nociones básicas de funciones, diccionarios y condicionales."
  - "Familiaridad conceptual con asistentes que usan herramientas."
updatedDate: '2026-10-08'
sources:
  - label: "Google ADK: workflows multiagente y multi-nodo"
    url: "https://adk.dev/agents/multi-agents/"
  - label: "Google ADK: flujos colaborativos con coordinador y subagentes"
    url: "https://adk.dev/workflows/collaboration/"
  - label: "Google ADK: estado de las plantillas de workflows"
    url: "https://adk.dev/agents/workflow-agents/"
  - label: "Google ADK: evaluación de agentes"
    url: "https://adk.dev/evaluate/"
---

Un sistema multiagente reparte trabajo entre componentes con responsabilidades delimitadas. Imagina una mesa de ayuda ficticia: un coordinador distingue preguntas sobre un envío de demostración y el horario de una biblioteca, y deriva a especialistas. Google Agent Development Kit (ADK) permite construir estos flujos. Aquí veremos el diseño sin instalar ADK ni invocar modelos.

## Agentes, herramientas y transferencia

Un **agente** tiene un rol e instrucciones; puede pedir que se ejecute una herramienta. Una **herramienta** realiza una acción acotada —por ejemplo, consultar un estado— con entradas validadas. El agente elige cuándo solicitarla y la función realiza lo permitido. No le des más datos o permisos de los necesarios.

Una **transferencia** (*handoff*) entrega el control y el contexto necesario a otro agente o paso. El coordinador puede delegar en un especialista y recibir su resultado; define qué información pasa, cómo retorna la respuesta y qué hacer si no hay ruta adecuada. En ADK 2.0, los workflows de grafo y dinámicos combinan agentes con nodos deterministas; los colaborativos usan un coordinador y subagentes. También existen plantillas secuenciales, de bucle y paralelas. La documentación las considera superadas por workflows de grafo o dinámicos en Python y Go desde la versión 2.0. Verifica versión y lenguaje antes de adoptar una API.

Al diseñar una transferencia, especifica qué entrada acepta cada especialista, qué dato devuelve y qué ocurre si la herramienta falla. Un resultado estructurado y una ruta de error explícita facilitan las pruebas. El coordinador no debe asumir que una respuesta transferida está autorizada para cada acción posterior.

Usa varios agentes si hay especialidades, herramientas o permisos separados, paralelismo útil o límites de contexto. Para una decisión simple suele bastar una función o un agente: cada componente extra añade latencia, coste, fallos y complejidad de depuración.

## Actividad local

La demo usa información ficticia. Comprueba Python con `python3 --version` y pega el bloque en una terminal: `python3 -` lee la entrada estándar, delimitada por `<<'PY' ... PY`, sin crear archivos. Son funciones Python deterministas, **no ADK, agentes LLM ni llamadas a Google Cloud o modelos**.

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

`ESTADOS` es un registro ficticio. Las funciones `herramienta_...` consultan datos; cada especialista llama a una y devuelve un resultado. `coordinador` aplica reglas fijas para transferir el control. El bucle prueba dos rutas y una pregunta fuera de alcance. No hay interpretación mediante modelo: solo se enrutan frases que coinciden con las palabras programadas.

## Verificación y resultado

La primera petición debe pasar a envíos y mostrar el estado ficticio de `DEMO-01`; la segunda debe mostrar el horario y la tercera no debe transferirse. Cada dato viene de una función local, no de un pedido real.

En ADK, delegación y herramientas dependen del runtime y de la versión; un flujo con modelo también requiere la configuración correspondiente. No hay código ADK ejecutable aquí. Valida argumentos, limita herramientas, prueba cada ruta y registra solo lo necesario.

## Errores habituales y soluciones

- **La ruta falla por una coincidencia accidental.** Las subcadenas son frágiles; prueba casos positivos, negativos y ambiguos, y pide aclaración si la intención no está clara.
- **Se pasa demasiado contexto.** Transfiere solo campos necesarios y autorizados; el historial completo puede exponer datos y aumentar errores.
- **Hay agentes de más.** Compara con una sola función o agente y divide solo cuando las responsabilidades o el paralelismo justifiquen el coste.
- **Una herramienta cambia sistemas sin control.** Empieza con lectura y permisos mínimos. Para acciones de escritura, exige autorización, confirmación y pruebas.
- **Se confunde el ejercicio con ADK.** Este es enrutamiento Python, no runtime ADK. Verifica la documentación de la versión antes de integrar modelos.

## Resumen

Los agentes organizan tareas, las herramientas ejecutan operaciones acotadas y la transferencia define quién continúa. El ejercicio local deja inspeccionar las rutas, pero no imita un modelo ni el runtime de ADK. Usa varios agentes solo si aportan valor medible, con pruebas, permisos mínimos y una salida segura.
