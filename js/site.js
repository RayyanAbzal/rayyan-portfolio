/* Site utilities: booking, FAQ accordion, sticky mobile CTA.
   Loaded with defer on every page. */
(function () {
  "use strict";

  /* Booking: fires an analytics event, opens the Calendly popup when the
     widget is loaded, otherwise lets the browser follow the real href.
     Usage: onclick="return bookCall('hero')" on an <a href=CALENDLY_URL>. */
  var CALENDLY_URL = "https://calendly.com/rayyanabzal/discovery";
  window.bookCall = function (source) {
    if (window.va) { window.va("event", { name: "book_click", data: { source: source } }); }
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL + "?utm_source=site&utm_content=" + source });
      return false;
    }
    return true;
  };

  /* FAQ accordion (moved from inline script in index.html) */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.parentElement.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* Sticky mobile CTA: shows after the element in data-show-after enters
     view once, hides while the element in data-hide-at is in view. */
  var bar = document.querySelector(".mobile-cta");
  if (bar && "IntersectionObserver" in window) {
    var showAfter = document.querySelector(bar.getAttribute("data-show-after"));
    var hideAt = document.querySelector(bar.getAttribute("data-hide-at"));
    var passed = false;
    if (showAfter) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting || e.boundingClientRect.top < 0) { passed = true; }
          bar.classList.toggle("show", passed && !bar.classList.contains("suppress"));
        });
      }).observe(showAfter);
    }
    if (hideAt) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          bar.classList.toggle("suppress", e.isIntersecting);
          bar.classList.toggle("show", passed && !e.isIntersecting);
        });
      }).observe(hideAt);
    }
  }
})();
