import { Page } from "@playwright/test";

export class ResetPassword {
  constructor(private page: Page) {}

  async openResetPage() {
    await this.page.goto("https://dailyfinance.roadtocareer.net/login");
    await this.page.getByRole("link", { name: "Reset it here" }).click();
  }

  async sendResetLink(email: string) {
    await this.page.getByRole("textbox", { name: "Email" }).fill(email);
    await this.page.getByRole("button", { name: "Send Reset Link" }).click();
    await this.page.waitForTimeout(3000);
  }

  async setNewPassword(password: string) {
    await this.page.getByLabel("New Password").fill(password);
    await this.page.getByLabel("Confirm Password").fill(password);
    await this.page.getByRole("button", { name: "Reset Password" }).click();
  }
}