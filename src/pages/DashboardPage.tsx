import { Link } from 'react-router'
import { LetterList } from '@/features/letters/LetterList'
import { ProgressBanner } from '@/features/letters/ProgressBanner'
import { ROUTES } from '@/shared/lib/routes'
import { Button } from '@/shared/ui/buttons/Button'
import { PlusIcon } from '@/shared/ui/icons/PlusIcon'
import { Divider } from '@/shared/ui/layout/Divider'
import { Layout } from '@/shared/ui/layout/Layout'
import { useLettersStore } from '@/store/lettersStore'

export function DashboardPage() {
  const letters = useLettersStore((s) => s.letters)

  return (
    <Layout>
      <div className="sticky top-0 z-10 bg-bg pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-balance font-heading text-4xl leading-tight tracking-[-0.02em] text-text-strong sm:text-5xl">
            Applications
          </h1>
          <Button as={Link} to={ROUTES.generator} size="sm">
            <PlusIcon size={20} />
            <span className="hidden sm:inline">Create New</span>
          </Button>
        </div>
        <Divider className="mt-4" />
      </div>

      <LetterList letters={letters} />

      <ProgressBanner count={letters.length} />
    </Layout>
  )
}
