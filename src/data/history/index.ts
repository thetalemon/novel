import historyJson from './data.json'

export interface HistoryItem {
  date: string
  description: string
}

export const HistoryList: HistoryItem[] = historyJson
