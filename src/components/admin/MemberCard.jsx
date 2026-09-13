import React from "react";
import { ArrowUpRight } from "lucide-react";
import {useChangeUserStatusMutation} from '../../api/adminApi.js'
import toast from "react-hot-toast";

const MemberCard = ({ user,refetch }) => {
    
  const handleWhatsApp = () => {
    if (!user?.phone) return;

    // Remove spaces, +, -, etc.
    const phone = user.phone.replace(/\D/g, "");

    // Bangladesh number handling:
    // 018XXXXXXXX -> 88018XXXXXXXX
    const whatsappNumber = phone.startsWith("0")
      ? `88${phone}`
      : phone;

    window.open(
      `https://wa.me/${whatsappNumber}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const [changeStatus,{isLoading}] = useChangeUserStatusMutation()


const handleChangeStatus = async (userId) => {
    try {
        const res = await changeStatus(userId).unwrap();

        refetch()

        toast.success(`user status changed to `)
    } catch (error) {
        console.error("Failed to change status:", error);
        toast.error("failed to change user status")
    }
};

  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-[#352823] bg-[#1d1512] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
  {/* Member */}
  <div className="flex min-w-0 items-center gap-3">
    {/* Avatar */}
    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#2a211d]">
      <img
        src={"https://static.vecteezy.com/system/resources/previews/066/918/356/non_2x/powerful-silhouette-of-a-bodybuilder-posing-against-an-orange-background-for-fitness-vector.jpg"}
        alt={user?.fullName || "Member"}
        className="h-full w-full object-cover"
      />
    </div>

    {/* Info */}
    <div className="min-w-0">
      {/* Name + Status */}
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="truncate text-base text-white sm:text-lg">
          {user?.fullName || "Member"}
        </h3>

        <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-500">
          {user?.status}
        </span>
      </div>

      {/* Plan + Email */}
      <div className="mt-1 w-full flex flex-col items-start  flex-wrap  gap-2">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs font-medium text-[#b7a9a1]">
          {user?.membershipCard || "no card yet"}
        </span>

        <p className="truncate text-xs text-[#8f827b] sm:max-w-[220px]">
          {user?.email || "member@example.com"}
        </p>

        <p className="truncate text-xs text-[#8f827b] sm:max-w-[220px]">
          {user?.phone || "017xxxxxxxx"}
        </p>
      </div>

      {/* Progress */}
      
    </div>
  </div>

  {/* Actions */}
  <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
    {/* Renew */}
    <button
      type="button"
      className="group flex items-center gap-2 rounded-full bg-[#ff681d] px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-[#ff7a38]"
    >
      View

      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#ff681d] transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </span>
    </button>

    {/* Freeze */}
    <button
      type="button"
      className="group flex items-center gap-2 rounded-full border border-[#493d38] px-3.5 py-2 text-sm font-semibold text-white transition hover:border-[#ff681d]/50 hover:bg-[#ff681d]/5"
    onClick={()=>handleChangeStatus(user?._id)}
    >
 {isLoading
        ? "Changing..."
        : user.status === "active"
            ? "Freeze"
            : "Activate"
    }

      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff681d] text-white transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </span>
    </button>

    {/* WhatsApp */}
    <button
      type="button"
      onClick={handleWhatsApp}
      disabled={!user?.phone}
      className="group flex items-center gap-2 rounded-full border border-[#493d38] px-3.5 py-2 text-sm font-semibold text-white transition hover:border-[#ff681d]/50 hover:bg-[#ff681d]/5 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Message

      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff681d] text-white transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </span>
    </button>
  </div>
</div>
  );
};

export default MemberCard;