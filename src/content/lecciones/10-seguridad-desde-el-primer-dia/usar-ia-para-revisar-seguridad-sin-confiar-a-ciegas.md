---
title: "Usar IA para revisar seguridad sin confiar a ciegas"
description: "Usa la IA como apoyo para revisar un fragmento sintético, protege el contexto que compartes y valida cada hipótesis con lectura humana y pruebas."
module: "10-seguridad-desde-el-primer-dia"
order: 7
duration: 30
level: "Intermedio"
objectives:
  - "Preparar una consulta de revisión que no comparta secretos ni datos sensibles."
  - "Evaluar hallazgos de IA como hipótesis que requieren evidencia y contexto."
  - "Convertir una observación útil en una prueba local de regresión."
prerequisites:
  - "Saber seguir el flujo de una entrada hasta su uso."
  - "Conocer validación, autorización y pruebas unitarias básicas."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP Secure Coding with AI Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_with_AI_Cheat_Sheet.html"
  - label: "OWASP Secure Code Review Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html"
  - label: "OWASP Code Review Guide"
    url: "https://owasp.org/www-project-code-review-guide/"
---

Un asistente de IA puede proponer preguntas para una revisión, resumir un diff o sugerir casos límite. Su respuesta no demuestra que el código sea seguro: puede omitir una ruta, asumir reglas de negocio inexistentes o afirmar un problema sin evidencia. Trátala como una lista de hipótesis que una persona debe contrastar con el código, los requisitos y pruebas reproducibles.

## Prepara un contexto seguro y pequeño

Antes de compartir código, consulta la política del servicio aprobado. No pegues claves, tokens, datos personales, registros reales, direcciones internas ni código propietario sensible. Sustituye identificadores por valores inventados y elimina detalles reidentificables: cambiar un nombre no basta. Si no puedes confirmar el permiso o sanear el fragmento, no lo envíes; usa una checklist local. Revisa también las opciones de privacidad del producto. Que una conversación parezca privada no la hace confidencial.

## Pide evidencia, no un veredicto

Usa una instrucción acotada: “Revisa este ejemplo ficticio. Señala posibles fallos de validación, autorización por objeto y manejo de errores. Para cada observación, cita la línea o condición relevante, declara qué supuesto falta y propone un test unitario local. Distingue hechos de hipótesis; no ejecutes comandos ni inventes dependencias”. Una respuesta útil identifica qué dato controla el usuario, qué función lo consume y qué regla demostraría el problema.

Ejemplo deliberadamente incompleto, inventado y nunca conectado a un servicio real:

```python
def renombrar(tarea, actor, titulo):
    if not isinstance(titulo, str) or not titulo.strip():
        return None
    return {"id": tarea["id"], "title": titulo.strip()}
```

La función comprueba que el título sea texto no vacío, pero no expresa una regla sobre quién puede renombrar la tarea ni limita la longitud. Eso no basta para concluir que una aplicación real tenga una vulnerabilidad: faltan el llamador, el modelo de identidad y los requisitos. La IA puede señalar esas preguntas; la persona revisora debe buscar la evidencia en el código y decidir si aplica.

## Confirma cada propuesta

Para cada hallazgo, pregunta: ¿qué requisito incumple?, ¿qué evidencia observable lo respalda?, ¿qué contexto no conoce el modelo?, ¿qué test distingue el caso permitido del denegado? Lee el diff completo y sigue datos desde entrada hasta persistencia y salida. Revisa cambios sugeridos como cualquier código nuevo: no aceptes dependencias, comandos, políticas o modificaciones amplias sin entenderlas. Un test unitario confirma un comportamiento concreto; no certifica todas las rutas ni reemplaza una revisión completa.

## Actividad local

Usa el prompt con el fragmento ficticio solo en una herramienta aprobada; si no, practica la checklist sin IA. No compartas código real. Después prueba esta función pura con Python estándar mediante `python3 -`:

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

Los perfiles y la tarea son datos sintéticos; la función no lee red ni modifica archivos. Compara cada test con el hallazgo: el test del propietario debe permitir, el de otra identidad denegar y el título vacío rechazarse. Si la revisión de IA propone una corrección distinta, exige la misma evidencia y repite las pruebas pertinentes.

## Verificación y resultado

El resultado esperado es una línea `OK` tras superar los tres casos. Guarda en tus notas solo el hallazgo validado, su supuesto, el control y la prueba; no copies salidas con datos sensibles. Si el asistente no encuentra nada, conserva la checklist humana: “sin hallazgos” no es prueba de ausencia.

## Errores habituales y soluciones

- **Pegar un archivo entero para obtener más contexto.** Reduce el fragmento y usa fixtures inventados; si no puedes sanearlo, revisa localmente.
- **Preguntar “¿es seguro?” y aceptar sí/no.** Pide evidencia, supuestos y una prueba que pueda fallar si el control falta.
- **Aceptar una afirmación genérica como defecto confirmado.** Busca la ruta, regla de negocio y destino del dato antes de priorizarla.
- **Aplicar una corrección sugerida sin probarla.** Inspecciona el diff y ejecuta tests positivos, negativos y de límites.
- **Confundir una revisión asistida con una auditoría.** Combina apoyo automatizado, criterio humano y controles independientes.

## Resumen

La IA puede ampliar preguntas, no asumir responsabilidad ni certificar seguridad. Comparte el mínimo permitido y sin secretos o datos sensibles; pide observaciones con evidencia y supuestos; confirma cada una leyendo el código y probando la regla con casos locales. Mantén la revisión humana incluso cuando el modelo no encuentre problemas.
