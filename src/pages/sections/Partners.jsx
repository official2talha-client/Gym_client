import { useQuery } from '@tanstack/react-query'
import SectionWrapper, { RevealItem } from '../../components/ui/SectionWrapper'
import { api } from '../../lib/api'

export default function Partners() {
  const { data: partners } = useQuery({ queryKey: ['partners'], queryFn: api.getPartners })

  return (
    <SectionWrapper id="partners" className="py-12 sm:py-16">
      <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">
        Trusted by teams & partners across Dhaka
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-70">
        {(partners ?? []).map((p) => (
          <RevealItem key={p.id} className="font-display text-lg tracking-wide text-white/60 sm:text-xl">
            {p.name}
          </RevealItem>
        ))}
      </div>
    </SectionWrapper>
  )
}
