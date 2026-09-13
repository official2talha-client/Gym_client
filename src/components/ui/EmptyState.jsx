import PillButton from './PillButton'

export function EmptyState({ title = 'Nothing here yet', description, actionLabel, onAction, icon }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-white/15 bg-base-card/50 px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-2xl">
        {icon ?? '＋'}
      </div>
      <h3 className="mb-1 font-body text-lg font-semibold normal-case text-white">{title}</h3>
      {description && <p className="mb-6 max-w-sm text-sm text-ink-muted">{description}</p>}
      {actionLabel && onAction && (
        <PillButton variant="orange" size="sm" onClick={onAction}>
          {actionLabel}
        </PillButton>
      )}
    </div>
  )
}

export function ErrorState({ title = 'Something went wrong', description = "That didn't load correctly. Try again.", onRetry }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-base-card px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl text-accent-light">
        !
      </div>
      <h3 className="mb-1 font-body text-lg font-semibold normal-case text-white">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-ink-muted">{description}</p>
      {onRetry && (
        <PillButton variant="dark" size="sm" onClick={onRetry}>
          Retry
        </PillButton>
      )}
    </div>
  )
}
