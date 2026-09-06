// contador.js — El "reloj legal": cuántos días lleva esperando un expediente.
//
// PROTECCIÓN DE DATOS. Cosas que este archivo NO hace, a propósito:
//   1. No envía la fecha ni la comunidad elegida a ningún sitio (no hay
//      fetch, no hay formulario).
//   2. No las guarda (nada de localStorage ni sessionStorage).
//   3. No las escribe nunca en la URL (los parámetros acaban en los
//      registros del servidor y en la analítica).
// Las dos viven en variables de JavaScript mientras la pestaña está
// abierta, y desaparecen al cerrarla. Si alguna vez hace falta cambiar
// esto, hay que hablarlo antes: es la promesa que hace la propia página.
//
// El plazo por defecto se lee siempre de CONFIG.PLAZO_LEGAL_DIAS (el
// estatal). Si la persona elige una comunidad con plazo propio ya
// verificado, se usa ese en su lugar — ver plazoAplicable() más abajo.
// Este archivo no tiene ningún número de días escrito a mano.

(function () {
  "use strict";

  var campo = document.getElementById("fecha-solicitud");
  var salida = document.getElementById("resultado-contador");
  var selectorComunidad = document.getElementById("comunidad-solicitud");
  if (!campo || !salida || typeof CONFIG === "undefined") return;

  var MS_POR_DIA = 24 * 60 * 60 * 1000;

  // ── Selector de comunidad autónoma ──────────────────────────────────
  //
  // Las opciones NO están escritas en el HTML: se construyen aquí a partir
  // de DATOS_CCAA, y solo entran las comunidades cuyo plazo legal ya está
  // verificado (Fichas.plazoLegalDe(ficha).verificado === true). Así, si
  // mañana se añade una cuarta comunidad sin verificar su plazo legal
  // todavía, no aparece en la lista sin que nadie tenga que acordarse de
  // tocar este archivo.
  function construirOpcionesComunidad() {
    if (!selectorComunidad) return;
    if (typeof DATOS_CCAA === "undefined" || typeof Fichas === "undefined") return;

    var placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "— Elige tu comunidad —";
    selectorComunidad.appendChild(placeholder);

    var ids = Object.keys(DATOS_CCAA);
    for (var i = 0; i < ids.length; i++) {
      var ficha = DATOS_CCAA[ids[i]];
      var info = Fichas.plazoLegalDe(ficha);
      if (info.verificado) {
        var opcion = document.createElement("option");
        opcion.value = ficha.id;
        opcion.textContent = ficha.nombre;
        selectorComunidad.appendChild(opcion);
      }
    }

    var otra = document.createElement("option");
    otra.value = "otra";
    otra.textContent = "Otra comunidad (plazo general: 6 meses)";
    selectorComunidad.appendChild(otra);
  }

  // Qué plazo aplicar según lo elegido en el selector. Si no hay selector,
  // no hay comunidad elegida, o la elegida es "otra", el comportamiento es
  // idéntico al de antes de que existiera este selector: el estatal.
  function plazoAplicable() {
    var valor = selectorComunidad ? selectorComunidad.value : "";
    var ficha = (valor && typeof DATOS_CCAA !== "undefined" && DATOS_CCAA[valor])
      ? DATOS_CCAA[valor]
      : null;

    if (ficha && typeof Fichas !== "undefined") {
      var info = Fichas.plazoLegalDe(ficha);
      info.nombre_ccaa = ficha.nombre;
      return info;
    }

    return {
      dias: CONFIG.PLAZO_LEGAL_DIAS,
      origen: "estatal",
      norma: "",
      url: "",
      verificado: false,
      nombre_ccaa: "",
    };
  }

  // Trabajamos siempre con fechas "a mediodía UTC" convertidas a números.
  // Es la forma sencilla de restar dos días de calendario sin que el cambio
  // de hora de marzo y octubre nos descuadre el resultado en un día.
  function comoDiaUTC(anio, mes, dia) {
    return Date.UTC(anio, mes - 1, dia);
  }

  function hoy() {
    var ahora = new Date();
    return comoDiaUTC(ahora.getFullYear(), ahora.getMonth() + 1, ahora.getDate());
  }

  // El navegador da el valor del <input type="date"> como "AAAA-MM-DD".
  // Lo parseamos a mano en vez de con new Date(texto) porque esa función
  // interpreta ese formato como UTC y, según la zona horaria, devuelve el
  // día anterior.
  function parsearFecha(texto) {
    var partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(texto);
    if (!partes) return null;

    var anio = Number(partes[1]);
    var mes = Number(partes[2]);
    var dia = Number(partes[3]);

    var fecha = comoDiaUTC(anio, mes, dia);
    var comprobacion = new Date(fecha);

    // Descarta fechas que no existen (el 31 de febrero, por ejemplo).
    if (comprobacion.getUTCFullYear() !== anio ||
        comprobacion.getUTCMonth() + 1 !== mes ||
        comprobacion.getUTCDate() !== dia) {
      return null;
    }
    return fecha;
  }

  function dias(n) {
    return n === 1 ? "1 día" : n.toLocaleString("es-ES") + " días";
  }

  function limpiar() {
    salida.textContent = "";
    salida.className = "resultado";
  }

  function mostrarAviso(texto) {
    limpiar();
    salida.className = "resultado dato-invalido";
    var p = document.createElement("p");
    p.textContent = texto;
    salida.appendChild(p);
  }

  // La frase sobre el plazo aplicable. Si es autonómico, muestra la norma:
  // es lo que hace defendible el dato si alguien lo cuestiona. Si es el
  // estatal (nada elegido, u "otra comunidad"), es el texto genérico de
  // siempre.
  function fraseLegal(info) {
    if (info.origen === "autonomico") {
      return "El plazo en " + info.nombre_ccaa + " es de " + dias(info.dias) +
             ", según " + info.norma;
    }
    return "El plazo legal máximo es de " + dias(info.dias);
  }

  // Solo se construye HTML con números y textos que ya conocemos de
  // antemano (config.js / datos-ccaa.js); nunca se inserta texto escrito
  // por la persona.
  function mostrarResultado(diasPasados, info) {
    var plazo = info.dias;
    limpiar();

    var html = diasPasados === 0
      ? '<p class="cifra">La solicitud se presentó <strong>hoy</strong>.</p>'
      : '<p class="cifra">Han pasado <strong>' + dias(diasPasados) + "</strong>.</p>";

    if (diasPasados < plazo) {
      var quedan = plazo - diasPasados;
      html += "<p>" + fraseLegal(info) +
              ". Todavía estás dentro de plazo: quedan <strong>" + dias(quedan) + "</strong>.</p>" +
              "<p>Te recomendamos revisar ahora que la documentación esté completa, " +
              "porque es el momento en que más solicitudes se paralizan.</p>";
    } else if (diasPasados === plazo) {
      // Justo el día en que vence. Sin este caso el texto diría
      // "lleva 0 días de retraso", que no se entiende.
      salida.className = "resultado fuera-de-plazo";
      html += "<p>Hoy se cumple: " + fraseLegal(info) + ".</p>" +
              "<p>A partir de mañana, la Administración está fuera de plazo. Eso no hace " +
              "que pierdas tu derecho, pero sí te permite presentar un escrito reclamando " +
              "que se resuelva.</p>";
    } else {
      var retraso = diasPasados - plazo;
      salida.className = "resultado fuera-de-plazo";
      html += "<p>" + fraseLegal(info) +
              ": la Administración lleva <strong>" + dias(retraso) + " de retraso</strong>.</p>" +
              "<p>Superar el plazo no hace que pierdas tu derecho, pero sí te permite " +
              "presentar un escrito reclamando que se resuelva.</p>";
    }

    salida.innerHTML = html;
  }

  // La nota sobre la reforma estatal pendiente (180 → 90 días si se publica
  // en el BOE) solo tiene sentido cuando se está usando el plazo ESTATAL.
  // Andalucía ya tiene 90 días por un decreto autonómico propio de 2021,
  // sin relación con esa reforma: mostrarle esa nota a alguien que ya ve
  // 90 días de Andalucía es confuso y parece que la web se contradice.
  function actualizarNotaReforma(info) {
    var reformaAplica = !!(CONFIG.REFORMA_PENDIENTE && CONFIG.REFORMA_PENDIENTE.activa);
    var usaPlazoPropio = info.origen === "autonomico" && info.verificado;
    var notas = document.querySelectorAll("[data-nota-reforma]");
    for (var i = 0; i < notas.length; i++) {
      notas[i].hidden = !(reformaAplica && !usaPlazoPropio);
    }
  }

  function calcular() {
    var info = plazoAplicable();
    actualizarNotaReforma(info);

    var texto = campo.value;
    if (!texto) {
      limpiar();
      return;
    }

    var fecha = parsearFecha(texto);
    if (fecha === null) {
      mostrarAviso("Esa fecha no es válida. Escríbela como día, mes y año.");
      return;
    }

    var diasPasados = Math.floor((hoy() - fecha) / MS_POR_DIA);

    if (diasPasados < 0) {
      mostrarAviso("Esa fecha es futura. Escribe el día en que se presentó la solicitud.");
      return;
    }

    mostrarResultado(diasPasados, info);
  }

  // Impide elegir una fecha futura en el propio calendario del navegador.
  (function fijarMaximo() {
    var ahora = new Date();
    var mes = String(ahora.getMonth() + 1).padStart(2, "0");
    var dia = String(ahora.getDate()).padStart(2, "0");
    campo.max = ahora.getFullYear() + "-" + mes + "-" + dia;
  })();

  construirOpcionesComunidad();

  campo.addEventListener("input", calcular);
  campo.addEventListener("change", calcular);
  if (selectorComunidad) {
    selectorComunidad.addEventListener("change", calcular);
  }
})();
