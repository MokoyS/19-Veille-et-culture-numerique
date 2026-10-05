/* JAN.14 — Everything fits perfectly. A gapless isometric triangle tessellation. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-14"] = function (p) {
  var W = 560, H = 560, s = 34;

  p.setup = function () {
    p.createCanvas(W, H);
    p.noLoop();
    p.noStroke();
  };

  p.draw = function () {
    p.background(window.GENUARY_PALETTE.bg);
    var h = s * Math.sqrt(3) / 2;
    var cols = Math.ceil(W / s) + 2, rows = Math.ceil(H / h) + 2;
    var palette = [window.GENUARY_PALETTE.surface, p.myColor, window.GENUARY_PALETTE.bgSoft];

    for (var j = -1; j < rows; j++) {
      for (var i = -1; i < cols; i++) {
        var x = i * s + (j % 2 ? s / 2 : 0);
        var y = j * h;
        var i1 = ((i + j) % 3 + 3) % 3;
        var i2 = ((i + j + 1) % 3 + 3) % 3;
        p.fill(palette[i1]);
        p.triangle(x, y + h, x + s / 2, y, x + s, y + h);
        p.fill(palette[i2]);
        p.triangle(x + s / 2, y, x + s, y + h, x + s * 1.5, y);
      }
    }
  };
};
