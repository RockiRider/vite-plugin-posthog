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
    plugins: [typescript({ outDir: "dist/core", include: ["src/core/**/*"] })],
  },
  {
    input: "src/react/index.ts",
    output: {
      dir: "dist/react",
      format: "es",
    },
    plugins: [
      typescript({ outDir: "dist/react", include: ["src/react/**/*"] }),
      nodeResolve(),
    ],
    external: ["react", "react-dom"],
  },
  // Add configurations for other frameworks as needed
]);

export default config;
