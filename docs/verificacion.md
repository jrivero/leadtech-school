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


## Edición bilingüe — 9 de octubre de 2026

- 96 lecciones completas en español y 96 en inglés, con inventarios correspondientes y selector de idioma accesible sin JavaScript.
- `npm run validate` superado: Astro/TypeScript con 0 errores, 0 advertencias y 0 hints; 209 pruebas superadas; 196 páginas y 6.292 enlaces internos/anclas válidos.
- Se verifica automáticamente la paridad de secciones, metadatos, URLs de fuentes y bloques de código entre las dos versiones.
- 24 bloques Python comprobados sintácticamente; seis ejemplos locales ejecutados. El laboratorio defensivo se ejecuta desde ambas versiones; el núcleo del proyecto final se comprueba con preguntas y documentos españoles e ingleses.
- `npm run test:e2e`: 24 pruebas Chromium superadas, con cobertura ES/EN, progreso compartido, lectura sin JavaScript, selector en móvil, anclas traducidas, fragmentos malformados y página de error inglesa, además de accesibilidad automatizada.
- Se corrigieron en ambos idiomas la explicación de salida del laboratorio defensivo y la lista de palabras vacías del proyecto final para textos ingleses, con regresiones ejecutables y fecha editorial del 9 de octubre.

El reparto y los detalles figuran en `docs/traduccion-ingles.md`. La auditoría HTTP de fuentes del 8 de octubre no se ha repetido. La edición bilingüe se verificó localmente y se publicó manualmente en producción el 9 de octubre de 2026. Vercel confirmó el estado READY del despliegue `dpl_5a6Q8wP2kmrnhcKCzRkea4pw8shq` y su alias https://leadtech-school.vercel.app. El usuario comprobó la publicación navegando por producción. No se ejecutaron pruebas HTTP ni de navegador automatizadas contra ese despliegue; los resultados anteriores corresponden al build local. La sincronización con Git se realiza después de esta publicación manual.
