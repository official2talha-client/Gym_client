import { LineChart, Line, ResponsiveContainer } from 'recharts'
import FlatCard from '../ui/FlatCard'
import { formatBDT } from '../../lib/constants'

function formatValue(value, format) {
  if (format === 'bdt') return formatBDT(value)
  return value.toLocaleString('en-US')
}

export default function KPICard({ label, value, delta, format, sparkline }) {
  const positive = delta >= 0
  const chartData = sparkline.map((v, i) => ({ i, v }))

  return (
    <FlatCard className="p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <span className="font-display text-2xl text-white sm:text-3xl">{formatValue(value, format)}</span>
        <span className={`mb-1 text-xs font-bold ${positive ? 'text-accent-light' : 'text-red-400'}`}>
          {positive ? '▲' : '▼'} {Math.abs(delta)}%
        </span>
      </div>
      <div className="mt-3 h-10 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line type="monotone" dataKey="v" stroke="#F56A1F" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </FlatCard>
  )
}
