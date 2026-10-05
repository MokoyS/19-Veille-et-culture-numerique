/* JAN.29 — Genetic evolution and mutation. Selection by proximity, no AI involved. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-29"] = function (p) {
  var W = 560, H = 560, pop = [];

  function rand3() { return [p.random(8, 26), p.random(360), Math.floor(p.random(3, 8))]; }

  p.setup = function () {
    p.createCanvas(W, H);
    p.noStroke();
    p.colorMode(p.HSB, 360, 100, 100, 1);
    for (var i = 0; i < 24; i++) pop.push({ g: rand3(), x: p.random(W), y: p.random(H) });
  };

  p.draw = function () {
    p.background(10, 5, 5);

    if (p.frameCount % 50 === 0) {
      pop.sort(function (a, b) {
        return p.dist(a.x, a.y, W / 2, H / 2) - p.dist(b.x, b.y, W / 2, H / 2);
      });
      var survivors = pop.slice(0, 12);
      var kids = [];
      survivors.forEach(function (s) {
        var g = s.g.slice();
        g[0] = p.constrain(g[0] + p.random(-4, 4), 6, 30);
        g[1] = (g[1] + p.random(-30, 30) + 360) % 360;
        g[2] = p.constrain(Math.round(g[2] + p.random([-1, 0, 1])), 3, 9);
        kids.push({ g: g, x: p.random(W), y: p.random(H) });
      });
      pop = survivors.concat(kids);
    }

    pop.forEach(function (ind) {
      ind.x += Math.cos(p.frameCount * 0.01 + ind.g[1]) * 0.6;
      ind.y += Math.sin(p.frameCount * 0.013 + ind.g[1]) * 0.6;
      ind.x = (ind.x + W) % W;
      ind.y = (ind.y + H) % H;
      p.push();
      p.translate(ind.x, ind.y);
      p.fill(ind.g[1], 70, 90);
      p.beginShape();
      for (var k = 0; k < ind.g[2]; k++) {
        var a = (k / ind.g[2]) * Math.PI * 2;
        p.vertex(Math.cos(a) * ind.g[0], Math.sin(a) * ind.g[0]);
      }
      p.endShape(p.CLOSE);
      p.pop();
    });

    p.noFill();
    p.stroke(0, 0, 30);
    p.circle(W / 2, H / 2, 20);
  };
};
