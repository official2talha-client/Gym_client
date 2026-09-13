import { useQuery } from '@tanstack/react-query'
import FlatCard from '../../components/ui/FlatCard'
import { Skeleton } from '../../components/ui/Skeleton'
import { EmptyState, ErrorState } from '../../components/ui/EmptyState'
import { api } from '../../lib/api'

export default function MemberNotifications() {
  const { data: notifications, isLoading, isError, refetch } = useQuery({ queryKey: ['notifications'], queryFn: api.getNotifications })

  return (
    <div className="space-y-3">
      {isLoading && <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-16 w-full" />)}</div>}
      {isError && <ErrorState onRetry={refetch} />}
      {notifications && notifications.length === 0 && <EmptyState title="You're all caught up" description="New notifications will show up here." />}
      {notifications && notifications.map((n) => (
        <FlatCard key={n.id} className={`flex items-center justify-between gap-4 p-4 ${!n.read ? 'border-accent/30' : ''}`}>
          <div className="flex items-center gap-3">
            {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />}
            <p className="text-sm text-white">{n.text}</p>
          </div>
          <span className="shrink-0 text-xs text-ink-muted">{n.time}</span>
        </FlatCard>
      ))}
    </div>
  )
}
