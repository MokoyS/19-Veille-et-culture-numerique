/* JAN.30 — It's not a bug, it's a feature. A kept and amplified indexing glitch. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-30"] = function (p) {
  var W = 560, H = 560, parts = [];

  p.setup = function () {
    p.createCanvas(W, H);
    p.noStroke();
    p.background(window.GENUARY_PALETTE.bg);
    for (var i = 0; i < 160; i++) {
      parts.push({ x: p.random(W), y: p.random(H), vx: p.random(-1, 1), vy: p.random(-1, 1) });
    }
  };

  p.draw = function () {
    p.push();
    p.drawingContext.globalAlpha = 0.12;
    p.fill(window.GENUARY_PALETTE.bg);
    p.rect(0, 0, W, H);
    p.pop();

    parts.forEach(function (pt, i) {
      pt.x += pt.vx; pt.y += pt.vy;
      // Le "bug" original : lire la vélocité du voisin suivant plutôt que la sienne — gardé volontairement.
      var other = parts[(i + 1) % parts.length];
      pt.vx += (other.vx - pt.vx) * 0.02 + p.random(-0.15, 0.15);
      pt.vy += (other.vy - pt.vy) * 0.02 + p.random(-0.15, 0.15);
      if (pt.x < 0 || pt.x > W) pt.x = p.random(W);
      if (pt.y < 0 || pt.y > H) pt.y = p.random(H);
      p.fill(p.myColor);
      p.circle(pt.x, pt.y, 2.4);
    });
  };
};
