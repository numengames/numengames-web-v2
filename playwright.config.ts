import { defineConfig, devices } from '@playwright/test';

// Requiere `pnpm build` previo: sirve el estático con `astro preview`.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: { baseURL: 'http://localhost:4321' },
  /* Tres motores (ADR 0006): Chromium ejercita el motor de scroll nativo;
     Firefox y WebKit, el de reserva. Con un solo proyecto el motor de
     reserva no lo ejecutaba ninguna prueba. */
  projects: [
    { name: 'chromium', use: devices['Desktop Chrome'] },
    { name: 'firefox', use: devices['Desktop Firefox'] },
    { name: 'webkit', use: devices['Desktop Safari'] },
  ],
  webServer: {
    command: 'pnpm preview --port 4321',
    port: 4321,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
