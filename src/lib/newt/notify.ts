import { APP_UID, newtClient } from './general'
export interface NotifyItem {
  date: string
  message: string
  title: string
  slug: string
}

const MODEL_UID = 'notify'
const UIDS = {
  appUid: APP_UID,
  modelUid: MODEL_UID,
}

export const getHistoryList = async (): Promise<NotifyItem[]> => {
  const { items: series } = await newtClient.getContents<NotifyItem>({
    ...UIDS,
    query: {
      select: ['date', 'message', 'title', 'slug'],
    },
  })

  return series
}
