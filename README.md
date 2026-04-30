# Yaara Zuckerwar — Portfolio

Personal portfolio site for Yaara Zuckerwar, Design Systems & Product Designer.

## Structure

```
/
├── index.html              # Homepage (hero, work grid, experience, capabilities)
├── about.html              # About page
├── css/
│   └── style.css           # All styles
├── js/
│   └── main.js             # Cursor, scroll reveal, filter, card tilt
└── projects/
    ├── amicable-solutions.html
    ├── kleinanzeigen-design-system.html
    ├── transactions-overview.html
    ├── xing-design-system.html
    ├── xing-settings.html
    ├── google-snapseed.html
    ├── deutsche-bank.html
    └── motion.html
```

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `yaara-portfolio` or `yourusername.github.io`)
2. Push the contents of this folder to the `main` branch:

```bash
git init
git add .
git commit -m "Initial portfolio deploy"
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

3. Go to **Settings → Pages** in your GitHub repository
4. Under **Source**, select `Deploy from a branch`, choose `main`, and set the folder to `/ (root)`
5. Click **Save** — your site will be live at `https://yourusername.github.io/your-repo-name/` within a minute or two

> If you use a repo named exactly `yourusername.github.io`, the site deploys to `https://yourusername.github.io/` (no subfolder).

## Adding images

Replace the placeholder `div` elements in project pages with real `<img>` tags:

```html
<!-- Replace this -->
<div class="project-figure-placeholder" style="background:...; height:460px;"></div>

<!-- With this -->
<img src="../images/your-project-screenshot.jpg" alt="Description of the image" />
```

Place images in an `images/` folder at the root.

## Adding a CV

Drop your CV as `cv.pdf` at the root of the folder. All nav links already point to `cv.pdf`.

## Fonts

Loaded from Google Fonts: Playfair Display (editorial serif), DM Mono (monospace), Inter (body). No build step or local font files required.
