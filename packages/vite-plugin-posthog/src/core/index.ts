import { HtmlTagDescriptor, Plugin } from "vite";
import { constructScript } from "./construct";
import { VitePostHogOptions, PostHogInitConfig } from "./types";

export { VitePostHogOptions, PostHog } from "./types";

/**
 * TODO: Add description
 * @param options
 * @returns
 */
export function VitePostHog(options: VitePostHogOptions): Plugin {
  const { apiKey, hostUrl, isDevModeOn, config } = options;

  const postHogConfig: PostHogInitConfig = {
    api_host: hostUrl,
    ...config,
  };

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
        children: constructScript(apiKey, isDevModeOn ?? false, postHogConfig),
      };
      return [injectedTag];
    },
  };
}
