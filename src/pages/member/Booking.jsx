import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import FlatCard from '../../components/ui/FlatCard'
import { Badge } from '../../components/ui/Badge'
import PillButton from '../../components/ui/PillButton'
import { SkeletonRow } from '../../components/ui/Skeleton'
import { EmptyState, ErrorState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'
import { api } from '../../lib/api'

export default function MemberBooking() {
  const { push } = useToast()
  const queryClient = useQueryClient()

  const classesQuery = useQuery({ queryKey: ['classes'], queryFn: api.getClasses })
  const bookingsQuery = useQuery({ queryKey: ['my-bookings'], queryFn: api.getMyBookings })

  const bookMutation = useMutation({
    mutationFn: (classId) => api.bookClass(classId),
    onSuccess: () => {
      push('Class booked! See it under My Bookings.', { tone: 'success' })
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] })
    },
  })

  const cancelMutation = useMutation({
    mutationFn: (bookingId) => api.cancelBooking(bookingId),
    onSuccess: () => {
      push('Booking cancelled.', { tone: 'success' })
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] })
    },
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 font-body text-lg font-bold normal-case text-white">Available classes this week</h2>
        {classesQuery.isLoading && <div className="space-y-3">{[0, 1, 2].map((i) => <SkeletonRow key={i} />)}</div>}
        {classesQuery.isError && <ErrorState onRetry={classesQuery.refetch} />}
        {classesQuery.data && (
          <div className="space-y-3">
            {classesQuery.data.slice(0, 6).map((c) => (
              <FlatCard key={c.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-white">{c.name}</p>
                  <p className="text-sm text-ink-muted">{c.day} · {c.time} · {c.duration} min</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={c.spotsLeft <= 3 ? 'orange' : 'neutral'}>{c.spotsLeft} spots left</Badge>
                  <PillButton size="sm" variant="orange" loading={bookMutation.isPending} onClick={() => bookMutation.mutate(c.id)}>
                    Book
                  </PillButton>
                </div>
              </FlatCard>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-4 font-body text-lg font-bold normal-case text-white">My bookings</h2>
        {bookingsQuery.isLoading && <div className="space-y-3">{[0, 1].map((i) => <SkeletonRow key={i} />)}</div>}
        {bookingsQuery.isError && <ErrorState onRetry={bookingsQuery.refetch} />}
        {bookingsQuery.data && bookingsQuery.data.length === 0 && (
          <EmptyState title="No bookings yet" description="Book a class above to see it here." />
        )}
        {bookingsQuery.data && bookingsQuery.data.length > 0 && (
          <div className="space-y-3">
            {bookingsQuery.data.map((b) => (
              <FlatCard key={b.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-white">{b.className}</p>
                  <p className="text-sm text-ink-muted">{b.day} · {b.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={b.status === 'upcoming' ? 'orange' : 'neutral'}>{b.status}</Badge>
                  {b.status === 'upcoming' && (
                    <PillButton size="sm" variant="dark" loading={cancelMutation.isPending} onClick={() => cancelMutation.mutate(b.id)}>
                      Cancel
                    </PillButton>
                  )}
                </div>
              </FlatCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
