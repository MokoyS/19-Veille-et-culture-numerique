/* JAN.15 — Invisible object, only the shadow can be seen. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-15"] = function (p) {
  var W = 560, H = 560;

  p.setup = function () {
    p.createCanvas(W, H);
    p.noStroke();
  };

  p.draw = function () {
    p.background(window.GENUARY_PALETTE.bg);
    var t = p.millis() / 1000;

    // L'objet (un polygone 3D-ish) n'est jamais dessiné : seule sa projection d'ombre l'est.
    var verts = [], n = 5;
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2 + t * 0.5;
      var r = 90;
      var x = Math.cos(a) * r, y = Math.sin(a) * r * 0.6, z = Math.sin(a + t) * r;
      verts.push({ x: x, y: y, z: z });
    }

    p.push();
    p.translate(W / 2, H * 0.68);
    p.drawingContext.globalAlpha = 0.5;
    p.fill(p.myColor);
    p.beginShape();
    verts.forEach(function (v) {
      var shear = v.z * 0.4;
      p.vertex(v.x + shear, v.y * 0.28);
    });
    p.endShape(p.CLOSE);
    p.pop();

    p.fill(window.GENUARY_PALETTE.inkDim);
    p.textFont('monospace'); p.textSize(10);
    p.text("(l'objet ne sera jamais dessiné)", 16, H - 16);
  };
};
