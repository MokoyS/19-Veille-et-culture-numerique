/* JAN.11 — Quine. The program contemplates its own source instead of duplicating it. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-11"] = function (p) {
  var W = 560, H = 560;
  var SRC = "window.GENUARY_SKETCHES['day-11']=function(p){ /* ce sketch affiche son propre code, caractere par caractere, au lieu de le dupliquer comme un vrai quine */ var self=arguments.callee.toString(); return self; }";
  var cols, drops = [], chars;

  p.setup = function () {
    p.createCanvas(W, H);
    chars = SRC.replace(/\s+/g, ' ').split('');
    cols = Math.floor(W / 12);
    for (var i = 0; i < cols; i++) drops.push(p.random(-40, 0));
    p.textFont('monospace');
    p.textSize(12);
    p.background(window.GENUARY_PALETTE.bg);
  };

  p.draw = function () {
    p.push();
    p.drawingContext.globalAlpha = 0.18;
    p.noStroke();
    p.fill(window.GENUARY_PALETTE.bg);
    p.rect(0, 0, W, H);
    p.pop();

    p.fill(p.myColor);
    for (var i = 0; i < cols; i++) {
      var ch = chars[Math.floor(drops[i] * 7 + i * 13) % chars.length] || '0';
      p.text(ch, i * 12, drops[i] * 14);
      drops[i] += p.noise(i, p.frameCount * 0.01) * 0.6 + 0.3;
      if (drops[i] * 14 > H && p.random() < 0.02) drops[i] = p.random(-20, 0);
    }
  };
};
