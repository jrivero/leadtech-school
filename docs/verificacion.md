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

No se han ejecutado todos los ejercicios ni realizado una auditoría profesional completa de accesibilidad o seguridad. No hay autenticación, pagos, certificación ni despliegue público.

Vista previa local iniciada en `http://127.0.0.1:4323/`. Puede dejar de estar disponible cuando se detenga el servidor. Para iniciar otra vista previa: `npm run build` y `npm run preview`.

Para repetir las comprobaciones: `npm run validate` y `npm run test:e2e`. La auditoría de fuentes es opcional: `npm run audit:sources`.
