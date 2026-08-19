import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import rehypeExternalLinks from 'rehype-external-links'
import remarkGfm from 'remark-gfm'
import { unified } from '@astrojs/markdown-remark'

export default defineConfig({
  image: {
    domains: ['novel.manasas.dev'],
  },
  site: 'https://novel.manasas.dev',
  integrations: [icon(), sitemap(), mdx()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkGfm],
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
  },
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
