/* JAN.22 — Pen plotter ready. Stroke-only parallel hatching, no fill, no opacity. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-22"] = function (p) {
  var W = 560, H = 560;

  p.setup = function () {
    p.createCanvas(W, H);
    p.noLoop();
    p.noFill();
    p.stroke(p.myColor);
    p.strokeWeight(1);
  };

  p.draw = function () {
    p.background(window.GENUARY_PALETTE.bg);
    var spacing = 4;
    for (var y = 10; y < H - 10; y += spacing) {
      var density = p.map(Math.sin(y * 0.02) + Math.cos(y * 0.013), -2, 2, 2, 14);
      for (var x = 10; x < W - 10; x += density) {
        var yy = y + Math.sin(x * 0.05 + y * 0.02) * 3;
        p.line(x, yy, x + density * 0.7, yy);
      }
    }
  };
};
