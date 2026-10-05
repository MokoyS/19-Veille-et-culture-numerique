/* JAN.08 — A City. Generative metropolis via recursive subdivision. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-08"] = function (p) {
  var W = 560, H = 560, towers = [];

  function subdivide(x0, x1, depth) {
    var w = x1 - x0;
    if (w < 24 || depth > 6 || p.random() < 0.25) {
      var centerBias = 1 - Math.abs((x0 + x1) / 2 - W / 2) / (W / 2);
      var h = p.random(40, 60 + 260 * Math.pow(centerBias, 1.3));
      towers.push({ x: x0, w: w, h: h, seed: p.random(1000) });
      return;
    }
    var cut = x0 + w * p.random(0.35, 0.65);
    subdivide(x0, cut, depth + 1);
    subdivide(cut, x1, depth + 1);
  }

  p.setup = function () {
    p.createCanvas(W, H);
    p.noStroke();
    subdivide(0, W, 1);
  };

  p.draw = function () {
    p.background('#07080c');
    var t = p.frameCount;
    towers.forEach(function (tw) {
      var y = H - tw.h;
      p.fill('#12131c');
      p.rect(tw.x + 1, y, tw.w - 2, tw.h);
      var cols = Math.max(1, Math.floor(tw.w / 14));
      var rows = Math.max(1, Math.floor(tw.h / 16));
      for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
          var n = p.noise(tw.seed + i * 0.6, j * 0.6, Math.floor(t / 20));
          if (n > 0.45) {
            p.fill(p.myColor);
            p.rect(tw.x + 4 + i * 14, y + 6 + j * 16, 6, 8);
          }
        }
      }
    });
  };
};
