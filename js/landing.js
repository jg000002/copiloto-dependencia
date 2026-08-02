// landing.js — Pequeños ajustes de página, compartidos por todo el sitio.
//
// Se carga desde index.html, aviso-legal.html y privacidad.html por igual.
// Solo index.html carga también config.js (es la única página con cifras
// oficiales y con el aviso de la reforma). Por eso ese bloque comprueba que
// CONFIG existe antes de usarlo; el resto del archivo —el año del pie— no
// depende de config.js y debe funcionar en las tres páginas.

(function () {
  "use strict";

  // ── Cifras oficiales y aviso de la reforma (solo si hay config.js) ──
  //
  // Ninguna cifra oficial (180, 314, 32.704) debe estar escrita a mano en
  // el HTML. Si estuviera, el día que cambie habría que buscarla por todo
  // el proyecto. Aquí el HTML deja el hueco (<span data-cifra="...">) y
  // este bloque lo rellena leyendo CONFIG.
  if (typeof CONFIG !== "undefined") {
    var CIFRAS = {
      plazo_legal_dias: CONFIG.PLAZO_LEGAL_DIAS,
      plazo_medio_dias: CONFIG.CIFRAS_OFICIALES.plazo_medio_dias,
      plazo_medio_fuente: CONFIG.CIFRAS_OFICIALES.plazo_medio_fuente,
      fallecidos_esperando_total: CONFIG.CIFRAS_OFICIALES.fallecidos_esperando_total,
      fallecidos_esperando_anio: CONFIG.CIFRAS_OFICIALES.fallecidos_esperando_anio,
      fallecidos_esperando_fuente: CONFIG.CIFRAS_OFICIALES.fallecidos_esperando_fuente,
    };

    // Los años (2025, 2026) no llevan separador de miles; el resto de
    // números sí, para que 32704 se lea "32.704".
    var formatear = function (clave, valor) {
      if (typeof valor !== "number") return String(valor);
      if (clave.indexOf("anio") !== -1) return String(valor);
      return valor.toLocaleString("es-ES");
    };

    var huecos = document.querySelectorAll("[data-cifra]");
    for (var i = 0; i < huecos.length; i++) {
      var clave = huecos[i].getAttribute("data-cifra");
      if (Object.prototype.hasOwnProperty.call(CIFRAS, clave)) {
        huecos[i].textContent = formatear(clave, CIFRAS[clave]);
      }
    }

    // La nota sobre la reforma del Senado solo se enseña mientras la
    // reforma siga sin entrar en vigor. Cuando se publique en el BOE basta
    // con poner REFORMA_PENDIENTE.activa = false en config.js y desaparece
    // de la web.
    if (CONFIG.REFORMA_PENDIENTE && CONFIG.REFORMA_PENDIENTE.activa) {
      var notas = document.querySelectorAll("[data-nota-reforma]");
      for (var j = 0; j < notas.length; j++) {
        notas[j].hidden = false;
      }
    }
  }

  // ── Año del pie de página ──
  //
  // No depende de config.js a propósito: aviso-legal.html y privacidad.html
  // también tienen "© <año> Copiloto Dependencia" y no cargan config.js.
  var anios = document.querySelectorAll("[data-anio-actual]");
  for (var k = 0; k < anios.length; k++) {
    anios[k].textContent = String(new Date().getFullYear());
  }
})();
