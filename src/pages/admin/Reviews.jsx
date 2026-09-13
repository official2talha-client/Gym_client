import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import FlatCard from '../../components/ui/FlatCard'
import { Badge } from '../../components/ui/Badge'
import PillButton from '../../components/ui/PillButton'
import Drawer from '../../components/Drawer'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'
import { api } from '../../lib/api'
import { usePagination } from '../../hooks/usePagination'

export default function Reviews() {
  const [editing, setEditing] = useState(null)
  const { push } = useToast()
  const queryClient = useQueryClient()
  const { data: testimonials, isLoading, isError, refetch } = useQuery({ queryKey: ['testimonials'], queryFn: api.getTestimonials })
  const { visible, hasMore, loadMore } = usePagination(testimonials ?? [], 10)

  const mutation = useMutation({
    mutationFn: (record) => api.saveRecord('testimonials', record),
    onSuccess: () => {
      push('Review updated.', { tone: 'success' })
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
      setEditing(null)
    },
  })

  return (
    <div className="space-y-6">
      {isLoading && (
        <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-20 w-full" />)}</div>
      )}
      {isError && <ErrorState onRetry={refetch} />}

      {testimonials && (
        <div className="space-y-3">
          {visible.map((t) => (
            <FlatCard key={t.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <p className="font-semibold text-white">{t.name}</p>
                  {t.isSample && <Badge tone="orange">Sample — pending real review</Badge>}
                </div>
                <p className="max-w-lg text-sm text-ink-muted">"{t.quote}"</p>
              </div>
              <PillButton size="sm" variant="dark" onClick={() => setEditing(t)}>Edit</PillButton>
            </FlatCard>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center">
          <PillButton variant="dark" onClick={loadMore}>Load More</PillButton>
        </div>
      )}

      <Drawer open={!!editing} onClose={() => setEditing(null)} title="Edit Review">
        {editing && (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              mutation.mutate(editing)
            }}
          >
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white" htmlFor="review-name">Member name</label>
              <input id="review-name" defaultValue={editing.name} className="w-full rounded-xl border border-white/10 bg-base px-4 py-3 text-white focus:border-accent" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white" htmlFor="review-quote">Quote</label>
              <textarea id="review-quote" rows={4} defaultValue={editing.quote} className="w-full resize-none rounded-xl border border-white/10 bg-base px-4 py-3 text-white focus:border-accent" />
            </div>
            <PillButton type="submit" variant="orange" loading={mutation.isPending} className="w-full justify-center">Save Review</PillButton>
          </form>
        )}
      </Drawer>
    </div>
  )
}
