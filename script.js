(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      mobileNav.classList.toggle("is-open", !isOpen);
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
      });
    });
  }

  // Accessibility widget: larger text, higher contrast, underlined links.
  // Each option toggles a class on <html> and persists in localStorage so
  // the choice survives a reload.
  var a11yToggle = document.querySelector(".a11y-toggle");
  var a11yPanel = document.getElementById("a11y-panel");

  if (a11yToggle && a11yPanel) {
    a11yToggle.addEventListener("click", function () {
      var isOpen = a11yToggle.getAttribute("aria-expanded") === "true";
      a11yToggle.setAttribute("aria-expanded", String(!isOpen));
      a11yPanel.hidden = isOpen;
    });

    document.addEventListener("click", function (e) {
      var clickedInside = a11yPanel.contains(e.target) || a11yToggle.contains(e.target);
      if (!a11yPanel.hidden && !clickedInside) {
        a11yPanel.hidden = true;
        a11yToggle.setAttribute("aria-expanded", "false");
      }
    });

    a11yPanel.querySelectorAll("input[data-a11y]").forEach(function (checkbox) {
      var storageKey = "a11y-" + checkbox.dataset.a11y;
      var isEnabled = localStorage.getItem(storageKey) === "true";
      checkbox.checked = isEnabled;
      document.documentElement.classList.toggle(storageKey, isEnabled);

      checkbox.addEventListener("change", function () {
        document.documentElement.classList.toggle(storageKey, checkbox.checked);
        localStorage.setItem(storageKey, String(checkbox.checked));
      });
    });
  }
})();
