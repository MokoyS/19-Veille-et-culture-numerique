/* JAN.28 — No libraries, no canvas, only HTML elements.
   Pas de p5.js, pas de <canvas>, pas de <svg> : uniquement des <div> stylées en CSS. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-28"] = function (container, colorHex) {
  var N = 10;
  var color = colorHex || "#ffb23c";

  var grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(" + N + ", 1fr)";
  grid.style.gridTemplateRows = "repeat(" + N + ", 1fr)";
  grid.style.gap = "3px";
  grid.style.width = "min(90vw, 440px)";
  grid.style.height = "min(90vw, 440px)";
  grid.style.padding = "10px";
  grid.style.background = "#0a0a0d";
  container.appendChild(grid);

  for (var i = 0; i < N * N; i++) {
    var div = document.createElement("div");
    div.style.background = "#1c1c25";
    div.style.border = "1px solid #2b2b36";
    div.style.borderRadius = "2px";
    div.style.transition = "transform .25s ease, background .25s ease";

    (function (d) {
      d.addEventListener("mouseenter", function () {
        d.style.background = color;
        d.style.transform = "scale(1.15) rotate(" + (Math.random() * 20 - 10) + "deg)";
      });
      d.addEventListener("mouseleave", function () {
        d.style.background = "#1c1c25";
        d.style.transform = "scale(1) rotate(0deg)";
      });
    })(div);

    grid.appendChild(div);
  }
};
