import { Page } from "@playwright/test";

export class ItemPage {

  constructor(private page: Page) {}

  async openAddItem() {
    await this.page.getByRole("button",{name:'Add Cost'}).click();
  }

  async addItemAllFields(itemName: string, amount: string) {

    await this.openAddItem();

    await this.page.getByLabel("Item Name").fill(itemName);
    await this.page.getByRole("button",{name:"+"}).click();
    await this.page.getByLabel("Amount").fill(amount);
    //await this.page.getByLabel("Purchase Date").fill("2026-03-15");
    //await this.page.getByLabel("Month").selectOption("March");
    await this.page.getByLabel("Remarks").fill("Automation item");
    await this.page.getByRole("button",{name:"Submit"}).click();
  }

  async addItemMandatory(itemName: string, amount: string) {

    await this.openAddItem();
    await this.page.getByLabel("Item Name").fill(itemName);
    await this.page.getByLabel("Amount").fill(amount);
    await this.page.getByRole("button",{name:"Submit"}).click();
  }

  async getItemCount() {
    return this.page.locator("tbody tr").count();
  }

}