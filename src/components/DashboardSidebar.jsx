import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { Icon } from './Icon'

/**
 * Shared control-room sidebar. Used by both the Admin and Member layouts
 * with a different `items` config -- keeps navigation chrome identical
 * across every dashboard-style screen in the product.
 */
export default function DashboardSidebar({ items, footerLabel, onFooterClick, mobileOpen, onCloseMobile }) {
  const [collapsed, setCollapsed] = useState(false)

  const content = (
    <div className="flex h-full flex-col">
      <div className={clsx('flex items-center gap-2 px-5 py-6', collapsed && 'justify-center px-0')}>
        <span className="font-display text-lg text-white">{collapsed ? 'FE' : 'FIT ELEGANT'}</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              clsx(
                'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-white/5 text-white' : 'text-ink-muted hover:bg-white/5 hover:text-white'
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className={clsx('absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-accent transition-opacity', isActive ? 'opacity-100' : 'opacity-0')} />
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/5 p-3">
        <button
          onClick={onFooterClick}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-white/5 hover:text-white"
        >
          <Icon.logout width={18} height={18} />
          {!collapsed && <span>{footerLabel ?? 'Sign out'}</span>}
        </button>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="mt-1 hidden w-full items-center justify-center rounded-xl px-3 py-2 text-xs font-medium text-ink-muted transition-colors hover:bg-white/5 hover:text-white lg:flex"
        >
          {collapsed ? '»' : '« Collapse'}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside
        className={clsx(
          'sticky top-0 hidden h-screen shrink-0 border-r border-white/5 bg-base-card/60 transition-all duration-200 lg:block',
          collapsed ? 'w-[76px]' : 'w-64'
        )}
      >
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[95] lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={onCloseMobile} />
          <aside className="relative h-full w-64 border-r border-white/5 bg-base">{content}</aside>
        </div>
      )}
    </>
  )
}
