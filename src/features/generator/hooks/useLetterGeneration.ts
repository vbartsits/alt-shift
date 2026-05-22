import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { generate } from '@/services/generation'
import { isAbortError } from '@/shared/lib/error'
import { getProgressToast } from '@/shared/lib/goal'
import type { GeneratorFormValues } from '@/shared/schemas/generatorForm.schema'
import { useLettersStore } from '@/store/lettersStore'

export function useLetterGeneration() {
  const { letters, addLetter, updateLetter } = useLettersStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)

  const abortRef = useRef<AbortController | null>(null)
  const lastLetterIdRef = useRef<string | null>(null)

  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  const startAbortController = () => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    return controller
  }

  const runGeneration = async (values: GeneratorFormValues, signal: AbortSignal) => {
    try {
      const { content, usedFallback } = await generate(values, signal)
      if (signal.aborted) return

      setGeneratedContent(content)

      if (usedFallback) {
        toast.warning('AI unavailable', {
          description: 'Falling back to a static template. Please try again later.',
        })
      }

      return content
    } catch (err) {
      if (isAbortError(err)) return
      toast.error('Generation failed', {
        description: 'Could not create the letter. Please try again.',
      })
    } finally {
      if (!signal.aborted) setIsGenerating(false)
    }
  }

  const handleGenerate = async (values: GeneratorFormValues) => {
    if (isGenerating) return
    const { signal } = startAbortController()
    setIsGenerating(true)

    const content = await runGeneration(values, signal)
    if (!content || signal.aborted) return

    const id = crypto.randomUUID()
    addLetter({
      id,
      company: values.company,
      jobTitle: values.jobTitle,
      skills: values.skills,
      additionalDetails: values.additionalDetails,
      content,
      createdAt: new Date().toISOString(),
    })
    lastLetterIdRef.current = id

    const { title, description } = getProgressToast(letters.length + 1)
    toast.success(title, description ? { description } : undefined)
  }

  const handleTryAgain = async (values: GeneratorFormValues) => {
    if (isGenerating || !lastLetterIdRef.current) return
    const { signal } = startAbortController()
    setIsGenerating(true)

    const content = await runGeneration(values, signal)
    if (!content || signal.aborted) return

    updateLetter(lastLetterIdRef.current, content)
  }

  return {
    isGenerating,
    generatedContent,
    lettersCount: letters.length,
    onGenerate: handleGenerate,
    onTryAgain: handleTryAgain,
  }
}
