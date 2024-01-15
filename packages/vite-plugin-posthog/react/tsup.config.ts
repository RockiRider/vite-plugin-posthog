import { defineConfig } from "tsup";

export default defineConfig({
  splitting: true,
  clean: true,
  dts: { resolve: true },
  minify: true,
  format: ["esm"],
  silent: true,
  entry: {
    index: "src/index.ts",
  },
  outDir: "../dist/react",
});
