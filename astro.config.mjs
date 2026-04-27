import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

import mdx from '@astrojs/mdx';

export default defineConfig({
  image: {
    domains: ['novel.manasas.dev'],
  },
  site: 'https://novel.manasas.dev',
  integrations: [icon(), sitemap(), mdx()],
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