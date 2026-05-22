import { GoogleGenerativeAI } from '@google/generative-ai'

interface GenerateRequest {
  jobTitle: string
  company: string
  skills: string
  additionalDetails?: string
}

const MODEL = 'gemini-2.0-flash'

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

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'AI not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const params = (await req.json()) as GenerateRequest
    const client = new GoogleGenerativeAI(apiKey)
    const model = client.getGenerativeModel({ model: MODEL })
    const result = await model.generateContent(buildPrompt(params), { signal: req.signal })
    const text = result.response.text().trim()

    if (!text) {
      return new Response(JSON.stringify({ error: 'Empty response from AI' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ content: text }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err
    return new Response(JSON.stringify({ error: 'Generation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
