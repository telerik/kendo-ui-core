import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright'
import path from 'path';

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
            provider: playwright(),
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
        launchOptions: process.platform === 'linux' && process.env.CI ? {
            executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
        } : {},
    }
});