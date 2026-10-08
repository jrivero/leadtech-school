---
title: "Integrar seguridad en el ciclo de desarrollo"
description: "Convierte riesgos en requisitos comprobables y sitúa revisión humana y pruebas en un flujo seguro, desde la planificación hasta la integración de cambios."
module: "10-seguridad-desde-el-primer-dia"
order: 5
duration: 30
level: "Intermedio"
objectives:
  - "Traducir un riesgo del producto en un requisito de seguridad verificable."
  - "Ubicar revisión humana y pruebas en las etapas del ciclo de desarrollo."
  - "Definir una compuerta de integración proporcional al riesgo, sin desplegar servicios."
prerequisites:
  - "Conocer los conceptos de riesgo y límite de confianza del módulo."
  - "Saber qué comprueba una prueba automatizada sencilla."
updatedDate: '2026-10-08'
sources:
  - label: "NIST SP 800-218, Secure Software Development Framework (SSDF) v1.1"
    url: "https://csrc.nist.gov/pubs/sp/800/218/final"
  - label: "OWASP Secure Code Review Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html"
  - label: "OWASP Code Review Guide"
    url: "https://owasp.org/www-project-code-review-guide/"
---

Seguridad integrada significa convertir riesgos en decisiones comprobables durante la planificación, programación, revisión y mantenimiento. “Shift-left” adelanta conversaciones y controles; no vuelve infalibles las pruebas tempranas ni elimina revisiones posteriores.

NIST SP 800-218, Secure Software Development Framework (SSDF) v1.1, se publicó como versión final el 3 de febrero de 2022. Describe prácticas de alto nivel integrables en distintos ciclos de vida, sin prescribir un único pipeline. Referencia revisada el 8 de octubre de 2026.

## Del riesgo al requisito

Imagina una API de tareas cuyo requisito funcional es permitir cambiar el título de una tarea. Antes de escribir el endpoint, pregunta qué dato importa, quién debería modificarlo y qué podría salir mal. Una regla concreta sería: “Una persona solo puede cambiar tareas que le pertenecen; el título debe ser texto no vacío de hasta 80 caracteres”. Ya se puede diseñar una comprobación para cada parte.

Un requisito útil tiene un resultado observable. “La aplicación debe ser segura” no dice qué hacer. “Si la identidad falta o la tarea pertenece a otra persona, la operación no cambia el estado” sí permite escribir un test. Registra la relación entre riesgo, requisito, control y evidencia: por ejemplo, acceso indebido → comprobar propietario en el servidor → prueba con dos identidades sintéticas → revisión de la función que aplica el cambio.

## Puntos de control durante el ciclo

En la **planificación**, identifica datos sensibles, actores y límites de confianza; incluye criterios de aceptación para permisos y errores. En el **diseño**, decide dónde vive cada control y qué rol necesita cada acción. En la **implementación**, usa validadores y mecanismos de salida apropiados del framework, en vez de inventar filtros genéricos. En la **revisión del cambio**, sigue el dato desde su entrada hasta el lugar donde se guarda o muestra, y comprueba que el permiso se valida para el objeto concreto.

Antes de integrar, ejecuta pruebas positivas y negativas: el propietario puede cambiar su tarea; otra identidad no puede; un título vacío se rechaza; un error no deja una actualización parcial. Un pipeline defensivo podría ejecutar formato, pruebas unitarias y análisis estático, y pedir revisión humana de cambios sensibles. Es un modelo conceptual: aquí no se configura CI, no se conecta a una API ni se despliega nada. Las herramientas ayudan a encontrar señales, pero un resultado limpio no demuestra que la lógica de negocio sea correcta.

Después de integrar, conserva una vía para registrar y corregir defectos, revisar cambios relacionados y mejorar los requisitos. La frecuencia y profundidad de cada control dependen del impacto, los datos y el contexto; no todas las líneas necesitan el mismo tratamiento, pero toda ruta sensible sí necesita una decisión explícita.

## Actividad local

Modela el requisito de lectura de una tarea sin crear un servidor. Abre una terminal local y ejecuta `python3 -`; pega el bloque y termina con `PY`. Solo usa el intérprete estándar, datos inventados y memoria del proceso:

```bash
python3 - <<'PY'
def puede_leer(tarea, identidad):
    return identidad is not None and identidad["id"] == tarea["owner_id"]

tarea = {"id": "T-01", "owner_id": "ana", "title": "Preparar demo"}
casos = [
    ("propietaria", {"id": "ana"}, True),
    ("otra persona", {"id": "leo"}, False),
    ("sin identidad", None, False),
]
for nombre, identidad, esperado in casos:
    resultado = puede_leer(tarea, identidad)
    assert resultado is esperado, nombre
    print(f"OK: {nombre} -> {resultado}")
PY
```

La función representa una regla, no autentica a nadie: `identidad` simula el contexto confiable que una capa de servidor habría establecido. Los casos son fixtures sintéticos, no cuentas. Relaciona cada `assert` con el criterio de aceptación que lo justifica. Como extensión, escribe en tus notas qué prueba añadirías para una tarea inexistente y qué respuesta controlada devolvería la aplicación.

## Verificación y resultado

La terminal debe mostrar tres líneas `OK`: propietaria `True`, otra persona `False` y ausencia de identidad `False`. Si una aserción falla, no la borres para que el ejercicio pase: identifica si se equivocó la regla, el fixture o el requisito. El resultado que debes conservar es la trazabilidad entre requisito y prueba, además de un comportamiento denegado por defecto cuando falta la identidad.

## Errores habituales y soluciones

- **Dejar la seguridad para una revisión final.** Añade criterios de aceptación antes del código y revisa de nuevo el diff antes de integrarlo.
- **Confiar solo en una prueba positiva.** Añade casos de rechazo, límites y datos ausentes; comprueba que no haya cambios parciales.
- **Suponer que el pipeline sustituye al criterio humano.** Usa automatización como apoyo y asigna una revisión contextual a permisos y lógica de negocio.
- **Tratar SSDF como receta de una herramienta.** Es un marco de prácticas integrables, no un comando ni un pipeline obligatorio.

## Resumen

Integra seguridad convirtiendo riesgos en requisitos que se puedan revisar y probar. Planifica los límites de confianza, valida controles en el diff, combina pruebas con revisión humana y usa la automatización como apoyo. Una compuerta útil produce evidencia clara y no necesita exponer un servicio para enseñar la regla.
