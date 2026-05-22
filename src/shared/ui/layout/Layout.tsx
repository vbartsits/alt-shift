import type { ReactNode } from 'react'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen px-4 sm:px-6">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-bg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-text focus:ring-2 focus:ring-primary focus:outline-none"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex max-w-(--width-layout) flex-col gap-8 pb-30 pt-8">
        <Header />
        <main id="main-content">{children}</main>
      </div>
    </div>
  )
}
