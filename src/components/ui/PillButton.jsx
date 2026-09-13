import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

const VARIANT_STYLES = {
  light: 'bg-white text-base hover:bg-white/90',
  dark: 'bg-base-card text-white border border-white/15 hover:bg-base-cardhi',
  orange: 'bg-accent text-white hover:bg-accent-light',
}

const ARROW_BG = {
  light: 'bg-accent text-white',
  dark: 'bg-accent text-white',
  orange: 'bg-white text-accent',
}

/**
 * The site's signature CTA: a pill with a label, fused to a small solid
 * circle containing a diagonal arrow. Used for every call-to-action across
 * all 40+ screens -- do not create alternate button shapes for primary CTAs.
 *
 * Renders as a <Link> when `to` is provided, an <a> when `href` is provided,
 * or a <button> otherwise. Always exposes disabled/loading states.
 */
const PillButton = forwardRef(function PillButton(
  {
    children,
    variant = 'orange',
    to,
    href,
    onClick,
    type = 'button',
    disabled = false,
    loading = false,
    size = 'md',
    className,
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading

  const sizeStyles = size === 'sm' ? 'text-sm py-2 pl-5 pr-2' : 'text-base py-3 pl-7 pr-2'
  const arrowSize = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9'

  const content = (
    <span
      className={clsx(
        'group inline-flex items-center gap-3 rounded-full font-semibold transition-all duration-200',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light',
        sizeStyles,
        VARIANT_STYLES[variant],
        isDisabled
          ? 'opacity-50 cursor-not-allowed pointer-events-none'
          : 'hover:scale-[1.03] active:scale-[0.98] cursor-pointer',
        className
      )}
    >
      <span>{loading ? 'Please wait…' : children}</span>
      <span
        className={clsx(
          'flex shrink-0 items-center justify-center rounded-full transition-transform duration-200',
          arrowSize,
          ARROW_BG[variant],
          !isDisabled && 'group-hover:rotate-45'
        )}
        aria-hidden="true"
      >
        {loading ? (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </span>
  )

  if (to && !isDisabled) {
    return (
      <Link to={to} ref={ref} className="inline-block" {...rest}>
        {content}
      </Link>
    )
  }

  if (href && !isDisabled) {
    return (
      <a href={href} ref={ref} className="inline-block" target={rest.target} rel={rest.target ? 'noopener noreferrer' : undefined} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className="inline-block text-left"
      {...rest}
    >
      {content}
    </button>
  )
})

export default PillButton
