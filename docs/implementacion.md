# Organización de la implementación

## Coordinación y agentes

La implementación se ha dividido en siete frentes con agentes **GPT-6 Luna** configurados con esfuerzo de razonamiento **max**, según la petición del usuario:

1. Fundamentos, ingeniería y arquitectura: módulos 1–4; cierre y dos temas extra: módulos 14–15.
2. Fundamentos de IA y herramientas: módulos 5–6.
3. Flujo de agentes y calidad: módulos 7–8.
4. Infraestructura, operaciones y seguridad: módulos 9–10.
5. Proyectos y desarrollo profesional: módulos 11–12.
6. Interfaz: landing, componentes, layout, estilo y favicon originales.
7. Talleres complementarios: módulo 13.

La coordinación principal se encarga de leer la referencia pública, construir el inventario, fijar contratos de metadatos y rutas, implementar la colección y las páginas de artículos, integrar las entregas, revisar muestras, comprobar fuentes y ejecutar pruebas. No se ha delegado un despliegue ni se ha creado un repositorio remoto.

## Contratos compartidos

- Un inventario único de módulos y temas en `src/data/curriculum.json`.
- Una lección por archivo: `src/content/lecciones/<id-modulo>/<slug>.md`.
- `module`, `title` y `order` del frontmatter deben coincidir con el inventario.
- Objetivos, requisitos previos, tiempo propio estimado y enlaces a fuentes en todos los artículos.
- Texto original, ejemplos sintéticos y prácticas con comprobaciones; sin reproducir materiales privados de terceros.
- Carpetas de escritura separadas para evitar conflictos de agentes. La integración detecta ausencias y discordancias en vez de publicar enlaces vacíos.

## Verificación realizada y límites

La validación realizada combina tipos Astro/TypeScript, esquema de frontmatter, inventario de 96 temas, mínimos didácticos, sintaxis de bloques Python, ejecución de cuatro ejercicios locales representativos, enlaces/anclas del sitio generado y pruebas Chromium con accesibilidad automatizada.

El informe `source-audit.json` registra la disponibilidad HTTP de las fuentes externas en la revisión. Una respuesta 403 o timeout puede reflejar protección frente a bots: no demuestra que el enlace esté roto. Una respuesta 200 tampoco certifica la exactitud de cada afirmación. Esta auditoría es optativa y necesita red (`npm run audit:sources`); no participa en el build ni envía contenido de estudiantes.

Las comprobaciones automatizadas y la revisión de muestras no equivalen a ejecutar todos los ejercicios, evaluar a un estudiante ni realizar una auditoría profesional completa de accesibilidad o seguridad. Las lecciones técnicas deben revisarse periódicamente si cambian los productos, APIs y documentación.
