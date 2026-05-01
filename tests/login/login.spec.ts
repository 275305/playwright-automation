
import { test, expect } from '@playwright/test';

import { LoginActions } from '../../actions/LoginActions';
import { getLoginData } from '../../test-data/testDataProvider';

test('Login Test1', async ({ page }) => {

    //debug
    console.log("BASE URL:", test.info().project.use.baseURL);

    const login = new LoginActions(page);
    const data = getLoginData();

    await page.goto('/');
    await login.login(data.username, data.password);

    await expect(page).toHaveURL(/inventory/);

    await test.info().attach("screenshot", {
        body: await page.screenshot(),
        contentType: "image/png"
    });


});

test('Login Test 2', async ({ page }) => {

    console.log("BASE URL:", test.info().project.use.baseURL);

    const login = new LoginActions(page);
    const data = getLoginData();

    await page.goto('/');
    await login.login(data.username, data.password);
    await expect(page).toHaveURL(/inventory/);


});

test('Login Test3', async ({ page }) => {

    const data = getLoginData();
    const loginObj = new LoginActions(page);
    await page.goto('/');

    await loginObj.login(data.username, data.password);
    await expect(page).toHaveURL(/inventory/);
});