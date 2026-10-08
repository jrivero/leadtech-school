---
title: "Diseñar un agente conversacional con Voiceflow"
description: "Prototipa un agente de soporte con límites claros, elige entre playbook y workflow, y valida conversaciones antes de conectar herramientas o publicar."
module: "13-talleres-para-profundizar"
order: 3
duration: 55
level: "Intermedio"
objectives:
  - "Separar instrucciones globales, conocimiento, playbooks y workflows en un diseño conversacional."
  - "Definir una salida segura cuando el agente desconoce la respuesta o necesita una acción externa."
  - "Construir una batería manual de conversaciones para validar rutas, contenido y límites."
prerequisites:
  - "Saber describir una necesidad de usuario y sus casos límite."
  - "Conocer nociones básicas de asistentes generativos y datos sensibles."
updatedDate: "2026-10-08"
sources:
  - label: "Documentación oficial de Voiceflow: conceptos de construcción de agentes"
    url: "https://www.voiceflow.com/docs/documentation/introduction"
  - label: "Documentación oficial de Voiceflow: pruebas"
    url: "https://www.voiceflow.com/docs/courses/chat-agent-quick-start"
---

## Diseñar la conversación antes de abrir el editor

Un agente conversacional no es solo un prompt. Hay que decidir qué conoce, qué puede hacer, cómo responde cuando una petición se sale del alcance y qué pruebas demostrarán que el flujo es aceptable. Voiceflow documenta componentes diferentes para estos papeles: prompt e instrucciones globales, playbooks para conversaciones abiertas, workflows para recorridos deterministas, una base de conocimiento y herramientas conectadas. El taller usa un centro ficticio de formación; toda la información y las acciones son simuladas, así que no hace falta cuenta, integración ni publicación.

Escribe primero el contrato del agente: «Ayuda a encontrar información pública de talleres; no modifica matrículas, no promete plazas y no consulta datos personales». Decide quién usará la conversación, en qué canal y qué resultado queda bajo control humano. Una buena frontera evita que una frase natural del usuario se interprete como permiso para ejecutar una acción irreversible.

## Elige el componente por la forma del problema

Supón que el centro publica un horario de atención y una dirección inventados para el ejercicio. Una pregunta abierta como «¿qué taller encaja si soy nuevo en Python?» permite varias conversaciones y puede beneficiarse de un playbook que oriente la exploración. En cambio, si el usuario pide consultar una plaza, un proceso real tendría pasos precisos: recoger un identificador, verificarlo, mostrar el resultado autorizado y confirmar antes de cualquier cambio. Ese recorrido se representa mejor como workflow con condiciones explícitas, no como autonomía libre.

Para el prototipo no se consulta una plaza real: la respuesta correcta es explicar que la disponibilidad no está conectada y dirigir a una persona. Esta diferencia debe estar en las instrucciones globales y en cada prueba. Mantén esas instrucciones breves: rol, objetivo, tono, límites y respuesta de salida. Si pones todas las reglas, datos y decisiones en un único párrafo, resulta difícil saber qué capa produjo el comportamiento.

## Actividad: mapa de conversación en papel

1. Dibuja una entrada inicial y tres intenciones: preguntar por horario, elegir un taller y solicitar una acción no disponible.
2. Redacta para cada intención una respuesta esperada y el dato que la sustenta. Para una duda no cubierta, fija un texto de incertidumbre: «No tengo ese dato en la información publicada; consulta al equipo».
3. Clasifica cada rama como playbook flexible o workflow estricto. Marca en rojo toda operación que modificaría una cuenta, reserva o pago; en este ejercicio debe quedar deshabilitada.
4. Prepara una ficha breve de conocimiento con hechos ficticios, fecha de revisión y procedencia interna. No mezcles notas de prueba con documentos reales ni subas material confidencial a un servicio externo.
5. Escribe ocho conversaciones de prueba: saludo, pregunta directa, sinónimos, dato ausente, pregunta ambigua, usuario que cambia de tema, petición de datos de otra persona e instrucción maliciosa incrustada en un texto citado.
6. Para cada caso establece una condición observable: contenido correcto, pregunta de aclaración, derivación o ausencia de llamada a herramienta. No califiques solo si «suena amable».

Si dispones de un espacio de Voiceflow, puedes trasladar el mapa a un proyecto de prueba no publicado: configura primero prompt e instrucciones, añade la ruta determinista y carga solo la ficha ficticia. Si la función Tests está habilitada en tu entorno, úsala con las conversaciones anteriores; si no aparece, reproduce cada turno manualmente y registra los resultados en una tabla. La disponibilidad de funciones cambia según el producto y el espacio. Deja las herramientas reales desconectadas y anota para cada caso el resultado esperado, el observado y la causa de fallo.

## Validación y solución de problemas

Un caso pasa si contesta con el hecho correcto o reconoce que falta, conserva los límites y no dispara un efecto lateral inesperado. Si responde con un horario inventado, corrige la fuente o la regla de desconocimiento; no añadas una frase vaga de «sé preciso» y asumas que quedó resuelto. Si una ruta abierta cambia entre intentos, reduce su autonomía en el paso que requiere certeza. Si una ruta fija deriva mal, revisa primero las condiciones y nombres de variables.

Los errores habituales son mezclar playbooks y workflows sin propósito, habilitar una API antes de definir permisos, cargar documentos sin verificar vigencia y probar solo preguntas ideales. Las evaluaciones automáticas pueden ayudar a revisar muchos transcriptos, pero no reemplazan inspección humana de privacidad, daño potencial o errores de autorización. Un test de laboratorio también debe renovarse cuando cambian los documentos, herramientas o instrucciones.

## Cierre

El prototipo termina con límites, fuente ficticia trazable, ocho pruebas y una tabla de resultados. Solo después de entender esos resultados tendría sentido conectar una herramienta real, añadir controles de acceso y repetir la validación en un entorno autorizado. Diseñar un agente es diseñar sus capacidades y sus negativas, no únicamente su personalidad.
