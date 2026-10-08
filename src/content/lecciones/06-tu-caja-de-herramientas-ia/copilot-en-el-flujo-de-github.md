---
title: "Copilot en el flujo de GitHub"
description: "Explora cómo Copilot puede apoyar una revisión de pull request y comprueba sus comentarios con cambios visibles, pruebas y criterio humano."
module: "06-tu-caja-de-herramientas-ia"
order: 4
duration: 30
level: "Inicial"
objectives:
  - "Ubicar la asistencia de Copilot dentro del flujo de cambios y pull requests de GitHub."
  - "Solicitar una revisión acotada y clasificar sus hallazgos como verificables o dudosos."
  - "Mantener revisión humana y pruebas antes de aprobar o integrar cambios."
prerequisites:
  - "elegir-herramientas-sin-perder-el-control"
  - "vs-code-y-github-copilot-en-la-practica"
updatedDate: '2026-10-08'
sources:
  - label: "GitHub Docs: usar Copilot para revisar código"
    url: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review"
  - label: "GitHub Docs: explorar pull requests con Copilot"
    url: "https://docs.github.com/en/copilot/tutorials/explore-pull-requests"
---

## Idea central — explicación conceptual

GitHub organiza el trabajo de código alrededor de repositorios, ramas y **pull requests**: una propuesta de cambios que otras personas pueden inspeccionar antes de integrarla. GitHub Copilot incluye funciones de asistencia en algunos puntos de ese flujo, entre ellas resúmenes y revisiones de código cuando están habilitadas. La documentación de GitHub describe cómo solicitar revisiones, pero la disponibilidad depende de la configuración vigente de la cuenta, el repositorio y la organización. Comprueba la guía actual en vez de asumir que todo proyecto tiene el mismo botón.

Una revisión asistida puede llamar la atención sobre un fragmento sospechoso o sugerir una mejora. No es una aprobación independiente ni una prueba completa de seguridad. Puede pasar por alto un defecto, sugerir un cambio que altera el requisito o señalar código correcto. El autor y las personas revisoras siguen siendo responsables de entender el cambio. No configures una integración para fusionar automáticamente una propuesta solo porque la IA no dejó comentarios.

Un buen flujo empieza con un cambio pequeño y un criterio verificable. La pull request debe explicar el propósito y cómo probarlo. La revisión automática se trata como una fuente adicional de preguntas: cada comentario se reproduce o se descarta con evidencia. Las pruebas del proyecto, revisión de permisos y comprobación del comportamiento siguen siendo necesarias aunque la interfaz resuma el cambio con seguridad.

Para practicar, utiliza un repositorio de juguete y datos sin valor. No conectes la cuenta a repositorios privados ni habilites aplicaciones con permisos más amplios de los requeridos. Si la organización restringe Copilot, respeta esa política y realiza la misma evaluación manualmente. Los comentarios y resúmenes también pueden exponer contenido del código al servicio configurado, por lo que debes revisar el tratamiento de datos permitido.

## Ejemplo concreto

Crea una función ficticia que calcula la duración de un evento. En una rama de prueba, introduce a propósito un error sencillo: un límite final exclusivo se trata como inclusivo. La pull request explica el comportamiento esperado. Pides una revisión a Copilot si la función está disponible; el experimento consiste en observar si detecta el caso límite y si explica por qué. Que no encuentre el error no significa que la función esté bien.

## Práctica guiada — receta

1. Prepara un repositorio desechable o una copia local, con una función simple, una prueba y un error deliberado que puedas revertir.
2. Anota el requisito y el resultado esperado antes de pedir revisión. Abre una pull request solo si ya sabes quién podrá verla y qué datos contiene.
3. Solicita una revisión asistida mediante la interfaz descrita en la documentación oficial actual. No le concedas permisos de escritura o fusión para esta práctica.
4. Clasifica cada comentario: bug reproducible, sugerencia de estilo, falso positivo o afirmación sin evidencia. Añade una prueba pequeña para comprobar el caso real.
5. Corrige únicamente lo que entiendas, vuelve a ejecutar las pruebas y revisa el diff completo. Pide a una persona que haga la decisión final de aprobación.

No hace falta publicar código ni conectar una organización. Si la función de revisión no está habilitada, evalúa manualmente el mismo diff y compara con la lista de requisitos; la ausencia de acceso no es un fallo del ejercicio.

## Validación y solución de problemas

La evaluación tiene tres resultados independientes: si encontró el error introducido, si sus comentarios son correctos y si las pruebas pasan tras el arreglo. Guarda evidencia reproducible. Si el comentario no identifica un archivo o condición comprobable, pídele una explicación o descártalo; no cambies código solo para silenciarlo. Si Copilot no comenta nada, añade pruebas para los casos límite que definiste.

## Errores frecuentes

- Tratar una revisión automática como aprobación formal o garantía de seguridad.
- Dar por válido un comentario sin reproducir el escenario que describe.
- Fusionar cambios o ampliar permisos automáticamente para acelerar la prueba.
- Abrir una pull request con claves, datos personales o código no autorizado.
- Medir la utilidad por el número de comentarios, no por los defectos relevantes que detecta.

## En resumen

Copilot puede añadir observaciones al flujo de GitHub, pero no reemplaza las pruebas ni la revisión humana. Limita el experimento, conserva un error reproducible y decide con evidencia. La pull request solo debe integrarse cuando una persona entiende el cambio y sus efectos.
