/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],

    // Import order rules
    "import/order": [
      "error",
      {
        groups: [
          "builtin", // Built-in modules (e.g., fs, path)
          "external", // External modules (e.g., react, lodash)
          "internal", // Internal modules
          ["parent", "sibling", "index"], // Parent, sibling, and index imports
        ],
        "newlines-between": "always", // Newline between groups
        alphabetize: {
          order: "asc", // Sort in ascending order
          caseInsensitive: true, // Ignore case when sorting
        },
      },
    ],
  },
};
module.exports = config;
