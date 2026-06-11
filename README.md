# Mir Zaheen Waseet — Portfolio

Personal portfolio website built with Astro, anime.js, and Tailwind CSS.

**Live:** https://zaheen4.github.io/portfolio

## Tech Stack

- **Astro 6** — Static site generation with optional React islands
- **anime.js** — Animations (stagger entrances, mask sweep, scramble text, float effects)
- **Tailwind CSS 4** — Utility-first styling
- **astro-icon** — Icons (Lucide + Simple Icons sets, zero runtime JS)
- **React 19** — Only used for the ThemePicker island (`client:idle`)

## Features

- **12 Themes** — Code editor-inspired themes (Dracula, Nord, Monokai, Tokyo Night, Catppuccin, One Dark, GitHub Light, Solarized Light, etc.) with crossfade transitions
- **Animated Sections** — Stagger letter reveals, mask sweeps, glass chip floats, scramble text effects
- **Static Projects** — GitHub repositories fetched at build time, rendered as static HTML cards
- **Parallax Background** — Amber glow orbs that drift on scroll
- **Glass Chip Design** — Skills and contact links with specular glow on hover
- **Responsive** — Works on all screen sizes
- **SEO** — OG/Twitter meta, canonical, JSON-LD, auto-generated sitemap

## Getting Started

```bash
npm install
npm run dev       # localhost:4321/portfolio
npm run build     # static output in dist/
npm run preview   # preview production build
```

## Deployment

Deployed to **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`). Auto-deploys on every push to `main`.

## License

Personal project — not intended for redistribution.
