// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const react = require("eslint-plugin-react");
// Note: eslint-plugin-react-native v4.1.0 has compatibility issues with ESLint 9
// const reactNative = require("eslint-plugin-react-native");
const prettier = require("eslint-config-prettier");

module.exports = tseslint.config(
  // Global ignores
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.turbo/**",
      "**/coverage/**",
      "**/*.d.ts",
      "**/android/**",
      "**/ios/**",
      "**/macos/**",
      "**/windows/**",
      "**/.next/**",
      "**/out/**",
    ],
  },

  // Base config for all JavaScript files
  {
    files: ["**/*.js", "**/*.jsx"],
    extends: [eslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        __DEV__: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "writable",
        require: "readonly",
        exports: "writable",
        global: "readonly",
      },
    },
  },

  // TypeScript files configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    plugins: {
      react,
      // react-native plugin disabled until ESLint 9 support is added
      // "react-native": reactNative,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        __DEV__: "readonly",
        console: "readonly",
        fetch: "readonly",
        FormData: "readonly",
        Headers: "readonly",
        Request: "readonly",
        Response: "readonly",
        XMLHttpRequest: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React rules
      "react/react-in-jsx-scope": "off", // Not needed in React 19
      "react/prop-types": "off", // Using TypeScript

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      // React Native rules - disabled until plugin supports ESLint 9
      // "react-native/no-inline-styles": "warn",
      // "react-native/no-unused-styles": "warn",
    },
  },

  // Prettier config (must be last to override other configs)
  prettier
);
