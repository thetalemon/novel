import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ["manas-novel.assets.newt.so", "novel.manasas.dev"],
  },
  site: "https://novel.manasas.dev",
  integrations: [react()],
  vite: { optimizeDeps: { exclude: ["@resvg/resvg-js"] } },
});
