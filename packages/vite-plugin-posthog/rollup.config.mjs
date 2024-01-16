// rollup.config.mjs
import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";

const config = defineConfig([
  {
    input: "src/core/index.ts",
    output: {
      file: "dist/index.js",
      format: "es",
    },
    plugins: [typescript()],
  },
  {
    input: "src/react/index.ts",
    output: {
      dir: "dist/react",
      preserveModules: true,
      format: "es",
    },
    plugins: [typescript()],
  },
  // Add configurations for other frameworks as needed
]);

export default config;
