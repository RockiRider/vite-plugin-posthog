import { HtmlTagDescriptor, Plugin } from "vite";

export default function myPlugin(options?: MyPluginOptions): Plugin {
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
