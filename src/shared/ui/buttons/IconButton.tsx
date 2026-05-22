import type React from 'react'
import { cn } from '@/shared/lib/cn'

type IconButtonProps<T extends React.ElementType = 'button'> = {
  as?: T
  children?: React.ReactNode
  className?: string
} & Omit<React.ComponentPropsWithoutRef<T>, 'as'>

export function IconButton<T extends React.ElementType = 'button'>({
  as,
  children,
  className,
  ...props
}: IconButtonProps<T>) {
  const Component: React.ElementType = as ?? 'button'

  return (
    <Component
      className={cn(
        'flex cursor-pointer size-10 items-center justify-center rounded-sm border border-border text-text-muted transition-colors touch-manipulation hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
