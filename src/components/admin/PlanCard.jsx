import React, { useState } from "react";
import {useUpdatePlanMutation,useDeletePlanMutation} from '../../api/planApi.js'
import toast from "react-hot-toast";
import {Trash2} from 'lucide-react'
import { Link } from "react-router-dom";
import EditPlan from "./EditPlan.jsx";

const getValue = (plan, ...keys) => {
  for (const key of keys) {
    const value = key
      .split(".")
      .reduce((obj, part) => obj?.[part], plan);

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return "—";
};

const formatCurrency = (value) => {
  if (value === "—") return value;

  const number = Number(
    String(value).replace(/[^0-9.-]/g, "")
  );

  if (Number.isNaN(number)) return value;

  return `৳${number.toLocaleString("en-BD")}`;
};

// Icons
const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const GenderIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <circle cx="9" cy="8" r="3" />
    <path d="M4 19c.5-3 2.2-5 5-5s4.5 2 5 5" />
    <path d="M16 4h4v4M20 4l-5 5" />
  </svg>
);

const TreadmillIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 17 5-10 3 2-5 10" />
    <path d="m13 9 4-4M15 5l3 3M4 20h15" />
  </svg>
);

const Feature = ({ icon, title, value }) => (
  <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
    <div
      className="
        grid
        h-8 w-8
        shrink-0
        place-items-center
        rounded-lg
        bg-[#ff7312]/10
        text-[#ff7312]
        sm:h-9 sm:w-9
      "
    >
      {icon}
    </div>

    <div className="min-w-0">
      <p className="truncate text-xs font-medium text-white sm:text-sm">
        {title}
      </p>

      <p className="truncate text-[10px] text-gray-500 sm:text-xs">
        {value}
      </p>
    </div>
  </div>
);

const PlanCard = ({ plan}) => {

    const [confDelete,setConfDelete] = useState(false);
    const [edit,setEdit] = useState(false);

const [deletePlan,{isLoading:deleteLoading}] = useDeletePlanMutation()

const handleDelete = async()=>{
    try {
        await deletePlan(plan?._id).unwrap()

        toast.success("plan removed successfully")

        setConfDelete(false);
    } catch (error) {
        console.log("plan deletion failed",error);
        toast.error(error?.data?.message || "failed to delete plan")
        
    }
}

  const name = getValue(plan, "name", "planName", "title");

  const type = getValue(
    plan,
    "type",
    "category",
    "membershipType"
  );

  const gender = getValue(
    plan,
    "gender",
    "targetGender"
  );

  const price = getValue(
    plan,
    "price",
    "amount",
    "subscriptionPrice",
    "totalCharge"
  );

  const enrollment = getValue(
    plan,
    "enrollmentCharge",
    "enrollmentFee",
    "joiningFee"
  );

  const subscription = getValue(
    plan,
    "subscriptionCharge",
    "subscriptionFee",
    "monthlyFee"
  );

  const duration = getValue(
    plan,
    "duration",
    "durationValue"
  );

  const durationUnit = getValue(
    plan,
    "durationUnit",
    "duration_type"
  );

  const treadmill = getValue(
    plan,
    "treadmillUsageTime",
    "treadmill",
    "treadmillMinutes"
  );

  const description = getValue(
    plan,
    "description",
    "details",
    "shortDescription"
  );

  return (
    <>
    <article
      className="
        flex h-full w-full min-w-0 flex-col
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-[#17100d]
        p-3.5
        text-white
        transition-all duration-200
        hover:border-[#ff7312]/30
        hover:shadow-lg hover:shadow-black/20
        sm:p-4
        lg:p-5
      "
    >
     <Link to={`/plan-details/${plan?._id}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <span
          className="
            min-w-0 truncate
            text-[10px] font-bold
            uppercase
            tracking-[1.2px]
            text-[#ff7312]
            sm:text-xs
            sm:tracking-[1.5px]
          "
        >
          {String(type).toUpperCase()}
        </span>

        <span
          className="
            shrink-0
            rounded-full
            border border-[#ff7312]/30
            bg-[#ff7312]/5
            px-2 py-0.5
            text-[9px] font-semibold
            text-[#ff7312]
            sm:px-2.5 sm:py-1
            sm:text-[10px]
          "
        >
          {gender}
        </span>
      </div>

      {/* Title */}
      <h2
        className="
          mt-2.5
          min-w-0
          break-words
          text-lg
          font-bold
          uppercase
          leading-tight
          tracking-tight
          sm:mt-3
          sm:text-xl
          lg:text-2xl
        "
      >
        {name}
      </h2>

      {/* Description */}
      {description !== "—" && (
        <p
          className="
            mt-1.5
            line-clamp-2
            text-[11px]
            leading-4
            text-gray-400
            sm:mt-2
            sm:text-xs
            sm:leading-5
          "
        >
          {description}
        </p>
      )}

      {/* Price */}
      <div
        className="
          mt-3
          flex
          flex-wrap
          items-baseline
          gap-1.5
          sm:mt-4
        "
      >
        <span
          className="
            text-2xl
            font-bold
            leading-none
            text-[#ff7312]
            sm:text-3xl
            lg:text-[34px]
          "
        >
          {formatCurrency(price)}
        </span>

        <span className="text-[9px] text-gray-500 sm:text-[10px]">
          / {duration} month
        </span>
      </div>

      {/* Fees */}
      <div
        className="
          mt-1.5
          flex
          flex-wrap
          gap-x-3
          gap-y-1
          text-[9px]
          text-gray-500
          sm:mt-2
          sm:text-[10px]
        "
      >
        <span>
          Enrollment: {formatCurrency(enrollment)}
        </span>

        <span>
          Subscription: {formatCurrency(subscription)}
        </span>
      </div>

      {/* Divider */}
      <div className="my-3.5 h-px bg-white/10 sm:my-4" />

      {/* Features */}
      <div className="grid gap-2.5 sm:gap-3">
        <Feature
          icon={<ClockIcon />}
          title="Duration"
          value={`${duration}${
            durationUnit !== "—"
              ? ` ${durationUnit}`
              : ""
          }`}
        />

        <Feature
          icon={<GenderIcon />}
          title="Gender"
          value={gender}
        />

        <Feature
          icon={<TreadmillIcon />}
          title="Treadmill Usage"
          value={
            typeof treadmill === "number"
              ? `${treadmill} Minutes`
              : treadmill
          }
        />
      </div>

      {/* Actions */}
      <div
        className="
          mt-auto
          grid
          grid-cols-2
          gap-2
          pt-4
          sm:pt-5
        ">
            
        <button
          type="button"
          onClick={(e)=>{
             e.preventDefault();
        e.stopPropagation();
        setEdit(true)
        }}
          className="
            min-h-9
            rounded-lg
            bg-[#ff7312]
            px-2
            text-[10px]
            font-bold
            text-black
            transition
            hover:bg-[#ff812b]
            active:scale-[0.98]
            sm:min-h-10
            sm:px-3
            sm:text-xs
          "
        >
          EDIT
        </button>

        <button
          type="button"
          onClick={(e)=>{
             e.preventDefault();
        e.stopPropagation();
        setConfDelete(true)
        }}
          className="
            min-h-9
            rounded-lg
            border border-red-500/20
            bg-red-500/5
            px-2
            text-[10px]
            font-bold
            text-red-400
            transition
            hover:border-red-500/40
            hover:bg-red-500/10
            active:scale-[0.98]
            sm:min-h-10
            sm:px-3
            sm:text-xs
          "
        >
          DELETE
        </button>

      </div>


    </Link>
    </article>

    {confDelete && (


<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md" onClick={()=>setConfDelete(false)}>
  <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151515] p-6 text-white shadow-2xl" onClick={(e)=>e.stopPropagation()}>

    {/* Icon */}
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
      <Trash2
        size={22}
        className="text-red-400"
        strokeWidth={2}
      />
    </div>

    {/* Content */}
    <div>
      <h2 className="text-xl font-semibold">
        Delete Plan?
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-400">
        Are you sure you want to delete this plan? This action
        cannot be undone and all information associated with this
        plan will be permanently removed.
      </p>
    </div>

    {/* Divider */}
    <div className="my-6 border-t border-white/10" />

    {/* Actions */}
    <div className="flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={()=>setConfDelete(false)}
        className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={handleDelete}
        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-500 active:scale-[0.98]"
      >
        <Trash2 size={16} />
       {deleteLoading? "Deleting..." : "Delete Plan"}
      </button>
    </div>

  </div>
</div>

    )}

    {edit && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md" onClick={()=>setEdit(false)}>

   <EditPlan onclose={()=>setEdit(false)} plan={plan} />

</div>

    )}

    </>
  );
};

export default PlanCard;

