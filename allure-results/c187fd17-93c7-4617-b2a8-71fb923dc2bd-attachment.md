# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login\login.spec.ts >> Login Test3
- Location: tests\login\login.spec.ts:42:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#user-name')

```

# Test source

```ts
  1  | 
  2  | import { Page } from '@playwright/test';
  3  | import { loginLocators } from '../locators/loginLocators';
  4  | 
  5  | export class LoginPage {
  6  | 
  7  |     private page: Page;
  8  | 
  9  |     constructor(page: Page) {
  10 |         this.page = page;
  11 |     }
  12 | 
  13 | 
  14 |     async enterUsername(username: string) {
  15 | 
> 16 |         await this.page.fill(loginLocators.username, username);
     |                         ^ Error: page.fill: Test timeout of 30000ms exceeded.
  17 |     }
  18 | 
  19 |     async enterPassword(password: string) {
  20 | 
  21 |         await this.page.fill(loginLocators.password, password);
  22 |     }
  23 | 
  24 |     async clickLogin(){
  25 | 
  26 |         await this.page.click(loginLocators.loginBtn);
  27 |     }
  28 | 
  29 | }
```