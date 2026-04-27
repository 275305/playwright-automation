import { defineConfig } from '@playwright/test';
import { ENV } from './config/env';

// 🔍 Debug 
console.log("CONFIG BASE URL:", ENV.BASE_URL);

export default defineConfig({
  testDir: './tests',
  retries: 1,

  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['list'],
    ['allure-playwright']
  ],
  

  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    //  SAFE + COMPANY STANDARD
    baseURL: ENV.BASE_URL || 'https://www.saucedemo.com'
  }
});