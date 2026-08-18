(function () {
  var THEME_STORAGE_KEY = "toolman-theme";
  var darkMediaQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function getSavedTheme() {
    try {
      var savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      return;
    }
  }

  function getSystemTheme() {
    return darkMediaQuery && darkMediaQuery.matches ? "dark" : "light";
  }

  function syncThemeToggle(theme) {
    var toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;
    var isDark = theme === "dark";
    var label = isDark ? "切换为亮色模式" : "切换为暗黑模式";
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("title", label);
    toggle.dataset.themeState = theme;
  }

  function applyTheme(theme) {
    var nextTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    syncThemeToggle(nextTheme);
  }

  function initTheme() {
    applyTheme(getSavedTheme() || getSystemTheme());
    document.addEventListener("click", function (event) {
      var toggle = event.target.closest("[data-theme-toggle]");
      if (!toggle) return;
      var currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      var nextTheme = currentTheme === "dark" ? "light" : "dark";
      saveTheme(nextTheme);
      applyTheme(nextTheme);
    });

    if (!darkMediaQuery) return;
    var onSystemThemeChange = function () {
      if (!getSavedTheme()) applyTheme(getSystemTheme());
    };
    if (darkMediaQuery.addEventListener) {
      darkMediaQuery.addEventListener("change", onSystemThemeChange);
    } else if (darkMediaQuery.addListener) {
      darkMediaQuery.addListener(onSystemThemeChange);
    }
  }

  function showToast(message) {
    var toast = document.querySelector(".site-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "site-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 1800);
  }

  function applyCardSearch(input, cardSelector, emptySelector) {
    if (!input) return;
    var query = normalize(input.value);
    var cards = Array.from(document.querySelectorAll(cardSelector));
    var visibleCount = 0;
    cards.forEach(function (card) {
      var haystack = normalize(card.dataset.searchText || card.textContent);
      var isVisible = !query || haystack.includes(query);
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });
    document.querySelectorAll(".directory-section").forEach(function (section) {
      var visibleTools = section.querySelectorAll(".tool-tile:not([hidden])").length;
      section.hidden = query && visibleTools === 0;
    });
    var empty = document.querySelector(emptySelector);
    if (empty) empty.hidden = visibleCount !== 0;
  }

  function syncSearchFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var query = params.get("q") || "";
    var toolInput = document.getElementById("toolSearch");
    var tutorialInput = document.getElementById("tutorialSearch");
    if (toolInput) {
      toolInput.value = query;
      applyCardSearch(toolInput, ".tool-tile", "[data-empty-search]");
    }
    if (tutorialInput) {
      tutorialInput.value = query;
      applyCardSearch(tutorialInput, ".tutorial-card", "[data-empty-search]");
    }
  }

  document.addEventListener("submit", function (event) {
    var form = event.target.closest("[data-global-search]");
    if (!form) return;
    var input = form.querySelector("#globalSearch");
    if (!normalize(input && input.value)) {
      event.preventDefault();
      showToast("请输入关键词后搜索");
    }
  });

  document.addEventListener("input", function (event) {
    if (event.target.id === "toolSearch") {
      applyCardSearch(event.target, ".tool-tile", "[data-empty-search]");
    }
    if (event.target.id === "tutorialSearch") {
      applyCardSearch(event.target, ".tutorial-card", "[data-empty-search]");
    }
  });

  function initArticleToc() {
    var toc = document.querySelector("[data-article-toc]");
    if (!toc) return;

    var toggle = toc.querySelector("[data-toc-toggle]");
    var label = toc.querySelector("[data-toc-toggle-label]");
    var links = Array.from(toc.querySelectorAll("[data-toc-link]"));
    var storageKey = "toolman-article-toc-collapsed";
    var headings = links
      .map(function (link) {
        return document.getElementById(link.getAttribute("data-toc-link"));
      })
      .filter(Boolean);

    function setCollapsed(collapsed) {
      toc.classList.toggle("is-collapsed", collapsed);
      if (toggle) toggle.setAttribute("aria-expanded", String(!collapsed));
      if (label) label.textContent = collapsed ? "展开" : "收起";
      try {
        localStorage.setItem(storageKey, collapsed ? "1" : "0");
      } catch (error) {}
    }

    try {
      var saved = localStorage.getItem(storageKey);
      if (saved === "1") setCollapsed(true);
      else if (saved === "0") setCollapsed(false);
      else if (window.matchMedia && window.matchMedia("(max-width: 1180px)").matches) setCollapsed(true);
    } catch (error) {
      if (window.matchMedia && window.matchMedia("(max-width: 1180px)").matches) setCollapsed(true);
    }

    if (toggle) {
      toggle.addEventListener("click", function () {
        setCollapsed(!toc.classList.contains("is-collapsed"));
      });
    }

    function setActive(id) {
      links.forEach(function (link) {
        var isActive = link.getAttribute("data-toc-link") === id;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }

    function updateActiveFromScroll() {
      var offset = 96;
      var current = headings[0] && headings[0].id;
      headings.forEach(function (heading) {
        if (heading.getBoundingClientRect().top <= offset) current = heading.id;
      });
      if (current) setActive(current);
    }

    toc.addEventListener("click", function (event) {
      var link = event.target.closest("[data-toc-link]");
      if (!link) return;
      setActive(link.getAttribute("data-toc-link"));
    });

    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    updateActiveFromScroll();
  }

  function initBackToTop() {
    var button = document.querySelector("[data-back-to-top]");
    if (!button) return;

    function syncVisibility() {
      button.classList.toggle("is-visible", window.scrollY > 360);
    }

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", syncVisibility, { passive: true });
    syncVisibility();
  }

  initTheme();
  initArticleToc();
  initBackToTop();
  syncSearchFromUrl();
})();
