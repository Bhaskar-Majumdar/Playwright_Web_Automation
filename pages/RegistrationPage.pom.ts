import { Page } from "@playwright/test";
import { UserModel } from "../models/usermodel.js";

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async userRegister(user: UserModel) {
    await this.page.fill('input[name="firstName"]', user.firstName);
    await this.page.fill('input[name="lastName"]', user.lastName);
    await this.page.fill('input[name="email"]', user.email);
    await this.page.fill('input[name="password"]', user.password);
    await this.page.fill('input[name="phoneNumber"]', user.phoneNumber);
    await this.page.fill('input[name="address"]', user.address);
    await this.page.getByRole("radio").nth(0).check();
    await this.page.getByRole("checkbox").check();
    await this.page.getByRole("button",{name:"REGISTER"}).click();
  }
}