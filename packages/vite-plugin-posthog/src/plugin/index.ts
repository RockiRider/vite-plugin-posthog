import { HtmlTagDescriptor, Plugin } from "vite";
import { VitePostHogOptions } from "../types.js";
import { constructScript } from "./construct.js";

/**
 * TODO: Add description
 * @param options
 * @returns
 */
export function VitePostHog(options: VitePostHogOptions): Plugin {
  const { apiKey, hostUrl, isDevModeOn, config } = options;

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
          apiKey,
          hostUrl,
          isDevModeOn ?? false,
          config ?? {}
        ),
      };
      return [injectedTag];
    },
  };
}
