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
      /* La regla ya permite tabindex en role="tabpanel" (contenedor de
         contenido enfocable); se amplía a role="region" por el mismo
         motivo: una región desplazable DEBE ser alcanzable con teclado
         (axe `scrollable-region-focusable`, WCAG 2.1.1). Solo aplica a
         elementos que declaren el role — un div corriente sigue vetado. */
      'astro/jsx-a11y/no-noninteractive-tabindex': [
        'error',
        { tags: [], roles: ['tabpanel', 'region'], allowExpressionValues: true },
      ],
    },
  },
];
