import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";

const config = defineConfig([
  {
    input: "src/core/index.ts",
    output: {
      dir: "dist/core",
      format: "es",
    },
    plugins: [
      typescript({
        outDir: "dist/core",
        include: ["src/core/**/*", "src/shared/**/*", "src/utils/**/*"],
      }),
      nodeResolve(),
      cjs(),
    ],
    external: ["react", "react-dom", "posthog-js", "vite-plugin-posthog"],
  },
  {
    input: "src/vite/index.ts",
    output: {
      dir: "dist/vite",
      format: "es",
    },
    plugins: [
      typescript({
        outDir: "dist/vite",
        include: ["src/vite/**/*", "src/shared/**/*", "src/utils/**/*"],
      }),
      cjs(),
      nodeResolve(),
    ],
    external: ["react", "react-dom", "vite-plugin-posthog"],
  },
]);

export default config;
