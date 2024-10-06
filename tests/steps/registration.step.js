const { expect } = require("@playwright/test");
const { Given, When, Then } = require("@cucumber/cucumber");
const RegistrationPage = require("../pages/registrationPage.js");
const testData = require("../data/testData.json");
const { username, password, confirmPassword } = testData.validData;
const { shortPassword, weakPassword, mediumPassword, strongPassword } = testData.password;



Given('the user is on the registration page', async function () {
    this.page = await this.browser.newPage();
    this.registrationPage = new RegistrationPage(this.page);
    await this.page.goto('https://etherscan.io/register');
});

When('the user fills all fields with valid data', async function () {
    const randomEmail = this.registrationPage.generateRandomEmail();
    await this.registrationPage.fillRegistrationForm(username, randomEmail, randomEmail, password, confirmPassword, true);
});

// When('the test pauses for CAPTCHA resolution', async function () {
//     console.log("Please solve the CAPTCHA manually...");
//     await this.page.pause();  //Didn't help with CAPTCHA
// });

When('submits the registration form', async function () {
    console.log("Hello from the")
    await this.registrationPage.submitForm();
});

Then('the user should see a message to verify their email', async function () {
    const alertMessage = await this.page.innerText(".alert.alert-info");
    expect(alertMessage).to.include("Your account registration has been submitted and is");
});

When('the user leaves all fields empty', async function () {
    await this.registrationPage.fillRegistrationForm("", "", "", "", "", false);
})

Then('the user should see error messages for empty fields', async function () {
    await this.page.waitForSelector(this.registrationPage.selectors.emptyUsernameErr, { timeout: 7000 });
    const usernameErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.emptyUsernameErr);
    expect(usernameErrorMessage).toContain("Please enter Username.");

    await this.page.waitForSelector(this.registrationPage.selectors.emptyEmailErr, { timeout: 7000 });
    const emailErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.emptyEmailErr);
    expect(emailErrorMessage).toContain("Please enter a valid email address.");

    await this.page.waitForSelector(this.registrationPage.selectors.emptyEmailConfirmErr, { timeout: 7000 });
    const confirmEmailErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.emptyEmailConfirmErr);
    expect(confirmEmailErrorMessage).toContain("Please re-enter your email address.");

    await this.page.waitForSelector(this.registrationPage.selectors.emptyPassErr, { timeout: 7000 });
    const passwordErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.emptyPassErr);
    expect(passwordErrorMessage).toContain("Please enter Password.");

    await this.page.waitForSelector(this.registrationPage.selectors.emptyConfirmPassErr, { timeout: 7000 });
    const confirmPasswordErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.emptyConfirmPassErr);
    expect(confirmPasswordErrorMessage).toContain("Your password must be at least 8 characters long.");

    await this.page.waitForSelector(this.registrationPage.selectors.termsAndCondsUnchecked, { timeout: 7000 });
    const termsErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.termsAndCondsUnchecked);
    expect(termsErrorMessage).toContain("Please accept our Terms and Conditions.");
});

When('the user leaves the email field empty', async function () {
    const randomEmail = this.registrationPage.generateRandomEmail();
    await this.registrationPage.fillRegistrationForm(username, "", randomEmail, password, confirmPassword, true);
});

Then('the user should see an error messages for email & confirm email fields', async function () {
    const emailErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.emptyEmailErr);
    expect(emailErrorMessage).toContain("Please enter a valid email address.");

    const confirmEmailErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.emptyEmailConfirmErr);
    expect(confirmEmailErrorMessage).toContain("Email address does not match.");
})


When('the user leaves the confirm email field empty', async function () {
    const randomEmail = this.registrationPage.generateRandomEmail();
    await this.registrationPage.fillRegistrationForm(username, randomEmail, "", password, confirmPassword, true);
})

Then('the user should see an error message for the empty email field', async function () {
    const confirmEmailErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.emptyEmailConfirmErr);
    expect(confirmEmailErrorMessage).toContain("Please re-enter your email address.");
})

When('the user leaves the password field empty', async function () {
    const randomEmail = this.registrationPage.generateRandomEmail();
    await this.registrationPage.fillRegistrationForm(username, randomEmail, randomEmail, "", confirmPassword, true);
})
Then('the user should see an error message for the empty password field', async function () {
    const passwordErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.emptyPassErr);
    expect(passwordErrorMessage).toContain("Please enter Password.");

    const confirmPasswordErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.emptyConfirmPassErr);
    expect(confirmPasswordErrorMessage).toContain("Password does not match, please check again.");

})

When('the user leaves the confirm password field empty', async function () {
    const randomEmail = this.registrationPage.generateRandomEmail();
    await this.registrationPage.fillRegistrationForm(username, randomEmail, randomEmail, password, "", true);
})

Then('the user should see an error message for the empty confirm password field', async function () {
    const confirmPasswordErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.emptyConfirmPassErr);
    expect(confirmPasswordErrorMessage).toContain("Your password must be at least 8 characters long.");
})


When('the user enters each invalid email in an invalid format', async function () {
    for (const invalidEmail of testData.invalidEmailData) {
        console.log(`Testing invalid email: ${invalidEmail}`);
        await this.registrationPage.page.fill(this.registrationPage.selectors.email, invalidEmail);

        await this.registrationPage.page.press(this.registrationPage.selectors.email, 'Enter');

        try {
            await this.registrationPage.page.waitForSelector(this.registrationPage.selectors.emptyEmailErr, { visible: true, timeout: 5000 });
            const emailErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.emptyEmailErr);
            this.errorMessages.push(emailErrorMessage);
        } catch (error) {
            console.error(`Greška nije pronađena za email: ${invalidEmail}`);
            this.errorMessages.push("Greška nije prikazana.");
        }

        await this.registrationPage.page.fill(this.registrationPage.selectors.email, '');
    }
});

Then('the user should see an error message for invalid email format', function () {

    const expectedErrorMessage = "Please enter a valid email address.";
    this.errorMessages.forEach((errorMessage) => {
        expect(errorMessage).toBe(expectedErrorMessage);
    });
});


When('the user enters a password that is too short', async function () {

    await this.registrationPage.page.fill(this.registrationPage.selectors.password, shortPassword);
    await this.registrationPage.page.press(this.registrationPage.selectors.password, 'Enter');
})

Then('the user should see an error message for short password', async function () {

    const expectedErrorMessage = "Your password must be at least 8 characters long.";

    await this.registrationPage.page.waitForSelector(this.registrationPage.selectors.emptyPassErr, { visible: true });

    const actualErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.emptyPassErr);

    expect(actualErrorMessage).toContain(expectedErrorMessage);
})
When('the user enters a weak password', async function () {

    await this.registrationPage.page.fill(this.registrationPage.selectors.password, weakPassword);
    await this.registrationPage.page.keyboard.press('PageDown');

});

Then('the user should see a label for weak password', async function () {
    const expectedWeakLabel = "Weak!";
    await this.registrationPage.page.waitForSelector(this.registrationPage.selectors.progressLabel, { visible: true });
    const actualWeakLabel = await this.registrationPage.page.textContent(this.registrationPage.selectors.progressLabel);
    expect(actualWeakLabel).toContain(expectedWeakLabel);
});

When('the user enters a medium password', async function () {
    await this.registrationPage.page.fill(this.registrationPage.selectors.password, mediumPassword);
    await this.registrationPage.page.keyboard.press('PageDown');
});

Then('the user should see a label for medium password', async function () {
    const expectedMediumLabel = "Medium!";
    await this.registrationPage.page.waitForSelector(this.registrationPage.selectors.progressLabel, { visible: true });

    const actualMediumLabel = await this.registrationPage.page.textContent(this.registrationPage.selectors.progressLabel);
    expect(actualMediumLabel).toContain(expectedMediumLabel);
});


When('the user enters a strong password', async function () {

    await this.registrationPage.page.fill(this.registrationPage.selectors.password, strongPassword);
    await this.registrationPage.page.keyboard.press('PageDown');

});

Then('the user should see a label for strong password', async function () {
    const expectedMediumLabel = "Strong!";
    await this.registrationPage.page.waitForSelector(this.registrationPage.selectors.progressLabel, { visible: true });

    const actualMediumLabel = await this.registrationPage.page.textContent(this.registrationPage.selectors.progressLabel);

    expect(actualMediumLabel).toContain(expectedMediumLabel);

});


When('the user enters a password and a different confirm password', async function() {
    await this.registrationPage.page.fill(this.registrationPage.selectors.password, strongPassword);
    await this.registrationPage.page.fill(this.registrationPage.selectors.confirmPassword, weakPassword);
    await this.registrationPage.page.keyboard.press('PageDown');
  
})

Then('the user should see an error message for mismatched passwords', async function() {
    const expectedErrorMessage = "Password does not match, please check again.";

    await this.registrationPage.page.waitForSelector(this.registrationPage.selectors.emptyConfirmPassErr, { visible: true });

    const actualErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.emptyConfirmPassErr);

    expect(actualErrorMessage).toContain(expectedErrorMessage);
})

When('the user fills all fields but does not accept the terms and conditions', async function() {
    const randomEmail = this.registrationPage.generateRandomEmail();
    await this.registrationPage.fillRegistrationForm(username, randomEmail, randomEmail, password, confirmPassword, false);
})

Then('the user should see an error message for not accepting the terms and conditions', async function () {
    const expectedErrorMessage = "Please accept our Terms and Conditions.";

    await this.registrationPage.page.waitForSelector(this.registrationPage.selectors.termsAndCondsUnchecked, { visible: true });

    const actualErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.termsAndCondsUnchecked);

    expect(actualErrorMessage).toContain(expectedErrorMessage);
});

// When('the user enters a username that is already registered', async function() {
//     const randomEmail = this.registrationPage.generateRandomEmail();
//     const registeredUsername = 'lea90'; 
//     await this.registrationPage.fillRegistrationForm(registeredUsername, randomEmail, randomEmail, password, confirmPassword, true);
// })

// Then('the user should see an error message for already registered username', async function() {
//     const expectedErrorMessage = "Sorry! The username you entered is already in use.";
    
//     await this.registrationPage.page.waitForSelector(this.registrationPage.selectors.usernameExistsMessage, { visible: true });
    
//     const actualErrorMessage = await this.registrationPage.getErrorMessage(this.registrationPage.selectors.usernameExistsMessage);
    
//     expect(actualErrorMessage).toContain(expectedErrorMessage);
// });   //CAPTCHA problem
