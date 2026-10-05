/* JAN.09 — Crazy automaton. Rule 30, perturbed by random mutation. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-09"] = function (p) {
  var W = 560, H = 560, cell = 4, cols, rows, grid, row = 0;

  p.setup = function () {
    p.createCanvas(W, H);
    p.noStroke();
    cols = Math.floor(W / cell);
    rows = Math.floor(H / cell);
    grid = new Array(cols).fill(0);
    grid[Math.floor(cols / 2)] = 1;
    p.background(window.GENUARY_PALETTE.bg);
  };

  function rule30(l, c, r) { return (l ^ (c || r)) ? 1 : 0; }

  p.draw = function () {
    if (row >= rows) { p.noLoop(); return; }
    var next = new Array(cols).fill(0);
    for (var i = 0; i < cols; i++) {
      var l = grid[(i - 1 + cols) % cols], c = grid[i], r = grid[(i + 1) % cols];
      var v = rule30(l, c, r);
      if (p.random() < 0.012) v = v ? 0 : 1;
      next[i] = v;
      if (v) {
        p.fill(p.myColor);
        p.rect(i * cell, row * cell, cell, cell);
      }
    }
    grid = next;
    row++;
  };
};
