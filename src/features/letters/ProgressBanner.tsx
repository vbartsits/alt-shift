import { Link } from 'react-router'
import { GOAL } from '@/shared/lib/goal'
import { ROUTES } from '@/shared/lib/routes'
import { Button } from '@/shared/ui/buttons/Button'
import { PlusIcon } from '@/shared/ui/icons/PlusIcon'
import { ProgressPills } from '@/shared/ui/ProgressPills'

interface ProgressBannerProps {
  count: number
  showCreateButton?: boolean
}

export function ProgressBanner({ count, showCreateButton = true }: ProgressBannerProps) {
  if (count >= GOAL) return null

  return (
    <section
      aria-label="Progress towards goal"
      className="flex flex-col items-center gap-8 rounded-xl bg-primary-light py-13.5 text-center mt-12"
    >
      <div className="flex max-w-120 flex-col items-center gap-4">
        <h2 className="text-balance font-heading text-4xl leading-11 tracking-[-0.02em] text-text-strong">
          Hit your goal
        </h2>
        <p className="text-lg leading-7 text-text-secondary">
          Generate and send out couple more job applications today to get hired faster
        </p>

        {showCreateButton && (
          <Button as={Link} to={ROUTES.generator} size="lg">
            <PlusIcon size={24} />
            Create New
          </Button>
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        <ProgressPills count={count} />
        <span className="text-lg leading-7 text-text-secondary" aria-live="polite">
          {count} out of {GOAL}
        </span>
      </div>
    </section>
  )
}
