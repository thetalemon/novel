export type Character = {
  name: string
  slug: string
  img: ImageMetadata
  text: string
  related?: Character[]
}
