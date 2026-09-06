// config.js — Constantes legales y cifras oficiales de Copiloto Dependencia.
//
// TODO lo que pueda cambiar por una reforma legal o por la publicación de
// nuevas cifras oficiales vive AQUÍ, y solo aquí. Ningún otro archivo debe
// tener el número 180, 90, 314 o 32704 escrito a mano: siempre se lee de
// aquí, para que actualizar sea cambiar una línea, no buscar por el código.

const CONFIG = {
  // Plazo legal máximo para resolver una solicitud de dependencia
  // (Ley 39/2006 y desarrollo autonómico).
  //
  // El Congreso aprobó el 14/07/2026 una reforma que lo reduce de 6 a 3
  // meses (180 → 90 días), pero a fecha de hoy sigue pendiente en el
  // Senado y NO ha entrado en vigor.
  //
  // >>> EN CUANTO SE PUBLIQUE EN EL BOE: cambiar PLAZO_LEGAL_DIAS a 90 <<<
  // >>> y poner REFORMA_PENDIENTE.activa en false.                    <<<
  PLAZO_LEGAL_DIAS: 180,

  // Información sobre la reforma en tramitación, para mostrarla como
  // aviso secundario bajo el contador (nunca como el dato principal).
  REFORMA_PENDIENTE: {
    activa: true,
    plazo_propuesto_dias: 90,
    fecha_aprobacion_congreso: "2026-07-14",
    estado_texto: "Aprobada en el Congreso, pendiente en el Senado. No está en vigor.",
  },

  // Cifras oficiales del proyecto. Usamos siempre la fuente del Panel del
  // SAAD (es la más reciente); no mezclar con la cifra del Observatorio
  // Estatal (341 días) en el mismo texto o tabla.
  //
  // PENDIENTE: las dos cifras se publican ya en la landing y ninguna tiene
  // todavía URL que la respalde. Los campos *_url están vacíos a propósito;
  // los rellena Andrea con el enlace a la fuente oficial. Misma regla que en
  // las fichas: si no hay URL, no se puede defender el dato ante nadie.
  CIFRAS_OFICIALES: {
    plazo_medio_dias: 314,
    plazo_medio_fuente: "IMSERSO, Sistema de Información del SAAD, situación a 30 de junio de 2026 (fila 'Total Nacional', tiempo medio Solicitud → Resolución de Prestación)",
    plazo_medio_url: "https://imserso.es/documents/20123/11151734/estsisaad_20260630.xlsx/961e14cf-d41a-f0bd-dbc9-1737a325c37e",

    fallecidos_esperando_anio: 2025,
    fallecidos_esperando_total: 32704,
    fallecidos_esperando_fuente: "Observatorio Estatal, cierre 2025",
    fallecidos_esperando_url: "",
  },
};
