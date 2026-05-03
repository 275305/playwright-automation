import { Page } from '@playwright/test';
import * as allure from 'allure-js-commons';

export const attachScreenshot = async (page: Page) => {
  const screenshot = await page.screenshot();
  await allure.attachment('Screenshot on Failure', screenshot, 'image/png');
};