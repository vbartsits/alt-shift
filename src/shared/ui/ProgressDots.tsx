import { cn } from '@/shared/lib/cn'
import { GOAL } from '@/shared/lib/goal'

interface ProgressDotsProps {
  count: number
  goal?: number
}

export function ProgressDots({ count, goal = GOAL }: ProgressDotsProps) {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: goal }, (_, i) => i + 1).map((n) => (
        <span
          key={n}
          className={cn(
            'size-2 rounded-full transition-colors duration-300',
            n <= count ? 'bg-text' : 'bg-text/24',
          )}
        />
      ))}
    </span>
  )
}
