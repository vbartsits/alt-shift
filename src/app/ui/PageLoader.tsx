import { Spinner } from '@/shared/ui/Spinner'

export function PageLoader() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Spinner className="size-10" />
    </div>
  )
}
