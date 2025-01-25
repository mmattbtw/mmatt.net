import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import createRobotsTxtIntegration from "astro-robots-txt";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://mmatt.net",
  output: "server",
  adapter: cloudflare(),
  integrations: [tailwind(), sitemap(), createRobotsTxtIntegration()],
});
