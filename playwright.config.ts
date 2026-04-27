import { defineConfig } from '@playwright/test';
import { ENV } from './config/env';

// 🔍 Debug 
console.log("CONFIG BASE URL:", ENV.BASE_URL);

export default defineConfig({
  testDir: './tests',
  retries: 1,

  reporter: [
    ['list'], // console output
    ['html', { outputFolder: 'reports/html', open: 'never' }], // HTML report
    ['allure-playwright'] // Allure report
  ],

  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    // Dynamic headless (best practice)
    headless: process.env.CI ? true : false,

    // Base URL
    baseURL: ENV.BASE_URL || 'https://www.saucedemo.com'
  }
});