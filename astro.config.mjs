import icon from "astro-icon";
import { defineConfig } from "astro/config";

export default defineConfig({
  image: {
    domains: ["manas-novel.assets.newt.so", "novel.manasas.dev"],
  },
  site: "https://novel.manasas.dev",
  integrations: [icon()],
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
