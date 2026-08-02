# Guía: subir la web a GitHub y publicarla con GitHub Pages

Sigue estos pasos en orden. Tardas entre 15 y 25 minutos la primera vez; las
siguientes actualizaciones son 3 comandos y un minuto.

---

## Paso 0 — Comprobar si tienes Git instalado

Abre una terminal (en Windows: busca "PowerShell" en el menú de inicio) y
escribe:

```
git --version
```

- Si responde con algo como `git version 2.4x.x`, ya lo tienes: salta al Paso 1.
- Si dice que el comando no se reconoce, instala Git desde
  [git-scm.com/download/win](https://git-scm.com/download/win), acepta las
  opciones por defecto durante la instalación, y cierra y vuelve a abrir la
  terminal.

## Paso 1 — Crear el repositorio en GitHub (en el navegador)

1. Entra en [github.com](https://github.com) con tu cuenta.
2. Arriba a la derecha, pulsa el **+** → **New repository**.
3. Rellena:
   - **Repository name:** `copiloto-dependencia`
   - **Description:** (opcional) "Landing de validación — Ley de Dependencia"
   - **Public** (tiene que ser público para que GitHub Pages funcione gratis)
   - **No marques** "Add a README file" ni ".gitignore" ni "license" — el
     proyecto ya tiene sus propios archivos y si GitHub crea uno, se lía con lo
     que subas después.
4. Pulsa **Create repository**.

Te va a aparecer una pantalla con comandos. No los copies todavía: usa los del
Paso 2, que están adaptados a tu carpeta.

## Paso 2 — Subir el código desde la terminal

Abre la terminal y ve a la carpeta del proyecto:

```
cd "C:\Users\Jose\Desktop\Web_Dependencia"
```

Ahora, uno por uno (pulsa Enter después de cada línea y espera a que termine):

```
git init
git add .
git commit -m "Landing de validación: contador de plazo, quiénes somos, aviso legal y privacidad"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/copiloto-dependencia.git
git push -u origin main
```

**Sustituye `TU-USUARIO`** por tu nombre de usuario real de GitHub — lo ves en
la URL de la página que creaste en el Paso 1, o en la pantalla de comandos que
GitHub te enseñó.

Si es la primera vez que usas Git desde este ordenador, antes de `git commit`
puede pedirte que te identifiques. Si sale un error de "please tell me who you
are", ejecuta esto una vez (con tus datos) y repite el `git commit` de arriba:

```
git config --global user.name "Joan Guasch"
git config --global user.email "tu-email-de-github@ejemplo.com"
```

En el `git push`, es posible que se abra una ventana del navegador pidiéndote
que inicies sesión en GitHub para autorizar. Es normal, acepta y vuelve a la
terminal.

## Paso 3 — Activar GitHub Pages

1. En la página del repositorio en GitHub, ve a **Settings** (pestaña arriba).
2. En el menú de la izquierda, pulsa **Pages**.
3. En "Build and deployment" → "Source", elige **Deploy from a branch**.
4. En "Branch", selecciona **main** y la carpeta **/ (root)**. Pulsa **Save**.
5. Espera uno o dos minutos. Al recargar la página de Settings → Pages, arriba
   te dirá algo como:

   *"Your site is live at https://TU-USUARIO.github.io/copiloto-dependencia/"*

Esa es la URL pública. Ábrela y comprueba que el contador funciona.

## Paso 4 — Verificación rápida antes de mandársela a nadie

- Abre la URL en el móvil, no solo en el ordenador: la mayoría de gente que
  entrará en esta web lo hará desde el teléfono.
- Prueba el contador con una fecha de hace 8 meses: debe salir el aviso de
  fuera de plazo.
- Comprueba que los enlaces de "Aviso legal" y "Política de privacidad" del pie
  funcionan.
- Mira la barra de direcciones mientras usas el contador: la fecha que
  escribas no debe aparecer nunca ahí.

## Cómo se actualiza a partir de ahora

Cada vez que cambies algo en la carpeta (tú, o cuando le pidas cambios a
Claude Code), para publicarlo:

```
cd "C:\Users\Jose\Desktop\Web_Dependencia"
git add .
git commit -m "Describe aquí qué has cambiado"
git push
```

GitHub Pages tarda uno o dos minutos en reflejar el cambio. No hace falta
repetir el Paso 3, eso solo se hace una vez.

## Nota sobre el dominio .es

El plan original habla de comprar un dominio `.es` (~10 €). GitHub Pages lo
admite: se compra el dominio en cualquier registrador, se configura un DNS que
apunte a GitHub, y se añade en Settings → Pages → "Custom domain". **No es
necesario para esta fase de validación** — la URL gratuita de GitHub sirve para
enseñar la landing a los despachos. Hazlo solo si decidís seguir después del 16
de agosto.
