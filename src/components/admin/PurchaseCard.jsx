import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Mail,
  Phone,
  User,
  History
} from "lucide-react";
import ConfirmModel from '../../components/ui/ConfirmModal.jsx'
import {useChangePurchaseStatusMutation} from '../../api/purchaseApi.js'
import { useState } from "react";
import toast from 'react-hot-toast'
import MembershipHistory from "./MembershipHistory.jsx";
import Model from "../ui/Model.jsx";
import AcceptPurchaseForm from "./AcceptPurchase.jsx";

export default function PurchaseCard({ purchase,refetch }) {
  const formattedDate = purchase?.requestedAt
    ? new Date(purchase.requestedAt).toLocaleString("en-BD", {
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

  const [status,setStatus] = useState("");
  const [reject,setReject] = useState(false);

  const [accept,setAccept] = useState(false);
  const [history,setHistory] = useState(false);


  const [changeStatus,{isLoading}] = useChangePurchaseStatusMutation();


  const rejectConfirm = async(status)=>{
    try {

        await changeStatus({
            id:purchase?._id,
            status
        }).unwrap()

        setReject(false)

        toast.success("purchase rejected")
        
    } catch (error) {
        console.log("purchase rejection failed",error);
        toast.error(error?.data?.message || "purchase rejection failed")
        
    }
  }
    

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
      ৳{purchase?.plan?.totalCharge?.toLocaleString() || "0"}<span className="text-[10px] uppercase tracking-wider text-[#a3928b]">/ {purchase?.plan?.duration}&nbsp;month</span>
    </p>
  </div>

  {/* User Info */}
  <div className="mt-3 border-t border-[#342620] pt-3 flex justify-between items-center">
    <div>
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

    <div>
        <button className="text-xs text-white px-2 py-1 rounded-md shadow-md" onClick={()=>setHistory(true)}><History /></button>
    </div>
  </div>

  {/* Request Date */}
  <div className="mt-3 flex items-center gap-2 border-t border-[#342620] pt-3">
    <CalendarDays size={14} className="shrink-0 text-[#756862]" />

    <div className="min-w-0">
      <p className="text-[10px] text-[#756862]">Requested</p>

      <p className="truncate text-xs font-medium text-white">
        {formattedDate}
      </p>
    </div>
  </div>

  <div className="mt-3 flex justify-between items-center gap-2 border-t border-[#342620] pt-3">

   <button className="text-sm bg-orange-600 text-white px-2 py-1 rounded-md shadow-md" onClick={()=>{setStatus("rejected"),setReject(true)}}>Reject</button>

   <button className="text-sm bg-orange-600 text-white px-2 py-1 rounded-md shadow-md" onClick={()=>setAccept(true)}>Accept</button>

  </div>

  {reject && (

  <ConfirmModel open={true} onCancel={()=>setReject(false)} onConfirm={()=>rejectConfirm(status)} loading={isLoading} />

  )}

  {history && (

 <Model setOpen={setHistory} >
    
    <MembershipHistory userId={purchase?.user?._id} setopen={setHistory} />

</Model>
  )}

  {accept && (
    <div  className="fixed inset-0 gym-scrollbar flex justify-center items-center overflow-y-auto bg-black/20 p-4 backdrop-blur-md"
 onClick={()=>setAccept(false)}
>

 <AcceptPurchaseForm purchase={purchase} refetch={refetch} key={purchase?._id} close={setAccept} />
  

    </div>
  )}

</div>
  );
}