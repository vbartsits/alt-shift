# Alt+Shift — AI Cover Letter Generator

Generate personalized job application cover letters powered by Google Gemini. Falls back to a static template when no API key is provided.

## Tech stack

- **React 19** + TypeScript
- **Vite 8** + Tailwind CSS v4
- **Zustand** — persisted letter store
- **React Hook Form** + Zod — form validation
- **Radix UI** — accessible dialog primitives
- **Biome** — linting & formatting
- **Vitest** + Testing Library — unit tests

## Getting started

```bash
# 1. Install dependencies
pnpm install

# 2. Copy env file and fill in the key
cp .env.example .env

# 3. Start dev server (template mode — AI requires Vercel deployment)
pnpm dev
```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | No | Google Gemini API key. Set on the **server** (Vercel env vars), never in the browser bundle. Without it the app runs in template mode. |

Get a free key at [aistudio.google.com](https://aistudio.google.com).

> **Security note:** The API key is used exclusively in the `/api/generate` serverless function and is never exposed to the client.

## AI vs template mode

| Mode | Condition | Behaviour |
|---|---|---|
| **AI** | `GEMINI_API_KEY` set in Vercel env | Generates via Gemini (`/api/generate` serverless function) with up to 2 retries, falls back to template on failure |
| **Template** | No key / local `pnpm dev` | Returns a static letter with a simulated delay |

## Git workflow

Commits follow [Conventional Commits](https://www.conventionalcommits.org). Husky enforces:

- **pre-commit** — lint-staged runs Biome on staged files
- **commit-msg** — commitlint validates the message format
- **pre-push** — TypeScript check
