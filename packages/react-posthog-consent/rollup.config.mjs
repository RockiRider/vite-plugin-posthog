import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";

const config = defineConfig([
  {
    input: {
      "core/index": "src/core/index.ts",
      "vite/index": "src/vite/index.ts",
    },
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [
      typescript({
        outDir: "dist",
        include: ["src/**/*"],
        declaration: true,
      }),
      nodeResolve(),
      cjs(),
    ],
    external: [
      "react",
      "react-dom",
      "posthog-js",
      "vite-plugin-posthog",
      "react/jsx-runtime",
    ],
  },
  // {
  //   input: "src/vite/index.ts",
  //   output: {
  //     dir: "dist/vite",
  //     format: "es",
  //   },
  //   plugins: [
  //     typescript({
  //       outDir: "dist/vite",
  //       include: [
  //         "src/vite/**/*",
  //         "src/shared/**/*",
  //         "src/utils/**/*",
  //         "src/types.ts",
  //       ],
  //     }),
  //     cjs(),
  //     nodeResolve(),
  //   ],
  //   external: ["react", "react-dom", "vite-plugin-posthog"],
  // },
]);

export default config;
