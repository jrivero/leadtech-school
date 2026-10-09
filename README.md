# Leadtech School · Desarrollo con IA

Plataforma estática en **Astro**, en español e inglés, centrado exclusivamente en aprender **desarrollo de software con inteligencia artificial**. Incluye una landing, artículos originales en Markdown y progreso local, sin cuentas ni backend.

## Arrancar

Requisitos: Node.js **22.12 o superior**, npm y un navegador moderno. La versión exacta de las dependencias queda fijada en `package-lock.json`.

```sh
npm ci
npm run dev
```

Abre **http://127.0.0.1:4321**. Para producción:

```sh
npm run build
npm run preview
```

El resultado es `dist/`, publicable en la raíz de un dominio en un alojamiento de archivos estáticos. Las rutas son absolutas desde `/`; para servir dentro de un subdirectorio hay que adaptar la configuración `base` y los enlaces antes de desplegar. La web está publicada en https://leadtech-school.vercel.app; no se ha configurado un dominio propio. La aplicación no necesita clave de API ni variables de entorno. Algunas actividades de los artículos usan herramientas externas opcionales, con sus propios requisitos y posibles costes.

## Despliegue en Vercel

Web pública: **https://leadtech-school.vercel.app**.

El proyecto `leadtech-school` está conectado al repositorio `jrivero/leadtech-school`. La rama de producción es `main`; los próximos cambios enviados a esta rama se desplegarán mediante la integración Git de Vercel.

La configuración versionada en `vercel.json` usa el preset Astro, `npm ci`, `npm run build` y salida `dist/`. No necesita variables de entorno ni un adaptador de servidor. Se fuerza npm para utilizar `package-lock.json`, aunque el repositorio también contiene un lockfile de pnpm.

Para desplegar manualmente desde una cuenta autorizada: `vercel link --project leadtech-school` y `vercel deploy --prod`. Los archivos locales de `.vercel/` y `.env*` no se suben a Git. `.vercelignore` excluye documentación y pruebas de la subida de código por CLI.

## Qué incluye

- Un único recorrido de desarrollo con IA, no un catálogo de otros másteres.
- **12 bloques y 83 lecciones principales**, más **13 complementos**: diez talleres escritos, dos temas extra y una práctica final.
- Los **96 artículos completos en español e inglés**, con títulos, explicaciones, objetivos, ejercicios, comprobaciones y fuentes.
- Selector Español / English en la cabecera, disponible también en móvil y sin JavaScript; conserva la lección al cambiar de idioma.
- Landing responsive con temario, búsqueda, filtros de fase, metodología y preguntas frecuentes.
- Páginas de lectura con índice, requisitos previos, navegación del módulo y anterior/siguiente.
- Marca de completado almacenada en `localStorage`, clave `leadtech:completed:v1`, solo en el navegador actual. No se sincroniza, no identifica al estudiante y no equivale a aprobar un examen.
- Contenido y navegación disponibles sin JavaScript. Búsqueda, filtros y progreso son mejoras de cliente.
- HTML estático, metadatos por artículo, idioma `es` / `en`, enlaces alternativos `hreflang`, HTML semántico y sin fuentes, imágenes o analítica remotas.

## Estructura

```text
src/data/curriculum.json             Inventario de temas y orden
src/content.config.ts               Esquema de metadatos y colección Astro
src/content/lecciones/<modulo>/*.md  Artículos en español
src/content/en/<modulo>/*.md         Traducciones completas al inglés
src/data/i18n/en.json                Alcance y fases en inglés
src/data/i18n/en/<modulo>.json        Módulos y títulos de lecciones en inglés
src/lib/i18n.ts                     Idiomas y rutas con IDs compartidos
src/lib/curriculum.ts                Relación validada currículo ↔ artículos
src/lib/progress.ts                  Funciones de progreso local
src/pages/index.astro                Landing española
src/pages/en/index.astro             Landing inglesa
src/components/HomePage.astro        Plantilla bilingüe de portada
src/components/LessonPage.astro      Plantilla bilingüe de lección
src/pages/lecciones/[...id].astro    Artículos en español
src/pages/en/lessons/[...id].astro    Artículos en inglés
src/layouts/BaseLayout.astro         Cabecera, pie y metadatos
src/styles/global.css               Diseño responsive
scripts/                            Validación de contenidos, ejercicios, progreso y build
tests/                              Pruebas de navegador y accesibilidad
docs/temario-y-alcance.md            Procedencia, correspondencia y límites
```

## Idiomas y rutas

El español conserva `/` y `/lecciones/<modulo>/<slug>/`, de modo que los enlaces existentes siguen funcionando. El inglés usa `/en/` y `/en/lessons/<modulo>/<slug>/`. Los identificadores y slugs se mantienen idénticos en ambos idiomas: la URL inglesa puede contener palabras españolas, pero el artículo y la interfaz se muestran en inglés.

El selector es navegación real, no una traducción automática en el navegador. Respeta siempre el idioma de la URL solicitada, sin redireccionar según el idioma del navegador. `html[lang]`, título, descripción y enlaces alternativos identifican la versión correcta. Las URLs canónicas usan el dominio configurado en `astro.config.mjs`.

El progreso se comparte entre los idiomas con la clave existente `leadtech:completed:v1`: completar una lección en español también la muestra completada en inglés. Se conserva solo en el navegador actual. Si el almacenamiento está bloqueado, se puede seguir leyendo y cambiar de idioma.

Los bloques de código se conservan **idénticos entre los dos idiomas**, partiendo de los ejercicios españoles ya verificados. Sus identificadores, comentarios y datos de ejemplo pueden estar en español; las explicaciones que los acompañan están traducidas. No se han actualizado afirmaciones técnicas ni fechas de revisión por el mero hecho de traducir. Dos correcciones verificadas —la explicación del laboratorio defensivo y la lista de palabras vacías del proyecto final— se aplicaron en ambos idiomas y se fecharon el 9 de octubre de 2026.

Consulta `docs/traduccion-ingles.md` para el reparto de tareas y los resultados de la revisión.

## Editar una lección

Cada entrada debe tener el mismo título, módulo, orden y slug que su registro en `src/data/curriculum.json`. El identificador es `<modulo>/<slug>`, y la URL `/lecciones/<modulo>/<slug>/`.

```yaml
---
title: 'Título que figura en el currículo'
description: 'Descripción propia, concreta y suficiente para explicar el tema.'
module: '01-empieza-aqui'
order: 1
duration: 25
level: 'Inicial'
objectives:
  - 'Una capacidad concreta y verificable.'
  - 'Una segunda capacidad de aprendizaje.'
  - 'Una tercera capacidad de aprendizaje.'
prerequisites: []
updatedDate: '2026-10-08'
sources:
  - label: 'Documentación oficial'
    url: 'https://docs.python.org/3/'
---
```

Para cada lección española debe existir su traducción en `src/content/en/<modulo>/<slug>.md`, con el mismo módulo, orden, duración, fecha y URLs de fuentes. Actualiza también su título en `src/data/i18n/en/<modulo>.json`. El nivel inglés usa `Beginner` o `Intermediate`. Traduce descripción, objetivos, requisitos, etiquetas de fuentes y el cuerpo completo; conserva los identificadores y los bloques de código. Al añadir módulos, crea su inventario inglés con la misma estructura y actualiza las fases si procede.

El cuerpo empieza con `##`, no con `#`: la plantilla genera el único H1. Las duraciones son estimaciones propias de estudio, no horas acreditadas. Si agregas o eliminas una lección, actualiza el inventario y los artículos en ambos idiomas; el build falla deliberadamente ante artículos ausentes, huérfanos o metadatos discordantes. Para cambiar la cobertura del programa hay que revisar también los tests de inventario.

## Comprobaciones

```sh
npm run check       # Tipos y diagnósticos Astro
npm test            # Contenido ES/EN, paridad, progreso, sintaxis y seis ejercicios Python
npm run validate    # Lo anterior + build + enlaces/anclas internos
npm run test:e2e    # Chromium ES/EN: selector, navegación, búsqueda, progreso, móvil y axe
npm run test:all    # Validación completa
npm run audit:sources # Optativo: disponibilidad HTTP de fuentes externas
```

Las pruebas E2E necesitan un build previo y Chromium compatible con Playwright. Si no está instalado, `npx playwright install chromium` descarga el navegador; esa descarga no es necesaria para servir o construir el sitio. La configuración de Playwright inicia automáticamente `astro preview` en primer plano con `--ignore-lock` en un puerto dedicado, 4322, y no reutiliza servidores de desarrollo. El flag evita el auto-background de Astro en entornos de agentes, de modo que Playwright controla el ciclo de vida del proceso. Deja ese puerto libre al ejecutar las pruebas.

Se verifica que las 96 traducciones mantienen secciones, metadatos y fuentes, y que los bloques de código son idénticos al original. Se comprueba la sintaxis de los bloques Python y se ejecutan seis ejemplos locales representativos (biblioteca, gastos, gestor de tareas, SQL/JSON/vectores, laboratorio defensivo y núcleo del proyecto final con casos españoles e ingleses). Los ejercicios restantes no se ejecutan automáticamente. Si Python no está disponible, esas comprobaciones se omiten: la aplicación Astro no lo necesita.

Los tests automatizados revisan estructura y comportamiento; no garantizan por sí solos la corrección pedagógica de todos los artículos, la vigencia futura de las herramientas ni la ejecución de todos los ejercicios. Las actividades que usan servicios externos deben revisarse antes de introducir datos sensibles o realizar gastos. La evaluación de accesibilidad automatizada tampoco sustituye pruebas manuales con tecnologías de apoyo.

## Contenido y límites

Leadtech School desarrolla artículos, ejemplos y prácticas propios para aprender desarrollo de software con IA. Consulta `docs/temario-y-alcance.md` para conocer la estructura y el alcance del MVP.

La formación es autónoma y no concede acreditaciones oficiales. No hay matrícula, pagos, autenticación, tutorías ni evaluación oficial. Los complementos son textos y ejercicios, no grabaciones de clases.

El siguiente objetivo editorial es revisar y ampliar el contenido propio: comprobar explicaciones y ejercicios, mejorar la progresión y añadir ejemplos y proyectos con criterios de verificación. Esta revisión pedagógica no se considera completada por las pruebas automatizadas.
