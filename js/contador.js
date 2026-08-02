// contador.js — El "reloj legal": cuántos días lleva esperando un expediente.
//
// PROTECCIÓN DE DATOS. Tres cosas que este archivo NO hace, a propósito:
//   1. No envía la fecha a ningún sitio (no hay fetch, no hay formulario).
//   2. No la guarda (nada de localStorage ni sessionStorage).
//   3. No la escribe nunca en la URL (los parámetros acaban en los registros
//      del servidor y en la analítica).
// La fecha vive en una variable de JavaScript mientras la pestaña está
// abierta, y desaparece al cerrarla. Si alguna vez hace falta cambiar esto,
// hay que hablarlo antes: es la promesa que hace la propia página.
//
// El plazo se lee siempre de CONFIG.PLAZO_LEGAL_DIAS. Este archivo no tiene
// ningún número de días escrito a mano.

(function () {
  "use strict";

  var campo = document.getElementById("fecha-solicitud");
  var salida = document.getElementById("resultado-contador");
  if (!campo || !salida || typeof CONFIG === "undefined") return;

  var MS_POR_DIA = 24 * 60 * 60 * 1000;

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

  // Solo se construye HTML con números que ya hemos validado; nunca se
  // inserta texto escrito por la persona.
  function mostrarResultado(diasPasados) {
    var plazo = CONFIG.PLAZO_LEGAL_DIAS;
    limpiar();

    var html = diasPasados === 0
      ? '<p class="cifra">La solicitud se presentó <strong>hoy</strong>.</p>'
      : '<p class="cifra">Han pasado <strong>' + dias(diasPasados) + "</strong>.</p>";

    if (diasPasados < plazo) {
      var quedan = plazo - diasPasados;
      html += "<p>El plazo legal máximo es de " + dias(plazo) +
              ". Todavía estás dentro de plazo: quedan <strong>" + dias(quedan) + "</strong>.</p>" +
              "<p>Te recomendamos revisar ahora que la documentación esté completa, " +
              "porque es el momento en que más solicitudes se paralizan.</p>";
    } else if (diasPasados === plazo) {
      // Justo el día en que vence. Sin este caso el texto diría
      // "lleva 0 días de retraso", que no se entiende.
      salida.className = "resultado fuera-de-plazo";
      html += "<p>Hoy se cumple el plazo legal máximo de " + dias(plazo) + ".</p>" +
              "<p>A partir de mañana, la Administración está fuera de plazo. Eso no hace " +
              "que pierdas tu derecho, pero sí te permite presentar un escrito reclamando " +
              "que se resuelva.</p>";
    } else {
      var retraso = diasPasados - plazo;
      salida.className = "resultado fuera-de-plazo";
      html += "<p>El plazo legal máximo es de " + dias(plazo) +
              ": la Administración lleva <strong>" + dias(retraso) + " de retraso</strong>.</p>" +
              "<p>Superar el plazo no hace que pierdas tu derecho, pero sí te permite " +
              "presentar un escrito reclamando que se resuelva.</p>";
    }

    salida.innerHTML = html;
  }

  function calcular() {
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

    mostrarResultado(diasPasados);
  }

  // Impide elegir una fecha futura en el propio calendario del navegador.
  (function fijarMaximo() {
    var ahora = new Date();
    var mes = String(ahora.getMonth() + 1).padStart(2, "0");
    var dia = String(ahora.getDate()).padStart(2, "0");
    campo.max = ahora.getFullYear() + "-" + mes + "-" + dia;
  })();

  campo.addEventListener("input", calcular);
  campo.addEventListener("change", calcular);
})();
