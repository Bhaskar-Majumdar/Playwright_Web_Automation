import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegistrationPage.pom.ts';
import { faker } from '@faker-js/faker';
import { UserModel } from '../models/usermodel.ts';
import { generateRandomNumber, saveJsonData } from '../utils/utils.ts';
import { readLatestRegistrationEmail } from "../services/email.service.ts";
import { content } from 'googleapis/build/src/apis/content/index.ts';

test("Register as a new user", async ({ page }) => {
  await page.goto("https://dailyfinance.roadtocareer.net/");
  await page.getByRole("link",{name:"Register"}).click();

  const register = new RegisterPage(page);

  const userModel:UserModel = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email:`majumdar97b+${generateRandomNumber(1000,9999)}@gmail.com`,
    password:"1234",
    phoneNumber:`01${generateRandomNumber(300000000,999999999)}`,
    address:faker.location.streetAddress()
    }

  await register.userRegister(userModel);

  saveJsonData(userModel,'./resources/users.json');

  let latestEmail = await readLatestRegistrationEmail();

  if (!latestEmail) {
    throw new Error("No email received!");
  }

  // latestEmail will be non-null
  latestEmail = latestEmail.replace("&#39;", "'");

  await page.waitForTimeout(6000);
    
  expect(latestEmail).toContain("Welcome to our platform");


});