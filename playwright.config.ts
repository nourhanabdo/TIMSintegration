import { defineConfig, devices } from '@playwright/test';
import { testPlanFilter } from "allure-playwright/dist/testplan";
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

//dotenv.config({ path: `.env.${process.env.NODE_ENV}` });



export default defineConfig({
  workers: 3,
  grep: testPlanFilter(),
  //reporter: [["line"], ["allure-playwright"]],
  reporter: [
    ["line"],
    ['dot'],
    ['json', { outputFile: 'report/test-results.json' }],
    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: "allure-results",
        suiteTitle: true,
        categories: [
          {
            name: "Outdated tests",
            messageRegex: ".*FileNotFound.*",
          },
        ],
        environmentInfo: {
          framework: "playwright",
        },
      },
    ],
  ],
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    locale: 'de-DE',              // Set the locale to German
    timezoneId: 'Europe/Berlin',
    launchOptions: {
      args: ["--start-maximized"],
    },
    headless: true,
    viewport: { width: 1920, height: 1080 },
  },

  /* Configure projects for major browsers */

  projects: [
    // {
    //   name: 'TIMSFULL',
    //   use: {
    //     baseURL: process.env.TIMSFULL_BASE_URL,
    //     browserName: 'chromium',
    //     viewport: null,

    //     screenshot: 'only-on-failure',
    //     //trace: 'retain-on-failure',
    //   },
    //   retries: 1,
    //   timeout: 90000,
    // },
    
    {
      name: 'TIMSPARTIAL',
      use: {
        baseURL: process.env.TIMSPARTIAL_BASE_URL,
        browserName: 'chromium',
        //channel: 'msedge',
        viewport: null,
        screenshot: 'only-on-failure',
      },
      timeout: 90000,
      retries: 1,
    },

    // {
    //   name: 'PREPROD',
    //   use: {
    //     baseURL: process.env.PREPROD_BASE_URL,
    //     browserName: 'firefox',
    //devices['Desktop Firefox'],
    //     channel: undefined, // Ensure this is undefined or simply remove it
    //     viewport: null,
    //     screenshot: 'only-on-failure',
    //     trace: 'retain-on-failure'
    //   },
    //   timeout: 90000
    //   // retries: 1,
    // }
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
