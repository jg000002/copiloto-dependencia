// fichas.js — Cómo se leen las fichas de comunidad autónoma.
//
// Este archivo no pinta nada en la página. Solo responde preguntas sobre los
// datos de datos-ccaa.js, y existe para que esas respuestas estén escritas
// una vez y no repartidas por el código que algún día pinte la checklist.
//
// Separado de datos-ccaa.js a propósito: ese archivo es una copia del Sheet
// de Andrea y no debe tener lógica dentro.

var Fichas = (function () {
  "use strict";

  var VERIFICADO = "verificado";
  var SIN_VERIFICAR = "sin_verificar";
  var NO_APLICA = "no_aplica";

  // Estado de verificación de un campo concreto.
  //
  // La regla es deliberadamente prudente: si nadie ha dicho explícitamente
  // que un campo está verificado, NO lo está. Que un campo tenga un valor
  // escrito no significa que esté comprobado — hoy las tres fichas tienen
  // valores y ninguno tiene URL que lo respalde.
  //
  //   entidad → una ficha, un documento o un consejo (cualquier cosa con
  //             un objeto `verificacion`)
  //   campo   → el nombre del campo, p. ej. "plazo_medio" o "caducidad_meses"
  function estadoCampo(entidad, campo) {
    if (!entidad || !entidad.verificacion) return SIN_VERIFICAR;
    var estado = entidad.verificacion[campo];
    if (estado === VERIFICADO || estado === NO_APLICA) return estado;
    return SIN_VERIFICAR;
  }

  // ¿Se puede enseñar este campo en la web?
  // Solo si está verificado. Ni "sin_verificar" ni "no_aplica" se publican:
  // el primero porque no nos consta, el segundo porque no hay nada que
  // contar.
  function sePuedePublicar(entidad, campo) {
    return estadoCampo(entidad, campo) === VERIFICADO;
  }

  // ¿Se puede enseñar la ficha entera (la checklist de documentación)?
  // Mientras la ficha esté sin verificar, la web no la pinta. Publicar una
  // lista de papeles sin poder decir de dónde sale es el riesgo que estamos
  // evitando en esta fase.
  function fichaPublicable(ficha) {
    return !!ficha && !!ficha.meta && ficha.meta.estado === VERIFICADO;
  }

  // Plazo legal aplicable a una comunidad, en días.
  //
  // Si la comunidad no fija uno propio, se usa el estatal de config.js. Esto
  // importa: el contador le dice a una familia que la Administración ha
  // incumplido el plazo. Si esa comunidad tuviera un plazo distinto y aquí
  // usáramos el estatal, le estaríamos diciendo que reclame cuando no puede.
  //
  // Devuelve también de dónde sale el número, para poder mostrarlo.
  function plazoLegalDe(ficha) {
    var propio = ficha && ficha.plazo_legal;

    if (propio && typeof propio.dias === "number") {
      return {
        dias: propio.dias,
        origen: "autonomico",
        norma: propio.norma_referencia,
        url: propio.norma_url,
        verificado: estadoCampo(ficha, "plazo_legal") === VERIFICADO,
      };
    }

    return {
      dias: CONFIG.PLAZO_LEGAL_DIAS,
      origen: "estatal",
      norma: "",
      url: "",
      verificado: false,
    };
  }

  // Cuánto trabajo de verificación queda en una ficha. Sirve para saber de
  // un vistazo si una comunidad está lista para publicarse.
  function cuentaPendientes(ficha) {
    var pendientes = 0;
    var i;

    for (i = 0; i < ficha.documentos.length; i++) {
      if (!ficha.documentos[i].fuente_url) pendientes++;
    }

    return {
      ccaa: ficha.nombre,
      estado: ficha.meta.estado,
      documentos: ficha.documentos.length,
      documentos_sin_fuente: pendientes,
      preguntas_abiertas: ficha.preguntas_abiertas.length,
    };
  }

  return {
    VERIFICADO: VERIFICADO,
    SIN_VERIFICAR: SIN_VERIFICAR,
    NO_APLICA: NO_APLICA,
    estadoCampo: estadoCampo,
    sePuedePublicar: sePuedePublicar,
    fichaPublicable: fichaPublicable,
    plazoLegalDe: plazoLegalDe,
    cuentaPendientes: cuentaPendientes,
  };
})();
