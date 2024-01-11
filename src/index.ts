import { HtmlTagDescriptor, Plugin } from "vite";

export default function myPlugin(options?: MyPluginOptions): Plugin {
  return {
    name: "vite-plugin-csp-policy",
    apply: "build",
    enforce: "post",
    async transformIndexHtml(html, { chunk }) {},
  };
}
