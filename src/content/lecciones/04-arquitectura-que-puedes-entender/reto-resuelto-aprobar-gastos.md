---
title: "Reto resuelto: aprobar gastos"
description: "Diseña una política transparente de aprobación de gastos, aplica umbrales con precisión decimal y valida los casos límite con una solución razonada."
module: "04-arquitectura-que-puedes-entender"
order: 3
duration: 60
level: "Intermedio"
objectives:
  - "Convertir una política de gastos en ramas explícitas y ordenadas."
  - "Usar Decimal para comparar importes monetarios sin errores binarios de float."
  - "Probar límites, rechazos y derivaciones a revisión manual."
prerequisites:
  - "Clean Architecture, condicionales y pruebas básicas de Python"
updatedDate: "2026-10-08"
sources:
  - label: "Python: módulo decimal para aritmética decimal"
    url: "https://docs.python.org/3/library/decimal.html"
  - label: "NASA Systems Engineering Handbook: matriz de verificación de requisitos"
    url: "https://www.nasa.gov/wp-content/uploads/2018/09/nasa_systems_engineering_handbook_0.pdf"
---

## Primero define la política, luego el código

Este reto usa una política ficticia para practicar diseño; no representa una obligación legal ni una regla contable universal. Supongamos que solo se procesan gastos positivos en euros y que cada solicitud debe incluir justificante. Hasta 100 euros se aprueba automáticamente; más de 100 y hasta 500 requiere al responsable; más de 500 y hasta 2.000 pasa a finanzas; por encima de 2.000 requiere finanzas y dirección. Si falta el justificante, el estado es incompleto. Otra moneda se deriva a revisión manual porque aún no definimos conversión.

Los límites son deliberados: exactamente 100 entra en aprobación automática, exactamente 500 requiere responsable y exactamente 2.000 va a finanzas. Escribe esas decisiones en lenguaje natural y prepara ejemplos antes de construir ramas. Para dinero, `Decimal` permite representar importes decimales de forma más apropiada que `float`, cuyas fracciones binarias pueden no ser exactas. Construye el valor desde texto, como `Decimal("100.00")`, no desde un `float` que ya se aproximó.

## Implementación del evaluador

```python
from decimal import Decimal, InvalidOperation


def decidir_gasto(importe, moneda, tiene_recibo):
    try:
        cantidad = Decimal(str(importe))
    except InvalidOperation as error:
        raise ValueError("Importe no válido") from error
    if not cantidad.is_finite():
        raise ValueError("El importe debe ser finito")
    if cantidad <= 0:
        return {"estado": "rechazado", "aprobadores": []}
    if moneda != "EUR":
        return {"estado": "revision_manual", "aprobadores": ["finanzas"]}
    if not tiene_recibo:
        return {"estado": "incompleto", "aprobadores": []}
    if cantidad <= Decimal("100.00"):
        return {"estado": "aprobado", "aprobadores": []}
    if cantidad <= Decimal("500.00"):
        return {"estado": "pendiente", "aprobadores": ["responsable"]}
    if cantidad <= Decimal("2000.00"):
        return {"estado": "pendiente", "aprobadores": ["finanzas"]}
    return {"estado": "pendiente", "aprobadores": ["finanzas", "direccion"]}
```

El orden importa: primero validamos que el importe se pueda interpretar y sea finito; después rechazamos valores no positivos; luego resolvemos moneda y justificante; por último evaluamos umbrales. Cada rama devuelve un estado y las personas que deben actuar. La función pura no envía correos, no escribe una base y no paga el gasto; esas tareas pertenecen a otros componentes.

## Resolución razonada de los casos

Prueba `75.00 EUR` con recibo: debe quedar aprobado. `100.01 EUR` pasa al responsable; `500.00` sigue en esa banda, mientras `500.01` va a finanzas. `2.000,00` en formato español no es un literal decimal apropiado para esta interfaz de ejemplo; envía `"2000.00"` y comprueba que se queda en finanzas. `2000.01` necesita ambas aprobaciones. Cero o un importe negativo se rechaza; una moneda distinta se deriva a revisión y un recibo ausente produce estado incompleto.

Añade tests para cada frontera: 100, 100.01, 500, 500.01, 2000 y 2000.01. Añade además importe inválido, infinito, gasto sin recibo y moneda desconocida. Si una política cambia, modifica primero la regla y los casos esperados; no «arregles» la función de forma aislada hasta que pase un único ejemplo.

## Práctica paso a paso

1. Copia la política y subraya cada umbral, requisito previo y excepción.
2. Escribe una tabla con entrada, estado esperado y aprobadores antes de programar.
3. Implementa una rama cada vez y comprueba sus límites exactos.
4. Mantén las comparaciones con `Decimal` y crea valores desde cadenas decimales.
5. Separa esta decisión del mecanismo que guarda el gasto o notifica a alguien.
6. Pide a otra persona que revise si la tabla y la función dicen lo mismo.

## Comprobación y errores frecuentes

La solución está bien si cada fila de la tabla produce el estado acordado y ningún límite cae en dos bandas. Si `Decimal` informa de un valor inválido, captura solo la excepción de conversión esperada y devuelve un error claro; no conviertas cualquier fallo del programa en una aprobación. Si cambias el orden de las ramas, vuelve a probar casos frontera. Registra también el motivo de una decisión en un sistema real para que se pueda auditar.

No confundas el importe con el estado de aprobación ni autorices una solicitud porque el servicio de notificación haya fallado. La aprobación y el envío son operaciones distintas. No apliques conversiones de divisa silenciosas: exige una fuente y fecha de cambio acordadas o deriva a revisión.

## Resumen

Una política verificable se convierte en decisiones ordenadas, resultados explícitos y pruebas en cada frontera. `Decimal` evita depender de aproximaciones binarias al comparar dinero. Mantén la regla separada de almacenamiento y notificaciones, y trata la política de ejemplo como una decisión que el negocio debe confirmar.
