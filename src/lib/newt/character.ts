import type { NewtImage } from './general'
import { APP_UID, newtClient } from './general'
import type { SeriesItem } from './series'

export interface CharacterItem {
  name: string
  slug: string
  image: NewtImage
  content: string
  series: SeriesItem
}

const MODEL_UID = 'character'
const UIDS = {
  appUid: APP_UID,
  modelUid: MODEL_UID,
}

export const getCharacterList = async (): Promise<CharacterItem[]> => {
  const { items: novels } = await newtClient.getContents<CharacterItem>({
    ...UIDS,
    query: {
      select: ['slug', 'name', 'content', 'image', 'series'],
      order: ['-_sys.customOrder'],
    },
  })
  return novels
}
