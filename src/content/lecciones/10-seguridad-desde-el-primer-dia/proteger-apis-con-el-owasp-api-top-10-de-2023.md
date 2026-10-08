---
title: "Proteger APIs con el OWASP API Top 10 de 2023"
description: "Comprende los diez riesgos de API de OWASP 2023 y practica autorización por objeto y campos con datos sintéticos en Python local."
module: "10-seguridad-desde-el-primer-dia"
order: 3
duration: 50
level: "Intermedio"
objectives:
  - "Identificar las diez categorías oficiales de OWASP API Security Top 10 2023."
  - "Distinguir autorización por objeto, propiedad y función en una API."
  - "Verificar localmente una respuesta permitida y otra denegada con datos ficticios."
prerequisites:
  - "Conocer el propósito de una API y las estructuras de datos básicas."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP API Security Top 10 2023 — Introduction"
    url: "https://api-security.owasp.org/editions/2023/en/0x03-introduction/"
  - label: "OWASP API Security Top 10 2023 — Release Notes"
    url: "https://api-security.owasp.org/editions/2023/en/0x04-release-notes/"
---

## Una API tiene límites propios

Una API permite que clientes y servicios pidan datos o acciones. La interfaz puede ocultar opciones, pero la API debe validar por sí misma identidad, permiso, propiedades solicitadas y límites de consumo. El temario pide expresamente OWASP API Security Top 10 2023; esta lección utiliza solo esa edición y conserva el código `API1:2023` y similares para que no se confundan con otros catálogos.

Tres controles parecidos responden preguntas diferentes. **API1:2023 Broken Object Level Authorization** pregunta si esta cuenta puede actuar sobre este registro. **API3:2023 Broken Object Property Level Authorization** pregunta qué campos del registro puede leer o cambiar. **API5:2023 Broken Function Level Authorization** pregunta si tiene permiso para usar esa operación. Autenticarse no resuelve por sí solo ninguna de las tres decisiones.

| Código y nombre oficial | Enfoque defensivo |
|---|---|
| API1:2023 Broken Object Level Authorization | Comprobar el permiso de la cuenta sobre cada objeto y acción. |
| API2:2023 Broken Authentication | Proteger autenticación, sesiones, tokens y recuperación de cuenta. |
| API3:2023 Broken Object Property Level Authorization | Permitir solo las propiedades que corresponden a cada rol y operación. |
| API4:2023 Unrestricted Resource Consumption | Limitar tamaños, concurrencia, frecuencia y coste de las operaciones. |
| API5:2023 Broken Function Level Authorization | Verificar el permiso de la cuenta para ejecutar cada función. |
| API6:2023 Unrestricted Access to Sensitive Business Flows | Proteger procesos sensibles con controles de negocio y límites adecuados. |
| API7:2023 Server Side Request Forgery | Restringir de forma explícita los destinos que un servidor puede consultar. |
| API8:2023 Security Misconfiguration | Mantener opciones, errores, permisos y entornos con valores seguros. |
| API9:2023 Improper Inventory Management | Mantener inventario de versiones, rutas, responsables y ciclos de retirada. |
| API10:2023 Unsafe Consumption of APIs | Validar respuestas y fallos de servicios externos antes de confiar en ellos. |

## Actividad local

Implementa una regla pequeña con un documento ficticio. Guarda el código como `lectura_api.py` y ejecútalo con `python3 lectura_api.py`. No usa HTTP, credenciales reales, paquetes adicionales ni servicios externos.

```python
documentos = {
    "doc-demo": {
        "propietario": "ana",
        "titulo": "Plan de prueba",
        "estado": "borrador",
        "nota_interna": "dato sintético no visible al cliente",
    }
}

def leer_documento(usuario, identificador):
    documento = documentos.get(identificador)
    if documento is None or documento["propietario"] != usuario:
        return None
    return {
        "id": identificador,
        "titulo": documento["titulo"],
        "estado": documento["estado"],
    }

propio = leer_documento("ana", "doc-demo")
otro = leer_documento("luis", "doc-demo")
assert propio is not None
assert "nota_interna" not in propio
assert otro is None
assert leer_documento("ana", "id-inexistente") is None
print("OK: objeto autorizado, campos permitidos y denegación comprobados.")
```

El primer control de `leer_documento` deniega objetos inexistentes o ajenos; eso ilustra autorización por objeto. La respuesta se construye campo a campo, en vez de devolver el registro completo, para mostrar una lista permitida de propiedades. Las cuatro aserciones comprueban acceso de la propietaria, ausencia del campo interno, denegación a otra cuenta y denegación a un identificador desconocido. En una API real se añadirían permisos de función y validación de entrada, pero no se inferirían a partir del identificador del objeto.

## Verificación y resultado

La salida esperada es `OK: objeto autorizado, campos permitidos y denegación comprobados.` Si una aserción falla, compara primero la política escrita con el fixture; conserva la aserción que representa una denegación importante. El ejemplo muestra la forma de una prueba unitaria, no prueba una API desplegada. Para trasladar el criterio al proyecto, añade pruebas en el propio código que cubran cada ruta, rol y acción, sin enviar peticiones a sistemas ajenos.

## Errores habituales y soluciones

- **Pensar que un identificador difícil de adivinar autoriza acceso.** El permiso debe evaluarse en el servidor para cada objeto.
- **Devolver todo el registro y ocultar campos en la interfaz.** Construye respuestas con propiedades explícitas y valida también los campos modificables.
- **Mezclar las categorías API1, API3 y API5.** Separa objeto, propiedad y función; una operación puede necesitar las tres comprobaciones.
- **Añadir autenticación y dar por cerrada la seguridad.** Revisa límites de recursos, flujos de negocio, inventario, configuración y dependencias externas.
- **Confiar automáticamente en una API consumida.** Trata sus respuestas como entradas: valida formato, campos, tamaño y manejo de errores.

## Resumen

La edición API Security Top 10 2023 ayuda a pensar en riesgos específicos de interfaces programáticas. Mantén el código y los nombres de esa edición, separa autorización por objeto, propiedad y función, y aplica controles de recursos e inventario. La actividad verifica localmente una lectura segura usando datos ficticios; las pruebas reales deben ejecutarse en el entorno propio y dentro del alcance autorizado.
