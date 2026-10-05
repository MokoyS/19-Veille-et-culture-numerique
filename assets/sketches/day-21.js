/* JAN.21 — Bauhaus poster. Strict primary palette and primitive shapes. Click to regenerate. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-21"] = function (p) {
  var W = 560, H = 560, shapes = [];
  var BAU = ['#e3312a', '#f4c62e', '#2454a6', '#111111', p.myColor];

  function gen() {
    shapes = [];
    var count = Math.floor(p.random(5, 9));
    for (var i = 0; i < count; i++) {
      shapes.push({
        type: p.random(['circle', 'rect', 'tri']),
        x: p.random(W), y: p.random(H),
        s: p.random(40, 180),
        col: p.random(BAU),
        rot: p.random([0, 0, 0, Math.PI / 4])
      });
    }
  }

  p.setup = function () {
    p.createCanvas(W, H);
    p.noLoop();
    gen();
  };

  p.draw = function () {
    p.background('#efe7da');
    p.push();
    p.translate(40, 40);
    p.scale((W - 80) / W, (H - 80) / H);
    shapes.forEach(function (sh) {
      p.push();
      p.translate(sh.x, sh.y);
      p.rotate(sh.rot);
      p.fill(sh.col);
      p.noStroke();
      if (sh.type === 'circle') {
        p.circle(0, 0, sh.s);
      } else if (sh.type === 'rect') {
        p.rectMode(p.CENTER);
        p.rect(0, 0, sh.s, sh.s * 0.6);
      } else {
        p.triangle(-sh.s / 2, sh.s / 2, sh.s / 2, sh.s / 2, 0, -sh.s / 2);
      }
      p.pop();
    });
    p.pop();
    p.noFill(); p.stroke(0); p.strokeWeight(3);
    p.rect(20, 20, W - 40, H - 40);
  };

  p.mousePressed = function () {
    if (p.mouseX >= 0 && p.mouseX <= W && p.mouseY >= 0 && p.mouseY <= H) {
      gen();
      p.redraw();
    }
  };
};
