# Yaara Zuckerwar — Portfolio

A personal design portfolio built with plain HTML, CSS, and vanilla JavaScript. There is no framework, build step, or CMS; the files can be served directly by a static web host.

## Project structure

```text
/
├── index.html                         # Home page and project grid
├── shop-to-shop.html                  # Shop-to-Shop Shipping case study
├── cs-and-dispute.html                # Dispute Resolution Center case study
├── ka-design-system.html              # Kleinanzeigen Design System case study
├── transactions-overview.html         # Transactions Overview case study
├── xing-design-system.html            # XING Design System case study
├── deutsche-bank-advisors-platform.html # Deutsche Bank Advisors Platform case study
├── google-snapseed.html               # Google Snapseed project
├── moving-things.html                 # Animation project
├── contrast-scale.html                # Contrast Scale project
├── typesource.html                    # TypeSource project page
├── css/
│   └── styles.css                     # Site styles, themes, and responsive layout
├── js/
│   ├── app.js                         # Shared interactions and light/dark theme toggle
│   ├── nav.js                         # Shared navigation menu
│   ├── case-gallery.js                # Case study gallery controls
│   └── contrast-scale.js              # Contrast Scale tool interactions
└── assets/                            # Project thumbnails, images, icons, and animations
```

The site starts in light mode. Visitors can switch themes with the toggle on the home page; the choice is saved in `localStorage` and reused on later visits.

The shared navigation is inserted by `js/nav.js`. The reusable case study gallery is used on the Shop-to-Shop Shipping and Dispute Resolution Center pages.
