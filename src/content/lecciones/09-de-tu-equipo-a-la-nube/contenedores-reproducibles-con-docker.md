---
title: "Contenedores reproducibles con Docker"
description: "Construye una imagen pequeña con Docker, usuario no-root y contexto controlado; ejecútala de forma efímera solo si Docker ya está disponible."
module: "09-de-tu-equipo-a-la-nube"
order: 4
duration: 35
level: "Intermedio"
objectives:
  - "Distinguir una imagen Docker de un contenedor en ejecución."
  - "Leer un Dockerfile pequeño que limita archivos copiados y ejecuta Python sin privilegios de root."
  - "Construir y probar localmente un contenedor efímero cuando Docker ya esté disponible."
prerequisites:
  - "Poder ejecutar comandos en una terminal."
  - "Conocer la finalidad básica de una aplicación y sus archivos."
updatedDate: '2026-10-08'
sources:
  - label: "Docker Docs: cómo escribir un Dockerfile"
    url: "https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/"
  - label: "Docker Docs: referencia de Dockerfile y COPY --chown"
    url: "https://docs.docker.com/reference/dockerfile/"
  - label: "Docker Docs: contexto y .dockerignore"
    url: "https://docs.docker.com/build/concepts/context/"
  - label: "Docker Docs: comprobaciones de build"
    url: "https://docs.docker.com/reference/build-checks/"
---

## Imagen, contenedor y receta

Una imagen es un paquete de solo lectura con el sistema base, archivos y configuración que necesita un programa. Un contenedor es una instancia que usa esa imagen con aislamiento de procesos, red y sistema de archivos. No es una máquina virtual completa: comparte el kernel del equipo anfitrión. Una imagen bien controlada acerca entornos, aunque no elimina diferencias de arquitectura o configuración externa.

El `Dockerfile` describe la receta de construcción. `FROM` elige una imagen base; `WORKDIR` fija el directorio de trabajo; `COPY` incorpora archivos; `USER` cambia la identidad del proceso; y `CMD` define qué se ejecuta por defecto. Mantener pocas instrucciones y copiar solo lo necesario reduce tamaño y superficie de riesgo. Un tag como `python:3.13-slim` es cómodo para aprender, pero puede apuntar a actualizaciones posteriores; en producción se documentan actualizaciones y, cuando hace falta reproducibilidad estricta, se controla también el digest de la imagen.

El contexto de build es el conjunto de archivos que el cliente Docker envía al constructor. Ejecutar `docker build .` desde un repositorio entero puede incluir mucho más de lo esperado. No uses `COPY . .` por costumbre: podrías incluir claves, archivos `.env`, datos locales o dependencias. Practica en una carpeta vacía, crea una lista `.dockerignore` y copia explícitamente un único archivo. Los secretos no deben hornearse en la imagen mediante `ARG`, `ENV` o `COPY`; el ejemplo no necesita ninguno.

## Actividad local

Esta actividad es opcional y solo continúa si Docker CLI y un motor ya están disponibles. Ejecutar `docker version` comprueba cliente y servidor. Si no funciona, no instales nada para la lección: pasa a la explicación del Dockerfile. En una carpeta vacía de práctica, crea `app.py`, `Dockerfile` y `.dockerignore` con un editor de texto.

`app.py` contiene únicamente:

```python
print("Proceso local terminado")
```

Guarda estas instrucciones sin extensión en `Dockerfile`:

```dockerfile
FROM python:3.13-slim
WORKDIR /app
COPY --chown=10001:10001 app.py .
USER 10001:10001
CMD ["python", "app.py"]
```

`COPY --chown` asigna el archivo al usuario numérico que ejecutará el proceso. `USER` evita ejecutar como root; como el programa solo imprime texto, no necesita escribir en el directorio. La forma JSON de `CMD` transmite el comando y sus argumentos por separado. El archivo `.dockerignore` limita el contexto:

```text
.git
.env
.env.*
**/.env*
.venv
__pycache__
```

Desde esa carpeta, `docker build --check .` pide a BuildKit comprobar convenciones del Dockerfile sin producir la imagen; si tu versión no reconoce `--check`, omite este paso. Después, `docker build -t leccion-docker-local .` construye una imagen con una etiqueta local. La primera construcción puede descargar la imagen base y utilizar red, tiempo y espacio en disco; no crea por sí sola máquinas ni recursos facturables de cloud. Finalmente, `docker run --rm leccion-docker-local` crea el contenedor, ejecuta el programa y elimina ese contenedor al terminar. La imagen queda guardada localmente.

## Verificación y resultado

La salida esperada al ejecutar el contenedor es `Proceso local terminado`. Puedes inspeccionar el usuario configurado con `docker inspect --format '{{.Config.User}}' leccion-docker-local`; debe mostrar `10001:10001`. La comprobación se realiza en tu propio motor Docker y el contenedor se borra por `--rm`, aunque la imagen permanece. Para retirarla también, cuando el contenedor ya haya terminado, ejecuta `docker image rm leccion-docker-local`. No publiques la imagen ni uses credenciales reales para este laboratorio.

## Errores habituales y soluciones

`Cannot connect to the Docker daemon` indica que el cliente no alcanza un motor: verifica el estado de la instalación existente o salta la práctica; no conviertas el ejercicio en una instalación. Si Docker dice que no encuentra `app.py`, ejecutaste `docker build` desde otra carpeta o no guardaste el archivo; comprueba el directorio actual y el contexto `.`. Si `docker build --check` no existe, puede que la versión local no incluya esa función; continúa con las instrucciones si el build normal está disponible. Un fallo al obtener la imagen base suele ser de red o del registro: no cambies a una imagen desconocida ni copies secretos para resolverlo. Si aparece un error de permisos, revisa `COPY` y `USER` antes de volver a root.

## Resumen

Docker empaqueta una receta en una imagen y ejecuta contenedores a partir de ella. Para practicar de forma más segura, usa un contexto pequeño, excluye archivos sensibles, copia solo lo necesario, elige un usuario no-root y elimina el contenedor con `--rm`. El build puede descargar la base, pero la prueba descrita permanece local y no aprovisiona cloud. Si Docker no está ya operativo, leer y razonar sobre el Dockerfile sigue siendo un resultado válido: ningún ejercicio requiere instalar software ni crear una cuenta.
