import type { CharacterItem } from './character'
import type { NewtImage } from './general'
import { APP_UID, newtClient } from './general'

interface IllustItem {
  title: string
  slug: string
  image: NewtImage
  comment: string
  related_characters: CharacterItem
}

const MODEL_UID = 'illust'
const UIDS = {
  appUid: APP_UID,
  modelUid: MODEL_UID,
}

export const getIllustList = async (): Promise<IllustItem[]> => {
  const { items: novels } = await newtClient.getContents<IllustItem>({
    ...UIDS,
    query: {
      select: ['title', 'slug', 'image', 'comment', 'related_characters'],
      order: ['-_sys.customOrder'],
    },
  })
  return novels
}
