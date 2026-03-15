import { test, expect } from "@playwright/test";
import { getLastUser } from "../utils/utils.ts";
import { LoginPage } from "../pages/LoginPage.pom.ts";

test("Login with last registered user", async ({ page }) => {

    const user = getLastUser("./resources/users.json");

    if (!user) {
        throw new Error("No registered users found! Please register first.");
    }

    // create page object
    const loginPage = new LoginPage(page);

    // open login page
    await page.goto("https://dailyfinance.roadtocareer.net/login");

    // login using POM method
    await loginPage.userLogin(user.email, user.password);

    // wait for redirect
    await page.waitForURL(/user/);

    // assertion
    expect(page.url()).toContain("/user");

    // check token
    const authToken = await page.evaluate(() => localStorage.getItem("authToken"));
    expect(authToken).not.toBeNull();
});

