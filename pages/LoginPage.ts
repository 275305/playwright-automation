
import { Page } from '@playwright/test';
import { loginLocators } from '../locators/loginLocators';

export class LoginPage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    async enterUsername(username: string) {

        await this.page.fill(loginLocators.username, username);
    }

    async enterPassword(password: string) {

        await this.page.fill(loginLocators.password, password);
    }

    async clickLogin(){

        await this.page.click(loginLocators.loginBtn);
    }

}