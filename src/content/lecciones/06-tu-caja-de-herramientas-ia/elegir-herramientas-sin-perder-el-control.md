---
title: "Elegir herramientas sin perder el control"
description: "Elige una herramienta de IA según la tarea, los datos y los permisos; prueba un caso pequeño y conserva una forma clara de revisar y detenerla."
module: "06-tu-caja-de-herramientas-ia"
order: 1
duration: 25
level: "Inicial"
objectives:
  - "Definir el problema antes de comparar asistentes, editores y automatizaciones."
  - "Revisar datos, permisos, autonomía y condiciones actuales de una herramienta."
  - "Diseñar una prueba pequeña que permita aceptar, corregir o descartar una opción."
prerequisites:
  - "privacidad-sesgos-y-uso-responsable"
updatedDate: '2026-10-08'
sources:
  - label: "NIST: AI Risk Management Framework"
    url: "https://www.nist.gov/itl/ai-risk-management-framework"
  - label: "OECD: definición de sistema de IA"
    url: "https://www.oecd.org/en/publications/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system_623da898-en.html"
---

## Idea central — explicación conceptual

La mejor herramienta no es la que tiene más funciones, sino la que resuelve una tarea concreta con riesgos que puedas gestionar. Antes de abrir un catálogo, describe la entrada, el resultado deseado, quién lo revisará y qué ocurrirá si se equivoca. «Ayúdame con IA» es demasiado amplio; «clasifica cinco preguntas inventadas en tres categorías y marca las dudosas» se puede probar.

Compara al menos cinco dimensiones. **Ajuste**: ¿la herramienta está diseñada para redactar, programar, diseñar o automatizar? **Datos**: ¿qué enviarías y qué dice su documentación actual sobre tratamiento y retención? **Permisos**: ¿puede leer archivos, cambiar código, ejecutar acciones o comunicarse fuera del equipo? **Revisión**: ¿puedes ver las fuentes, cambios y resultados antes de usarlos? **Dependencia**: ¿puedes exportar el trabajo o cambiar de proveedor? Una respuesta afirmativa a una pregunta no sustituye las demás.

Las funciones y condiciones cambian. Un nombre conocido no informa qué modelo hay detrás, si una capacidad está habilitada en una cuenta o si una organización ha restringido su uso. Consulta documentación oficial, versión o fecha visible y política interna antes de utilizar datos reales. No confundas «ejecutar en mi equipo» con «sin riesgos»: puede haber extensiones, servicios remotos, registros o archivos que se compartan de otra forma.

Empieza con la intervención mínima. Si una regla normal resuelve la tarea de forma transparente, quizá no necesites generación. Si el modelo propone una respuesta, limita el primer experimento a un borrador que una persona apruebe. Cuantas más acciones pueda realizar el sistema, mayor debe ser la atención a permisos, reversibilidad y supervisión.

## Ejemplo concreto

Una asociación pequeña quiere contestar preguntas frecuentes sobre un club de lectura. Podría elegir un asistente de texto para redactar respuestas usando un horario ficticio, un documento local para guardar preguntas o una automatización con acceso al correo. Para aprender, basta probar la redacción con una guía inventada. Conectar el buzón añade permisos y consecuencias que no hacen falta para comprobar si el borrador respeta la información.

## Práctica guiada — receta

1. Escribe una tarea de bajo impacto en una frase y crea datos ficticios para probarla.
2. Anota la salida que aceptarías y dos fallos que te harían descartarla; por ejemplo, inventar una fecha o ignorar una excepción.
3. Elige dos tipos de herramienta posibles, no marcas de inmediato. Para cada una, comprueba la documentación oficial actual, el tratamiento de datos, los permisos, la forma de revisión y si puedes detener o revertir la acción.
4. Prueba la opción menos autónoma con el mismo ejemplo. No introduzcas credenciales, información personal, datos de trabajo ni claves de API.
5. Compara el resultado con tu respuesta esperada, registra errores y decide: usarla solo como borrador, repetir con mejores instrucciones o no adoptarla.
6. Si la herramienta no explica sus límites o no permite revisar lo que hará, no le otorgues más acceso para compensarlo.

## Validación y solución de problemas

Evalúa con criterios escritos antes de la prueba: exactitud, datos omitidos, claridad, tiempo de revisión y errores con consecuencias. Si falla, averigua si la causa está en la entrada, el prompt, la fuente, el modelo o la configuración. Cambia una sola variable y repite. Mantén una persona responsable de la decisión final, en especial cuando el resultado afecte a terceros.

## Errores frecuentes

- Elegir una aplicación por popularidad o por una demostración llamativa.
- Pegar información confidencial para descubrir después que no era el entorno autorizado.
- Conceder permisos de escritura, terminal o correo cuando bastaba una respuesta de texto.
- Suponer que el nombre de una función garantiza su disponibilidad o privacidad.
- Medir solo cuánto tarda la generación e ignorar el tiempo humano de revisión y corrección.

## En resumen

Describe primero la tarea; después compara datos, permisos, reversibilidad y evidencia. Haz una prueba ficticia, limita la autonomía y establece una condición para detenerte. Una herramienta queda justificada cuando mejora un trabajo medible sin ocultar quién responde por el resultado.
