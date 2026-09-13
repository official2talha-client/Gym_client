import { forwardRef } from 'react'
import clsx from 'clsx'

const FormField = forwardRef(function FormField({ label, id, error, type = 'text', className, ...rest }, ref) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-white">{label}</label>
      <input
        id={id}
        type={type}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={clsx(
          'w-full rounded-xl border bg-base px-4 py-3 text-white placeholder:text-ink-muted/60 transition-colors focus:border-accent',
          error ? 'border-accent-light' : 'border-white/10'
        )}
        {...rest}
      />
      {error && <p id={`${id}-error`} className="mt-1 text-xs text-accent-light">{error}</p>}
    </div>
  )
})

export default FormField
