---
title: "Tu entorno: terminal, Git y editor"
description: "Reconoce las piezas de un entorno de trabajo y practica comandos seguros, edición y control de versiones sin confundir Git con el proyecto entero."
module: "02-bases-para-crear-software"
order: 2
duration: 40
level: "Inicial"
objectives:
  - "Distinguir terminal, carpeta de trabajo, editor e intérprete."
  - "Navegar por carpetas y ejecutar un archivo con comandos básicos."
  - "Explicar qué registran Git, el área de preparación y una confirmación."
prerequisites:
  - "Haber ejecutado un archivo Python"
updatedDate: "2026-10-08"
sources:
  - label: "Pro Git: control de versiones y registro de cambios"
    url: "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control.html"
  - label: "Visual Studio Code: primeros pasos"
    url: "https://code.visualstudio.com/docs/getstarted/overview"
---

## Las piezas de tu mesa de trabajo

El editor sirve para leer y cambiar archivos. La terminal recibe comandos de texto y los ejecuta mediante un intérprete de comandos, llamado shell. La carpeta actual determina sobre qué archivos operan algunos comandos. Python, por su parte, ejecuta los archivos `.py`. Estas piezas pueden aparecer en ventanas distintas o integradas en un editor; entender sus funciones evita atribuir un error a la herramienta equivocada.

Un proyecto es una carpeta con archivos relacionados. Puedes abrirla en un editor como espacio de trabajo, crear un archivo y usar la terminal integrada para ejecutar el programa. Git es otra herramienta: registra cambios en el tiempo para que puedas compararlos y recuperar versiones. Git no es obligatorio para ejecutar Python, aunque resulta valioso cuando empiezas a modificar un proyecto.

## Navega sin miedo

Algunos comandos orientativos son `pwd` para mostrar la carpeta actual, `ls` en macOS/Linux o `dir` en Windows para listar su contenido, y `cd nombre-carpeta` para entrar en otra carpeta. `python3 hola.py` ejecuta el archivo si Python está instalado y el terminal está situado donde corresponde. En Windows puede ser `py hola.py`. Ejecuta primero comandos de consulta y evita copiar operaciones que borren o sobrescriban archivos sin entender su efecto.

En el editor, crea una carpeta de práctica, abre esa carpeta y añade `hola.py`. Cambia una línea, guarda y ejecuta desde la terminal. Si el archivo no aparece, verifica que el editor abrió la carpeta correcta y no solo una ventana vacía. Los nombres de carpetas y archivos forman parte de la ruta; `hola.py` dentro de `ejercicios` no es el mismo destino que `hola.py` en otra ubicación.

## Una primera vuelta con Git

En un repositorio Git, `git status` resume qué cambió. `git add hola.py` prepara el contenido concreto que quieres incluir en la próxima confirmación; no significa necesariamente «guardar para siempre». `git commit -m "Añade saludo inicial"` crea una instantánea identificable del estado preparado. El archivo puede seguir cambiando después, así que consulta otra vez `git status`.

La secuencia habitual es editar, revisar el diff, preparar cambios intencionales y confirmar con un mensaje que explique el propósito. No necesitas usar Git para terminar este ejercicio. Si la carpeta actual no es un repositorio, `git status` avisará; eso no indica que Python haya fallado. No inicialices un repositorio ni conectes una cuenta remota si no sabes por qué lo haces o si la política del proyecto no lo permite.

## Práctica paso a paso

1. Abre en el editor una carpeta nueva llamada `entorno-practica`.
2. Crea `hola.py`, guarda una instrucción `print` y ejecútala desde la terminal integrada.
3. Usa `pwd`/`ls` o `cd`/`dir` para comprobar en qué carpeta estás y qué archivos contiene.
4. Si tienes Git instalado, consulta `git status` solo en una carpeta que ya sea repositorio. Si no lo es, continúa sin Git.
5. En un repositorio de práctica propio, modifica el archivo y observa el cambio con `git diff`; después puedes prepararlo y confirmarlo si entiendes cada comando.
6. Cambia de carpeta y vuelve a ejecutar. Describe por qué la misma orden puede encontrar o no el archivo según la ubicación.

## Comprobación y errores frecuentes

La práctica está lograda si puedes explicar qué herramienta edita, cuál ejecuta, dónde busca el archivo y qué hace una confirmación de Git. «No such file» o «file not found» suele apuntar a una ruta equivocada; revisa la carpeta actual antes de renombrar archivos al azar. Si `python` no se reconoce, comprueba el nombre del comando y la instalación. Si Git avisa que no estás en un repositorio, no intentes arreglarlo con comandos destructivos: el repositorio es opcional.

No escribas comandos sensibles que encuentres en una respuesta automática sin leerlos. Un comando puede eliminar archivos aunque su aspecto parezca rutinario. Aprende primero a distinguir las opciones de lectura de las que modifican el disco; cuando dudes, consulta la documentación o pide una explicación concreta.

## Resumen

Editor, terminal, intérprete y Git cumplen funciones distintas. Practica en una carpeta propia, comprueba siempre tu ubicación y usa Git para conservar cambios cuando el proyecto lo requiera. Un entorno claro reduce errores, pero no necesitas configurar todas las herramientas para aprender.
