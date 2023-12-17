import { newtClient, APP_UID } from "./general";
import type { SimpleNovelItem } from "./novel";

export interface NotifyItem {
  title: string;
  date: string;
  novelLink: SimpleNovelItem;
}

const MODEL_UID = "notify";
const UIDS = {
  appUid: APP_UID,
  modelUid: MODEL_UID,
};

export const getHistoryList = async (): Promise<NotifyItem[]> => {
  const { items: series } = await newtClient.getContents<NotifyItem>({
    ...UIDS,
    query: {
      select: ["title", "date", "novelLink"],
    },
  });

  return series;
};
