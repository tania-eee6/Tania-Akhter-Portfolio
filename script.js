/* Tania Akhter — portfolio behaviour: nav, theme, photo fallbacks, reveal, contact form */
(function () {
  "use strict";
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* Mobile navigation */
  var menu = document.getElementById("menuToggle"), links = document.getElementById("navLinks");
  if (menu && links) {
    var close = function () { links.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); };
    menu.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* Theme: saved choice, otherwise the visitor's system preference */
  var themeBtn = document.getElementById("themeToggle");
  var saved = store.get("tania-theme");
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) document.body.classList.add("dark");
  function paintTheme() {
    if (!themeBtn) return;
    var dark = document.body.classList.contains("dark");
    themeBtn.textContent = dark ? "☾" : "☼";
    themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
  paintTheme();
  if (themeBtn) themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    store.set("tania-theme", document.body.classList.contains("dark") ? "dark" : "light");
    paintTheme();
  });

  /* Photo slots: use the real photo in images/photos/ if it exists, else the illustration */
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (img.tagName === "IMG" && img.dataset.fallback && !img.dataset.failed) {
      img.dataset.failed = "1";
      img.src = img.dataset.fallback;
    }
  }, true);

  /* Footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* Scroll reveal */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add("in"); }); }

  /* Contact form: opens the visitor's email app with the message filled in */
  var form = document.getElementById("contactForm");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(form), status = document.getElementById("formStatus");
    var subject = "Portfolio message from " + d.get("name");
    var body = d.get("message") + "\n\n— " + d.get("name") + " (" + d.get("email") + ")";
    window.location.href = "mailto:" + form.dataset.to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    if (status) status.textContent = "Opening your email app… if nothing happens, write to " + form.dataset.to + " directly.";
  });
})();
