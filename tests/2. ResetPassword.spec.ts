import { test, expect } from "@playwright/test";
import { ResetPassword } from "../pages/ResetPasswordPage.pom.ts";
import { getLastUser } from "../utils/utils.ts";
import { updatePassword } from "../utils/utils.ts";
import { readLatestRegistrationEmail } from "../services/email.service.ts";

test.describe.serial("Reset Password Flow", () => {

  const user = getLastUser("./resources/users.json");
  const newPassword = "Test@12345";

test("Negative Test - Empty Email", async ({ page }) => {

  const reset = new ResetPassword(page);
  await reset.openResetPage();
  const emailField = page.getByRole("textbox", { name: "Email" });
  await page.getByRole("button", { name: "Send Reset Link" }).click();

  const isInvalid = await emailField.evaluate((el: HTMLInputElement) => !el.checkValidity());
  expect(isInvalid).toBeTruthy();

});


  test("Negative Test - Invalid Email", async ({ page }) => {

    const reset = new ResetPassword(page);

    await reset.openResetPage();

    await reset.sendResetLink("invalidemail@gmail.com");

    await expect(page.getByText("Your email is not registered")).toBeVisible();
  });


  test("Send Reset Link", async ({ page }) => {

    const reset = new ResetPassword(page);

    await reset.openResetPage();

    await reset.sendResetLink(user.email);

    await expect(page.getByText("Password reset link sent to your email")).toBeVisible();
  });


 test("Set New Password From Reset Link", async ({ page }) => {
  // 1️⃣ Polling loop: email wait করা
  let emailBody;
 for (let i = 0; i < 8; i++) { // বার check
  emailBody = await readLatestRegistrationEmail();

  if (emailBody && emailBody.includes("Click on the following link to reset your password")) {
    break; // Reset email পাওয়া গেলে stop
  }
  await page.waitForTimeout(6000); // 5s wait
 }

 if (!emailBody) {
   throw new Error("Reset email not received");
 }

 // reset link extract
 const resetLinkMatch = emailBody.match(/https:\/\/dailyfinance\.roadtocareer\.net\/reset-password\?token=[a-z0-9]+/);

 if (!resetLinkMatch) {
  throw new Error("Reset link not found in email");
 }

 const resetLink = resetLinkMatch[0];

 await page.goto(resetLink);
 const reset = new ResetPassword(page);
 await reset.setNewPassword(newPassword);

// ✅ Update users.json with new password
updatePassword(user.email, newPassword);

 await expect(page.getByText(/Password reset successfully/i)).toBeVisible();
 });


  test.skip("Login With New Password", async ({ page }) => {

    await page.goto("https://dailyfinance.roadtocareer.net/login");

    await page.getByRole("textbox", { name: "Email" }).fill(user.email);
    await page.getByLabel("Password").fill(newPassword);

    await page.getByRole("button", { name: "LOGIN" }).click();

    await expect(page).toHaveURL(/user/);

  });

});