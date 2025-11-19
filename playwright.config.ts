import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60_000,
  use: {
    baseURL: 'https://demowebshop.tricentis.com',
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'retain-on-failure',
    headless: false,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: [['html', { open: 'never' }]],
});
