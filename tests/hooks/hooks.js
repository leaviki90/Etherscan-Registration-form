const { Before, After } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');

// Hook that runs before each scenario
Before(async function (scenario) {
    // Get all tags associated with the scenario
    const tags = scenario.pickle.tags;
    let browserType = '@chrome'; // Default to Chrome

    // Check if there are any tags
    if (tags.length > 0) {
        // If tags exist, check for specific browser tags
        for (const tag of tags) {
            if (tag.name === '@firefox') {
                browserType = '@firefox';
                break;
            } else if (tag.name === '@safari') {
                browserType = '@safari';
                break;
            } else if (tag.name === '@edge') {
                browserType = '@edge';
                break;
            } else if (tag.name === '@chrome') {
                browserType = '@chrome';
                break;
            }
        }
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
        throw new Error('Unsupported browser'); // Unsupported browser tag
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
    if (this.page) {
        await this.page.close(); // Closes the current page
    }
    if (this.context) {
        await this.context.close(); // Closes the browser context
    }
    if (this.browser) {
        await this.browser.close(); // Closes the browser
    }
});
