import type React from 'react'
import { cn } from '@/shared/lib/cn'

type TextButtonProps<T extends React.ElementType = 'button'> = {
  as?: T
} & Omit<React.ComponentPropsWithoutRef<T>, 'as'>

export function TextButton<T extends React.ElementType = 'button'>({
  as,
  className,
  children,
  ...props
}: TextButtonProps<T>) {
  const Component: React.ElementType = as ?? 'button'

  return (
    <Component
      className={cn(
        'inline-flex cursor-pointer touch-manipulation items-center gap-2 text-base font-semibold leading-6 text-text-icon transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&>svg]:-translate-y-px',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
