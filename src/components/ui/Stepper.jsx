import clsx from 'clsx'

export default function Stepper({ steps, currentStep }) {
  return (
    <ol className="flex w-full items-center">
      {steps.map((step, i) => {
        const isComplete = i < currentStep
        const isActive = i === currentStep
        return (
          <li key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={clsx(
                  'flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-colors',
                  isComplete && 'border-accent bg-accent text-white',
                  isActive && !isComplete && 'border-accent text-accent-light',
                  !isActive && !isComplete && 'border-white/15 text-ink-muted'
                )}
                aria-current={isActive ? 'step' : undefined}
              >
                {isComplete ? '✓' : i + 1}
              </div>
              <span className={clsx('text-xs', isActive ? 'text-white' : 'text-ink-muted')}>{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={clsx('mx-2 h-px flex-1', isComplete ? 'bg-accent' : 'bg-white/10')} />
            )}
          </li>
        )
      })}
    </ol>
  )
}
