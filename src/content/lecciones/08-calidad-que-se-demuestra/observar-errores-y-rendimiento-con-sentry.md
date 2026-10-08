---
title: "Observar errores y rendimiento con Sentry"
description: "Diseña eventos útiles para localizar errores y lentitud con Sentry, limita datos sensibles y aprende a distinguir observación de corrección automática."
module: "08-calidad-que-se-demuestra"
order: 4
duration: 40
level: "Intermedio"
objectives:
  - "Diferenciar un evento de error de una medida de rendimiento y una traza de operación."
  - "Definir contexto mínimo que ayude a reproducir un fallo sin filtrar datos personales."
  - "Diseñar una respuesta verificable a partir de un evento sintético."
prerequisites:
  - "Conocer errores de aplicación y el recorrido de una petición."
  - "Comprender que registros de producción pueden incluir datos sensibles."
updatedDate: '2026-10-08'
sources:
  - label: "Sentry: detalle oficial de incidencias y eventos"
    url: "https://docs.sentry.io/product/issues/issue-details/"
  - label: "OWASP: guía para proteger información sensible en registros"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html"
---

## Observar antes de intentar reproducir

En una aplicación real, una persona puede reportar “la pantalla se quedó cargando” sin recordar qué hizo. La observabilidad recoge señales para entender el recorrido: un evento puede describir un error, una medición puede mostrar duración o uso de recursos, y una traza puede relacionar operaciones que participan en una solicitud. No son sinónimos ni garantizan que se reconstruya todo lo ocurrido. Cada señal debe responder una pregunta operativa y respetar límites de privacidad.

Sentry es una plataforma de monitorización que documenta captura y análisis de errores, además de funciones relacionadas con rendimiento. El SDK y las opciones concretas varían por plataforma y cambian; esta lección no fija una inicialización ni un nombre de método. Antes de instrumentar una aplicación, consulta la guía oficial del lenguaje, revisa qué datos recoge por defecto y valida la configuración en un entorno no productivo. No envíes información privada para tener más “contexto” si un identificador técnico sería suficiente.

Un evento útil puede incluir entorno, versión desplegada, nombre de la operación y un identificador aleatorio de solicitud. Evita registrar contraseñas, tokens, cabeceras de autenticación, datos completos de pago o texto libre del usuario. Si necesitas asociar sesiones, aplica una política documentada de seudonimización y retención. También limita quién puede consultar eventos, cuánto tiempo se guardan y qué alerta merece despertar a alguien. Un panel con cientos de avisos sin prioridad puede ocultar el incidente importante.

## Ejemplo con una ficha ficticia

Supón que una versión `demo-3` produce un error al guardar tareas. Una ficha sintética podría indicar: entorno `pruebas`, versión `demo-3`, ruta lógica `guardar_tarea`, tipo `TimeoutError`, identificador `req-7f2a` y duración aproximada. No incluiría el contenido escrito por la persona ni su correo. Ese resumen permite buscar el código que guardó, comparar versiones y repetir el caso con datos ficticios. No demuestra cuál fue la causa; solo ayuda a formular una hipótesis.

El seguimiento comienza después de observar: confirma si el fallo se repite, identifica la versión afectada, busca una reproducción local, corrige la causa y añade una prueba de regresión. Después verifica que la alerta deja de aparecer en las condiciones relevantes. Marcar un evento como resuelto en una consola no corrige automáticamente la aplicación. Si el sistema envía notificaciones o acciones automáticas, revisa también destinatarios, permisos, frecuencia y posible información expuesta.

## Actividad sin conexión

1. Copia la ficha ficticia anterior en tus notas y añade una hipótesis sobre el lugar del código que revisarías.
2. Diseña una versión insegura que incluya una contraseña o el texto completo de la tarea; táchala y explica por qué no hace falta para reproducir el error.
3. Añade una acción siguiente concreta: comprobar el límite de tiempo, repetir una escritura de prueba o comparar el comportamiento entre versiones.
4. Define cuándo abrirías un aviso al equipo y quién puede cerrarlo; usa un único criterio observable, no “parece arreglado”.
5. Traslada la ficha a una prueba manual o un test local con valores inventados. No instales SDK ni transmitas el evento a Sentry.

## Verificación y solución

La ficha final sirve si permite localizar un flujo, una versión y una hipótesis sin revelar contenido sensible. Una solución razonable mantiene `entorno`, `versión`, `operación`, `tipo de error`, `id de solicitud` y un intervalo aproximado; omite correo, contraseña y texto privado. La acción verificable podría ser reproducir un tiempo de espera en un doble local y confirmar una prueba de regresión. La práctica enseña a diseñar contexto; no crea telemetría y no confirma que un proyecto envíe eventos correctamente.

Si una integración real parece necesaria, limita el envío a un entorno de prueba y revisa filtros, permisos, retención, alertas y consentimiento aplicable antes de compartir datos. Un evento más detallado no siempre es más útil; añade cada campo solo cuando explique una decisión operativa y pueda protegerse adecuadamente.

## Errores frecuentes

- **Registrar la solicitud completa por comodidad.** Conserva campos mínimos y elimina o transforma datos sensibles antes del envío.
- **Tratar una traza como explicación causal.** Sigue siendo evidencia parcial; contrástala con código y reproducción.
- **Resolver alertas sin corregir ni verificar.** Documenta la causa, el cambio y la comprobación de regresión.
- **Enviar todo desde el primer día.** Valida el SDK en un entorno controlado y ajusta datos y volumen.
- **Confundir esta ficha con una integración Sentry.** Indica qué se simuló y qué requiere configuración real.

## Resumen

La observabilidad ayuda a localizar problemas con eventos, medidas y trazas, siempre con contexto mínimo. Usa Sentry u otra plataforma según el proyecto, pero verifica la guía vigente y la privacidad de sus datos. Convierte señales en hipótesis, reproducción y una prueba; la herramienta no sustituye el análisis ni garantiza que el error haya desaparecido.
