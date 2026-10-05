/* JAN.13 — Self portrait. A parametric face drifting through variations. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-13"] = function (p) {
  var W = 560, H = 560;

  p.setup = function () {
    p.createCanvas(W, H);
    p.noStroke();
  };

  p.draw = function () {
    p.background(window.GENUARY_PALETTE.bg);
    var t = p.millis() / 5000;
    var eyeGap = p.map(p.noise(1, t), 0, 1, 70, 110);
    var browAngle = p.map(p.noise(2, t), 0, 1, -0.3, 0.3);
    var tone = p.lerpColor(p.color('#caa27a'), p.color('#8a5a3a'), p.noise(3, t));

    p.push();
    p.translate(W / 2, H / 2);
    p.fill(tone);
    p.ellipse(0, 10, 240, 300);

    p.fill(window.GENUARY_PALETTE.bg);
    p.ellipse(-eyeGap / 2, -20, 34, 20);
    p.ellipse(eyeGap / 2, -20, 34, 20);

    p.fill(p.myColor);
    p.ellipse(-eyeGap / 2, -20, 14, 14);
    p.ellipse(eyeGap / 2, -20, 14, 14);

    p.stroke(40); p.strokeWeight(4); p.noFill();
    p.push(); p.translate(-eyeGap / 2, -46); p.rotate(browAngle); p.line(-20, 0, 20, 0); p.pop();
    p.push(); p.translate(eyeGap / 2, -46); p.rotate(-browAngle); p.line(-20, 0, 20, 0); p.pop();

    p.noStroke(); p.fill(120, 60, 60);
    p.arc(0, 70, 70, 40, 0, Math.PI);
    p.pop();
  };
};
