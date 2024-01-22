// rollup.config.mjs
import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

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
        include: ["src/core/**/*"],
      }),
    ],
    external: ["react", "react-dom", "posthog-js"],
  },
  {
    input: "src/vite/index.ts",
    output: {
      dir: "dist/vite",
      format: "es",
    },
    plugins: [
      typescript({ outDir: "dist/vite", include: ["src/vite/**/*"] }),
      nodeResolve(),
    ],
    external: ["react", "react-dom", "vite-plugin-posthog"],
  },
  // Add configurations for other frameworks as needed
]);

export default config;
