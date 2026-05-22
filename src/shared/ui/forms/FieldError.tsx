import type React from 'react'

interface FieldErrorProps {
  id: string
  children: React.ReactNode
}

export function FieldError({ id, children }: FieldErrorProps) {
  return (
    <span id={id} role="alert" className="text-sm font-normal leading-5 text-error">
      {children}
    </span>
  )
}
