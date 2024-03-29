import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import createRobotsTxtIntegration from "astro-robots-txt";
import { defineConfig } from "astro/config";

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://mmatt.net",
  output: "hybrid",
  adapter: vercel({
    webAnalytics: true,
    functionPerRoute: false,
  }),
  integrations: [tailwind(), sitemap(), createRobotsTxtIntegration()],
});
