import clsx from 'clsx'

export function Badge({ children, tone = 'neutral', className }) {
  const tones = {
    neutral: 'bg-white/5 text-ink-muted border-white/10',
    orange: 'bg-accent/15 text-accent-light border-accent/30',
    solid: 'bg-accent text-white border-transparent',
  }
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}

/** Corner ribbon badge for pricing / highlighted cards, e.g. "Most Popular". */
export function RibbonBadge({ children }) {
  return (
    <div className="absolute -top-3 right-6 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-accent/30">
      {children}
    </div>
  )
}
