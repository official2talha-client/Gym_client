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

export default function Coupons() {
  const [editing, setEditing] = useState(null)
  const { push } = useToast()
  const queryClient = useQueryClient()
  const { data: coupons, isLoading, isError, refetch } = useQuery({ queryKey: ['admin-coupons'], queryFn: api.getCoupons })

  const mutation = useMutation({
    mutationFn: (record) => api.saveRecord('coupons', record),
    onSuccess: () => {
      push('Coupon saved.', { tone: 'success' })
      queryClient.invalidateQueries({ queryKey: ['admin-coupons'] })
      setEditing(null)
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-muted">{coupons?.length ?? 0} coupons</p>
        <PillButton variant="orange" size="sm" onClick={() => setEditing({ code: '', discount: '' })}>New Coupon</PillButton>
      </div>

      {isLoading && <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-16 w-full" />)}</div>}
      {isError && <ErrorState onRetry={refetch} />}

      {coupons && (
        <div className="space-y-3">
          {coupons.map((c) => (
            <FlatCard key={c.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="rounded-lg border border-white/10 bg-base px-3 py-1.5 font-mono text-sm text-accent-light">{c.code}</span>
                <span className="text-sm text-ink-muted">{c.discount} off · {c.usage} used</span>
                <Badge tone={c.status === 'active' ? 'orange' : 'neutral'}>{c.status}</Badge>
              </div>
              <PillButton size="sm" variant="dark" onClick={() => setEditing(c)}>Edit</PillButton>
            </FlatCard>
          ))}
        </div>
      )}

      <Drawer open={!!editing} onClose={() => setEditing(null)} title="Coupon">
        {editing && (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); mutation.mutate(editing) }}>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white" htmlFor="coupon-code">Code</label>
              <input id="coupon-code" defaultValue={editing.code} className="w-full rounded-xl border border-white/10 bg-base px-4 py-3 font-mono text-white focus:border-accent" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white" htmlFor="coupon-discount">Discount</label>
              <input id="coupon-discount" defaultValue={editing.discount} placeholder="e.g. 10%" className="w-full rounded-xl border border-white/10 bg-base px-4 py-3 text-white focus:border-accent" />
            </div>
            <PillButton type="submit" variant="orange" loading={mutation.isPending} className="w-full justify-center">Save Coupon</PillButton>
          </form>
        )}
      </Drawer>
    </div>
  )
}
