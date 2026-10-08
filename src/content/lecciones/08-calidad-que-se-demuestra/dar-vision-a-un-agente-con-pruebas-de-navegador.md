---
title: "Dar visión a un agente con pruebas de navegador"
description: "Usa Playwright para expresar recorridos visibles con localizadores accesibles y aserciones estables, dando al agente feedback reproducible sin depender de servicios remotos."
module: "08-calidad-que-se-demuestra"
order: 11
duration: 45
level: "Intermedio"
objectives:
  - "Diseñar una prueba de navegador para una tarea concreta usando roles y nombres comprensibles."
  - "Distinguir evidencia del DOM, una aserción y una captura visual durante la revisión."
  - "Mantener el recorrido en una aplicación local y evitar esperas o datos externos innecesarios."
prerequisites:
  - "Conocer HTML, formularios y pruebas automatizadas básicas."
  - "Poder describir el resultado visible de una interacción."
updatedDate: '2026-10-08'
sources:
  - label: "Playwright: documentación de localizadores"
    url: "https://playwright.dev/docs/locators"
  - label: "Playwright: aserciones y espera automática"
    url: "https://playwright.dev/docs/test-assertions"
---

## Qué ve un agente en el navegador

Una prueba de navegador transforma una acción humana en un recorrido repetible: abrir una pantalla, introducir datos, activar un control y comprobar el resultado visible. Playwright ofrece localizadores por rol, nombre accesible, etiqueta y texto para dirigirse a elementos como lo haría una persona. Sus aserciones de prueba esperan una condición durante un intervalo configurado, lo que suele ser más estable que pausar el navegador durante una cantidad fija de tiempo. Consulta la documentación de la versión instalada, porque las opciones pueden evolucionar.

El navegador aporta evidencia diferente de una prueba unitaria. Puede descubrir que el botón no está conectado al formulario o que el estado no aparece en la pantalla. Un árbol accesible revela nombres y roles; una captura ayuda a revisar composición visual; una aserción confirma una condición concreta. Ninguno reemplaza los otros: una imagen bonita no demuestra que el teclado funcione, y un test que encuentra texto no comprueba necesariamente que el diseño sea usable. Para un agente, los resultados deben volver como señales acotadas: fallo, localizador, estado relevante y captura cuando aporte contexto.

Un test fiable usa una ruta local, datos deterministas y una tarea clara. Evita llamadas a API de pago, autenticación real, contenido que cambia cada minuto y selectores basados en clases internas si el nombre de usuario está disponible. No expongas credenciales para que el navegador automatizado acceda a producción. Mantén el entorno aislado y limpia el estado entre pruebas; de lo contrario, el test puede depender de lo ejecutado antes.

## Ejemplo con una tarea local

El siguiente test de TypeScript presupone una página `demo.html` servida por el proyecto y una estructura con una etiqueta “Nueva tarea”, un botón “Añadir” y una lista que muestra tareas. Es código real de Playwright Test, no un comando autónomo: necesita el paquete y la configuración de runner del proyecto. No visita un servicio externo.

```typescript
import { test, expect } from '@playwright/test';

test('añade una tarea a la lista', async ({ page }) => {
  await page.goto('/demo.html');
  await page.getByLabel('Nueva tarea').fill('Preparar demo');
  await page.getByRole('button', { name: 'Añadir' }).click();
  await expect(page.getByRole('list')).toContainText('Preparar demo');
});
```

Los localizadores describen la intención: rellenar un campo identificado por etiqueta, pulsar un botón con nombre y observar una lista. Si `getByLabel` no encuentra el control, revisa primero si la etiqueta está asociada; no lo reemplaces de inmediato por un selector frágil. Si hay varias listas, etiqueta la región o localiza el contenedor apropiado para que la aserción no pase por encontrar texto en otra zona.

## Actividad paso a paso

1. Escribe el recorrido antes del test: estado inicial, acción y resultado que debe percibir una persona.
2. Prepara una página local con controles semánticos y nombres visibles; usa tareas inventadas.
3. Implementa el test de ejemplo o adapta sus etiquetas a la interfaz real. No añadas `waitForTimeout` para ocultar una condición desconocida.
4. Ejecuta Playwright con la configuración ya instalada en tu proyecto. Si falta el navegador o el runner, detén el ejercicio y registra ese requisito; no descargues nada sin autorización.
5. Cambia el nombre del botón de forma temporal y observa cómo el test falla. Restaura el nombre esperado y vuelve a ejecutar.
6. Revisa el resultado con teclado y una captura; anota qué evidencia proporciona cada herramienta y qué no comprueba.

## Verificación y solución

El test pasa cuando el campo se identifica por etiqueta, el botón por nombre y la tarea aparece en la lista tras la acción. Si falla al localizar el campo, comprueba el vínculo `<label for>` y el `id`; si falla al final, revisa si el evento actualiza la lista o si el test busca en un contenedor equivocado. Una espera de aserción permite que la interfaz responda; no arregla una funcionalidad que no actualiza el estado.

La prueba local se puede ejecutar sin API, cuenta ni coste de proveedor. La dependencia de Playwright y el navegador debe estar ya disponible; instalarla es una decisión aparte. Al compartir resultados con un agente, elimina datos sensibles de capturas, trazas y registros, y limita la sesión a un entorno de prueba.

## Errores frecuentes

- **Usar `sleep` para estabilizar toda prueba.** Espera una condición significativa y busca la causa del estado lento.
- **Seleccionar por posición o clase interna.** Prefiere rol, etiqueta y nombre accesible cuando describen el control.
- **Afirmar solo que la página cargó.** Comprueba una acción y el resultado que satisface el requisito.
- **Interpretar una captura como prueba completa.** Añade teclado, semántica, mensajes de error y revisión de estados.
- **Automatizar producción con credenciales reales.** Usa datos ficticios y un servidor local o entorno aislado autorizado.

## Resumen

Playwright puede dar feedback reproducible sobre recorridos reales en el navegador. Escribe pruebas centradas en tareas con localizadores accesibles y aserciones de resultado; mantén datos locales y revisa la semántica además de la imagen. La automatización informa sobre el escenario ejecutado, no certifica la interfaz entera.
