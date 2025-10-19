// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ...playwright.configs['flat/recommended'],
        files: ['tests/**'],
        rules: {
            // https://github.com/playwright-community/eslint-plugin-playwright

            "playwright/expect-expect": 'error',
            "playwright/no-useless-await": 'error',
            "playwright/missing-playwright-await": 'error',
            "playwright/prefer-locator": "error",
            "playwright/valid-expect-in-promise": 'error',
            "playwright/valid-expect": 'error',

            "playwright/prefer-native-locators": 'warn',
            "playwright/prefer-strict-equal": 'warn',
            "playwright/prefer-to-be": 'warn',
            "playwright/prefer-to-contain": 'warn',
            "playwright/prefer-to-have-count": 'warn',
            "playwright/prefer-to-have-length": 'warn',
            "playwright/prefer-web-first-assertions": 'warn',
            "playwright/valid-title": 'warn'
        },
    },
    {
        languageOptions: {
            parserOptions: {

                project: true,
                tsconfigRootDir: __dirname,
            },
        },

        rules: {
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/await-thenable": "error",
        },
    }
);