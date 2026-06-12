/* Guest terminal in the contact section (index only). Every command resolves
   to a real site action; user input is echoed via textContent, never HTML. */
(function () {
  "use strict";
  var root = document.getElementById("guest-terminal");
  if (!root) { return; }
  var out = root.querySelector(".term-out");
  var input = root.querySelector(".term-in");
  var MAX_LINES = 30;

  function line(text, cls) {
    var div = document.createElement("div");
    div.className = "tl" + (cls ? " " + cls : "");
    div.textContent = text;
    out.appendChild(div);
    while (out.children.length > MAX_LINES) { out.removeChild(out.firstChild); }
    out.scrollTop = out.scrollHeight;
  }
  function linkLine(label, href) {
    var div = document.createElement("div");
    div.className = "tl";
    var a = document.createElement("a");
    a.href = href;
    a.textContent = label;
    div.appendChild(a);
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }

  var FILES = {
    "status.json": ["current: open for next build", "engagement: 1-8wk, fixed scope, proposal in 48h", "location: Auckland, NZ (clients worldwide)"],
    "stack.txt": ["typescript · node.js · python", "next.js · supabase · vercel", "anthropic api · telegram · discord"],
    "principles.md": ["01 replace, don't add", "02 problem first", "03 build for the team", "04 measure in hours saved"]
  };

  var CMDS = {
    help: function () {
      line("commands:", "dim");
      [
        "work        list shipped case studies",
        "stack       what I build with",
        "principles  how I think",
        "book        open the booking calendar",
        "contact     email + linkedin",
        "whoami      who you are talking to",
        "ls          list files",
        "cat <file>  read a file",
        "clear       wipe the screen"
      ].forEach(function (l) { line("  " + l); });
    },
    work: function () {
      linkLine("~/work/influence       crm platform · shipped", "work/influence.html");
      linkLine("~/work/influence-v2    roster dashboard · shipped", "work/influence-v2.html");
      linkLine("~/work/feedhack        discord automation · shipped", "work/feedhack.html");
      linkLine("~/work/pumpdat         token launchpad · shipped", "work/pumpdat.html");
    },
    stack: function () { FILES["stack.txt"].forEach(function (l) { line(l); }); },
    principles: function () { FILES["principles.md"].forEach(function (l) { line(l); }); },
    whoami: function () { line("guest. but this site belongs to Rayyan Abzal, AI consultant in Auckland, New Zealand."); },
    contact: function () {
      linkLine("rayyanabzal@gmail.com", "mailto:rayyanabzal@gmail.com");
      linkLine("linkedin.com/in/rayyan-a", "https://www.linkedin.com/in/rayyan-a-832a20213");
    },
    book: function () {
      line("opening calendar...", "ok");
      if (window.bookCall) { window.bookCall("terminal"); }
    },
    ls: function () { line("work/  status.json  stack.txt  principles.md"); },
    clear: function () { out.textContent = ""; },
    sudo: function (arg) {
      if (arg === "hire-rayyan") {
        line("permission granted. opening calendar...", "ok");
        if (window.bookCall) { window.bookCall("terminal_sudo"); }
      } else {
        line("sudo: a free discovery call requires no privileges. try: book");
      }
    },
    cat: function (arg) {
      if (FILES[arg]) { FILES[arg].forEach(function (l) { line(l); }); }
      else { line("cat: " + (arg || "") + ": No such file or directory", "err"); }
    }
  };
  CMDS["./book_call"] = CMDS.book;
  CMDS["./show_work"] = CMDS.work;
  CMDS["./help"] = CMDS.help;

  var history = [];
  var hi = 0;
  function run(raw) {
    var s = raw.trim();
    if (!s) { return; }
    line("guest@rayyanabzal.com:~$ " + s, "echo");
    history.push(s);
    hi = history.length;
    var parts = s.split(/\s+/);
    var cmd = parts[0].toLowerCase();
    if (cmd === "rm") { line("nice try."); return; }
    var fn = CMDS[cmd];
    if (fn) { fn(parts.slice(1).join(" ")); }
    else { line(cmd + ": command not found. try: help", "err"); }
  }

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { run(input.value); input.value = ""; }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (hi > 0) { hi -= 1; input.value = history[hi] || ""; } }
    else if (e.key === "ArrowDown") { e.preventDefault(); if (hi < history.length) { hi += 1; input.value = history[hi] || ""; } }
  });
  root.addEventListener("click", function (e) {
    if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON" && e.target.tagName !== "INPUT") { input.focus(); }
  });
  root.querySelectorAll(".term-chip").forEach(function (btn) {
    btn.addEventListener("click", function () { run(btn.getAttribute("data-cmd")); });
  });
  line("welcome. type help, or tap a command below.", "dim");
})();
