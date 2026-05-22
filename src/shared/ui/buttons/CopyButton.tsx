import { useCallback, useEffect, useRef, useState } from 'react'
import { CheckIcon } from '@/shared/ui/icons/CheckIcon'
import { CopyIcon } from '@/shared/ui/icons/CopyIcon'
import { TextButton } from './TextButton'

const COPY_RESET_DELAY = 3000

interface CopyButtonProps {
  text: string
  disabled?: boolean
  className?: string
}

export function CopyButton({ text, disabled, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  // Cleanup on unmount
  useEffect(() => clearTimer, [clearTimer])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      clearTimer()
      setCopied(true)
      timerRef.current = setTimeout(() => setCopied(false), COPY_RESET_DELAY)
    } catch {
      // clipboard access denied or non-HTTPS context
    }
  }

  return (
    <TextButton
      onClick={handleCopy}
      disabled={disabled}
      aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
      className={className}
    >
      {copied ? 'Copied!' : 'Copy to clipboard'}
      {copied ? <CheckIcon size={20} /> : <CopyIcon size={20} />}
    </TextButton>
  )
}
