---
title: "Cobertura, complejidad y métricas útiles"
description: "Interpreta cobertura de líneas y ramas, complejidad y señales de cambio como pistas para decidir dónde probar, nunca como puntuaciones de calidad absolutas."
module: "08-calidad-que-se-demuestra"
order: 3
duration: 35
level: "Intermedio"
objectives:
  - "Diferenciar cobertura de líneas de cobertura de ramas mediante un ejemplo pequeño."
  - "Explicar qué indica una métrica de complejidad y qué no permite concluir."
  - "Priorizar una prueba adicional a partir de riesgo y comportamiento, no de un porcentaje aislado."
prerequisites:
  - "Conocer condicionales y pruebas unitarias sencillas."
  - "Saber leer un resultado esperado y uno observado."
updatedDate: '2026-10-08'
sources:
  - label: "Coverage.py: medición de cobertura de ramas"
    url: "https://coverage.readthedocs.io/en/latest/branch.html"
  - label: "Python: framework unittest"
    url: "https://docs.python.org/3/library/unittest.html"
---

## Una métrica describe una señal, no la calidad entera

La cobertura indica qué parte del código observado recorrió una ejecución de pruebas. Cobertura de líneas pregunta qué instrucciones se ejecutaron; cobertura de ramas analiza también las salidas posibles de una decisión. Una cifra alta no confirma que las aserciones sean relevantes, que se hayan probado todos los requisitos ni que no haya errores de seguridad. Una prueba puede ejecutar una función completa y no comprobar el resultado importante.

Considera una función que devuelve envío gratis si el total alcanza 50, un coste reducido si la persona tiene membresía y un coste normal en otro caso. Una sola prueba con total 80 ejecuta el camino de envío gratis, pero no comprueba las condiciones restantes. Para observar las ramas, necesitamos casos justo en el umbral, debajo con membresía y debajo sin ella. El número exacto que informe una herramienta depende de cómo mida y presente decisiones y condiciones; lee su definición antes de comparar porcentajes.

La complejidad ciclomática u otras medidas de complejidad estática aproximan aspectos como cantidad de caminos o estructuras. Sirven para detectar funciones que quizá sean difíciles de comprender y priorizar revisión, no para concluir automáticamente que todo valor por encima de un umbral deba dividirse. Una función larga puede ser lineal y clara; una función breve puede esconder un caso crítico. Combina la señal con el cambio reciente, la frecuencia de fallos, el impacto y la dificultad de probarlo.

Una métrica se vuelve peligrosa cuando se transforma en objetivo único. Si un equipo persigue “100 % de cobertura”, puede añadir aserciones vacías o tests que repiten implementación; si persigue menos líneas, puede comprimir lógica en una sola expresión difícil de revisar. Presenta tendencia y contexto junto al número: qué carpeta mide, si cambió el alcance, qué caminos importantes faltan y qué decisión se tomó a partir de la lectura.

## Ejemplo de ramas y casos

Para una función `coste_envio(total, miembro)`, define cuatro salidas de decisión: el primer `if` es verdadero o falso; cuando es falso, el segundo `if` también puede ser verdadero o falso. Tres escenarios recorren los cuatro resultados posibles: total 50; total 20 con membresía; total 20 sin membresía. Un caso total 49,99 confirma además de qué lado queda el borde. El punto es diseñar pruebas por rutas de comportamiento, no aumentar el contador por sí mismo.

## Actividad paso a paso

1. Escribe la tabla de tres escenarios anterior en una hoja, con columnas para entrada, condición recorrida y resultado esperado.
2. Marca qué salida de cada decisión observa cada caso. Comprueba que tanto la rama verdadera como la falsa de cada condición aparecen al menos una vez.
3. Añade un caso en el borde exacto y otro justo por debajo; explica qué defecto detectaría cada uno.
4. Examina una función real pequeña y señala una métrica disponible en tu editor o informe; no instales una herramienta para completar este ejercicio.
5. Formula una pregunta de calidad que la cifra no responda, como “¿se rechaza una moneda inválida?” y diseña un test para ella.

## Verificación y solución

La tabla está completa si visita envío gratis, coste reducido y coste normal, y distingue el límite 50 de 49,99. Una cobertura del 100 % de esos caminos todavía no probaría que la función maneja `None`, una moneda distinta o una precisión decimal inadecuada; esos comportamientos dependen del contrato. Si el informe es difícil de interpretar, reduce la evaluación a una función y compara casos concretos antes de resumirla como porcentaje.

Coverage.py documenta medición de ramas como una opción adicional a líneas ejecutadas. Si tu proyecto ya emplea una herramienta, consulta su documentación para no confundir “no cubierto”, “no aplicable” y “no ejecutado”. La actividad puede resolverse manualmente con la tabla: no requiere descargar cobertura, subir un repositorio ni enviar datos a un servicio externo.

## Errores habituales

- **Convertir cobertura en garantía.** Revisa aserciones y criterios, no solo instrucciones recorridas.
- **Comparar cifras con denominadores distintos.** Mantén constante el alcance o declara el cambio.
- **Refactorizar solo para reducir complejidad.** Confirma primero qué dificultad concreta experimenta quien mantiene el código.
- **Ignorar los bordes.** Los fallos suelen concentrarse donde cambia una condición o se transforma un tipo.
- **Premiar el número en vez del aprendizaje.** Usa las métricas para decidir qué inspeccionar o probar a continuación.

## Resumen

Cobertura, complejidad y tendencias ayudan a enfocar preguntas. Comprueba líneas y ramas con escenarios explícitos; interpreta la complejidad como señal para revisar, no como veredicto. Una cifra útil conduce a una prueba o decisión explicable y siempre deja claros sus límites.
