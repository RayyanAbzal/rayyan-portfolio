/* Motion engine. Everything gates on MOTION_OK; reduced-motion and no-JS
   visitors get the complete static page. Effects animate transform/opacity/
   clip-path only, and every observer fires once then unobserves.

   Reveal lifecycle: .in starts the transition; ~1.4s later the element drops
   .reveal/.in and gains a permanent .done, returning it to natural styles.
   This keeps hover transforms alive (a persistent transform:none from .in
   would override same-specificity :hover rules). CSS conventions:
   hidden states live under ".js .reveal", transitions key on ".in",
   persistent end-states key on ":is(.in, .done)".

   A parent with data-stagger="80" cascades its direct children 80ms apart. */
(function () {
  "use strict";
  if (window.__mfail) { clearTimeout(window.__mfail); }
  var MOTION_OK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealHooks = [];
  function onRevealed(el) {
    revealHooks.forEach(function (h) { if (el.matches(h.sel)) { h.fn(el); } });
  }

  function revealEl(el) {
    if (el.classList.contains("in") || el.classList.contains("done")) { return; }
    var stagger = el.getAttribute("data-stagger");
    if (stagger) {
      Array.prototype.forEach.call(el.children, function (kid, i) {
        kid.style.transitionDelay = (i * parseInt(stagger, 10)) + "ms";
      });
    }
    el.classList.add("in");
    onRevealed(el);
    setTimeout(function () {
      el.classList.add("done");
      el.classList.remove("reveal", "in");
      if (stagger) {
        Array.prototype.forEach.call(el.children, function (kid) {
          kid.style.transitionDelay = "";
        });
      }
    }, 1400);
  }

  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  function showAll() { reveals.forEach(revealEl); }
  if (!("IntersectionObserver" in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { revealEl(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.01 });
    reveals.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || 800) + 200) { revealEl(el); }
      else { io.observe(el); }
    });
    setTimeout(showAll, 1500); /* failsafe: nothing stays hidden */
  }

  /* --- Typing helper --- */
  function typeInto(el, text, speed, done) {
    if (!MOTION_OK) { el.textContent = text; if (done) { done(); } return; }
    var i = 0;
    el.textContent = "";
    var t = setInterval(function () {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i >= text.length) { clearInterval(t); if (done) { done(); } }
    }, speed || 55);
  }

  /* Export for later sections of this file */
  window.__motion = { ok: MOTION_OK, typeInto: typeInto, hook: function (sel, fn) { revealHooks.push({ sel: sel, fn: fn }); } };
})();

/* Scroll moments: counters, marker typing, pipeline run */
(function () {
  "use strict";
  var m = window.__motion;
  if (!m) { return; }

  function count(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (!m.ok) { el.textContent = String(target); return; }
    var t0 = null;
    var DUR = 700;
    function frame(ts) {
      if (!t0) { t0 = ts; }
      var p = Math.min((ts - t0) / DUR, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) { requestAnimationFrame(frame); }
    }
    requestAnimationFrame(frame);
  }

  m.hook(".shiplog", function (el) {
    el.querySelectorAll(".cnt[data-count]").forEach(count);
    var file = el.querySelector(".shiplog-head span:first-child");
    if (file) { m.typeInto(file, file.textContent, 45); }
  });

  m.hook(".section-marker", function (el) {
    var tag = el.querySelector(".sm-tag");
    if (tag) { m.typeInto(tag, tag.textContent, 35); }
  });

  m.hook(".pipeline", function (el) { el.classList.add("run"); });
})();

/* Hero boot sequence (index only) */
(function () {
  "use strict";
  var m = window.__motion;
  var com = document.querySelector(".hero-prompt .com");
  var hero = document.querySelector(".hero");
  if (!com || !hero || !m) { return; }
  var done = false;
  function finish() {
    if (done) { return; }
    done = true;
    hero.classList.add("hero-booted");
  }
  if (m.ok) {
    m.typeInto(com, "whoami", 60, function () { setTimeout(finish, 150); });
    setTimeout(finish, 1200); /* failsafe */
  } else {
    finish();
  }
})();
