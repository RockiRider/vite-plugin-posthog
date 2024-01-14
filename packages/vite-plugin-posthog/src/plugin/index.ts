import { HtmlTagDescriptor, Plugin } from "vite";
import { VitePostHogOptions } from "../types.js";
import { constructScript } from "./construct.js";

/**
 *
 * @param options
 * @returns
 */
export function VitePostHog(options: VitePostHogOptions): Plugin {
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
        children: constructScript(
          options.apiKey,
          options.hostUrl,
          options.isDevModeOn ?? false,
          options.config ?? {}
        ),
      };
      return [injectedTag];
    },
  };
}
