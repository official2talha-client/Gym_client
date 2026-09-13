import { useQuery } from '@tanstack/react-query'
import SectionWrapper, { RevealItem } from '../../components/ui/SectionWrapper'
import FlatCard from '../../components/ui/FlatCard'
import { SkeletonCard } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import { api } from '../../lib/api'

function Stars({ count }) {
  return (
    <div className="flex gap-1 text-accent" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill={i < count ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.2">
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const { data: testimonials, isLoading, isError, refetch } = useQuery({
    queryKey: ['testimonials'],
    queryFn: api.getTestimonials,
  })

  return (
    <div className="">
    <SectionWrapper
      id="testimonials"
      eyebrow="Member stories"
      title="Real people, real progress"
    >
      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {isError && <ErrorState onRetry={refetch} />}

      {testimonials && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem key={t.id}>
              <FlatCard className="flex h-full flex-col p-7">
                <Stars count={t.rating} />
                <p className="mt-4 flex-1 text-base leading-relaxed text-white">"{t.quote}"</p>
                <p className="mt-5 text-sm font-semibold text-ink-muted">{t.name}</p>
              </FlatCard>
            </RevealItem>
          ))}
        </div>
      )}
    </SectionWrapper>
    </div>
  )
}
