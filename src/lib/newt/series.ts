import { newtClient, APP_UID } from "./general";

interface SeriesListItem {
  title: string;
  slug: string;
}

const SERIES_MODEL_UID = "series";
const SERIES_UIDS = {
  appUid: APP_UID,
  modelUid: SERIES_MODEL_UID,
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
