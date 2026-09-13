import React, { useEffect, useState } from "react";
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
import {useGetUserMembershipsQuery} from '../../api/membershipApi.js'
import MembershipCard from "./MembershipCard.jsx";


const MembershipHistory = ({ userId,setopen }) => {

    const {data,isLoading,isError} = useGetUserMembershipsQuery(userId)
    const memberships = data?.data; 
 

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
      <div className="flex min-h-[250px] items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-red-400">
        <AlertCircle size={20} />
        <span>Membership loadin failed</span>
      </div>
    );
  }

  if (memberships.length === 0) {
    return (
      <div className="flex min-h-[250px]  flex-col items-center justify-center rounded-xl border border-white/10 bg-[#3a2019] p-8 text-center">
        <CreditCard
          size={42}
          className="mb-3 text-gray-600"
        />

        <p className="text-lg font-semibold text-gray-200">
          No Membership History
        </p>

        <p className="mt-1 text-sm text-gray-400">
          This user has no membership purchase records.
        </p>
      </div>
    );
  }

  return (
    <section
  className="w-full origin-top-left pb-2 "
  onClick={(e) => e.stopPropagation()}
>
  {/* Header */}
  <div className="mb-6 flex justify-between">
    <div className="">
    <h2 className="text-2xl font-bold text-white">
      Membership History
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      All membership purchases and their current status.
    </p>
    </div>

    {/* <div onClick={()=>setopen(false)} className=" cursor-pointer">
        <X />
    </div> */}
  </div>

<div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

{!isLoading && !isError && memberships.length >0 && (
    memberships.map((m)=>(
      <MembershipCard membership={m} key={m?._id}  getStatusConfig={getStatusConfig} />
    ))
)}
</div>


</section>
  );
};

export default MembershipHistory;