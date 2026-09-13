import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Clock3, Users, Dumbbell, ShieldAlert } from "lucide-react";




const PlanCard = ({ plan }) => {

  const navigate = useNavigate()

  return (
    <div className="w-[300px] shrink-0 overflow-hidden rounded-2xl border border-[#3a2b27] bg-[#1b1210] ">

    <div className="p-4 h-full flex flex-col">
  {/* Type + Gender */}
  <div className="mb-3 flex items-center justify-between">
    <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
      {plan?.type}
    </span>

    <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-orange-400">
      {plan?.gender === "both" ? "All Members" : plan?.gender}
    </span>
  </div>

  {/* Name */}
  <h2 className="text-2xl font-black uppercase leading-tight text-white">
    {plan?.name}
  </h2>

  {/* Description */}
  <p className="mt-2 text-xs leading-5 text-gray-400">
    {plan?.description}
  </p>

  {/* Price */}
  <div className="mt-4">
    <div className="flex items-end gap-1.5">
      <span className="text-3xl font-black leading-none text-orange-500">
        ৳{plan?.totalCharge?.toLocaleString()}
      </span>

      <span className=" text-xs text-gray-400">
        / {plan?.duration}
      </span>
    </div>

    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-500">
      <span>
        Enrollment: ৳{plan?.enrollmentCharge?.toLocaleString()}
      </span>

      <span>
        Subscription: ৳{plan?.subscriptionCharge?.toLocaleString()}
      </span>
    </div>
  </div>

  {/* Divider */}
  <div className="my-2 h-px bg-[#3a2b27]" />

  {/* Details */}
  <div className="space-y-2">

    {/* Duration */}
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
        <Clock3 size={14} />
      </div>

      <div>
        <p className="text-xs text-gray-300">Duration</p>
        <p className="text-[10px] text-gray-500">
          {plan?.duration}
        </p>
      </div>
    </div>

    {/* Gender */}
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
        <Users size={14} />
      </div>

      <div>
        <p className="text-xs text-gray-300">Gender</p>
        <p className="text-[10px] capitalize text-gray-500">
          {plan?.gender}
        </p>
      </div>
    </div>

    {/* Treadmill */}
    {plan?.treadmillUsageTime && (
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
          <Dumbbell size={14} />
        </div>

        <div>
          <p className="text-xs text-gray-300">
            Treadmill Usage
          </p>

          <p className="text-[10px] text-gray-500">
            {plan?.treadmillUsageTime}
          </p>
        </div>
      </div>
    )}
  </div>

  {/* Usage */}
  {/* <div className="mt-4">
    <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500">
      Included Access
    </h3>

    <div className="space-y-2">
      {plan?.usage?.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-500">
            <Check size={12} strokeWidth={3} />
          </div>

          <span className="text-xs text-gray-300">
            {item}
          </span>
        </div>
      ))}
    </div>
  </div> */}

  {/* Restrictions */}
  {/* <div className="mt-4 rounded-lg border border-[#3a2b27] bg-[#211613] p-3">
    <div className="flex gap-2.5">
      <ShieldAlert
        size={16}
        className="mt-0.5 shrink-0 text-orange-500"
      />

      <div>
        <p className="text-xs font-semibold text-gray-200">
          Restrictions
        </p>

        {plan?.restriction?.length > 0 ? (
          <ul className="mt-1.5 space-y-1">
            {plan.restriction.map((item, index) => (
              <li
                key={index}
                className="text-[10px] text-gray-500"
              >
                • {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-[10px] text-gray-500">
            No restrictions
          </p>
        )}
      </div>
    </div>
  </div> */}

  {/* CTA */}
 <div className="mt-auto pt-4">
  <Link to={`/plan-details/${plan?._id}`}>
    <button className="w-full rounded-lg bg-orange-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-orange-400">
      Details
    </button>
  </Link>
  </div>
</div>

{/* open window  */}



</div>
  );
};

export default PlanCard;