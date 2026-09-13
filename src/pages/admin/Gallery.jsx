import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import FlatCard from '../../components/ui/FlatCard'
import PillButton from '../../components/ui/PillButton'
import Drawer from '../../components/Drawer'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'
import { api } from '../../lib/api'

export default function Gallery() {
  const [editing, setEditing] = useState(null)
  const { push } = useToast()
  const queryClient = useQueryClient()
  const { data: items, isLoading, isError, refetch } = useQuery({ queryKey: ['gallery'], queryFn: api.getGalleryItems })

  const mutation = useMutation({
    mutationFn: (record) => api.saveRecord('gallery', record),
    onSuccess: () => {
      push('Gallery item updated.', { tone: 'success' })
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
      setEditing(null)
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-muted">{items?.length ?? 0} transformation entries</p>
        <PillButton variant="orange" size="sm" onClick={() => setEditing({ label: '' })}>Add Entry</PillButton>
      </div>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="aspect-[3/4] w-full" />)}
        </div>
      )}
      {isError && <ErrorState onRetry={refetch} />}

      {items && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <FlatCard key={item.id} className="overflow-hidden">
              <img src={item.after} alt={item.label} className="aspect-[3/4] w-full object-cover" />
              <div className="p-3">
                <p className="mb-2 truncate text-sm text-white">{item.label}</p>
                <PillButton size="sm" variant="dark" className="w-full justify-center" onClick={() => setEditing(item)}>Edit</PillButton>
              </div>
            </FlatCard>
          ))}
        </div>
      )}

      <Drawer open={!!editing} onClose={() => setEditing(null)} title="Gallery Entry">
        {editing && (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); mutation.mutate(editing) }}>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white" htmlFor="gallery-label">Label</label>
              <input id="gallery-label" defaultValue={editing.label} className="w-full rounded-xl border border-white/10 bg-base px-4 py-3 text-white focus:border-accent" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-white/20 text-xs text-ink-muted">Before photo</div>
              <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-white/20 text-xs text-ink-muted">After photo</div>
            </div>
            <PillButton type="submit" variant="orange" loading={mutation.isPending} className="w-full justify-center">Save Entry</PillButton>
          </form>
        )}
      </Drawer>
    </div>
  )
}
