---
title: "Ajustar un modelo de lenguaje con un experimento pequeño"
description: "Diseña un piloto de ajuste supervisado desde los ejemplos y la evaluación: delimita la tarea, prepara datos limpios y decide si entrenar tiene sentido."
module: "13-talleres-para-profundizar"
order: 2
duration: 60
level: "Intermedio"
objectives:
  - "Distinguir ajuste supervisado, instrucciones y recuperación de información según el problema."
  - "Diseñar ejemplos de entrada y respuesta con criterios de calidad y una separación de evaluación."
  - "Validar un archivo JSONL y definir un piloto sin asumir que hace falta una GPU."
prerequisites:
  - "Comprender qué son un modelo, una instrucción y una respuesta generada."
  - "Leer JSON y ejecutar scripts sencillos de Python."
updatedDate: "2026-10-08"
sources:
  - label: "Documentación oficial de Hugging Face TRL: SFT Trainer"
    url: "https://huggingface.co/docs/trl/en/sft_trainer"
  - label: "Documentación oficial de Hugging Face PEFT"
    url: "https://huggingface.co/docs/peft/en/methods/overview"
---

## Ajustar no es una respuesta automática a cualquier problema

El ajuste supervisado modifica el comportamiento aprendido del modelo a partir de ejemplos de entrada y respuesta. Puede ayudar a mantener un formato, tono o patrón de tarea relativamente estable. No convierte automáticamente al modelo en una base de datos actualizada ni garantiza que razone mejor en cualquier consulta. Si el problema consiste en contestar con políticas o documentos que cambian, primero considera recuperación de información: permite sustituir y corregir la fuente sin volver a entrenar.

Diseña el experimento antes de escoger biblioteca o modelo. Aquí la tarea es clasificar consultas ficticias de una biblioteca en una salida estructurada: categoría, prioridad y explicación breve. Define el contrato exacto antes de redactar ejemplos, por ejemplo: `categoria` pertenece a `acceso`, `prestamo` o `otro`; `prioridad` solo puede ser `normal` o `urgente`; la explicación no contiene datos personales. Una salida ambigua no se arregla aumentando el número de épocas: primero se arregla la etiqueta y la regla.

## Datos pequeños, deliberados y separados

Para ensayar el formato, crea un conjunto didáctico de 30 casos sintéticos: 20 para entrenamiento, 5 para validación durante el desarrollo y 5 de prueba final que no se consultan mientras se ajustan instrucciones. Esta cantidad solo sirve para comprobar el proceso y localizar inconsistencias; no permite afirmar que un modelo sea fiable en producción. Incluye casos fáciles, límites y ejemplos que se parezcan en vocabulario pero difieran en intención. No generes la separación después de duplicar paráfrasis casi idénticas: agrúpalas primero para que la misma situación no aparezca en ambos lados.

Un registro de tipo prompt-completion puede verse así; la respuesta debe ser la salida objetivo, no una explicación de cómo se creó:

```json
{"prompt":"Clasifica: no puedo entrar en mi cuenta","completion":"{\"categoria\":\"acceso\",\"prioridad\":\"normal\",\"motivo\":\"Solicita ayuda de inicio de sesión\"}"}
```

Guarda un objeto por línea en `train.jsonl`. Este verificador usa solo la biblioteca estándar de Python y detecta errores de forma antes de cualquier entrenamiento:

```python
import json
from pathlib import Path

for numero, linea in enumerate(Path("train.jsonl").read_text(encoding="utf-8").splitlines(), 1):
    fila = json.loads(linea)
    assert set(fila) == {"prompt", "completion"}, f"Línea {numero}: claves inesperadas"
    assert all(isinstance(fila[k], str) and fila[k].strip() for k in fila)
print("Estructura básica correcta")
```

Añade una revisión humana: cada respuesta debe ser correcta, consistente con el contrato y tener permiso de uso. Para información sensible, no uses conversaciones reales por comodidad; sustituye nombres y otros identificadores por datos sintéticos antes de decidir si siquiera se permite tratar ese material.

## Una evaluación que pueda refutar tu idea

Escribe por adelantado qué mejora buscas y qué salida invalida el piloto. En los cinco casos reservados, mide al menos: JSON parseable, valores dentro del vocabulario permitido, clasificación exacta y explicación fiel a la consulta. Guarda para cada caso la respuesta del modelo base y del candidato ajustado. Una tasa alta de formato con más errores de categoría puede ser una regresión. Incluye también una regla de rechazo: si faltan datos para clasificar, el modelo debe pedir aclaración en vez de inventar.

La documentación de TRL acepta conjuntos de supervisión en formatos de texto, conversacionales y prompt-completion; sus ejemplos actuales usan `SFTTrainer` y `SFTConfig`. Esto describe una opción de implementación, no un requisito de este taller. Primero produce el conjunto y una evaluación revisable. Si un futuro experimento entrena, registra nombre y licencia del modelo, versión de dependencias, configuración, coste permitido y método para restaurar el modelo base. Adaptadores de parámetros eficientes como PEFT pueden reducir parámetros entrenables, pero no eliminan los requisitos de memoria, cómputo, licencia ni evaluación.

## Errores que conviene detectar pronto

No mezcles respuestas ideales con varias políticas incompatibles; no ajustes sobre los ejemplos de prueba; no uses la pérdida de entrenamiento como única medida de utilidad; y no declares éxito por una salida convincente aislada. Si la salida falla porque la etiqueta está mal especificada, corrige la guía y vuelve a etiquetar un subconjunto. Si falla solo con una clase poco representada, revisa cobertura antes de tocar hiperparámetros.

## Cierre

El experimento pequeño comienza con una decisión sobre datos: tarea estrecha, formato inequívoco, ejemplos autorizados y prueba independiente. El objetivo de esta práctica es terminar con un plan reproducible y un JSONL validado, no pagar por cómputo ni fingir que se entrenó un modelo.
