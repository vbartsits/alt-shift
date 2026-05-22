import { isAbortError } from '@/shared/lib/error'
import { sleep } from '@/shared/lib/sleep'
import type { GeneratorFormValues } from '@/shared/types/letter'
import { AIGenerationService, AINotConfiguredError } from './ai.service'
import { TemplateGenerationService } from './template.service'
import type { GenerateResult } from './types'

const MAX_RETRIES = 2
const RETRY_DELAY_MS = 1000

const aiService = new AIGenerationService()
const templateService = new TemplateGenerationService()

export async function generate(
  params: GeneratorFormValues,
  signal?: AbortSignal,
): Promise<GenerateResult> {
  let lastError: unknown

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    signal?.throwIfAborted()

    if (attempt > 0) {
      await sleep(RETRY_DELAY_MS * attempt, signal)
    }

    try {
      const content = await aiService.generate(params, signal)
      return { content, usedFallback: false }
    } catch (err) {
      if (isAbortError(err)) throw err
      if (err instanceof AINotConfiguredError) break
      lastError = err
    }
  }

  console.warn('[generation] AI failed, falling back to template:', lastError)

  signal?.throwIfAborted()

  const content = await templateService.generate(params, signal)
  return { content, usedFallback: true }
}
