import { getOgImage } from '@/components/OgImage'
import { getHistoryList } from '@/lib/newt/notify'
import type { APIContext } from 'astro'

export async function getStaticPaths() {
  const hisotryList = await getHistoryList()

  return hisotryList.map((item) => ({
    params: { slug: item.slug },
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
