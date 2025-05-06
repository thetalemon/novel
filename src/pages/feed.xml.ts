import {
  mySiteDefaultDescription,
  mySiteName,
  myUrl,
} from '@/constants/constants'
import rss, { type RSSFeedItem } from '@astrojs/rss'
import type { APIContext } from 'astro'
import { HistoryList } from '@/data/history'

export async function GET(context: APIContext) {
  const posts = HistoryList
  const baseUrl = myUrl

  const items: RSSFeedItem[] = posts.map((post) => {
    const url = `${baseUrl}/notify/${post.date}`
    const dateStr = `${post.date.slice(0, 4)}-${post.date.slice(4, 6)}-${post.date.slice(6, 8)}`

    return {
      title: post.title,
      description: `<img src="https://novel.manasas.dev/notify/og/${post.date}.png" alt="${post.title}"/> ${post.description}`,
      link: url,
      pubDate: new Date(dateStr),
    }
  })

  return rss({
    title: mySiteName,
    description: mySiteDefaultDescription,
    site: context.site ?? myUrl,
    items,
    customData: `<language>ja</language>`,
  })
}
