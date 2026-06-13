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

  /* Export for later sections of this file */
  window.__motion = { ok: MOTION_OK, hook: function (sel, fn) { revealHooks.push({ sel: sel, fn: fn }); } };
})();

/* Scroll moments: counters, pipeline run */
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
  });

  m.hook(".pipeline", function (el) { el.classList.add("run"); });
})();

/* Nav scrollspy (index) + scroll progress bar (all pages) */
(function () {
  "use strict";
  var links = document.querySelectorAll('.nav-mid a[href^="#"]');
  var sections = document.querySelectorAll("main section[id]");
  if (links.length > 0 && sections.length > 0 && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        var id = e.target.id;
        links.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  var nav = document.querySelector(".nav");
  if (nav) {
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    nav.appendChild(bar);
    var ticking = false;
    var update = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ")";
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }
})();

/* Hero status reveal (index only) */
(function () {
  "use strict";
  var hero = document.querySelector(".hero");
  if (!hero) { return; }
  var delay = (window.__motion && window.__motion.ok) ? 300 : 0;
  setTimeout(function () { hero.classList.add("hero-booted"); }, delay);
})();
