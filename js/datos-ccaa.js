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
// Ejemplo de cómo se marcará cuando Andrea confirme algo:
//
//     verificacion: {
//       plazo_medio: "verificado",     // tiene dias + fuente + fecha + url
//       plazo_legal: "no_aplica",      // comprobado: usa el estatal, no fija uno propio
//     }
//
// HOY NO HAY NI UN SOLO CAMPO VERIFICADO. Las tres fichas vienen de la
// investigación de Andrea pero ninguna tiene URL que la respalde, así que
// los tres objetos `verificacion` están vacíos a propósito. Por eso la web
// todavía no pinta nada de este archivo.
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
      siglas: "",
      url: "",
    },

    // Plazo propio de esta comunidad para resolver. Vacío = se usa
    // CONFIG.PLAZO_LEGAL_DIAS (el estatal). Ver fichas.js.
    plazo_legal: {
      dias: null,
      norma_referencia: "",
      norma_url: "",
    },

    // Días para aportar lo que falta cuando la Administración requiere
    // documentación. Si se pasa, el expediente se archiva.
    plazo_subsanacion: {
      dias: null,
      norma_referencia: "",
      norma_url: "",
    },

    // Un solo número, nunca un rango. Andrea lo vació al detectar que las
    // dos cifras que teníamos (477 y 496) venían de fuentes distintas.
    plazo_medio: {
      dias: null,
      fuente: "",
      fecha: "",
      url: "",
    },

    via_telematica: {
      disponible: true,
      nombre: "Ventanilla Electrónica de la Dependencia (VED)",
      url: "",
      requiere: "certificado digital / Cl@ve",
    },

    donde_presentar_presencial: "",

    consulta_estado: {
      necesitas: "",
      como: "",
      telefono: "",
      url: "",
    },

    verificacion: {},

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

    preguntas_abiertas: [
      { id: "P1", pregunta: "¿El plazo legal para resolver es de 180 días en Andalucía, o su normativa fija uno propio?", afecta_a: "plazo_legal" },
      { id: "P2", pregunta: "¿Cuántos días hay para subsanar cuando requieren documentación?", afecta_a: "plazo_subsanacion" },
    ],
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
      dias: null,
      norma_referencia: "",
      norma_url: "",
    },

    plazo_subsanacion: {
      dias: null,
      norma_referencia: "",
      norma_url: "",
    },

    // Sabemos que empeoró +42 días en 2025 y que está por encima de la
    // media, pero no tenemos el número. Vacío hasta que lo haya.
    plazo_medio: {
      dias: null,
      fuente: "",
      fecha: "",
      url: "",
    },

    via_telematica: {
      disponible: null,
      nombre: "",
      url: "",
      requiere: "",
    },

    donde_presentar_presencial: "",

    consulta_estado: {
      necesitas: "Número de expediente",
      como: "Vía telemática o llamando al 012",
      telefono: "012",
      url: "",
    },

    verificacion: {},

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

    preguntas_abiertas: [
      { id: "P1", pregunta: "¿El plazo legal para resolver es de 180 días en Madrid, o su normativa fija uno propio?", afecta_a: "plazo_legal" },
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
      url: "",
    },

    plazo_legal: {
      dias: null,
      norma_referencia: "",
      norma_url: "",
    },

    plazo_subsanacion: {
      dias: null,
      norma_referencia: "",
      norma_url: "",
    },

    // 559 días viene de la investigación de Andrea, pero sin fuente, fecha
    // ni URL: sigue estando sin_verificar y no se puede publicar todavía.
    plazo_medio: {
      dias: 559,
      fuente: "",
      fecha: "",
      url: "",
    },

    via_telematica: {
      disponible: null,
      nombre: "",
      url: "",
      requiere: "",
    },

    donde_presentar_presencial: "",

    consulta_estado: {
      necesitas: "",
      como: "",
      telefono: "",
      url: "",
    },

    verificacion: {},

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

    preguntas_abiertas: [
      { id: "P1", pregunta: "¿El plazo legal para resolver es de 180 días en Murcia, o su normativa fija uno propio?", afecta_a: "plazo_legal" },
      { id: "P2", pregunta: "¿Cuántos días hay para subsanar cuando requieren documentación?", afecta_a: "plazo_subsanacion" },
      { id: "P3", pregunta: "¿Murcia exige certificado de empadronamiento? Andalucía y Madrid sí; aquí no aparece en la lista. O no lo pide, o se nos escapó.", afecta_a: "documentos.empadronamiento" },
      { id: "P4", pregunta: "¿El informe de salud caduca en Murcia? En Andalucía y Madrid son 3 meses; aquí está vacío y no sabemos si es que no caduca o que no se miró.", afecta_a: "documentos.informe-salud.caducidad_meses" },
    ],
  },

};
