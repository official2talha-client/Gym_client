import { motion } from 'framer-motion'
import SectionWrapper, { RevealItem } from '../../components/ui/SectionWrapper'
import StatCounter from '../../components/ui/StatCounter'
import { statBadges } from '../../data/mockData'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function About() {
  const reduced = useReducedMotion()

  return (
    <SectionWrapper id="about" eyebrow="About the gym" title="Trained here. Transformed here.">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <RevealItem className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=900&auto=format&fit=crop"
            alt="Fit Elegant Gym & Café training floor"
            className="h-full w-full rounded-3xl object-cover"
          />
          <motion.div
            animate={reduced ? {} : { rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute -right-4 -top-4 flex h-24 w-24 items-center justify-center rounded-full border border-accent/30 bg-base-card/90 text-center text-xs font-bold uppercase leading-tight text-accent-light shadow-lg sm:h-28 sm:w-28"
          >
            Est. — Dhaka's Fitness Studio
          </motion.div>
        </RevealItem>

        <div>
          <RevealItem>
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              Sample copy — pending real content. Fit Elegant Gym & Café was built for people who train with intent —
              a serious gym floor, expert coaching, and a café to refuel, all under one roof in the heart of Dhaka.
              This is where consistency turns into results.
            </p>
          </RevealItem>
          <RevealItem>
            <div className="mt-8 flex flex-wrap gap-4">
              {statBadges.map((s) => (
                <StatCounter key={s.id} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </div>
          </RevealItem>
        </div>
      </div>
    </SectionWrapper>
  )
}
