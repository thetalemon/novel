import type { NewtImage } from "./general";
import { APP_UID, newtClient } from "./general";
import type { SeriesItem } from "./series";

export interface SimpleNovelItem {
  title: string;
  slug: string;
  series: SeriesItem;
}

interface DetailNovelItem extends SimpleNovelItem {
  body: string;
  bg: NewtImage;
  bgColor: string;
  textColor: string;
  cardBgColor: string;
  cardBgColorAlpha: number;
}

const MODEL_UID = "novel";
const UIDS = {
  appUid: APP_UID,
  modelUid: MODEL_UID,
};

export const getSimpleNovelList = async (): Promise<SimpleNovelItem[]> => {
  const { items: novels } = await newtClient.getContents<SimpleNovelItem>({
    ...UIDS,
    query: {
      select: ["title", "slug", "series"],
      order: ["-_sys.customOrder"],
    },
  });
  return novels;
};

export const getDetailNovelList = async (): Promise<DetailNovelItem[]> => {
  const { items: novels } = await newtClient.getContents<DetailNovelItem>({
    ...UIDS,
    query: {
      select: [
        "title",
        "slug",
        "series",
        "body",
        "bg",
        "bgColor",
        "textColor",
        "cardBgColor",
        "cardBgColorAlpha",
      ],
    },
  });

  return novels;
};
