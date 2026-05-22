import type { Letter } from '@/shared/types/letter'
import { LetterCard } from './LetterCard'

interface LetterListProps {
  letters: Letter[]
}

export function LetterList({ letters }: LetterListProps) {
  if (!letters.length) return null

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {letters.map((letter) => (
        <li key={letter.id}>
          <LetterCard letter={letter} />
        </li>
      ))}
    </ul>
  )
}
