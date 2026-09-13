import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Signature diagonal marquee ribbon -- the site's "wow" moment. Deploy at
 * most 2-3 times per page (between Hero/About, and between Gallery/FAQ) or
 * it loses impact. Respects prefers-reduced-motion by freezing the scroll.
 */
export default function MarqueeRibbon({ text = 'TRANSFORM YOUR BODY', tilt = -7 }) {
  const reduced = useReducedMotion()
  const repeated = Array.from({ length: 6 }).map((_, i) => (
    <span key={i} className="mx-6 inline-flex items-center">
      {text}
      <span className="mx-6 text-accent">✳</span>
    </span>
  ))

  return (
    <div className="relative my-4 overflow-hidden py-2" style={{ transform: `rotate(${tilt}deg)` }} aria-hidden="true">
      <div className="flex w-full items-center border-y-2 border-white bg-accent py-3">
        <div className={`flex whitespace-nowrap font-display text-2xl text-white sm:text-3xl ${reduced ? '' : 'animate-marquee'}`}>
          {repeated}
          {!reduced && repeated}
        </div>
      </div>
    </div>
  )
}
