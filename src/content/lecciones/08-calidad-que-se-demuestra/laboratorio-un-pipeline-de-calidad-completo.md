---
title: "Laboratorio: un pipeline de calidad completo"
description: "Construye una secuencia de compuertas reproducibles para validar un cambio antes de integrarlo, con permisos mínimos, evidencia legible y sin despliegue automático."
module: "08-calidad-que-se-demuestra"
order: 12
duration: 50
level: "Intermedio"
objectives:
  - "Ordenar análisis, pruebas, build y revisión en un pipeline que falle ante errores."
  - "Relacionar cada compuerta con un riesgo y una evidencia que se pueda repetir."
  - "Aplicar permisos mínimos y separar validación de cualquier despliegue o uso de secretos."
prerequisites:
  - "Conocer pruebas locales y la idea de integración continua."
  - "Poder ejecutar scripts definidos por un proyecto."
updatedDate: '2026-10-08'
sources:
  - label: "GitHub Actions: conceptos de workflows y trabajos"
    url: "https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows"
  - label: "GitHub Actions: prácticas seguras para workflows"
    url: "https://docs.github.com/en/actions/reference/security/secure-use"
---

## Una compuerta es una señal de decisión

Un pipeline de calidad automatiza pasos repetibles desde que se propone un cambio hasta que queda listo para integrar. Cada etapa responde una pregunta: ¿el código es válido?, ¿pasan las pruebas?, ¿se construye el producto?, ¿hay riesgos conocidos que revisar? Si una compuerta falla, la secuencia debe dejar claro qué ocurrió y evitar presentar el cambio como listo. Un workflow de CI no tiene que publicar en producción; separar comprobación de despliegue reduce permisos y hace más fácil entender la evidencia.

Una secuencia habitual ejecuta análisis rápido y pruebas unitarias antes de una integración más amplia, luego construye el artefacto y, cuando aporta valor, verifica recorridos de navegador o accesibilidad. El orden busca feedback rápido sin ocultar pruebas de riesgo mayor. No agregues una fase solo porque existe una herramienta: especifica qué defecto detecta, cuánto tarda y qué hará el equipo ante el resultado. Una compuerta que nunca se atiende o que falla de forma intermitente se convierte en ruido.

En GitHub Actions, un workflow describe eventos que lo activan, trabajos y pasos ejecutados en runners. La configuración debe solicitar solo los permisos que cada trabajo necesita; para validar código puede bastar lectura del repositorio. Los secretos de despliegue no pertenecen a una tarea de pruebas ni a código no confiable de una solicitud externa. Revisa cuidadosamente cualquier workflow que ejecute comandos, use acciones de terceros o acceda a credenciales. La sintaxis y las políticas disponibles pueden cambiar, así que consulta documentación oficial antes de habilitar publicación.

## Ejemplo con este proyecto

En este repositorio, `package.json` define `npm run validate` como una secuencia local que ejecuta diagnóstico Astro, tests, build y validación del artefacto generado. Esos nombres son scripts existentes del proyecto, no comandos universales para cualquier aplicación. La cadena se detiene cuando un paso termina con error, por lo que el resultado permite identificar la primera compuerta fallida. No incluye despliegue, llamadas a un proveedor de IA ni necesidad de una clave externa.

Un pipeline remoto puede ejecutar las mismas comprobaciones sobre el cambio propuesto, pero eso requiere configurar un workflow real y sus reglas de repositorio. La mera descripción de etapas no crea CI. En una configuración de producción hay que revisar el evento, el runner, las versiones de acciones, el alcance de tokens, el origen de los secretos y quién puede aprobar una publicación. La aplicación de ejemplo no ejecuta ninguno de esos pasos al leer la lección.

## Laboratorio paso a paso

1. Comprueba en `package.json` qué scripts existen realmente y qué herramientas invoca cada uno; no copies comandos de otro proyecto sin verificarlos.
2. Con dependencias locales ya instaladas, ejecuta `npm run validate` desde la raíz de este repositorio. No requiere enviar código a un proveedor.
3. Anota cada fase, su resultado y qué tipo de error detectaría. Si falla, conserva el mensaje relevante y corrige la causa antes de continuar.
4. Diseña un workflow en papel: evento de solicitud, trabajo de validación, permiso mínimo, pasos ordenados y señal de fallo. Márcalo como diseño, no como archivo ejecutable.
5. Añade una fase de despliegue solo como etapa separada y condicionada por revisión, aprobación y credenciales protegidas; no la implementes en este laboratorio.
6. Escribe qué ocurre si faltan pruebas, la compilación falla o una tarea pide permisos de escritura que no necesita.

## Verificación y solución

Una ejecución local completa debe mostrar que los scripts del proyecto concluyeron; si cualquier fase falla, no se debe afirmar que el pipeline está verde. La solución de diseño mínima contiene evento, job de lectura, comandos existentes y un resultado fallido que bloquea los pasos posteriores. La fase de publicación queda fuera. Si `npm run validate` no está disponible en otra copia del proyecto, consulta sus scripts; no inventes un comando sustituto ni declares que se ejecutó.

Al habilitar CI real, verifica el log, el commit exacto evaluado y que los tests correspondan al diff actual. Si después se modifica el cambio, la evidencia anterior ya no prueba esa versión. Los permisos de lectura son suficientes para muchas validaciones; un error por falta de permiso no se arregla concediendo acceso amplio sin analizar qué operación lo necesita.

## Errores frecuentes

- **Añadir despliegue al primer pipeline.** Empieza por validación y separa autorización de publicación.
- **Usar comandos no definidos en el proyecto.** Inspecciona scripts y documentación antes de automatizar.
- **Dar permisos de escritura a todas las tareas.** Limita cada workflow y job a la capacidad necesaria.
- **Guardar secretos en el YAML o en logs.** Usa almacenes protegidos y evita exponerlos a ejecuciones no confiables.
- **Tratar una ejecución exitosa como garantía.** El pipeline solo demuestra las comprobaciones configuradas para el commit probado.

## Resumen

Un pipeline completo ordena compuertas que producen evidencia y detiene la integración ante fallos. Reutiliza comandos reales, asigna permisos mínimos y separa CI de despliegue. Verifica el commit y los logs; una ejecución verde confirma esas comprobaciones, no la ausencia total de defectos ni la seguridad de cualquier publicación.
