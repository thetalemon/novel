import type { NewtImage } from "@/lib/newt/general";

export const NewtImage2AstroImage = (image: NewtImage): ImageMetadata => {
  return {
    src: image.src,
    width: image.width,
    height: image.height,
    format: image.fileType.includes("webp") ? "webp" : "png",
  };
};
