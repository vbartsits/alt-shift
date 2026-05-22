import { Suspense } from 'react'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from '@/shared/lib/ThemeContext'
import { router } from './router'
import { PageLoader } from './ui/PageLoader'
import { ToasterWithTheme } from './ui/ToasterWithTheme'

export function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
      <ToasterWithTheme />
    </ThemeProvider>
  )
}
