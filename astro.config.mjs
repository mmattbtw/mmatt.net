import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import createRobotsTxtIntegration from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://mmatt.net",
  experimental: {
    integrations: true,
  },
  integrations: [preact(), tailwind(), sitemap(), createRobotsTxtIntegration()],
});
