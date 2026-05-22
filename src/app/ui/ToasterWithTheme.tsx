import { useTheme } from '@/shared/lib/ThemeContext'
import { Toaster } from '@/shared/ui/sonner'

export function ToasterWithTheme() {
  const { isDark } = useTheme()

  return <Toaster richColors position="top-right" theme={isDark ? 'dark' : 'light'} />
}
