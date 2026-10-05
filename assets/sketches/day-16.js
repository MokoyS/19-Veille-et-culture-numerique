/* JAN.16 — Order and disorder. One gradient controls both at once. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-16"] = function (p) {
  var W = 560, H = 560, cols = 14, rows = 14;

  p.setup = function () {
    p.createCanvas(W, H);
    p.noStroke();
    p.noLoop();
  };

  p.draw = function () {
    p.background(window.GENUARY_PALETTE.bg);
    var cw = W / cols, ch = H / rows;
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        var chaos = i / (cols - 1);
        var jitter = chaos * 18;
        var rot = chaos * p.random(-0.6, 0.6);
        var x = i * cw + cw / 2 + p.random(-jitter, jitter);
        var y = j * ch + ch / 2 + p.random(-jitter, jitter);

        p.push();
        p.translate(x, y);
        p.rotate(rot);
        p.fill(p.lerpColor(p.color(window.GENUARY_PALETTE.surface), p.color(p.myColor), chaos * 0.8));
        p.rectMode(p.CENTER);
        p.rect(0, 0, cw * 0.6, ch * 0.6, 2);
        p.pop();
      }
    }
  };
};
