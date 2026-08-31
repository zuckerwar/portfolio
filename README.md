# Yaara Zuckerwar - Portfolio

Working on my [personal portfolio](https://zuckerwar.github.io/portfolio/index.html). No framework, no build step, no CMS. Plain HTML + CSS + vanilla JS, deployable directly to GitHub Pages.


## Project structure

```
/
├── index.html          # Home — project grid
├── about.html          # About page
├── css/
│   ├── tokens.css      # Design tokens (colors, spacing, typography)
│   └── main.css        # All styles
├── js/
│   ├── projects.js     # All project data — edit this to update content
│   ├── main.js         # Card rendering, project panel open/close
│   ├── project.js      # Theme toggle
│   ├── cursor.js       # Custom cursor
│   └── transitions.js  # Page transitions
└── images/             # Cover images and case study assets
```

The site defaults to dark mode. Users can toggle via the nav button; their preference is saved to `localStorage`.
