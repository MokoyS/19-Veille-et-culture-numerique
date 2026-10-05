/* JAN.01 — One color, one shape. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-01"] = function (p) {
  var W = 560, H = 560, N = 9, cells = [];

  p.setup = function () {
    p.createCanvas(W, H);
    p.noStroke();
    for (var i = 0; i < N; i++) {
      for (var j = 0; j < N; j++) {
        cells.push({
          x: (i + 0.5) * W / N,
          y: (j + 0.5) * H / N,
          ph: p.random(p.TWO_PI),
          base: p.random(0.5, 1)
        });
      }
    }
  };

  p.draw = function () {
    p.background(window.GENUARY_PALETTE.bg);
    var t = p.millis() / 1000;
    p.fill(p.myColor);
    cells.forEach(function (c) {
      var r = (W / N) * 0.42 * (0.55 + 0.45 * Math.sin(t * 1.3 + c.ph)) * c.base;
      p.circle(c.x, c.y, r * 2);
    });
  };
};
