import React from "react";
import {
  CreditCard,
  User,
  Phone,
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  X,
  Edit
} from "lucide-react";
import { useGetMyMembershipQuery } from "../../api/membershipApi.js";
import MembershipCard from "../../components/admin/MembershipCard.jsx";

function MemberMembership() {
  const { data, isLoading, isError } = useGetMyMembershipQuery();

  const myMemberships = data?.data || [];
  
  
   const getStatusConfig = (status) => {
          switch (status?.toLowerCase()) {
            case "accepted":
            case "approved":
            case "active":
              return {
                label: status,
                className:
                  "text-green-400 border-green-500/30 bg-green-500/10",
                icon: <CheckCircle2 size={14} />,
              };
      
            case "suspended":
              return {
                label: "Suspended",
                className:
                  "text-red-400 border-red-500/30 bg-red-500/10",
                icon: <XCircle size={14} />,
              };
      
            case "expired":
            default:
              return {
                label: "Expired",
                className:
                  "text-gray-300 border-gray-500/80 bg-gray-500/50",
                icon: <Clock3 size={14} />,
              };
          }
        };

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-[#8f817a]">Loading Memberships...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
        <p className="text-sm text-red-400">
          Failed to load your membership records.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-white">
          My Memberships
        </h1>

        <p className="mt-1 text-sm text-[#8f817a]">
          View your memberships current data.
        </p>
      </div>

      {/* Purchase Records */}
      {myMemberships?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 md:gap-5">
  {myMemberships?.map((membership) => (
    <MembershipCard
      membership={membership}
      getStatusConfig={getStatusConfig}
      
    />
  ))}
</div>
      ) : (
        /* Empty State */
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-[#342620] bg-[#1d1512] px-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff681d]/10 text-[#ff681d]">
            <span className="text-xl">₤</span>
          </div>

          <h2 className="text-lg font-bold text-white">
            No Membership Records
          </h2>

          <p className="mt-2 max-w-md text-sm text-[#8f817a]">
            You haven't made any membership yet.
          </p>
        </div>
      )}
    </section>
  );
}

export default MemberMembership;