import type { ReactNode } from 'react'
import { formatLetterTitle } from '@/shared/lib/formatLetterTitle'
import type { Letter } from '@/shared/types/letter'
import { Button } from '@/shared/ui/buttons/Button'
import { CopyButton } from '@/shared/ui/buttons/CopyButton'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/Dialog'
import { CloseIcon } from '@/shared/ui/icons/CloseIcon'

interface LetterReadModalProps {
  letter: Letter
  children: ReactNode
}

export function LetterReadModal({ letter, children }: LetterReadModalProps) {
  const titleText = formatLetterTitle(letter.jobTitle, letter.company)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-[85dvh]">
        <DialogHeader>
          <DialogTitle className="min-w-0 truncate" title={titleText}>
            {titleText}
          </DialogTitle>
          <DialogDescription>Full cover letter</DialogDescription>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close" className="shrink-0 -mt-1 -mr-1">
              <CloseIcon size={20} />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="overflow-y-auto overscroll-contain flex-1 px-6 py-4 min-h-0">
          <p className="whitespace-pre-wrap text-lg leading-7 text-text-secondary">
            {letter.content}
          </p>
        </div>

        <DialogFooter>
          <CopyButton text={letter.content} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
