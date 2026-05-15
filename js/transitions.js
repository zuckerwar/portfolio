(function () {
  const EXPAND_MS = 480;
  const REVEAL_MS = 560;

  /* ── Exit: card expands to fill screen, then navigate ── */
  window.doorNavigate = function (url, color, cardEl) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      location.href = url;
      return;
    }

    const rect = cardEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      z-index: 999;
      background: ${color};
      border-radius: 8px;
      pointer-events: none;
      top: ${rect.top}px;
      left: ${rect.left}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      transition: none;
    `;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => requestAnimationFrame(() => {
      overlay.style.transition = `top ${EXPAND_MS}ms cubic-bezier(0.7,0,0.3,1),
                                   left ${EXPAND_MS}ms cubic-bezier(0.7,0,0.3,1),
                                   width ${EXPAND_MS}ms cubic-bezier(0.7,0,0.3,1),
                                   height ${EXPAND_MS}ms cubic-bezier(0.7,0,0.3,1),
                                   border-radius ${EXPAND_MS}ms ease`;
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = vw + 'px';
      overlay.style.height = vh + 'px';
      overlay.style.borderRadius = '0';

      setTimeout(() => { location.href = url; }, EXPAND_MS + 30);
    }));
  };

  /* ── Enter: full-screen cover recedes upward to reveal page ── */
  document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('project-page')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const params = new URLSearchParams(location.search);
    const color  = decodeURIComponent(params.get('color') || '#111111');

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 999;
      background: ${color};
      pointer-events: none;
      transform: translateY(0);
      transition: none;
    `;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => requestAnimationFrame(() => {
      overlay.style.transition = `transform ${REVEAL_MS}ms cubic-bezier(0.7,0,0.3,1)`;
      overlay.style.transform = 'translateY(-100%)';
      setTimeout(() => overlay.remove(), REVEAL_MS + 100);
    }));
  });
})();
