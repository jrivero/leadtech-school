---
title: "Modelar un dominio con DDD"
description: "Traduce un problema de matrículas a lenguaje compartido, contextos delimitados e invariantes; modela primero las reglas antes de repartir servicios."
module: "13-talleres-para-profundizar"
order: 5
duration: 55
level: "Intermedio"
objectives:
  - "Redactar un vocabulario ubicuo y separar modelos cuando las palabras cambian de significado."
  - "Distinguir entidad, objeto de valor y agregado a partir de identidad e invariantes."
  - "Validar un modelo de dominio con escenarios de negocio antes de proponer microservicios."
prerequisites:
  - "Conocer funciones, tipos o clases y el propósito de una transacción."
  - "Poder describir un proceso de negocio con ejemplos y excepciones."
updatedDate: "2026-10-08"
sources:
  - label: "Microsoft Learn: análisis de dominio y contextos delimitados"
    url: "https://learn.microsoft.com/en-us/azure/architecture/microservices/model/domain-analysis"
  - label: "Microsoft Learn: DDD táctico, agregados y objetos de valor"
    url: "https://learn.microsoft.com/es-es/azure/architecture/microservices/model/tactical-domain-driven-design"
---

## Empieza por las reglas del negocio

El diseño guiado por el dominio (DDD) es una forma de construir un modelo de software en conversación con quienes conocen el negocio. No consiste en añadir clases llamadas `Entity` y `Repository`, ni exige crear microservicios. La parte estratégica busca descubrir subdominios y contextos delimitados; la parte táctica expresa reglas mediante conceptos como entidades, objetos de valor y agregados. Ambas partes son hipótesis que se revisan cuando cambian el lenguaje o las necesidades.

Trabajaremos con una academia ficticia que ofrece talleres. Una conversación inicial podría revelar que «catálogo» significa la lista pública de talleres, mientras que «matrícula» significa el registro de una persona, y «plaza» es una reserva que aún no implica pago. Escribe las palabras que usan las personas responsables y pregunta por un ejemplo concreto de cada una. Ese vocabulario compartido —lenguaje ubicuo— debe aparecer en requisitos, conversaciones y nombres del modelo, no solo en documentación técnica.

## Del mapa del dominio al modelo pequeño

Separa contextos cuando la misma palabra tiene reglas distintas o equipos diferentes toman decisiones independientes. Por ejemplo, el contexto de Catálogo publica descripción, fechas y requisitos; el de Matrículas acepta o rechaza solicitudes según disponibilidad; el de Facturación registra cobros y devoluciones. No fuerces una única clase `Curso` para todo: el catálogo puede hablar de un taller abierto y matrículas puede necesitar un evento fechado con capacidad. Los contextos pueden comunicarse mediante identificadores y eventos; no tienen que convertirse inmediatamente en servicios desplegados por separado.

Dentro de Matrículas, una `Matrícula` puede ser entidad porque su identidad continúa aunque cambie de estado. Una `Fecha` o un `Importe` puede ser objeto de valor si se define por sus valores y se reemplaza como conjunto, no se rastrea por identidad propia. Un agregado delimita qué datos deben mantener coherencia en una transacción. Para un ejercicio pequeño, representa `TallerProgramado` como raíz con capacidad y contador de plazas ocupadas; su operación `reservar()` comprueba el límite y actualiza el contador atómicamente. No necesita contener todas las fichas de matrícula. Si los datos de matrícula viven en otro agregado, diseña explícitamente cómo se coordinan ambas actualizaciones; no prometas una transacción global. Al crecer el dominio, revisa si el agregado sigue siendo pequeño y protege solo las invariantes que requieren coherencia inmediata.

## Actividad: modela una matrícula sin escribir código

1. Dibuja tres columnas: Catálogo, Matrículas y Facturación. Añade cinco términos por columna y escribe qué significa cada uno allí.
2. Narra una operación: «la persona solicita una plaza». Anota quién inicia la acción, qué datos necesita, qué regla decide aceptación y qué hecho observable confirma el resultado.
3. Marca conceptos con identidad estable, como `MatriculaId`, y conceptos definidos por sus valores, como `Periodo` o `Importe`. Si tienes dudas, inventa dos ejemplos iguales en atributos y pregunta si el negocio los considera la misma cosa.
4. Escribe el invariante como una frase verificable: «el número de matrículas confirmadas nunca supera la capacidad del taller». Rodea los datos que deben actualizarse juntos para preservar esa regla.
5. Especifica respuestas para capacidad cero, taller cerrado, petición duplicada y persona que ya tenía plaza. Añade un caso normal con capacidad disponible.
6. Pide a una compañera o compañero que ejecute el flujo leyendo solo tus reglas. Si interpreta una palabra de forma distinta, revisa el modelo antes de traducirlo a clases.

No hace falta crear código, una base de datos ni una nube para completar el taller. Una pizarra y escenarios inventados permiten encontrar contradicciones a coste cero. Si ya tienes un proyecto, puedes convertir cada invariante en una prueba unitaria después de validar el lenguaje con el equipo.

## Validación y señales de un modelo frágil

El modelo pasa la primera revisión si otra persona puede explicar cuándo una matrícula se confirma, qué impide superar la capacidad y cómo interactúan Matrículas y Facturación sin asumir que ambos usan las mismas reglas. Una tabla de casos con «estado inicial, acción, resultado esperado» sirve como prueba de aceptación. Por ejemplo: con capacidad uno y una plaza ocupada, una segunda solicitud no puede confirmarse. Si el ejemplo no tiene una respuesta clara, la regla aún está incompleta.

Los errores frecuentes son empezar por el esquema SQL, llamar agregado a cada tabla, dividir el sistema en microservicios antes de descubrir límites y mover toda regla a un servicio genérico. Otro riesgo es crear un contexto gigantesco con un glosario que nadie usa. DDD tampoco obliga a una arquitectura de objetos pesada: una función pequeña puede expresar perfectamente una regla sencilla. El valor está en hacer explícitos los conceptos, invariantes y decisiones de frontera.

## Cierre

Modela primero un proceso que puedas narrar. Alinea términos con quienes conocen el dominio, separa contextos por significado y responsabilidad, y usa agregados para proteger consistencia local. Si el lenguaje y las pruebas son claros, el código tiene mejores posibilidades de representar el negocio; si no, añadir patrones solo hace más difícil encontrar el desacuerdo.
