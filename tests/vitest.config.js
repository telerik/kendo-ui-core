import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright'
import path from 'path';

const ciLaunchOptions = process.platform === 'linux' && process.env.CI ? {
    launchOptions: {
        ignoreDefaultArgs: [
            '--disable-dev-shm-usage',
        ]
    },
} : undefined;

export default defineConfig({
    test: {
        include: ['unit/**/*.js'],
        reporters: ['default', 'json'],
        outputFile: './test-output.json',
        globals: true,
        setupFiles: './setupTests.js',
        watch: false,
        testTimeout: 5000,
        bail: 100,
        retry: 1,
        alias: [{
            find: '@progress/kendo-ui/src',
            replacement: path.resolve(__dirname, '../src')

        }],
        browser: {
            screenshotFailures: false,
            provider: playwright(ciLaunchOptions),
            enabled: true,
            instances: [
                {
                    browser: "chromium"
                }
            ],
            headless: true,
            viewport: {
                width: 1920,
                height: 1080
            }
        },
    }
});