import { useCountUp } from '../../hooks/useCountUp'

/** Capsule/stadium-shaped stat pill, e.g. "10+ Years Running". */
export default function StatCounter({ value, suffix = '', label }) {
  const { ref, value: animated } = useCountUp(value)
  return (
    <div
      ref={ref}
      className="flex min-w-[9.5rem] flex-col items-center gap-1 rounded-full border border-white/10 bg-base-card px-6 py-4 text-center"
    >
      <span className="flex items-baseline font-display text-3xl leading-none text-accent-light">
        {animated.toLocaleString()}
        {suffix}
        <span className="ml-0.5 -translate-y-2 text-lg text-accent">✳</span>
      </span>
      <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</span>
    </div>
  )
}
