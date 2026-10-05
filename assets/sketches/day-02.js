/* JAN.02 — Twelve principles of animation. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-02"] = function (p) {
  var W = 560, H = 560, groundY = H - 70, t0;

  p.setup = function () {
    p.createCanvas(W, H);
    p.noStroke();
    t0 = p.millis();
  };

  p.draw = function () {
    p.background(window.GENUARY_PALETTE.bg);
    p.fill(window.GENUARY_PALETTE.line);
    p.rect(0, groundY, W, 4);

    var dur = 1100;
    var t = ((p.millis() - t0) % dur) / dur;
    var y = groundY - Math.abs(Math.sin(t * Math.PI)) * (H * 0.55);

    var impact = 1 - Math.min(1, Math.abs(y - groundY) / 40);
    var sx = 1 + impact * 0.5;
    var sy = 1 - impact * 0.45;

    p.push();
    p.translate(W / 2, y);
    p.scale(sx, sy);
    p.fill(p.myColor);
    p.circle(0, 0, 70);
    p.pop();

    p.fill(window.GENUARY_PALETTE.inkDim);
    p.textFont('monospace'); p.textSize(10);
    p.text('squash & stretch · anticipation · easing', 14, H - 14);
  };
};
