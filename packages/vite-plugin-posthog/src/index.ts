import { HtmlTagDescriptor, Plugin } from "vite";
import { VitePostHogProps } from "./types.js";

export default function VitePostHog(options?: VitePostHogProps): Plugin {
  return {
    name: "vite-plugin-posthog",
    enforce: "post",
    async transformIndexHtml() {
      const injectedTag: HtmlTagDescriptor = {
        tag: "script",
        attrs: {
          type: "text/javascript",
          src: "https://cdn.posthog.com/ph.js",
          async: true,
          defer: true,
        },
      };
      return [injectedTag];
    },
  };
}
