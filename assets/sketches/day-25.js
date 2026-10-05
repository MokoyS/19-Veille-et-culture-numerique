/* JAN.25 — Organic geometry. A coral built only from recursively branching triangles. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-25"] = function (p) {
  var W = 560, H = 560;

  function branch(x, y, ang, len, depth) {
    if (depth > 9 || len < 6) return;
    var x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
    var w = p.map(depth, 0, 9, 16, 2);
    p.fill(p.lerpColor(p.color(window.GENUARY_PALETTE.surface), p.color(p.myColor), depth / 9));
    p.push();
    p.translate(x, y);
    p.rotate(ang + Math.PI / 2);
    p.triangle(-w / 2, 0, w / 2, 0, 0, -len);
    p.pop();
    var n = p.random() < 0.3 ? 3 : 2;
    for (var i = 0; i < n; i++) {
      branch(x2, y2, ang + p.random(-0.6, 0.6), len * p.random(0.68, 0.82), depth + 1);
    }
  }

  p.setup = function () {
    p.createCanvas(W, H);
    p.noLoop();
    p.noStroke();
    p.background(window.GENUARY_PALETTE.bg);
    branch(W / 2, H - 20, -Math.PI / 2, 90, 0);
  };

  p.draw = function () {};
};
