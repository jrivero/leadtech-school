---
title: "Cómo se comunican sistemas, redes y APIs"
description: "Recorre el camino de una petición entre cliente y servidor, e identifica métodos, rutas, cabeceras, respuestas y errores habituales de una API HTTP."
module: "02-bases-para-crear-software"
order: 5
duration: 45
level: "Inicial"
objectives:
  - "Describir el intercambio petición-respuesta entre cliente y servidor."
  - "Identificar método, URI, cabeceras, cuerpo y código de estado HTTP."
  - "Distinguir un protocolo HTTP de las reglas particulares de una API."
prerequisites:
  - "Conocer funciones y estructuras de datos básicas"
updatedDate: "2026-10-08"
sources:
  - label: "IETF RFC 9110: semántica de HTTP"
    url: "https://www.rfc-editor.org/rfc/rfc9110.html"
---

## Qué ocurre cuando dos programas se hablan

Una red permite que programas en equipos distintos intercambien datos. En una interacción web común, un cliente —por ejemplo, un navegador o una aplicación— envía una petición a un servidor, que la procesa y devuelve una respuesta. HTTP define la semántica de ese intercambio: el cliente expresa una intención mediante un método y un recurso de destino; la respuesta comunica un estado y, a menudo, una representación del recurso.

Una API es un contrato de interacción entre componentes. Si usa HTTP, puede especificar rutas, métodos, formatos de datos, permisos y errores. HTTP por sí solo no obliga a que todas las APIs sigan un mismo diseño. JSON es un formato frecuente para el cuerpo, pero también pueden intercambiarse otros tipos de contenido. Una API no es simplemente «una URL» ni «una base de datos en Internet».

## Anatomía de una petición

Imagina que una aplicación quiere leer tareas pendientes:

```http
GET /api/tareas?estado=pendiente HTTP/1.1
Host: ejemplo.test
Accept: application/json
```

`GET` expresa la intención de recuperar una representación. La ruta y la consulta identifican qué se solicita; `Host` señala el servidor y `Accept` comunica el formato que el cliente puede procesar. El servidor podría responder `200 OK` con una lista JSON. Si el cliente envía una tarea nueva con `POST /api/tareas`, el cuerpo podría contener título y estado inicial; si la crea, una respuesta `201 Created` sería una elección habitual de API.

Métodos y códigos tienen semánticas definidas por HTTP, pero las reglas de negocio pertenecen a cada API. Por ejemplo, la API puede decidir que una tarea sin título es inválida. La documentación del servicio debería decir cómo se autentica el cliente, qué campos son obligatorios, qué estados se devuelven y qué límites se aplican.

## Del navegador a la aplicación

Al acceder a un dominio, el sistema necesita resolver su nombre para localizar un destino de red. Después se establece una conexión y, con HTTPS, se protege la comunicación mediante TLS. El servidor recibe la petición, interpreta el método y la ruta, consulta sus datos o reglas, y envía la respuesta. En la práctica pueden intervenir proxies, balanceadores y cachés; para aprender API basta con identificar cliente, servidor y mensaje.

Una respuesta de error también aporta información. `400` suele señalar una petición que el servicio no puede procesar; `401` se relaciona con falta de autenticación válida; `404` indica que el recurso no se encuentra; `500` señala un fallo del lado del servidor. Lee siempre el contrato de la API concreta: no inventes una interpretación si el servicio define detalles adicionales.

## Práctica paso a paso

1. Elige una función imaginaria de una app, como ver libros disponibles.
2. Escribe qué recurso se consulta y cuál sería un método de lectura.
3. Define la ruta, un parámetro de búsqueda y el formato que aceptarías.
4. Dibuja una respuesta normal con código de estado y dos campos de ejemplo.
5. Añade tres casos de error: entrada mal formada, usuario no autenticado y recurso inexistente.
6. Revisa si cada caso puede distinguirse por la respuesta, sin exponer información sensible.

## Comprobación y errores frecuentes

Tu contrato está claro si otra persona puede construir tanto una petición de ejemplo como una respuesta esperada sin preguntarte qué campo significa cada cosa. Si el cliente ve `404`, comprueba que usó la ruta correcta y que el recurso existe; si hay `401`, revisa credenciales y permisos; si hay un timeout, distingue un problema de conexión de una respuesta de error del servidor.

No confundas el código de estado con el contenido JSON: ambos importan. No asumas que cualquier `POST` se puede repetir sin consecuencias; una petición que crea un recurso puede duplicar la acción si se reintenta sin protección. Tampoco llames REST a cualquier API HTTP; si usas ese término, explica qué restricciones o estilo concretos quieres decir.

## Resumen

Una interacción HTTP conecta cliente y servidor mediante peticiones y respuestas. Aprende a leer método, destino, cabeceras, cuerpo y estado. La API aporta reglas particulares encima del protocolo; documentarlas y probar los errores importa tanto como el caso exitoso.
