---
title: "Una API tipada de extremo a extremo con tRPC"
description: "Construye un router mínimo con entrada validada, infiere los tipos para el cliente y distingue la comodidad de TypeScript de la seguridad en tiempo de ejecución."
module: "13-talleres-para-profundizar"
order: 4
duration: 60
level: "Intermedio"
objectives:
  - "Explicar cómo se infieren en el cliente los tipos exportados por un router tRPC."
  - "Definir procedimientos de consulta y validar entradas en tiempo de ejecución."
  - "Identificar cuándo conviene tRPC y qué controles siguen siendo responsabilidad del servidor."
prerequisites:
  - "Conocer TypeScript, funciones asíncronas y objetos."
  - "Entender validación de datos y el propósito de una API cliente-servidor."
updatedDate: "2026-10-08"
sources:
  - label: "Documentación oficial de tRPC: quickstart"
    url: "https://trpc.io/docs/quickstart"
  - label: "Documentación oficial de tRPC: routers"
    url: "https://trpc.io/docs/server/routers"
  - label: "Documentación oficial de tRPC: procedimientos"
    url: "https://trpc.io/docs/server/procedures"
---

## Una firma compartida, no una frontera de confianza

tRPC permite describir procedimientos de servidor en TypeScript y usar el tipo del router para que un cliente compatible conozca nombres, entradas y salidas durante el desarrollo. Eso reduce desajustes manuales entre dos definiciones de una API. No convierte TypeScript en validación de datos de red: un navegador puede enviar valores distintos de los que promete su tipo. La aplicación todavía necesita validadores en ejecución, autenticación, autorización, límites y manejo de errores.

Piensa en una consulta que devuelve el estado de un ticket por identificador. Una operación que solo lee datos debe expresarse como `query`; una operación que cambia estado, como asignar el ticket, se modela como `mutation`. Esa distinción comunica intención al cliente, pero no garantiza por sí sola que el resolver sea de solo lectura. El código que ejecuta la operación debe respetar esa regla.

## Router con entrada validada

La siguiente pieza muestra el núcleo del servidor para un ticket ficticio. `zod` valida que el dato exista antes de entrar en el resolver; el tipo de la salida se infiere del valor devuelto. El ejemplo no crea un servidor HTTP completo: el adaptador depende del framework de la aplicación y debe configurarse por separado.

```ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  ticketById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ input }) => ({ id: input.id, status: 'open' as const })),
});

export type AppRouter = typeof appRouter;
```

Exportar `AppRouter` como tipo permite al cliente usarlo sin importar el código de ejecución del servidor. En una aplicación real, el cliente puede configurarse con `createTRPCClient<AppRouter>` y un link HTTP apuntando a la URL de su adaptador. Entonces una llamada como `client.ticketById.query({ id: 'T-17' })` ofrece autocompletado y errores de compilación ante un nombre o forma incompatibles. La petición sigue cruzando una frontera de red; hay que probar también esa frontera.

## Actividad ejecutable sin instalar dependencias

Si no tienes un proyecto TypeScript preparado, realiza el ejercicio en una tabla. Anota procedimiento, tipo, entrada permitida, salida, usuario autorizado y efecto lateral. Para `ticketById`, una cadena vacía debe rechazarse antes de ejecutar la consulta. Para un procedimiento `closeTicket`, pregunta si es lectura o cambio y decide qué identidad y permiso hacen falta. No marques una columna «seguro porque está tipado»: especifica el control concreto.

Con un proyecto tRPC ya instalado, adapta el router pequeño a los patrones existentes y ejecuta el verificador de tipos y pruebas del repositorio. Añade casos para entrada correcta, cadena vacía, identificador desconocido, ausencia de sesión y usuario que intenta leer un ticket ajeno. Comprueba una llamada real a través del adaptador configurado; llamar solo a una función interna no valida serialización, transporte ni autenticación del middleware.

## Validación y errores comunes

Si el cliente no recibe tipos, comprueba que el tipo exportado corresponde al router final y que el cliente importa `AppRouter` como `type`, desde una ruta accesible al compilador. Si TypeScript acepta una entrada incorrecta en el cliente pero el servidor la rechaza, eso puede ser correcto: la validación del servidor es autoridad en tiempo de ejecución. Si la acepta en ambos, revisa el esquema, no añadas un `as` para silenciar el error.

Un fallo frecuente es crear múltiples inicializaciones de tRPC y obtener contextos o tipos divergentes; la guía de routers recomienda inicializar una vez. Otro es usar una consulta para escribir en base de datos, lo que sorprende a clientes que reintentan o cachean lecturas. También es un error exponer procedimientos privados como `publicProcedure` sin middleware de autorización. El hecho de que el usuario tenga permiso para abrir la interfaz no demuestra que pueda consultar cada identificador que envía.

## Cuándo elegirlo

tRPC encaja cuando cliente y servidor comparten TypeScript y el contrato puede derivarse del código del servidor. Si necesitas que consumidores en varios lenguajes descubran una API pública estable, evalúa REST con OpenAPI u otro contrato explícito. Elige por los clientes y la evolución del sistema, no por el atractivo del autocompletado.

## Cierre

Una API tipada acorta la distancia entre implementación y consumo, pero no borra el protocolo ni sus riesgos. Define el router una vez, valida cada entrada externa, separa consultas de cambios y prueba permisos con la llamada que realmente atraviesa el adaptador.
