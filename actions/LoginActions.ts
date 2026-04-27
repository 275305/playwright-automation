
import { Page } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";

export class LoginActions{

     private loginPage;

    constructor(page : Page){

       this.loginPage= new LoginPage(page);
    }

    async login(username : string, password: string){
 
    await this.loginPage.enterUsername(username);
    await this.loginPage.enterPassword(password);
    await this.loginPage.clickLogin();


    }

}