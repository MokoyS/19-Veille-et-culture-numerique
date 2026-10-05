/* =========================================================
   GENUARY OS — gestionnaire de fenêtres fait main.
   Pas de framework, pas de librairie UI : juste le DOM, des
   positions absolues, et des event listeners.
   ========================================================= */

window.OS = (function () {
  "use strict";

  var desktop, taskWindowsEl, startMenuEl;
  var registry = {};   // key -> winObj
  var order = [];      // winObj list, paint/open order
  var zCounter = 100;
  var cascade = 0;

  function $(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function init() {
    desktop = document.getElementById("desktop");
    taskWindowsEl = document.getElementById("taskWindows");
    startMenuEl = document.getElementById("startMenu");
    tickClock();
    setInterval(tickClock, 1000 * 15);
  }

  function tickClock() {
    var el = document.getElementById("clock");
    if (!el) return;
    var d = new Date();
    var hh = String(d.getHours()).padStart(2, "0");
    var mm = String(d.getMinutes()).padStart(2, "0");
    el.textContent = hh + ":" + mm;
  }

  /* ---------------------------------------------------------------
     createOrFocus(key, factory) — si une fenêtre `key` existe déjà,
     on la restaure/focalise au lieu d'en ouvrir une deuxième.
  --------------------------------------------------------------- */
  function createOrFocus(key, factory) {
    if (registry[key]) {
      var w = registry[key];
      if (w.minimized) restore(w);
      focus(w);
      return w;
    }
    var win = factory();
    win.key = key;
    registry[key] = win;
    order.push(win);
    return win;
  }

  /* ---------------------------------------------------------------
     createWindow(opts)
     opts: { title, icon, accent, width, height, menubar:[str],
             status, body(el), onClose() }
  --------------------------------------------------------------- */
  function createWindow(opts) {
    cascade = (cascade + 1) % 8;
    var x = 70 + cascade * 26;
    var y = 40 + cascade * 24;
    var w = opts.width || 520;
    var h = opts.height || 420;

    var el = $("div", "window");
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.width = w + "px";
    el.style.height = h + "px";
    el.style.zIndex = ++zCounter;

    var titlebar = $("div", "win-titlebar");
    titlebar.style.setProperty("--accent", "var(--c-" + (opts.accent || "acid") + ")");
    titlebar.innerHTML =
      '<span class="ico">' + (opts.icon || "▣") + '</span>' +
      '<span class="ttl">' + opts.title + '</span>';

    var btns = $("div", "wbtns");
    btns.style.display = "flex"; btns.style.gap = "3px";
    var minBtn = $("div", "wbtn", "_");
    var maxBtn = $("div", "wbtn", "□");
    var closeBtn = $("div", "wbtn close", "×");
    btns.appendChild(minBtn); btns.appendChild(maxBtn); btns.appendChild(closeBtn);
    titlebar.appendChild(btns);

    el.appendChild(titlebar);

    if (opts.menubar) {
      var mb = $("div", "win-menubar");
      opts.menubar.forEach(function (label) {
        var s = $("span", null, label);
        mb.appendChild(s);
      });
      el.appendChild(mb);
    }

    var body = $("div", "win-body");
    el.appendChild(body);

    if (opts.status !== false) {
      var status = $("div", "win-status");
      status.innerHTML = "<span>" + (opts.status || "") + "</span><span>GENUARY OS</span>";
      el.appendChild(status);
    }

    desktop.parentElement.appendChild(el); // append to body, sibling of #desktop (so it overlays, under taskbar)

    var winObj = {
      el: el, titlebar: titlebar, body: body, minimized: false, p5instance: null,
      chip: null, key: null
    };

    // ---- drag ----
    var dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
    titlebar.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".wbtn")) return;
      focus(winObj);
      dragging = true;
      el.classList.add("dragging");
      sx = e.clientX; sy = e.clientY;
      ox = el.offsetLeft; oy = el.offsetTop;
      titlebar.setPointerCapture(e.pointerId);
    });
    titlebar.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var nx = ox + (e.clientX - sx);
      var ny = oy + (e.clientY - sy);
      ny = Math.max(0, ny);
      el.style.left = nx + "px";
      el.style.top = ny + "px";
    });
    titlebar.addEventListener("pointerup", function (e) {
      dragging = false;
      el.classList.remove("dragging");
    });

    el.addEventListener("pointerdown", function () { focus(winObj); });

    minBtn.addEventListener("click", function () { minimize(winObj); });
    maxBtn.addEventListener("click", function () { toggleMaximize(winObj); });
    closeBtn.addEventListener("click", function () { close(winObj); opts.onClose && opts.onClose(); });

    // ---- taskbar chip ----
    var chip = $("div", "task-chip", (opts.icon || "▣") + " " + opts.title);
    chip.addEventListener("click", function () {
      if (winObj.minimized) { restore(winObj); focus(winObj); }
      else if (isTop(winObj)) { minimize(winObj); }
      else { focus(winObj); }
    });
    taskWindowsEl.appendChild(chip);
    winObj.chip = chip;

    if (opts.body) opts.body(body, winObj);

    focus(winObj);
    return winObj;
  }

  function isTop(winObj) {
    var maxZ = -1, topWin = null;
    order.forEach(function (w) { if (!w.minimized && +w.el.style.zIndex > maxZ) { maxZ = +w.el.style.zIndex; topWin = w; } });
    return topWin === winObj;
  }

  function focus(winObj) {
    zCounter++;
    winObj.el.style.zIndex = zCounter;
    order.forEach(function (w) { w.el.classList.remove("active"); w.chip.classList.remove("active"); });
    winObj.el.classList.add("active");
    winObj.chip.classList.add("active");
  }

  function minimize(winObj) {
    winObj.minimized = true;
    winObj.el.style.display = "none";
    winObj.chip.classList.remove("active");
  }

  function restore(winObj) {
    winObj.minimized = false;
    winObj.el.style.display = "flex";
  }

  function toggleMaximize(winObj) {
    winObj.el.classList.toggle("maximized");
  }

  function close(winObj) {
    if (winObj.p5instance && winObj.p5instance.remove) {
      try { winObj.p5instance.remove(); } catch (e) {}
    }
    winObj.el.remove();
    winObj.chip.remove();
    order = order.filter(function (w) { return w !== winObj; });
    if (winObj.key) delete registry[winObj.key];
  }

  /* ---------------------------------------------------------------
     Start menu
  --------------------------------------------------------------- */
  function toggleStartMenu(force) {
    var open = force !== undefined ? force : !startMenuEl.classList.contains("open");
    startMenuEl.classList.toggle("open", open);
  }

  document.addEventListener("click", function (e) {
    if (!startMenuEl) return;
    if (e.target.closest("#startMenu") || e.target.closest("#startBtn")) return;
    toggleStartMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var top = null, maxZ = -1;
      order.forEach(function (w) { if (!w.minimized && +w.el.style.zIndex > maxZ) { maxZ = +w.el.style.zIndex; top = w; } });
      if (top) close(top);
      toggleStartMenu(false);
    }
  });

  return {
    init: init,
    createWindow: createWindow,
    createOrFocus: createOrFocus,
    focus: focus,
    close: close,
    minimize: minimize,
    toggleMaximize: toggleMaximize,
    toggleStartMenu: toggleStartMenu
  };
})();
