
import { test, expect } from '@playwright/test';

import { LoginActions } from '@actions/LoginActions';
import { getLoginData } from '@testdata/testDataProvider';
import '@hooks/testHooks';

test('@smoke Login Test1', async ({ page }) => {

    //debug
    console.log("BASE URL:", test.info().project.use.baseURL);

    const login = new LoginActions(page);
    const data = getLoginData();

    await page.goto('/');
    await login.login(data.username, data.password);

    await expect(page).toHaveURL(/inventory/);


});

test('@smoke Login Test 2', async ({ page }) => {

    console.log("BASE URL:", test.info().project.use.baseURL);

    const login = new LoginActions(page);
    const data = getLoginData();

    await page.goto('/');
    await login.login(data.username, data.password);

    await expect(page).toHaveURL(/inventory/);


});

test('@smoke Login Test3', async ({ page }) => {

    const data = getLoginData();
    const loginObj = new LoginActions(page);
    await page.goto('/');

    await loginObj.login(data.username, data.password);
    await expect(page).toHaveURL(/wrong-url/);
});