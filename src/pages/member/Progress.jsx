import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import FlatCard from '../../components/ui/FlatCard'
import PillButton from '../../components/ui/PillButton'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'
import { api } from '../../lib/api'

export default function MemberProgress() {
  const { push } = useToast()
  const queryClient = useQueryClient()
  const [weight, setWeight] = useState('')
  const [bodyFat, setBodyFat] = useState('')

  const { data: logs, isLoading, isError, refetch } = useQuery({ queryKey: ['progress-logs'], queryFn: api.getProgressLogs })

  const mutation = useMutation({
    mutationFn: (log) => api.addProgressLog(log),
    onSuccess: () => {
      push('Progress entry saved.', { tone: 'success' })
      queryClient.invalidateQueries({ queryKey: ['progress-logs'] })
      setWeight('')
      setBodyFat('')
    },
  })

  const chartData = (logs ?? []).map((l) => ({
    date: new Date(l.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Weight: l.weightKg,
    'Body Fat %': l.bodyFatPercent,
  }))

  return (
    <div className="space-y-6">
      <FlatCard className="p-5 sm:p-7">
        <h2 className="mb-5 font-body text-lg font-bold normal-case text-white">Weight & body fat trend</h2>
        {isLoading && <Skeleton className="h-64 w-full" />}
        {isError && <ErrorState onRetry={refetch} />}
        {logs && (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="date" stroke="#B8ADA6" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#B8ADA6" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#211714', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="Weight" stroke="#F56A1F" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Body Fat %" stroke="#B8ADA6" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </FlatCard>

      <FlatCard className="p-5 sm:p-7">
        <h2 className="mb-5 font-body text-lg font-bold normal-case text-white">Log new entry</h2>
        <form
          className="grid gap-4 sm:grid-cols-3"
          onSubmit={(e) => {
            e.preventDefault()
            mutation.mutate({ date: new Date().toISOString(), weightKg: Number(weight), bodyFatPercent: Number(bodyFat) })
          }}
        >
          <div>
            <label htmlFor="weight" className="mb-1.5 block text-sm font-semibold text-white">Weight (kg)</label>
            <input id="weight" type="number" step="0.1" required value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full rounded-xl border border-white/10 bg-base px-4 py-3 text-white focus:border-accent" />
          </div>
          <div>
            <label htmlFor="bodyFat" className="mb-1.5 block text-sm font-semibold text-white">Body fat (%)</label>
            <input id="bodyFat" type="number" step="0.1" required value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} className="w-full rounded-xl border border-white/10 bg-base px-4 py-3 text-white focus:border-accent" />
          </div>
          <div className="flex items-end">
            <PillButton type="submit" variant="orange" loading={mutation.isPending} className="w-full justify-center">Save Entry</PillButton>
          </div>
        </form>
      </FlatCard>
    </div>
  )
}
