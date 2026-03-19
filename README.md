# Playwright Web Automation
In this project, I have automated end-to-end workflows of DailyFinance using Playwright with TypeScript, covering user registration, email verification, password reset, login validation, item management, and profile updates. The project also includes dynamic email handling and a CI/CD pipeline with GitHub Actions cronjob to run tests on a scheduled basis.

# Project Description:
1. Visit the site https://dailyfinance.roadtocareer.net/. Register a new user (e.g. gmailuser+randomdigit@gmail.com). Assert the congratulations email is received.
2. Now click on the reset password link. Write 2 negative test case and assert them.
3. Now Input valid gmail account you have registered and click on send reset link button
4. Now retrieve password reset mail from your gmail and set new password
5. Now login with the new password to ensure login successful
6. Add random 2 items (1 for all fields, another for only mandatory fields) and assert 2 items are showing on the item list
7. Now go to user profile and update user gmail with a new gmail
8. Now logout and login with the updated gmail account. Assert that using new email login is successful and using previous email login is failed.

# Technology:
Tool: Playwright
IDE: VS Code
Language: TypeScript

# How to Run the Project
Clone this project
Open cmd in the root folder.
Give the following command: npx playwright test

# Playwright Report Screenshot
<img width="994" height="821" alt="Screenshot 2026-03-20 at 12 54 46 AM" src="https://github.com/user-attachments/assets/2add4dbb-9466-4da4-8132-0dc26fff7ce7" />


# Project Video Link: 
https://drive.google.com/file/d/1piOhEkFc-qi8hB1keOMnem6oT_jn_SBE/view?usp=sharing  





