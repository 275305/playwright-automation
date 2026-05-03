import { test } from '@playwright/test';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {

    // Screenshot attach
    const screenshot = await page.screenshot();
    await testInfo.attach('Failure Screenshot', {
      body: screenshot,
      contentType: 'image/png'
    });

    // Video attach
    const video = await page.video();
    if (video) {
      await testInfo.attach('Failure Video', {
        path: await video.path(),
        contentType: 'video/webm'
      });
    }
  }
});