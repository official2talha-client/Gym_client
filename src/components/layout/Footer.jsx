import { Link } from 'react-router-dom'
import {
  GYM_NAME,
  GYM_SHORT_NAME,
  GYM_ADDRESS,
  GYM_PHONE,
  GYM_HOURS,
  FB_PAGE_URL,
} from '../../lib/constants'
import {useGetBusinessForUserQuery} from '../../api/adminApi.js'


const YEAR = new Date().getFullYear()

export default function Footer() {

  const {data,isLoading,isError} = useGetBusinessForUserQuery();
    const business = data?.data;


  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-base pt-16">
      <span
        className="ghost-word pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 text-[18vw] leading-none"
        aria-hidden="true"
      >
        FITNESS
      </span>

      <div className="container-page relative">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="font-display text-xl text-white">
              {business?.name || "Gym Name"}
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-ink-muted">{business?.name || "Gym"} — built for people serious about their training.</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Explore</h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li><Link to="/plans" className="hover:text-white">Membership Plans</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/#faq" className="hover:text-white">FAQ</Link></li>
              <li><Link to="/login" className="hover:text-white">Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li>{business?.address || "Gym Address"}</li>
              <li>{business?.phone || "Gym Phone"}</li>
              <li>{business?.email || "Gym Email"}</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Follow</h4>
            <a
              href={FB_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-ink-muted transition-colors hover:text-white"
            >
              Facebook ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-6 text-xs text-ink-muted sm:flex-row">
          <p>© {YEAR} {business?.name}. All rights reserved.</p>
          <p>Sample content shown where marked — final copy pending.</p>
        </div>
      </div>
    </footer>
  )
}
