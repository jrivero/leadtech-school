---
title: "Modeling a Domain with DDD"
description: "Translate an enrollment problem into shared language, bounded contexts, and invariants; model the rules before splitting services."
module: "13-talleres-para-profundizar"
order: 5
duration: 55
level: "Intermediate"
objectives:
  - "Write a ubiquitous language and separate models when words have different meanings."
  - "Distinguish an entity, value object, and aggregate based on identity and invariants."
  - "Validate a domain model with business scenarios before proposing microservices."
prerequisites:
  - "Know functions, types or classes, and the purpose of a transaction."
  - "Be able to describe a business process with examples and exceptions."
updatedDate: "2026-10-08"
sources:
  - label: "Microsoft Learn: domain analysis and bounded contexts"
    url: "https://learn.microsoft.com/en-us/azure/architecture/microservices/model/domain-analysis"
  - label: "Microsoft Learn: tactical DDD, aggregates, and value objects"
    url: "https://learn.microsoft.com/es-es/azure/architecture/microservices/model/tactical-domain-driven-design"
---

## Start with the business rules

Domain-driven design (DDD) is a way to build a software model through conversation with people who know the business. It does not mean adding classes called `Entity` and `Repository`, nor does it require creating microservices. Strategic design seeks to discover subdomains and bounded contexts; tactical design expresses rules through concepts such as entities, value objects, and aggregates. Both are hypotheses that should be reviewed when the language or needs change.

We will work with a fictional academy that offers workshops. An initial conversation might reveal that “catalog” means the public list of workshops, while “enrollment” means a person's registration, and a “place” is a reservation that does not yet imply payment. Write down the words used by the people responsible and ask for a specific example of each. This shared vocabulary—the ubiquitous language—should appear in requirements, conversations, and model names, not only in technical documentation.

## From the domain map to a small model

Separate contexts when the same word has different rules or different teams make independent decisions. For example, the Catalog context publishes descriptions, dates, and requirements; Enrollments accepts or rejects requests based on availability; Billing records charges and refunds. Do not force one class called `Curso` (course) to represent everything: the catalog may talk about an open workshop, while enrollment may need a dated event with a capacity. Contexts can communicate through identifiers and events; they do not have to become separately deployed services immediately.

Within Enrollments, a `Matrícula` (enrollment) can be an entity because its identity continues even when its state changes. A `Fecha` (date) or `Importe` (amount) can be a value object if it is defined by its values and replaced as a whole, rather than tracked by an identity of its own. An aggregate defines which data must remain consistent within a transaction. For a small exercise, represent `TallerProgramado` (scheduled workshop) as the root with a capacity and occupied-place count; its `reservar()` (reserve) operation checks the limit and updates the counter atomically. It does not need to contain every enrollment record. If enrollment data lives in another aggregate, explicitly design how the two updates are coordinated; do not promise a global transaction. As the domain grows, review whether the aggregate is still small and protects only the invariants that require immediate consistency.

## Activity: model an enrollment without writing code

1. Draw three columns: Catalog, Enrollments, and Billing. Add five terms to each column and write what each means there.
2. Narrate an operation: “the person requests a place.” Note who starts the action, what data is needed, which rule determines acceptance, and what observable fact confirms the outcome.
3. Mark concepts with stable identity, such as `MatriculaId`, and concepts defined by their values, such as `Periodo` (period) or `Importe` (amount). If you are unsure, invent two examples with identical attributes and ask whether the business considers them the same thing.
4. Write the invariant as a verifiable sentence: “the number of confirmed enrollments never exceeds the workshop's capacity.” Circle the data that must be updated together to preserve this rule.
5. Specify responses for zero capacity, a closed workshop, a duplicate request, and a person who already has a place. Add a normal case with available capacity.
6. Ask a classmate to follow the flow using only your rules. If they interpret a word differently, review the model before translating it into classes.

You do not need code, a database, or a cloud service to complete the workshop. A whiteboard and fictional scenarios can reveal contradictions at no cost. If you already have a project, you can turn each invariant into a unit test after validating the language with the team.

## Validation and signs of a fragile model

The model passes its first review if another person can explain when an enrollment is confirmed, what prevents capacity from being exceeded, and how Enrollments and Billing interact without assuming that they use the same rules. A table of cases with “initial state, action, expected result” works as an acceptance test. For example: with a capacity of one and one place occupied, a second request cannot be confirmed. If the example has no clear answer, the rule is still incomplete.

Common mistakes include starting with the SQL schema, calling every table an aggregate, splitting the system into microservices before discovering boundaries, and moving every rule into a generic service. Another risk is creating a huge context with a glossary no one uses. DDD also does not require a heavyweight object-oriented architecture: a small function can express a simple rule perfectly well. The value is making concepts, invariants, and boundary decisions explicit.

## Wrap-up

Model a process you can narrate first. Align terms with the people who know the domain, separate contexts by meaning and responsibility, and use aggregates to protect local consistency. If the language and tests are clear, the code has a better chance of representing the business; if not, adding patterns only makes the disagreement harder to find.
