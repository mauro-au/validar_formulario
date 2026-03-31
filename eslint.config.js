import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals'; // 👈 agregar

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser, // 👈 habilita document, window, etc.
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'eqeqeq': 'error',
      'no-var': 'error',
      'prefer-const': 'warn',
    },
  },
];