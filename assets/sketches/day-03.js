/* JAN.03 — Fibonacci forever. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-03"] = function (p) {
  var W = 560, H = 560;
  var fib = [1, 1];
  for (var i = 2; i < 24; i++) fib.push(fib[i - 1] + fib[i - 2]);
  var golden = Math.PI * (3 - Math.sqrt(5));

  p.setup = function () {
    p.createCanvas(W, H);
    p.noStroke();
    p.noLoop();
  };

  p.draw = function () {
    p.background(window.GENUARY_PALETTE.bg);
    p.push();
    p.translate(W / 2, H / 2);
    var n = 220;
    for (var i = 0; i < n; i++) {
      var r = 10 * Math.sqrt(i);
      var a = i * golden;
      var x = r * Math.cos(a), y = r * Math.sin(a);
      var f = fib[i % fib.length] % 13;
      var d = p.map(f, 0, 12, 3, 16);
      var t = i / n;
      var col = p.lerpColor(p.color(window.GENUARY_PALETTE.azure), p.color(p.myColor), t);
      p.fill(col);
      p.circle(x, y, d);
    }
    p.pop();
  };
};
