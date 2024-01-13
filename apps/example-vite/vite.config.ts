import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePostHog } from "vite-plugin-posthog";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePostHog({
      apiKey: "phc_C5XdrwzihP7tkc0k2dhavNUfwge2eDD94BSEARcjdND",
      hostUrl: "https://eu.posthog.com",
    }),
  ],
});
