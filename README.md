# Yaara Zuckerwar — Portfolio

Personal portfolio. No framework, no build step, no CMS. Plain HTML + CSS + vanilla JS, deployable directly to GitHub Pages.

## Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Push this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to **Settings → Pages**
4. Set source to **Deploy from a branch** → `main` → `/ (root)`
5. Save — live at `https://YOUR_USERNAME.github.io/YOUR_REPO/` within a minute

**Custom domain** (e.g. `yaara.design`): add a `CNAME` file to the repo root containing just the domain name, then point your DNS to GitHub Pages per the [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

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

## Updating content

All project content lives in `js/projects.js`. Each project is a plain JS object — edit fields directly. Changes take effect immediately on reload, no build needed.

### Add or edit a project

```js
{
  id: "unique-slug",
  title: "Project Title",
  client: "Client Name",
  year: "2024",
  role: "Your Role",
  platforms: "Web, iOS, Android",
  tags: ["Design System"],        // "Design System", "Product Design", or "Motion"
  coverColor: "#1a2e2c",          // background gradient base color
  coverAccent: "#00DDC7",         // accent color for placeholder icon
  coverImage: "my-cover.jpg",     // place file in /images/ — omit for gradient placeholder
  subtitle: "Short tagline",      // shown below title on the card
  shortDescription: "One sentence shown on the card.",
  cardStats: [                    // up to 3 metrics shown on the card
    { value: "44%", label: "Self-serve resolution" }
  ],
  sections: [ ... ]               // case study content (see below)
}
```

To **hide a project** without deleting it, add `hidden: true` to the object.

To **reorder projects**, cut and paste the objects within the array — order here equals order on the page.

### Add a cover image

1. Export as JPG or PNG, recommended size **1200 × 800px**
2. Drop the file into `/images/`
3. Set `coverImage: "filename.jpg"` on the project

### Case study section types

```js
{ type: "intro",   title: "...", body: "..." }
{ type: "text",    title: "...", body: "...", image: "file.jpg", imageAlt: "..." }
{ type: "image",   src: "file.jpg", alt: "...", caption: "..." }
{ type: "keywork", items: [{ label: "...", description: "..." }] }
{ type: "stats",   items: [{ value: "44%", label: "..." }] }
```

## Theming

Design tokens live in `css/tokens.css` — all colors, spacing, and typography are CSS custom properties. Light and dark values are in the `:root` and `[data-theme="dark"]` blocks.

The site defaults to dark mode. Users can toggle via the nav button; their preference is saved to `localStorage`.
