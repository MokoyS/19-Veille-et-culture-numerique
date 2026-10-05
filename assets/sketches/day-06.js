/* JAN.06 — Lights on/off. Click the canvas to flip the switch. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-06"] = function (p) {
  var W = 560, H = 560, cols = 10, rows = 8, lightsOn = true, flick = [];

  p.setup = function () {
    p.createCanvas(W, H);
    p.noStroke();
    for (var i = 0; i < cols * rows; i++) flick.push(p.random());
  };

  p.draw = function () {
    p.background(lightsOn ? '#0d1830' : '#02040a');
    var cw = W / cols, ch = H / rows;
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        var idx = j * cols + i;
        var on = lightsOn
          ? p.noise(i * 0.7, j * 0.7, p.frameCount * 0.01 + flick[idx] * 10) > 0.38
          : flick[idx] > 0.93;
        p.fill(on ? p.myColor : (lightsOn ? '#13284a' : '#070a12'));
        p.rect(i * cw + 4, j * ch + 4, cw - 8, ch - 8, 2);
      }
    }
    p.fill(window.GENUARY_PALETTE.inkDim);
    p.textFont('monospace'); p.textSize(11);
    p.text(lightsOn ? 'LIGHTS: ON (clic)' : 'LIGHTS: OFF (clic)', 10, H - 10);
  };

  p.mousePressed = function () {
    if (p.mouseX >= 0 && p.mouseX <= W && p.mouseY >= 0 && p.mouseY <= H) {
      lightsOn = !lightsOn;
    }
  };
};
