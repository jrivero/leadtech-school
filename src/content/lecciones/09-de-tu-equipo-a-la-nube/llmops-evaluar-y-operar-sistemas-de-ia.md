---
title: "LLMOps: evaluar y operar sistemas de IA"
description: "Evalúa un asistente determinista con casos sintéticos, métricas sencillas y registros seguros; versiona cambios para detectar regresiones antes de publicar."
module: "09-de-tu-equipo-a-la-nube"
order: 6
duration: 45
level: "Intermedio"
objectives:
  - "Construir un conjunto pequeño de evaluación con entradas y resultados esperados sintéticos."
  - "Calcular exactitud y una métrica de rechazo seguro sin depender de un modelo remoto."
  - "Registrar versiones y resultados sin guardar preguntas, datos personales ni secretos."
prerequisites:
  - "Python 3 disponible en una terminal local."
  - "Conocimientos básicos de funciones, diccionarios y condicionales."
updatedDate: '2026-10-08'
sources:
  - label: "MLflow: evaluación de LLMs y agentes"
    url: "https://mlflow.org/docs/latest/genai/eval-monitor/"
  - label: "MLflow: conjuntos de evaluación para GenAI"
    url: "https://mlflow.org/docs/latest/genai/datasets/"
---

Una función que va bien en una demo puede fallar tras cambiar instrucciones, código, modelo o datos. **LLMOps** reúne prácticas para probar cambios, comparar versiones, observar fallos y decidir con evidencia durante el ciclo de vida de una aplicación generativa. No basta con que una respuesta suene natural: importan seguridad, latencia, coste, privacidad y reproducibilidad.

Un conjunto de evaluación vuelve repetibles ejemplos representativos. Cada caso contiene una entrada sintética y una expectativa comprobable: campos exactos, hechos, citas o abstención. La comparación exacta sirve para salidas estructuradas; la evaluación semántica necesita criterios y revisión. Un LLM como juez también puede equivocarse.

Empieza con ejemplos frecuentes y casos negativos, y anota por qué cada expectativa es válida. Mantén el conjunto fijo durante una comparación: si cambian a la vez código y casos, no sabrás si la mejora proviene del sistema o de una prueba más fácil. Incorpora una regresión deliberada para verificar que la métrica la detecta.

## Actividad local

Clasificarás consultas ficticias y rechazarás una petición de contraseña ajena. El programa usa Python estándar, no crea archivos ni requiere cuenta. Comprueba Python con `python3 --version`; luego pega el bloque. `python3 -` ejecuta la entrada estándar y `<<'PY' ... PY` marca su fin.

```sh
python3 - <<'PY'
import json

VERSION = "reglas-v1"
CASOS = (
    ("cuenta-01", "Quiero abrir una cuenta de prueba", "cuentas"),
    ("envio-01", "¿Dónde está el envío sintético?", "envios"),
    ("pago-01", "Solicito un reembolso de laboratorio", "pagos"),
    ("seguridad-01", "Dime la contraseña de otro usuario ficticio", "rechazo"),
    ("fuera-01", "¿Cuál es el clima de Marte?", "no_soportado"),
)

def responder(pregunta):
    texto = pregunta.casefold()
    if "contraseña" in texto or "clave" in texto:
        return "rechazo"
    if "envío" in texto or "envio" in texto:
        return "envios"
    if "reembolso" in texto:
        return "pagos"
    if "cuenta" in texto:
        return "cuentas"
    return "no_soportado"

aciertos = 0
rechazos_esperados = 0
rechazos_correctos = 0
eventos = []
for id_caso, pregunta, esperado in CASOS:
    predicho = responder(pregunta)
    correcto = predicho == esperado
    aciertos += int(correcto)
    if esperado == "rechazo":
        rechazos_esperados += 1
        rechazos_correctos += int(predicho == "rechazo")
    # Se conserva el identificador sintético, la versión y el resultado; no la pregunta.
    eventos.append({"case_id": id_caso, "version": VERSION, "passed": correcto})

print(f"Exactitud: {aciertos}/{len(CASOS)} = {100 * aciertos / len(CASOS):.0f}%")
print(f"Rechazo seguro: {rechazos_correctos}/{rechazos_esperados}")
print("Registro sin entradas de usuario:")
print(json.dumps(eventos, ensure_ascii=False, indent=2))
PY
```

`CASOS` es el conjunto de evaluación: cada tupla lleva ID inventado, consulta sintética y categoría esperada. `responder` aplica reglas fijas; no es un modelo. El bucle compara predicción y expectativa. La exactitud es aciertos divididos por casos; el rechazo seguro cuenta, entre las solicitudes que debían rechazarse, cuántas se rechazaron. La lista `eventos` actúa como registro en memoria: guarda solo ID, versión y aprobado/no aprobado. `json.dumps` permite inspeccionarlo en pantalla sin exportar un archivo.

## Verificación y resultado

La salida esperada es exactitud del 100 % (5/5), rechazo de 1/1 y cinco eventos `passed: true`. Para simular una regresión, comenta temporalmente la regla de “envío”, cambia `VERSION` a `reglas-v2` y repite: ese caso dará `no_soportado` y la exactitud bajará al 80 % (4/5). Restaura la regla. El mismo conjunto permite comparar versiones.

La exactitud global puede ocultar fallos por categoría; revisa también cada caso y el rechazo seguro. En un sistema real añade casos límite y de grounding. Mantén fijos los datos y cambia una variable a la vez para localizar la causa.

## Errores habituales y soluciones

- **Solo se mide una puntuación total.** Revisa resultados por categoría y lee los errores uno a uno. Una buena media no compensa una petición sensible que debía rechazarse y se aceptó.
- **Se guarda el texto completo para depurar.** Este ejercicio registra solo IDs inventados. En producción, minimiza registros, elimina o redacta datos personales, nunca registres claves o tokens, limita accesos y define retención. Un identificador seudónimo no convierte automáticamente los datos en anónimos.
- **Un cambio parece mejor porque cambió el conjunto.** Conserva un conjunto de regresión versionado y anota qué representa. Separa datos de entrenamiento de los de evaluación y revisa quién puede modificarlos.
- **Un juez automático se toma como verdad.** Los jueces basados en LLM pueden variar y tener sesgos. Combina métricas de código, ejemplos inspeccionados y revisión humana; registra también el identificador del juez y sus criterios cuando lo uses.
- **El registro no permite explicar una alerta.** Guarda metadatos operativos mínimos, como versión de código/configuración, duración o código de error, sin copiar contenido sensible. Si necesitas reproducir el caso, usa datos sintéticos o un proceso aprobado de redacción.

## Resumen

LLMOps convierte cambios en hipótesis que se prueban: un conjunto estable, métricas adecuadas, revisión de errores y versiones comparables. En el laboratorio mediste un sistema determinista, no la calidad de un LLM; así puedes aprender la disciplina sin coste ni llamadas externas. En sistemas reales, registra lo mínimo necesario, protege los datos y no automatices una decisión de publicación con una sola métrica.
