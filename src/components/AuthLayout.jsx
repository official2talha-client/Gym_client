import { Link } from 'react-router-dom'
import FlatCard from './ui/FlatCard'
import { GYM_SHORT_NAME } from '../lib/constants'

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-5 pb-16 pt-28">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 block text-center font-display text-2xl text-white">
          {GYM_SHORT_NAME}<span className="text-accent">.</span>
        </Link>
        <FlatCard className="p-7 sm:p-9">
          <h1 className="font-display text-2xl text-white sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>}
          <div className="mt-7">{children}</div>
        </FlatCard>
        {footer && <div className="mt-6 text-center text-sm text-ink-muted">{footer}</div>}
      </div>
    </div>
  )
}
