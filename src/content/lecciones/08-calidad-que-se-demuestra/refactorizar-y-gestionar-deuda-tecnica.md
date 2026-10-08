---
title: "Refactorizar y gestionar deuda técnica"
description: "Mejora la estructura interna sin cambiar el comportamiento observable y prioriza deuda técnica por coste, riesgo y evidencia, no por intuición estética."
module: "08-calidad-que-se-demuestra"
order: 2
duration: 35
level: "Intermedio"
objectives:
  - "Distinguir una refactorización de un cambio funcional mediante criterios observables."
  - "Aplicar una transformación pequeña protegida por pruebas de caracterización."
  - "Registrar deuda técnica con impacto, contexto y próximo paso verificable."
prerequisites:
  - "Conocer funciones, condiciones y pruebas automatizadas básicas."
  - "Poder comparar el comportamiento antes y después de un cambio."
updatedDate: '2026-10-08'
sources:
  - label: "Martin Fowler: definición y alcance de refactorizar"
    url: "https://martinfowler.com/bliki/DefinitionOfRefactoring.html"
  - label: "Python: framework unittest para caracterizar comportamiento"
    url: "https://docs.python.org/3/library/unittest.html"
---

## Cambiar la forma sin cambiar el contrato

Refactorizar consiste en mejorar la estructura interna de un programa conservando su comportamiento observable. El contrato incluye lo que una persona puede ver, los valores que consumen otros módulos y efectos como una escritura o un error esperado. Si a la vez se decide una regla nueva, hay dos tipos de cambio mezclados; separar la refactorización de la funcionalidad facilita atribuir fallos y revisar el diff.

La deuda técnica describe una decisión que facilita avanzar ahora y puede encarecer cambios futuros. No todo código antiguo es deuda, ni toda deuda merece pagarse inmediatamente. Una duplicación que ya provoca reglas inconsistentes puede costar más en cada modificación; una abstracción poco elegante pero estable quizá no justifica una reescritura. Registra el síntoma, el contexto, el impacto que se observa y una acción siguiente, en vez de etiquetar una carpeta como “mala”. La metáfora de intereses es útil para pensar en coste acumulado, pero no calcula una cantidad exacta sin datos.

Supón que dos pantallas calculan el coste de envío gratis con umbrales distintos por error. La meta funcional puede ser unificar la regla aprobada, pero primero hay que identificar si se pretende corregir comportamiento o reorganizar código. Para una refactorización pura, fija con ejemplos el resultado que ya debe conservarse. Para un cambio de regla, documenta explícitamente cuál pantalla estaba mal y cuál es el valor esperado. En ambos casos, conserva los tests y revisa casos de frontera.

## Ejemplo protegido por pruebas

El bloque compara una función antigua y una versión extraída. Ambos usan la misma regla ficticia: se ofrece envío gratis a partir de 50 unidades monetarias; debajo de ese umbral se cobra 5. La extracción nombra el umbral para que no quede oculto, sin cambiar el resultado.

```python
def envio_antes(total):
    if total >= 50:
        return 0
    return 5

UMBRAL_ENVIO_GRATIS = 50

def envio_refactorizado(total):
    if total >= UMBRAL_ENVIO_GRATIS:
        return 0
    return 5

for importe, esperado in [(0, 5), (49.99, 5), (50, 0), (75, 0)]:
    assert envio_antes(importe) == esperado
    assert envio_refactorizado(importe) == esperado
    assert envio_antes(importe) == envio_refactorizado(importe)
print("OK: cuatro casos conservan el comportamiento")
```

## Práctica paso a paso

1. Selecciona una función pequeña con al menos dos casos conocidos; no comiences por una migración de arquitectura completa.
2. Escribe ejemplos de entradas y resultados antes de editar, incluyendo el borde donde cambia una condición.
3. Ejecuta esas comprobaciones y guarda su resultado. Si ya hay pruebas del proyecto, identifica cuáles protegen la función.
4. Realiza una sola transformación estructural, como extraer una condición repetida o dar nombre a una constante.
5. Repite exactamente los mismos casos y revisa el diff para confirmar que no cambió una regla, una dependencia ni un archivo fuera de alcance.
6. Si aparece una necesidad funcional, abre un cambio separado con criterios nuevos y tests que expresen la regla acordada.

Pega el ejemplo en Python 3 con `python3 -` para comprobar la equivalencia sin librerías. Luego cambia temporalmente el operador `>=` por `>` en la versión refactorizada: el caso 50 debe detectar la diferencia. Restaura la condición y vuelve a ejecutar.

## Verificación y registro de deuda

Una refactorización pequeña queda respaldada cuando los casos de antes y después pasan, el resultado público se conserva y otra persona entiende el motivo del cambio. El test no tiene que comparar línea por línea; debe afirmar reglas relevantes. Para priorizar una deuda, anota dónde aparece, qué cambio la hizo visible, qué riesgo crea y cuánto cuesta posponer una intervención según la evidencia disponible. Revisa el registro al tocar esa zona, no en una campaña de reescritura automática.

## Errores frecuentes

- **Cambiar estructura y regla a la vez.** Divide las etapas o etiqueta claramente las pruebas nuevas que justifican el cambio funcional.
- **Reescribir por gusto personal.** Exige una mejora observable de comprensión, seguridad, capacidad de cambio o coste de prueba.
- **Añadir abstracciones antes de tener repetición real.** Extrae cuando la duplicación o variación ya produce trabajo y puede nombrarse con claridad.
- **Acumular tickets vagos de deuda.** Registra impacto y siguiente acción, no solo “limpiar después”.
- **Confiar en que tests existentes cubren el comportamiento.** Comprueba sus casos y agrega caracterización donde falte evidencia.

## Resumen

Refactorizar mantiene el comportamiento mientras mejora una estructura concreta. Protege el paso con ejemplos y pruebas, revisa el diff y separa cambios funcionales. Gestiona deuda con síntomas e impacto verificables; evita tanto ignorar costes recurrentes como emprender una reescritura sin objetivo.
