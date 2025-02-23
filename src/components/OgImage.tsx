import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'

const MY_URL = 'https://novel.manasas.dev'
const fontFamily = 'Zen+Kurenaido'
const SITE_TITLE = '北極の とある倉庫'

export async function getOgImage(text: string) {
  const fontNormal = await fetchFont(SITE_TITLE + MY_URL, fontFamily, 400)
  const fontBold = await fetchFont(SITE_TITLE + text, fontFamily, 700)

  const svg = await satori(
    <div
      style={{
        backgroundImage: `url(${MY_URL}/ogbg.png)`,
        backgroundColor: '#fff',
        backgroundSize: '100% 100%',
        height: '100%',
        width: '100%',
        display: 'flex',
        textAlign: 'left',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'nowrap',
      }}
    >
      <div
        style={{
          width: '100%',
          fontSize: 50,
          fontStyle: 'normal',
          fontWeight: 'bold',
          color: '#fff',
          padding: '0 64px',
          lineHeight: 1.3,
          marginBottom: '40px',
          wordWrap: 'break-word',
        }}
      >
        {text}
      </div>
      <div
        style={{
          width: '100%',
          fontSize: 35,
          fontStyle: 'normal',
          textAlign: 'right',
          display: 'flex',
          justifyContent: 'flex-end',
          color: '#fff',
          padding: '0 64px',
          lineHeight: 1.3,
        }}
      >
        {SITE_TITLE}
      </div>
    </div>,
    {
      width: 800,
      height: 400,
      fonts: [
        {
          name: fontFamily,
          data: fontNormal,
          weight: 400,
          style: 'normal',
        },
        {
          name: fontFamily,
          data: fontBold,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  )

  const resvg = new Resvg(svg)

  return resvg.render().asPng()
}

async function fetchFont(text: string, font: string): Promise<ArrayBuffer> {
  const API = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text,
  )}`

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text()

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (!resource) {
    throw new Error('Failed to fetch font')
  }

  const res = await fetch(resource[1])

  return res.arrayBuffer()
}
