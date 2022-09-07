module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  ignorePatterns: ["*.test.ts"],
  extends: ["airbnb/base", "airbnb-typescript/base", "prettier"],
  plugins: ["@typescript-eslint"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  rules: {},
};
