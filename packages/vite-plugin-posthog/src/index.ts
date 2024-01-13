import { HtmlTagDescriptor, Plugin } from "vite";
import { VitePostHogProps } from "./types.js";
import { getScript } from "./posthogScript.js";

export function VitePostHog(options: VitePostHogProps): Plugin {
  return {
    name: "vite-plugin-posthog",
    enforce: "post",
    async transformIndexHtml() {
      const injectedTag: HtmlTagDescriptor = {
        tag: "script",
        injectTo: "head-prepend",
        attrs: {
          type: "text/javascript",
        },
        children: getScript(options.apiKey, options.hostUrl),
      };
      return [injectedTag];
    },
  };
}
