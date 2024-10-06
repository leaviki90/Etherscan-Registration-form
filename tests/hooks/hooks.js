const { Before, After } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');

// Hook that runs before each scenario
Before(async function (scenario) {
    // Get all tags associated with the scenario
    const tags = scenario.pickle.tags;
    let browserType = ''; // Initialize a variable to determine the browser type

    // Check if there are any tags
    if (tags.length > 0) {
        // If tags exist, use the first tag to set the browser type
        browserType = tags[0].name;
    } else {
        // Set default browser type to Chrome if no tags are provided
        browserType = '@chrome';
    }

    // Launch different browsers based on the tag provided
    if (browserType === '@chrome') {
        this.browser = await chromium.launch({ headless: false }); // Launch Chrome browser
    } else if (browserType === '@firefox') {
        this.browser = await firefox.launch({ headless: false }); // Launch Firefox browser
    } else if (browserType === '@safari') {
        this.browser = await webkit.launch({ headless: false }); // Launch Safari browser
    } else if (browserType === '@edge') {
        this.browser = await chromium.launch({ channel: 'msedge', headless: false }); // Launch Edge browser
    } else {
        // Throw an error if an unsupported browser tag is encountered
        throw new Error('Unsupported browser');
    }

    // Create a new browser context (isolated session for testing)
    this.context = await this.browser.newContext();
    // Open a new page within the created context
    this.page = await this.context.newPage();
    // Initialize an empty array to store error messages for later use
    this.errorMessages = [];
});

// Hook that runs after each scenario
After(async function () {
    await this.page.close(); // Closes the current page
    await this.context.close(); // Closes the browser context
    await this.browser.close(); // Closes the browser
});
