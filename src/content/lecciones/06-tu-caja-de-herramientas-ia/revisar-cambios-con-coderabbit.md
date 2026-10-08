---
title: "Revisar cambios con CodeRabbit"
description: "Aprende a usar CodeRabbit para revisar diffs de pull requests, contrastar sus hallazgos con pruebas y conservar la decisión de merge en manos humanas."
module: "06-tu-caja-de-herramientas-ia"
order: 13
duration: 35
level: "Inicial"
objectives:
  - "Distinguir una revisión asistida de una aprobación humana del cambio."
  - "Contrastar cada comentario con el diff, los requisitos y pruebas del proyecto."
  - "Practicar una revisión sin auto-merge ni aplicación automática de arreglos."
prerequisites:
  - "copilot-en-el-flujo-de-github"
  - "codigo-legible-depuracion-y-pruebas"
updatedDate: '2026-10-08'
sources:
  - label: "CodeRabbit: revisión de pull requests"
    url: "https://docs.coderabbit.ai/guides/code-review-overview"
  - label: "CodeRabbit: seguridad"
    url: "https://docs.coderabbit.ai/security"
---

## Idea central — explicación conceptual

CodeRabbit es un servicio de revisión asistida de pull requests. Una vez conectado al proveedor y al repositorio autorizado, analiza los cambios y puede publicar un resumen y comentarios sobre el diff. Su aportación es ofrecer otra lectura: quizá señale una condición límite, un riesgo de seguridad o una prueba que falta. La documentación también describe sugerencias para corregir código. Ninguna de esas funciones sustituye a alguien que conoce el requisito, ni certifica por sí sola que el cambio sea correcto.

Trata cada comentario como una hipótesis que merece comprobarse, no como una orden. Abre la línea citada y sigue el flujo hasta entender qué puede ocurrir. Contrasta la afirmación con el comportamiento anterior, los requisitos, los datos que entran y salen y las pruebas. Un hallazgo puede ser real, una interpretación equivocada o un problema que ya está mitigado en otra parte. La etiqueta de gravedad ayuda a priorizar, pero no demuestra impacto. A la inversa, que no haya comentarios tampoco prueba que no queden defectos: una revisión automatizada tiene alcance y límites.

En esta práctica solo estudiaremos el diff y las pruebas. No habilites auto-merge en el proveedor del repositorio, no fusiones porque un check esté verde y no apliques arreglos con un clic. Si decides corregir algo, escribe o revisa tú el cambio, lee el nuevo diff y vuelve a validar.

## Ejemplo concreto

Imagina un pull request pequeño que modifica una función de cálculo y CodeRabbit señala que no contempla una lista vacía. Lee la especificación: si la respuesta esperada es cero, comprueba si el código ya cumple ese contrato y si una prueba lo demuestra. Si el comentario es un falso positivo, conserva la evidencia y explica por qué. Si detecta un fallo real, corrige la función o añade una prueba de forma manual. En ambos casos, la decisión sale del requisito y del resultado reproducible, no de aceptar o descartar la sugerencia por su tono.

## Práctica guiada — receta

1. Elige un repositorio de práctica sin secretos, datos personales ni código que no tengas autorización para compartir. Prepara un cambio pequeño y reversible, por ejemplo una validación y su prueba.
2. Escribe antes del cambio una frase de aceptación y al menos un caso límite. Así tendrás una referencia independiente para juzgar tanto el código como la revisión.
3. Conecta CodeRabbit solo a ese repositorio de prueba y revisa qué acceso concede la integración. Abre un pull request normal; no cambies ajustes de fusión automática ni permisos de otros repositorios para acelerar el ejercicio.
4. Lee primero el diff sin ayuda. Después, para cada comentario, anota cuatro cosas: afirmación, línea afectada, evidencia que la confirmaría y decisión provisional.
5. Comprueba cada hallazgo con el requisito y una prueba manual o automatizada. Si hace falta cambiar el código, hazlo tú en un commit aparte; no uses la opción de aplicar el arreglo durante este ejercicio.
6. Relee el diff completo y los resultados de pruebas. Deja el pull request sin fusionar: el objetivo es practicar el criterio de revisión, no publicar el cambio.

## Validación y solución de problemas

La práctica termina cuando todos los comentarios están clasificados, cada decisión tiene una razón verificable y solo aparecen los archivos esperados en el diff. Un resultado correcto puede incluir un falso positivo bien explicado. Si no aparece revisión, confirma que la integración tenga acceso al repositorio de prueba y que las reglas de revisión cubran ese pull request; consulta los controles oficiales antes de ampliar permisos. Si el comentario no aporta evidencia, puedes pedir una aclaración en la conversación del pull request, pero verifica la respuesta igual que la primera sugerencia. Si una prueba falla, reproduce el caso y corrige el cambio antes de considerar cualquier aprobación.

## Errores frecuentes

- Confundir un comentario convincente con una prueba del defecto.
- Descartar un aviso solo porque la severidad parece baja.
- Tratar una revisión sin hallazgos como garantía de calidad o seguridad.
- Aplicar un arreglo automático sin inspeccionar el diff resultante.
- Activar auto-merge o compartir un repositorio sensible para probar una herramienta.

## En resumen

CodeRabbit puede añadir una perspectiva útil al revisar un pull request, pero sus comentarios se verifican contra el código, el requisito y las pruebas. Mantén la fusión bajo control humano: nada de auto-merge en este ejercicio y ningún cambio aceptado sin releerlo.
