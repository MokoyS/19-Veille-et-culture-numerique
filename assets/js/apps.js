/* =========================================================
   GENUARY OS — applications : Dossier, Visionneuse de jour,
   Chat, Bloc-notes. Tout lit assets/data/days.json au runtime.
   ========================================================= */

window.App = (function () {
  "use strict";

  var DAYS = null;
  var SITE = {
    author: "Maxime Lebas",
    email: "maxandco2003@gmail.com",
    github: "https://github.com/MokoyS"
  };

  function $(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function pad(n) { return String(n).padStart(2, "0"); }

  function loadDays() {
    if (DAYS) return Promise.resolve(DAYS);
    return fetch("assets/data/days.json").then(function (r) { return r.json(); }).then(function (d) { DAYS = d; return d; });
  }

  /* ---------------------------------------------------------------
     DOSSIER — grille des 31 jours
  --------------------------------------------------------------- */
  function openFolder() {
    return OS.createOrFocus("folder-genuary", function () {
      var win = OS.createWindow({
        title: "GENUARY_26",
        icon: "📁",
        accent: "cyan",
        width: 620, height: 480,
        menubar: ["Fichier", "Édition", "Affichage", "Favoris"],
        status: "31 objets",
        body: function (body) {
          body.innerHTML = '<div class="folder-grid" id="folderGrid"></div>';
          var grid = body.querySelector("#folderGrid");
          loadDays().then(function (days) {
            days.forEach(function (d) {
              var item = $("div", "f-item");
              item.style.setProperty("--ic", "var(--c-" + d.color + ")");
              item.innerHTML =
                '<div class="tile">' + d.date.replace("JAN. ", "") + '</div>' +
                '<div class="nm">JAN.' + pad(d.id) + '</div>' +
                '<div class="meta">' + (d.domOnly ? "no-canvas" : "p5.js") + '</div>';
              item.title = d.title + " — " + d.prompt;
              item.addEventListener("click", function () { openDay(d.id); });
              grid.appendChild(item);
            });
          });
        }
      });
      return win;
    });
  }

  /* ---------------------------------------------------------------
     VISIONNEUSE DE JOUR
  --------------------------------------------------------------- */
  function openDay(id) {
    return loadDays().then(function (days) {
      var day = days.find(function (d) { return d.id === id; });
      if (!day) return null;
      var idx = days.indexOf(day);
      var prev = days[idx - 1], next = days[idx + 1];

      return OS.createOrFocus("day-" + day.id, function () {
        var win = OS.createWindow({
          title: day.date + " — " + day.title,
          icon: "🗂",
          accent: day.color,
          width: 660, height: 540,
          menubar: ["Fichier", "Édition", "Affichage"],
          status: "Prompt #" + pad(day.id) + " / 31",
          body: function (body, winObj) {
            body.innerHTML =
              '<div class="day-view" style="--ic: var(--c-' + day.color + ')">' +
                '<div class="dv-main">' +
                  '<div class="dv-stage" id="stage"></div>' +
                  '<div class="dv-side">' +
                    '<span class="dv-tag">' + day.date + ' · credit: ' + esc(day.credit) + '</span>' +
                    '<h2 class="dv-title">' + esc(day.title) + '</h2>' +
                    '<p class="dv-prompt">“' + esc(day.prompt) + '”</p>' +
                    '<div class="dv-note"><span class="lbl">Note d\'intention</span><p>' + esc(day.justification) + '</p></div>' +
                    '<div class="dv-nav">' +
                      (prev ? '<button class="xp-btn" id="btnPrev">← #' + pad(prev.id) + '</button>' : '<button class="xp-btn" disabled>← début</button>') +
                      '<button class="xp-btn" id="btnFolder">📁 dossier</button>' +
                      (next ? '<button class="xp-btn" id="btnNext">#' + pad(next.id) + ' →</button>' : '<button class="xp-btn" disabled>fin →</button>') +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>';

            var stage = body.querySelector("#stage");
            winObj.p5instance = window.mountGenuarySketch(day, stage);

            var pv = body.querySelector("#btnPrev");
            var nx = body.querySelector("#btnNext");
            var fd = body.querySelector("#btnFolder");
            if (pv) pv.addEventListener("click", function () { openDay(prev.id); });
            if (nx) nx.addEventListener("click", function () { openDay(next.id); });
            if (fd) fd.addEventListener("click", openFolder);
          },
          onClose: function () {}
        });
        return win;
      });
    });
  }

  /* ---------------------------------------------------------------
     CHAT — G26_BOT.exe
  --------------------------------------------------------------- */
  function openChat() {
    return OS.createOrFocus("chat", function () {
      return OS.createWindow({
        title: "G26_BOT.exe",
        icon: "💬",
        accent: "magenta",
        width: 380, height: 500,
        status: "aucune IA — arbre de dialogue écrit à la main",
        body: function (body) {
          body.innerHTML = '<div class="chat-app" id="chatRoot"></div>';
          window.mountGenuaryChat(body.querySelector("#chatRoot"), function (action) {
            if (action.action === "open-day") openDay(action.day);
          });
        }
      });
    });
  }

  /* ---------------------------------------------------------------
     BLOC-NOTES — texte statique (about / readme / contact)
  --------------------------------------------------------------- */
  var NOTES = {
    readme: {
      title: "LISEZ-MOI.txt", icon: "📄", accent: "lemon",
      html:
        '<h1>GENUARY OS</h1>' +
        '<p>Bienvenue. Ce "bureau" contient mes 31 réponses au défi <b>Genuary</b> — un prompt de création numérique par jour pendant tout le mois de janvier.</p>' +
        '<p>— Ouvrez le dossier <b>GENUARY_26</b> pour parcourir les 31 jours.<br>' +
        '— Chaque jour est une fenêtre : sketch généré en direct + note expliquant mes choix.<br>' +
        '— Ouvrez <b>G26_BOT.exe</b> pour discuter — aucune IA, juste des réponses écrites à l\'avance.</p>' +
        '<p>Rien ici n\'est généré par un modèle d\'image. Tout est du code, écrit à la main, jour après jour.</p>'
    },
    about: {
      title: "A_propos.txt", icon: "📄", accent: "amber",
      html:
        '<h1>À propos</h1>' +
        '<p><b>' + SITE.author + '</b><br>Étudiant B3 — module Veille &amp; culture numérique et créative.</p>' +
        '<p>Ce site est mon rendu pour le projet Genuary : 31 mini-projets de création numérique, un par jour de janvier, et un chatbot non-IA pour en parler.</p>' +
        '<p>La suite logique de ce travail est un petit zine imprimable généré via un agent sur Eden.art.</p>'
    },
    contact: {
      title: "Contact.txt", icon: "📄", accent: "violet",
      html:
        '<h1>Contact</h1>' +
        '<p>Email : <a href="mailto:' + SITE.email + '">' + SITE.email + '</a></p>' +
        '<p>GitHub : <a href="' + SITE.github + '" target="_blank" rel="noopener">' + SITE.github.replace("https://", "") + '</a></p>' +
        '<p>Genuary officiel : <a href="https://genuary.art/prompts" target="_blank" rel="noopener">genuary.art/prompts</a></p>'
    }
  };

  function openNote(key) {
    var note = NOTES[key];
    if (!note) return;
    return OS.createOrFocus("note-" + key, function () {
      return OS.createWindow({
        title: note.title, icon: note.icon, accent: note.accent,
        width: 380, height: 320,
        menubar: ["Fichier", "Édition", "Format", "Affichage", "?"],
        status: false,
        body: function (body) {
          body.innerHTML = '<div class="notepad">' + note.html + '</div>';
        }
      });
    });
  }

  function openGithub() {
    window.open(SITE.github, "_blank", "noopener");
  }

  /* ---------------------------------------------------------------
     BOOT
  --------------------------------------------------------------- */
  function boot() {
    OS.init();
    wireDesktop();

    setTimeout(function () {
      var bootEl = document.getElementById("boot");
      if (bootEl) {
        bootEl.classList.add("hide");
        setTimeout(function () { bootEl.style.display = "none"; }, 450);
      }
      openFolder();
      openNote("readme");
    }, 1200);
  }

  function wireDesktop() {
    document.querySelectorAll(".d-icon").forEach(function (icon) {
      icon.addEventListener("click", function (e) {
        document.querySelectorAll(".d-icon").forEach(function (i) { i.classList.remove("selected"); });
        icon.classList.add("selected");
      });
      icon.addEventListener("dblclick", function () { triggerIcon(icon.dataset.app); });
    });

    document.getElementById("startBtn").addEventListener("click", function (e) {
      e.stopPropagation();
      OS.toggleStartMenu();
    });
    document.querySelectorAll("#startMenu [data-app]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        triggerIcon(btn.dataset.app);
        OS.toggleStartMenu(false);
      });
    });
  }

  function triggerIcon(app) {
    if (app === "folder") openFolder();
    else if (app === "chat") openChat();
    else if (app === "about") openNote("about");
    else if (app === "contact") openNote("contact");
    else if (app === "readme") openNote("readme");
    else if (app === "github") openGithub();
  }

  document.addEventListener("DOMContentLoaded", boot);

  return { openFolder: openFolder, openDay: openDay, openChat: openChat, openNote: openNote, openGithub: openGithub };
})();
