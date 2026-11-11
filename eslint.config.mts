import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'error',
    },
  },
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
]);
