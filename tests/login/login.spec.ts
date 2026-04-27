
import { test, expect } from '@playwright/test';

import { LoginActions } from '../../actions/LoginActions';
import { getLoginData } from '../../test-data/testDataProvider';

test('Login Test', async ({ page }) => {

    //debug
    console.log("BASE URL:", test.info().project.use.baseURL);

    const login = new LoginActions(page);
    const data = getLoginData();

    await page.goto('/');
    await login.login(data.username, data.password);

    await test.info().attach("screenshot", {
        body: await page.screenshot(),
        contentType: "image/png"
    });

});