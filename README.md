# Copiloto Dependencia — Fase 0 (validación)

Landing estática. HTML, CSS y JavaScript vanilla, sin build y sin dependencias:
se publica subiendo la carpeta tal cual a GitHub Pages o Cloudflare Pages.

**Punto de decisión del proyecto: 16 de agosto de 2026.** Hasta esa fecha, lo
único que tiene que estar online es la landing con el contador de plazo. La
checklist de documentación por comunidad autónoma no se publica todavía (ver
más abajo).

## Qué hay ahora mismo en la web

| Sección | Estado |
|---|---|
| Cabecera y titular | Publicada |
| Los tres problemas | Publicada |
| Contador de plazo legal | Publicado y funcionando |
| Quiénes somos | Publicada, con nombres reales |
| Cuestionario de diagnóstico | No empezado |
| Bloque de herederos | No empezado |
| Checklist de documentación por comunidad | **Los datos existen en el código, pero la web no los pinta** |
| Aviso legal y política de privacidad | Publicadas con texto mínimo honesto. **Falta completar cuando exista alta de autónomo o sociedad**: NIF, nombre/razón social y domicilio de notificación |

## Archivos

```
index.html              La landing entera.
aviso-legal.html        Aviso legal, texto mínimo de fase de validación.
privacidad.html         Política de privacidad, texto mínimo de fase de validación.
css/estilos.css         Todo el CSS.
js/config.js            Plazo legal y cifras oficiales. Se cambia aquí y solo aquí.
js/landing.js           Rellena en el HTML los huecos de cifras que salen de config.js.
js/contador.js          El "reloj legal". Todo el cálculo ocurre en el navegador.
js/datos-ccaa.js        Las fichas de Andalucía, Madrid y Murcia. Copia del Sheet de Andrea.
js/fichas.js            Cómo se leen esas fichas: estados de verificación y plazo aplicable.
datos-fuente/           Los CSV que mantiene Andrea, más sus instrucciones.
```

## De dónde salen los datos de las comunidades autónomas

El origen de la verdad es el **Google Sheet de Andrea**. El flujo va en una sola
dirección y tiene tres pasos:

```
Sheet de Andrea  →  datos-fuente/*.csv  →  js/datos-ccaa.js
   (ella edita)      (volcado + histórico)   (copia a mano de Joan)
```

- Los CSV de `datos-fuente/` son el volcado del Sheet: sirven para ver qué se
  copió y cuándo, y para poder comparar dos versiones. **El código nunca los
  lee**, ni en tiempo de ejecución ni en ningún otro momento.
- El paso de CSV a `datos-ccaa.js` lo hace Joan **a mano**. Con 3 comunidades y
  24 documentos, un script de conversión sería otra pieza que mantener sin
  ganar nada. Si algún día son 8 comunidades, se reevalúa.
- Nunca al revés: si algo se corrige en el código y no en el Sheet, la próxima
  copia lo pisa.

Las instrucciones de Andrea están en
[`datos-fuente/ANDREA-como-rellenar.md`](datos-fuente/ANDREA-como-rellenar.md).

### Los `id` son el contrato

`doc_id` (`informe-salud`, `empadronamiento`, `identidad`...) y `ccaa_id`
(`andalucia`, `madrid`, `murcia`) se repiten iguales en las tres comunidades a
propósito: son lo que permite comparar sin duplicar datos. Los fija Joan. El
texto de `nombre` se puede reescribir libremente; el `id` no se toca.

### Estados de verificación

Un campo vacío puede significar dos cosas muy distintas, y confundirlas es
peligroso. Por eso hay tres estados:

| Estado | Significa | ¿Se publica? |
|---|---|---|
| `verificado` | Comprobado en fuente oficial, con su URL | Sí |
| `sin_verificar` | Nadie lo ha comprobado todavía, o falta la URL | No |
| `no_aplica` | Comprobado que esa comunidad no lo exige o no lo tiene | No |

Por defecto, todo campo que no esté marcado explícitamente está
`sin_verificar`. Los CSV usan otro vocabulario en su columna `estado`:
`falta` equivale a `sin_verificar` y `ok` a `verificado`.

**Hoy no hay ni un solo campo verificado**, así que la web no pinta ninguna
ficha. Publicar una lista de papeles sin poder decir de dónde sale es
exactamente el riesgo que estamos evitando: si una familia deja de presentar un
documento porque nuestra web no lo mencionaba, el problema es real.

## Constantes críticas (`js/config.js`)

- `PLAZO_LEGAL_DIAS = 180`. **No cambiar a 90 hasta que la reforma se publique
  en el BOE.** Cuando salga: cambiar el número y poner
  `REFORMA_PENDIENTE.activa = false`, y la nota de la landing desaparece sola.
- `CIFRAS_OFICIALES`. Usamos el Panel del SAAD (314 días). No mezclar con la
  cifra del Observatorio Estatal (341 días) en el mismo texto o tabla.

Ningún otro archivo tiene esos números escritos a mano. En el HTML se dejan
huecos (`<span data-cifra="plazo_medio_dias">`) que rellena `js/landing.js`.

## Protección de datos

El cuestionario preguntará por continencia, movilidad, deterioro cognitivo y
medicación: son datos de salud, categoría especial del artículo 9 del RGPD. Tres
reglas que no se negocian y que hay que revisar en cada cambio:

1. **Nada viaja en la URL.** Ni el grado calculado ni ninguna respuesta. Los
   parámetros quedan en los registros del servidor y en la analítica.
2. **Ningún evento de analítica** registra el grado ni ninguna respuesta, ni
   siquiera de forma agregada.
3. **El correo electrónico va siempre separado** de las respuestas: formulario
   aparte, después de mostrar el resultado, sin vínculo con lo respondido.

Hoy la landing cumple las tres por construcción: no hay analítica, no hay
formularios y la fecha del contador vive en una variable de JavaScript que
desaparece al cerrar la pestaña.

## Lo que este proyecto NO hace en esta fase

Sin backend, sin base de datos, sin login, sin `localStorage` ni
`sessionStorage`, sin ningún `fetch`, sin pasarela de pago, sin llamadas a
ningún LLM, sin generación automática de escritos, sin conexión a sedes
electrónicas, sin cookies de terceros, sin Google Analytics, sin app móvil y sin
una cuarta comunidad autónoma.

## Cómo verlo en local

Basta con abrir `index.html` en el navegador. Si algo no funciona al abrirlo
como archivo, se puede levantar un servidor estático de un solo comando:

```bash
python -m http.server 8000
```

Y abrir `http://localhost:8000`. Ese servidor es solo para mirar la página en
local; no forma parte del proyecto ni se despliega.
