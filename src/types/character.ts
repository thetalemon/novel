export type Character = {
  name: string
  slug: string
  ogpPath: string
  img: ImageMetadata
  text: string
  related?: Character[]
}
