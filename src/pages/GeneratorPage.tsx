import { GeneratorProvider } from '@/features/generator/GeneratorContext'
import { GeneratorForm } from '@/features/generator/GeneratorForm'
import { useLetterGeneration } from '@/features/generator/hooks/useLetterGeneration'
import { ProgressBanner } from '@/features/letters/ProgressBanner'
import { Layout } from '@/shared/ui/layout/Layout'

export function GeneratorPage() {
  const { isGenerating, generatedContent, lettersCount, onGenerate, onTryAgain } =
    useLetterGeneration()

  return (
    <Layout>
      <GeneratorProvider value={{ isGenerating, generatedContent, onGenerate, onTryAgain }}>
        <GeneratorForm />
      </GeneratorProvider>

      <ProgressBanner count={lettersCount} showCreateButton={false} />
    </Layout>
  )
}
