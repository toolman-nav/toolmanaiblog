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

  initTheme();
  syncSearchFromUrl();
})();
