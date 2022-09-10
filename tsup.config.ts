import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    buildr: "src/index.ts",
  },
  noExternal: ["execa"],
  format: ["cjs"],
});
