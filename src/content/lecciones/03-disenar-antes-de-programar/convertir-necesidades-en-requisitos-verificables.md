---
title: "Convertir necesidades en requisitos verificables"
description: "Traduce necesidades de personas usuarias en requisitos claros, priorizados y verificables mediante ejemplos y criterios de aceptación."
module: "03-disenar-antes-de-programar"
order: 2
duration: 40
level: "Inicial"
objectives:
  - "Distinguir necesidades, requisitos funcionales y atributos de calidad."
  - "Redactar requisitos específicos que puedan verificarse con evidencia."
  - "Convertir requisitos en criterios de aceptación y casos de prueba."
prerequisites:
  - "Conocer el ciclo básico de construir y comprobar software"
updatedDate: "2026-10-08"
sources:
  - label: "NASA Systems Engineering Handbook: requisitos y verificación"
    url: "https://www.nasa.gov/wp-content/uploads/2018/09/nasa_systems_engineering_handbook_0.pdf"
  - label: "NASA Handbook: apéndice de requisitos y matriz de verificación"
    url: "https://www.nasa.gov/reference/system-engineering-handbook-appendix/"
---

## De una necesidad a una condición comprobable

Una necesidad expresa un resultado que alguien quiere conseguir. Un requisito traduce esa necesidad en una obligación, restricción o cualidad que el producto debe cumplir. «Quiero que sea fácil» comunica una preocupación real, pero no basta para implementar ni probar. Hay que preguntar qué tarea realiza la persona, qué obstáculo encuentra y qué evidencia le demostraría que el problema está resuelto.

Los requisitos funcionales describen comportamientos: «La persona puede marcar una tarea como terminada». Los requisitos de calidad describen propiedades como accesibilidad, disponibilidad, rendimiento o privacidad. También puede haber restricciones: una política del equipo, una tecnología ya adoptada o una fecha acordada. No todas las restricciones son necesidades de usuario; conviene nombrar su origen y evitar presentar una decisión técnica como si fuera el problema.

## Ejemplo: pedir un préstamo de biblioteca

Una regla inicial podría decir: «Un socio activo puede solicitar un libro disponible si tiene menos de tres préstamos activos; el nuevo préstamo vence catorce días después». Para que pueda verificarse, acuerda qué significa «activo», cómo se cuentan préstamos y qué fecha se usa. Si esos conceptos no están definidos, dos personas podrían implementar resultados distintos y ambas creer que cumplieron.

Escribe criterios de aceptación con contexto, acción y resultado:

- **Dado** un socio activo con dos préstamos y un libro disponible, **cuando** solicita ese libro el 8 de octubre, **entonces** se registra el préstamo con vencimiento el 22 de octubre.
- **Dado** un socio con tres préstamos activos, **cuando** solicita otro, **entonces** no se crea el préstamo y se informa por qué.
- **Dado** un socio inactivo, **cuando** intenta solicitarlo, **entonces** la solicitud se rechaza aunque el libro esté disponible.

El ejemplo de fecha evita ambigüedad sobre si se cuenta el día actual. Los casos negativos son tan importantes como el camino permitido: muestran qué límite debe mantenerse y ayudan a detectar errores de autorización o conteo.

## Verificar no es lo mismo que validar

Verificar pregunta «¿construimos el producto según los requisitos?». Una prueba automatizada puede comprobar el límite de tres préstamos. Validar pregunta «¿el producto resuelve la necesidad correcta?». Una conversación o una prueba con una persona bibliotecaria podría revelar que hace falta reservar ejemplares, algo que todavía no estaba en la especificación.

Para cada requisito, anota un identificador, su origen, prioridad, criterio de aceptación y método de verificación. La matriz ayuda a no perder requisitos y a detectar reglas que no tienen prueba. No elijas números arbitrarios para propiedades de calidad: «responder en menos de dos segundos» requiere contexto, carga y acuerdo con quienes usarán el sistema.

## Práctica paso a paso

1. Escoge una operación pequeña del gestor de tareas, por ejemplo completar una tarea.
2. Escribe la necesidad en palabras de una persona usuaria.
3. Formula un requisito con un sujeto claro, una acción y una condición verificable.
4. Añade un caso permitido, uno rechazado y un límite como lista vacía o tarea ya completada.
5. Asocia cada caso a una prueba manual o automatizada y especifica qué evidencia guardarás.
6. Pide a otra persona que interprete la regla sin explicaciones adicionales; anota las dudas que aparezcan.

## Comprobación y errores frecuentes

Un requisito está listo para diseñar si tiene un origen, describe una sola idea, evita palabras vagas o las define, y se puede comprobar mediante observación, análisis o prueba. «Debe ser seguro» necesita descomponerse en amenazas y comportamientos; no se verifica con un test único. «Debe usar una tabla llamada prestamos» puede ser un detalle de diseño, salvo que exista una restricción que lo justifique.

No uses «y» para acumular varias obligaciones en una frase difícil de revisar. No olvides requisitos negativos, permisos y errores. Tampoco asumas que un criterio pasa a ser cierto solo porque el equipo lo escribió: revísalo con quien conoce la necesidad y actualízalo si la comprensión cambia.

## Resumen

Una necesidad explica por qué; un requisito precisa qué debe cumplirse; un criterio de aceptación describe evidencia concreta. Aclara vocabulario, casos límite, origen y prioridad. Verifica la implementación y valida con las personas que el resultado sigue siendo el que necesitan.
