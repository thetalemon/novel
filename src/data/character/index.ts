import { RyuCharacterList } from './series/ryu/index'
import { yasuragiCharacterList } from './series/yasuragi/index'
import type { Character } from '@/types/character'

export const allCharacterList: Character[] = [
  ...RyuCharacterList,
  ...yasuragiCharacterList,
]
