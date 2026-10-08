---
title: "Pensar en seguridad antes de escribir código"
description: "Aprende a identificar activos y límites de confianza, priorizar riesgos y definir mitigaciones con evidencia antes de implementar una función."
module: "10-seguridad-desde-el-primer-dia"
order: 1
duration: 40
level: "Intermedio"
objectives:
  - "Identificar activos, actores y límites de confianza en una función pequeña."
  - "Describir un riesgo mediante impacto, control y evidencia verificable."
  - "Crear un modelo de amenazas inicial antes de implementar una solución."
prerequisites:
  - "Conocer variables, funciones y estructuras de datos básicas."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP Threat Modeling"
    url: "https://owasp.org/www-community/Threat_Modeling"
---

## Seguridad como decisión de diseño

La seguridad no es una lista de comprobaciones que se añade al final: es decidir qué debe protegerse, quién puede usar cada función y qué prueba demostrará que el límite funciona. El modelado de amenazas organiza esa conversación antes de que una decisión difícil de cambiar quede escondida dentro del código. No exige predecir todas las posibilidades; ayuda a concentrarse en escenarios plausibles y consecuencias importantes.

Empieza delimitando una función concreta, por ejemplo, guardar y compartir notas privadas. Identifica los activos —contenido, cuentas y permisos—, los actores legítimos, los componentes y los límites de confianza. En este ejemplo, el navegador envía una petición, el servidor decide qué cuenta está autenticada y la base de datos almacena las notas. El identificador de una nota llega desde el cliente, pero no es una prueba de que ese cliente sea su propietario.

Un modelo útil responde cuatro preguntas: ¿qué estamos construyendo?, ¿qué podría salir mal?, ¿qué haremos al respecto? y ¿cómo sabremos si funcionó? Para cada riesgo escribe el activo afectado, un escenario concreto, el impacto, una mitigación asignada y evidencia que se pueda revisar. Así, “la app puede ser insegura” se convierte en “una cuenta podría leer la nota privada de otra; el servidor verificará el propietario en cada lectura; una prueba con dos cuentas ficticias debe permitir la lectura a la titular y denegarla a la otra”.

## Actividad local

Trabaja sin conexión en una carpeta temporal. Guarda el siguiente bloque como `modelo.py` y ejecútalo con `python3 modelo.py`. Solo utiliza funciones y estructuras incorporadas de Python; los nombres y registros son ficticios.

```python
notas = {
    "nota-demo": {"propietario": "ana", "visibilidad": "privada"},
    "guia-demo": {"propietario": "ana", "visibilidad": "publica"},
}

def puede_leer(usuario, identificador):
    nota = notas.get(identificador)
    return nota is not None and (
        nota["visibilidad"] == "publica"
        or nota["propietario"] == usuario
    )

assert puede_leer("ana", "nota-demo")
assert not puede_leer("luis", "nota-demo")
assert puede_leer("luis", "guia-demo")
assert not puede_leer("luis", "id-inexistente")

riesgos = [
    {"activo": "nota-demo", "escenario": "otra cuenta solicita la nota privada",
     "impacto": "exposición de contenido", "control": "comprobar propietario",
     "evidencia": "pruebas con titular y otra cuenta"},
    {"activo": "texto de las notas", "escenario": "el cuerpo aparece en registros",
     "impacto": "divulgación", "control": "registrar eventos sin el contenido",
     "evidencia": "revisión de los campos registrados"},
]
campos = {"activo", "escenario", "impacto", "control", "evidencia"}
assert all(campos.issubset(riesgo) for riesgo in riesgos)
assert all(riesgo[campo] for riesgo in riesgos for campo in campos)
print("Modelo completo: 2 riesgos; política de lectura validada.")
```

La función `puede_leer` aplica denegación por defecto: un identificador desconocido no concede acceso. Las cuatro aserciones expresan casos esperados para la nota privada, la guía pública y un registro inexistente. La lista `riesgos` convierte observaciones en trabajo comprobable; las últimas aserciones exigen que cada riesgo tenga activo, escenario, impacto, control y evidencia. En una aplicación real, la identidad procedería de la sesión autenticada del servidor, no de un nombre que el cliente pudiera elegir.

## Verificación y resultado

La salida esperada es `Modelo completo: 2 riesgos; política de lectura validada.` Si una aserción falla, Python señala la línea que no coincide con la política prevista. Revisa primero los datos de prueba y después la condición de acceso; no elimines la comprobación para “hacer pasar” el ejercicio. El resultado no certifica una aplicación completa: demuestra que una regla pequeña y sus evidencias quedaron explícitas. Anota además quién revisará cada mitigación y cuándo repetirás la comprobación, por ejemplo, al añadir compartir, exportar o cambiar permisos.

## Errores habituales y soluciones

- **Enumerar riesgos sin contexto.** Acota el modelo a una función y a los datos que usa; amplíalo cuando cambie el flujo.
- **Confundir autenticación con autorización.** Saber qué cuenta inició sesión no basta: decide si esa cuenta puede leer o modificar ese recurso concreto.
- **Confiar en la interfaz o en identificadores difíciles de adivinar.** Ocultar un botón o usar identificadores aleatorios no sustituye la autorización en el servidor.
- **Registrar datos privados para depurar.** Conserva eventos mínimos y útiles; excluye cuerpos de notas, credenciales y tokens.
- **Tratar el modelo como documento terminado.** Actualízalo al cambiar datos, integraciones, permisos o supuestos.

## Resumen

Pensar en seguridad antes del código consiste en acotar el sistema, nombrar activos y límites, formular escenarios concretos y asignar mitigaciones con evidencia. Un modelo pequeño que cambia junto con el producto es más útil que una lista extensa sin responsables ni pruebas. Empieza por una función, verifica el comportamiento permitido y el denegado con datos ficticios y conserva ese criterio en las pruebas del proyecto.
