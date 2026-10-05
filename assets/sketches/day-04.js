/* JAN.04 — Lowres. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-04"] = function (p) {
  var W = 560, H = 560, RES = 26, buf;

  p.setup = function () {
    p.createCanvas(W, H);
    p.noLoop();
    p.randomSeed(7);

    buf = p.createGraphics(RES, RES);
    buf.background(window.GENUARY_PALETTE.bg);
    buf.noStroke();

    buf.fill(window.GENUARY_PALETTE.surface);
    buf.ellipse(RES * 0.5, RES * 0.55, RES * 0.62, RES * 0.78);

    buf.fill(p.myColor);
    buf.ellipse(RES * 0.37, RES * 0.46, RES * 0.09);
    buf.ellipse(RES * 0.63, RES * 0.46, RES * 0.09);

    buf.noFill();
    buf.stroke(p.myColor);
    buf.strokeWeight(1.4);
    buf.arc(RES * 0.5, RES * 0.62, RES * 0.26, RES * 0.18, 0, Math.PI);
  };

  p.draw = function () {
    p.noSmooth();
    p.image(buf, 0, 0, W, H);
  };
};
