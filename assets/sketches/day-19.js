/* JAN.19 — 16x16. A mirror-symmetric binary seal. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-19"] = function (p) {
  var W = 560, H = 560, N = 16, cell = W / N, grid;

  p.setup = function () {
    p.createCanvas(W, H);
    p.noStroke();
    p.noLoop();
    grid = [];
    for (var j = 0; j < N; j++) {
      var row = [];
      for (var i = 0; i < N / 2; i++) row.push(p.random() < 0.42 ? 1 : 0);
      for (var i = N / 2 - 1; i >= 0; i--) row.push(row[i]);
      grid.push(row);
    }
  };

  p.draw = function () {
    p.background(window.GENUARY_PALETTE.bg);
    for (var j = 0; j < N; j++) {
      for (var i = 0; i < N; i++) {
        if (grid[j][i]) {
          p.fill(p.myColor);
          p.rect(i * cell + 1, j * cell + 1, cell - 2, cell - 2);
        }
      }
    }
  };
};
