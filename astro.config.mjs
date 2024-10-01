import react from '@astrojs/react'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap'

export default defineConfig({
  image: {
    domains: ['manas-novel.assets.newt.so', 'novel.manasas.dev'],
  },
  site: 'https://novel.manasas.dev',
  integrations: [react(), icon(), sitemap()],
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
})
