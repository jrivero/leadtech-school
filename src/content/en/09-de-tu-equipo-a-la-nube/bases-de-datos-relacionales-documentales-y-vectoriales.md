---
title: "Relational, Document, and Vector Databases"
description: "Compare tables, JSON documents, and vectors using synthetic data; practice SQL locally and fixed-vector similarity to choose storage thoughtfully."
module: "09-de-tu-equipo-a-la-nube"
order: 3
duration: 40
level: "Intermediate"
objectives:
  - "Explain when a relational, document, or vector model is a better fit for a query."
  - "Create a table in SQLite and query synthetic data with parameters."
  - "Calculate cosine similarity for fixed vectors and interpret its limitations."
prerequisites:
  - "Know basic data types and Python functions."
  - "Be able to run commands in a terminal."
updatedDate: '2026-10-08'
sources:
  - label: "SQLite: SQL language and queries"
    url: "https://www.sqlite.org/lang.html"
  - label: "Python: sqlite3 interface in the standard library"
    url: "https://docs.python.org/3/library/sqlite3.html"
  - label: "PostgreSQL: current reference documentation"
    url: "https://www.postgresql.org/docs/current/"
---

## Three ways to organize information

A database provides rules for storing, querying, and updating information. The relational model stores entities in tables with defined columns; a library might separate books and authors and relate them using identifiers. Keys, constraints, and transactions help preserve consistency; SQL filters, sorts, and joins rows. SQLite includes a SQL engine usable from Python; PostgreSQL works as a shared server.

A document database organizes records as documents, often JSON objects with nested fields. It can fit records whose attributes vary, such as products with different specifications. Even so, those fields need validation, indexing, and updates. Some relational databases support JSON, but the choice depends on the queries, transactions, and operations required; storing JSON does not by itself turn a table into another kind of database.

A vector database stores numeric vectors and searches for neighbors by distance or similarity. Here, the values are invented, not embeddings or semantic signals. In production, retain text, IDs, and metadata: the vector does not explain why a result is relevant. Approximate search speeds up large collections, but requires evaluating parameters and indexes.

The models can coexist: a table can store authors and permissions, a document can hold flexible metadata, and a vector index can retrieve related passages. Do not choose based on a trend; start from the questions the product must answer, the changes it allows, expected volume, and requirements for consistency, backups, and access. Real personal data would also require privacy, retention, and authorization controls; this lab uses fictional names only.

## Local activity

1. Open a terminal with Python 3 and paste the block; `json` and `math` are in its standard library. `sqlite3` is usually included, but some distributions omit it; do not install anything if it is missing. `:memory:` creates a temporary database that disappears when the process closes.
2. The SQL creates a small table and adds two fictional books. The query uses `?` as a parameter instead of concatenating text, a habit that prevents treating a user value as part of SQL code.
3. The JSON object represents a document-style record. Then the function compares two fixed vectors using cosine similarity: the dot product divided by the product of their lengths.

```sh
python3 - <<'PY'
import json
import sqlite3
from math import sqrt

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE libros (id INTEGER PRIMARY KEY, titulo TEXT NOT NULL, tema TEXT NOT NULL)")
db.executemany(
    "INSERT INTO libros (id, titulo, tema) VALUES (?, ?, ?)",
    [(1, "Bosque pequeño", "naturaleza"), (2, "Cielo mecánico", "ciencia")],
)
print(db.execute("SELECT id, titulo FROM libros WHERE tema = ?", ("ciencia",)).fetchall())

ficha = json.loads('{"id":"nota-01","tema":"naturaleza","texto":"Árboles y ríos"}')
print(ficha["tema"])

consulta = (1.0, 0.0)
vectores = {"bosque": (0.9, 0.1), "máquina": (0.0, 1.0)}
def coseno(a, b):
    if len(a) != len(b):
        raise ValueError("Las dimensiones deben coincidir")
    norma_a = sqrt(sum(x * x for x in a))
    norma_b = sqrt(sum(x * x for x in b))
    if norma_a == 0 or norma_b == 0:
        raise ValueError("No se admiten vectores nulos")
    return sum(x * y for x, y in zip(a, b)) / (norma_a * norma_b)

mejor = max(vectores, key=lambda nombre: coseno(consulta, vectores[nombre]))
print(mejor, round(coseno(consulta, vectores[mejor]), 3))
db.close()
PY
```


## Verification and outcome

The first line should be `[(2, 'Cielo mecánico')]`: the condition selects only the book whose subject is science. Then `naturaleza` appears, read from the document, and finally `bosque 0.994`, the vector most similar to the invented query. The result does not mean the title is semantically correct: with two dimensions and hand-designed values, you are only checking the arithmetic and ranking. When the in-memory SQLite connection closes, the tables cease to exist.

## Common errors and solutions

If the query returns no rows, check the exact value of `tema` and confirm that `executemany` inserted data before the `SELECT`. Do not remove the `?` markers to concatenate inputs; keep parameters and values separate. A JSON error usually means a missing double quote or misplaced comma in the test text. Similarity fails if vectors have different lengths or a zero norm; the code checks both conditions because division by zero does not define a valid comparison. Do not interpret cosine similarity as a probability or use these fixed vectors as a substitute for an embedding model. If you need persistent data, deliberately change the connection and consider backups and privacy; do not do that in this exercise.

## Summary

Tables emphasize relationships, constraints, and structured queries; documents group flexible attributes; vector databases prioritize numeric neighbors for similarity-based retrieval. These models have different trade-offs and can coexist. SQLite lets you practice SQL without a server or extra installation; JSON and similarity are illustrated with local synthetic fixtures. Before choosing a technology, identify queries, consistency, volume, security, and maintenance needs. A vector search requires validating the embedding model and the relevance of its results, not just showing the nearest neighbor.
