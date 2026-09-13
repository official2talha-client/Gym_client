import { Component } from 'react'
import PillButton from './ui/PillButton'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // In a real deployment this would report to an error-tracking service.
    console.error('Unhandled UI error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-base px-5 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-3xl text-accent-light">!</div>
          <h1 className="font-display text-3xl text-white sm:text-4xl">Something went wrong</h1>
          <p className="mt-3 max-w-sm text-ink-muted">
            An unexpected error occurred while rendering this page. Try reloading.
          </p>
          <div className="mt-8">
            <PillButton variant="orange" onClick={() => window.location.reload()}>Reload Page</PillButton>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
