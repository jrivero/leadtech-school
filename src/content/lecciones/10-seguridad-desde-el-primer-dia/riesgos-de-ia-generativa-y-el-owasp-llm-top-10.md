---
title: "Riesgos de IA generativa y el OWASP LLM Top 10"
description: "Conoce OWASP GenAI LLM Top 10 2026, delimita riesgos de un asistente y valida salidas ficticias sin usar servicios externos."
module: "10-seguridad-desde-el-primer-dia"
order: 4
duration: 50
level: "Intermedio"
objectives:
  - "Reconocer los diez códigos y nombres de OWASP GenAI LLM Top 10 2026."
  - "Relacionar contexto, permisos, recuperación y salidas con controles defensivos."
  - "Validar localmente una respuesta sintética antes de aceptarla en una aplicación."
prerequisites:
  - "Comprender a nivel básico prompts, datos y funciones de una aplicación con IA."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP GenAI LLM Top 10 2026"
    url: "https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/"
  - label: "Canon OWASP GenAI LLM Top 10 2026"
    url: "https://github.com/GenAI-Security-Project/GenAI-LLM-Top10/blob/main/2026/README.md"
  - label: "OWASP GenAI LLM Top 10: release actual y anterior"
    url: "https://github.com/GenAI-Security-Project/GenAI-LLM-Top10/blob/main/README.md"
---

## El modelo forma parte de un sistema

Un modelo generativo recibe instrucciones y datos, genera respuestas y puede consultar documentos o herramientas. La seguridad depende del sistema: qué contexto recibe, qué permisos tiene cada componente y cómo se valida la salida. Un prompt no sustituye una autorización comprobada por código.

El encabezado del temario usa «OWASP GenAI LLM Top 10 2026», pero la etiqueta del curso por sí sola no demuestra que exista una edición oficial. Lo confirmé en la ficha del OWASP GenAI Security Project y en el repositorio activo de OWASP: la ficha se titula «OWASP GenAI LLM Top 10 2026» y describe la guía como «OWASP Top 10 for LLM Applications 2026»; el repositorio identifica 2026 como release actual y 2025 como anterior. Por tanto, a 8 de octubre de 2026 esta lección utiliza la edición 2026 oficial, no la numeración 2025 o 2023. Hay una diferencia de un día entre la fecha de la ficha oficial (3 de agosto de 2026) y la de release en el README canónico (4 de agosto de 2026); describo la publicación como «a principios de agosto».

| Código y nombre oficial | Lectura defensiva |
|---|---|
| LLM01:2026 Prompt Injection | Tratar documentos y resultados de herramientas como contenido no confiable. |
| LLM02:2026 Sensitive Information Disclosure | Minimizar datos sensibles en contexto, respuestas y registros. |
| LLM03:2026 Excessive Agency | Limitar herramientas y permisos; exigir aprobación para acciones sensibles. |
| LLM04:2026 Supply Chain | Verificar procedencia e integridad de modelos, paquetes y servicios. |
| LLM05:2026 Data and Model Poisoning | Revisar procedencia y cambios en datos y artefactos. |
| LLM06:2026 Unbounded Consumption | Limitar tamaño, tiempo, concurrencia y presupuesto. |
| LLM07:2026 Misinformation | Contrastar afirmaciones y exigir revisión en decisiones importantes. |
| LLM08:2026 Hidden Context Exposure | No guardar secretos en contexto ni depender de instrucciones ocultas. |
| LLM09:2026 Vector and Embedding Weaknesses | Filtrar resultados por permisos y procedencia antes de recuperarlos. |
| LLM10:2026 Improper Output Handling | Validar estructura y codificar salidas; no ejecutar texto libre. |

Distinciones útiles: **LLM01:2026** aborda contenido que influye en el comportamiento; **LLM02:2026**, exposición de datos; **LLM03:2026**, permisos y autonomía; **LLM08:2026**, posible revelación de contexto interno; **LLM10:2026**, tratamiento inseguro de la salida. Ningún filtro único sustituye controles de aplicación: permisos, validación y revisión deben existir fuera del modelo.

## Actividad local

Guarda el bloque como `validar_respuesta.py` y ejecútalo con `python3 validar_respuesta.py`. No llama a modelos ni a internet; solo usa datos sintéticos y funciones estándar.

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

La función acepta un diccionario con dos campos esperados, texto acotado y fuente aprobada. La respuesta local se acepta; la segunda debe rechazarse. Esto ilustra LLM10:2026, pero no demuestra veracidad ni evita entradas no confiables. Los permisos de recuperación y herramientas requieren controles separados.

## Verificación y resultado

La salida esperada es `OK: estructura, longitud y fuente verificadas localmente.` Si una aserción falla, revisa los nombres de campos y la fuente del fixture, o confirma que la lista aprobada sea cerrada. Valida en código confiable antes de mostrar o procesar. Un formato correcto no autoriza acciones: cada herramienta comprueba permisos y argumentos por separado.

## Errores habituales y soluciones

- **Confiar en el prompt como autorización.** Aplica permisos en código, fuera del modelo.
- **Dar herramientas amplias.** Reduce capacidades y exige confirmación para acciones sensibles.
- **Tomar una respuesta bien formada por verdadera.** Contrasta fuentes y marca incertidumbre.
- **Usar texto generado directamente.** Valida esquema y longitud; codifica al mostrar y no ejecutes.
- **Olvidar recuperación y memoria.** Filtra documentos por permisos y controla su persistencia.
- **Usar solo controles del prompt.** Combina procedencia, límites de consumo, revisión y registros sin secretos.

## Resumen

OWASP GenAI LLM Top 10 2026 agrupa riesgos de datos, contexto, permisos, dependencias, consumo, veracidad y salidas. Conserva los códigos de esa edición y aplica defensas en la aplicación, no solo en el prompt. El ejercicio valida una salida sintética; una evaluación completa también revisa fuentes, capacidades, límites y supervisión humana.
