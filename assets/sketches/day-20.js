/* JAN.20 — One line. A single continuous polyline, never lifted. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-20"] = function (p) {
  var W = 560, H = 560, pts = [];

  p.setup = function () {
    p.createCanvas(W, H);
    p.noFill();
    var x = W * 0.3, y = H * 0.3;
    for (var i = 0; i < 2600; i++) {
      var n = p.noise(x * 0.01, y * 0.01, i * 0.0008);
      var a = n * Math.PI * 6;
      x += Math.cos(a) * 2.4;
      y += Math.sin(a) * 2.4;
      x = p.constrain(x, 20, W - 20);
      y = p.constrain(y, 20, H - 20);
      pts.push({ x: x, y: y });
    }
  };

  p.draw = function () {
    p.background(window.GENUARY_PALETTE.bg);
    p.stroke(p.myColor);
    p.strokeWeight(1.1);
    p.beginShape();
    pts.forEach(function (pt) { p.vertex(pt.x, pt.y); });
    p.endShape();
  };
};
