import { LetterForm } from './LetterForm'
import { LetterPreview } from './LetterPreview'

export function GeneratorForm() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <LetterForm />
      <LetterPreview />
    </div>
  )
}
