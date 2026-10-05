/* JAN.27 — Lifeform. A colony of cells that divides and grows over time. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-27"] = function (p) {
  var W = 560, H = 560, cells = [];

  p.setup = function () {
    p.createCanvas(W, H);
    p.noStroke();
    cells.push({ x: W / 2, y: H / 2, r: 10, age: 0 });
  };

  p.draw = function () {
    p.background(window.GENUARY_PALETTE.bg);

    if (p.frameCount % 18 === 0 && cells.length < 220) {
      var parent = cells[Math.floor(p.random(cells.length))];
      var a = p.random(Math.PI * 2);
      var nx = parent.x + Math.cos(a) * parent.r * 1.6;
      var ny = parent.y + Math.sin(a) * parent.r * 1.6;
      if (nx > 6 && nx < W - 6 && ny > 6 && ny < H - 6) {
        cells.push({ x: nx, y: ny, r: p.random(5, 9), age: 0 });
      }
    }

    cells.forEach(function (c) {
      c.age++;
      var pulse = 1 + 0.06 * Math.sin(c.age * 0.1);
      p.push();
      p.drawingContext.globalAlpha = 0.85;
      p.fill(p.myColor);
      p.circle(c.x, c.y, c.r * 2 * pulse);
      p.pop();
    });
  };
};
