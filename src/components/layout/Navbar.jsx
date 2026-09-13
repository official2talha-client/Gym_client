import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import PillButton from '../ui/PillButton'
import {useGetBusinessForUserQuery} from '../../api/adminApi.js'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/plans', label: 'Plans' },
  { to: '/exercise', label: 'Exercises' },
  { to: '/trainers', label: 'Trainers' },
  { to: '/blog', label: 'Blog' },
  { to: '/#contact', label: 'Contact' },

]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const {data,isLoading,isError} = useGetBusinessForUserQuery();
  const business = data?.data;


  return (
    <header
  className={clsx(
    "fixed inset-x-0 top-0 z-[70] transition-colors duration-300",
    scrolled || mobileOpen
      ? "border-b border-white/5 bg-base/90 backdrop-blur-md"
      : "bg-transparent"
  )}
>
      <nav
    className=' w-full h-20 flex justify-between items-center container-page'
    aria-label="Primary"
  >
  
        
       <Link
  to="/"
  className="group flex items-center gap-3"
>
  {/* Gym Logo */}
  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl">
    <img
      src={business?.logo}
      alt={`${business?.name || "Gym"} logo`}
      className="
        h-full w-full
        object-contain
        transition-transform duration-300
        group-hover:scale-105
      "
    />
  </div>

  {/* Gym Name */}
  <div className="flex flex-col leading-none">
    <span className="font-display text-lg tracking-wide text-white sm:text-xl">
      {business?.name?.split(" ").map((word, index) => (
        <span
          key={index}
          className={index === 0 ? "text-white" : "text-[#ff681d]"}
        >
          {index > 0 && " "}
          {word}
        </span>
      ))}
      <span className="text-[#F56A1F]">.</span>
    </span>

    <span
      className="
        mt-1 hidden
        text-[8px] font-semibold
        uppercase tracking-[0.3em]
        text-[#756A64]
        sm:block
      "
    >
      Fitness & Performance
    </span>
  </div>
       </Link>

        <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  clsx(
                    'block rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                    isActive ? 'bg-accent text-white' : 'text-ink-muted hover:text-white'
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden space-x-4 lg:block">
          <PillButton to="/plans" variant="orange" size="sm">
            Book Free Trial
          </PillButton>

             <PillButton to="/login" variant="orange" size="sm">
            Login
          </PillButton>

        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={clsx(
                'absolute left-0 top-0 h-0.5 w-5 bg-white transition-transform',
                mobileOpen && 'translate-y-[7px] rotate-45'
              )}
            />
            <span className={clsx('absolute left-0 top-[7px] h-0.5 w-5 bg-white transition-opacity', mobileOpen && 'opacity-0')} />
            <span
              className={clsx(
                'absolute left-0 top-[14px] h-0.5 w-5 bg-white transition-transform',
                mobileOpen && '-translate-y-[7px] -rotate-45'
              )}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/5 bg-base lg:hidden"
          >
            <ul className="container-page flex flex-col gap-2 py-6">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      clsx(
                        'block rounded-xl px-4 py-3 text-base font-semibold',
                        isActive ? 'bg-accent text-white' : 'text-ink-muted hover:bg-white/5 hover:text-white'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2 space-x-20D " onClick={()=>setMobileOpen(false)}>
                <PillButton to="/login" variant="orange" className="w-full justify-center">
                  Login
                </PillButton>


              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
