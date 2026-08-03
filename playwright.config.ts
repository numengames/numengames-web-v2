import { defineConfig } from '@playwright/test';

// Requiere `pnpm build` previo: sirve el estático con `astro preview`.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: { baseURL: 'http://localhost:4321' },
  webServer: {
    command: 'pnpm preview --port 4321',
    port: 4321,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
