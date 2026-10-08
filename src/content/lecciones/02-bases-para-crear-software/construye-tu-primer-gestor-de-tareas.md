---
title: "Construye tu primer gestor de tareas"
description: "Construye un gestor de tareas de consola con alta, listado y finalización, y comprueba sus casos normales y límites antes de ampliarlo."
module: "02-bases-para-crear-software"
order: 7
duration: 50
level: "Inicial"
objectives:
  - "Representar una tarea con título y estado usando estructuras de Python."
  - "Implementar acciones para añadir, mostrar y completar tareas."
  - "Verificar entradas vacías, índices válidos y límites del menú."
prerequisites:
  - "Conocer listas, diccionarios, funciones, condiciones y bucles"
updatedDate: "2026-10-08"
sources:
  - label: "Tutorial oficial de Python: estructuras de datos"
    url: "https://docs.python.org/3/tutorial/datastructures.html"
  - label: "Documentación oficial de Python: JSON"
    url: "https://docs.python.org/3/library/json.html"
---

## Define primero qué debe hacer

Un gestor de tareas inicial puede resolver tres necesidades: añadir un título, mostrar las tareas y marcar una como terminada. No vamos a añadir cuentas, sincronización ni base de datos; mantener el alcance pequeño hace posible entender cada pieza. La tarea tendrá dos datos: `titulo`, que es texto, y `hecha`, que empieza en `False`. Una lista guardará las tareas en memoria mientras el programa esté abierto.

El siguiente programa se puede guardar como `tareas.py` y ejecutar con `python3 tareas.py` o `py tareas.py`. Escribe cada parte en orden y ejecútala antes de seguir; así podrás localizar el error en el momento en que aparezca.

```python
def agregar(tareas, titulo):
    titulo = titulo.strip()
    if not titulo:
        print("Escribe un título.")
        return
    tareas.append({"titulo": titulo, "hecha": False})


def listar(tareas):
    if not tareas:
        print("No hay tareas.")
    for numero, tarea in enumerate(tareas, start=1):
        estado = "✓" if tarea["hecha"] else " "
        print(f"{numero}. [{estado}] {tarea['titulo']}")


def completar(tareas, numero):
    if numero < 1 or numero > len(tareas):
        print("Número fuera de rango.")
        return
    tareas[numero - 1]["hecha"] = True


tareas = []
while True:
    print("1 Añadir | 2 Listar | 3 Completar | 0 Salir")
    opcion = input("> ").strip()
    if opcion == "1":
        agregar(tareas, input("Título: "))
    elif opcion == "2":
        listar(tareas)
    elif opcion == "3":
        try:
            numero = int(input("Número: "))
            completar(tareas, numero)
        except ValueError:
            print("Introduce un número entero.")
    elif opcion == "0":
        break
    else:
        print("Opción desconocida.")
```

## Lee las decisiones del ejemplo

`strip()` elimina espacios al principio y al final, así que un título compuesto por espacios se trata como vacío. `enumerate(..., start=1)` muestra números humanos empezando por uno; antes de acceder a la lista se resta uno, porque sus posiciones empiezan en cero. El bloque `try` evita que una entrada como «dos» cierre el programa al convertirla con `int`.

Las funciones reciben la lista explícitamente, de modo que pueden probarse con listas distintas. El bucle de menú es la interfaz de consola; la regla de agregar y completar vive en funciones separadas. En esta versión, los datos desaparecen al cerrar el programa. Esa limitación es intencional: primero verifica el comportamiento, y luego añade persistencia con JSON como ampliación.

## Práctica paso a paso

1. Crea el archivo y escribe solo `agregar` y `listar`; ejecuta una prueba manual con una lista creada en el intérprete.
2. Añade `completar` y confirma que seleccionar la primera tarea cambia su estado.
3. Incorpora el menú una rama cada vez: primero añadir, luego listar, completar y salir.
4. Añade dos tareas, termina una y verifica que la marca solo cambia en la seleccionada.
5. Prueba un título vacío, una opción desconocida, texto en vez de número, el número cero y un número mayor que la lista.
6. Antes de darlo por terminado, explica qué ocurre al cerrar el programa y escribe una mejora futura sin implementarla todavía.

## Criterios de comprobación y solución de fallos

El gestor cumple su alcance si añade un título no vacío, lista todas las tareas en orden, cambia solo la tarea elegida y mantiene el menú abierto después de entradas incorrectas. Si el programa se detiene al escribir letras en el número, comprueba que la conversión a `int` está dentro de `try`. Si completa la tarea equivocada, revisa la diferencia entre número visible e índice. Si no aparece la tarea recién añadida, comprueba que ambas funciones reciben la misma lista y que no reiniciaste `tareas` dentro del bucle.

Una ampliación segura es guardar la lista al salir y cargarla al comenzar. Antes de tocar JSON, define qué debe ocurrir cuando el archivo no existe o contiene datos mal formados; esos casos no deben borrar silenciosamente una lista válida. Añade persistencia solo después de que alta, listado y finalización funcionen, y vuelve a probar las mismas reglas tras cada cambio.

No añadas aún edición, fechas y usuarios: primero haz confiables estas tres acciones. Cuando guardes en JSON, trata un archivo ausente o inválido como un caso que debe manejarse y conserva una copia antes de modificar datos importantes.

## Resumen

Este proyecto conecta variables, listas, diccionarios, funciones, condiciones, bucles e interacción de consola. Lo esencial no es que tenga muchas opciones, sino que cada regla sea visible y puedas demostrarla con casos normales y de error.
