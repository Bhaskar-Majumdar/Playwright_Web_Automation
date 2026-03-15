import { test, expect } from '@playwright/test';

test.skip('TC#01: User can register successfully', async ({ page }) => {

  await page.goto('/');

  await expect(
    page.getByRole("heading", { name: "Welcome to daily finance" })
    ).toBeVisible();

  await page.goto('/register');

   await expect(
    page.getByRole("heading", { name: "Register" })
    ).toBeVisible();

//   const firstNameTxt = page.locator('#firstName');
//   const lastNameTxt = page.locator('#lastName');
//   const emailTxt = page.locator('#email');


//   await firstNameTxt.fill("Bhaskar");
//   await lastNameTxt.fill("Majumdar");
//   await emailTxt.fill("bhaskar.majumdar@brotecs.com");

await page.getByRole("textbox", {name: "First Name"}).fill("Bhaskar");
await page.getByRole("textbox", {name: "Last Name"}).fill("Majumdar");
await page.getByRole("textbox", {name: "Email"}).fill("bhaskar+12@gmail.com");
await page.getByRole("textbox", {name: "Password"}).fill("1234");
await page.getByRole("textbox", {name: "Phone Number"}).fill("0152304");
await page.getByRole("textbox", {name: "Address"}).fill("Dhaka, Bangladesh");

await page.locator('input[name="gender"]').first().check();
await page.locator('input[type="checkbox"]').first().check();

await page.getByRole("button", {name: "REGISTER"}).click();

await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();


  await page.pause ()

});

function getByRole(arg0: string, arg1: { name: string; }) {
  throw new Error('Function not implemented.');
}
