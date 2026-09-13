import { useState } from 'react'
import FlatCard from '../../components/ui/FlatCard'
import PillButton from '../../components/ui/PillButton'
import { useAuth } from '../../lib/AuthContext'

const TABS = ['Profile', 'Notifications', 'Security']

function Toggle({ label, defaultChecked }) {
  const [on, setOn] = useState(defaultChecked)
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-base p-4">
      <span className="text-sm text-white">{label}</span>
      <button
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 rounded-full transition-colors ${on ? 'bg-accent' : 'bg-white/10'}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${on ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  )
}

export default function MemberSettings() {
  const [tab, setTab] = useState(TABS[0])
  const { session } = useAuth()

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
              tab === t ? 'bg-accent text-white' : 'text-ink-muted hover:bg-white/5 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <FlatCard className="p-6 sm:p-8">
        {tab === 'Profile' && (
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white" htmlFor="settings-name">Full name</label>
              <input id="settings-name" defaultValue={session?.name} className="w-full rounded-xl border border-white/10 bg-base px-4 py-3 text-white focus:border-accent" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white" htmlFor="settings-email">Email</label>
              <input id="settings-email" defaultValue={session?.email} className="w-full rounded-xl border border-white/10 bg-base px-4 py-3 text-white focus:border-accent" />
            </div>
            <PillButton variant="orange" size="sm">Save Changes</PillButton>
          </div>
        )}
        {tab === 'Notifications' && (
          <div className="space-y-3">
            <Toggle label="Class booking reminders" defaultChecked />
            <Toggle label="Membership renewal alerts" defaultChecked />
            <Toggle label="Blog & news updates" defaultChecked={false} />
          </div>
        )}
        {tab === 'Security' && (
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white" htmlFor="settings-password">New password</label>
              <input id="settings-password" type="password" placeholder="••••••••" className="w-full rounded-xl border border-white/10 bg-base px-4 py-3 text-white focus:border-accent" />
            </div>
            <PillButton variant="orange" size="sm">Update Password</PillButton>
          </div>
        )}
      </FlatCard>
    </div>
  )
}
