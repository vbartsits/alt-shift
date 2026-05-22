import { cn } from '@/shared/lib/cn'
import { GOAL } from '@/shared/lib/goal'

interface ProgressPillsProps {
  count: number
  goal?: number
}

export function ProgressPills({ count, goal = GOAL }: ProgressPillsProps) {
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      {Array.from({ length: goal }, (_, i) => i + 1).map((n) => (
        <span
          key={n}
          className={cn(
            'h-2 w-8 rounded transition-colors duration-300',
            n <= count ? 'bg-text' : 'bg-text/24',
          )}
        />
      ))}
    </div>
  )
}
