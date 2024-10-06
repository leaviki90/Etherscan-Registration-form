class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.selectors = {
            username: "#ContentPlaceHolder1_txtUserName", // Username input
            email: "#ContentPlaceHolder1_txtEmail", // Email input
            confirmEmail: "#ContentPlaceHolder1_txtConfirmEmail", // Confirm email input
            password: "#ContentPlaceHolder1_txtPassword", // Password input
            confirmPassword: "#ContentPlaceHolder1_txtPassword2", // Confirm password input
            createAccBtn: "#ContentPlaceHolder1_btnRegister", // Create account button
            termsAndConds: "#ContentPlaceHolder1_MyCheckBox", // Terms and conditions checkbox
            emptyUsernameErr: "#ContentPlaceHolder1_txtUserName-error", // Error: empty username
            emptyEmailErr: "#ContentPlaceHolder1_txtEmail-error", // Error: empty email
            emptyEmailConfirmErr: "#ContentPlaceHolder1_txtConfirmEmail-error", // Error: empty confirm email
            emptyPassErr: "#ContentPlaceHolder1_txtPassword-error", // Error: empty password
            emptyConfirmPassErr: "#ContentPlaceHolder1_txtPassword2-error", // Error: empty confirm password
            termsAndCondsUnchecked: "div[id='ctl00$ContentPlaceHolder1$MyCheckBox-error']", // Error: terms not accepted
            progressLabel: ".progress-label", // Progress label (if applicable)
            usernameExistsMessage: ".alert-danger" //Alert message - The username you entered is already in use
        };
    }

    // Generates a random email address
    generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(2, 10);
        return `testuser_${randomString}@test.com`;
    }

    // Fills the registration form fields
    async fillRegistrationForm(username, email, confirmEmail, password, confirmPassword, isChecked) {
        await this.page.fill(this.selectors.username, username || '');

        // Handles email and confirm email logic
        if (email === "" && confirmEmail !== "") {
            confirmEmail = this.generateRandomEmail(); // Generates random email if only confirm email is provided
        } else if (confirmEmail === "" && email !== "") {
            email = this.generateRandomEmail(); // Generates random email if only email is provided
        } else if (email !== "" && confirmEmail !== "") {
            confirmEmail = email; // Ensures both emails match
        }

        // Fills the email fields if values exist
        if (email) await this.page.fill(this.selectors.email, email); 
        if (confirmEmail) await this.page.fill(this.selectors.confirmEmail, confirmEmail);

        // Fills password fields
        await this.page.fill(this.selectors.password, password || '');
        await this.page.fill(this.selectors.confirmPassword, confirmPassword || '');

        // Clicks the terms and conditions checkbox if checked
        if (isChecked) {
            await this.page.click(this.selectors.termsAndConds);
        }
    }

    // Retrieves error message for a specific field
    async getErrorMessage(selector) {
        await this.page.waitForSelector(selector, { timeout: 10000 }); // Waits up to 10 seconds for the error message
        const isVisible = await this.page.isVisible(selector);
        if (isVisible) {
            return await this.page.innerText(selector); // Returns the error message text
        } else {
            throw new Error(`Element with selector ${selector} is not visible`); // Throws error if message not visible
        }
    }

    // Submits the registration form
    async submitForm() {
        await this.page.click(this.selectors.createAccBtn); // Clicks the Create Account button
    }
}

module.exports = RegistrationPage;


