import js from '@eslint/js'
import globals from 'globals'
import astroPlugin from 'eslint-plugin-astro'
import tsParser from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', '.astro']),
  {
    files: ['**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.astro'],
    processor: 'astro/astro',
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        parser: 'astro-eslint-parser',
        extraFileExtensions: ['.astro'],
      },
    },
  },
  ...astroPlugin.configs['flat/recommended'],
])
