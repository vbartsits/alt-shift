import type React from 'react'

interface FieldLabelProps {
  htmlFor: string
  children: React.ReactNode
}

export function FieldLabel({ htmlFor, children }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-5 text-text-label">
      {children}
    </label>
  )
}
