import historyJson from './data.json'

export interface HistoryItem {
  date: string
  title: string
  description: string
}

export const HistoryList: HistoryItem[] = historyJson
