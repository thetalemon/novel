import { newtClient, APP_UID } from "./general";
export interface NotifyItem {
  date: string;
  message: string;
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
      select: ["date", "message"],
    },
  });

  return series;
};
