---
title: "OpenClaw y los asistentes persistentes"
description: "Entiende OpenClaw como asistente persistente y diseña una prueba de permisos mínimos con datos ficticios, sin conectar correo, calendario ni control general."
module: "06-tu-caja-de-herramientas-ia"
order: 14
duration: 45
level: "Inicial"
objectives:
  - "Explicar qué persiste en un asistente conectado a OpenClaw y qué depende de su configuración."
  - "Separar las políticas de herramientas, las aprobaciones y el aislamiento del entorno."
  - "Diseñar una actividad de prueba que no use cuentas personales ni permisos amplios."
prerequisites:
  - "elegir-herramientas-sin-perder-el-control"
  - "privacidad-sesgos-y-uso-responsable"
updatedDate: '2026-10-08'
sources:
  - label: "OpenClaw: qué es OpenClaw"
    url: "https://docs.openclaw.ai/help/faq/what-is-openclaw"
  - label: "OpenClaw: permisos de herramientas"
    url: "https://docs.openclaw.ai/gateway/security/tool-permissions"
  - label: "OpenClaw: aprobaciones de ejecución"
    url: "https://docs.openclaw.ai/tools/exec-approvals"
---

## Idea central — explicación conceptual

OpenClaw es un asistente que puedes ejecutar sobre infraestructura que administras. Su Gateway es el plano de control siempre disponible; el producto puede ofrecer sesiones con estado, memoria y espacio de trabajo que persisten entre interacciones, además de canales y herramientas configurables. Eso no significa que recuerde todo para siempre ni que una respuesta previa sea una fuente fiable: la persistencia y su alcance dependen de la configuración, y conviene revisar qué se conserva y cómo se elimina.

La persistencia es útil si un asistente necesita retomar un contexto de trabajo, pero también aumenta lo que debe protegerse. El Gateway responde por los canales configurados y puede enrutar tareas a proveedores de modelo. La documentación distingue proveedores externos y una opción de modelo local; por tanto, alojar el Gateway en tu equipo no basta para concluir dónde se procesan los prompts. Verifica qué modelo y servicios están activos antes de introducir datos. Decide también qué información puede conservarse y cuánto tiempo; si compartes el Gateway, confirma identidades, roles y políticas de canales. La documentación contempla despliegues multiusuario y distingue quién inició o es propietario de cada sesión.

Permisos, aprobaciones y aislamiento son controles distintos. Las guías actuales explican que Full Access, incluido el modo predeterminado Full Access, puede autorizar cambios permitidos sin pedir aprobación; los modos restringidos sí pueden requerirla. Una lista de herramientas y un espacio de trabajo limitado definen el alcance; el sandbox busca aislar la ejecución. No supongas que activar uno de esos controles compensa la ausencia de los demás. Si no puedes confirmar qué política aplica en la versión que usas, no habilites acciones.

## Ejemplo concreto

Quieres un ayudante que resuma una lista ficticia de tareas de un proyecto escolar. La meta es recibir un resumen en el chat, no actualizar el gestor, mandar mensajes ni crear citas. Para esa tarea bastan un texto de ejemplo y una respuesta redactada. Leer el correo, consultar un calendario, controlar dispositivos o ejecutar órdenes no aporta nada: se excluye desde el diseño, aunque el asistente pudiera ofrecer esas integraciones.

## Práctica guiada — receta

1. Formula el rol en una frase verificable: «Resume estas tres tareas ficticias en un párrafo y no cambies ni envíes nada».
2. Escribe tres registros inventados en una hoja o documento desechable. No uses nombres reales, credenciales, mensajes de trabajo ni información de clientes.
3. Dibuja una matriz con cuatro columnas: acción, dato accesible, efecto posible y decisión. Para este caso permite leer solo el texto ficticio y redactar una respuesta; exige revisión humana antes de escribir; deniega terminal, navegador, mensajería saliente, correo, calendario y control de dispositivos.
4. Simula tres peticiones: resumir el texto, modificar el documento y enviar el resumen a otra persona. Para cada una explica qué herramienta exigiría, qué límite pondrías y si la actividad la permite. Las dos últimas deben detenerse porque exceden el propósito.
5. Decide si el asistente debe recordar algo después. En el ejercicio, nada: registra que el contexto es temporal y define cómo comprobarías que una futura prueba real no guarda más de lo acordado.
6. No conectes cuentas reales ni habilites Full Access para completar la actividad. Si posteriormente pruebas OpenClaw, empieza en una instancia aislada, con material sintético, sin canales personales y con políticas de herramientas y ejecución que hayas comprobado en la documentación vigente.

## Validación y solución de problemas

La matriz está bien diseñada si cada permiso permitido es necesario para resumir el texto y toda acción externa o persistente queda denegada o requiere una decisión humana explícita. Revisa también que «Full Access» no esté activo y que los límites de herramientas y workspace coincidan con la tarea. Si el asistente afirma recordar una nota, eso no demuestra que se haya guardado: busca evidencia en el almacenamiento configurado o trata la afirmación como no verificada. Si solicita una capacidad no prevista, detente y ajusta el objetivo o deniega la acción; no amplíes todos los permisos para evitar una pregunta. Esta práctica manual evalúa tu política, no certifica la seguridad de una instalación.

## Errores frecuentes

- Confundir un Gateway siempre disponible con memoria perfecta o ilimitada.
- Suponer que «se ejecuta en mi infraestructura» significa que el proveedor del modelo nunca recibe datos.
- Aceptar Full Access porque resulta más cómodo o porque el sistema solicita una acción.
- Tratar las aprobaciones como aislamiento, o el sandbox como una lista completa de permisos.
- Conectar correo, calendario o dispositivos reales antes de demostrar que hacen falta.

## En resumen

OpenClaw puede sostener un asistente con sesiones y herramientas persistentes; esa continuidad exige decidir qué se recuerda y qué puede hacer. Empieza con datos inventados, permisos mínimos y ninguna cuenta real. Si no puedes verificar la política efectiva, detén la prueba.
