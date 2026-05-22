export function formatLetterTitle(jobTitle?: string, company?: string): string {
  return [jobTitle, company].filter(Boolean).join(', ')
}
