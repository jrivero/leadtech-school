---
title: "How Systems, Networks, and APIs Communicate"
description: "Trace a request between client and server, and identify the methods, routes, headers, responses, and common errors of an HTTP API."
module: "02-bases-para-crear-software"
order: 5
duration: 45
level: "Beginner"
objectives:
  - "Describe the request-response exchange between a client and a server."
  - "Identify an HTTP method, URI, headers, body, and status code."
  - "Distinguish the HTTP protocol from the specific rules of an API."
prerequisites:
  - "Know basic functions and data structures"
updatedDate: "2026-10-08"
sources:
  - label: "IETF RFC 9110: HTTP Semantics"
    url: "https://www.rfc-editor.org/rfc/rfc9110.html"
---

## What Happens When Two Programs Talk

A network lets programs on different computers exchange data. In a common web interaction, a client—for example, a browser or an application—sends a request to a server, which processes it and returns a response. HTTP defines the semantics of that exchange: the client expresses an intention through a method and a target resource; the response communicates a status and often a representation of the resource.

An API is an interaction contract between components. If it uses HTTP, it can specify routes, methods, data formats, permissions, and errors. HTTP alone does not require every API to follow the same design. JSON is a common body format, but other kinds of content can also be exchanged. An API is not simply “a URL” or “a database on the Internet.”

## Anatomy of a Request

Imagine an application wants to read pending tasks:

```http
GET /api/tareas?estado=pendiente HTTP/1.1
Host: ejemplo.test
Accept: application/json
```

`GET` expresses the intent to retrieve a representation. The route and query identify what is requested; `Host` identifies the server, and `Accept` communicates which format the client can process. The server might respond with `200 OK` and a JSON list. If the client sends a new task with `POST /api/tareas`, the body might contain a title and initial status; if it creates the task, a `201 Created` response would be a common choice for the API.

Methods and codes have semantics defined by HTTP, but business rules belong to each API. For example, an API may decide that a task without a title is invalid. The service documentation should say how the client authenticates, which fields are required, which statuses are returned, and what limits apply.

## From the Browser to the Application

When accessing a domain, the system needs to resolve its name to locate a network destination. A connection is then established and, with HTTPS, the communication is protected using TLS. The server receives the request, interprets the method and route, consults its data or rules, and sends the response. In practice, proxies, load balancers, and caches may be involved; to learn about APIs, it is enough to identify the client, server, and message.

An error response also provides information. `400` usually indicates a request the service cannot process; `401` is associated with a lack of valid authentication; `404` indicates that the resource was not found; `500` indicates a server-side failure. Always read the specific API contract: do not invent an interpretation if the service defines additional details.

## Step-by-Step Practice

1. Choose an imaginary feature in an app, such as viewing available books.
2. Write down which resource is requested and which method would read it.
3. Define the route, a search parameter, and the format you would accept.
4. Draw a normal response with a status code and two example fields.
5. Add three error cases: malformed input, an unauthenticated user, and a missing resource.
6. Check whether each case can be distinguished from the response without exposing sensitive information.

## Check Your Work and Common Mistakes

Your contract is clear if another person can construct both an example request and an expected response without asking what each field means. If the client receives `404`, check that it used the correct route and that the resource exists; with `401`, check credentials and permissions; with a timeout, distinguish a connection problem from an error response from the server.

Do not confuse the status code with the JSON content: both matter. Do not assume that every `POST` can be repeated without consequences; a request that creates a resource may duplicate the action if retried without protection. Do not call every HTTP API REST, either; if you use that term, explain which specific constraints or style you mean.

## Summary

An HTTP interaction connects a client and server through requests and responses. Learn to read the method, target, headers, body, and status. The API adds its own rules on top of the protocol; documenting and testing errors matters as much as testing the successful case.
