import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import FlatCard from '../../components/ui/FlatCard'
import { Badge } from '../../components/ui/Badge'
import PillButton from '../../components/ui/PillButton'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'
import { api } from '../../lib/api'
import { formatBDT } from '../../lib/constants'

const STATUS_TONE = { pending: 'orange', verified: 'neutral', rejected: 'neutral' }

export default function Payments() {
  const { push } = useToast()
  const queryClient = useQueryClient()
  const { data: transactions, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-bkash'],
    queryFn: api.getBkashTransactions,
  })

  const mutation = useMutation({
    mutationFn: ({ id, status }) => api.saveRecord('bkashTransactions', { id, status }),
    onSuccess: (_, variables) => {
      push(`Transaction marked ${variables.status}.`, { tone: 'success' })
      queryClient.invalidateQueries({ queryKey: ['admin-bkash'] })
    },
  })

  return (
    <div className="space-y-6">
      <p className="text-sm text-ink-muted">
        bKash is the only accepted payment method. This screen reflects the existing QR/manual-verification flow — no
        payment gateway is integrated here.
      </p>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <FlatCard className="space-y-5 p-6 sm:p-7">
          <h2 className="font-body text-lg font-bold normal-case text-white">bKash configuration</h2>
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-white/20 bg-base p-8">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-32 w-32 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs text-ink-muted">
                QR code image
              </div>
              <p className="text-xs text-ink-muted">Uploaded via Cloudinary — placeholder shown until the client provides the real QR.</p>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-white" htmlFor="merchant-number">Merchant number</label>
            <input id="merchant-number" defaultValue="01XXXXXXXXX" className="w-full rounded-xl border border-white/10 bg-base px-4 py-3 text-white focus:border-accent" />
          </div>
          <PillButton variant="orange" size="sm" className="w-full justify-center">Save Configuration</PillButton>
        </FlatCard>

        <FlatCard className="p-6 sm:p-7">
          <h2 className="mb-5 font-body text-lg font-bold normal-case text-white">Submitted Transaction IDs</h2>
          {isLoading && (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
            </div>
          )}
          {isError && <ErrorState onRetry={refetch} />}
          {transactions && (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-base p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-white">{tx.member}</p>
                    <p className="text-xs text-ink-muted">TrxID: {tx.trxId} · {tx.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-accent-light">{formatBDT(tx.amount)}</span>
                    <Badge tone={STATUS_TONE[tx.status]}>{tx.status}</Badge>
                    {tx.status === 'pending' && (
                      <div className="flex gap-2">
                        <PillButton size="sm" variant="orange" onClick={() => mutation.mutate({ id: tx.id, status: 'verified' })}>Verify</PillButton>
                        <PillButton size="sm" variant="dark" onClick={() => mutation.mutate({ id: tx.id, status: 'rejected' })}>Reject</PillButton>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </FlatCard>
      </div>
    </div>
  )
}
