/* JAN.24 — Perfectionist's nightmare. A mandala, almost symmetric — one arm is flawed. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-24"] = function (p) {
  var W = 560, H = 560, N = 16, flawed;

  p.setup = function () {
    p.createCanvas(W, H);
    p.noLoop();
    flawed = Math.floor(p.random(N));
  };

  p.draw = function () {
    p.background(window.GENUARY_PALETTE.bg);
    p.translate(W / 2, H / 2);
    for (var i = 0; i < N; i++) {
      p.push();
      p.rotate((i / N) * Math.PI * 2);
      var isFlaw = i === flawed;
      var len = isFlaw ? 150 * 1.14 : 150;
      var bend = isFlaw ? 0.18 : 0;
      p.stroke(isFlaw ? window.GENUARY_PALETTE.coral : p.myColor);
      p.strokeWeight(1.6);
      p.noFill();
      p.beginShape();
      for (var t = 0; t <= 1; t += 0.1) {
        var r = t * len;
        var a = bend * Math.sin(t * Math.PI);
        p.vertex(Math.cos(a) * r, Math.sin(a) * r - t * 10);
      }
      p.endShape();
      p.noStroke();
      p.fill(isFlaw ? window.GENUARY_PALETTE.coral : p.myColor);
      p.circle(0, -len, 6);
      p.pop();
    }
  };
};
