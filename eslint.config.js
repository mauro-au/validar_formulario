import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: 2024,        // sintaxis moderna de JS
      sourceType: 'module',     // habilita ES modules (import/export)
      globals: {
        ...globals.browser,     // document, window, fetch, etc.
      },
    },
    rules: {
      // ─── Errores reales ───────────────────────────────────────────
      'no-var': 'error',                      // obliga let/const
      'eqeqeq': ['error', 'always'],          // obliga ===
      'no-implicit-globals': 'error',         // evita variables globales accidentales
      'no-param-reassign': 'error',           // evita mutar parámetros de funciones
      'no-use-before-define': 'error',        // evita usar variables antes de declararlas

      // ─── Buenas prácticas ─────────────────────────────────────────
      'prefer-const': 'warn',                 // sugiere const cuando no se reasigna
      'no-unused-vars': 'warn',               // avisa de variables declaradas y no usadas
      'no-console': 'warn',                   // avisa de console.log olvidados
      'object-shorthand': 'warn',             // { name: name } → { name }
      'prefer-template': 'warn',              // concatenación → template literals
      'prefer-arrow-callback': 'warn',        // function() en callbacks → () =>

      // ─── Estilo (lo que no cubre Prettier) ───────────────────────
      'spaced-comment': ['warn', 'always'],   // obliga espacio después de //
      'no-lonely-if': 'warn',                 // evita if suelto dentro de else
      'no-else-return': 'warn',               // evita else innecesario después de return
    },
  },
];