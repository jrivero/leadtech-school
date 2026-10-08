# Verificación del MVP

Revisión: 8 de octubre de 2026.

## Resultados

- Astro/TypeScript: 0 errores y 0 advertencias.
- 107 pruebas automatizadas superadas.
- 24 bloques Python comprobados sintácticamente y cuatro ejercicios locales representativos ejecutados.
- Build de producción: 98 páginas, incluidos 96 artículos originales.
- 2.948 enlaces internos y anclas válidos.
- 11 pruebas Playwright superadas: rutas, búsqueda, filtros, navegación, progreso persistente, almacenamiento bloqueado o corrupto, lectura sin JavaScript, móvil y comprobaciones automatizadas de accesibilidad.
- Revisión visual de landing de escritorio y móvil y artículo móvil.
- Auditoría externa: 171 de 177 URLs accesibles; seis respuestas HTTP 403. La disponibilidad de una fuente no certifica la exactitud de todas las afirmaciones.

## Alcance y límites

Solo se incluye desarrollo de software con IA: 83 lecciones principales y 13 complementarias del mismo programa. El inventario parte del temario público de referencia, no de material privado. Los artículos y el diseño son originales e independientes.

No se han ejecutado todos los ejercicios ni realizado una auditoría profesional completa de accesibilidad o seguridad. No hay autenticación de estudiantes, pagos ni certificación.

Vista previa local iniciada en `http://127.0.0.1:4323/`. Puede dejar de estar disponible cuando se detenga el servidor. Para iniciar otra vista previa: `npm run build` y `npm run preview`.

Para repetir las comprobaciones: `npm run validate` y `npm run test:e2e`. La auditoría de fuentes es opcional: `npm run audit:sources`.

## Despliegue público en Vercel

Publicado el 8 de octubre de 2026 en https://leadtech-school.vercel.app, con la integración GitHub conectada a `jrivero/leadtech-school`.

La configuración de despliegue pasó de nuevo `npm run validate`: Astro sin errores ni advertencias, 107 pruebas superadas, 98 páginas y 2.949 enlaces internos/anclas válidos. Vercel completó el build y confirmó el estado READY.

Comprobaciones HTTP sin autenticación: portada 200, primera lección 200 y ruta inexistente 404. Estas comprobaciones no sustituyen una ejecución completa de las pruebas de navegador contra producción.
