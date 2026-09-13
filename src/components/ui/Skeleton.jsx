import clsx from 'clsx'

/**
 * Base skeleton block. Always pass an explicit width/height (via className)
 * so the space is reserved before content loads -- this is what prevents
 * layout shift, not just the shimmer effect.
 */
export function Skeleton({ className }) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-lg bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%]',
        className
      )}
      role="status"
      aria-label="Loading"
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-base-card p-6">
      <Skeleton className="mb-4 h-40 w-full" />
      <Skeleton className="mb-2 h-5 w-2/3" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-base-card p-4">
      <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
      <div className="flex-1">
        <Skeleton className="mb-2 h-4 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}
