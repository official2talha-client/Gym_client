import clsx from 'clsx'

/**
 * Flat dark surface -- not glass. Thin warm border, soft ambient shadow,
 * minimal-to-zero blur. This is the base card used across marketing,
 * admin, and member surfaces.
 */
export default function FlatCard({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag
      className={clsx(
        'rounded-2xl border border-white/10 bg-base-card shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
