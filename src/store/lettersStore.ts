import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Letter } from '@/shared/types/letter'

interface LettersState {
  letters: Letter[]
  addLetter: (letter: Letter) => void
  updateLetter: (id: string, content: string) => void
  deleteLetter: (id: string) => void
}

export const useLettersStore = create<LettersState>()(
  persist(
    (set) => ({
      letters: [],
      addLetter: (letter) => set((s) => ({ letters: [letter, ...s.letters] })),
      updateLetter: (id, content) =>
        set((s) => ({
          letters: s.letters.map((l) => (l.id === id ? { ...l, content } : l)),
        })),
      deleteLetter: (id) => set((s) => ({ letters: s.letters.filter((l) => l.id !== id) })),
    }),
    {
      name: 'letters',
      version: 1,
      migrate: (state, _version) => {
        // Future migrations go here. Return state as-is when schema is unchanged.
        return state as LettersState
      },
    },
  ),
)
