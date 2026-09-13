import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import FlatCard from '../../components/ui/FlatCard'
import PillButton from '../../components/ui/PillButton'
import Drawer from '../../components/Drawer'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'
import { api } from '../../lib/api'

export default function Faqs() {
  const [editing, setEditing] = useState(null)
  const { push } = useToast()
  const queryClient = useQueryClient()
  const { data: faqs, isLoading, isError, refetch } = useQuery({ queryKey: ['faqs'], queryFn: api.getFaqs })

  const mutation = useMutation({
    mutationFn: (record) => api.saveRecord('faqs', record),
    onSuccess: () => {
      push('FAQ saved.', { tone: 'success' })
      queryClient.invalidateQueries({ queryKey: ['faqs'] })
      setEditing(null)
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-muted">{faqs?.length ?? 0} questions</p>
        <PillButton variant="orange" size="sm" onClick={() => setEditing({ question: '', answer: '' })}>New FAQ</PillButton>
      </div>

      {isLoading && <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-16 w-full" />)}</div>}
      {isError && <ErrorState onRetry={refetch} />}

      {faqs && (
        <div className="space-y-3">
          {faqs.map((f) => (
            <FlatCard key={f.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-white">{f.question}</p>
              <PillButton size="sm" variant="dark" onClick={() => setEditing(f)}>Edit</PillButton>
            </FlatCard>
          ))}
        </div>
      )}

      <Drawer open={!!editing} onClose={() => setEditing(null)} title="FAQ">
        {editing && (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); mutation.mutate(editing) }}>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white" htmlFor="faq-question">Question</label>
              <input id="faq-question" defaultValue={editing.question} className="w-full rounded-xl border border-white/10 bg-base px-4 py-3 text-white focus:border-accent" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white" htmlFor="faq-answer">Answer</label>
              <textarea id="faq-answer" rows={4} defaultValue={editing.answer} className="w-full resize-none rounded-xl border border-white/10 bg-base px-4 py-3 text-white focus:border-accent" />
            </div>
            <PillButton type="submit" variant="orange" loading={mutation.isPending} className="w-full justify-center">Save FAQ</PillButton>
          </form>
        )}
      </Drawer>
    </div>
  )
}
