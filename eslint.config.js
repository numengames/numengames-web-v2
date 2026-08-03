// @ts-check
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/', 'playwright-report/', 'test-results/'] },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  // Reglas de accesibilidad sobre plantillas .astro — obligatorias en CI.
  ...eslintPluginAstro.configs['flat/jsx-a11y-strict'],
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
