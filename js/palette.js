/* Cmd+K command palette. Native <dialog>; static entries only; user input
   is used only for filtering, never rendered as HTML. */
(function () {
  "use strict";
  var IS_CASE = location.pathname.indexOf("/work/") !== -1;
  var HOME = IS_CASE ? "../index.html" : "";
  var WORK = IS_CASE ? "" : "work/";
  var ITEMS = [
    { label: "go: about", run: HOME + "#about" },
    { label: "go: services", run: HOME + "#services" },
    { label: "go: work", run: HOME + "#work" },
    { label: "go: process", run: HOME + "#process" },
    { label: "go: testimonials", run: HOME + "#testimonials" },
    { label: "go: faq", run: HOME + "#faq" },
    { label: "case: Influence CRM", run: WORK + "influence.html" },
    { label: "case: Influence v2", run: WORK + "influence-v2.html" },
    { label: "case: FeedHack", run: WORK + "feedhack.html" },
    { label: "case: pumpdat", run: WORK + "pumpdat.html" },
    { label: "do: book discovery call", run: function () {
        if (window.bookCall) { window.bookCall("palette"); }
        else { location.assign("https://calendly.com/rayyanabzal/discovery"); }
      } },
    { label: "do: email rayyanabzal@gmail.com", run: "mailto:rayyanabzal@gmail.com" },
    { label: "do: copy email address", run: function () {
        if (navigator.clipboard) { navigator.clipboard.writeText("rayyanabzal@gmail.com"); }
      } },
    { label: "do: open LinkedIn", run: "https://www.linkedin.com/in/rayyan-a-832a20213" }
  ];

  var dlg = document.createElement("dialog");
  dlg.className = "palette";
  dlg.innerHTML = '<input class="pal-in" type="text" placeholder="type a command..." aria-label="command palette" />' +
    '<ul class="pal-list"></ul>' +
    '<div class="pal-hint">↑↓ navigate · enter run · esc close</div>';
  document.body.appendChild(dlg);
  var input = dlg.querySelector(".pal-in");
  var list = dlg.querySelector(".pal-list");
  var filtered = ITEMS.slice();
  var sel = 0;

  function render() {
    list.textContent = "";
    filtered.forEach(function (item, i) {
      var li = document.createElement("li");
      li.textContent = item.label;
      if (i === sel) { li.className = "sel"; }
      li.addEventListener("click", function () { exec(item); });
      list.appendChild(li);
    });
  }
  function exec(item) {
    dlg.close();
    if (typeof item.run === "function") { item.run(); }
    else { location.assign(item.run); }
  }
  function openPal() {
    input.value = "";
    filtered = ITEMS.slice();
    sel = 0;
    render();
    if (!dlg.open) { dlg.showModal(); }
    input.focus();
  }
  input.addEventListener("input", function () {
    var q = input.value.toLowerCase();
    filtered = ITEMS.filter(function (it) { return it.label.toLowerCase().indexOf(q) !== -1; });
    sel = 0;
    render();
  });
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(sel + 1, filtered.length - 1); render(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(sel - 1, 0); render(); }
    else if (e.key === "Enter" && filtered[sel]) { e.preventDefault(); exec(filtered[sel]); }
  });
  document.addEventListener("keydown", function (e) {
    var el = document.activeElement;
    var typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA");
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openPal(); }
    else if (e.key === "/" && !typing && !dlg.open) { e.preventDefault(); openPal(); }
  });
  document.querySelectorAll(".nav-kbd").forEach(function (el) {
    el.addEventListener("click", openPal);
  });
})();
