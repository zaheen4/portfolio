import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import astroPlugin from 'eslint-plugin-astro'
import tsParser from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', '.astro']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
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
