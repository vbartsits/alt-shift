import type React from 'react'
import { useId } from 'react'
import { cn } from '@/shared/lib/cn'
import { FieldError } from './FieldError'
import { FieldLabel } from './FieldLabel'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: React.Ref<HTMLTextAreaElement>
  label?: string
  error?: string
  currentLength?: number
}

export function Textarea({
  className,
  label,
  error,
  id,
  currentLength = 0,
  maxLength,
  ref,
  ...props
}: TextareaProps) {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const isOverLimit = maxLength !== undefined && currentLength > maxLength

  return (
    <div className="flex flex-col gap-1.5">
      {label && <FieldLabel htmlFor={textareaId}>{label}</FieldLabel>}
      <textarea
        ref={ref}
        id={textareaId}
        aria-label={props['aria-label'] ?? label}
        aria-invalid={!!error || isOverLimit}
        aria-describedby={`${textareaId}-counter${error ? ` ${textareaId}-error` : ''}`}
        className={cn(
          'field h-59 resize-none',
          (error || isOverLimit) && 'field--error',
          className,
        )}
        {...props}
      />
      {maxLength !== undefined && (
        <div className="flex items-center justify-between">
          <span
            id={`${textareaId}-counter`}
            aria-live="polite"
            className={cn(
              'text-sm font-normal leading-5',
              isOverLimit ? 'text-error' : 'text-text-icon',
            )}
          >
            {currentLength}/{maxLength}
          </span>
          {error && <FieldError id={`${textareaId}-error`}>{error}</FieldError>}
        </div>
      )}
    </div>
  )
}
