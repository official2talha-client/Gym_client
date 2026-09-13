import { motion } from 'framer-motion'
import clsx from 'clsx'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Wraps every marketing/admin/member section with consistent vertical
 * rhythm and a shared scroll-reveal stagger (60-80ms per child). Use this
 * instead of hand-rolling spacing/animation per section.
 */
export default function SectionWrapper({ id, className, children, eyebrow, title, subtitle, align = 'left' }) {
  const reduced = useReducedMotion()

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : 0.07 },
    },
  }
  const item = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section id={id} className={clsx('container-page py-16 sm:py-20 lg:py-28', className)}>
      {(eyebrow || title) && (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={container}
          className={clsx('mb-10 sm:mb-14', align === 'center' && 'mx-auto max-w-2xl text-center')}
        >
          {eyebrow && (
            <motion.p variants={item} className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-light">
              {eyebrow}
            </motion.p>
          )}
          {title && (
            <motion.h2 variants={item} className="font-display text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p variants={item} className="mt-4 max-w-xl text-base text-ink-muted sm:text-lg">
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      )}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={container}>
        {children}
      </motion.div>
    </section>
  )
}

export function RevealItem({ children, className }) {
  const reduced = useReducedMotion()
  const item = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  )
}
