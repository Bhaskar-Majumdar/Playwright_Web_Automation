import { Page } from "@playwright/test";
import { UserModel } from "../models/usermodel.js";

export class LoginPage {
    constructor(private page: Page) {}
    async userLogin(email: string, password: string){
        await this.page.getByRole("textbox",{name:"Email"}).fill(email);
        await this.page.getByLabel("Password").fill(password);
        await this.page.getByRole("button",{name:"LOGIN"}).click();
    }
}