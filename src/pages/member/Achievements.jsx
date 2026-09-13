import { useQuery } from '@tanstack/react-query'
import FlatCard from '../../components/ui/FlatCard'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import { api } from '../../lib/api'

export default function MemberAchievements() {
  const { data: achievements, isLoading, isError, refetch } = useQuery({ queryKey: ['achievements'], queryFn: api.getAchievements })

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-32 w-full" />)}
      </div>
    )
  }
  if (isError) return <ErrorState onRetry={refetch} />

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {achievements.map((a) => (
        <FlatCard key={a.id} className={`flex flex-col items-center gap-3 p-6 text-center ${!a.earned && 'opacity-40'}`}>
          <div className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl ${a.earned ? 'bg-accent/15 text-accent-light' : 'bg-white/5 text-ink-muted'}`}>
            🏆
          </div>
          <p className="text-sm font-semibold text-white">{a.title}</p>
          <p className="text-xs text-ink-muted">{a.earned ? 'Earned' : 'Locked'}</p>
        </FlatCard>
      ))}
    </div>
  )
}
