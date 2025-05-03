import {
  mySiteDefaultDescription,
  mySiteName,
  myUrl,
} from '@/constants/constants'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { HistoryList } from '@/data/history'

export async function GET(context: APIContext) {
  const posts = HistoryList
  const baseUrl = myUrl
  return rss({
    title: mySiteName,
    description: mySiteDefaultDescription,
    site: context.site ?? myUrl,
    items: posts.map((post) => {
      const url = `${baseUrl}/notify/${post.date}`
      return {
        title: post.title,
        description: `<img src="https://novel.manasas.dev/notify/og/${post.date}.png"/> ${post.description}`,
        content: post.description,
        id: url,
        link: url,
        pubDate: new Date(post.date),
        enslosure: {
          url: `https://novel.manasas.dev/notify/og/${post.date}.png`,
        },
      }
    }),
    customData: `<language>ja</language>`,
  })
}
