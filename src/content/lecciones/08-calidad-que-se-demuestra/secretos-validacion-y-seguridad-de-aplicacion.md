---
title: "Secretos, validación y seguridad de aplicación"
description: "Protege credenciales, valida datos en el servidor y aplica permisos mínimos con una práctica local que no contiene claves reales ni depende de servicios externos."
module: "08-calidad-que-se-demuestra"
order: 5
duration: 40
level: "Intermedio"
objectives:
  - "Diferenciar un secreto de una configuración pública y ubicarlo fuera del cliente."
  - "Diseñar validaciones de entrada y autorización en el servidor para un caso concreto."
  - "Explicar cómo reducir el impacto de una credencial filtrada y verificar controles con datos sintéticos."
prerequisites:
  - "Conocer formularios, solicitudes y respuestas de una aplicación web."
  - "Comprender identidad y permisos básicos."
updatedDate: '2026-10-08'
sources:
  - label: "OWASP: Secrets Management Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html"
  - label: "OWASP: Input Validation Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
---

## Dos controles diferentes

Un secreto permite autenticar o autorizar una operación: una contraseña, clave de API, token de sesión o certificado privado. No es lo mismo que una configuración pública, como el nombre de una función o la URL pública de la aplicación. Cualquier valor distribuido en JavaScript, una aplicación móvil o un archivo descargable debe considerarse visible para quien usa el cliente. No pongas credenciales en el frontend, en ejemplos de documentación, capturas, registros ni commits. Si una clave se filtra, rotarla o revocarla importa más que borrarla de la última versión: puede seguir en historial, cachés o copias.

La validación comprueba que un dato cumple el formato y las reglas esperadas. La autorización decide si una identidad puede realizar una acción sobre un recurso. Son controles distintos: que `task_id` sea un entero válido no demuestra que quien lo envía sea propietario de esa tarea. Valida en el servidor aunque la interfaz ya ayude al usuario; una petición puede construirse fuera de la aplicación. Para un identificador, usa el formato permitido; para un título, fija tipo y longitud; para una operación, consulta la identidad autenticada y la relación con el recurso antes de modificarlo.

En un formulario de perfil, por ejemplo, la aplicación puede aceptar un nombre de entre 1 y 80 caracteres después de quitar espacios. El servidor debe obtener la identidad desde una sesión verificada, no aceptar un campo `owner_id` enviado por el navegador como prueba de propiedad. Devuelve errores que expliquen qué puede corregirse, pero no reveles trazas, consultas, tokens o información de otra persona. Al guardar, escapa o codifica el contenido según el contexto de salida; validar y codificar no son intercambiables.

Una credencial necesita ubicación, permisos, rotación y acceso limitado. En desarrollo usa los mecanismos aprobados del entorno y excluye archivos locales de control de versiones. En producción, prefiere un almacén de secretos o mecanismo del servidor gestionado por el equipo. Concede solo el permiso que necesita la tarea, separa credenciales de prueba y producción, no las imprimas para depurar y evita compartirlas con agentes o servicios no aprobados. “Está en una variable de entorno” es una ubicación, no un plan completo de gestión.

## Ejercicio defensivo con entradas inventadas

Usa un perfil ficticio: `usuario_id = "ana"`, tarea `{id: "T-2", propietario: "ana"}` y título enviado `"  Plan  "`. Define tres resultados del servidor: `aceptado`, `rechazado_por_formato` y `denegado`. Añade al menos los casos de un título vacío, un título de 81 caracteres, la misma identidad y otra identidad. No uses nombres o tokens reales.

1. Escribe primero la regla: solo la persona propietaria puede modificar el título; la longitud permitida es 1–80 después de recortar espacios.
2. Marca cada entrada como válida o inválida y cada actor como autorizado o denegado.
3. Describe dónde se comprueba identidad, dónde se valida texto y qué resultado devuelve cada caso.
4. Repite el análisis imaginando que el navegador envía `propietario: "ana"` pero la sesión pertenece a `leo`. Debe prevalecer la identidad autenticada del servidor.
5. Anota qué credencial necesitaría una integración externa y qué componente la leería; no escribas un valor de ejemplo que pueda confundirse con una clave real.

## Comprobación y solución

La regla produce `aceptado` para Ana con “Plan”; `rechazado_por_formato` para una cadena vacía o de 81 caracteres; `denegado` para Leo aunque el título sea válido. La identidad del cuerpo de la petición no cambia el resultado. La actividad se verifica comparando cada caso con esas reglas y no necesita API, cuenta ni red. Si tu matriz deja un caso sin resultado o hay una combinación con dos respuestas, aclara el orden de validación y documenta el comportamiento esperado.

Para un código real, añade tests negativos y revisa también la configuración: busca valores sensibles en el diff y registros, comprueba que la clave se use solo del lado servidor, y confirma que permisos de lectura y escritura estén separados cuando sea viable. Una prueba local demuestra el caso ejercitado, no que toda la aplicación quede protegida.

## Errores frecuentes

- **Confiar en que ocultar una variable en frontend la convierte en secreto.** Si se entrega al cliente, puede inspeccionarse; mueve la operación al servidor.
- **Validar solo en JavaScript.** Repite controles en el límite confiable y rechaza entradas inválidas antes de usarlas.
- **Confundir formato con permiso.** Verifica identidad y propiedad para cada recurso, no solo que el identificador exista.
- **Dejar una clave filtrada y borrar el archivo.** Revoca o rota la credencial, investiga su alcance y elimina la exposición secundaria.
- **Conceder permisos amplios para evitar errores.** Reduce el alcance y añade solo la capacidad que el flujo necesita.

## Resumen

Guarda secretos fuera del cliente, limita su acceso y prepara una respuesta ante filtraciones. Valida tipos, tamaños y reglas en el servidor, y comprueba autorización por recurso con la identidad autenticada. Una matriz sintética hace visibles las decisiones sin credenciales reales; ninguna prueba aislada garantiza la seguridad completa.
