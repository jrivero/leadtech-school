---
title: "Project: a Secure Task API"
description: "Define a local task API and compare it with OpenAPI; practice sample authentication, validation, and input limits without presenting the prototype as production-ready."
module: "11-construye-tus-proyectos"
order: 2
duration: 150
level: "Intermediate"
objectives:
  - "Design a simple contract for task endpoints using OpenAPI."
  - "Validate inputs, responses, and size limits in a local Node server."
  - "Test basic access controls and explain what would be needed before production."
prerequisites:
  - "Basic JavaScript and JSON, and familiarity with the terminal."
  - "Basic concepts of HTTP methods and headers."
updatedDate: '2026-10-08'
sources:
  - label: "OpenAPI Specification"
    url: "https://spec.openapis.org/oas/"
  - label: "Node.js — HTTP module"
    url: "https://nodejs.org/api/http.html"
  - label: "OWASP API Security Top 10 (2023)"
    url: "https://api-security.owasp.org/editions/2023/en/0x11-t10/"
---

## Project brief

A small organization wants to track tasks for a community event from different clients. Design an API that can retrieve, create, update, and delete tasks, and that rejects malformed or unauthorized requests. The goal is to practice an explicit contract and basic controls, not to claim that a short server is already secure for the Internet.

## Minimum scope

Use JavaScript and the built-in `node:http` module, with no framework or database. Keep tasks in memory and listen only on `127.0.0.1`. Each object can have `id`, `title`, and `done`. Define `GET /tasks` to list, `POST /tasks` to create with a title, `PATCH /tasks/{id}` to change only `title` or `done`, and `DELETE /tasks/{id}` to delete. Require an `Authorization: Bearer …` header with a random value stored in the `API_TOKEN` environment variable; if it is missing, the process should fail at startup or reject every request. This is a shared teaching barrier, not user identity or production-grade authentication. This assignment builds on the lesson about networks and APIs and the security lesson: first define the contract and limits, then implement them. If you use AI to generate a handler, ask it to follow the schema and produce tests for invalid cases; review the change, run the tests, and do not paste the secret into the prompt.

## Step-by-step plan

1. **Specify first.** Create an OpenAPI contract with the four methods, allowed fields, types, responses, and error examples. Include `400` for invalid JSON or data, `401` for a missing or incorrect token, `404` for an unknown task, and `413` if the body exceeds the selected maximum, such as 16 KiB.
2. **Implement the server.** Create `server.mjs`, import `createServer` from `node:http`, and separate URL reading, token checking, body parsing, and sending JSON responses. Because the HTTP module is low-level, you will need to count received bytes and stop reading when the limit is exceeded; do not rely only on `Content-Length`.
3. **Validate with an allowlist.** For creation, accept only a text `title` that is trimmed, non-empty, and at most 120 characters. For updates, allow only `title` and `done`, with correct types; do not copy the entire received object without filtering it. Generate the ID on the server. Return clear errors without internal traces.
4. **Test normal and adversarial cases.** Run `node server.mjs` with `API_TOKEN` set in the terminal. From another terminal, request `http://127.0.0.1:3000/tasks` with `curl -i` and the Bearer header. Repeat without a token, with broken JSON, an empty title, an unexpected property, an invented ID, and an oversized body. Each response should match the contract.

## Deliverables and acceptance

Submit `openapi.yaml`, `server.mjs`, tests using the built-in `node:test` module, and a README with local instructions and known limitations. The project is accepted if all four operations return the expected status code and JSON; an unauthorized request cannot read or modify data; only allowed fields are stored; invalid inputs and large bodies are rejected; and the server does not listen on public interfaces. Check that the contract describes what the tests run, not just what you would like to implement.

## Suggested solution and common errors

Centralize a function that sets the HTTP status code, `Content-Type: application/json; charset=utf-8`, and a consistent response. Check the token before resolving operations on tasks. For an update, create a new object by copying only allowed properties. Review OWASP API1 (object-level authorization), API2 (authentication), API3 (properties), and API4 (resource consumption): this prototype illustrates only some controls and does not replace risk analysis.

Common mistakes include listening on every interface for convenience; accepting every submitted property; parsing an unbounded body; returning a stack trace; or thinking a static token protects multiple users. In-memory data is lost on restart, and there is no individual task ownership, TLS, secret rotation, rate limiting, or monitoring. Do not publish this service or use real data. Production requires identity design and object-level authorization, secure storage, encrypted transport, operational limits, review, and additional security testing.
