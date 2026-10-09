---
title: "An End-to-End Typed API with tRPC"
description: "Build a minimal router with validated input, infer types for the client, and distinguish TypeScript convenience from runtime security."
module: "13-talleres-para-profundizar"
order: 4
duration: 60
level: "Intermediate"
objectives:
  - "Explain how a client infers types exported by a tRPC router."
  - "Define query procedures and validate inputs at runtime."
  - "Identify when tRPC is appropriate and which controls remain the server's responsibility."
prerequisites:
  - "Know TypeScript, asynchronous functions, and objects."
  - "Understand data validation and the purpose of a client-server API."
updatedDate: "2026-10-08"
sources:
  - label: "tRPC official documentation: quickstart"
    url: "https://trpc.io/docs/quickstart"
  - label: "tRPC official documentation: routers"
    url: "https://trpc.io/docs/server/routers"
  - label: "tRPC official documentation: procedures"
    url: "https://trpc.io/docs/server/procedures"
---

## A shared signature, not a trust boundary

tRPC lets you describe server procedures in TypeScript and use the router's type so a compatible client knows the names, inputs, and outputs during development. This reduces manual mismatches between two API definitions. It does not turn TypeScript into network-data validation: a browser can send values other than those promised by its type. The application still needs runtime validators, authentication, authorization, limits, and error handling.

Consider a query that returns a ticket's status by identifier. An operation that only reads data should be expressed as a `query`; an operation that changes state, such as assigning the ticket, is modeled as a `mutation`. This distinction communicates intent to the client, but by itself it does not guarantee that the resolver is read-only. The code that performs the operation must honor that rule.

## Router with validated input

The following piece shows the server core for a fictional ticket. `zod` validates that the data exists before entering the resolver; the output type is inferred from the returned value. The example does not create a complete HTTP server: the adapter depends on the application's framework and must be configured separately.

```ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  ticketById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ input }) => ({ id: input.id, status: 'open' as const })),
});

export type AppRouter = typeof appRouter;
```

Exporting `AppRouter` as a type lets the client use it without importing the server's runtime code. In a real application, the client can be configured with `createTRPCClient<AppRouter>` and an HTTP link pointing to the adapter's URL. Then a call such as `client.ticketById.query({ id: 'T-17' })` provides autocomplete and compile-time errors for an incompatible name or shape. The request still crosses a network boundary; that boundary also needs testing.

## Runnable activity without installing dependencies

If you do not have a TypeScript project ready, complete the exercise in a table. Record the procedure, type, allowed input, output, authorized user, and side effect. For `ticketById`, an empty string must be rejected before the query runs. For a `closeTicket` procedure, ask whether it reads or changes data and decide which identity and permission are needed. Do not mark a column “safe because it is typed”: specify the actual control.

If you already have a tRPC project installed, adapt the small router to its existing patterns and run the repository's type checker and tests. Add cases for valid input, an empty string, an unknown identifier, no session, and a user trying to read someone else's ticket. Check a real call through the configured adapter; calling only an internal function does not validate serialization, transport, or middleware authentication.

## Validation and common errors

If the client does not receive types, check that the exported type corresponds to the final router and that the client imports `AppRouter` as a `type` from a path the compiler can access. If TypeScript accepts incorrect input in the client but the server rejects it, that may be correct: runtime server validation is authoritative. If both accept it, review the schema; do not add an `as` assertion to silence the error.

A common failure is creating multiple tRPC initializations and ending up with divergent contexts or types; the router guide recommends initializing once. Another is using a query to write to a database, which surprises clients that retry or cache reads. It is also an error to expose private procedures as `publicProcedure` without authorization middleware. The fact that a user is allowed to open the interface does not prove that they may query every identifier they send.

## When to choose it

tRPC is a good fit when client and server share TypeScript and the contract can be derived from the server code. If consumers in several languages need to discover a stable public API, consider REST with OpenAPI or another explicit contract. Choose based on the clients and the system's evolution, not the appeal of autocomplete.

## Wrap-up

A typed API shortens the distance between implementation and use, but it does not erase the protocol or its risks. Define the router once, validate every external input, separate reads from changes, and test permissions with a call that actually passes through the adapter.
