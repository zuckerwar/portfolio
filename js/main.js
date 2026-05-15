document.addEventListener('DOMContentLoaded', () => {

  /* ── Theme toggle ── */
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ── Build grid ── */
  const grid   = document.getElementById('projects-grid');
  const detail = document.getElementById('project-detail');
  if (!grid || !detail || typeof PROJECTS === 'undefined') return;

  let activeId = null;

  PROJECTS.filter(p => !p.hidden).forEach((project, i) => {
    const card = buildCard(project);
    card.classList.add('animate-in');
    card.style.setProperty('--delay', `${820 + i * 100}ms`);
    grid.appendChild(card);
  });

  /* ── Open ── */
  function openProject(project) {
    if (activeId === project.id) { closeProject(); return; }
    activeId = project.id;

    grid.querySelectorAll('.project-card').forEach(c =>
      c.classList.toggle('is-active', c.dataset.id === project.id));

    populateDetail(project, detail);
    detail.classList.remove('is-settled');
    detail.style.maxHeight = '0';
    detail.classList.remove('is-open');

    // Scroll so the panel sits just below the hero bio
    const heroEl = document.querySelector('.hero');
    const scrollTarget = heroEl ? heroEl.offsetTop + heroEl.offsetHeight : 0;
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });

    // Start animation on next frame so browser registers the reset first
    requestAnimationFrame(() => {
      detail.getBoundingClientRect();
      detail.classList.add('is-open');
      detail.style.maxHeight = detail.scrollHeight + 'px';

      detail.addEventListener('transitionend', function onEnd(e) {
        if (e.propertyName !== 'max-height') return;
        detail.removeEventListener('transitionend', onEnd);
        detail.style.maxHeight = '';
        detail.classList.add('is-settled');
      });
    });
  }

  /* ── Close ── */
  function closeProject() {
    activeId = null;
    detail.style.maxHeight = detail.scrollHeight + 'px';
    detail.classList.remove('is-settled');
    detail.getBoundingClientRect();
    detail.classList.remove('is-open');
    detail.style.maxHeight = '0';
    grid.querySelectorAll('.project-card').forEach(c => c.classList.remove('is-active'));
  }

  window._openProject  = openProject;
  window._closeProject = closeProject;

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeId) closeProject();
  });
});

/* ─────────────────────────────────────────────
   Build project card
──────────────────────────────────────────── */

function buildCard(project) {
  const article = document.createElement('article');
  article.className = 'project-card';
  article.dataset.id = project.id;
  article.setAttribute('role', 'button');
  article.setAttribute('tabindex', '0');
  article.setAttribute('aria-label', `Open case study: ${project.title}`);
  article.setAttribute('aria-expanded', 'false');

  const coverBg = `linear-gradient(135deg, ${project.coverColor} 0%, ${adjustColor(project.coverColor, 20)} 100%)`;
  const tagsHtml = project.tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join('');

  const statsHtml = project.cardStats
    ? `<div class="project-card__stats">
        ${project.cardStats.map(s => `
          <div class="project-card__stat">
            <span class="project-card__stat-value">${escHtml(s.value)}</span>
            <span class="project-card__stat-label">${escHtml(s.label)}</span>
          </div>`).join('')}
       </div>`
    : '';

  article.innerHTML = `
    <div class="project-card__body">
      <div class="project-card__top">
        <div class="project-card__tags-row">
          <div class="project-card__tags">${tagsHtml}</div>
          <p class="project-card__meta">${escHtml(project.client)} &nbsp;·&nbsp; ${escHtml(project.year)}</p>
        </div>
        <div class="project-card__titles">
          <h3 class="project-card__title">${escHtml(project.title)}</h3>
          ${project.subtitle ? `<p class="project-card__subtitle">${escHtml(project.subtitle)}</p>` : ''}
        </div>
        <p class="project-card__description">${escHtml(project.shortDescription)}</p>
      </div>
      <div class="project-card__bottom">
        ${statsHtml}
        <div class="project-card__arrow">
          View case study
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="project-card__cover" style="background: ${coverBg};">
      ${project.coverImage
        ? `<img src="images/${project.coverImage}" alt="${escHtml(project.title)}" loading="lazy">`
        : coverPlaceholderSVG(project.coverAccent)}
    </div>
  `;

  function toggle() {
    article.setAttribute('aria-expanded', String(!article.classList.contains('is-active')));
    window._openProject?.(project);
  }

  article.addEventListener('click', toggle);
  article.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });

  return article;
}

/* ─────────────────────────────────────────────
   Populate detail panel
──────────────────────────────────────────── */

function populateDetail(project, detail) {
  const tagsHtml = project.tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join('');
  const coverImg = project.coverImage
    ? `<div class="case-image" style="margin-bottom:var(--space-6);">
        <img src="images/${project.coverImage}" alt="${escHtml(project.title)}" loading="eager">
       </div>`
    : '';

  detail.innerHTML = `
    <div class="project-detail__inner">
      <div class="case-project-header">
        <div class="case-project-tags">${tagsHtml}</div>
        <h2 class="case-project-title">${escHtml(project.title)}</h2>
        <div class="case-project-meta">
          <span>${escHtml(project.client)}</span>
          <span>${escHtml(project.year)}</span>
          <span>${escHtml(project.role)}</span>
          <span>${escHtml(project.platforms)}</span>
        </div>
      </div>
      ${coverImg}
      ${project.sections.map(renderSection).join('')}
    </div>
  `;
}

/* ─────────────────────────────────────────────
   Render case study sections
──────────────────────────────────────────── */

function renderSection(section) {
  switch (section.type) {
    case 'intro':
      return `
        <div class="case-section case-section--intro">
          <p class="case-section__eyebrow">Overview</p>
          <h3 class="case-section__title">${escHtml(section.title)}</h3>
          <p class="case-section__body">${escHtml(section.body)}</p>
        </div>`;
    case 'text':
      return `
        <div class="case-section">
          <h3 class="case-section__title">${escHtml(section.title)}</h3>
          <p class="case-section__body">${escHtml(section.body)}</p>
          ${section.image ? `
            <div class="case-image">
              <img src="images/${escHtml(section.image)}" alt="${escHtml(section.imageAlt || section.title)}" loading="lazy">
            </div>` : ''}
        </div>`;
    case 'image':
      return `
        <div class="case-section">
          <div class="case-image">
            ${section.src
              ? `<img src="images/${escHtml(section.src)}" alt="${escHtml(section.alt || '')}" loading="lazy">`
              : `<div class="case-image__placeholder">[ ${escHtml(section.alt || 'Project screenshot')} ]</div>`}
          </div>
          ${section.caption ? `<p style="margin-top:var(--space-3);font-size:0.8125rem;color:var(--text-muted);font-family:var(--font-mono);">${escHtml(section.caption)}</p>` : ''}
        </div>`;
    case 'keywork':
      return `
        <div class="case-section">
          <p class="case-section__eyebrow">Key work</p>
          <div class="keywork-grid">
            ${section.items.map(item => `
              <div class="keywork-item">
                <div class="keywork-item__label">${escHtml(item.label)}</div>
                <div class="keywork-item__desc">${escHtml(item.description)}</div>
              </div>`).join('')}
          </div>
        </div>`;
    case 'stats':
      return `
        <div class="case-section">
          <div class="stats-row">
            ${section.items.map(item => `
              <div class="stat-item">
                <div class="stat-item__value">${escHtml(item.value)}</div>
                <div class="stat-item__label">${escHtml(item.label)}</div>
              </div>`).join('')}
          </div>
        </div>`;
    default:
      return '';
  }
}

/* ─────────────────────────────────────────────
   Helpers
──────────────────────────────────────────── */

function coverPlaceholderSVG(accent) {
  return `
    <div class="project-card__cover-placeholder">
      <svg class="project-card__cover-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="8" y="14" width="32" height="22" rx="2" stroke="${accent}" stroke-width="1.5"/>
        <path d="M8 20h32" stroke="${accent}" stroke-width="1.5"/>
        <circle cx="14" cy="17" r="1.5" fill="${accent}"/>
        <circle cx="19" cy="17" r="1.5" fill="${accent}"/>
      </svg>
    </div>`;
}

function adjustColor(hex, amount) {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (n >> 16) + amount);
  const g = Math.min(255, ((n >> 8) & 0xff) + amount);
  const b = Math.min(255, (n & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
