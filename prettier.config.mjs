/** @type {import('prettier').Config} */
export default {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  plugins: ['prettier-plugin-astro'],
  // Astro 6 compresses HTML with HTML-aware whitespace rules (compressHTML defaults to true).
  // prettier-plugin-astro defaults to 'jsx' to match Astro 7, so this must be pinned to 'html'
  // here — otherwise Prettier reflows whitespace the current compiler would preserve, which can
  // change rendered output. Revisit when upgrading to Astro 7.
  astroCompressHTML: 'html',
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
  ],
}
