import type { ReactNode } from 'react'
import { Component } from 'react'
import { Button } from './buttons/Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  handleReset = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state

    if (error) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-heading text-4xl tracking-[-0.02em] text-text-strong">
              Something went wrong
            </h1>
            <p className="text-lg leading-7 text-text-secondary">
              An unexpected error occurred. You can try reloading the page.
            </p>
            {import.meta.env.DEV && (
              <pre className="mt-4 max-w-lg overflow-auto rounded-xl bg-card px-6 py-4 text-left text-sm text-error">
                {error.message}
              </pre>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={this.handleReset}>
              Try again
            </Button>
            <Button onClick={() => window.location.reload()}>Reload page</Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
