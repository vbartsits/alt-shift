import { sleep } from '@/shared/lib/sleep'
import type { GeneratorFormValues } from '@/shared/types/letter'
import type { GenerationService } from './types'

export class TemplateGenerationService implements GenerationService {
  async generate(
    { company, jobTitle, skills, additionalDetails }: GeneratorFormValues,
    signal?: AbortSignal,
  ) {
    await sleep(2000 + Math.random() * 1000, signal)

    const paragraphs = [
      `Dear ${company} Team,`,
      `I am writing to express my interest in the ${jobTitle} position.`,
      `My experience in the realm combined with my skills in ${skills} make me a strong candidate for this role.`,
    ]

    const details = additionalDetails?.trim()
    if (details) {
      paragraphs.push(details)
    }

    paragraphs.push(
      `I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.`,
      `Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`,
    )

    return paragraphs.join('\n\n')
  }
}
