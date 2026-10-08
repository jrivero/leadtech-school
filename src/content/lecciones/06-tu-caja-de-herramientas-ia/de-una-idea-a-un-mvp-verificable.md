---
title: "De una idea a un MVP verificable"
description: "Reduce una idea a un recorrido útil, define criterios de aceptación y evalúa un prototipo mínimo con ejemplos antes de sumar más funciones."
module: "06-tu-caja-de-herramientas-ia"
order: 9
duration: 35
level: "Inicial"
objectives:
  - "Convertir una idea amplia en una hipótesis de usuario y un recorrido mínimo."
  - "Escribir criterios de aceptación observables antes de pedir ayuda a una herramienta."
  - "Probar un MVP con casos ficticios y decidir qué corregir, mantener o descartar."
prerequisites:
  - "elegir-herramientas-sin-perder-el-control"
  - "prototipar-interfaces-con-ayuda-de-ia"
updatedDate: '2026-10-08'
sources:
  - label: "GitHub Docs: explorar pull requests con Copilot"
    url: "https://docs.github.com/en/copilot/tutorials/explore-pull-requests"
  - label: "NIST: AI Risk Management Framework"
    url: "https://www.nist.gov/itl/ai-risk-management-framework"
---

## Idea central — explicación conceptual

Un **producto mínimo viable** (MVP) es una forma pequeña de comprobar una hipótesis importante con usuarios o con una prueba representativa. «Mínimo» significa reducir el alcance, no bajar el cuidado. El primer prototipo no necesita cuentas, integraciones, automatización ni una base de datos si todavía estás comprobando si una tarea tiene sentido. Cada pieza adicional aumenta lo que debes revisar y mantener.

Empieza por una persona, una necesidad y un resultado. Formula una hipótesis: «Una persona que organiza un club necesita encontrar en menos de un minuto la fecha y el lugar de la siguiente reunión». Después define el recorrido más corto que permite comprobarla. Un MVP puede ser una página estática con tres reuniones ficticias y un filtro; no hace falta enviar notificaciones ni recopilar datos personales.

La IA puede sugerir requisitos, texto de interfaz, casos de prueba o un primer borrador de código. Es una ayuda para explorar opciones, no evidencia de que alguien necesita el producto. Antes de pedir una implementación, anota qué debe ocurrir y qué queda fuera. Un criterio verificable evita que el asistente amplíe la idea, invente características o cambie la meta para declarar éxito.

Define también cómo vas a decidir. Si el prototipo es para aprendizaje, evalúalo con datos inventados y casos claros. Si afecta a personas reales, necesitas permisos, protección de datos y un proceso adecuado para observar y gestionar fallos. No uses una prueba interna pequeña para afirmar que el producto funciona para todo el mundo. La retroalimentación debe vincularse a la hipótesis, no solo al gusto personal por el diseño.

## Ejemplo concreto

Una idea amplia dice: «Crear una app con IA para eventos». La reduces a: «Ayudar a un miembro de un club a encontrar el próximo evento». El MVP muestra nombre, fecha, lugar y plazas ficticias; una persona puede buscar por título. Fuera de alcance quedan recomendaciones personalizadas, pagos, cuentas y mensajes automáticos. El éxito del prototipo es que una persona localice el evento correcto y pueda explicar qué información le falta.

## Práctica guiada — receta

1. Escribe la idea en una frase y añade quién tiene el problema y qué resultado desea.
2. Define una hipótesis comprobable y elige un único recorrido esencial. Anota al menos tres funciones que deliberadamente no construirás.
3. Escribe criterios de aceptación antes de usar una herramienta: qué debe aparecer, qué acción funciona y qué debe ocurrir con una entrada vacía o no encontrada.
4. Pide a un asistente que proponga un plan para un prototipo de una pantalla. Rechaza dependencias, registro de usuarios, APIs, claves o servicios externos si no son necesarios para la hipótesis.
5. Construye una versión local o un boceto con datos ficticios. Prueba tres casos: el recorrido correcto, un dato ausente y una búsqueda sin coincidencias.
6. Registra qué cumplió, qué falló y qué decisión tomarías. El objetivo no es afirmar que ya tienes un negocio viable, sino descubrir la siguiente pregunta útil.

## Validación y solución de problemas

Mide cada criterio como cumple, no cumple o no se pudo probar. Si la persona no encuentra el dato, observa dónde se detiene en vez de pedirle que adivine. Si un asistente añade funciones, vuelve a la hipótesis y elimínalas del alcance. Si la prueba pasa solo con un ejemplo perfecto, prepara un caso distinto antes de darla por válida. Guarda los límites y la fecha del ejercicio junto a la conclusión.

## Errores frecuentes

- Llamar MVP a una aplicación grande a la que todavía le faltan pruebas.
- Empezar por el modelo o el framework en vez de la necesidad que se quiere comprobar.
- Aceptar código generado sin criterios escritos ni datos de prueba.
- Recoger datos reales de usuarios cuando bastaban entradas ficticias.
- Interpretar que una demo funciona como prueba de adopción o de impacto.

## En resumen

Un MVP reduce el alcance para probar una hipótesis, no para evitar validaciones. Define un usuario, un recorrido y criterios observables; construye solo lo imprescindible y registra límites. La IA puede acelerar borradores, pero la evidencia de utilidad viene de una prueba diseñada con cuidado.
