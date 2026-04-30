/* ── Custom cursor ── */
(function () {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;

  let mx = -200, my = -200, rx = -200, ry = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  (function tick() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(tick);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

/* ── Sticky nav ── */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

/* ── Scroll reveal ── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ── Portfolio filter ── */
(function () {
  const filterLinks = document.querySelectorAll('.work-filter a');
  const cards = document.querySelectorAll('.project-card[data-tags]');
  if (!filterLinks.length) return;

  filterLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const tag = link.dataset.tag;
      filterLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      cards.forEach(card => {
        const show = tag === 'all' || card.dataset.tags.includes(tag);
        card.classList.toggle('hidden', !show);
      });
    });
  });
})();

/* ── Card 3-D tilt ── */
(function () {
  if (!window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 6;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 6;
      card.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.012)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ── About page: active section in sticky nav ── */
(function () {
  const navLinks = document.querySelectorAll('.about-section-nav a');
  if (!navLinks.length) return;

  const sections = Array.from(navLinks)
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.about-section-nav a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
})();
