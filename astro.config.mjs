// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://numen.games',
  output: 'static',
  trailingSlash: 'ignore',

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },

  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es', en: 'en' } },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
