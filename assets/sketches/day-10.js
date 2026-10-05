/* JAN.10 — Polar coordinates. A rose curve, drawn only in (r, theta). */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-10"] = function (p) {
  var W = 560, H = 560;

  p.setup = function () {
    p.createCanvas(W, H);
    p.noFill();
    p.background(window.GENUARY_PALETTE.bg);
  };

  p.draw = function () {
    p.push();
    p.drawingContext.globalAlpha = 0.1;
    p.noStroke();
    p.fill(window.GENUARY_PALETTE.bg);
    p.rect(0, 0, W, H);
    p.pop();

    var t = p.millis() / 4000;
    p.push();
    p.translate(W / 2, H / 2);
    p.rotate(t * 0.3);
    var k = 4.5 + Math.sin(t * 0.7) * 1.2;
    p.stroke(p.myColor);
    p.strokeWeight(1.3);
    p.beginShape();
    for (var a = 0; a <= Math.PI * 2 * 7; a += 0.02) {
      var r = Math.cos(k * a) * 220;
      p.vertex(r * Math.cos(a), r * Math.sin(a));
    }
    p.endShape();
    p.pop();
  };
};
