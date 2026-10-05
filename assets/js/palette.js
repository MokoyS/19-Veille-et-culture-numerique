/* Palette partagée — mêmes valeurs que les variables CSS dans style.css,
   pour que chaque sketch puisse dessiner avec sa couleur d'accent exacte. */
window.GENUARY_PALETTE = {
  acid:    "#52ff9b",
  magenta: "#ff4fb8",
  cyan:    "#3fe3ff",
  amber:   "#ffb23c",
  violet:  "#b98bff",
  coral:   "#ff6a55",
  lemon:   "#f3ff5f",
  azure:   "#5ab3ff",
  bg:      "#0a0a0d",
  bgSoft:  "#111116",
  surface: "#16161d",
  line:    "#2b2b36",
  ink:     "#f1ede4",
  inkDim:  "#9b98a6"
};
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};

/* Monte le sketch `day.slug` dans `containerEl` avec SA PROPRE couleur isolée
   (plusieurs fenêtres de jours différents peuvent tourner en même temps —
   chaque instance p5 reçoit sa couleur via p.myColor, jamais via une globale
   mutable, pour éviter que deux fenêtres ouvertes en parallèle se "volent"
   leur couleur l'une l'autre). Retourne l'instance p5, ou null pour le jour
   DOM-only (28) qui ne crée pas de canvas. */
window.mountGenuarySketch = function (day, containerEl) {
  var fn = window.GENUARY_SKETCHES[day.slug];
  var colorHex = window.GENUARY_PALETTE[day.color] || window.GENUARY_PALETTE.acid;
  if (day.domOnly) {
    fn(containerEl, colorHex);
    return null;
  }
  var wrapped = function (p) {
    p.myColor = colorHex;
    fn(p);
  };
  return new p5(wrapped, containerEl);
};
