import type { GeneratorFormValues } from '@/shared/types/letter'

export interface GenerationService {
  generate(params: GeneratorFormValues, signal?: AbortSignal): Promise<string>
}

export interface GenerateResult {
  content: string
  usedFallback: boolean
}
