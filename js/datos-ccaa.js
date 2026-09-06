// datos-ccaa.js — Ficha de documentación por comunidad autónoma.
//
// ─────────────────────────────────────────────────────────────────────────
// DE DÓNDE SALE ESTE ARCHIVO
// ─────────────────────────────────────────────────────────────────────────
// Del Google Sheet de Andrea, volcado a los CSV de `datos-fuente/`. Este
// archivo es una copia a mano de esos CSV, hecha por Joan. El flujo es:
//
//     Sheet de Andrea  →  datos-fuente/*.csv  →  este archivo
//
// y va solo en esa dirección. La web NUNCA lee los CSV: son el volcado del
// Sheet y el histórico de lo que se copió y cuándo.
//
// Cada campo de aquí se corresponde con una columna de los CSV. Si hace
// falta un campo nuevo, primero se añade la columna al Sheet; si no, sería
// un dato que nadie puede actualizar.
//
// ─────────────────────────────────────────────────────────────────────────
// ESTADO DE VERIFICACIÓN: LA PARTE IMPORTANTE
// ─────────────────────────────────────────────────────────────────────────
// Un campo vacío puede significar dos cosas muy distintas, y confundirlas
// es peligroso: "esta comunidad no lo exige" no es lo mismo que "nadie lo
// ha mirado todavía". Tres estados posibles:
//
//   "verificado"    → comprobado en fuente oficial y con su URL. Publicable.
//   "sin_verificar" → nadie lo ha comprobado, o falta la URL. NO publicable.
//   "no_aplica"     → comprobado que esta comunidad no lo tiene o no lo exige.
//
// REGLA POR DEFECTO: todo campo que NO aparezca en `verificacion` está
// `sin_verificar`. Así solo hay que escribir las excepciones, y el estado
// por defecto es el prudente.
//
// Ejemplo real, ya aplicado a Andalucía:
//
//     verificacion: {
//       plazo_legal: "verificado",     // tiene dias + norma_referencia + norma_url
//       plazo_medio: "verificado",     // tiene dias + fuente + fecha + url
//     }
//
// ESTADO ACTUAL (desde la sincronización con el Sheet de agosto de 2026):
// `plazo_legal`, `plazo_subsanacion` y `plazo_medio` están verificados para
// Andalucía y Murcia; para Madrid solo `plazo_legal` y `plazo_medio` (su
// `plazo_subsanacion` sigue sin confirmar). Esto es lo que permite que el
// selector de comunidad del contador de plazo use el dato autonómico en vez
// del estatal — ver fichas.js y contador.js.
//
// Los `documentos`, `consejos` y el `meta.estado` de cada ficha (la
// checklist completa) siguen SIN VERIFICAR: ninguno tiene URL que lo
// respalde todavía. Por eso la web sigue sin pintar la checklist, aunque ya
// use el plazo legal de cada comunidad en el contador.
//
// La columna `estado` de los CSV usa otro vocabulario (`falta` / `ok`). La
// equivalencia es: falta → sin_verificar, ok → verificado.
//
// ─────────────────────────────────────────────────────────────────────────
// DOS CAMPOS QUE ESTUVIERON AQUÍ Y YA NO ESTÁN
// ─────────────────────────────────────────────────────────────────────────
// 1. `aplica_si`. Era una condición en formato máquina para que el
//    cuestionario decidiera solo si enseñar un documento. Estaba a null en
//    los 24 documentos, no existe como columna en el Sheet y el cuestionario
//    todavía no existe. Se ha quitado. Hoy la condición vive únicamente en
//    `condicion_texto`, que es texto que lee la familia. Cuando exista el
//    cuestionario y sepamos qué condiciones necesita de verdad, se añade la
//    columna al Sheet y vuelve.
//
// 2. `empadronamiento: { tipo, anios_residencia, ... }`. Era un objeto que
//    solo aparecía dentro de un documento concreto de dos de las tres
//    fichas. Se ha quitado porque no existe como columna en el Sheet: era un
//    dato que Andrea no podía actualizar nunca. La diferencia entre
//    empadronamiento corriente e histórico sigue estando, en texto, dentro
//    de `detalle`. PENDIENTE DE DECIDIR (Joan): esa diferencia es una de las
//    tres variables que de verdad cambian entre comunidades, así que
//    probablemente merezca columnas propias en `documentos.csv`.

const DATOS_CCAA = {

  // ───────────────────────────── ANDALUCÍA ─────────────────────────────
  andalucia: {
    id: "andalucia",
    nombre: "Andalucía",

    meta: {
      estado: "sin_verificar",
      verificado_por: "Andrea",
      fecha_verificacion: "",
      volcado_de: "datos-fuente/ccaa.csv",
      fecha_volcado: "2026-08-02",
    },

    organismo: {
      nombre: "Agencia de Servicios Sociales y Dependencia de Andalucía",
      siglas: "ASSDA",
      url: "https://www.juntadeandalucia.es/agenciadeserviciossocialesydependencia/",
    },

    // Plazo propio de esta comunidad para resolver. Vacío = se usa
    // CONFIG.PLAZO_LEGAL_DIAS (el estatal). Ver fichas.js.
    //
    // Andalucía SÍ fija uno propio, y no tiene relación con la reforma
    // estatal pendiente (CONFIG.REFORMA_PENDIENTE): este decreto autonómico
    // es de 2021.
    plazo_legal: {
      dias: 90,
      norma_referencia: "Decreto 168/2007, de 12 de junio, art. 15.2 (redacción dada por Decreto-ley 9/2021, de 18 de mayo)",
      norma_url: "https://www.boe.es/buscar/act.php?id=BOJA-b-2021-90194",
    },

    // Días para aportar lo que falta cuando la Administración requiere
    // documentación. Si se pasa, el expediente se archiva.
    plazo_subsanacion: {
      dias: 10,
      norma_referencia: "mismo decreto, art. 11.1, que remite al art. 68.1 de la Ley 39/2015 (días hábiles)",
      norma_url: "https://www.boe.es/buscar/act.php?id=BOJA-b-2021-90194",
    },

    // Un solo número, nunca un rango. Cifra oficial del IMSERSO.
    plazo_medio: {
      dias: 435,
      fuente: "IMSERSO, Sistema de Información del SAAD, situación a 30 de junio de 2026 (tiempo medio Solicitud → Resolución de Prestación, primera resolución de cada persona)",
      fecha: "2026-06-30",
      url: "https://imserso.es/documents/20123/11151734/estsisaad_20260630.xlsx/961e14cf-d41a-f0bd-dbc9-1737a325c37e",
    },

    via_telematica: {
      disponible: true,
      nombre: "Ventanilla Electrónica de la Dependencia (VED)",
      url: "https://www.juntadeandalucia.es/agenciadeserviciossocialesydependencia/ved/",
      requiere: "certificado digital / Cl@ve",
    },

    donde_presentar_presencial: "",

    consulta_estado: {
      necesitas: "",
      como: "",
      telefono: "",
      url: "",
    },

    verificacion: {
      plazo_legal: "verificado",
      plazo_subsanacion: "verificado",
      plazo_medio: "verificado",
    },

    documentos: [
      {
        id: "solicitud",
        nombre: "Solicitud de reconocimiento de la situación de dependencia",
        obligatorio: true,
        condicion_texto: "",
        detalle: "En el modelo normalizado de la Junta de Andalucía.",
        modelo: { nombre: "Modelo normalizado", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "informe-salud",
        nombre: "Informe sobre condiciones de salud",
        obligatorio: true,
        condicion_texto: "",
        detalle: "En modelo normalizado, firmado por personal sanitario del Sistema Sanitario Público de Andalucía (SSPA) o del sistema de protección sanitaria que corresponda.",
        modelo: { nombre: "Modelo normalizado SSPA", url: "" },
        donde_se_pide: "Centro de salud / sistema sanitario público",
        quien_lo_firma: "Personal sanitario del SSPA",
        caducidad_meses: 3,
        aviso: "Tiene una antigüedad máxima de 3 meses desde la fecha de solicitud. Pídelo el último, no el primero: si caduca mientras reúnes el resto de papeles, te lo devuelven.",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "representacion",
        nombre: "Acreditación de la representación",
        obligatorio: false,
        condicion_texto: "Solo si se presenta la solicitud en nombre de otra persona.",
        detalle: "",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "identidad",
        nombre: "DNI o NIE de la persona solicitante",
        obligatorio: true,
        condicion_texto: "",
        detalle: "",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "empadronamiento",
        nombre: "Certificado de empadronamiento",
        obligatorio: true,
        condicion_texto: "",
        detalle: "",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "Ayuntamiento",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "¿Basta el corriente o piden histórico con años de residencia?",
        verificacion: {},
      },
      {
        id: "rentas",
        nombre: "Última declaración de la renta o documento acreditativo de rentas",
        obligatorio: true,
        condicion_texto: "",
        detalle: "Para acreditar la capacidad económica.",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
    ],

    consejos: [
      {
        tipo: "error_tipico",
        titulo: "El informe de salud caduca antes de presentar",
        texto: "Solo vale si tiene menos de 3 meses. El error más común es pedirlo al principio y presentarlo cuando ya ha caducado, mientras se reúne el resto de papeles.",
        documento_id: "informe-salud",
        fuente_url: "",
        verificacion: {},
      },
      {
        tipo: "novedad",
        titulo: "Procedimiento unificado",
        texto: "Andalucía ha unificado el proceso: 1 solicitud – 1 visita – 1 resolución. Antes había dos visitas domiciliarias (valoración y PIA) y dos resoluciones separadas; ahora una sola resolución reconoce grado y prestaciones a la vez.",
        documento_id: null,
        fuente_url: "",
        verificacion: {},
      },
    ],

    // P1 y P2 (plazo legal y plazo de subsanación) ya se resolvieron: 90 y
    // 10 días respectivamente, ver plazo_legal y plazo_subsanacion arriba.
    // Lo que queda abierto es la checklist entera (documentos y consejos).
    preguntas_abiertas: [],
  },

  // ─────────────────────────────── MADRID ───────────────────────────────
  madrid: {
    id: "madrid",
    nombre: "Comunidad de Madrid",

    meta: {
      estado: "sin_verificar",
      verificado_por: "Andrea",
      fecha_verificacion: "",
      volcado_de: "datos-fuente/ccaa.csv",
      fecha_volcado: "2026-08-02",
    },

    // El nombre del organismo que gestiona en Madrid está vacío en el CSV:
    // no lo sabemos. No se rellena a ojo.
    organismo: {
      nombre: "",
      siglas: "",
      url: "",
    },

    plazo_legal: {
      dias: 180,
      norma_referencia: "Decreto 54/2015, de 21 de mayo, art. 28.1",
      norma_url: "https://noticias.juridicas.com/base_datos/CCAA/553564-d-54-2015-de-21-may-ca-madrid-procedimiento-para-reconocer-la-situacion-de.html",
    },

    // Sin confirmar todavía. NO se marca en `verificacion` (queda
    // sin_verificar por defecto, que es lo correcto mientras no lo esté).
    plazo_subsanacion: {
      dias: null,
      norma_referencia: "",
      norma_url: "",
    },

    plazo_medio: {
      dias: 342,
      fuente: "IMSERSO, Sistema de Información del SAAD, situación a 30 de junio de 2026 (tiempo medio Solicitud → Resolución de Prestación, primera resolución de cada persona)",
      fecha: "2026-06-30",
      url: "https://imserso.es/documents/20123/11151734/estsisaad_20260630.xlsx/961e14cf-d41a-f0bd-dbc9-1737a325c37e",
    },

    via_telematica: {
      disponible: null,
      nombre: "",
      url: "http://sede.comunidad.madrid/node/280192",
      requiere: "",
    },

    donde_presentar_presencial: "",

    consulta_estado: {
      necesitas: "Número de expediente",
      como: "Vía telemática o llamando al 012",
      telefono: "012",
      url: "",
    },

    // plazo_subsanacion NO entra aquí a propósito: sigue sin_verificar por
    // ausencia de la clave, tal como hace Fichas.estadoCampo() por defecto.
    verificacion: {
      plazo_legal: "verificado",
      plazo_medio: "verificado",
    },

    documentos: [
      {
        id: "solicitud",
        nombre: "Solicitud de reconocimiento de la situación de dependencia",
        obligatorio: true,
        condicion_texto: "",
        detalle: "Modelo oficial de la Comunidad de Madrid.",
        modelo: { nombre: "Modelo oficial CM", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "informe-salud",
        nombre: "Informe de salud actualizado",
        obligatorio: true,
        condicion_texto: "",
        detalle: "Hay dos modelos distintos según la edad: uno para 0-3 años y otro para mayores de 3 años.",
        modelo: { nombre: "Modelo según edad (0-3 años / mayores de 3 años)", url: "" },
        donde_se_pide: "Servicio de salud",
        quien_lo_firma: "Servicio de salud",
        caducidad_meses: 3,
        aviso: "Debe decir tres cosas concretas: los diagnósticos, que la situación de salud es estable, y qué ayuda concreta necesita para las actividades básicas de la vida diaria. Un informe genérico que solo liste diagnósticos suele generar un requerimiento.",
        fuente_url: "",
        notas_andrea: "Confirmar que la caducidad es de 3 meses también en Madrid",
        verificacion: {},
      },
      {
        id: "informe-social",
        nombre: "Informe social",
        obligatorio: true,
        condicion_texto: "",
        detalle: "Lo aportan los servicios sociales municipales.",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "Servicios sociales municipales",
        quien_lo_firma: "Servicios sociales municipales",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "identidad",
        nombre: "DNI/NIE del solicitante y del representante",
        obligatorio: true,
        condicion_texto: "",
        detalle: "",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "empadronamiento",
        nombre: "Certificado de empadronamiento",
        obligatorio: true,
        condicion_texto: "",
        detalle: "Acreditando 5 años de residencia en España, de los cuales los 2 últimos inmediatamente anteriores a la solicitud.",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "Ayuntamiento",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "autorizacion-consulta-datos",
        nombre: "Documento de autorización de consulta de datos",
        obligatorio: true,
        condicion_texto: "",
        detalle: "",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "rentas-pensiones",
        nombre: "Declaración de la Renta y certificado de pensiones del último ejercicio",
        obligatorio: true,
        condicion_texto: "",
        detalle: "O autorización para que la Administración los consulte directamente.",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "certificado-bancario",
        nombre: "Certificado bancario",
        obligatorio: true,
        condicion_texto: "",
        detalle: "Con el solicitante como titular de la cuenta.",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "patrimonio",
        nombre: "Declaración del Impuesto sobre el Patrimonio",
        obligatorio: false,
        condicion_texto: "Solo si está obligado a presentarla.",
        detalle: "",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "anexo-ii",
        nombre: "Anexo II",
        obligatorio: false,
        condicion_texto: "Solo para enfermedades y procesos de alta complejidad y curso irreversible. Existe trámite específico para ELA y para Grado III+.",
        detalle: "",
        modelo: { nombre: "Anexo II", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "extranjeros-no-comunitarios",
        nombre: "Certificado del Ministerio del Interior",
        obligatorio: false,
        condicion_texto: "Solo para extranjeros no comunitarios: acredita 5 años de residencia legal.",
        detalle: "",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
    ],

    consejos: [
      {
        tipo: "error_tipico",
        titulo: "Informe de salud genérico",
        texto: "Un informe que solo lista diagnósticos, sin decir que la situación es estable ni qué ayuda concreta se necesita, suele generar un requerimiento y retrasa el expediente.",
        documento_id: "informe-salud",
        fuente_url: "",
        verificacion: {},
      },
      {
        tipo: "consulta",
        titulo: "Consulta de estado por teléfono",
        texto: "Con el número de expediente, se puede consultar el estado llamando al 012 o por vía telemática.",
        documento_id: null,
        fuente_url: "",
        verificacion: {},
      },
    ],

    // P1 (plazo legal) ya se resolvió: 180 días, ver plazo_legal arriba.
    preguntas_abiertas: [
      { id: "P2", pregunta: "¿Cuántos días hay para subsanar cuando requieren documentación?", afecta_a: "plazo_subsanacion" },
    ],
  },

  // ────────────────────────────── MURCIA ────────────────────────────────
  murcia: {
    id: "murcia",
    nombre: "Región de Murcia",

    meta: {
      estado: "sin_verificar",
      verificado_por: "Andrea",
      fecha_verificacion: "",
      volcado_de: "datos-fuente/ccaa.csv",
      fecha_volcado: "2026-08-02",
    },

    organismo: {
      nombre: "Instituto Murciano de Acción Social",
      siglas: "IMAS",
      url: "https://www.carm.es/imas",
    },

    plazo_legal: {
      dias: 180,
      norma_referencia: "Decreto 74/2011, de 20 de mayo, art. 12.2",
      norma_url: "https://regiondemurciasocial.carm.es/-/decreto-74-2011-de-reconocimiento-de-la-situacion-de-dependencia",
    },

    plazo_subsanacion: {
      dias: 10,
      norma_referencia: "art. 9 del mismo decreto (el texto dice \"diez días\" sin especificar si son hábiles; remite al art. 71 de la Ley 30/1992, derogada — la Ley 39/2015 vigente, art. 68, sí dice \"hábiles\" expresamente)",
      norma_url: "https://regiondemurciasocial.carm.es/-/decreto-74-2011-de-reconocimiento-de-la-situacion-de-dependencia",
    },

    // Cifra oficial del IMSERSO: 551 días (sustituye a los 559 de la
    // investigación inicial de Andrea, que no tenía fuente citable).
    plazo_medio: {
      dias: 551,
      fuente: "IMSERSO, Sistema de Información del SAAD, situación a 30 de junio de 2026 (tiempo medio Solicitud → Resolución de Prestación, primera resolución de cada persona)",
      fecha: "2026-06-30",
      url: "https://imserso.es/documents/20123/11151734/estsisaad_20260630.xlsx/961e14cf-d41a-f0bd-dbc9-1737a325c37e",
    },

    via_telematica: {
      disponible: null,
      nombre: "",
      url: "https://sede.carm.es/web/pagina?IDCONTENIDO=7402&IDTIPO=240&RASTRO=c%24m40288",
      requiere: "",
    },

    donde_presentar_presencial: "",

    consulta_estado: {
      necesitas: "",
      como: "",
      telefono: "",
      url: "https://sede.carm.es/web/pagina?IDCONTENIDO=7402&IDTIPO=240&RASTRO=c%24m40288",
    },

    verificacion: {
      plazo_legal: "verificado",
      plazo_subsanacion: "verificado",
      plazo_medio: "verificado",
    },

    documentos: [
      {
        id: "solicitud",
        nombre: "Solicitud inicial de grado de dependencia",
        obligatorio: true,
        condicion_texto: "",
        detalle: "En modelo normalizado.",
        modelo: { nombre: "Modelo normalizado", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "informe-salud",
        nombre: "Informe sobre condiciones de salud",
        obligatorio: true,
        condicion_texto: "",
        detalle: "En el modelo normalizado incluido en OMI-AP, el software de atención primaria.",
        modelo: { nombre: "Modelo normalizado OMI-AP", url: "" },
        donde_se_pide: "Centro de salud",
        quien_lo_firma: "Profesional del sistema público de salud",
        // Vacío, y NO sabemos si es que no caduca o que nadie lo miró.
        // Es la pregunta P4 de abajo.
        caducidad_meses: null,
        aviso: "Existe un modelo específico y simplificado, el protocolo OMI \"IMAS SOLICITUD DEPENDENCIA NOV2024\", pensado para agilizar el trámite. Casi nadie lo pide porque no se conoce: pide este en el centro de salud en vez del genérico.",
        fuente_url: "",
        notas_andrea: "PRIORITARIO: ¿tiene caducidad este informe en Murcia? Ahora está vacío y no sabemos si es que no caduca o que no se miró",
        verificacion: {},
      },
      {
        id: "informe-salud-mutualistas",
        nombre: "Informe de salud para mutualistas",
        obligatorio: false,
        condicion_texto: "Solo para mutualistas del Estado (MUFACE, ISFAS, MUGEJU): modelo de informe distinto, adjunto al trámite.",
        detalle: "",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "identidad",
        nombre: "DNI o NIE de la persona solicitante",
        obligatorio: true,
        condicion_texto: "",
        detalle: "",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "datos-economicos",
        nombre: "Documentación de pensiones e IRPF",
        obligatorio: false,
        condicion_texto: "Solo si no se autoriza la consulta a la AEAT: documento de pensiones reconocidas del año actual, más copia íntegra de la declaración de IRPF y patrimonio del último ejercicio disponible.",
        detalle: "",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "extranjeros-comunitarios",
        nombre: "Certificado del Registro Central de Extranjeros",
        obligatorio: false,
        condicion_texto: "Solo para extranjeros comunitarios: certificado del Registro Central de Extranjeros + pasaporte.",
        detalle: "",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      {
        id: "extranjeros-no-comunitarios",
        nombre: "Certificado de residencia legal",
        obligatorio: false,
        condicion_texto: "Solo para extranjeros no comunitarios: certificado de periodos de residencia legal.",
        detalle: "",
        modelo: { nombre: "", url: "" },
        donde_se_pide: "",
        quien_lo_firma: "",
        caducidad_meses: null,
        aviso: "",
        fuente_url: "",
        notas_andrea: "",
        verificacion: {},
      },
      // OJO: en documentos.csv hay una fila más para Murcia, con doc_id
      // "empadronamiento" y nombre "PENDIENTE DE CONFIRMAR SI EXISTE". No se
      // ha copiado aquí como documento a propósito: no es un documento, es
      // una pregunta sin responder. Está abajo como P3. Si Andrea confirma
      // que Murcia sí lo exige, pasa a ser un documento normal; si confirma
      // que no lo exige, se marca no_aplica.
    ],

    consejos: [
      {
        tipo: "dato_alto_valor",
        titulo: "El modelo simplificado que casi nadie conoce",
        texto: "En Murcia existe un modelo de informe médico específico y simplificado (protocolo OMI \"IMAS SOLICITUD DEPENDENCIA NOV2024\"), creado para agilizar el trámite. Muchas familias no saben que existe y piden un informe genérico.",
        documento_id: "informe-salud",
        fuente_url: "",
        verificacion: {},
      },
      {
        tipo: "aviso",
        titulo: "Enfermedades raras",
        texto: "Deben constar explícitamente en el diagnóstico del informe de salud.",
        documento_id: "informe-salud",
        fuente_url: "",
        verificacion: {},
      },
    ],

    // P1 y P2 (plazo legal y plazo de subsanación) ya se resolvieron: 180 y
    // 10 días respectivamente, ver plazo_legal y plazo_subsanacion arriba.
    preguntas_abiertas: [
      { id: "P3", pregunta: "¿Murcia exige certificado de empadronamiento? Andalucía y Madrid sí; aquí no aparece en la lista. O no lo pide, o se nos escapó.", afecta_a: "documentos.empadronamiento" },
      { id: "P4", pregunta: "¿El informe de salud caduca en Murcia? En Andalucía y Madrid son 3 meses; aquí está vacío y no sabemos si es que no caduca o que no se miró.", afecta_a: "documentos.informe-salud.caducidad_meses" },
    ],
  },

};
