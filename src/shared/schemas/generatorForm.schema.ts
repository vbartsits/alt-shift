import { z } from 'zod'

export const MAX_DETAILS_LENGTH = 1200
export const MAX_FIELD_LENGTH = 200

export const generatorFormSchema = z.object({
  jobTitle: z
    .string()
    .min(1, 'Required')
    .max(MAX_FIELD_LENGTH, `Max ${MAX_FIELD_LENGTH} characters`),
  company: z
    .string()
    .min(1, 'Required')
    .max(MAX_FIELD_LENGTH, `Max ${MAX_FIELD_LENGTH} characters`),
  skills: z.string().min(1, 'Required').max(MAX_FIELD_LENGTH, `Max ${MAX_FIELD_LENGTH} characters`),
  additionalDetails: z.string().max(MAX_DETAILS_LENGTH, `Max ${MAX_DETAILS_LENGTH} characters`),
})

export type GeneratorFormValues = z.infer<typeof generatorFormSchema>
