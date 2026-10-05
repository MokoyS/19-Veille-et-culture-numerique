/* JAN.18 — Unexpected path. Turn 90° every time the step count is prime. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-18"] = function (p) {
  var W = 560, H = 560;
  var x, y, dir, step = 0, cache = {};
  var dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];

  function isPrime(n) {
    if (n < 2) return false;
    if (cache[n] !== undefined) return cache[n];
    for (var i = 2; i * i <= n; i++) if (n % i === 0) { cache[n] = false; return false; }
    cache[n] = true;
    return true;
  }

  p.setup = function () {
    p.createCanvas(W, H);
    x = W / 2; y = H / 2; dir = 0;
    p.stroke(p.myColor);
    p.strokeWeight(2);
    p.background(window.GENUARY_PALETTE.bg);
  };

  p.draw = function () {
    for (var k = 0; k < 4; k++) {
      step++;
      if (isPrime(step)) dir = (dir + 1) % 4;
      var nx = x + dirs[dir][0] * 4, ny = y + dirs[dir][1] * 4;
      p.line(x, y, nx, ny);
      x = nx; y = ny;
      if (x < 0 || x > W || y < 0 || y > H) {
        x = p.constrain(x, 0, W);
        y = p.constrain(y, 0, H);
        dir = (dir + 2) % 4;
      }
    }
    if (step > 6000) p.noLoop();
  };
};
