import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import createRobotsTxtIntegration from "astro-robots-txt";
import { defineConfig } from "astro/config";

// https://astro.build/config
import vercel from "@astrojs/vercel/edge";

// https://astro.build/config
export default defineConfig({
  site: "https://mmatt.net",
  experimental: {
    integrations: true,
  },
  output: "server",
  adapter: vercel(),
  integrations: [tailwind(), sitemap(), createRobotsTxtIntegration()],
});
