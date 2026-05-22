import { cn } from '@/shared/lib/cn'

interface DividerProps {
  className?: string
}

export function Divider({ className }: DividerProps) {
  return <div aria-hidden="true" className={cn('h-px bg-divider', className)} />
}
