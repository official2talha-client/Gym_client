import { motion } from 'framer-motion'
import PillButton from '../../components/ui/PillButton'
import GaugeBadge from '../../components/ui/GaugeBadge'
import { HERO_VIDEO, HERO_IMAGE, GYM_TAGLINE } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {useFilterPlansQuery} from '../../api/planApi.js'



const HEADLINE_LINES = ['BUILD THE BODY', 'YOU WERE MEANT FOR']

const avatarSeeds = [
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=100&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop',
]

export default function Hero() {

  const reduced = useReducedMotion()

  const lineVariants = {
    hidden: { opacity: 0, y: 40 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: reduced ? 0 : i * 0.12, duration: 0.6, ease: 'easeOut' },
    }),
  }

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-base pt-24">
      {/* Background media */}
      <div className="absolute inset-0">
        {HERO_VIDEO ? (
          <video
            className="h-full w-full object-cover"
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img src={HERO_IMAGE} alt="Members training on the gym floor" className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/70 to-base/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-base/60 via-transparent to-transparent" />
      </div>

      {/* Ghost watermark */}
      <span
        className="ghost-word absolute left-1/2 top-[18%] -translate-x-1/2 text-[22vw] sm:text-[16vw]"
        aria-hidden="true"
      >
        FITNESS
      </span>

      <div className="container-page relative z-10 w-full pb-28 sm:pb-32">
        <h1 className="max-w-4xl font-display text-[13vw] leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-8xl">
          {HEADLINE_LINES.map((line, i) => (
            <motion.span
              key={line}
              custom={i}
              initial="hidden"
              animate="show"
              variants={lineVariants}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.32, duration: 0.6 }}
          className="mt-6 max-w-md text-base text-ink-muted sm:text-lg"
        >
          {GYM_TAGLINE}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.44, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <PillButton to="/plans" variant="light">View Membership Plans</PillButton>
          <PillButton to="/exercise" variant="orange">Demo Exercise Videos</PillButton>
        </motion.div>
      </div>

      {/* Floating stat card, bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 0.6, duration: 0.6 }}
        className="absolute bottom-8 left-5 z-10 hidden items-center gap-3 rounded-2xl border border-white/10 bg-base-card/90 px-5 py-4 shadow-xl backdrop-blur-sm sm:flex lg:left-10"
      >
        <div className="flex -space-x-3">
          {avatarSeeds.map((src, i) => (
            <img key={i} src={src} alt="" className="h-9 w-9 rounded-full border-2 border-base-card object-cover" />
          ))}
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-base-card bg-accent text-xs font-bold text-white">
            +1.2k
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Members training</p>
          <p className="text-xs text-ink-muted">across Dhaka</p>
        </div>
      </motion.div>

      {/* Floating rating gauge, bottom-right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 0.7, duration: 0.6 }}
        className="absolute bottom-8 right-5 z-10 hidden items-center gap-3 rounded-2xl border border-white/10 bg-base-card/90 px-5 py-4 shadow-xl backdrop-blur-sm sm:flex lg:right-10"
      >
        <GaugeBadge percent={98} size={64} strokeWidth={6} centerLabel="4.9" />
        <div>
          <p className="text-sm font-semibold text-white">Member rating</p>
          <p className="text-xs text-ink-muted">from 300+ reviews</p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 sm:bottom-4" aria-hidden="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={reduced ? '' : 'animate-chevronBounce'}
        >
          <path d="M4 7L10 13L16 7" stroke="#B8ADA6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
