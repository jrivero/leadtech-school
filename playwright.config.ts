import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4322', browserName: 'chromium', trace: 'retain-on-failure' },
  webServer: { command: 'npm run preview -- --port 4322 --ignore-lock', url: 'http://127.0.0.1:4322', reuseExistingServer: false },
});
