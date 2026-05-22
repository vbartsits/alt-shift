import { cva, type VariantProps } from 'class-variance-authority'
import type React from 'react'
import { cn } from '@/shared/lib/cn'
import { Spinner } from '../Spinner'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none cursor-pointer touch-manipulation [&>svg]:-translate-y-px border',
  {
    variants: {
      variant: {
        primary:
          'bg-primary border-primary text-white hover:bg-primary-hover hover:border-primary-hover disabled:bg-disabled-bg disabled:border-disabled-bg disabled:text-disabled-text',
        secondary: 'bg-surface border-border text-text-label hover:bg-card disabled:opacity-50',
        ghost: 'bg-transparent border-transparent text-text-muted hover:text-text',
      },
      size: {
        default: 'px-5 py-3',
        sm: 'px-4.5 py-2.5 text-base font-semibold leading-6 rounded-sm',
        lg: 'px-7 py-4 text-lg font-semibold leading-7 rounded-sm gap-3',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

type ButtonProps<T extends React.ElementType = 'button'> = {
  as?: T
  loading?: boolean
} & Omit<React.ComponentPropsWithoutRef<T>, 'as'> &
  VariantProps<typeof buttonVariants>

export function Button<T extends React.ElementType = 'button'>({
  as,
  className,
  variant,
  size,
  loading,
  disabled,
  children,
  ...props
}: ButtonProps<T>) {
  const Component: React.ElementType = as ?? 'button'
  const isButton = !as || as === 'button'
  const isDisabled = !loading && disabled

  return (
    <Component
      {...(isButton ? { disabled: isDisabled } : {})}
      aria-disabled={disabled || loading || undefined}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size }), loading && 'pointer-events-none', className)}
      {...props}
    >
      {loading ? <Spinner className="size-7" /> : children}
    </Component>
  )
}

export { buttonVariants }
