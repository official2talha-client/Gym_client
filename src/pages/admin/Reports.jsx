import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import FlatCard from '../../components/ui/FlatCard'
import { Badge } from '../../components/ui/Badge'
import PillButton from '../../components/ui/PillButton'
import { useToast } from '../../components/ui/Toast'
import { api } from '../../lib/api'
import { members } from '../../data/adminMockData'
import { plans } from '../../data/mockData'

const REPORTS = [
  { id: 'members', label: 'Members Report', description: 'Name, plan, status, and days remaining for every member.', columns: ['Name', 'Email', 'Plan', 'Status', 'Days Left'], rows: members.map((m) => [m.name, m.email, m.plan, m.status, m.daysLeft]) },
  { id: 'revenue', label: 'Revenue Summary', description: 'Plan-level pricing snapshot used for revenue projections.', columns: ['Plan', 'Price (BDT/mo)'], rows: plans.map((p) => [p.name, p.price]) },
  { id: 'attendance', label: 'Attendance Report', description: "Sample daily attendance — pending real check-in data.", columns: ['Day', 'Check-ins'], rows: [['Sat', 82], ['Sun', 74], ['Mon', 91], ['Tue', 68], ['Wed', 77], ['Thu', 85], ['Fri', 60]] },
]

function toCsv(report) {
  const header = report.columns.join(',')
  const rows = report.rows.map((r) => r.join(','))
  return [header, ...rows].join('\n')
}

async function downloadCsv(report) {
  const csv = toCsv(report)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  triggerDownload(blob, `${report.id}-report.csv`)
}

async function downloadExcel(report) {
  // Dynamically imported so the ~400KB xlsx library never ships in the
  // main bundle -- only loaded when an admin actually exports a report.
  const XLSX = await import('xlsx')
  const worksheet = XLSX.utils.aoa_to_sheet([report.columns, ...report.rows])
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, report.label.slice(0, 31))
  XLSX.writeFile(workbook, `${report.id}-report.xlsx`)
}

async function downloadPdf(report) {
  const { jsPDF } = await import('jspdf')
  const autoTable = (await import('jspdf-autotable')).default
  const doc = new jsPDF()
  doc.setFontSize(14)
  doc.text(report.label, 14, 16)
  autoTable(doc, { head: [report.columns], body: report.rows, startY: 22, styles: { fontSize: 9 } })
  doc.save(`${report.id}-report.pdf`)
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function Reports() {
  const [selected, setSelected] = useState(REPORTS[0])
  const { push } = useToast()

  const [format, setFormat] = useState('csv')
  const mutation = useMutation({
    mutationFn: async () => {
      await api.exportReport(selected.id)
      if (format === 'csv') await downloadCsv(selected)
      else if (format === 'excel') await downloadExcel(selected)
      else await downloadPdf(selected)
    },
    onSuccess: () => push(`Report downloaded as ${format.toUpperCase()}.`, { tone: 'success' }),
    onError: () => push('Could not generate the export. Please try again.', { tone: 'error' }),
  })

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="space-y-2">
        {REPORTS.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelected(r)}
            className={`block w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
              selected.id === r.id ? 'border-accent bg-accent/10 text-white' : 'border-white/10 text-ink-muted hover:text-white'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <FlatCard className="p-6 sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-body text-lg font-bold normal-case text-white">{selected.label}</h2>
            <p className="mt-1 text-sm text-ink-muted">{selected.description}</p>
          </div>
          <Badge>{selected.rows.length} rows</Badge>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <div className="grid min-w-[400px]" style={{ gridTemplateColumns: `repeat(${selected.columns.length}, minmax(0, 1fr))` }}>
            <div className="contents">
              {selected.columns.map((c) => (
                <div key={c} className="border-b border-white/10 bg-white/5 p-3 text-xs font-bold uppercase tracking-wide text-white">{c}</div>
              ))}
            </div>
            {selected.rows.slice(0, 5).map((row, i) => (
              <div key={i} className="contents">
                {row.map((cell, j) => (
                  <div key={j} className="border-b border-white/5 p-3 text-sm text-ink-muted">{cell}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {selected.rows.length > 5 && <p className="mt-2 text-xs text-ink-muted">+ {selected.rows.length - 5} more rows in the full export</p>}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="rounded-xl border border-white/10 bg-base px-4 py-2.5 text-sm text-white focus:border-accent"
          >
            <option value="csv">CSV</option>
            <option value="excel">Excel (.xlsx)</option>
            <option value="pdf">PDF</option>
          </select>
          <PillButton variant="orange" loading={mutation.isPending} onClick={() => mutation.mutate()}>
            Download Report
          </PillButton>
        </div>
      </FlatCard>
    </div>
  )
}
