import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
    testDir: './tests',

    fullyParallel: true,

    retries: 2,

    workers: 2,

    reporter: 'html',

    use: {
        baseURL: 'https://www.saucedemo.com',
        testIdAttribute: 'data-test',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },

    expect: { timeout: 5000 },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 },
            },
        },

    ],
});
