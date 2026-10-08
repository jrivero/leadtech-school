---
title: "Privacidad, sesgos y uso responsable"
description: "Identifica riesgos de privacidad, sesgo y uso indebido, y aprende a revisar marcos de regulación sin sustituir asesoramiento profesional."
module: "05-entender-la-inteligencia-artificial"
order: 6
duration: 35
level: "Inicial"
objectives:
  - "Clasificar datos según su sensibilidad y reducir la información compartida a lo necesario."
  - "Diseñar pruebas que revelen errores desiguales y asignar revisión humana según el impacto."
  - "Reconocer el AI Act como marco regulatorio y consultar fuentes oficiales sin interpretar obligaciones por cuenta propia."
prerequisites:
  - "que-es-la-ia-y-que-no-es"
  - "como-funciona-la-ia-generativa"
updatedDate: '2026-10-08'
sources:
  - label: "NIST: AI Risk Management Framework"
    url: "https://www.nist.gov/itl/ai-risk-management-framework"
  - label: "NIST: perfil de riesgos de IA generativa"
    url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf"
  - label: "Comisión Europea: marco regulatorio de la inteligencia artificial"
    url: "https://digital-strategy.ec.europa.eu/es/policies/regulatory-framework-ai"
  - label: "EUR-Lex: Reglamento europeo de inteligencia artificial"
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
---

## Idea central — explicación conceptual

Usar IA de forma responsable empieza antes de escribir una instrucción. Identifica qué datos entrarían: información pública, datos personales, información confidencial de un trabajo o datos especialmente delicados. Después consulta las condiciones del servicio y la política de tu organización. «La herramienta parece privada» no demuestra dónde se procesa una solicitud, cuánto tiempo se conserva ni quién puede acceder. Reducir la entrada a lo indispensable disminuye exposición, pero borrar un nombre no siempre anonimiza a alguien si quedan detalles identificables.

El sesgo tampoco es solo una frase ofensiva. Puede surgir si los ejemplos representan poco a ciertos grupos, si una categoría está mal definida o si el rendimiento cambia por idioma, acento o contexto. Un promedio correcto puede ocultar errores concentrados. Prepara casos variados y registra qué tipo de error ocurre, a quién podría afectar y si la persona puede corregirlo. El NIST AI Risk Management Framework ofrece una guía para gestionar riesgos; es un marco de trabajo, no un sello de aprobación ni asesoramiento legal.

En la Unión Europea, el Reglamento de Inteligencia Artificial —AI Act— establece obligaciones relacionadas con los usos, riesgos y roles de quienes desarrollan, distribuyen o utilizan sistemas. A 8 de octubre de 2026, la Comisión Europea indica que el Reglamento es aplicable desde el 2 de agosto de 2026, con excepciones: las prohibiciones y la alfabetización en IA aplican desde el 2 de febrero de 2025; las reglas de gobernanza y de modelos de propósito general, desde el 2 de agosto de 2025; ciertas obligaciones de alto riesgo del anexo III, desde el 2 de diciembre de 2027; y las de sistemas integrados en productos regulados del anexo I, desde el 2 de agosto de 2028. La Comisión y EUR-Lex publican el resumen y el texto jurídico. El calendario no decide si un caso cumple la ley: las obligaciones dependen de la categoría y el contexto. Esta lección es educativa, no asesoría jurídica ni autorización para desplegar un sistema.

El nivel de cuidado debe corresponder a las consecuencias. Una herramienta que sugiere etiquetas para una colección inventada no tiene el mismo riesgo que un sistema que afecta empleo, crédito, salud o acceso a servicios. En decisiones importantes, una salida automática no sustituye la evaluación profesional, los derechos de las personas ni las responsabilidades de la organización.

## Ejemplo concreto

Una asociación quiere resumir comentarios de clientes para encontrar temas frecuentes. Si pega nombres, teléfonos y quejas identificables en una herramienta externa, comparte más de lo necesario. Puede empezar con comentarios ficticios o datos transformados de manera autorizada. Después revisa si los resúmenes ignoran comentarios en otro idioma o representan como «neutro» un lenguaje que no entiende. El resumen ayuda a organizar la lectura; una persona revisa las citas y decide qué conclusión comunicar.

## Práctica guiada — receta

1. Escoge una tarea de bajo impacto y escribe qué decisión ayudará a tomar. Si una respuesta equivocada puede perjudicar a alguien, no uses ese caso como experimento inicial.
2. Lista los datos que requeriría la herramienta y clasifícalos. Elimina nombres, identificadores, credenciales, información de salud y contenido interno no indispensable.
3. Consulta la política del equipo y la documentación del servicio para saber si la herramienta está autorizada y cómo trata las entradas. Si no lo puedes confirmar, no subas datos reales.
4. Prepara casos ficticios variados, incluidos ejemplos límite y diferentes formas de expresar una misma idea. Define por adelantado qué se considera error y quién revisará las salidas.
5. Para una pregunta regulatoria, registra el uso previsto, tu país y la fecha, y consulta la Comisión Europea, EUR-Lex o asesoría cualificada; no infieras una obligación solo por una etiqueta comercial.

## Validación y solución de problemas

Compara las salidas con criterios definidos antes de la prueba. Busca no solo errores totales, sino quién los soporta y si una persona puede apelar o corregir un resultado. Si aparece una disparidad, detén el uso en decisiones reales, analiza el origen con personas competentes y repite las pruebas tras corregirlo. Si no puedes explicar de dónde sale la información, limita el sistema a un borrador. Reevalúa cuando cambien los datos, el proveedor o el uso previsto.

## Errores frecuentes

- Pegar datos reales «solo para probar» en una cuenta o servicio no autorizado.
- Creer que quitar un nombre equivale siempre a anonimizar o que ejecutar localmente elimina todo riesgo.
- Tratar un tono neutral como prueba de que una decisión no es discriminatoria.
- Confundir una guía voluntaria, una página resumen y el texto legal aplicable.
- Dar por hecho que una persona revisora puede corregir el daño sin tiempo, información ni autoridad para detener el proceso.

## En resumen

Minimiza datos, verifica permisos, prueba errores por grupo y adapta la supervisión al impacto. Usa fuentes oficiales para entender el marco regulatorio, pero pide asesoramiento competente para aplicarlo a un caso. Si el tratamiento, la representatividad o las consecuencias no están claros, reduce el alcance o pausa la prueba.
