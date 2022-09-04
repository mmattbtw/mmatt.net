import image from "@astrojs/image";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://mmatt.net",
  integrations: [tailwind(), prefetch({
    throttle: 10
  }), image(), sitemap(), preact()]
});