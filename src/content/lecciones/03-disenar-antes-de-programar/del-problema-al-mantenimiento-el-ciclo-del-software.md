---
title: "Del problema al mantenimiento: el ciclo del software"
description: "Entiende el trabajo de software como un ciclo de aprendizaje que abarca problema, diseño, entrega, operación y mantenimiento, con ciclos de retroalimentación."
module: "03-disenar-antes-de-programar"
order: 1
duration: 35
level: "Inicial"
objectives:
  - "Identificar actividades habituales de un ciclo de vida de software."
  - "Explicar por qué las fases pueden repetirse y retroalimentarse."
  - "Proponer evidencia para revisar un producto después de su entrega."
prerequisites:
  - "Haber construido un programa pequeño y probado su comportamiento"
updatedDate: "2026-10-08"
sources:
  - label: "NASA Software Engineering Handbook: actividades del ciclo de vida"
    url: "https://swehb.nasa.gov/spaces/SWEHBVD/pages/133235373/A.00%2BActivity%2BView"
  - label: "Agile Manifesto: valores del desarrollo de software"
    url: "https://agilemanifesto.org/iso/es/manifesto.html"
---

## El software tiene una vida más larga que su primera versión

Un producto de software comienza con una necesidad, no con una pantalla o un lenguaje. A partir de ella, un equipo explora el problema, define comportamientos, toma decisiones de diseño, implementa cambios y comprueba resultados. Después puede poner la solución a disposición de sus usuarios, observar su funcionamiento y corregirla o ampliarla. Ese conjunto de actividades se suele llamar ciclo de vida del software.

No existe una única secuencia válida para todos los proyectos. El NASA Software Engineering Handbook organiza actividades que pueden usarse con ciclos tradicionales, ágiles u otros, y señala que algunas tareas se repiten durante el proyecto. Esto es útil incluso para una aplicación pequeña: aclarar una regla puede revelar que el diseño debe cambiar; una prueba puede mostrar que el requisito era ambiguo; el uso real puede traer una necesidad que nadie anticipó.

## Ejemplo: avisar de un préstamo próximo a vencer

Supón que una biblioteca quiere enviar recordatorios. En descubrimiento, pregunta a quién se avisa, con cuánta antelación y qué canal está permitido. En requisitos, acuerda una regla verificable: «El sistema ofrece una lista de préstamos que vencen mañana». En diseño, decide cómo representar la fecha y de dónde leer préstamos. En implementación, crea una función que selecciona esos préstamos. En pruebas, comprueba una fecha anterior, la fecha exacta y una posterior.

Al entregar el cambio, el trabajo no ha acabado. Durante la operación alguien podría informar de que las fechas se desplazan por la zona horaria, o que no quiere recibir correos. El equipo investiga, ajusta la regla o el diseño y vuelve a verificar. Si se retira la función, también hay que considerar datos ya almacenados y comunicar el cambio. Mantenimiento significa conservar la utilidad y la seguridad del producto con el tiempo, no solo reparar incidentes.

## Una forma práctica de recorrer el ciclo

Para un proyecto de aprendizaje, usa estas preguntas como guía:

1. **Problema:** ¿quién necesita qué y qué hace ahora?
2. **Requisitos:** ¿qué resultado observable define el éxito y qué queda fuera?
3. **Diseño:** ¿qué datos, reglas y límites hacen falta?
4. **Construcción y prueba:** ¿cuál es el cambio más pequeño que puedo demostrar?
5. **Entrega:** ¿quién lo revisa y cómo lo recibe la persona usuaria?
6. **Operación:** ¿cómo sabré que funciona en su entorno?
7. **Mantenimiento:** ¿qué evidencia llevaría a corregir, mejorar o retirar la función?

Un ciclo iterativo repite partes de esta lista con entregas pequeñas. No significa improvisar sin plan; significa buscar retroalimentación antes de acumular decisiones costosas. Un proyecto regulado o de alto riesgo puede exigir documentos y revisiones formales más estrictas. Un ejercicio personal puede usar una nota de requisitos y tres pruebas, siempre que la evidencia corresponda al riesgo real.

## Práctica paso a paso

1. Elige una mejora concreta para el gestor de tareas, como filtrar tareas terminadas.
2. Escribe quién la necesita y qué hace hoy para resolverlo.
3. Redacta una condición que puedas observar antes y después del cambio.
4. Dibuja qué función, dato o interfaz podría participar, sin elegir aún una biblioteca.
5. Lista una prueba normal, una entrada límite y una forma de mostrar el resultado a otra persona.
6. Imagina un problema después de la entrega y anota qué dato necesitarías para investigarlo.

## Comprobación y errores frecuentes

Tu mapa es útil si conecta una necesidad con una regla, una implementación, pruebas y una forma de observar el uso. Si «terminado» solo significa que el código compila, falta comprobar si cumple la necesidad. Si el mantenimiento no aparece en el plan, el equipo quizá dependa de que nadie reporte problemas. Si nadie puede describir el usuario o el beneficio, vuelve al problema antes de añadir funciones.

No confundas ciclo de vida con una cadena rígida de fases que nunca se repiten. Tampoco copies el proceso de una organización grande para un ejercicio de una tarde. Adapta la documentación y las puertas de revisión al riesgo, pero conserva la trazabilidad básica: qué querías lograr, qué cambiaste y qué evidencia obtuviste.

## Resumen

El software pasa por exploración, requisitos, diseño, construcción, pruebas, entrega, operación y mantenimiento. Esas actividades se retroalimentan y se repiten de distinta manera según el contexto. Considera la entrega como un hito y no como el final: aprender del uso real forma parte del desarrollo.
