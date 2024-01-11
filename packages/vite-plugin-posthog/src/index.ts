import { HtmlTagDescriptor, Plugin } from "vite";
import { VitePostHogProps } from "./types.js";

export default function VitePostHog(options?: VitePostHogProps): Plugin {
  return {
    name: "vite-plugin-posthog",
    apply: "build",
    enforce: "post",
    async transformIndexHtml(html, { chunk }) {
      //   return {
      //     html: tranformedHtml,
      //     tags: InjectedHtmlTags,
      //   };
    },
  };
}
