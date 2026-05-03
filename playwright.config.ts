import dotenv from 'dotenv';

// ENV LOAD (VERY IMPORTANT - TOP PE HI HONA CHAHIYE)
dotenv.config({
  path: `.env.${process.env.ENV || 'qa'}`
});

// fallback (optional but recommended)
dotenv.config();

import { defineConfig } from '@playwright/test';
import { ENV } from './config/env';

// 🔍 Debug 
console.log("CONFIG BASE URL:", ENV.BASE_URL);

export default defineConfig({
  testDir: './tests',
  retries: 1,

  // PARALLEL EXECUTION
  fullyParallel: true,
  workers: 3,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['allure-playwright']
  ],

  use: {
    //  Screenshot on failure
    screenshot: 'only-on-failure',

    //  Video retain on failure
    video: 'retain-on-failure',

    //  UPDATED (your requirement)
    trace: 'retain-on-failure',

    // Dynamic headless (best practice)
    headless: process.env.CI ? true : false,

    // Base URL
    baseURL: ENV.BASE_URL || 'https://www.saucedemo.com',

    // ADD THIS (maximize behavior)
    viewport: { width: 1920, height: 1080 }
  }
});