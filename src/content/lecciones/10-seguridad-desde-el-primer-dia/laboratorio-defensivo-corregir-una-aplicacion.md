---
title: "Laboratorio defensivo: corregir una aplicación"
description: "Integra validación, permisos por propietario, cambios inmutables, errores controlados y pruebas en un modelo local de tareas, sin servidor ni red."
module: "10-seguridad-desde-el-primer-dia"
order: 8
duration: 40
level: "Intermedio"
objectives:
  - "Modelar controles de una API de tareas con funciones locales y datos sintéticos."
  - "Probar permisos por objeto, allowlists de campos y rechazo de estados inválidos."
  - "Verificar que una denegación no modifica datos y que la salida HTML se codifica en contexto."
prerequisites:
  - "Haber completado las lecciones de validación, autorización y codificación defensiva."
  - "Saber ejecutar Python 3 y leer aserciones sencillas."
updatedDate: '2026-10-09'
sources:
  - label: "OWASP Application Security Verification Standard (ASVS)"
    url: "https://owasp.org/www-project-application-security-verification-standard/"
  - label: "OWASP Input Validation Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
  - label: "OWASP Authorization Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
  - label: "OWASP Secure Code Review Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html"
---

El caso ficticio es una API de tareas donde cada persona edita sus elementos. No se despliega servidor ni objetivo vulnerable. El ejercicio no abre puertos, hace peticiones ni escanea sistemas, y no necesita cuentas, servicios externos, dependencias o pagos. Todo vive en memoria durante la ejecución de Python.

El contrato de ejemplo permite cambiar solo `title` y `status`. El título debe ser texto de 1 a 80 caracteres después de quitar espacios laterales; el estado debe pertenecer a una allowlist fija. La identidad y sus permisos representan contexto que la aplicación obtendría de una sesión validada en el servidor, nunca del cuerpo editable de la petición. La persona debe ser propietaria y tener la capacidad `tasks:edit`. La función devuelve un estado controlado y una copia nueva del almacén, de modo que un rechazo no deja una modificación parcial.

Antes de ejecutarlo, relaciona cada regla con su evidencia: campo → allowlist; actor → propietario y capacidad; resultado → copia nueva o denegación. El laboratorio no implementa autenticación criptográfica ni transporte HTTP: esos componentes quedan fuera del modelo local.

## Actividad local

Abre una terminal local y pega el bloque completo, incluido `python3 - <<'PY'` y la línea final `PY`. No uses cuentas ni información real: Ana, Leo y las tareas son fixtures sintéticos. El código emplea solo Python estándar, colecciones en memoria y aserciones.

```bash
python3 - <<'PY'
from html import escape

ESTADOS = {"abierta", "hecha"}
CAMPOS = {"title", "status"}

def validar(cambios):
    if not isinstance(cambios, dict) or not cambios or set(cambios) - CAMPOS:
        return None
    limpios = {}
    if "title" in cambios:
        titulo = cambios["title"]
        if not isinstance(titulo, str):
            return None
        titulo = titulo.strip()
        if not 1 <= len(titulo) <= 80:
            return None
        limpios["title"] = titulo
    if "status" in cambios:
        estado = cambios["status"]
        if not isinstance(estado, str) or estado not in ESTADOS:
            return None
        limpios["status"] = estado
    return limpios

def autorizado(tarea, actor):
    if not isinstance(actor, dict):
        return False
    permisos = actor.get("permissions", ())
    return (
        actor.get("id") == tarea["owner_id"]
        and isinstance(permisos, (set, frozenset))
        and "tasks:edit" in permisos
    )

def actualizar(datos, tid, actor, cambios):
    tarea = datos.get(tid)
    if tarea is None or not autorizado(tarea, actor):
        return "denied", datos
    limpios = validar(cambios)
    if limpios is None:
        return "invalid", datos
    nuevo = dict(datos)
    nueva = dict(tarea)
    nueva.update(limpios)
    nuevo[tid] = nueva
    return "ok", nuevo

mensajes = {"ok": "Guardado.", "invalid": "Revisa campos."}
datos = {"T-01": {"owner_id": "ana", "title": "Preparar demo", "status": "abierta"}}
ana = {"id": "ana", "permissions": frozenset({"tasks:edit"})}
leo = {"id": "leo", "permissions": frozenset({"tasks:edit"})}

estado, nuevo = actualizar(datos, "T-01", ana, {"title": "  Repasar permisos  ", "status": "hecha"})
assert estado == "ok" and nuevo["T-01"]["title"] == "Repasar permisos"
assert nuevo["T-01"]["status"] == "hecha" and datos["T-01"]["title"] == "Preparar demo"
estado, igual = actualizar(datos, "T-01", leo, {"title": "Cambio"})
assert estado == "denied" and igual is datos
assert actualizar(datos, "T-01", ana, {"status": "pausada"})[0] == "invalid"
assert actualizar(datos, "T-01", ana, {"owner_id": "leo"})[0] == "invalid"
assert mensajes.get("denied", "No se pudo completar") == "No se pudo completar"
assert escape("Plan & revisión", quote=True) == "Plan &amp; revisión"
print("OK: aserciones defensivas completadas")
PY
```

El orden de `actualizar` es deliberado: localiza y autoriza; valida todos los campos; solo entonces devuelve una copia modificada. `actor` simula el contexto establecido por el servidor, no viene de `cambios`, y la propiedad no se puede editar. La respuesta `denied` unifica recurso inexistente y falta de permiso. En una API real, mapea estados a mensajes estables y registra solo diagnóstico necesario en un lugar protegido. `escape` ilustra únicamente texto HTML; una API serializa JSON y conserva el escape automático de sus plantillas.
## Verificación y resultado

Debe aparecer una línea: `OK: aserciones defensivas completadas`. Comprueba que el propietario puede guardar el título recortado y el estado permitido, pero que `datos` permanece intacto; otra identidad debe recibir `denied` y el mismo almacén. Un estado desconocido y un campo `owner_id` se rechazan. El mensaje público no muestra internals. Estas aserciones verifican reglas concretas del modelo; no prueban una API real ni todas sus capas. Repite la prueba tras cada cambio pequeño.

## Errores habituales y soluciones

- **Tomar `actor` del cuerpo de la solicitud.** En una aplicación real, usa el contexto autenticado que establece el servidor; aquí los diccionarios solo son fixtures.
- **Comprobar solo el rol, no el objeto.** Compara propietario y recurso en cada operación; tener capacidad de edición no concede todas las tareas.
- **Validar después de mutar.** Valida el conjunto completo antes de crear y devolver el nuevo estado.
- **Copiar todos los campos enviados.** Define campos editables y rechaza los demás; no permitas cambiar propietario o permisos desde esta función.
- **Usar `escape` como defensa universal.** Codifica en la salida adecuada; para HTML enriquecido, SQL y URL hacen falta controles propios de cada contexto.
- **Exponer trazas para ayudar a depurar.** Devuelve mensajes limitados al cliente y conserva diagnóstico necesario solo en registros protegidos.

## Resumen

El laboratorio combina allowlists de campos y valores, autorización por propietario en el servidor, mínimo privilegio, cambios sin mutación parcial, errores controlados y codificación contextual. Prueba tanto el éxito como la denegación y los límites. Mantén el ejercicio local, determinista y sintético: una función pura y sus aserciones permiten practicar controles sin atacar ni desplegar ningún servicio.
