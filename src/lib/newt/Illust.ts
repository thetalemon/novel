import { newtClient, APP_UID } from "./general";
import type { NewtImage } from "./general";
import type { CharacterItem } from "./character";

interface IllustItem {
  title: string;
  slug: string;
  image: NewtImage;
  comment: string;
  related_characters: CharacterItem;
}

const MODEL_UID = "illust";
const UIDS = {
  appUid: APP_UID,
  modelUid: MODEL_UID,
};

export const getIllustList = async (): Promise<IllustItem[]> => {
  const { items: novels } = await newtClient.getContents<IllustItem>({
    ...UIDS,
    query: {
      select: ["title", "slug", "image", "comment", "related_characters"],
      order: ["-_sys.customOrder"],
    },
  });
  return novels;
};
