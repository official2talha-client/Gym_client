import { Link } from 'react-router-dom'
import {
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

    <div className="grid grid-cols-2 gap-8 pb-12 lg:grid-cols-4">

      {/* =====================================================
          BRAND
      ====================================================== */}
      <div>
        <Link
          to="/"
          className="font-display text-xl text-white"
        >
          {business?.name || "Gym Name"}
          <span className="text-accent">.</span>
        </Link>

        <p className="mt-4 max-w-xs text-sm text-ink-muted">
          {business?.name || "Gym"} — built for people serious
          about their training.
        </p>
      </div>


      {/* =====================================================
          EXPLORE
      ====================================================== */}
      <div>
        <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">
          Explore
        </h4>

        <ul className="space-y-3 text-sm text-ink-muted">
          <li>
            <Link
              to="/plans"
              className="transition-colors hover:text-white"
            >
              Membership Plans
            </Link>
          </li>

          <li>
            <Link
              to="/blog"
              className="transition-colors hover:text-white"
            >
              Blog
            </Link>
          </li>

          <li>
            <Link
              to="/#faq"
              className="transition-colors hover:text-white"
            >
              FAQ
            </Link>
          </li>

          <li>
            <Link
              to="/login"
              className="transition-colors hover:text-white"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>


      {/* =====================================================
          CONTACT
      ====================================================== */}
      <div>
        <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">
          Contact
        </h4>

        <ul className="space-y-3 text-sm text-ink-muted">
          <li>
            {business?.address || "Gym Address"}
          </li>

          <li>
            {business?.phone || "Gym Phone"}
          </li>

          <li className="break-all">
            {business?.email || "Gym Email"}
          </li>
        </ul>
      </div>


      {/* =====================================================
          FOLLOW
      ====================================================== */}
      <div>
        <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">
          Follow
        </h4>

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


    {/* =====================================================
        BOTTOM BAR
    ====================================================== */}
    <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-6 text-xs text-ink-muted sm:flex-row">

      <p className="text-center sm:text-left">
        © {YEAR} {business?.name}. All rights reserved.
      </p>

      <div className="flex items-center gap-1.5">
  <span>Built by</span>

  <a
    href="https://www.facebook.com/MATVentures"
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-white transition-colors hover:text-accent"
  >
    MAT VENTURES
  </a>
</div>

      <p className="text-center sm:text-right">
        Sample content shown where marked — final copy pending.
      </p>

    </div>

  </div>
</footer>
  )
}
