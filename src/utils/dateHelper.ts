import { format, parse } from 'date-fns'
import { ja } from 'date-fns/locale'

export const getDate = (value: string) =>
  format(parse(value, 'yyyyMMdd', new Date()), 'yyyy-MM-dd', {
    locale: ja,
  })
