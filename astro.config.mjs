import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

import mdx from '@astrojs/mdx'
import rehypeExternalLinks from 'rehype-external-links'

export default defineConfig({
  image: {
    domains: ['novel.manasas.dev'],
  },
  site: 'https://novel.manasas.dev',
  integrations: [
    icon(),
    sitemap(),
    mdx({
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            target: '_blank',
            rel: ['noopener', 'noreferrer'],
            test: (url) => {
              try {
                const u = new URL(url, 'https://novel.manasas.dev')
                return (
                  u.hostname !== 'novel.manasas.dev' &&
                  u.hostname !== 'localhost' &&
                  u.hostname !== '127.0.0.1'
                )
              } catch {
                return false
              }
            },
          },
        ],
      ],
    }),
  ],
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
