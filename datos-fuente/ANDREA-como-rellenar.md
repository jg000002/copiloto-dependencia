# Andrea: cómo rellenar las fichas de comunidad autónoma

Actualizado el 2 de agosto de 2026. Punto de decisión del proyecto: **16 de agosto**.

---

## 1. Qué es esto

En la carpeta `datos-fuente/` hay tres archivos CSV. Son el volcado de lo que
tenemos ahora mismo sobre Andalucía, Madrid y Murcia, sacado de tu
investigación. Cada uno se corresponde con una pestaña de tu Google Sheet:

| Archivo | Pestaña del Sheet | Qué contiene |
|---|---|---|
| `ccaa.csv` | `ccaa` | Una fila por comunidad: organismo, plazos, cómo se presenta, cómo se consulta el estado |
| `documentos.csv` | `documentos` | Una fila por documento que exige cada comunidad (24 filas) |
| `consejos.csv` | `consejos` | Avisos y errores típicos que contamos a la familia |
| `IMSERSO_20260630.xlsx` | — | Excel oficial del IMSERSO (Sistema de Información del SAAD), situación a 30/06/2026. Es la fuente de los plazos medios (nacional y por comunidad) y del número de fallecidos esperando. Se guarda aquí como respaldo y trazabilidad, igual que los CSV: el código nunca lo lee. |

**Para empezar:** en Google Sheets, `Archivo → Importar → Subir`, y elige
*"Insertar nueva hoja"* para cada CSV. No sobrescribas tu Sheet actual: importa
como pestañas nuevas y compara.

A partir de ahí, **tu Sheet manda**. Joan copia de tu Sheet al código, nunca al
revés.

## 2. El problema que tenemos ahora, en una frase

**Ninguno de los datos tiene una URL que lo respalde.** Todo lo que hay escrito
puede ser correcto, pero ahora mismo no hay forma de comprobarlo sin volver a
buscarlo desde cero. Eso significa dos cosas:

1. No podemos publicar la lista de documentación todavía. Si una familia deja de
   presentar un papel porque nuestra web no lo mencionaba, el problema es serio y
   real, y "lo leí en algún sitio" no nos vale.
2. Cuando toque revisar esto en noviembre, sin las URL el trabajo cuesta lo mismo
   que hacerlo desde el principio.

Por eso la mitad de las columnas nuevas son de fuente y de fecha. No es
burocracia: es lo que convierte una lista de papeles en algo que podemos
defender.

## 3. Las cuatro reglas

**Regla 1 — Si no puedes pegar la URL, el dato no entra.**
Cada dato necesita la dirección web de la sede oficial, el BOE o el boletín
autonómico donde lo has leído. Un PDF oficial vale. Un blog de una asesoría o un
periódico **no vale como fuente**: sirve para encontrar la norma, no para
citarla.

**Regla 2 — Dejar una celda vacía es correcto. Deducir no.**
Si Andalucía pide algo y te parece lógico que Murcia también, **no lo escribas**.
Déjalo vacío y anótalo en `notas_andrea`. Una celda vacía es información honesta
("esto está pendiente"); una celda rellenada a ojo es un error que nadie va a
detectar después.

**Regla 3 — Un dato, una fuente.**
Si encuentras dos cifras distintas para lo mismo, no pongas las dos ni pongas un
rango. Elige la fuente más oficial y más reciente, escribe **solo esa**, y anota
la otra en `notas_andrea`. Ya nos pasó: teníamos 477 y 496 días para Andalucía a
la vez, y eso en la web se lee como "el trámite dura entre 477 y 496 días", que
es una afirmación que nadie ha hecho nunca.

**Regla 4 — No cambies los `doc_id` ni los `ccaa_id`.**
Las columnas `doc_id` (`informe-salud`, `empadronamiento`...) y `ccaa_id`
(`andalucia`, `madrid`, `murcia`) son el enganche con el código. El texto de
`nombre` lo puedes reescribir todo lo que quieras; el `id` no se toca. Si hace
falta un `id` nuevo, se lo pides a Joan.

## 4. En qué orden trabajar

Tienes dos cosas en marcha a la vez y **no valen lo mismo**. Los despachos
deciden si el proyecto existe; las fichas de documentación no se publican hasta
después del 16 de agosto. Así que:

### Bloque A — 2 o 3 horas, esta semana (antes de las llamadas)

Rellenar solo esto de `ccaa.csv`, para las tres comunidades:

- `organismo_nombre`, `organismo_url`
- `plazo_medio_dias` + `plazo_medio_fuente` + `plazo_medio_fecha` + `plazo_medio_url`
- `via_telematica_disponible` + `via_telematica_url`
- `donde_presentar_presencial`

Son los datos que sirven en una llamada con un despacho: demuestran que sabemos
de qué hablamos y se consiguen en la sede oficial en un rato.

### Bloque B — las cuatro preguntas del apartado 5

Media hora cada una como mucho, pero son las que cambian decisiones. Si solo
puedes hacer una cosa después del bloque A, haz esta.

### Bloque C — después del 16 de agosto

Rellenar `documentos.csv` documento a documento, con su `fuente_url` y su
`modelo_url`. Son 24 filas y es trabajo lento. **No lo empieces antes**, porque
si el proyecto se para el 16, es trabajo tirado; y si continúa, lo harás con más
tiempo y sin las llamadas encima.

## 5. Las cuatro preguntas abiertas

Estas cuatro no son "rellenar una celda": son cosas que ahora mismo no sabemos y
que afectan a decisiones ya tomadas.

**P1. ¿El plazo legal para resolver es de 6 meses en las tres comunidades?**
Trabajamos con 180 días para todos, que es el plazo estatal. Pero cada comunidad
desarrolla la ley con su propia normativa y alguna podría fijar un plazo
distinto. Nuestro contador avisa a la familia de que la Administración ha
incumplido el plazo: **si el plazo de esa comunidad no es 180 días, le estamos
diciendo a alguien que reclame cuando no puede.** Necesitamos: el número de días,
la norma autonómica concreta y su URL, para cada una de las tres.
→ Columnas `plazo_legal_dias`, `plazo_legal_norma`, `plazo_legal_url`.

**P2. ¿Cuántos días hay para subsanar cuando te requieren documentación?**
Cuando falta un papel, la Administración manda un requerimiento y da un plazo
corto para aportarlo. Si se pasa, el expediente se archiva y hay que empezar de
cero. Ese es exactamente el problema que decimos que resolvemos, y no lo tenemos
recogido en ningún sitio. Con carácter general son 10 días hábiles (artículo 68
de la Ley 39/2015), pero hay que confirmar si alguna de las tres lo regula
distinto.
→ Columnas `plazo_subsanacion_dias`, `plazo_subsanacion_norma`, `plazo_subsanacion_url`.

**P3. ¿Murcia exige certificado de empadronamiento?**
Andalucía y Madrid sí; en nuestra lista de Murcia no aparece. O es que Murcia no
lo pide (dato interesante), o se nos escapó (agujero). Hay una fila en
`documentos.csv` marcada `PENDIENTE DE CONFIRMAR SI EXISTE`: bórrala si no lo
exige, rellénala si sí.

**P4. ¿El informe de salud caduca en Murcia?**
En Andalucía y Madrid son 3 meses. En Murcia la celda está vacía, y vacía puede
significar "no caduca" o "no lo miramos". Es un dato muy práctico para la
familia (marca el orden en que hay que pedir los papeles), así que conviene
cerrarlo.

## 6. Qué significa cada columna nueva

### En `ccaa.csv`

| Columna | Qué escribir |
|---|---|
| `plazo_legal_dias` | Días que tiene la Administración de esa comunidad para resolver. Vacío = usamos el estatal (180). Solo rellenar si esa comunidad fija uno propio |
| `plazo_legal_norma` | La norma exacta. Ej.: "Decreto X/2007, artículo 15" |
| `plazo_subsanacion_dias` | Días para aportar lo que falta cuando te requieren. Indica si son hábiles o naturales en `plazo_subsanacion_norma` |
| `plazo_medio_dias` | Un solo número. Nunca un rango |
| `plazo_medio_fuente` | De dónde sale ese número. Ej.: "Panel del SAAD, 2.º trimestre 2026" |
| `plazo_medio_fecha` | A qué fecha se refiere el dato, no cuándo lo consultaste |
| `donde_presentar_presencial` | Dónde se entrega en papel: servicios sociales del ayuntamiento, registro, centro concreto |
| `via_telematica_requiere` | Qué hace falta para hacerlo por internet: certificado digital, Cl@ve... |
| `estado` | `falta` mientras haya huecos, `ok` cuando esté toda la fila verificada con URL |

### En `documentos.csv`

| Columna | Qué escribir |
|---|---|
| `obligatorio` | `si` o `no`. `no` = solo en ciertos casos, y entonces `condicion_texto` explica cuáles |
| `condicion_texto` | Cuándo aplica, en lenguaje de familia. Ej.: "Solo para extranjeros no comunitarios" |
| `modelo_nombre` / `modelo_url` | Si hay que usar un impreso oficial concreto, su nombre y el enlace de descarga |
| `donde_se_pide` | Dónde consigue la familia ese papel: centro de salud, ayuntamiento, banco... |
| `quien_lo_firma` | Quién tiene que firmarlo para que valga |
| `caducidad_meses` | Antigüedad máxima. Vacío solo si has comprobado que no caduca; si no lo has mirado, anótalo en `notas_andrea` |
| `aviso` | El consejo práctico: el error que comete la gente con ese papel |
| `fuente_url` | Dónde lo has leído. **Sin esto el documento no se publica** |
| `notas_andrea` | Todo lo que quieras dejar dicho: dudas, contradicciones, la otra cifra que descartaste |

## 7. Lo que NO tienes que hacer

- **No toques ningún archivo de la carpeta `js/`.** Eso es de Joan.
- **No añadas una cuarta comunidad.** Está decidido: tres, y mantenerlas al día
  ya es mucho para dos personas a tiempo parcial. Una ficha desactualizada hace
  más daño que no tenerla.
- **No busques información sobre grados ni sobre la escala de valoración.** El
  cuestionario se posiciona como "prepara tu documentación", no como "calcula tu
  grado", precisamente para no meternos en terreno de asesoramiento profesional.
- **No empieces el bloque C antes del 16 de agosto.** Si las llamadas van mal, es
  trabajo perdido.

## 8. Si te atascas

Anótalo en `notas_andrea` y sigue. Una fila con una nota honesta vale más que una
fila completa de la que no nos fiamos. Lo que nadie puede arreglar después es un
dato inventado que parece verdad.
