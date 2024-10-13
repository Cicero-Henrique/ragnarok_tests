# Ragnarok Wiki Tests

This repository contains a comprehensive set of automated tests designed to validate the [RagnarokWiki website](https://www.ragnarokwiki.com.br). The primary approach involves verifying both the API calls made by the Front-End and the visual elements of the user interface, ensuring that all site functionalities operate as expected.

## Test Execution Plan

The test execution plan covers:

* API Call Validation: Tests that ensure the requests made by the Front-End return the correct data and that communication with the server is efficient and accurate.

* Visual Element Verification: Tests focused on ensuring that all user interface elements are displayed correctly and interact as expected. Mocks were used to simulate API responses, significantly optimizing test execution time.

## Automation with Cypress

All tests were implemented using the Cypress framework, which provides a powerful and intuitive tool for end-to-end test automation. This allows not only testing the behavior of the Front-End but also monitoring how it performs under different conditions. You can also run the automated tests simulating mobile screens.

## Continuous Development

As the RagnarokWiki website continues to evolve, the test execution plan will also expand. New tests will be added as new features are implemented, ensuring that the quality of the site is maintained and improved.

## Requirements

To set up and run the tests in this repository, the following requirements must be installed on your machine:

[Node.js](https://nodejs.org/en/download/package-manager)

[NPM](https://github.com/npm/cli/releases/tag/v10.8.2)

## Installation

To start using Cypress in this project, follow the steps below:

### Install Cypress

Run the following command in the terminal to install Cypress as a project dependency:

``` bash
npm install
```

### Open Cypress Launchpad

To open the graphical interface of Cypress, use the following command:

``` bash
npx cypress open
```

If you have any questions, check the official [Cypress documentation](https://docs.cypress.io/guides/getting-started/installing-cypress).

## Custom Commands

This repository includes custom commands to facilitate running tests in different scenarios:

### Open Cypress Launchpad Command

To open Cypress Launchpad with the default configuration:

``` bash
npm run cy:open
```

### Open Cypress Launchpad in Mobile Size

To simulate a mobile environment when opening Cypress Launchpad:

``` bash
npm run cy:open:mobile
```

### Run Tests in Headless Mode

To run tests in headless mode (without a graphical interface):

``` bash
npm run test
```

### Run Tests in Specific Browsers

To run tests in specific browsers, use the commands below. Ensure that the desired browser is installed on your machine.

**Chrome**:

``` bash
npm run test:chrome
```

**Electron**:

``` bash
npm run test:electron
```

**Firefox**:

``` bash
npm run test:firefox
```

### Run Tests Simulating Mobile Screens

To run tests simulating a mobile environment:

``` bash
npm run test:mobile
```

