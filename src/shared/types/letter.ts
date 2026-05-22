export type { GeneratorFormValues } from '@/shared/schemas/generatorForm.schema'

export interface Letter {
  id: string
  company: string
  jobTitle: string
  skills: string
  additionalDetails: string
  content: string
  createdAt: string
}
