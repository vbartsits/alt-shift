import { act, renderHook, waitFor } from '@testing-library/react'
import { toast } from 'sonner'
import { generate } from '@/services/generation'
import { getProgressToast } from '@/shared/lib/goal'
import { useLettersStore } from '@/store/lettersStore'
import { useLetterGeneration } from './useLetterGeneration'

vi.mock('sonner', () => ({ toast: { success: vi.fn(), warning: vi.fn(), error: vi.fn() } }))
vi.mock('@/services/generation', () => ({ generate: vi.fn() }))
vi.mock('@/shared/lib/goal', () => ({
  GOAL: 5,
  getProgressToast: vi.fn(() => ({ title: 'Great!', description: '' })),
}))

const mockGenerate = vi.mocked(generate)
const mockGetProgressToast = vi.mocked(getProgressToast)

const FORM_VALUES = {
  jobTitle: 'Engineer',
  company: 'Acme',
  skills: 'TypeScript',
  additionalDetails: '',
}

beforeEach(() => {
  vi.clearAllMocks()
  useLettersStore.setState({ letters: [] })
})

describe('useLetterGeneration', () => {
  it('adds letter and shows success toast on generate', async () => {
    mockGenerate.mockResolvedValue({ content: 'Hello letter', usedFallback: false })

    const { result } = renderHook(() => useLetterGeneration())

    await act(() => result.current.onGenerate(FORM_VALUES))

    await waitFor(() => {
      expect(useLettersStore.getState().letters).toHaveLength(1)
      expect(useLettersStore.getState().letters[0].content).toBe('Hello letter')
      expect(toast.success).toHaveBeenCalled()
    })
  })

  it('shows warning toast when AI falls back to template', async () => {
    mockGenerate.mockResolvedValue({ content: 'Template letter', usedFallback: true })

    const { result } = renderHook(() => useLetterGeneration())

    await act(() => result.current.onGenerate(FORM_VALUES))

    await waitFor(() => {
      expect(toast.warning).toHaveBeenCalledWith('AI unavailable', expect.any(Object))
    })
  })

  it('shows error toast when generation fails', async () => {
    mockGenerate.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useLetterGeneration())

    await act(() => result.current.onGenerate(FORM_VALUES))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Generation failed', expect.any(Object))
      expect(useLettersStore.getState().letters).toHaveLength(0)
    })
  })

  it('updates existing letter on tryAgain', async () => {
    mockGenerate
      .mockResolvedValueOnce({ content: 'First', usedFallback: false })
      .mockResolvedValueOnce({ content: 'Retry', usedFallback: false })

    const { result } = renderHook(() => useLetterGeneration())

    await act(() => result.current.onGenerate(FORM_VALUES))
    await waitFor(() => expect(useLettersStore.getState().letters).toHaveLength(1))

    await act(() => result.current.onTryAgain(FORM_VALUES))
    await waitFor(() => {
      expect(useLettersStore.getState().letters).toHaveLength(1)
      expect(useLettersStore.getState().letters[0].content).toBe('Retry')
    })
  })

  it('aborts ongoing generation on unmount', async () => {
    let resolveFn!: () => void
    mockGenerate.mockImplementation(
      (_, signal) =>
        new Promise((resolve, reject) => {
          resolveFn = () => resolve({ content: 'done', usedFallback: false })
          signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))
        }),
    )

    const { result, unmount } = renderHook(() => useLetterGeneration())

    act(() => {
      result.current.onGenerate(FORM_VALUES)
    })
    unmount()

    resolveFn()
    await waitFor(() => {
      expect(useLettersStore.getState().letters).toHaveLength(0)
    })
  })

  it('passes letters.length + 1 to getProgressToast', async () => {
    mockGenerate.mockResolvedValue({ content: 'Letter', usedFallback: false })
    useLettersStore.setState({
      letters: [
        {
          id: '1',
          jobTitle: 'Dev',
          company: 'X',
          skills: '',
          additionalDetails: '',
          content: '',
          createdAt: '',
        },
      ],
    })

    const { result } = renderHook(() => useLetterGeneration())
    await act(() => result.current.onGenerate(FORM_VALUES))

    await waitFor(() => {
      expect(mockGetProgressToast).toHaveBeenCalledWith(2)
    })
  })
})
