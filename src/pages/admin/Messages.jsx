import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import FlatCard from '../../components/ui/FlatCard'
import { Badge } from '../../components/ui/Badge'
import PillButton from '../../components/ui/PillButton'
import Drawer from '../../components/Drawer'
import { Skeleton } from '../../components/ui/Skeleton'
import { EmptyState, ErrorState } from '../../components/ui/EmptyState'
import { api } from '../../lib/api'

export default function Messages() {
  const [active, setActive] = useState(null)
  const { data: messages, isLoading, isError, refetch } = useQuery({ queryKey: ['admin-messages'], queryFn: api.getContactMessages })

  return (
    <div className="space-y-6">
      {isLoading && <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-20 w-full" />)}</div>}
      {isError && <ErrorState onRetry={refetch} />}
      {messages && messages.length === 0 && <EmptyState title="No messages yet" description="Contact form submissions will appear here." />}

      {messages && messages.length > 0 && (
        <div className="space-y-3">
          {messages.map((m) => (
            <FlatCard key={m.id} as="button" onClick={() => setActive(m)} className="flex w-full flex-col gap-2 p-5 text-left sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <p className="font-semibold text-white">{m.name}</p>
                  {m.status === 'unread' && <Badge tone="orange">Unread</Badge>}
                </div>
                <p className="truncate text-sm text-ink-muted">{m.message}</p>
              </div>
              <span className="shrink-0 text-xs text-ink-muted">{m.time}</span>
            </FlatCard>
          ))}
        </div>
      )}

      <Drawer open={!!active} onClose={() => setActive(null)} title="Message">
        {active && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">From</p>
              <p className="text-white">{active.name}</p>
              <p className="text-sm text-ink-muted">{active.phone}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">Message</p>
              <p className="text-white">{active.message}</p>
            </div>
            <PillButton href={`https://wa.me/`} target="_blank" variant="orange" className="w-full justify-center">Reply on WhatsApp</PillButton>
          </div>
        )}
      </Drawer>
    </div>
  )
}
