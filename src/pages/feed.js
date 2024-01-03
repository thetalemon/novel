import rss from "@astrojs/rss";
import { getHistoryList } from "@/lib/newt/notify";
import {
  myUrl,
  myName,
  mySiteName,
  myCopyLight,
  mySiteDefaultDescription,
} from "@/constants/constants";

export async function GET(context) {
  const posts = await getHistoryList();
  const baseUrl = myUrl;
  return rss({
    title: mySiteName,
    description: mySiteDefaultDescription,
    id: baseUrl,
    link: baseUrl,
    copyright: myCopyLight,
    updated: new Date(),
    author: {
      name: myName,
    },
    feed: `${baseUrl}/feed`,
    site: context.site,
    items: posts.map((post) => {
      const url = `${baseUrl}/notify/${post.slug}`;
      return {
        title: post.title,
        description: post.message,
        content: post.message,
        id: url,
        link: url,
        pubDate: new Date(post.date),
      };
    }),
    customData: `<language>ja</language>`,
  });
}
