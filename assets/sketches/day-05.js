/* JAN.05 — Write "Genuary". Avoid using a font. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-05"] = function (p) {
  var W = 560, H = 560, U = 14;

  var FONT = {
    G: [[4,0,0,0],[0,0,0,6],[0,6,4,6],[4,6,4,3],[2,3,4,3]],
    E: [[4,0,0,0],[0,0,0,6],[0,6,4,6],[0,3,3,3]],
    N: [[0,0,0,6],[0,0,4,6],[4,0,4,6]],
    U: [[0,0,0,6],[0,6,4,6],[4,6,4,0]],
    A: [[0,6,2,0],[2,0,4,6],[1,3,3,3]],
    R: [[0,0,0,6],[0,0,4,0],[4,0,4,3],[0,3,4,3],[0,3,4,6]],
    Y: [[0,0,2,3],[4,0,2,3],[2,3,2,6]]
  };
  var WORD = "GENUARY";

  p.setup = function () {
    p.createCanvas(W, H);
    p.noLoop();
    p.strokeCap(p.ROUND);
  };

  function twig(x1, y1, x2, y2, depth) {
    var steps = 6, px = x1, py = y1;
    for (var i = 1; i <= steps; i++) {
      var t = i / steps;
      var nx = p.lerp(x1, x2, t) + p.random(-1.6, 1.6);
      var ny = p.lerp(y1, y2, t) + p.random(-1.6, 1.6);
      p.line(px, py, nx, ny);
      if (depth < 2 && p.random() < 0.18) {
        var ang = Math.atan2(ny - py, nx - px) + p.random([-1, 1]) * p.random(0.6, 1.1);
        var len = p.random(4, 10);
        p.line(nx, ny, nx + Math.cos(ang) * len, ny + Math.sin(ang) * len);
      }
      px = nx; py = ny;
    }
  }

  p.draw = function () {
    p.background(window.GENUARY_PALETTE.bg);
    p.stroke(p.myColor);
    p.strokeWeight(1.3);
    p.noFill();

    var totalW = WORD.length * 5 * U;
    var startX = (W - totalW) / 2;
    var startY = (H - 6 * U) / 2;

    for (var i = 0; i < WORD.length; i++) {
      var segs = FONT[WORD[i]];
      var ox = startX + i * 5 * U;
      segs.forEach(function (s) {
        twig(ox + s[0] * U, startY + s[1] * U, ox + s[2] * U, startY + s[3] * U, 0);
      });
    }
  };
};
