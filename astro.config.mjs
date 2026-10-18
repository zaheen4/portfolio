import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://zaheen4.github.io',
  base: '/portfolio',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [icon(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
})
