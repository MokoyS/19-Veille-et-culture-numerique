/* JAN.23 — Transparency. The canvas never clears: passing twice over the same spot deepens it. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-23"] = function (p) {
  var W = 560, H = 560;

  p.setup = function () {
    p.createCanvas(W, H);
    p.background(window.GENUARY_PALETTE.bg);
    p.noStroke();
  };

  p.draw = function () {
    p.push();
    p.drawingContext.globalAlpha = 0.05;
    p.fill(p.myColor);
    for (var i = 0; i < 4; i++) {
      p.circle(p.mouseX + p.random(-30, 30), p.mouseY + p.random(-30, 30), p.random(20, 70));
    }
    p.pop();
  };
};
