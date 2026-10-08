---
title: "Bases de datos relacionales, documentales y vectoriales"
description: "Compara tablas, documentos JSON y vectores con datos sintéticos; practica SQL local y similitud fija para elegir almacenamiento con criterio."
module: "09-de-tu-equipo-a-la-nube"
order: 3
duration: 40
level: "Intermedio"
objectives:
  - "Explicar cuándo un modelo relacional, documental o vectorial encaja mejor con una consulta."
  - "Crear una tabla en SQLite y consultar datos sintéticos con parámetros."
  - "Calcular la similitud coseno de vectores fijos e interpretar sus límites."
prerequisites:
  - "Conocer tipos básicos de datos y funciones en Python."
  - "Poder ejecutar comandos en una terminal."
updatedDate: '2026-10-08'
sources:
  - label: "SQLite: lenguaje SQL y consultas"
    url: "https://www.sqlite.org/lang.html"
  - label: "Python: interfaz sqlite3 de la biblioteca estándar"
    url: "https://docs.python.org/3/library/sqlite3.html"
  - label: "PostgreSQL: documentación de referencia actual"
    url: "https://www.postgresql.org/docs/current/"
---

## Tres formas de organizar información

Una base de datos ofrece reglas para guardar, consultar y actualizar información. El modelo relacional guarda entidades en tablas con columnas definidas; una biblioteca puede separar libros y autores y relacionarlos mediante identificadores. Claves, restricciones y transacciones ayudan a conservar coherencia; SQL filtra, ordena y combina filas. SQLite trae un motor SQL utilizable desde Python; PostgreSQL sirve como servidor compartido.

Una base documental organiza registros en documentos, a menudo objetos JSON con campos anidados. Encaja en fichas cuyos atributos varían, como productos con especificaciones distintas. Aun así, hay que validar, indexar y actualizar esos campos. Algunas bases relacionales admiten JSON, pero la elección depende de consultas, transacciones y operaciones necesarias; almacenar JSON no convierte por sí solo una tabla en otra clase de base.

Una base vectorial guarda vectores numéricos y busca vecinos según distancia o similitud. Aquí son valores inventados, no embeddings ni señales semánticas. En producción, conserva texto, ID y metadatos: el vector no explica por qué un resultado es pertinente. La búsqueda aproximada acelera colecciones grandes, aunque exige evaluar parámetros e índices.

Los modelos pueden convivir: una tabla conserva autores y permisos, un documento guarda metadatos variables y un índice vectorial recupera fragmentos relacionados. No elijas por tendencia; parte de las preguntas que el producto debe responder, los cambios que admite, el volumen esperado y los requisitos de consistencia, copia y acceso. Para datos personales reales harían falta además controles de privacidad, retención y autorización; este laboratorio usa solo nombres ficticios.

## Actividad local

1. Abre una terminal con Python 3 y pega el bloque; `json` y `math` son de su biblioteca estándar. `sqlite3` suele estar incluido, pero algunas distribuciones lo omiten; si falta, no instales nada. `:memory:` crea una base temporal que desaparece al cerrar el proceso.
2. El SQL crea una tabla pequeña y añade dos libros ficticios. La consulta usa `?` como parámetro en vez de concatenar texto, hábito que evita tratar un valor de usuario como parte del código SQL.
3. El objeto JSON representa una ficha documental. Después, la función compara dos vectores fijos con el coseno: producto punto dividido por el producto de sus longitudes.

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

## Verificación y resultado

La primera línea debe ser `[(2, 'Cielo mecánico')]`: la condición selecciona solo el libro cuyo tema es ciencia. Luego aparece `naturaleza`, leído del documento, y finalmente `bosque 0.994`, que es el vector más parecido a la consulta inventada. El resultado no significa que el título sea semánticamente correcto: con dos dimensiones y valores diseñados a mano solo compruebas la aritmética y el orden. Al cerrar SQLite en memoria, las tablas dejan de existir.

## Errores habituales y soluciones

Si la consulta no devuelve filas, revisa el valor exacto de `tema` y que `executemany` haya insertado datos antes del `SELECT`. No quites los signos `?` para concatenar entradas; mantén parámetros y valores separados. Un error JSON suele indicar comillas dobles ausentes o una coma mal puesta en el texto de prueba. La similitud falla si los vectores tienen distinta longitud o norma cero; el código comprueba ambas condiciones porque dividir por cero no define una comparación válida. No interpretes el coseno como una probabilidad ni uses estos vectores fijos como sustituto de un modelo de embeddings. Si necesitas datos persistentes, cambia deliberadamente la conexión y piensa en copias y privacidad; no lo hagas en este ejercicio.

## Resumen

Las tablas destacan relaciones, restricciones y consultas estructuradas; los documentos agrupan atributos flexibles; las bases vectoriales priorizan vecinos numéricos para recuperación por similitud. Son modelos con distintas compensaciones y pueden convivir. SQLite permite practicar SQL sin servidor ni instalación adicional; JSON y la similitud se ilustran con fixtures locales sintéticos. Antes de elegir tecnología, identifica consultas, consistencia, volumen, seguridad y mantenimiento. Una búsqueda vectorial necesita validar el modelo de embeddings y la pertinencia de sus resultados, no solo mostrar el vecino más cercano.
