const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

// Hook that runs before each scenario
Before(async function () {
    this.browser = await chromium.launch({ headless: false }); // Launches the browser in non-headless mode
    this.context = await this.browser.newContext(); // Creates a new browser context (isolated session)
    this.page = await this.context.newPage(); // Opens a new page in the context
    this.errorMessages = []; // Initializes an empty array to store error messages
});

// Hook that runs after each scenario
After(async function () {
    await this.page.close(); // Closes the current page
    await this.context.close(); // Closes the browser context
    await this.browser.close(); // Closes the browser
});
