// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 60000,
  expect: {

    timeout: 5000,
  },
  use: {
    actionTimeout: 0,
    navigationTimeout: 60000,
    browserName: 'chromium',
    headless: false
  },

  /* Configure projects for major browsers */

});

module.exports = config;

