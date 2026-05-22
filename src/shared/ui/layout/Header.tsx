import { Link, useLocation } from 'react-router'
import { GOAL } from '@/shared/lib/goal'
import { ROUTES } from '@/shared/lib/routes'
import { useTheme } from '@/shared/lib/ThemeContext'
import { useLettersStore } from '@/store/lettersStore'
import { IconButton } from '../buttons/IconButton'
import { CheckIcon } from '../icons/CheckIcon'
import { HomeIcon } from '../icons/HomeIcon'
import { MoonIcon } from '../icons/MoonIcon'
import { SunIcon } from '../icons/SunIcon'
import { Logo } from '../Logo'
import { ProgressDots } from '../ProgressDots'

export function Header() {
  const count = useLettersStore((s) => s.letters.length)
  const { pathname } = useLocation()
  const { isDark, toggle } = useTheme()

  const achieved = count >= GOAL
  const isHome = pathname === ROUTES.dashboard

  return (
    <header className="flex items-center justify-between">
      <Link to={ROUTES.dashboard} aria-label="Go to dashboard">
        <Logo />
      </Link>

      <nav aria-label="Site navigation" className="flex items-center gap-3">
        {achieved ? (
          <div className="hidden items-center gap-4 md:flex">
            <span className="text-lg leading-7 text-text-secondary">
              {GOAL}/{GOAL} applications generated
            </span>
            <span
              aria-hidden="true"
              className="flex size-7 items-center justify-center rounded-full bg-success-light"
            >
              <CheckIcon size={14} className="text-success" />
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="hidden text-lg leading-7 text-text-secondary md:inline">
              {count}/{GOAL} applications generated
            </span>
            <span className="max-sm:hidden">
              <ProgressDots count={count} />
            </span>
          </div>
        )}

        <IconButton
          onClick={toggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </IconButton>

        <IconButton
          as={Link}
          to={ROUTES.dashboard}
          aria-label="Home"
          aria-current={isHome ? 'page' : undefined}
        >
          <HomeIcon size={20} />
        </IconButton>
      </nav>
    </header>
  )
}
