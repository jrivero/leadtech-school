---
title: "Clean Architecture desde cero"
description: "Separa reglas del negocio de mecanismos como web y base de datos, siguiendo el sentido de las dependencias en una arquitectura comprensible."
module: "04-arquitectura-que-puedes-entender"
order: 1
duration: 45
level: "Intermedio"
objectives:
  - "Distinguir reglas de negocio de detalles técnicos externos."
  - "Explicar la regla de dependencias hacia el núcleo en Clean Architecture."
  - "Trazar el flujo de un caso de uso y ubicar puertos y adaptadores."
prerequisites:
  - "Conocer funciones, separación de responsabilidades y requisitos"
updatedDate: "2026-10-08"
sources:
  - label: "Robert C. Martin: The Clean Architecture"
    url: "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html"
---

## Protege las reglas que explican el producto

Clean Architecture es una familia de ideas para separar las políticas importantes del negocio de los mecanismos que permiten ejecutarlas. Un sistema de biblioteca puede aplicar la regla «un socio activo no mantiene más de tres préstamos». Esa regla debería poder entenderse sin saber si la aplicación usa una página web, una terminal o una base de datos concreta.

Robert C. Martin describe como regla central que las dependencias del código apunten hacia políticas más internas. El núcleo no importa clases de un framework web ni consulta directamente una tabla. Los detalles externos se adaptan a interfaces definidas hacia dentro. Esto no impide que durante la ejecución una petición llegue desde la web hasta el caso de uso y después se guarden datos; el sentido del flujo de control y el sentido de las dependencias en el código son preguntas diferentes.

## Capas mediante un caso de uso

Imagina la operación «prestar un libro». Una interfaz recibe los datos y los convierte en una petición de aplicación. El caso de uso valida el estado del socio, consulta la disponibilidad mediante una abstracción de repositorio, aplica la regla y devuelve un resultado. Un adaptador concreto puede leer o guardar en SQLite, en un archivo o en otro servicio. Otro adaptador podría ser una pantalla de consola.

Puedes visualizarlo así:

```text
Interfaz web/terminal → caso de uso → reglas del dominio
                           ↓
                    puerto de repositorio
                           ↑
              adaptador de archivo o base de datos
```

El núcleo conoce el puerto, no el adaptador concreto. Una prueba puede proporcionar un repositorio falso en memoria para comprobar las reglas sin arrancar un servidor ni preparar una base real. Si cambia la tecnología de persistencia, implementas otro adaptador compatible y conservas el caso de uso mientras el contrato siga siendo válido.

## No es una plantilla de carpetas

El nombre de una carpeta no vuelve limpia una arquitectura. Puedes tener carpetas llamadas `entities`, `use_cases` e `infrastructure` y seguir acoplando el negocio a una biblioteca externa. La pregunta útil es qué módulo importa a cuál y qué detalles pueden cambiar sin propagar cambios. En una aplicación diminuta quizá basta con dos funciones y una interfaz clara; añadir muchas capas puede ocultar una regla simple.

Aplica el patrón donde haya una razón: una integración volátil, reglas de negocio que deben probarse aparte, o varios canales que usan los mismos casos de uso. Si solo existe un script de una tarde, separar cada instrucción en un adaptador añade mantenimiento sin aislar riesgo. La arquitectura es una decisión sobre límites, no una ceremonia obligatoria.

## Práctica paso a paso

1. Elige una operación, como aprobar un gasto o prestar un libro.
2. Subraya las reglas que existirían aunque no hubiese pantalla ni base de datos.
3. Marca los detalles externos: entrada HTTP, reloj, almacenamiento y correo.
4. Dibuja qué componente invoca al caso de uso y qué información debe devolver.
5. Define una interfaz pequeña para el almacenamiento, como `buscar_libro(id)` y `guardar_prestamo(prestamo)`.
6. Prueba la regla con datos en memoria y verifica que no necesita importar el framework externo.

## Comprobación y errores frecuentes

El límite está bien planteado si puedes cambiar un detalle —por ejemplo, el mecanismo de persistencia— sin reescribir la regla del negocio, y si el caso de uso puede probarse sin conexiones reales. Si el dominio conoce nombres de tablas o respuestas HTTP, la dependencia probablemente cruza hacia fuera. Si una interfaz replica toda la base de datos, quizá la abstracción es demasiado amplia.

No confundas Clean Architecture con microservicios, ni crees interfaces para cada función sin una necesidad. No escondas errores de almacenamiento como si el préstamo se hubiera guardado. Mantén visible el resultado de cada operación y define qué hace el sistema si una dependencia no responde.

## Resumen

Separa políticas centrales de mecanismos externos y haz que el código interno dependa de contratos pequeños, no de frameworks. Traza tanto llamadas como imports, prueba reglas con adaptadores falsos y añade capas solo cuando un límite reduzca un coste real.
