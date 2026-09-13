import { useQuery } from '@tanstack/react-query'
import FlatCard from '../../components/ui/FlatCard'
import {ArrowRightSquare,ArrowRightCircle, ArrowRight} from 'lucide-react'
import MarqueeRibbon from '../../components/ui/MarqueeRibbon'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'

import {useGetCurrentUserQuery} from '../../api/userApi.js'
import {useGetBusinessForUserQuery} from '../../api/adminApi.js'
import {useGetMyExpiringMembershipsQuery} from '../../api/membershipApi.js'
import { Link } from 'react-router-dom'

export default function MemberDashboard() {

  const formatDate = (dateString) => {
  const date = new Date(dateString);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${date.getUTCDate()}-${months[date.getUTCMonth()]}-${date.getUTCFullYear()}`;
};
  const {data,isError,isLoading,refetch} = useGetCurrentUserQuery();
  const user = data?.data;

const {
  data: expiringData,

} = useGetMyExpiringMembershipsQuery(); 
 const expiringMemberships = expiringData?.data?.memberships;

 const {data:businessData} = useGetBusinessForUserQuery()
 const business  = businessData?.data;
 


  if (isLoading) return <Skeleton className="h-64 w-full" />
  if (isError) return <ErrorState onRetry={refetch} />

  return (
    <div className="space-y-8">

<div className="relative mb-6 overflow-hidden rounded-2xl border border-[#352823] bg-[#1A1310] px-6 py-5 shadow-lg shadow-black/20">
  {/* Animated glow */}
  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl animate-pulse" />
  <div className="pointer-events-none absolute -bottom-20 left-1/3 h-32 w-32 rounded-full bg-orange-600/5 blur-3xl" />

  {/* Moving shine */}
  <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-[shine_5s_ease-in-out_infinite]" />

  <div className="relative flex items-center justify-between gap-4">
    <div className="flex items-center gap-4">
      {/* Icon */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 shadow-[0_0_25px_rgba(249,115,22,0.08)]">
        <span className="text-lg text-orange-400">✦</span>
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-400">
          {business?.name}
        </p>

        <h1 className="mt-0.5 text-xl font-semibold tracking-wide text-white sm:text-2xl">
          Member Panel
        </h1>

        <p className="mt-1 text-xs text-[#9B8D86]">
          Manage your membership, profile & activities
        </p>
      </div>
    </div>

    {/* Status */}
    <div className="hidden items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3 py-1.5 sm:flex">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>

      <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-400">
        Member
      </span>
    </div>
  </div>

  <style>
    {`
      @keyframes shine {
        0% {
          transform: translateX(-100%);
          opacity: 0;
        }
        20% {
          opacity: 1;
        }
        45% {
          opacity: 0;
        }
        100% {
          transform: translateX(400%);
          opacity: 0;
        }
      }
    `}
  </style>
</div>

      <FlatCard className="relative overflow-hidden p-7 sm:p-10">
        <span className="ghost-word absolute -right-6 -top-6 text-[10rem] sm:text-[14rem]" aria-hidden="true">
          PROGRESS
        </span>
        <div className="relative">
          <p className="text-sm text-ink-muted">Welcome back,</p>
          <h2 className="font-display text-3xl text-white sm:text-4xl">{user?.fullName ?? 'Member'}</h2>
          <p className="mt-2 text-sm text-ink-muted">Member ID : {user?.membershipCard}</p>
        </div>

      </FlatCard>

      
        {/* Recently expiring  */}
        
      <div className="rounded-2xl border border-[#352823] bg-[#1A1310] p-4">
  {/* Header */}
  <div className="mb-5 flex items-center justify-between">
    <div>
      <h2 className="text-lg font-semibold text-white">
        Memberships Expiring Soon
      </h2>
      <p className="mt-1 text-xs text-ink-muted">
        Members whose membership expires within 10 days
      </p>
    </div>

    <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">
      {expiringMemberships?.length || 0}
    </span>
  </div>

  {/* Scrollable Cards */}
  <div className="h-[420px] space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#4A352C] scrollbar-track-transparent">
    {expiringMemberships?.length > 0 ? (
      expiringMemberships.map((membership) => (

        <div
          key={membership.membershipId}
          className="group rounded-xl border border-white/5 bg-[#211914] p-4 transition-all duration-300 hover:border-orange-500/20 hover:bg-[#261D18]"
        >
          <div className="flex items-start justify-between gap-4">
            
            {/* Days Left */}
            <div className="shrink-0 rounded-lg border border-orange-500/15 bg-orange-500/5 px-3 py-1.5 text-center">
              <p className="text-sm font-bold text-orange-400">
                {membership.daysLeft}
              </p>
              <p className="text-[9px] uppercase tracking-wider text-ink-muted">
                Days left
              </p>
            </div>

            <Link to={`/membershipById/${membership?.membershipId}`}>
            <div className="shrink-0 rounded-lg border border-orange-500/15 bg-orange-500/5 px-3 py-1.5 text-center">
              
              <p className="text-[10px] uppercase tracking-wider flex gap-2 items-center  text-orange-400">
                View <ArrowRightCircle size={14} />
              </p>
            </div>
            </Link>

          </div>

          {/* Details */}
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/5 pt-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted">
                Plan
              </p>
              <p className="mt-1 truncate text-xs font-medium text-white">
                {membership.plan?.name || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted">
                Card
              </p>
              <p className="mt-1 truncate text-xs font-medium text-white">
                {membership.cardNumber || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted">
                Created
              </p>
              <p className="mt-1 text-xs text-[#B7A9A1]">
                {formatDate(membership.createdAt)}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted">
                Expires
              </p>
              <p className="mt-1 text-xs font-medium text-orange-400">
                {formatDate(membership.endDate)}
              </p>
            </div>
          </div>

        </div>
      ))
    ) : (
      <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-white/10">
        <div className="text-center">
          <p className="text-sm font-medium text-white">
            No Expiring Memberships
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            All memberships are currently safe.
          </p>
        </div>
      </div>
    )}
  </div>
       </div>

       {/* progress  */}

      <FlatCard className="flex flex-col items-center gap-6 p-8 sm:flex-row sm:justify-between">
        <div>
          <h3 className="font-body text-lg font-bold normal-case text-white">Weekly goal progress</h3>
          <p className="mt-1 max-w-sm text-sm text-ink-muted">Sample data — pending real workout logs from the member app.</p>
        </div>
        {/* <GaugeBadge percent={profile.weeklyGoalPercent} size={128} strokeWidth={10} /> */}
      </FlatCard>

      <MarqueeRibbon text="KEEP PUSHING" tilt={-5} />
    </div>
  )
}
