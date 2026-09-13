import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Mail,
  Phone,
  User,
  Trash2
} from "lucide-react";
import {useDeletePurchaseMutation} from '../../api/purchaseApi.js'
import toast from "react-hot-toast";
import ConfirmModal from '../ui/ConfirmModal.jsx'
import { useState } from "react";


export default function PurchaseCard({ purchase }) {

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formattedDate = purchase?.requestedAt? new Date(purchase.requestedAt).toLocaleString("en-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  const statusStyles = {
    pending: {
      className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      icon: Clock3,
    },
    accepted: {
      className: "bg-green-500/10 text-green-400 border-green-500/20",
      icon: CheckCircle2,
    },
    rejected: {
      className: "bg-red-500/10 text-red-400 border-red-500/20",
      icon: Clock3,
    },
  };

  const currentStatus =
    statusStyles[purchase?.status] || statusStyles.pending;

  const StatusIcon = currentStatus.icon;

  const [deletePurchase,{isLoading}] = useDeletePurchaseMutation()

  const handleDelete = async () => {
  try {
    await deletePurchase(purchase?._id).unwrap();
    toast.success("Purchase deleted successfully");
    setShowDeleteConfirm(false)
  } catch (error) {
    console.log("Failed to delete purchase" ,error);
    
    toast.error(error?.data?.message || "Failed to delete purchase");
  }
};

  return (
    <div className="w-full rounded-xl border border-[#342620] bg-[#1d1512] p-4 shadow-lg transition hover:border-[#ff681d]/40">
  {/* Header */}
  <div className="flex items-start justify-between gap-3">
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ff681d]/10 text-[#ff681d]">
        <CreditCard size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wider text-[#756862]">
          Purchase
        </p>

        <h3 className="truncate text-sm font-bold text-white">
          {purchase?.plan?.name || "Unknown Plan"}
        </h3>
      </div>
    </div>

    {/* Status */}
    <div
      className={`flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold capitalize ${currentStatus.className}`}
    >
      <StatusIcon size={11} />
      {purchase?.status || "pending"}
    </div>
  </div>

  {/* Price */}
  <div className="mt-4">
    <p className="text-[10px] uppercase tracking-wider text-[#756862]">
      Total Charge
    </p>

    <p className="mt-0.5 text-lg font-bold text-[#ff681d]">
      ৳{purchase?.plan?.totalCharge?.toLocaleString() || "0"}
    </p>
  </div>

  {/* User Info */}
  <div className="mt-3 border-t border-[#342620] pt-3">
    <div className="mb-2 flex items-center gap-2">
      <User size={13} className="text-[#ff681d]" />

      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#756862]">
        Member
      </p>
    </div>

    <div className="space-y-1.5">
      {/* Username */}
      <div className="flex items-center gap-2">
        <User size={13} className="text-[#756862]" />

        <p className="truncate text-xs font-medium text-white">
          {purchase?.user?.userName || "N/A"}
        </p>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-2">
        <Phone size={13} className="text-[#756862]" />

        <p className="text-xs font-medium text-white">
          {purchase?.user?.phone || "N/A"}
        </p>
      </div>
    </div>
  </div>

  {/* Request Date */}
  <div className="mt-3 flex items-center gap-2 border-t border-[#342620] pt-3">
    <CalendarDays size={14} className="shrink-0 text-[#756862]" />

    <div className="min-w-0">
      <p className="text-[10px] text-[#756862]">
        Requested
      </p>

      <p className="truncate text-xs font-medium text-white">
        {formattedDate}
      </p>
    </div>
  </div>

  {/* Delete Button */}
  {purchase?.status !== "accepted" && (
    <button
      type="button"
      onClick={()=>setShowDeleteConfirm(true)}
      className="
        group
        mt-4
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-lg
        border
        border-red-500/15
        bg-red-500/5
        px-3
        py-2
        text-xs
        font-semibold
        text-red-400
        transition-all
        duration-300
        hover:border-red-500/30
        hover:bg-red-500/10
        hover:text-red-300
        active:scale-[0.98]
      "
    >
      <Trash2
        size={14}
        className="transition-transform duration-300 group-hover:scale-110"
      />

      Delete Purchase
    </button>
  )}

  {showDeleteConfirm && (

<ConfirmModal loading={isLoading} onCancel={()=>setShowDeleteConfirm(false)} onConfirm={handleDelete} open={()=>setShowDeleteConfirm(true)} />

  )}
</div>
  );
}