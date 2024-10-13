import { RyuCaracterList } from './series/ryu'
import { yasuragiCharacterList } from './series/yasuragi'
import type { Character } from '@/types/character'

export const allCharacterList: Character[] = [
  ...RyuCaracterList,
  ...yasuragiCharacterList,
]
