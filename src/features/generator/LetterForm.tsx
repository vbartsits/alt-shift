import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { cn } from '@/shared/lib/cn'
import { formatLetterTitle } from '@/shared/lib/formatLetterTitle'
import {
  type GeneratorFormValues,
  generatorFormSchema,
  MAX_DETAILS_LENGTH,
} from '@/shared/schemas/generatorForm.schema'
import { Button } from '@/shared/ui/buttons/Button'
import { Input } from '@/shared/ui/forms/Input'
import { Textarea } from '@/shared/ui/forms/Textarea'
import { RetryIcon } from '@/shared/ui/icons/RetryIcon'
import { useGenerator } from './GeneratorContext'

export function LetterForm() {
  const { isGenerating, generatedContent, onGenerate, onTryAgain } = useGenerator()

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<GeneratorFormValues>({
    resolver: zodResolver(generatorFormSchema),
    mode: 'onChange',
  })

  const jobTitle = watch('jobTitle')
  const company = watch('company')
  const additionalDetails = watch('additionalDetails') ?? ''
  const hasTitle = jobTitle || company
  const titleText = formatLetterTitle(jobTitle, company) || 'New application'

  return (
    <div className="flex-1 min-w-0">
      <div className="mb-4 border-b border-divider pb-3">
        <h1
          className={cn(
            'truncate font-heading text-4xl leading-11 tracking-[-0.02em]',
            hasTitle ? 'text-text-strong' : 'text-text-secondary',
          )}
        >
          {titleText}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onGenerate)} noValidate>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Job title"
              placeholder="Product manager"
              autoComplete="organization-title"
              error={errors.jobTitle?.message}
              {...register('jobTitle')}
            />
            <Input
              label="Company"
              placeholder="Apple"
              autoComplete="organization"
              error={errors.company?.message}
              {...register('company')}
            />
          </div>

          <Input
            label="I am good at..."
            placeholder="HTML, CSS and doing things in time"
            error={errors.skills?.message}
            {...register('skills')}
          />

          <Textarea
            label="Additional details"
            placeholder="Describe why you are a great fit or paste your bio"
            currentLength={additionalDetails.length}
            maxLength={MAX_DETAILS_LENGTH}
            error={errors.additionalDetails?.message}
            {...register('additionalDetails')}
          />

          {generatedContent ? (
            <Button
              type="button"
              size="lg"
              variant="secondary"
              loading={isGenerating}
              onClick={() => onTryAgain(getValues())}
              className="w-full"
            >
              <RetryIcon />
              Try Again
            </Button>
          ) : (
            <Button
              type="submit"
              size="lg"
              loading={isGenerating}
              disabled={!isValid || isGenerating}
              className="w-full"
            >
              Generate Now
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
