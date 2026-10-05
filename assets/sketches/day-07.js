/* JAN.07 — Boolean algebra. AND / OR / XOR between two moving fields. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-07"] = function (p) {
  var W = 560, H = 560, RES = 80, SC = W / RES;

  p.setup = function () {
    p.createCanvas(W, H);
    p.noSmooth();
    p.noStroke();
  };

  function field(x, y, t, ox, oy) {
    var d = 0;
    for (var i = 0; i < 3; i++) {
      var cx = RES / 2 + Math.cos(t * 0.6 + i * 2.1 + ox) * RES * 0.28;
      var cy = RES / 2 + Math.sin(t * 0.5 + i * 1.7 + oy) * RES * 0.28;
      var r = 15;
      d += (r * r) / ((x - cx) * (x - cx) + (y - cy) * (y - cy) + 1);
    }
    return d > 1.0;
  }

  p.draw = function () {
    var t = p.millis() / 1000;
    p.background(window.GENUARY_PALETTE.bg);
    var cA = p.color(window.GENUARY_PALETTE.azure);
    var cB = p.color(window.GENUARY_PALETTE.coral);
    var cX = p.color(p.myColor);

    for (var y = 0; y < RES; y++) {
      for (var x = 0; x < RES; x++) {
        var a = field(x, y, t, 0, 0);
        var b = field(x, y, t, 100, 50);
        if (a && b) { p.fill(p.lerpColor(cA, cB, 0.5)); p.rect(x * SC, y * SC, SC, SC); }
        else if (a !== b) { p.fill(cX); p.rect(x * SC, y * SC, SC, SC); }
      }
    }
  };
};
