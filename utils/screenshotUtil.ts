
import { Page } from "@playwright/test";

export async function takeScreenshot (page : Page, name:String) {

    await page.screenshot({ path: `screenshots/${name}.png` });
    
}