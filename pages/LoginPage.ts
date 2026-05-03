import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get loginLink(): Locator {
        return this.page.getByRole('link', { name: /login/i });
    }

    get emailInput(): Locator {
        return this.page.locator('[data-qa="login-email"]');
    }

    get passwordInput(): Locator {

        return this.page.locator('[data-qa="login-password"]');
    }

    get loginButtonHomePage() {

        return this.page.locator('[data-qa="login-button"]');
    }



}