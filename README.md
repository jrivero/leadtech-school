# Leadtech School · Desarrollo con IA

MVP estático en **Astro**, en español, centrado exclusivamente en aprender **desarrollo de software con inteligencia artificial**. Incluye una landing, artículos originales en Markdown y progreso local, sin cuentas ni backend.

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

El resultado es `dist/`, publicable en la raíz de un dominio en un alojamiento de archivos estáticos. Las rutas son absolutas desde `/`; para servir dentro de un subdirectorio hay que adaptar la configuración `base` y los enlaces antes de desplegar. No se ha contratado ni configurado un dominio ni se ha desplegado un sitio público. La aplicación no necesita clave de API ni variables de entorno. Algunas actividades de los artículos usan herramientas externas opcionales, con sus propios requisitos y posibles costes.

## Qué incluye

- Un único recorrido de desarrollo con IA, no un catálogo de otros másteres.
- **12 bloques y 83 lecciones principales**, más **13 complementos**: diez talleres escritos, dos temas extra y una práctica final.
- Títulos reformulados, explicaciones originales, objetivos, ejercicios, comprobaciones y fuentes oficiales.
- Landing responsive con temario, búsqueda, filtros de fase, metodología y preguntas frecuentes.
- Páginas de lectura con índice, requisitos previos, navegación del módulo y anterior/siguiente.
- Marca de completado almacenada en `localStorage`, clave `leadtech:completed:v1`, solo en el navegador actual. No se sincroniza, no identifica al estudiante y no equivale a aprobar un examen.
- Contenido y navegación disponibles sin JavaScript. Búsqueda, filtros y progreso son mejoras de cliente.
- HTML estático, metadatos por artículo, idioma español, HTML semántico y sin fuentes, imágenes o analítica remotas.

## Estructura

```text
src/data/curriculum.json             Inventario de temas y orden
src/content.config.ts               Esquema de metadatos y colección Astro
src/content/lecciones/<modulo>/*.md  Artículos editables
src/lib/curriculum.ts                Relación validada currículo ↔ artículos
src/lib/progress.ts                  Funciones de progreso local
src/pages/index.astro                Landing
src/pages/lecciones/[...id].astro    Generación estática de artículos
src/layouts/BaseLayout.astro         Cabecera, pie y metadatos
src/styles/global.css               Diseño responsive
scripts/                            Validación de contenidos, ejercicios, progreso y build
tests/                              Pruebas de navegador y accesibilidad
docs/temario-y-alcance.md            Procedencia, correspondencia y límites
```

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

El cuerpo empieza con `##`, no con `#`: la plantilla genera el único H1. Las duraciones son estimaciones propias de estudio, no horas acreditadas. Si agregas o eliminas una lección, actualiza ambos lados; el build falla deliberadamente ante artículos ausentes, huérfanos o metadatos discordantes. Para cambiar la cobertura del programa hay que revisar también los tests de inventario.

## Comprobaciones

```sh
npm run check       # Tipos y diagnósticos Astro
npm test            # Contenido, progreso, sintaxis y cuatro ejercicios Python
npm run validate    # Lo anterior + build + enlaces/anclas internos
npm run test:e2e    # Chromium: navegación, búsqueda, progreso, móvil y axe
npm run test:all    # Validación completa
npm run audit:sources # Optativo: disponibilidad HTTP de fuentes externas
```

Las pruebas E2E necesitan un build previo y Chromium compatible con Playwright. Si no está instalado, `npx playwright install chromium` descarga el navegador; esa descarga no es necesaria para servir o construir el sitio. La configuración de Playwright inicia automáticamente `astro preview` en primer plano con `--ignore-lock` en un puerto dedicado, 4322, y no reutiliza servidores de desarrollo. El flag evita el auto-background de Astro en entornos de agentes, de modo que Playwright controla el ciclo de vida del proceso. Deja ese puerto libre al ejecutar las pruebas.

Se comprueba la sintaxis de los bloques Python y se ejecutan cuatro ejemplos locales representativos (biblioteca, gastos, gestor de tareas y SQL/JSON/vectores). Los ejercicios restantes no se ejecutan automáticamente. Si Python no está disponible, esas comprobaciones se omiten: la aplicación Astro no lo necesita.

Los tests automatizados revisan estructura y comportamiento; no garantizan por sí solos la corrección pedagógica de todos los artículos, la vigencia futura de las herramientas ni la ejecución de todos los ejercicios. Las actividades que usan servicios externos deben revisarse antes de introducir datos sensibles o realizar gastos. La evaluación de accesibilidad automatizada tampoco sustituye pruebas manuales con tecnologías de apoyo.

## Contenido y límites

Leadtech School desarrolla artículos, ejemplos y prácticas propios para aprender desarrollo de software con IA. Consulta `docs/temario-y-alcance.md` para conocer la estructura y el alcance del MVP.

La formación es autónoma y no concede acreditaciones oficiales. No hay matrícula, pagos, autenticación, tutorías ni evaluación oficial. Los complementos son textos y ejercicios, no grabaciones de clases.

El siguiente objetivo editorial es revisar y ampliar el contenido propio: comprobar explicaciones y ejercicios, mejorar la progresión y añadir ejemplos y proyectos con criterios de verificación. Esta revisión pedagógica no se considera completada por las pruebas automatizadas.
