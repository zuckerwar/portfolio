document.addEventListener('DOMContentLoaded', () => {

  /* ── Theme toggle ── */
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const project = typeof PROJECTS !== 'undefined' && PROJECTS.find(p => p.id === id);
  const main = document.getElementById('project-page');

  if (!project || !main) {
    main.innerHTML = `
      <div class="container" style="padding-top:calc(var(--nav-height) + var(--space-10));padding-bottom:var(--space-10);">
        <p style="color:var(--text-secondary)">Project not found. <a href="index.html" style="color:var(--accent-text);text-decoration:underline">Back to work</a></p>
      </div>`;
    return;
  }

  document.title = `${project.title} — Yaara Zuckerwar`;

  const coverBg = `linear-gradient(135deg, ${project.coverColor} 0%, ${adjustColor(project.coverColor, 20)} 100%)`;
  const tagsHtml = project.tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join('');
  const heroImg = project.coverImage
    ? `<img src="images/${project.coverImage}" alt="${escHtml(project.title)}" loading="eager">`
    : '';

  main.innerHTML = `
    <div class="project-detail__inner animate-in">
      <div class="panel-hero" style="background: ${coverBg};">
        <div class="panel-hero__bg">${heroImg}</div>
        <div class="panel-hero__gradient"></div>
        <div class="panel-hero__content">
          <div class="panel-hero__tags">${tagsHtml}</div>
          <h1 class="panel-hero__title">${escHtml(project.title)}</h1>
          <div class="panel-hero__meta">
            <span>${escHtml(project.client)}</span>
            <span>${escHtml(project.year)}</span>
            <span>${escHtml(project.role)}</span>
            <span>${escHtml(project.platforms)}</span>
          </div>
        </div>
        <a href="index.html#work" class="panel-close" aria-label="Back to work">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M10 3L5 8l5 5"/>
          </svg>
        </a>
      </div>
      <div class="panel-content">
        ${project.sections.map(renderSection).join('')}
      </div>
    </div>
  `;
});

function renderSection(section) {
  switch (section.type) {
    case 'intro':
      return `
        <div class="case-section case-section--intro">
          <p class="case-section__eyebrow">Overview</p>
          <h2 class="case-section__title">${escHtml(section.title)}</h2>
          <p class="case-section__body">${escHtml(section.body)}</p>
        </div>`;

    case 'text':
      return `
        <div class="case-section">
          <h2 class="case-section__title">${escHtml(section.title)}</h2>
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
