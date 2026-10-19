(function () {
  var menuButtons = Array.prototype.slice.call(document.querySelectorAll('.js-menu, #menuBtn'));
  var navOverlays = Array.prototype.slice.call(document.querySelectorAll('.js-nav, #navOverlay'));
  var headerBg = document.getElementById('headerBg');
  var themeToggle = document.getElementById('themeToggle');
  var heroName = document.querySelector('.hero-name');
  var siteLogos = Array.prototype.slice.call(document.querySelectorAll('.siteLogoLink'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var savedTheme = localStorage.getItem('theme');
  var currentTheme = savedTheme === 'dark' ? 'dark' : 'light';

  document.documentElement.setAttribute('data-theme', currentTheme);

  siteLogos.forEach(function (logo) {
    var lastBar = logo.querySelector('.site-logo-last');
    if (!lastBar) return;
    lastBar.addEventListener('animationend', function (event) {
      if (event.animationName === 'site-logo-enter-from-right') {
        logo.classList.remove('site-logo-entering');
      }
    });
  });

  function restartSiteLogoAnimation() {
    if (reduceMotion.matches) return;
    siteLogos.forEach(function (logo) {
      logo.classList.remove('site-logo-entering');
      void logo.offsetWidth;
      logo.classList.add('site-logo-entering');
    });
  }

  window.addEventListener('pageshow', restartSiteLogoAnimation);

  if (heroName) {
    var heroLines = Array.prototype.slice.call(heroName.querySelectorAll('.hero-name-inner'));
    var scrollFrame = null;

    function restartHeroLineAnimation() {
      if (reduceMotion.matches) return;
      document.body.classList.remove('hero-lines-entering');
      void heroName.offsetWidth;
      document.body.classList.add('hero-lines-entering');
    }

    function updateHeroLinePositions() {
      scrollFrame = null;
      if (reduceMotion.matches) {
        heroLines.forEach(function (line) {
          line.style.setProperty('--hero-line-shift', '0px');
        });
        return;
      }

      var scrollProgress = Math.min(window.scrollY / window.innerHeight, 1);

      heroLines.forEach(function (line, index) {
        var direction = index === 0 ? -14 : 22;
        line.style.setProperty('--hero-line-shift', (scrollProgress * direction) + 'px');
      });
    }

    function scheduleHeroLinePositions() {
      if (scrollFrame === null) {
        scrollFrame = window.requestAnimationFrame(updateHeroLinePositions);
      }
    }

    window.addEventListener('pageshow', restartHeroLineAnimation);
    window.addEventListener('scroll', scheduleHeroLinePositions, { passive: true });
    reduceMotion.addEventListener('change', function () {
      if (reduceMotion.matches) {
        document.body.classList.remove('hero-lines-entering');
        heroLines.forEach(function (line) {
          line.style.setProperty('--hero-line-shift', '0px');
        });
      } else {
        restartHeroLineAnimation();
        scheduleHeroLinePositions();
      }
    });
    scheduleHeroLinePositions();
  }

  function setMenuState(isOpen, button, overlay) {
    if (!button || !overlay) return;
    var buttonBounds = button.getBoundingClientRect();
    overlay.style.setProperty('--menu-origin-x', (buttonBounds.left + buttonBounds.width / 2) + 'px');
    overlay.style.setProperty('--menu-origin-y', (buttonBounds.top + buttonBounds.height / 2) + 'px');
    void overlay.offsetWidth;
    button.classList.toggle('active', isOpen);
    overlay.classList.toggle('active', isOpen);
    overlay.setAttribute('aria-hidden', String(!isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  }

  function bindNavOverlay(overlay) {
    overlay.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a') : null;
      if (link) {
        var linkHeader = overlay.closest('.site-header');
        var linkButton = linkHeader ? linkHeader.querySelector('.js-menu, #menuBtn') : null;
        setMenuState(false, linkButton, overlay);
        return;
      }

      if (e.target !== overlay) return;
      var header = overlay.closest('.site-header');
      var button = header ? header.querySelector('.js-menu, #menuBtn') : null;
      setMenuState(false, button, overlay);
    });
  }

  navOverlays.forEach(bindNavOverlay);

  menuButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var header = button.closest('.site-header');
      var overlay = header ? header.querySelector('.site-nav-overlay, .js-nav') : null;
      var isOpen = button.classList.contains('active');
      setMenuState(!isOpen, button, overlay);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      menuButtons.forEach(function (button) {
        var header = button.closest('.site-header');
        var overlay = header ? header.querySelector('.site-nav-overlay, .js-nav') : null;
        setMenuState(false, button, overlay);
      });
    }
  });

  if (headerBg) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) {
        headerBg.style.opacity = '0';
      } else {
        headerBg.style.opacity = '1';
      }
    });
  }

  if (themeToggle) {
    function updateThemeToggle() {
      var isDark = currentTheme === 'dark';
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('aria-pressed', String(isDark));
    }

    updateThemeToggle();

    themeToggle.addEventListener('click', function () {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
      updateThemeToggle();
    });
  }
})();
