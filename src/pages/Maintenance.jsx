import { GYM_SHORT_NAME } from '../lib/constants'

export default function Maintenance() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 pt-28 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-3xl text-accent-light" aria-hidden="true">
        ⚙
      </div>
      <h1 className="font-display text-3xl text-white sm:text-4xl">We'll be right back</h1>
      <p className="mt-3 max-w-sm text-ink-muted">
        {GYM_SHORT_NAME} is currently undergoing scheduled maintenance. Please check back shortly.
      </p>
    </div>
  )
}
