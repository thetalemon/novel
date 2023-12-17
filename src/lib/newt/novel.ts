import { newtClient, APP_UID } from "./general";
import type { NewtImage } from "./general";

interface SimpleNovelListItem {
  title: string;
  slug: string;
  series: {
    title: string;
    slug: string;
  };
}

interface DetailNovelListItem extends SimpleNovelListItem {
  body: string;
  bg: NewtImage;
  bgColor: string;
  textColor: string;
  cardBgColor: string;
  cardBgColorAlpha: number;
}

const NOVEL_MODEL_UID = "novel";
const NOVEL_UIDS = {
  appUid: APP_UID,
  modelUid: NOVEL_MODEL_UID,
};

export const getSimpleNovelList = async (): Promise<SimpleNovelListItem[]> => {
  const { items: novels } = await newtClient.getContents<SimpleNovelListItem>({
    ...NOVEL_UIDS,
    query: {
      select: ["title", "slug", "series"],
    },
  });
  return novels;
};

export const getDetailNovelList = async (): Promise<DetailNovelListItem[]> => {
  const { items: novels } = await newtClient.getContents<DetailNovelListItem>({
    ...NOVEL_UIDS,
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
