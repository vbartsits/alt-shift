import type { IconProps } from './types'

export function SunIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.5V5M12 19v2.5M4.5 4.5l1.77 1.77M17.73 17.73l1.77 1.77M2.5 12H5M19 12h2.5M4.5 19.5l1.77-1.77M17.73 6.27l1.77-1.77"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}
