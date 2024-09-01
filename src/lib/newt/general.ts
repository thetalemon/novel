import { createClient } from 'newt-client-js'

export const newtClient = createClient({
  spaceUid: import.meta.env.NEWT_SPACE_UID,
  token: import.meta.env.NEWT_CDN_API_TOKEN,
  apiType: 'cdn',
})

export const APP_UID = 'novel'

export interface NewtImage {
  altText: string
  src: string
  height: number
  width: number
  fileType: string
}
