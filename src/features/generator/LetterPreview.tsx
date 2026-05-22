import { CopyButton } from '@/shared/ui/buttons/CopyButton'
import { useGenerator } from './GeneratorContext'

function PreviewBody() {
  const { isGenerating, generatedContent } = useGenerator()

  if (isGenerating) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div
          aria-hidden="true"
          className="relative size-20 animate-ball-bounce motion-reduce:animate-none"
        >
          <div className="ball-loader size-full rounded-full" />
        </div>
      </div>
    )
  }

  if (generatedContent) {
    return (
      <p className="whitespace-pre-wrap text-lg font-normal leading-7 text-text-secondary">
        {generatedContent}
      </p>
    )
  }

  return (
    <p className="text-lg font-normal leading-7 text-text-secondary">
      Your personalized job application will appear here…
    </p>
  )
}

export function LetterPreview() {
  const { isGenerating, generatedContent } = useGenerator()

  return (
    <section
      aria-live="polite"
      aria-busy={isGenerating}
      aria-label="Generated cover letter"
      className="flex flex-1 min-w-0 flex-col gap-4 min-h-152 max-h-155 rounded-lg bg-card p-6"
    >
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
        <PreviewBody />
      </div>
      <CopyButton
        text={generatedContent ?? ''}
        disabled={!generatedContent || isGenerating}
        className="self-end"
      />
    </section>
  )
}
