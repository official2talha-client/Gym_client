import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import FlatCard from '../../components/ui/FlatCard'
import { Badge } from '../../components/ui/Badge'
import PillButton from '../../components/ui/PillButton'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'
import { api } from '../../lib/api'
import { formatBDT } from '../../lib/constants'

export default function MemberPayments() {
  const { push } = useToast()
  const queryClient = useQueryClient()
  const [trxId, setTrxId] = useState('')
  const { data: payments, isLoading, isError, refetch } = useQuery({ queryKey: ['my-payments'], queryFn: api.getMyPayments })

  const mutation = useMutation({
    mutationFn: (values) => api.saveRecord('myPayments', values),
    onSuccess: () => {
      push('Transaction ID submitted for verification.', { tone: 'success' })
      queryClient.invalidateQueries({ queryKey: ['my-payments'] })
      setTrxId('')
    },
  })

  return (
    <div className="space-y-6">
      <FlatCard className="p-6 sm:p-8">
        <h2 className="mb-2 font-body text-lg font-bold normal-case text-white">Pay with bKash</h2>
        <p className="mb-5 text-sm text-ink-muted">Scan the QR code or send to the merchant number, then submit your Transaction ID below for manual verification.</p>
        <div className="mb-5 flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex h-32 w-32 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs text-ink-muted">QR code</div>
          <div className="text-sm text-ink-muted">
            <p className="text-white">Merchant number</p>
            <p>01XXXXXXXXX (sample)</p>
          </div>
        </div>
        <form
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault()
            if (trxId) mutation.mutate({ trxId })
          }}
        >
          <label htmlFor="trx-id" className="sr-only">bKash Transaction ID</label>
          <input
            id="trx-id"
            required
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
            placeholder="Enter your bKash Transaction ID"
            className="w-full flex-1 rounded-xl border border-white/10 bg-base px-4 py-3 text-white placeholder:text-ink-muted/60 focus:border-accent"
          />
          <PillButton type="submit" variant="orange" loading={mutation.isPending} size="sm">Submit</PillButton>
        </form>
      </FlatCard>

      <FlatCard className="p-6 sm:p-8">
        <h2 className="mb-5 font-body text-lg font-bold normal-case text-white">Payment history</h2>
        {isLoading && <Skeleton className="h-32 w-full" />}
        {isError && <ErrorState onRetry={refetch} />}
        {payments && (
          <div className="space-y-3">
            {payments.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-base p-4 text-sm">
                <div>
                  <p className="text-white">TrxID: {p.trxId}</p>
                  <p className="text-xs text-ink-muted">{new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-accent-light">{formatBDT(p.amount)}</span>
                  <Badge tone={p.status === 'verified' ? 'orange' : 'neutral'}>{p.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </FlatCard>
    </div>
  )
}
