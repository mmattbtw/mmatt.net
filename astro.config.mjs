import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import prefetch from "@astrojs/prefetch";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    prefetch({
      throttle: 10,
    }),
    image(),
  ],
});
