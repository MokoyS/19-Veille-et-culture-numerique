/* =========================================================
   GENUARY26 — CHATBOT NON-IA
   Inspiré de https://p5js.org/tutorials/criticalAI4-no-ai-chatbot/
   Aucun modèle de langage : un arbre de dialogue écrit à la main.
   L'utilisateur choisit toujours parmi des options proposées,
   il ne peut jamais taper de texte libre.

   window.mountGenuaryChat(containerEl) construit l'interface dans
   n'importe quel conteneur — ici, la fenêtre "G26_BOT" de l'OS.
   ========================================================= */

(function () {
  "use strict";

  var MENU = {
    id: "root",
    bot: "Bonjour. Je ne suis pas une IA — je suis un script avec des réponses écrites à l'avance, comme ELIZA en 1966. Choisissez un sujet :",
    options: [
      { label: "📁  Le projet Genuary26", goto: "cat_projet" },
      { label: "⚙️  Le code & les outils", goto: "cat_code" },
      { label: "🧠  Pourquoi pas d'IA ?", goto: "cat_ia" },
      { label: "⭐  Mon projet favori", goto: "cat_favori" },
      { label: "✉️  Contact & bio", goto: "cat_contact" }
    ]
  };

  var NODES = {
    cat_projet: {
      bot: "Le projet Genuary26, en bref. Que voulez-vous savoir ?",
      options: [
        { label: "C'est quoi Genuary ?", goto: "q1" },
        { label: "Pourquoi tout tient sur un seul bureau ?", goto: "q2" },
        { label: "As-tu suivi les prompts à la lettre ?", goto: "q3" },
        { label: "Combien de temps ça prend, un Genuary ?", goto: "q4" }
      ]
    },
    q1: { bot: "Genuary est un défi collectif de création numérique : un prompt officiel par jour pendant tout le mois de janvier, à interpréter en code, sans contrainte de langage ni d'outil.", back: "cat_projet" },
    q2: { bot: "Parce que ce site EST l'OS : le dossier GENUARY_26 contient mes 31 mini-projets comme des fichiers sur un vrai bureau. Chaque jour s'ouvre dans sa propre fenêtre, exactement comme je l'aurais rangé sur mon disque dur.", back: "cat_projet" },
    q3: { bot: "Pas à la lettre, à l'esprit. Certains prompts (le Quine du jour 11, le \"no canvas\" du jour 28) sont volontairement interprétés plutôt qu'exécutés littéralement — la contrainte sert de déclencheur créatif, pas de cahier des charges rigide.", back: "cat_projet" },
    q4: { bot: "Entre 20 minutes et deux heures par jour selon le prompt. Le vrai défi n'est pas la difficulté technique, c'est la régularité : ne rater aucun des 31 jours.", back: "cat_projet" },

    cat_code: {
      bot: "Côté technique. Que voulez-vous savoir ?",
      options: [
        { label: "Quels outils as-tu utilisés ?", goto: "q5" },
        { label: "Comment le \"bureau\" est fait ?", goto: "q6" },
        { label: "Le code est-il disponible ?", goto: "q7" },
        { label: "Comment les couleurs sont choisies ?", goto: "q8" }
      ]
    },
    q5: { bot: "p5.js en mode instance pour la quasi-totalité des sketches, du HTML/CSS/JS pur pour le reste (zéro framework), et un peu de GLSL écrit à la main pour le jour 31.", back: "cat_code" },
    q6: { bot: "Un petit gestionnaire de fenêtres fait main en JavaScript : chaque fenêtre est une div positionnée en absolu, déplaçable à la souris, avec sa propre pile d'empilement (z-index). Aucune librairie d'interface, aucun framework — juste du DOM et des event listeners.", back: "cat_code" },
    q7: { bot: "Oui, tout le site est sur mon GitHub — raccourci disponible sur le bureau. Un fichier JS par jour, lisible et assumé.", back: "cat_code" },
    q8: { bot: "Huit couleurs d'accent tournent sur les 31 jours selon le numéro du prompt. Ce n'est pas aléatoire au pixel près : je voulais une identité cohérente plutôt qu'un chaos de couleurs sans logique.", back: "cat_code" },

    cat_ia: {
      bot: "L'absence volontaire d'IA. Que voulez-vous savoir ?",
      options: [
        { label: "Pourquoi ce chat n'utilise aucune IA ?", goto: "q9" },
        { label: "Alors comment il fonctionne vraiment ?", goto: "q10" },
        { label: "Je peux écrire ce que je veux ?", goto: "q11" },
        { label: "Il y a de l'IA générative ailleurs sur le site ?", goto: "q12" }
      ]
    },
    q9: { bot: "Parce que c'est précisément le sujet du tutoriel qui a inspiré ce chat (p5.js \"Critical AI: No-AI Chatbot\") : montrer qu'une conversation convaincante peut être programmée à la main, sans modèle de langage, comme les bots des années 1960.", back: "cat_ia" },
    q10: { bot: "Vous choisissez une question dans une liste écrite à l'avance, et je renvoie une réponse déjà écrite elle aussi. Pas de génération de texte, pas de compréhension du langage : juste un arbre de dialogue, comme ELIZA en 1966.", back: "cat_ia" },
    q11: { bot: "Non, c'est volontaire : vous choisissez uniquement parmi les réponses proposées. Ça évite l'illusion d'une \"compréhension\" qui n'existe pas, et ça assume les limites réelles du système.", back: "cat_ia" },
    q12: { bot: "Aucune. Chaque image de chaque jour est un rendu de code écrit à la main (p5.js/GLSL), sans modèle d'image, sans prompt texte-vers-image. C'est tout l'enjeu de Genuary : générer avec des règles, pas avec des modèles.", back: "cat_ia" },

    cat_favori: {
      bot: "Mon jour préféré du mois. Que voulez-vous savoir ?",
      options: [
        { label: "Quel est ton jour préféré ?", goto: "q13" },
        { label: "Pourquoi celui-là en particulier ?", goto: "q14" },
        { label: "C'est compliqué à coder ?", goto: "q15" },
        { label: "Où je peux le voir ?", goto: "q16" }
      ]
    },
    q13: { bot: "Le jour 26, \"Grilles dans les grilles\" (Recursive Grids) — une grille qui se redivise en elle-même jusqu'à ressembler à un circuit imprimé vu du ciel.", back: "cat_favori" },
    q14: { bot: "Avec une règle minuscule (diviser une cellule en 4, recommencer avec une probabilité qui diminue) j'obtiens une complexité que je n'aurais jamais pu dessiner à la main. C'est l'exemple parfait de ce que la génération procédurale permet.", back: "cat_favori" },
    q15: { bot: "Une quinzaine de lignes de récursivité, pas plus. La difficulté n'était pas technique — c'était de résister à l'envie d'ajouter des règles, et de laisser une règle simple produire seule toute la complexité.", back: "cat_favori" },
    q16: { bot: "Ouvrez le dossier GENUARY_26 sur le bureau et double-cliquez sur JAN.26 — je garde un raccourci juste en dessous.", link: { action: "open-day", day: 26, label: "→ Ouvrir le jour 26" }, back: "cat_favori" },

    cat_contact: {
      bot: "À propos de moi. Que voulez-vous savoir ?",
      options: [
        { label: "Qui a fait ce site ?", goto: "q17" },
        { label: "Comment te contacter ?", goto: "q18" },
        { label: "Ce site fait partie d'un projet plus large ?", goto: "q19" },
        { label: "Un conseil pour débuter Genuary ?", goto: "q20" }
      ]
    },
    q17: { bot: "Maxime Lebas, étudiant en B3 — ce site est mon rendu pour le module Veille et culture numérique et créative.", back: "cat_contact" },
    q18: { bot: "Mes coordonnées complètes (mail, GitHub) sont dans le fichier Contact.txt sur le bureau.", back: "cat_contact" },
    q19: { bot: "Oui : la suite logique est un petit zine imprimable généré à partir de ce site via un agent sur Eden.art, qui racontera ce même travail sous un autre format.", back: "cat_contact" },
    q20: { bot: "Ne visez pas la perfection : codez quelque chose tous les jours, même raté, même moche. Sur un défi de 31 jours, la régularité bat toujours la virtuosité.", back: "cat_contact" }
  };

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /**
   * Construit l'UI du chat dans `root`. `onAction(action)` est appelé
   * pour les liens spéciaux (ex: ouvrir une fenêtre "jour" depuis le chat).
   */
  window.mountGenuaryChat = function (root, onAction) {
    root.innerHTML =
      '<div class="chat-log" id="chatLog"></div>' +
      '<div class="chat-options" id="chatOptions"></div>';

    var logEl = root.querySelector("#chatLog");
    var optsEl = root.querySelector("#chatOptions");

    function addMsg(text, who) {
      var m = el("div", "chat-msg " + who);
      if (who === "bot") {
        m.innerHTML = '<span class="who">G26_BOT&gt;</span> ' + escapeHtml(text);
      } else {
        m.textContent = text;
      }
      logEl.appendChild(m);
      logEl.scrollTop = logEl.scrollHeight;
    }

    function renderOptions(list) {
      optsEl.innerHTML = "";
      list.forEach(function (opt) {
        var b = el("button", "chat-opt" + (opt.isBack ? " back" : ""), escapeHtml(opt.label));
        b.addEventListener("click", function () { handleChoice(opt); });
        optsEl.appendChild(b);
      });
    }

    function handleChoice(opt) {
      addMsg(opt.label, "user");
      var node = opt.goto === "root" ? MENU : NODES[opt.goto];
      renderNode(node);
    }

    function renderNode(node) {
      setTimeout(function () {
        addMsg(node.bot, "bot");
        if (node.link) {
          var a = el("button", "chat-link", node.link.label);
          a.addEventListener("click", function () {
            if (onAction) onAction(node.link);
          });
          logEl.appendChild(a);
          logEl.scrollTop = logEl.scrollHeight;
        }
        var options = (node.options || []).slice();
        if (node.back) options.push({ label: "⟵ retour au menu", goto: node.back, isBack: true });
        if (!node.options && !node.back) options.push({ label: "⟵ menu principal", goto: "root", isBack: true });
        renderOptions(options);
      }, 160);
    }

    addMsg(MENU.bot, "bot");
    renderOptions(MENU.options);
  };
})();
