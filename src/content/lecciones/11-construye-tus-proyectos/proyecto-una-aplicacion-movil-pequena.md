---
title: "Proyecto: una aplicación móvil pequeña"
description: "Construye una lista móvil de recados con Expo y React Native: alta, cambio de estado y borrado, con controles accesibles y pruebas en dispositivo o emulador."
module: "11-construye-tus-proyectos"
order: 3
duration: 150
level: "Intermedio"
objectives:
  - "Modelar una lista de recados con componentes y estado de React Native."
  - "Implementar añadir, completar y eliminar elementos en una pantalla de Expo."
  - "Verificar nombres accesibles, estados y flujo con emulador o dispositivo."
prerequisites:
  - "JavaScript básico y familiaridad con componentes de React Native."
  - "Uso básico de la terminal."
updatedDate: '2026-10-08'
sources:
  - label: "Expo — Crea tu primera aplicación"
    url: "https://docs.expo.dev/tutorial/create-your-first-app/"
  - label: "React Native — Accesibilidad"
    url: "https://reactnative.dev/docs/accessibility"
---

## Brief del proyecto

Crea una aplicación pequeña para preparar los recados de un día: la persona puede escribir un elemento, añadirlo, marcarlo como completado y eliminarlo. El valor está en un flujo corto que se entiende en una pantalla, no en acumular funciones. La app debe funcionar sin iniciar sesión y mantener los datos solo durante la sesión actual.

## Alcance mínimo

Usa Expo y componentes básicos de React Native. Una pantalla basta: título, campo de texto, botón para añadir, lista desplazable, estado vacío y controles por elemento. Modela cada recado con un identificador, un texto y un booleano `done`. No incluyas cuenta, nube, geolocalización, notificaciones, pagos ni base de datos. Al cerrar o recargar, la lista puede reiniciarse; dejar clara esa limitación forma parte del prototipo. Evita añadir bibliotecas de interfaz: empieza con los controles incluidos en la plantilla. Es la continuación móvil del ciclo ya practicado: requisito observable, componente, prueba y evidencia. Puedes pedir a un asistente de IA un cambio acotado, como añadir el estado vacío desde los criterios; revisa que no sustituya controles nativos por elementos visuales sin accesibilidad y prueba el resultado en Expo.

## Plan paso a paso

1. **Prepara el entorno de aprendizaje.** En un proyecto nuevo, sigue el tutorial oficial de Expo; su comando de inicio es `npx create-expo-app@latest lista-del-dia`. Después entra en la carpeta (`cd lista-del-dia`) y ejecuta `npx expo start`. El primer comando crea un proyecto nuevo y descarga su plantilla y dependencias; el segundo inicia el servidor de desarrollo. El tutorial oficial detalla las opciones para probar con Expo Go o un emulador. Para este prototipo no hace falta publicar la aplicación ni contratar un servicio en la nube.
2. **Dibuja los estados.** Decide qué ocurre con lista vacía, texto escrito, error por texto vacío, recado pendiente, recado completado y borrado. Mantén una única fuente de verdad: un estado de React que contenga el arreglo de recados.
3. **Construye la interacción.** Usa `TextInput` para capturar el texto, `Pressable` o `Button` para añadirlo y `FlatList` para mostrar elementos. Recorta espacios antes de crear; genera el id en el dispositivo; al completar o eliminar, produce un arreglo actualizado en vez de modificar el estado original.
4. **Añade nombres y estados accesibles.** Asigna una etiqueta comprensible al campo y a cada acción. Por ejemplo, el botón de una fila puede anunciar “Completar Comprar leche”; comunica además si está marcado. Conserva etiquetas visibles y controles suficientemente grandes, y no uses únicamente color o un icono sin nombre para explicar el estado.
5. **Comprueba en contexto.** Inicia Expo, abre la app en un emulador disponible o en un dispositivo de prueba y recorre el flujo con lector de pantalla (TalkBack o VoiceOver si están disponibles). Prueba una lista vacía, texto largo, cambio de orientación si el emulador lo permite y varias filas. Anota diferencias observadas entre plataformas en lugar de suponer que se comportan igual.

## Entregables y criterios de aceptación

Entrega la pantalla principal, una nota con los pasos de arranque y una lista de pruebas reproducibles. Se acepta si se pueden añadir, completar y borrar recados; un envío vacío no crea una fila y explica qué falta; la lista vacía tiene un mensaje útil; cada acción se anuncia con nombre y propósito; el estado completado se puede conocer sin distinguir un color; y la pantalla no oculta controles con varios elementos. Registra el dispositivo o emulador usado y la versión del entorno para repetir la prueba.

## Solución orientativa y errores frecuentes

Mantén las operaciones en funciones pequeñas: `addTask`, `toggleTask(id)` y `removeTask(id)`. Para completar una tarea, usa una transformación como `tasks.map(...)`; para borrarla, `tasks.filter(...)`. En React Native, `accessibilityLabel`, `accessibilityRole` y `accessibilityState` ayudan a describir controles; verifica el anuncio real con el lector de pantalla, porque la experiencia puede variar entre Android e iOS. No añadas atributos a todos los elementos por rutina si el texto visible y el control nativo ya son claros.

Errores típicos: mutar el arreglo y no ver el render actualizado; reutilizar índices como identificadores; dejar botones que solo muestran un icono; no ofrecer estado vacío; o probar únicamente en el navegador web. El proyecto no guarda los recados en forma persistente, no cubre todos los tamaños de pantalla y no se ha sometido a revisión de tienda, privacidad, rendimiento o seguridad. Antes de distribuirlo, habría que diseñar persistencia, pruebas de accesibilidad en más dispositivos y una revisión de los requisitos de cada plataforma.
