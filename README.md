# Hudl Test Automation Take Home Project

This repository contains a sample selection of E2E UI tests for verifying the login page for the main Hudl web application with a focus on logging in, account creation and social media authentication workflows. This suite is built on top of [Playwright](https://playwright.dev)(Typescript) by employing the Page Object Model (POM) design pattern for maintainability, robustness and scalability.


## Table of Contents

- [Project Structure](#project-structure)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Environment Variables](#environment-variables)
- [Test Automation Design](#test-automation-design)




## Project Structure

```
.
├── fixtures/           # Custom Playwright fixtures
├── pages/              # Page Object Models (POMs)
├── selectors/          # Centralized selectors for UI elements
├── tests/e2e/          # E2E test cases
├── utils/              # Utilities (environment variable config)
├── .env-template       # Template environment variables definition file
├── package.json
└── README.md
```




## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/Michael-Prescott/michael_prescott_hudl_take_home.git
    cd michael_prescott_hudl_take_home
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Configure login credentials:
    - Create a copy of the `.env-template` file in the same level of the base directory
    - Rename the copied file to `.env`
    - Open `.env` and replace `INSERT_VALID_USERNAME_HERE` with a valid login email
    - Replace `INSERT_VALID_PASSWORD_HERE` with a valid password




## Running Tests

- Run all tests:
    ```sh
    npx playwright test
    ```

- Run a specific test file:
    ```sh
    npx playwright test tests/e2e/login.spec.ts
    ```

- View test results through HTML:
    ```sh
    npx playwright show-report
    ```




## Environment Variables

Sensitive data (like usernames and passwords) is loaded from the created `.env` file via [dotenv](https://www.npmjs.com/package/dotenv)

- USERNAME: Valid login email for Hudl
- PASSWORD: Valid login password for the above USERNAME




## Test Automation Design

- Page Object Model:
    * All page interactions are encapsulated within page objects in the `pages/` directory for maintainability.

- UI Selectors:
    * All UI selectors are contained within the `selectors/` directory for proper abstraction from the page objects.

- Fixtures:
    * Reusable fixtures are defined within the `fixtures/test-fixtures.ts` file for consistent test setup.

- Test Coverage:
    * This test automation suite covers:
        - Valid and invalid login attempts
        - Missing/invalid field validation
        - Account creation field validation
        - Social media login workflows