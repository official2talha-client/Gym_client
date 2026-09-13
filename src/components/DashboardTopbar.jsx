import { Icon } from './Icon'

export default function DashboardTopbar({ title, onOpenMobile, userName, userRole }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-base/90 px-5 py-4 backdrop-blur-sm sm:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
        >
          <Icon.menu width={18} height={18} />
        </button>
        <h1 className="font-display text-xl text-white sm:text-2xl">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-white">{userName}</p>
          <p className="text-xs capitalize text-ink-muted">{userRole}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
          {userName?.[0] ?? 'U'}
        </div>
      </div>
    </header>
  )
}
