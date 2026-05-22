export const GOAL = 5

interface ProgressToast {
  title: string
  description: string
}

const MESSAGES: Record<number, ProgressToast> = {
  1: { title: 'Letter saved!', description: '4 more to reach your goal — keep going!' },
  2: { title: 'Letter saved!', description: '3 more to go' },
  3: { title: 'Halfway there!', description: '2 more letters left' },
  4: { title: 'Almost there!', description: 'Just 1 more to go' },
  5: { title: 'Goal reached!', description: 'All 5 letters done. Time to send them out!' },
}

export function getProgressToast(newCount: number): ProgressToast {
  return MESSAGES[newCount] ?? { title: 'Letter saved!', description: '' }
}
