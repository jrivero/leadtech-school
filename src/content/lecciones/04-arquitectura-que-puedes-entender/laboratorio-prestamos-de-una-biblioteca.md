---
title: "Laboratorio: préstamos de una biblioteca"
description: "Resuelve un préstamo de biblioteca con reglas explícitas, un caso de uso pequeño y pruebas que cubren disponibilidad, socio y límites."
module: "04-arquitectura-que-puedes-entender"
order: 2
duration: 60
level: "Intermedio"
objectives:
  - "Modelar el resultado de un préstamo con fecha de vencimiento."
  - "Implementar reglas de préstamo independientes de una interfaz o base de datos."
  - "Comprobar aceptación, rechazo y cálculo de fecha con casos reproducibles."
prerequisites:
  - "Clean Architecture desde cero y comprensión de funciones"
updatedDate: "2026-10-08"
sources:
  - label: "Python: dataclasses"
    url: "https://docs.python.org/3/library/dataclasses.html"
  - label: "Python: tipos básicos de fecha y timedelta"
    url: "https://docs.python.org/3/library/datetime.html"
---

## Alcance del laboratorio

Vamos a implementar solo la regla de crear un préstamo, no una aplicación web ni un catálogo completo. Usaremos una política ficticia para el ejercicio: el ejemplar debe estar disponible, el socio debe estar activo, cada socio puede mantener como máximo tres préstamos activos y cada nuevo préstamo vence catorce días después de la fecha de solicitud. En un producto real, estas reglas las confirma la biblioteca; aquí son datos de entrada, no una política universal.

El caso de uso recibirá la información que necesita y devolverá un objeto préstamo. Inyectaremos la fecha actual como parámetro en lugar de leer el reloj dentro de la función. Así una prueba puede fijar el día y repetir el mismo resultado. `dataclass` nos permite representar datos de manera concisa y `timedelta` expresa una duración que se puede sumar a una fecha.

## Solución del dominio

```python
from dataclasses import dataclass
from datetime import date, timedelta


@dataclass(frozen=True)
class Prestamo:
    libro_id: str
    socio_id: str
    fecha_vencimiento: date


def crear_prestamo(libro_id, socio_id, *, libro_disponible,
                   socio_activo, prestamos_activos, hoy):
    if not socio_activo:
        raise ValueError("El socio no está activo")
    if not libro_disponible:
        raise ValueError("El ejemplar no está disponible")
    if len(prestamos_activos) >= 3:
        raise ValueError("El socio ya alcanzó el límite de préstamos")
    return Prestamo(
        libro_id=libro_id,
        socio_id=socio_id,
        fecha_vencimiento=hoy + timedelta(days=14),
    )
```

La función no accede a la base de datos ni conoce una pantalla. Los valores `libro_disponible`, `socio_activo` y `prestamos_activos` los obtendría un adaptador de repositorio; la lógica de aprobación permanece en el caso de uso. La dataclass es inmutable para evitar que se cambie por accidente la fecha después de crear el préstamo. En una aplicación completa, el adaptador también debe guardar el préstamo y manejar fallos de almacenamiento.

## Pruebas que explican la regla

Fija `hoy = date(2026, 10, 8)`. Con socio activo, ejemplar disponible y dos préstamos activos, el resultado debe tener vencimiento el 22 de octubre de 2026. Ese caso verifica tanto la decisión como la aritmética de fecha. Si las condiciones son válidas, comprueba también que se conservan los identificadores recibidos.

Después prueba los rechazos por separado: socio inactivo, ejemplar no disponible y tres préstamos activos. Cada intento debe producir `ValueError` con un mensaje que ayude a entender la regla. No pases simultáneamente dos condiciones inválidas al test, porque no sabrías cuál causó el rechazo. Añade un caso con cero préstamos para verificar el límite inferior y confirma que `hoy` no se obtiene de una variable global.

## Práctica paso a paso

1. Copia la solución en un archivo y ejecútala una vez con las entradas válidas.
2. Comprueba la fecha esperada mediante `assert prestamo.fecha_vencimiento == date(2026, 10, 22)`.
3. Escribe una prueba independiente para cada rechazo y comprueba el mensaje de error.
4. Añade una función de política o constante para el máximo de préstamos y la duración; decide si eso mejora la lectura.
5. Diseña un puerto pequeño de repositorio que permita consultar disponibilidad, estado del socio y préstamos activos.
6. Esboza un adaptador falso en memoria y describe qué debe persistirse tras aprobar la regla.

## Comprobación y errores frecuentes

El laboratorio está logrado si los casos permitidos crean un préstamo con fecha correcta y cada condición de rechazo impide crearlo. Si una fecha difiere un día, revisa si estás sumando catorce días o contando el día inicial como día uno; el requisito debe elegir una convención. Si una prueba depende de la fecha real, inyecta `hoy` para hacerla determinista.

No consultes la base de datos dentro de la lógica de la fecha. No uses una excepción genérica sin mensaje y no ocultes el motivo del rechazo. En un sistema con varios usuarios concurrentes, comprobar disponibilidad y luego guardar puede permitir que dos solicitudes tomen el mismo ejemplar; la persistencia necesita una transacción o una operación atómica para resolver esa carrera.

## Resumen

El caso de uso valida entradas conocidas, aplica límites y devuelve un préstamo calculado con una fecha controlable. Las pruebas hacen explícita la política. Repositorios, transacciones e interfaz quedan en los bordes, donde pueden cambiar sin esconder la regla central.
