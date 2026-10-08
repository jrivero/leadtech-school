---
title: "Conectar proveedores de IA mediante APIs"
description: "Diseña una frontera de servidor para alternar proveedores de modelos, validar entradas y controlar errores sin publicar claves ni depender de una llamada facturada."
module: "07-un-flujo-de-trabajo-con-agentes"
order: 3
duration: 45
level: "Intermedio"
objectives:
  - "Describir el recorrido de una solicitud desde la aplicación hasta un proveedor de modelos."
  - "Separar la lógica del producto de los formatos particulares de cada proveedor."
  - "Probar una integración local con respuestas simuladas y manejo de errores."
prerequisites:
  - "Conocer solicitudes HTTP, JSON y funciones básicas."
  - "Comprender la diferencia entre cliente de navegador y servidor."
updatedDate: '2026-10-08'
sources:
  - label: "OpenAI API: guía y referencia de la plataforma"
    url: "https://developers.openai.com/api/docs/"
  - label: "Anthropic: documentación de Claude Platform"
    url: "https://docs.anthropic.com/"
  - label: "Google AI: referencia de Gemini API"
    url: "https://ai.google.dev/api"
---

## Una API es una frontera, no una llamada mágica

Una integración típica recibe una petición de tu aplicación, valida la entrada, construye una solicitud para el proveedor y transforma la respuesta en algo que entiende tu producto. El proveedor puede ofrecer una API HTTP, una biblioteca cliente o ambas; sus modelos, nombres de campos, respuestas, errores y capacidades no son intercambiables por defecto. Consulta la documentación vigente del proveedor elegido antes de implementar detalles concretos. Esta lección evita fijar un endpoint o un esquema que podría cambiar.

Conviene separar la regla del producto de esa frontera externa. Por ejemplo, una función `crear_borrador(texto)` expresa la necesidad del dominio; un adaptador convierte el texto al formato del proveedor y normaliza el resultado a una estructura interna sencilla, como `{texto, proveedor, estado}`. Así puedes probar la regla sin red y cambiar de proveedor sin propagar nombres de modelos o campos de respuesta por toda la interfaz. No conviertas la abstracción en una promesa de que todos los proveedores ofrecen idénticas funciones: el adaptador debe declarar límites y errores que no puede ocultar.

La clave de API es una credencial, no una configuración pública. El navegador y el código compilado para móvil quedan bajo control de quien los descarga, así que la solicitud autenticada debe salir de un servidor confiable. En producción, limita el alcance del secreto, guárdalo en el gestor aprobado o en el entorno del servidor, evita registrarlo y define cómo revocarlo si se expone. Una variable local sirve para desarrollo si se excluye del control de versiones; no escribas un valor real en un ejemplo, una captura ni una respuesta de depuración.

Los límites también incluyen tamaño de entrada, tiempos de espera, errores de red, respuestas vacías, cuotas y coste. Reintentar una solicitud puede duplicar consumo; hazlo solo con una política explícita y tras comprobar si esa operación se puede repetir sin efectos. Trata el texto generado como dato no confiable: valida el formato antes de usarlo, escápalo al presentarlo y exige revisión humana en tareas de impacto alto.

## Práctica con un proveedor simulado

El siguiente ejemplo usa solo Python estándar. El proveedor falso devuelve una respuesta determinista: no abre una conexión, no necesita clave y no demuestra que una API real esté funcionando. Permite comprobar el contrato interno antes de elegir una integración real.

```python
class ProveedorFalso:
    def generar(self, prompt):
        return {"texto": f"Borrador local: {prompt.strip()}"}

def crear_borrador(proveedor, prompt):
    if not isinstance(prompt, str) or not prompt.strip():
        raise ValueError("El texto no puede estar vacío")
    respuesta = proveedor.generar(prompt)
    texto = respuesta.get("texto")
    if not isinstance(texto, str) or not texto.strip():
        raise ValueError("La respuesta no contiene texto utilizable")
    return texto.strip()

fake = ProveedorFalso()
assert crear_borrador(fake, "Resumen de prueba") == "Borrador local: Resumen de prueba"
try:
    crear_borrador(fake, "   ")
except ValueError:
    print("OK: entrada vacía rechazada")
else:
    raise AssertionError("Se esperaba rechazar la entrada vacía")
print("OK: adaptador simulado, sin llamada externa")
```

## Ejercicio y verificación

1. Ejecuta el bloque en un intérprete Python 3 disponible pegándolo tras `python3 -` en una terminal. No instales dependencias para esta práctica.
2. Añade una segunda implementación falsa que devuelva `{"texto": "   "}` y confirma que la validación rechaza la respuesta.
3. Escribe una tabla de correspondencia: entrada interna, dato que requiere el adaptador, formato de respuesta interno y error esperado.
4. Para un proveedor real, contrasta la documentación oficial actual antes de fijar campos, autenticación, biblioteca o límites. No envíes una petición real para aprobar el ejercicio.

La salida esperada incluye dos líneas `OK`. Si se produce otra cosa, revisa primero el contrato y las ramas negativas. La prueba valida tu frontera simulada; no confirma disponibilidad, precio ni comportamiento remoto.

## Errores habituales

- **Poner la clave en JavaScript del navegador.** Traslada la autenticación a un servidor y expón solo una operación propia con controles.
- **Copiar el primer ejemplo del proveedor a la lógica de negocio.** Aísla nombres y estructuras particulares en un adaptador.
- **Reintentar cualquier fallo automáticamente.** Distingue errores transitorios, límites y solicitudes que podrían duplicarse.
- **Aceptar JSON porque “parece correcto”.** Comprueba tipos, campos requeridos, tamaño y valores esperados antes de usarlo.
- **Confundir una simulación con integración real.** Etiqueta el mock y registra por separado las verificaciones remotas que no se ejecutaron.

## Resumen

Una integración mantenible controla una frontera: valida, autentica en servidor, adapta formatos, limita errores y comprueba la salida. Empieza con un contrato simulado sin coste y revisa las docs oficiales antes de fijar una API específica. Ni el mock ni una respuesta correcta sustituyen la protección de secretos y la revisión del resultado.
