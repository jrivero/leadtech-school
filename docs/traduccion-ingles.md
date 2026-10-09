# Tareas de la edición bilingüe

Solicitud: todas las lecciones y la interfaz en español e inglés, con selección de idioma.
Fecha de trabajo: 9 de octubre de 2026.

## Reparto

Las seis tareas de implementación se asignaron a agentes **GPT-6 Luna**, razonamiento **max**, con ámbitos de escritura separados. La integración y verificación se realizan en el chat principal.

| Tarea | Alcance | Responsable | Estado |
| --- | --- | --- | --- |
| T1 | Interfaz completa, páginas, selector de idioma y metadatos | Herschel | Completada |
| T2 | Traducción de módulos 01–04: 19 lecciones e inventarios | Volta | Completada |
| T3 | Traducción de módulos 05–06: 21 lecciones e inventarios | Darwin | Completada |
| T4 | Traducción de módulos 07–08: 16 lecciones e inventarios | Mencius | Completada |
| T5 | Traducción de módulos 09–11: 20 lecciones e inventarios | Carson | Completada |
| T6 | Traducción de módulos 12–15: 20 lecciones e inventarios | Aristotle | Completada |
| T7 | Colecciones, currículo bilingüe, integración, documentación y pruebas | Chat principal | Completada |

## Criterios de aceptación

- 96 artículos completos en cada idioma: 83 principales y 13 complementarios.
- Español en las rutas existentes; inglés en `/en/` y `/en/lessons/<id>/`.
- Selector de enlaces que conserva la lección y funciona sin JavaScript.
- Títulos, descripciones, objetivos, requisitos, fuentes, texto y navegación traducidos.
- Identificadores, orden, opcionalidad y duraciones conservados; fechas iguales entre ES/EN, actualizadas únicamente en las dos lecciones corregidas.
- Ejemplos ejecutables idénticos entre ES y EN; se conservan los ejemplos españoles verificados, salvo una corrección justificada de la lista de palabras vacías del proyecto final, aplicada y probada en ambas versiones. Sus identificadores y cadenas pueden conservar el español.
- Progreso compartido por identificador de lección y la clave existente de almacenamiento local.
- Sin traducciones incompletas ocultas por un fallback al español.
- Pruebas de contenido y cobertura, compilación, enlaces/anclas, navegación ES/EN, progreso, móvil y accesibilidad.

## Verificación final

Integración de las seis tareas completada. Resultado de la comprobación del 9 de octubre de 2026:

- `npm run validate`: Astro/TypeScript sin errores, advertencias ni hints; **209 pruebas** de contenido, traducciones, progreso y ejercicios superadas.
- **96 lecciones por idioma**, 192 artículos en total; **196 páginas** estáticas construidas.
- **6.292 enlaces internos y anclas** comprobados, incluidos los selectores y las referencias cruzadas ES/EN.
- Los 49 bloques de código del currículo se conservan idénticos entre los dos idiomas. Se comprobaron sintácticamente 24 bloques Python y se ejecutaron seis ejercicios representativos, no todos los ejercicios del programa.
- `npm run test:e2e`: **24 pruebas Chromium superadas**. Pruebas de navegador ES/EN: cobertura de las 192 rutas de artículos, selector, progreso compartido, búsqueda, filtros, navegación, lectura sin JavaScript, almacenamiento bloqueado/corrupto, teclado, móvil, anclas, errores y accesibilidad automatizada.
- Revisión visual de portada inglesa de escritorio y móvil, artículos móviles y capturas españolas actualizadas.

### Correcciones detectadas durante la revisión

La explicación original del laboratorio defensivo prometía cuatro líneas `OK`, pero su código solo imprime una, y hacía referencia a variables inexistentes (`almacen`, `identidad`). Se corrigió la explicación **en ambos idiomas**, incluida la instrucción para pegar el heredoc completo, sin alterar el código. Se añadió una prueba que ejecuta las dos copias y confirma la salida documentada.

La revisión independiente detectó además que el núcleo del proyecto final retenía palabras frecuentes inglesas como «the», generando resultados irrelevantes cuando era la única coincidencia. Se amplió su lista de palabras vacías para español e inglés **en ambas versiones** y se añadió una regresión con documentos no relacionados. Sigue siendo un recuperador sencillo, no una garantía de relevancia semántica. Estas dos lecciones corregidas tienen fecha editorial del 9 de octubre; las demás conservan su fecha original.

Dos agentes realizaron una segunda revisión editorial cruzada de los **96 pares de lecciones**. Se corrigieron falsos amigos de «fijar» (caracterizar comportamiento o concretar un contrato, no reparar), etiquetas del ejemplo Playwright que debían coincidir con sus selectores, estados de simulaciones y glosas inglesas para identificadores españoles retenidos. No quedaron referencias a requisitos previos sin resolver.

El selector no arrastra anclas de encabezados Markdown traducidos, ya que sus IDs cambian entre idiomas. Conserva las anclas compartidas del temario y de la interfaz, y no falla ante fragmentos URL malformados.

### Límites y publicación

Las pruebas no certifican por sí solas la calidad de todas las explicaciones ni equivalen a una auditoría completa de accesibilidad. No se han ejecutado todos los ejercicios ni repetido la auditoría HTTP de las fuentes externas. Se mantienen las URLs de documentación y las fechas editoriales originales, salvo las dos lecciones corregidas durante la revisión.

La edición bilingüe se publicó manualmente en producción el 9 de octubre de 2026, antes de sincronizar los cambios con Git. Vercel confirmó el estado READY y el alias https://leadtech-school.vercel.app; el usuario confirmó la publicación navegando por producción. No se ejecutaron pruebas automatizadas contra producción. Después de esa confirmación, el usuario solicitó registrar los cambios en Git y enviarlos a `main`.
