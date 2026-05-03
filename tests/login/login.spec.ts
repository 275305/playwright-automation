
import { test, expect } from '@playwright/test';
import { PAGE_TITLES } from '@utils/constants';
import { LoginActions } from '@actions/LoginActions';
import { getLoginData } from '@testdata/testDataProvider';
import '@hooks/testHooks';

test.only('Login Test1', { tag: '@smoke' }, async ({ page }) => {

    //debug
    console.log("BASE URL:", test.info().project.use.baseURL);

    const loginActions = new LoginActions(page);
    const data = getLoginData();

    await page.goto('/');

    await loginActions.navigateToLogin();
    await loginActions.enterEmail(data.useremail);
    await loginActions.enterPassword(data.userpassword);
    await loginActions.clickLoginButtonHomePage();

    await expect(page).toHaveTitle(PAGE_TITLES.HOME);

});

test('Login Test 2', { tag: '@smoke' }, async ({ page }) => {

    console.log("BASE URL:", test.info().project.use.baseURL);

    const login = new LoginActions(page);
    const data = getLoginData();

    await page.goto('/');



});

test('Login Test3', { tag: '@smoke' }, async ({ page }) => {

    const data = getLoginData();
    const loginObj = new LoginActions(page);
    await page.goto('/');


});