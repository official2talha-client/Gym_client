import { useQuery } from '@tanstack/react-query'
import FlatCard from '../../components/ui/FlatCard'
import { Badge } from '../../components/ui/Badge'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'

import {useGetCurrentUserQuery} from '../../api/userApi.js'

export default function MemberCard() {
 
const {data,isLoading,isError} = useGetCurrentUserQuery()
const user = data?.data;



const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getUTCDate();

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

  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
};


{isLoading && (
  <div className="flex min-h-[400px] items-center justify-center">
    <div className="text-center">
      <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#352823] border-t-orange-500" />
      <p className="text-sm text-ink-muted">Loading...</p>
    </div>
  </div>
)}

{isError && (
  <div className="flex min-h-[400px] items-center justify-center">
    <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-5 text-center">
      <p className="text-sm font-medium text-red-400">
        Something went wrong
      </p>
      <p className="mt-1 text-xs text-ink-muted">
        Failed to load the data. Please try again.
      </p>
    </div>
  </div>
)}

  return (
    <div className="flex flex-col items-center gap-6">
      <FlatCard className="relative w-full max-w-md overflow-hidden border-accent/30 p-7">
        <span className="ghost-word absolute -bottom-6 -right-4 text-8xl" aria-hidden="true">FE</span>
        <div className="relative flex items-start justify-between">
          <div>
            <p className="font-display text-lg text-white ">Name : {user?.userName}</p>
            <p className="text-xs uppercase tracking-wide text-ink-muted">Member Card</p>
          </div>
          <Badge tone="orange">{user?.status || "status"}</Badge>
        </div>

        <div className="relative mt-8 flex items-end justify-between">
          <div>
            <p className="font-display text-2xl text-white">member</p>
            <p className="mt-1 text-sm text-ink-muted">ID: {user?.membershipCard}</p>
            <p className="text-sm text-ink-muted">Since : {formatDate(user?.createdAt)}</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[10px] text-ink-muted">
            QR
          </div>
        </div>
      </FlatCard>
      <p className="max-w-md text-center text-xs text-ink-muted">
        Show this card at the front desk for entry, or present the QR code for a faster check-in once scanning is enabled.
      </p>
    </div>
  )
}
