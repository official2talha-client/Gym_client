import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import FlatCard from '../../components/ui/FlatCard'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import { api } from '../../lib/api'

const DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export default function Classes() {
  const classesQuery = useQuery({ queryKey: ['classes'], queryFn: api.getClasses })
  const attendanceQuery = useQuery({ queryKey: ['admin-attendance-hour'], queryFn: api.getAttendanceByHour })
  const checkInsQuery = useQuery({ queryKey: ['admin-checkins'], queryFn: api.getCheckIns })

  return (
    <div className="space-y-6">
      <FlatCard className="overflow-x-auto p-5 sm:p-7">
        <h2 className="mb-5 font-body text-lg font-bold normal-case text-white">Weekly schedule</h2>
        {classesQuery.isLoading && <Skeleton className="h-64 w-full" />}
        {classesQuery.isError && <ErrorState onRetry={classesQuery.refetch} />}
        {classesQuery.data && (
          <div className="grid min-w-[700px] grid-cols-7 gap-2">
            {DAYS.map((day) => (
              <div key={day}>
                <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-ink-muted">{day}</p>
                <div className="space-y-2">
                  {classesQuery.data.filter((c) => c.day === day).map((c) => (
                    <div key={c.id} className="rounded-lg border border-accent/20 bg-accent/10 p-2 text-center">
                      <p className="text-xs font-semibold text-white">{c.name}</p>
                      <p className="text-[11px] text-ink-muted">{c.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </FlatCard>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <FlatCard className="p-5 sm:p-7">
          <h2 className="mb-5 font-body text-lg font-bold normal-case text-white">Attendance by hour (today)</h2>
          {attendanceQuery.isLoading && <Skeleton className="h-64 w-full" />}
          {attendanceQuery.isError && <ErrorState onRetry={attendanceQuery.refetch} />}
          {attendanceQuery.data && (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceQuery.data}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="hour" stroke="#B8ADA6" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#B8ADA6" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#211714', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="count" fill="#F56A1F" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </FlatCard>

        <FlatCard className="p-5 sm:p-7">
          <h2 className="mb-5 font-body text-lg font-bold normal-case text-white">Raw check-ins</h2>
          {checkInsQuery.isLoading && <Skeleton className="h-64 w-full" />}
          {checkInsQuery.isError && <ErrorState onRetry={checkInsQuery.refetch} />}
          {checkInsQuery.data && (
            <div className="space-y-3">
              {checkInsQuery.data.map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-base p-3 text-sm">
                  <div>
                    <p className="font-semibold text-white">{c.name}</p>
                    <p className="text-xs text-ink-muted">{c.class}</p>
                  </div>
                  <span className="text-xs text-ink-muted">{c.time}</span>
                </div>
              ))}
            </div>
          )}
        </FlatCard>
      </div>
    </div>
  )
}
