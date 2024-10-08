import {
  mySiteDefaultDescription,
  mySiteName,
  myUrl,
} from '@/constants/constants'
import { getHistoryList } from '@/lib/newt/notify'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const posts = await getHistoryList()
  const baseUrl = myUrl
  return rss({
    title: mySiteName,
    description: mySiteDefaultDescription,
    site: context.site ?? myUrl,
    items: posts.map((post) => {
      const url = `${baseUrl}/notify/${post.slug}`
      return {
        title: post.title,
        description: `<img src="https://novel.manasas.dev/notify/og/${post.slug}.png"/> ${post.message}`,
        content: post.message,
        id: url,
        link: url,
        pubDate: new Date(post.date),
        enslosure: {
          url: `https://novel.manasas.dev/notify/og/${post.slug}.png`,
        },
      }
    }),
    customData: `<language>ja</language>`,
  })
}
