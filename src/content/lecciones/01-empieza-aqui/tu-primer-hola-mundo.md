---
title: "Tu primer hola mundo"
description: "Escribe, ejecuta y modifica un programa mínimo para entender qué hace el código, dónde aparece su salida y cómo comprobar que tu primera prueba funciona."
module: "01-empieza-aqui"
order: 1
duration: 25
level: "Inicial"
objectives:
  - "Explicar qué es un programa y distinguir código de salida."
  - "Ejecutar un archivo Python desde una terminal o editor."
  - "Modificar un ejemplo y comprobar el resultado."
prerequisites: []
updatedDate: "2026-10-08"
sources:
  - label: "Tutorial oficial de Python: introducción informal"
    url: "https://docs.python.org/3/tutorial/introduction.html"
---

## La idea de un primer programa

Un programa es una secuencia de instrucciones que una computadora interpreta o ejecuta para producir un resultado. No necesitas comprender todavía todo el lenguaje: tu primera meta es recorrer el ciclo completo de trabajo. Escribes una instrucción, la guardas, la ejecutas, observas qué ocurrió y comparas el resultado con lo que esperabas. Ese ciclo, repetido muchas veces, es el trabajo cotidiano de programar.

Usaremos Python porque su sintaxis permite ver con claridad la instrucción. En una instalación local, un archivo termina normalmente en `.py`. Puedes editarlo con cualquier editor de texto; un editor de código añade ayudas como resaltado y detección de errores, pero no cambia el significado del programa.

## Ejemplo guiado

Crea un archivo llamado `hola.py` y escribe exactamente esto:

```python
print("¡Hola, mundo!")
```

Guarda el archivo. Abre una terminal en la carpeta que lo contiene y ejecuta `python3 hola.py`; en algunos equipos el comando se llama `python hola.py` o `py hola.py`. El resultado esperado es una línea con `¡Hola, mundo!`. `print` solicita mostrar un valor; los paréntesis agrupan lo que se entrega a la función y las comillas delimitan un texto. La salida aparece en la terminal, no se guarda automáticamente dentro del archivo.

Ahora personaliza el ejemplo:

```python
nombre = "Lucía"
print(f"¡Hola, {nombre}!")
```

La primera línea asigna un texto a un nombre, llamado variable. La segunda construye otro texto usando ese valor. Cambia `Lucía` por tu nombre, guarda y ejecuta de nuevo. Antes de ejecutarlo, predice qué aparecerá: anticipar el resultado es una manera sencilla de comprobar si entiendes cada cambio.

## Práctica paso a paso

1. Crea la carpeta `primer-programa` y dentro guarda `hola.py`. Observa que el nombre del archivo y el nombre de la carpeta son cosas distintas.
2. Ejecuta el ejemplo original y copia el resultado esperado en una nota.
3. Cambia el saludo para que tenga dos líneas, usando dos llamadas a `print`.
4. Añade una variable `objetivo` con un tema que quieras aprender y muestra una frase que lo incluya.
5. Cambia deliberadamente una letra de `print`, ejecuta y lee el mensaje de error. Luego restaura la escritura correcta.
6. Describe con tus palabras qué escribiste, qué ejecutaste y qué resultado viste. Esa explicación vale más que memorizar la línea.

## Comprobación y solución de problemas

El ejercicio está completo si puedes ejecutar el archivo dos veces, cambiar el texto sin ayuda y explicar por qué aparece el saludo. Si el terminal dice que no encuentra el archivo, comprueba la carpeta actual con `pwd` en macOS/Linux o `cd` en Windows, y lista su contenido con `ls` o `dir`. Si indica que `python3` no existe, el intérprete puede no estar instalado o usar otro nombre; prueba `python --version` o `py --version` y consulta la instalación de Python antes de seguir.

Un error `SyntaxError` suele señalar una comilla, paréntesis o carácter mal escrito. Revisa la línea indicada y también la anterior: el lugar que muestra el intérprete es una pista, no siempre el origen exacto. Si no aparece nada, confirma que guardaste el archivo correcto y que contiene una llamada a `print`.

## Errores frecuentes

No confundas escribir código con ejecutarlo: guardar solo actualiza el archivo. Tampoco cambies varias cosas a la vez al principio; si el resultado varía, será difícil saber qué modificación lo causó. Respeta mayúsculas y minúsculas: `print` y `Print` son nombres diferentes. No pegues comillas tipográficas como `“ ”` en lugar de comillas rectas; Python espera la puntuación del lenguaje.

## Resumen

Has creado un archivo, ejecutado una instrucción y comparado el resultado con una predicción. Ese pequeño método —cambio pequeño, ejecución, observación y explicación— te servirá para todos los temas siguientes. El siguiente paso no es escribir mucho, sino conseguir que una idea pequeña funcione y entender por qué.
