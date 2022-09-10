import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    brmm: "src/index.ts",
  },
  noExternal: ["execa"],
  format: ["cjs"],
});
