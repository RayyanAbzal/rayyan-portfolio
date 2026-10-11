/* Motion engine. Everything gates on MOTION_OK; reduced-motion and no-JS
   visitors get the complete static page. Effects animate transform/opacity
   only, and every observer fires once then unobserves.

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

  function revealEl(el) {
    if (el.classList.contains("in") || el.classList.contains("done")) { return; }
    var stagger = el.getAttribute("data-stagger");
    if (stagger) {
      Array.prototype.forEach.call(el.children, function (kid, i) {
        kid.style.transitionDelay = (i * parseInt(stagger, 10)) + "ms";
      });
    }
    el.classList.add("in");
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
  if (!MOTION_OK || !("IntersectionObserver" in window)) {
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
})();
