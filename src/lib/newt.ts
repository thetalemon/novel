import { createClient } from "newt-client-js";

interface SimpleNovelListItem {
  title: string;
  slug: string;
  series: {
    title: string;
    slug: string;
  };
}

export interface NewtImage {
  altText: string;
  src: string;
  height: number;
  width: number;
  fileType: string;
}

interface DetailNovelListItem extends SimpleNovelListItem {
  body: string;
  bg: NewtImage;
  bgColor: string;
  textColor: string;
  cardBgColor: string;
  cardBgColorAlpha: number;
}

interface SeriesListItem {
  title: string;
  slug: string;
}

export const newtClient = createClient({
  spaceUid: import.meta.env.NEWT_SPACE_UID,
  token: import.meta.env.NEWT_CDN_API_TOKEN,
  apiType: "cdn",
});

const NOVEL_APP_UID = "novel";
const NOVEL_MODEL_UID = "novel";
const SERIES_MODEL_UID = "series";
const NOVEL_UIDS = {
  appUid: NOVEL_APP_UID,
  modelUid: NOVEL_MODEL_UID,
};
const SERIES_UIDS = {
  appUid: NOVEL_APP_UID,
  modelUid: SERIES_MODEL_UID,
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

export const getSeriesList = async (): Promise<SeriesListItem[]> => {
  const { items: series } = await newtClient.getContents<SeriesListItem>({
    ...SERIES_UIDS,
    query: {
      select: ["title", "slug"],
    },
  });

  return series;
};
