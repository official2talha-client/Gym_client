import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import SectionWrapper, { RevealItem } from '../../components/ui/SectionWrapper'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import Modal from '../../components/ui/Modal'
import PillButton from '../../components/ui/PillButton'
import { api } from '../../lib/api'
import { usePagination } from '../../hooks/usePagination'

export default function Gallery() {
  const [active, setActive] = useState(null)
  const { data: items, isLoading, isError, refetch } = useQuery({
    queryKey: ['gallery'],
    queryFn: api.getGalleryItems,
  })
  const { visible, hasMore, loadMore } = usePagination(items ?? [], 8)

  return (
    <SectionWrapper
      id="gallery"
      eyebrow="Transformation gallery"
      title="Progress you can see"
      subtitle="Sample imagery shown below — real member transformations to be added by the client."
    >
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="aspect-[3/4] w-full" />)}
        </div>
      )}

      {isError && <ErrorState onRetry={refetch} />}

      {items && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((item) => (
            <RevealItem key={item.id}>
              <button
                onClick={() => setActive(item)}
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10"
              >
                <img src={item.after} alt={`${item.label} — after`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4">
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                </div>
              </button>
            </RevealItem>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <PillButton variant="dark" onClick={loadMore}>Load More</PillButton>
        </div>
      )}

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.label} size="lg">
        {active && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-muted">Before</p>
              <img src={active.before} alt={`${active.label} — before`} className="aspect-[3/4] w-full rounded-xl object-cover" />
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-accent-light">After</p>
              <img src={active.after} alt={`${active.label} — after`} className="aspect-[3/4] w-full rounded-xl object-cover" />
            </div>
          </div>
        )}
      </Modal>
    </SectionWrapper>
  )
}
