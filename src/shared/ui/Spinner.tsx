import { cn } from '@/shared/lib/cn'

const SPOKES = [
  'M12 2V6',
  'M19.0784 4.99994L16.25 7.82837',
  'M22 12H18',
  'M19.0784 19.0784L16.25 16.25',
  'M12 18V22',
  'M4.92157 19.0784L7.75 16.25',
  'M6 12H2',
  'M4.92157 4.99994L7.75 7.82837',
] as const

const DURATION = 0.8

interface SpinnerProps {
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={cn('block shrink-0', className)}
    >
      {SPOKES.map((d, i) => (
        <path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            animationName: 'spinner-fade',
            animationDuration: `${DURATION}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${-(DURATION * (SPOKES.length - i)) / SPOKES.length}s`,
          }}
        />
      ))}
    </svg>
  )
}
