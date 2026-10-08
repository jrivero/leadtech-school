---
title: "Riesgos web y el OWASP Top 10"
description: "Interpreta OWASP Top 10:2025 para aplicaciones web y practica una comprobación de acceso con datos ficticios y controles verificables."
module: "10-seguridad-desde-el-primer-dia"
order: 2
duration: 45
level: "Intermedio"
objectives:
  - "Reconocer las diez categorías oficiales de OWASP Top 10:2025."
  - "Relacionar una decisión defensiva con el riesgo web que ayuda a reducir."
  - "Comprobar una regla local de acceso con identidades y registros ficticios."
prerequisites:
  - "Comprender solicitudes web, funciones y condicionales básicas."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP Top 10:2025 — Introduction"
    url: "https://top10.owasp.org/2025/0x00_2025-Introduction/"
  - label: "OWASP Top 10 — estado de publicación"
    url: "https://owasp.org/projects/top-ten"
---

## Qué representa el OWASP Top 10:2025

A fecha de 8 de octubre de 2026, la página oficial del proyecto identifica OWASP Top 10:2025 como la edición publicada más reciente. Esta lección refleja esa edición, no la de 2021. Sus categorías ayudan a conversar sobre riesgos de aplicaciones web; no son una receta de pruebas, una garantía de seguridad ni una medida automática de gravedad para una aplicación concreta. El número identifica una categoría, pero la prioridad de un caso depende de sus datos, exposición e impacto.

Los nombres siguientes se conservan en su forma oficial para poder buscarlos en documentación y revisiones. La explicación en español indica una decisión defensiva asociada a cada riesgo.

| Código y nombre oficial | Enfoque defensivo |
|---|---|
| A01:2025 Broken Access Control | Autorizar cada acción y recurso en el servidor; denegar por defecto. |
| A02:2025 Security Misconfiguration | Revisar valores seguros, opciones de depuración, permisos y configuraciones expuestas. |
| A03:2025 Software Supply Chain Failures | Conocer dependencias y artefactos; revisar procedencia, versiones y proceso de compilación. |
| A04:2025 Cryptographic Failures | Clasificar datos y protegerlos con mecanismos y gestión de claves adecuados. |
| A05:2025 Injection | Mantener separados los datos de las instrucciones y codificar según el contexto de salida. |
| A06:2025 Insecure Design | Definir requisitos de seguridad y escenarios de abuso antes de implementar. |
| A07:2025 Authentication Failures | Proteger inicio, recuperación de cuenta, sesiones y operaciones sensibles. |
| A08:2025 Software or Data Integrity Failures | Verificar la integridad y procedencia de software, configuración y datos confiables. |
| A09:2025 Security Logging & Alerting Failures | Registrar eventos útiles, alertar sobre señales relevantes y ensayar su seguimiento. |
| A10:2025 Mishandling of Exceptional Conditions | Gestionar errores y estados anómalos de forma controlada, sin fallar en modo permisivo. |

## Ejemplo defensivo: acceso a una nota

Una pantalla puede ocultar las notas ajenas, pero esa decisión visual no es una autorización. El servidor debe comprobar quién está autenticado y si puede realizar la acción solicitada sobre ese registro. Este ejemplo local representa esa regla y el riesgo A01:2025; no inicia un servidor ni envía solicitudes.

## Actividad local

Guarda el bloque como `acceso_web.py` en una carpeta temporal y ejecútalo con `python3 acceso_web.py`. El diccionario contiene registros sintéticos; Python 3 y `assert` son suficientes.

```python
documentos = {
    "nota-demo": {"propietario": "ana", "publica": False},
    "guia-demo": {"propietario": "ana", "publica": True},
}

def puede_leer(usuario, identificador):
    documento = documentos.get(identificador)
    return documento is not None and (
        documento["publica"] or documento["propietario"] == usuario
    )

assert puede_leer("ana", "nota-demo")
assert not puede_leer("luis", "nota-demo")
assert puede_leer("luis", "guia-demo")
assert not puede_leer("ana", "id-inexistente")
print("OK: permisos explícitos comprobados con cuatro casos ficticios.")
```

`documentos` es el conjunto de prueba. La función busca primero el registro y permite leerlo solo si es público o pertenece a la identidad que recibe. Si no existe, la condición devuelve `False`. Las aserciones cubren titular, otra cuenta, recurso público y recurso desconocido; juntas evitan que un único “caso feliz” oculte una regla demasiado amplia. En producción, la identidad debe derivarse del contexto autenticado del servidor y el control debe repetirse en cada ruta que acceda al dato.

## Verificación y resultado

El resultado correcto es `OK: permisos explícitos comprobados con cuatro casos ficticios.` Una aserción fallida indica que la implementación de ejemplo no respeta una de las decisiones documentadas. Puedes cambiar el fixture para representar otra política, pero actualiza también las expectativas y escribe el motivo. El ejercicio solo valida una regla de acceso local; no cubre autenticación, criptografía, registros, dependencias ni los demás riesgos de la tabla.

## Errores habituales y soluciones

- **Tomar el Top 10 como lista exhaustiva.** Úsalo para iniciar preguntas; complementa el análisis con requisitos, arquitectura y contexto del producto.
- **Confiar en controles solo visuales.** Aplica autorización en el servidor para leer, editar, exportar y borrar, incluso cuando la interfaz ya oculte la acción.
- **Confundir identidad con permiso.** Autenticar responde quién es la cuenta; autorizar decide qué puede hacer sobre este recurso.
- **Quedarse en un nombre de categoría.** Escribe un control concreto y una evidencia: prueba, revisión o configuración esperada.
- **Usar una edición distinta por costumbre.** Al comparar documentación, comprueba que los códigos correspondan a OWASP Top 10:2025 y no intercambies nombres de otra edición.

## Resumen

OWASP Top 10:2025 da vocabulario compartido para diez familias de riesgos web, no una aprobación automática del producto. Aprende los nombres oficiales, relaciona cada uno con controles del diseño y verifica al menos una regla con datos ficticios. En especial, la autorización de recursos debe aplicarse en el servidor y probar tanto el acceso legítimo como el denegado.
