import type { Letter } from '@/shared/types/letter'
import { CopyButton } from '@/shared/ui/buttons/CopyButton'
import { TextButton } from '@/shared/ui/buttons/TextButton'
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog'
import { TrashIcon } from '@/shared/ui/icons/TrashIcon'
import { useLettersStore } from '@/store/lettersStore'
import { LetterReadModal } from './LetterReadModal'

interface LetterCardProps {
  letter: Letter
}

export function LetterCard({ letter }: LetterCardProps) {
  const deleteLetter = useLettersStore((s) => s.deleteLetter)

  return (
    <article className="group relative flex max-h-60 flex-col rounded-xl bg-card p-6 gap-4">
      <LetterReadModal letter={letter}>
        <button
          type="button"
          aria-label={`Read full letter for ${letter.company}, ${letter.jobTitle}`}
          className="absolute inset-0 cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </LetterReadModal>

      <div className="pointer-events-none min-h-0 flex-1 relative overflow-hidden after:absolute after:inset-x-0 after:bottom-0 after:h-10 after:bg-linear-to-b after:from-card/0 after:to-card after:content-['']">
        <p className="line-clamp-5 whitespace-pre-line text-lg leading-7 text-text-secondary transition-colors group-hover:text-text">
          {letter.content}
        </p>
      </div>

      <footer className="relative z-10 flex items-center justify-between">
        <ConfirmDialog
          title="Delete letter?"
          description={
            <>
              The letter for <strong>{letter.company}</strong> ({letter.jobTitle}) will be
              permanently deleted.
            </>
          }
          confirmLabel="Delete"
          destructive
          onConfirm={() => deleteLetter(letter.id)}
        >
          <TextButton
            className="hover:text-error focus-visible:outline-error"
            aria-label={`Delete letter for ${letter.company}`}
          >
            <TrashIcon size={20} />
            Delete
          </TextButton>
        </ConfirmDialog>

        <CopyButton
          text={letter.content}
          aria-label={`Copy letter for ${letter.company} to clipboard`}
          className="hover:text-text"
        />
      </footer>
    </article>
  )
}
