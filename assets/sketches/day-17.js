/* JAN.17 — Wallpaper group. One motif, mirrored into a p4m-like tiling. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-17"] = function (p) {
  var W = 560, H = 560, s = 70;

  function motif() {
    p.stroke(p.myColor);
    p.noFill();
    p.beginShape();
    p.vertex(4, 4);
    p.bezierVertex(s * 0.6, s * 0.1, s * 0.5, s * 0.5, s - 4, s - 4);
    p.endShape();
    p.circle(s * 0.25, s * 0.75, s * 0.22);
  }

  p.setup = function () {
    p.createCanvas(W, H);
    p.noLoop();
    p.noFill();
    p.strokeWeight(2);
  };

  p.draw = function () {
    p.background(window.GENUARY_PALETTE.bg);
    var cols = Math.ceil(W / s) + 1, rows = Math.ceil(H / s) + 1;
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        p.push();
        p.translate(i * s, j * s);
        var fx = i % 2 === 0 ? 1 : -1, fy = j % 2 === 0 ? 1 : -1;
        p.translate(fx < 0 ? s : 0, fy < 0 ? s : 0);
        p.scale(fx, fy);
        motif();
        p.pop();
      }
    }
  };
};
