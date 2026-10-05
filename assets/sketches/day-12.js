/* JAN.12 — Boxes only. Binary space partition, no other primitive allowed. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-12"] = function (p) {
  var W = 560, H = 560, rects = [];

  function split(x, y, w, h, depth) {
    if (depth > 6 || (w < 40 && h < 40) || p.random() < 0.22) {
      rects.push({ x: x, y: y, w: w, h: h, d: depth });
      return;
    }
    if (w > h) {
      var cut = w * p.random(0.3, 0.7);
      split(x, y, cut, h, depth + 1);
      split(x + cut, y, w - cut, h, depth + 1);
    } else {
      var cuty = h * p.random(0.3, 0.7);
      split(x, y, w, cuty, depth + 1);
      split(x, y + cuty, w, h - cuty, depth + 1);
    }
  }

  p.setup = function () {
    p.createCanvas(W, H);
    p.noLoop();
    p.rectMode(p.CORNER);
    split(0, 0, W, H, 0);
  };

  p.draw = function () {
    p.background(window.GENUARY_PALETTE.bg);
    var maxd = 6;
    rects.forEach(function (r) {
      var t = r.d / maxd;
      var col = p.lerpColor(p.color(window.GENUARY_PALETTE.surface), p.color(p.myColor), t);
      p.fill(col);
      p.stroke(window.GENUARY_PALETTE.bg);
      p.strokeWeight(3);
      p.rect(r.x, r.y, r.w, r.h);
    });
  };
};
