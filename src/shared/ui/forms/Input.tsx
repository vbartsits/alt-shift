import type React from 'react'
import { useId } from 'react'
import { cn } from '@/shared/lib/cn'
import { FieldError } from './FieldError'
import { FieldLabel } from './FieldLabel'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>
  label?: string
  error?: string
}

export function Input({ className, label, error, id, ref, ...props }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex flex-col gap-1.5">
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <input
        ref={ref}
        id={inputId}
        aria-label={label}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn('field', error && 'field--error', className)}
        {...props}
      />
      {error && <FieldError id={`${inputId}-error`}>{error}</FieldError>}
    </div>
  )
}
