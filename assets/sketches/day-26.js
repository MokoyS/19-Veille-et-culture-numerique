/* JAN.26 — Recursive grids. Split into a grid, recurse on each cell again and again.
   (Mon jour préféré du mois — voir la note d'intention sur la page.) */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-26"] = function (p) {
  var W = 560, H = 560;

  function recurse(x, y, w, h, depth) {
    var col = p.lerpColor(p.color(window.GENUARY_PALETTE.surface), p.color(p.myColor), depth / 7);
    p.push();
    p.translate(x + w / 2, y + h / 2);
    p.rotate(depth % 2 ? 0.02 : -0.02);
    p.fill(col);
    p.rectMode(p.CENTER);
    p.rect(0, 0, w * 0.94, h * 0.94, 2);
    p.pop();

    var pDivide = depth < 2 ? 1 : 0.97 * Math.pow(0.8, depth);
    if (depth < 7 && p.random() < pDivide) {
      var hw = w / 2, hh = h / 2;
      recurse(x, y, hw, hh, depth + 1);
      recurse(x + hw, y, hw, hh, depth + 1);
      recurse(x, y + hh, hw, hh, depth + 1);
      recurse(x + hw, y + hh, hw, hh, depth + 1);
    }
  }

  p.setup = function () {
    p.createCanvas(W, H);
    p.noLoop();
    p.noStroke();
    p.background(window.GENUARY_PALETTE.bg);
    recurse(0, 0, W, H, 0);
  };

  p.draw = function () {};
};
