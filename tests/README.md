# Overview
The purporse of this document is to provide guidance on how to use this test framework. This project uses Playwright for its end-to-end testing.

# Tech Stack
The tests are written using [Playwright](https://playwright.dev/) & JavaScript.

# Project Structure
```
├── tests/                      # Test files organized by feature
│   └── sanity.spec.js
│
├── pageObject/                 # Page Object Model (POM) classes
│   └── pageObjects.js
│
├── utils/                      # Custom test utils and fixtures
│
├── playwright.config.ts        # Playwright global config
└── README.md
```

## Running the tests
Navigate to the folder tests/e2e and run this command: 

```
npm run test
```

This will run your tests on all browsers configured in the playwright.config.js file. Tests run in headless mode by default. 

### To run playwright with UI
```
npm run test:ui
```

# Structure
```
|- tests <dir>
|   |- e2e <dir>
|       |- individual js files
|   |- pageObjects <dir>
|       |- individual page object files
|   |- config.js
|   |- playwright.config.js
```

## e2e

This directory includes all tests to be executed. It is recommended that you encapsulate a single section of the web app into its own test file, instead of building a large file which tries to test too many things at once. 

### Run specific tests
To run a single test file, pass in the name of the test file
``` 
npm run test <landing-page.spec.js>
```

## pageObjects
This test framework makes use of the `Page` Object Model. With this model, the user can encapsulate the structure of a page and break it down by capturing element selectors in one place and create a reusable code to avoid repitition.

## playwright.config.js
This is a auto-generated file which captures all the Playwright configuration parameters for the test run.

# Recommendations for writing your own tests
