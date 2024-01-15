import { format } from "date-fns";
import ja from "date-fns/locale/ja/index.js";

export const getDate = (value: string) =>
  format(new Date(value), "yyyy-MM-dd", {
    locale: ja,
  });
