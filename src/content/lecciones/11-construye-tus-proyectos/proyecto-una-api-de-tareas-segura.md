---
title: "Proyecto: una API de tareas segura"
description: "Define una API local de tareas y contrástala con OpenAPI; practica autenticación de ejemplo, validación y límites de entrada sin presentar el prototipo como producción."
module: "11-construye-tus-proyectos"
order: 2
duration: 150
level: "Intermedio"
objectives:
  - "Diseñar un contrato sencillo para endpoints de tareas usando OpenAPI."
  - "Validar entradas, respuestas y límite de tamaño en un servidor Node local."
  - "Probar controles de acceso básicos y explicar qué faltaría antes de producción."
prerequisites:
  - "JavaScript básico, JSON y uso de la terminal."
  - "Conceptos básicos de métodos HTTP y cabeceras."
updatedDate: '2026-10-08'
sources:
  - label: "OpenAPI Specification"
    url: "https://spec.openapis.org/oas/"
  - label: "Node.js — módulo HTTP"
    url: "https://nodejs.org/api/http.html"
  - label: "OWASP API Security Top 10 (2023)"
    url: "https://api-security.owasp.org/editions/2023/en/0x11-t10/"
---

## Brief del proyecto

Una pequeña organización quiere registrar tareas de una jornada comunitaria desde distintos clientes. Diseña una API que permita consultar, crear, actualizar y borrar tareas, y que rechace peticiones mal formadas o no autorizadas. El objetivo es practicar un contrato explícito y controles básicos, no afirmar que un servidor corto ya es seguro para Internet.

## Alcance mínimo

Usa JavaScript y el módulo incluido `node:http`, sin framework ni base de datos. Guarda las tareas en memoria y escucha únicamente en `127.0.0.1`. Cada objeto puede tener `id`, `title` y `done`. Define `GET /tasks` para listar, `POST /tasks` para crear con un título, `PATCH /tasks/{id}` para cambiar solo `title` o `done`, y `DELETE /tasks/{id}` para borrar. Requiere una cabecera `Authorization: Bearer …` con un valor aleatorio guardado en la variable de entorno `API_TOKEN`; si falta, el proceso debe fallar al arrancar o rechazar toda petición. Es una barrera didáctica compartida, no identidad de usuarios ni autenticación apta para producción. Este encargo retoma la lección de redes y APIs y la de seguridad: primero fijas contrato y límites, después implementas. Si usas IA para generar un handler, pídele que respete el esquema y produzca pruebas para casos inválidos; revisa el cambio, ejecuta las pruebas y no pegues el secreto en el prompt.

## Plan paso a paso

1. **Especifica primero.** Crea un contrato OpenAPI con los cuatro métodos, los campos permitidos, tipos, respuestas y ejemplos de error. Incluye `400` para JSON o datos inválidos, `401` para token ausente o incorrecto, `404` para tarea desconocida y `413` si el cuerpo supera el máximo elegido, por ejemplo 16 KiB.
2. **Implementa el servidor.** Crea `server.mjs`, importa `createServer` desde `node:http` y separa la lectura de la URL, la comprobación del token, el parseo del cuerpo y el envío de respuestas JSON. Como el módulo HTTP es de bajo nivel, tendrás que contar los bytes recibidos y detener la lectura al superar el límite; no confíes únicamente en `Content-Length`.
3. **Valida con una lista permitida.** Para crear, acepta solo un `title` de texto recortado, no vacío y de hasta 120 caracteres. Para actualizar, permite solo `title` y `done`, con tipos correctos; no copies sin filtrar todo el objeto recibido. Usa un identificador generado por el servidor. Devuelve errores claros y sin trazas internas.
4. **Prueba casos normales y adversos.** Ejecuta `node server.mjs` con `API_TOKEN` definido en la terminal. Desde otra terminal, consulta `http://127.0.0.1:3000/tasks` con `curl -i` y la cabecera Bearer. Repite sin token, con JSON roto, título vacío, propiedad inesperada, identificador inventado y cuerpo demasiado grande. Cada respuesta debe coincidir con el contrato.

## Entregables y criterios de aceptación

Entrega `openapi.yaml`, `server.mjs`, pruebas con el módulo incorporado `node:test` y un README con instrucciones locales y límites conocidos. Acepta el proyecto si las cuatro operaciones devuelven el código y JSON previstos; una petición no autorizada no lee ni modifica datos; solo se guardan campos permitidos; se rechazan entradas inválidas y cuerpos grandes; y el servidor no escucha en interfaces públicas. Comprueba que el contrato describe lo que las pruebas ejecutan, no solo lo que te gustaría implementar.

## Solución orientativa y errores frecuentes

Centraliza una función que establezca código HTTP, `Content-Type: application/json; charset=utf-8` y respuesta consistente. Comprueba el token antes de resolver operaciones sobre tareas. En una actualización, crea un objeto nuevo copiando únicamente propiedades admitidas. Revisa OWASP API1 (autorización por objeto), API2 (autenticación), API3 (propiedades) y API4 (consumo de recursos): este prototipo solo ilustra algunos controles y no sustituye un análisis de riesgos.

Errores habituales: escuchar en todas las interfaces por comodidad; aceptar cualquier propiedad enviada; parsear un cuerpo sin límite; devolver el stack trace; o pensar que un token estático protege a varios usuarios. La memoria se pierde al reiniciar, no hay propiedad individual de tareas, TLS, rotación de secretos, limitación de peticiones ni monitorización. No publiques este servicio ni uses datos reales. Para producción hacen falta diseño de identidad y autorización por objeto, almacenamiento seguro, transporte cifrado, límites operativos, revisión y pruebas de seguridad adicionales.
