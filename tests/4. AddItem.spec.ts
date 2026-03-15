import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../pages/LoginPage.pom.ts";
import { ItemPage } from "../pages/AddItemPage.pom.ts";
import { getLastUser } from "../utils/utils.ts";

test("Add random 2 items and verify list", async ({ page }) => {

  const user = getLastUser("./resources/users.json");

  const loginPage = new LoginPage(page);
  const itemPage = new ItemPage(page);

  await page.goto("https://dailyfinance.roadtocareer.net/login");

  await loginPage.userLogin(user.email, user.password);

  await expect(page).toHaveURL(/user/);

  const item1 = faker.commerce.productName();
  const item2 = faker.commerce.productName();

  // add item with all fields
  await itemPage.addItemAllFields(item1,"500");

  // add item with mandatory fields
  await itemPage.addItemMandatory(item2,"200");

  // assert table items
  const itemCount = await itemPage.getItemCount();

  expect(itemCount).toBeGreaterThanOrEqual(2);

});