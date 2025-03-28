// シリーズ: 龍の子

import Sui from './sui.png'
import Momo from './momo.png'

const SUI = {
  name: 'スイ',
  slug: 'sui',
  img: Sui,
  text: '龍の子。モモの妹。\nクールで冷静沈着……と思わせておいて、びっくりすると思考停止するタイプ。心配性。',
}

const MOMO = {
  name: 'モモ',
  slug: 'momo',
  img: Momo,
  text: '龍神の最初の子であり、スイの姉。\n猪突猛進でとりあえず動いてみるタイプ。カンはいいが、深く考えるのは苦手。',
}

export const RyuCharacterList = [
  {
    ...SUI,
    related: [MOMO],
  },
  {
    ...MOMO,
    related: [SUI],
  },
]
