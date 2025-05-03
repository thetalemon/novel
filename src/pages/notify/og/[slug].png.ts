import { getOgImage } from '@/components/OgImage'
import type { APIContext } from 'astro'
import { HistoryList } from '@/data/history'

export async function getStaticPaths() {
  return HistoryList.map((item) => ({
    params: { slug: item.date },
    props: { item },
  }))
}

export async function GET({ props }: APIContext) {
  const body = await getOgImage(props.item.title ?? 'No title')

  return new Response(body, {
    headers: {
      'content-type': 'image/png',
    },
  })
}
