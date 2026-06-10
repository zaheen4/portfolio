# Portfolio Improvement Opportunities

## Performance

1. **animejs duplicated per component** — 7 components each `import { animate, stagger }` from animejs; Astro bundles each `<script>` separately, duplicating the library. A shared import module would save ~tens of KB.

2. **No `preconnect` hints** — missing for `api.github.com`, Giphy, and (if used) Google Fonts.

3. **Animated GIF** — the About GIF is likely the single largest asset (~2-5MB). Could swap to a short video loop or static image.

4. **Inter font never loaded** — declared in `@theme` but no `<link>` to Google Fonts; falls back to system fonts silently.

## Accessibility

1. **No skip-to-content link** — should be first focusable element in `<body>` (WCAG 2.4.1).

2. **Mobile menu missing `aria-expanded` + `aria-controls`** — toggle button doesn't announce state or link to panel.

3. **Section landmarks lack labels** — `<section id="about">` etc. have no `aria-labelledby` pointing to their heading.

4. **External link indicators SVG-only** — project card "opens in new tab" icon has no screen-reader text.

## SEO

1. **Missing Open Graph / Twitter Card meta tags** — `og:title`, `og:description`, `og:image`, `twitter:card` etc. absent.

2. **No canonical URL** — `<link rel="canonical">` missing.

3. **No JSON-LD structured data** — no `Person` schema for rich search results.

4. **No sitemap** — `@astrojs/sitemap` not installed/configured.

## UX

1. **No contact form** — only mailto/social links; visitors must leave the site.

2. **Resume/CV download link** — not present in hero or navbar.

3. **Hero tagline is static** — could have a typing animation.

## Maintainability

- **README is outdated** — mentions Framer Motion, React Icons, Skeleton Loaders (none of which exist in current codebase).
