import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        include: ['tests/**/*.js'],
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
            provider: 'playwright',
            enabled: true,
            name: 'chromium', // browser name is required
            headless: true,
            viewport: {
                width: 1920,
                height: 1080
            }
        },
    }
});