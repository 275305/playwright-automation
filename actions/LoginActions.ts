
import { Page } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";

export class LoginActions {

   private loginPage: LoginPage;

   constructor(page: Page) {
      this.loginPage = new LoginPage(page);
   }

   async navigateToLogin() {
      await this.loginPage.loginLink.click();
   }


   async enterEmail(email: string) {
      await this.loginPage.emailInput.fill(email);
   }

   async enterPassword(password: string) {

      await this.loginPage.passwordInput.fill(password);

   }

   async clickLoginButtonHomePage() {

      await this.loginPage.loginButtonHomePage.click();
   }

}