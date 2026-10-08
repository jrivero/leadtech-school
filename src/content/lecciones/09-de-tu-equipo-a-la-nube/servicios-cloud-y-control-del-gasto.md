---
title: "Servicios cloud y control del gasto"
description: "Identifica los servicios cloud, estima costes con datos ficticios y diseña alertas útiles sin confundir un presupuesto con un tope automático de gasto."
module: "09-de-tu-equipo-a-la-nube"
order: 2
duration: 30
level: "Intermedio"
objectives:
  - "Relacionar cómputo, almacenamiento, bases de datos y red con necesidades de una aplicación."
  - "Calcular localmente un presupuesto hipotético a partir de partidas sintéticas."
  - "Explicar por qué las alertas cloud no equivalen por sí solas a un límite de gasto."
prerequisites:
  - "Poder ejecutar comandos en una terminal."
  - "Entender que un servicio puede consumir recursos mientras permanece activo."
updatedDate: '2026-10-08'
sources:
  - label: "AWS Budgets: creación y seguimiento de presupuestos"
    url: "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-create.html"
  - label: "Google Cloud Billing: presupuestos y alertas"
    url: "https://docs.cloud.google.com/billing/docs/how-to/budgets"
  - label: "AWS Budgets: frecuencia de actualización y alertas"
    url: "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html"
  - label: "Google Cloud: presupuestos con límites de gasto compatibles"
    url: "https://docs.cloud.google.com/billing/docs/how-to/budgets-spend-caps"
---

## Qué significa usar cloud

La nube permite solicitar capacidad informática a un proveedor por medio de servicios administrados y redes accesibles bajo demanda. Una aplicación combina cómputo, almacenamiento, base de datos, red, identidad y monitorización. Cada recurso requiere permisos y observación; por ejemplo, una máquina ejecuta código, un objeto guarda imágenes y una base administrada conserva registros. “Cloud” no elimina servidores: delega parte de su operación y facturación.

Conviene distinguir el modelo de servicio de la decisión de despliegue. Una máquina virtual ofrece control del sistema operativo, pero también exige mantenerlo. Una base de datos administrada simplifica copias y parches, aunque sigue necesitando diseño, permisos y seguimiento. Una función bajo demanda se adapta a ciertas tareas, pero puede cobrar por invocación, duración o recursos asociados. Elegir no es escoger la opción más moderna: es relacionar mantenimiento, disponibilidad, carga y presupuesto.

El coste puede depender de tiempo encendido, CPU y memoria, espacio ocupado, número de operaciones, copias, salida de datos hacia Internet, región y soporte. Un prototipo inactivo puede seguir generando cargos por almacenamiento, IP reservada u otros recursos. Etiquetar recursos por proyecto, separar entornos, revisar el inventario y borrar lo que no se necesita son hábitos operativos. Antes de crear algo, confirma quién paga, cómo se apaga y qué permisos requiere; no pongas credenciales en código ni en capturas.

## Presupuesto, alerta y límite no son sinónimos

Un presupuesto expresa cuánto se planea gastar en un periodo y permite comparar previsiones o costes registrados con ese plan. Las alertas al 50 %, 80 % o 100 % dan tiempo para investigar; no son necesariamente barreras que rechacen nuevas solicitudes. En Google Cloud, un presupuesto de tipo «solo alertas» informa, pero no detiene automáticamente el uso ni la facturación; existe una modalidad separada de límite de gasto para servicios compatibles. AWS Budgets actualiza su información hasta tres veces al día, normalmente 8–12 horas después de la actualización anterior; un aviso puede llegar tarde y el gasto seguir cambiando.

Google Cloud ofrece, además, presupuestos de límite de gasto para un proyecto y un servicio elegible; no son el comportamiento de «solo alertas». Pueden pausar nuevo uso del servicio seleccionado, pero no son instantáneos: solicitudes en curso y recursos persistentes todavía pueden generar cargos. AWS Budgets también permite configurar acciones de control, que requieren permisos y revisión. Ninguna de estas opciones sustituye a apagar recursos, revisar facturas y acordar responsabilidades. Un presupuesto bien operado combina previsión, alertas con destinatario, revisión frecuente y un plan explícito para reducir consumo.

## Actividad local

1. Ejecuta el siguiente bloque con Python 3. Solo suma importes ficticios en memoria: no consulta precios, no necesita cuenta y no crea recursos.
2. Comprueba el exceso frente al presupuesto y después cambia `"computo": 12` por `18` para observar cómo cambia el resultado.

```sh
python3 - <<'PY'
partidas = {"computo": 12, "almacenamiento": 3, "base_datos": 9, "red": 5}
presupuesto = 25
estimacion = sum(partidas.values())
porcentaje = estimacion / presupuesto * 100
print(f"Estimación hipotética: €{estimacion:.2f}")
print(f"Uso del presupuesto: {porcentaje:.1f}%")
if estimacion >= presupuesto:
    print("ALERTA local: revisar las partidas antes de continuar")
PY
```

`partidas` es un diccionario de datos inventados; `sum` calcula el total; y el porcentaje compara ese total con el plan. La condición solo imprime una advertencia: no bloquea nada, igual que una alerta informativa no detiene por sí misma una plataforma. En este escenario didáctico se asume que todos los importes corresponden a un mismo periodo y moneda.

## Verificación y resultado

La primera ejecución debe mostrar 29 euros y un 116.0% del presupuesto de 25 euros, además del aviso local. Al cambiar cómputo a 18, el total pasa a 35 euros y el porcentaje a 140.0%. Los valores no son tarifas ni una predicción de proveedor; sirven para practicar la lectura de una desviación. La actividad termina en el equipo, sin proyecto cloud, tarjeta, API ni cuenta de facturación.

## Errores habituales y soluciones

Sumar importes de periodos distintos produce una comparación engañosa: normaliza cada partida a mes o a hora antes de calcular. Mezclar euros y dólares también invalida el total; define una moneda y no supongas que la conversión es gratuita o fija. Olvidar tráfico, copias o recursos ociosos tiende a subestimar el gasto; anota los supuestos y deja un margen. Si la alerta no llega al cruzar el umbral, comprueba el alcance, el destinatario y la actualización de datos; no concluyas que el servicio está bloqueado. Una previsión es una señal para actuar, no una factura final ni una garantía de tope.

## Resumen

Los servicios cloud aportan capacidad y componentes administrados a cambio de operación y coste variables. Antes de usarlos, identifica recursos, responsables, permisos, periodo y forma de apagado. Presupuestos y alertas ayudan a detectar desviaciones, pero las alertas-only de Google Cloud no detienen el gasto y los avisos de AWS pueden llegar con retraso. La práctica local convierte cifras sintéticas en una señal comprensible; no provisiona servicios ni reproduce las tarifas de un proveedor. Usa estimaciones para planificar y verificaciones reales, con permisos adecuados, solo cuando exista un proyecto autorizado.
