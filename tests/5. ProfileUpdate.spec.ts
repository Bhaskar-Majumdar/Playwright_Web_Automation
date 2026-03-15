import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../pages/LoginPage.pom.ts";
import { ProfilePage } from "../pages/ProfilePage.pom.ts";
import { getLastUser } from "../utils/utils.ts";

test("Update user gmail from profile", async ({ page }) => {

  const user = getLastUser("./resources/users.json");

  if (!user) {
    throw new Error("User not found");
  }

  const loginPage = new LoginPage(page);
  const profilePage = new ProfilePage(page);

  // login
  await page.goto("https://dailyfinance.roadtocareer.net/login");

  await loginPage.userLogin(user.email, user.password);

  await expect(page).toHaveURL(/user/);

  // open profile
  await profilePage.openProfile();

  // generate new email
  const newEmail = faker.internet.email();
  console.log("New Email Generated:", newEmail);

  // update email
  await profilePage.updateEmail(newEmail);

  // assertion
  await profilePage.verifyEmailUpdated(newEmail);

   // logout
  await profilePage.logout();

  // -------- LOGIN WITH NEW EMAIL --------

  await loginPage.userLogin(newEmail, user.password);
  console.log("Login using updated email:", newEmail);

  await expect(page).toHaveURL(/user/);

  // logout again
  await profilePage.logout();

  // -------- LOGIN WITH OLD EMAIL --------

  await loginPage.userLogin(user.email, user.password);
  console.log("Trying login with old email:", user.email);

  await expect(page.getByText(/invalid email or password/i)).toBeVisible();

});