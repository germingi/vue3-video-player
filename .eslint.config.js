export default [
  {
    root: true,
    extends: [
      "eslint:recommended",
      "plugin:vue/vue3-recommended",
      "@vue/eslint-config-typescript/recommended",
      "@vue/eslint-config-prettier/skip-formatting",
    ],
    parserOptions: {
      ecmaVersion: "latest",
    },
    ignorePatterns: ["dist/*", "node_modules/*"],
    rules: {
      "@typescript-eslint/init-declarations": "error",

      "comma-dangle": ["error", "always-multiline"],
      "prefer-template": "error",
    },
  },
];
