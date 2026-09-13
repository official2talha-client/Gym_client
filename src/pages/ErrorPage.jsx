import PillButton from '../components/ui/PillButton'

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 pt-28 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-3xl text-accent-light" aria-hidden="true">
        !
      </div>
      <h1 className="font-display text-3xl text-white sm:text-4xl">Something went wrong</h1>
      <p className="mt-3 max-w-sm text-ink-muted">
        An unexpected error occurred. Try reloading the page, or head back to the homepage.
      </p>
      <div className="mt-8 flex gap-4">
        <PillButton variant="dark" onClick={() => window.location.reload()}>Reload</PillButton>
        <PillButton to="/" variant="orange">Back to Home</PillButton>
      </div>
    </div>
  )
}
