import SectionWrapper, { RevealItem } from '../../components/ui/SectionWrapper'
import { Badge } from '../../components/ui/Badge'
import { amenities } from '../../data/mockData'

export default function Amenities() {
  return (
    <SectionWrapper
      id="amenities"
      eyebrow="What's included"
      title="Everything you need to train seriously"
      subtitle="Sample copy — pending real content. Four pillars, one membership."
    >
      <div className="divide-y divide-white/10 border-y border-white/10">
        {amenities.map((a) => (
          <RevealItem key={a.id} className="group flex items-center gap-6 py-7 sm:gap-10">
            <span className="w-12 shrink-0 font-display text-3xl text-accent sm:w-16 sm:text-4xl">{a.number}</span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-body text-lg font-bold normal-case text-white sm:text-xl">{a.title}</h3>
                <div className="hidden gap-2 sm:flex">
                  {a.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
              <p className="mt-1.5 max-w-xl text-sm text-ink-muted sm:text-base">{a.description}</p>
            </div>

            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform duration-200 group-hover:rotate-45 sm:h-12 sm:w-12"
              aria-hidden="true"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </RevealItem>
        ))}
      </div>
    </SectionWrapper>
  )
}
