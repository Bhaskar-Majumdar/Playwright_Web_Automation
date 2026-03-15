import { Page, expect } from "@playwright/test";

export class ProfilePage {

  constructor(private page: Page) {}

  async openProfile() {

    // profile icon/menu click
    await this.page.getByRole('button', { name: 'account of current user' }).click();

    // profile/settings option
    await this.page.getByRole("menuitem", { name: "profile" }).click();
    await this.page.getByRole('button', { name: 'Edit' }).click();

  }

  async updateEmail(newEmail: string) {

    const emailField = this.page.getByLabel("Email");
    await emailField.fill(newEmail);
    await this.page.getByRole("button", { name: /update/i }).click();

  }

  async verifyEmailUpdated(newEmail: string) {

    const emailField = this.page.getByLabel("Email");
    await expect(emailField).toHaveValue(newEmail);

  }

  async logout() {

    await this.page.getByRole('button', { name: 'account of current user' }).click();
    await this.page.getByRole("menuitem", { name: "Logout" }).click();

}

}