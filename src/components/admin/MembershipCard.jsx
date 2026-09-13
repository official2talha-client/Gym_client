import {
  CreditCard,
  User,
  CalendarDays,
  Edit,
  Eye,View
} from "lucide-react";
import { useState } from "react";
import MembershipForm from "./EditMembership";
import { Link } from "react-router-dom";


const MembershipCard = ({ membership, getStatusConfig,isEdit = false }) => {

    const [edit,setEdit] = useState(false)
    
  const status = getStatusConfig(membership.status);

  return (
    <div
      className="rounded-xl border border-[#352823] bg-[#191310] p-3 transition-all duration-200 hover:border-[#51362a] hover:shadow-lg"
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3a1e12]">
            <CreditCard
              size={16}
              className="text-orange-500"
            />
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-wider text-gray-500">
              Membership
            </p>

            <h3 className="mt-0.5 text-sm font-bold text-white">
              {membership?.plan?.name || "Membership"}
            </h3>
          </div>
        </div>

        {/* Status */}
        <div
          className={`flex items-center gap-1 rounded-full border px-2 py-1 text-[9px] font-semibold ${status.className}`}
        >
          {status.icon}
          <span>{membership?.status}</span>
        </div>
      </div>

      {/* Price + Duration */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-wider text-gray-500">
            Total Charge
          </p>

          <p className="mt-0.5 text-lg font-bold text-orange-500">
            ৳
            {Number(
              membership?.amount || 0
            ).toLocaleString()}
          </p>
        </div>

        <p className="text-[9px] uppercase tracking-wider text-gray-500">
          Duration:{" "}
          <span className="text-gray-300">
            {membership?.plan?.duration || 0}{" "}
            <span className="lowercase">
              month
            </span>
          </span>
        </p>
      </div>

      {/* Divider */}
      <div className="my-3 border-t border-[#342721]" />

      {/* Card Number */}

      <div className="flex justify-between">

      <div className="space-y-2">
        <p className="text-[9px] uppercase tracking-wider text-gray-500">
          Card Number
        </p>

        <div className="flex items-center gap-2">
          <User
            size={14}
            className="text-orange-500"
          />

          <span className="text-xs font-medium text-gray-200">
            {membership?.cardNumber || "N/A"}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[9px] uppercase tracking-wider text-gray-500">
          Member
        </p>

        <div className="flex items-center gap-2">
          <User
            size={14}
            className="text-orange-500"
          />

          <span className="text-xs font-medium text-gray-200">
            {membership?.user?.fullName || "N/A"}
          </span>

        </div>
      </div>

      </div>

      

      {/* Divider */}
      <div className="my-3 border-t border-[#342721]" />

      {/* Requested Date */}
      <div className="flex items-center justify-between  gap-6">

<div className="flex items-center gap-4">
  
        <CalendarDays
          size={14}
          className="text-gray-500"
        />

        <div>
          <p className="text-[9px] text-gray-500">
            Requested
          </p>

          <p className="text-xs font-semibold text-gray-200">
            {membership?.purchase?.requestedAt
              ? new Date(
                  membership?.purchase?.requestedAt
                ).toLocaleString("en-BD", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "N/A"}
          </p>
        </div>
</div>

        <div>
          <p className="text-[9px] text-gray-500">
            Approved At
          </p>

          <p className="text-xs font-semibold text-gray-200">
            {membership?.purchase?.approvedAt
              ? new Date(
                  membership?.purchase?.approvedAt
                ).toLocaleString("en-BD", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Membership Dates */}
      {(membership?.startDate ||
        membership?.endDate) && membership?.status !== "suspended" && (
        <>
          <div className="my-3 border-t border-[#342721]" />

          <div className="flex justify-between ">
            {/* Start Date */}
            {membership?.startDate && (
              <div>
                <p className="text-[9px] text-gray-500">
                  Start Date
                </p>

                <p className="mt-0.5 text-xs text-gray-200">
                  {new Date(
                    membership.startDate
                  ).toLocaleDateString("en-BD", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            )}

            {/* End Date */}
            {membership?.endDate && (
              <div>
                <p className="text-[9px] text-gray-500">
                  End Date
                </p>

                <p className="mt-0.5 text-xs text-gray-200">
                  {new Date(
                    membership.endDate
                  ).toLocaleDateString("en-BD", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Edit */}



      <div className="mt-3 flex w-full justify-between border-t border-[#342721] pt-2" >

    <Link to={`/membershipById/${membership?._id}`} >
        <Eye size={20} />
      </Link>
        
    {isEdit && (
        <button
          type="button"
          onClick={() => setEdit(true)}
          className="rounded-md p-1 transition hover:bg-[#3a1e12]"
        >
          <Edit
            size={14}
            className="text-orange-500"
          />
        </button>
    )}  
      </div>

   {edit && (
<div className="fixed inset-0  h-screen w-screen bg-black/60 p-4 backdrop-blur-md"
onClick={()=>setEdit(false)}
>
    <MembershipForm membership={membership} isopen={setEdit} />
</div>
    )}

    </div>
  );
};

export default MembershipCard;