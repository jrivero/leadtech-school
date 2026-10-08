---
title: "Validación, autorización y codificación defensiva"
description: "Separa formato de reglas de negocio, aplica permisos en el servidor, codifica según el contexto de salida y comunica errores sin revelar detalles internos."
module: "10-seguridad-desde-el-primer-dia"
order: 6
duration: 35
level: "Intermedio"
objectives:
  - "Validar entradas mediante reglas allowlist de tipo, longitud y significado."
  - "Explicar por qué la autorización se comprueba en el servidor para cada recurso."
  - "Elegir codificación contextual y errores controlados para una salida segura."
prerequisites:
  - "Entender la diferencia entre una entrada confiable y una no confiable."
  - "Conocer funciones, diccionarios y aserciones básicas de Python."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP Input Validation Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
  - label: "OWASP Authorization Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
  - label: "OWASP Cross Site Scripting Prevention Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
  - label: "OWASP Error Handling Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html"
---

Una solicitud bien formada todavía puede pedir una acción prohibida. Separa tres controles: validar los datos, autorizar a la identidad para el objeto y codificar la salida según su contexto. Ningún filtro de caracteres protege todos los destinos.

## Validación con reglas explícitas

Valida en el servidor aunque la interfaz adelante errores útiles. Define tipo, tamaño, formato y regla de negocio. Para `status`, acepta solo opciones conocidas (`abierta`, `hecha`). Para un título, permite puntuación legítima, recorta espacios si corresponde y limita la longitud. Una allowlist expresa lo aceptado; una denylist intenta anticipar cada forma “mala” y puede bloquear casos válidos sin sustituir el control correcto.

La validación debe ocurrir después de interpretar el formato recibido y antes de usar los datos. Aceptar un número como entero no demuestra que su valor tenga sentido. Si la petición trae campos que la función no permite modificar —como `owner_id` o `role`— no los copies automáticamente al objeto. Valida cada campo y rechaza la operación si la estructura no es la esperada.

## Autorización en cada acción

Autenticación responde “¿quién es esta identidad?”; autorización responde “¿puede realizar esta acción sobre este objeto?”. La interfaz puede ocultar un botón, pero no constituye un límite de seguridad: la decisión debe tomarse en la capa de servidor que ejecuta la operación. Comprueba el permiso en cada solicitud y para cada registro; conocer o adivinar un identificador no concede acceso. Empieza denegando por defecto y concede solo la capacidad mínima necesaria.

En un ejemplo de tareas, el contexto de identidad debe venir de una sesión o mecanismo confiable gestionado por el servidor, no de un campo editable del cuerpo de la solicitud. Para cambiar una tarea, verifica que coinciden el identificador de quien actúa y el propietario, además del permiso necesario. Los tests deben incluir un caso permitido y otro denegado.

## Codificación y errores con contexto

Codificar salida significa transformar datos para que se interpreten como texto en el contexto donde se insertan. HTML, atributos, URL, JavaScript y CSS tienen reglas distintas. En una plantilla moderna, conserva el escape automático para texto; si muestras texto en un nodo HTML con Python, `html.escape` es una ilustración de ese contexto, no una solución para construir JavaScript, URLs o consultas SQL. Para SQL usa consultas parametrizadas: el escape HTML no sirve para ese destino.

Cuando algo falla, devuelve un código y un mensaje útil pero limitado, como “Revisa los campos” o “No se pudo completar la operación”. No envíes trazas, consultas, rutas internas ni detalles de configuración al cliente. Si hace falta diagnosticar, conserva contexto técnico en registros protegidos y evita incluir secretos o datos personales innecesarios.

## Actividad local

Prueba las reglas como funciones aisladas con Python estándar. Ejecuta `python3 -` en una terminal; pega el bloque y termina la entrada con `PY`. No se inicia una API: los dos perfiles y la tarea son fixtures inventados.

```bash
python3 - <<'PY'
from html import escape

def validar_titulo(valor):
    if not isinstance(valor, str):
        return None
    valor = valor.strip()
    return valor if 1 <= len(valor) <= 80 else None

def puede_editar(tarea, identidad):
    return (
        identidad is not None
        and identidad["id"] == tarea["owner_id"]
        and "tasks:edit" in identidad["permissions"]
    )

tarea = {"id": "T-01", "owner_id": "ana"}
ana = {"id": "ana", "permissions": {"tasks:edit"}}
leo = {"id": "leo", "permissions": {"tasks:edit"}}
titulo = validar_titulo("  Revisión & notas  ")
assert titulo == "Revisión & notas"
assert validar_titulo("   ") is None
assert puede_editar(tarea, ana)
assert not puede_editar(tarea, leo)
assert escape(titulo, quote=True) == "Revisión &amp; notas"
print("OK: validación, permiso por propietario y escape HTML")
PY
```

`validar_titulo` comprueba tipo, espacios y límite; `puede_editar` separa permiso de validación; `escape` se usa únicamente para un ejemplo de texto HTML. No deduzcas identidad de datos que envía el usuario en producción: aquí los perfiles solo simulan contexto confiable.

## Verificación y resultado

La salida esperada es `OK: validación, permiso por propietario y escape HTML`. Cada `assert` debe pasar: un título normal se conserva, uno vacío falla, Ana puede editar su tarea, Leo no, y el ampersand se representa como texto en HTML. El valor original puede almacenarse como texto normal y codificarse cuando se renderiza en el contexto adecuado.

## Errores habituales y soluciones

- **Validar solo en el navegador.** Repite las reglas en el servidor, que es quien toma la decisión final.
- **Bloquear puntuación para evitar problemas.** Define tipo, longitud y semántica; no confundas allowlist de negocio con filtros de caracteres “maliciosos”.
- **Ocultar el botón como autorización.** Verifica cada acción en servidor y para cada objeto.
- **Escapar todo una vez al recibirlo.** Codifica al emitir, según el contexto concreto; usa parámetros para consultas SQL.
- **Devolver la excepción completa.** Ofrece un error controlado al usuario y limita el detalle interno a registros protegidos.

## Resumen

Validar, autorizar y codificar son controles diferentes y complementarios. Acepta solo datos que cumplen reglas explícitas, decide permisos en el servidor para cada recurso y codifica al presentar valores según su contexto. Deniega por defecto y comunica fallos sin filtrar detalles internos.
