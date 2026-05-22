import type { GeneratorFormValues } from '@/shared/types/letter'
import type { GenerationService } from './types'

export class AINotConfiguredError extends Error {
  constructor() {
    super('AI not configured on server')
    this.name = 'AINotConfiguredError'
  }
}

export class AIGenerationService implements GenerationService {
  async generate(params: GeneratorFormValues, signal?: AbortSignal): Promise<string> {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      signal,
    })

    if (res.status === 503) {
      throw new AINotConfiguredError()
    }

    if (!res.ok) {
      throw new Error(`AI request failed with status ${res.status}`)
    }

    const { content } = await res.json()
    return content
  }
}
