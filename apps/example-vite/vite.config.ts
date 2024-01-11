import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePostHog from "vite-plugin-posthog";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePostHog()],
});
