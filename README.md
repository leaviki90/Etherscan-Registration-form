Automation Testing Project for Etherscan Registration Form
==========================================================

Project Overview
----------------

This project focuses on automating the testing of the Etherscan registration form, leveraging the Cucumber framework for behavior-driven development (BDD) alongside Playwright for end-to-end testing. The goal is to ensure a seamless user experience by validating the registration process under various scenarios, including successful registration and handling of common errors.

Tools and Technologies Used
---------------------------

### 1\. **Playwright**

*   **Description:** A powerful browser automation library for testing web applications across different browsers (Chrome, Firefox, Safari, Edge).
    
*   **Utilization:** Used to launch browser instances, navigate to the registration page, and interact with the elements of the form. Playwright also allows for easy setup of new browser contexts to simulate different user sessions.
    

### 2\. **Cucumber**

*   **Description:** A BDD tool that allows writing tests in a human-readable format using Gherkin syntax.
    
*   **Utilization:** Cucumber helps create feature files that describe the desired behavior of the application in plain language. Scenarios for registration, error handling, and edge cases are defined, allowing for collaboration between technical and non-technical team members.
    

### 3\. **Node.js**

*   **Description:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
    
*   **Utilization:** Serves as the environment for running the testing scripts. Node.js is essential for managing dependencies and executing the test scripts written in JavaScript.
    

### 4\. **HTML and JSON Reporting**

*   **Description:** Generating reports to visualize test results.
    
*   **Utilization:** The project utilizes Cucumber to generate HTML and JSON reports, providing insights into test executions, successes, and failures, which can be crucial for tracking progress and identifying issues.
    

Test Scenarios Covered
----------------------

*   **Successful Registration:** Validating that users can register successfully when all required fields are filled with valid data, and they receive a confirmation message to verify their email.
    
*   **Error Handling for Empty Fields:** Ensuring appropriate error messages are displayed when required fields, such as username, email, and password, are left empty.
    
*   **Email Format and Password Strength Validations:** Verifying that users receive error messages when entering an invalid email format or passwords that do not meet the minimum criteria, including short and weak passwords.
    
*   **Username and Email Conflicts:** Checking the application’s response when a username or email already exists in the system, ensuring clear error messages are provided.
    
*   **Cross-Browser Testing:** Implementing tests to verify consistent functionality across multiple browsers, including Chrome, Firefox, Safari, and Edge, enhancing user accessibility.
    

# Running the Tests
-----------------

1. **Install Dependencies:**
    ```bash
    npm install
    ```

2. **Run Tests:**
    ```bash
    npm run test
    ```

3. **View Reports:**
    * The HTML and JSON reports can be found in the designated output directories.

        

Conclusion
----------

This project aims to enhance the reliability of the Etherscan registration form through comprehensive automation testing. By using Playwright and Cucumber, we ensure that critical functionalities work seamlessly across different browsers while providing clear visibility into testing outcomes through detailed reports.
