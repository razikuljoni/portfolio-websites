import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";
// eslint.config.js
import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";
import globals from "globals";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        plugins: {
            reactYouMightNotNeedAnEffect,
        },
        rules: {
            "reactYouMightNotNeedAnEffect/no-derived-state": "warn",
            "reactYouMightNotNeedAnEffect/no-chain-state-updates": "warn",
            "reactYouMightNotNeedAnEffect/no-event-handler": "warn",
            "reactYouMightNotNeedAnEffect/no-adjust-state-on-prop-change": "warn",
            "reactYouMightNotNeedAnEffect/no-reset-all-state-on-prop-change": "warn",
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
    globalIgnores([
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
        ".agent/**",
        ".agents/**",
        ".claude/**",
        ".cline/**",
        ".codex/**",
        ".continue/**",
        ".cursor/**",
        ".gemini/**",
        ".omo/**",
        ".opencode/**",
        ".pi/**",
        ".qwen/**",
        ".sisyphus/**",
        ".trae/**",
        ".windsurf/**",
        ".github/**",
        "openspec/**",
        "graphify-out/**",
        "goals/**",
        "venv/**",
        "node_modules/**",
    ]),
]);

export default eslintConfig;
