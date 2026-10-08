---
title: "Revisión de código entre personas e IA"
description: "Combina revisión humana y asistencia de IA para encontrar defectos concretos en un diff, pedir evidencia y comprobar cada hallazgo antes de cambiar código."
module: "08-calidad-que-se-demuestra"
order: 9
duration: 35
level: "Intermedio"
objectives:
  - "Revisar un diff desde el requisito, las rutas de error y el impacto para otras partes del sistema."
  - "Pedir a un asistente hallazgos acotados con evidencia y supuestos explícitos."
  - "Convertir un hallazgo válido en una prueba reproducible antes de aceptar una corrección."
prerequisites:
  - "Saber leer funciones, pruebas y un diff de cambios."
  - "Conocer validación y límites de datos básicos."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP: Secure Code Review Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html"
  - label: "GitHub Docs: revisar cambios en una solicitud de incorporación"
    url: "https://docs.github.com/en/pull-requests/how-tos/review-pull-requests"
---

## Revisar un cambio, no una reputación

Una revisión de código comprueba si un cambio cumple su intención, se integra con el sistema y deja riesgos aceptables. El objeto de análisis es el diff más el contexto necesario: requisito, llamadas afectadas, tests y límites de seguridad. Ni “lo escribió una persona experta” ni “lo generó un modelo” sustituye esa revisión. Una IA puede resumir, enumerar casos y sugerir preguntas, pero también puede pasar por alto el flujo relevante, asumir una regla o inventar un defecto.

Empieza por la intención y por el resultado externo. Lee qué se añadió y qué se eliminó; sigue la entrada a través de validaciones, reglas, almacenamiento y salida. Busca errores funcionales, compatibilidad, autorización, manejo de datos, accesibilidad y pruebas faltantes según el riesgo del cambio. No todos los diffs necesitan una auditoría extensa: una actualización de texto tiene preguntas distintas de un cambio en permisos o pagos. Registra la evidencia y explica por qué un riesgo aplica o no.

En una revisión asistida, comparte solo el contexto autorizado y pide algo que se pueda contrastar: “Revisa este diff ficticio para errores de límites y estados; cita la condición implicada, declara supuestos y propone una prueba local. No ejecutes comandos ni añadas dependencias”. Una respuesta que diga “parece correcto” no ayuda. Un hallazgo útil identifica una ruta y un caso reproducible. Si apunta a un archivo que no cambió, pregunta qué parte del diff origina el problema.

## Ejemplo: reservar todo el inventario

Una regla de práctica permite reservar hasta las unidades disponibles, inclusive. El cambio introduce esta condición:

```python
def reservar_defectuoso(stock, unidades):
    if unidades <= 0:
        return "cantidad_invalida"
    if unidades >= stock:
        return "sin_stock"
    return "reservada"

def reservar_corregido(stock, unidades):
    if unidades <= 0:
        return "cantidad_invalida"
    if unidades > stock:
        return "sin_stock"
    return "reservada"

assert reservar_defectuoso(4, 4) == "sin_stock"  # reproduce el defecto
assert reservar_corregido(4, 4) == "reservada"
assert reservar_corregido(4, 5) == "sin_stock"
print("OK: el caso límite se acepta y el exceso se rechaza")
```

Si quedan cuatro unidades y se piden cuatro, el código las rechaza aunque el contrato las permite. Para demostrarlo, formula una prueba para `(stock=4, unidades=4)` y otra para `(4, 5)`. La primera debería aceptar y la segunda rechazar. El defecto está en el límite, no en una impresión estética. Un asistente puede señalar la condición; la persona revisora verifica el requisito y ejecuta los casos antes de sugerir cambiar `>=` por `>`.

## Actividad paso a paso

1. Lee la intención de una modificación pequeña y escribe los resultados esperados para un caso normal, un borde y una entrada no permitida.
2. Inspecciona cada archivo cambiado y observa si las pruebas cubren esos resultados.
3. Si usas IA, comparte un fragmento sintético o un diff autorizado, nunca claves, datos reales ni código que no puedas transmitir.
4. Pide hallazgos con ubicación, razonamiento, supuesto y test reproducible. Clasifica cada uno como confirmado, no aplicable o pendiente de contexto.
5. Para el ejemplo de inventario, comprueba las dos entradas antes de cambiar el operador. Después ejecuta el mismo par de casos con la corrección.
6. Revisa el diff final y confirma que la solución no modifica otras reglas ni silencia una prueba.

## Verificación y resolución

La prueba distingue los casos: pedir cuatro de cuatro debe tener éxito; pedir cinco de cuatro debe fallar. El cambio de condición se justifica porque satisface ambos criterios, no porque lo sugirió un modelo. Si el requisito real no define si la última unidad es reservable, el hallazgo queda pendiente: hay que consultar a quien define el producto antes de imponer una regla.

En una plataforma de revisión, los comentarios más útiles describen una acción y su impacto esperado. Separa sugerencias opcionales de defectos que bloquean el merge. Comprueba que la versión revisada coincide con el diff que se probará; si llegan cambios nuevos, la evidencia anterior puede quedar obsoleta.

## Errores frecuentes

- **Pedir un veredicto general de seguridad.** Divide por riesgos, rutas y supuestos observables.
- **Aceptar un hallazgo sin reproducirlo.** Relaciónalo con requisito, código y test que distinguiría el fallo.
- **Descartar una observación porque viene de IA.** Verifica su evidencia; una fuente imperfecta puede apuntar a un caso real.
- **Revisar solo estilo.** Prioriza comportamiento, límites, seguridad y mantenibilidad antes de preferencias cosméticas.
- **Confundir aprobación con garantía.** La revisión reduce riesgos conocidos, no demuestra ausencia de defectos.

## Resumen

La revisión combina intención, diff, contexto y evidencia. La IA puede ayudar a formular preguntas, pero cada observación necesita confirmación humana y una prueba adecuada. Resuelve ambigüedades antes de cambiar reglas, vuelve a revisar el diff corregido y conserva claro qué se comprobó y qué queda pendiente.
