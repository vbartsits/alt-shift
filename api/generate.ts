import { GoogleGenerativeAI, GoogleGenerativeAIFetchError } from '@google/generative-ai'
import type { VercelRequest, VercelResponse } from '@vercel/node'

// Fail fast — Gemini Flash is quick; 30s is more than enough
export const config = { maxDuration: 30 }

interface GenerateRequest {
  jobTitle: string
  company: string
  skills: string
  additionalDetails?: string
}

const MODEL = process.env.GEMINI_MODEL ?? 'gemini-1.0-pro'

// TODO (production): add rate limiting (e.g. Upstash/Vercel KV), request size limit,
// server-side Zod validation, and structured error codes (RATE_LIMITED, INVALID_INPUT, etc.)

function buildPrompt(params: GenerateRequest): string {
  const lines = [
    'Write a concise, professional cover letter for the following job application.',
    '',
    `Position: ${params.jobTitle}`,
    `Company: ${params.company}`,
    `Candidate's key skills: ${params.skills}`,
  ]

  if (params.additionalDetails?.trim()) {
    lines.push(`Additional context: ${params.additionalDetails.trim()}`)
  }

  lines.push(
    '',
    'Requirements:',
    '- 3 short paragraphs, plain text only (no markdown, no bullet points)',
    '- Tone: confident, genuine, not generic or overly formal',
    '- Opening: express specific interest in this role at this company',
    "- Middle: connect the candidate's skills to what the company needs",
    '- Closing: short call to action',
    '- Do NOT include "Dear Hiring Manager", date, address, or signature — body only',
    '- Maximum 220 words',
  )

  return lines.join('\n')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(503).json({ error: 'AI not configured' })
  }

  try {
    const params = req.body as GenerateRequest
    const client = new GoogleGenerativeAI(apiKey)
    const model = client.getGenerativeModel({ model: MODEL })
    const result = await model.generateContent(buildPrompt(params))
    const text = result.response.text().trim()

    if (!text) {
      return res.status(502).json({ error: 'Empty response from AI' })
    }

    return res.status(200).json({ content: text })
  } catch (err) {
    // Propagate Gemini HTTP errors (429 rate-limit, 503 overload, etc.) directly
    if (err instanceof GoogleGenerativeAIFetchError) {
      const status = err.status ?? 502
      return res.status(status).json({ error: err.message, geminiStatus: status })
    }
    return res.status(500).json({ error: 'Generation failed' })
  }
}
