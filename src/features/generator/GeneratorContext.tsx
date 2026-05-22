import { createContext, use } from 'react'
import type { GeneratorFormValues } from '@/shared/types/letter'

interface GeneratorContextValue {
  isGenerating: boolean
  generatedContent: string | null
  onGenerate: (values: GeneratorFormValues) => void
  onTryAgain: (values: GeneratorFormValues) => void
}

const GeneratorContext = createContext<GeneratorContextValue | null>(null)

export function useGenerator() {
  const ctx = use(GeneratorContext)
  if (!ctx) {
    throw new Error('useGenerator must be used inside GeneratorProvider')
  }

  return ctx
}

export const GeneratorProvider = GeneratorContext.Provider
