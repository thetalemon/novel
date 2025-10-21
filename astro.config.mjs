import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  image: {
    domains: ['novel.manasas.dev'],
  },
  site: 'https://novel.manasas.dev',
  integrations: [icon(), sitemap()],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
})
