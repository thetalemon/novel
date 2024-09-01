import { APP_UID, newtClient } from './general'

export interface SeriesItem {
  title: string
  slug: string
}

const MODEL_UID = 'series'
const UIDS = {
  appUid: APP_UID,
  modelUid: MODEL_UID,
}

export const getSeriesList = async (): Promise<SeriesItem[]> => {
  const { items: series } = await newtClient.getContents<SeriesItem>({
    ...UIDS,
    query: {
      select: ['title', 'slug'],
    },
  })

  return series
}
