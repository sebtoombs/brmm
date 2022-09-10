/// <reference types="vitest" />
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // globalSetup: ["./test/setup.js"],
    include: ["e2e/**/*.test.js"],
  },
});
