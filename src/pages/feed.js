import rss from "@astrojs/rss";
import { getHistoryList } from "@/lib/newt/notify";
export const myDomain = "novel.manasas.dev";
export const myUrl = `https://${myDomain}`;
export const myMainUrl = `https://manasas.dev`;
export const myName = "manasas";
export const mySiteName = "北極の とある倉庫";
export const mySiteDefaultDescription = "まなさすの創作サイト";
export const myCopyLight = `© 2023 ${myName}`;

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
