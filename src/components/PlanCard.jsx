import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Clock3, Users, Dumbbell, ShieldAlert } from "lucide-react";




const PlanCard = ({ plan }) => {

  const navigate = useNavigate()

  return (
    <div
  className="
    group
    relative
    w-[310px]
    shrink-0
    overflow-hidden
    rounded-2xl
    border border-[#3a2d29]
    bg-[#1b1412]
    shadow-[0_10px_30px_rgba(0,0,0,0.25)]
    transition-all duration-300
    hover:-translate-y-1
    hover:border-[#594239]
    hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)]
  "
>
  {/* subtle accent glow */}
  <div
    className="
      pointer-events-none
      absolute
      -right-16
      -top-16
      h-36
      w-36
      rounded-full
      bg-[#b85f29]/[0.06]
      blur-3xl
      transition-all
      duration-500
      group-hover:bg-[#b85f29]/[0.10]
    "
  />

  <div className="relative flex h-full flex-col p-5">

    {/* Type + Gender */}
    <div className="mb-4 flex items-center justify-between">

      <span
        className="
          text-[10px]
          font-bold
          uppercase
          tracking-[0.18em]
          text-[#c46a32]
        "
      >
        {plan?.type}
      </span>

      <span
        className="
          rounded-full
          border border-[#594239]
          bg-[#261c19]
          px-3
          py-1
          text-[9px]
          font-semibold
          uppercase
          tracking-wide
          text-[#a99b94]
        "
      >
        {plan?.gender === "both"
          ? "All Members"
          : plan?.gender}
      </span>

    </div>

    {/* Name */}
    <h2
      className="
        text-[25px]
        uppercase
        leading-tight
        text-[#ede8e3]
      "
    >
      {plan?.name}
    </h2>

    {/* Description */}
    <p
      className="
        mt-2
        line-clamp-2
        text-[11px]
        leading-5
        text-[#918681]
      "
    >
      {plan?.description}
    </p>

    {/* Price */}
    <div className="mt-5">

      <div className="flex items-end gap-2">

        <span
          className="
            text-[32px]
            font-black
            leading-none
            tracking-tight
            text-[#c46a32]
          "
        >
          ৳{plan?.totalCharge?.toLocaleString()}
        </span>

        <span className="mb-1 text-[10px] text-[#746b67]">
          / {plan?.duration}
        </span>

      </div>

      <div
        className="
          mt-2.5
          flex
          flex-wrap
          gap-x-4
          gap-y-1
          text-[9px]
          text-[#756b66]
        "
      >
        <span>
          Enrollment:
          <span className="ml-1 text-[#aaa09a]">
            ৳{plan?.enrollmentCharge?.toLocaleString()}
          </span>
        </span>

        <span>
          Subscription:
          <span className="ml-1 text-[#aaa09a]">
            ৳{plan?.subscriptionCharge?.toLocaleString()}
          </span>
        </span>
      </div>

    </div>

    {/* Divider */}
    <div className="my-5 h-px bg-[#352925]" />

    {/* Details */}
    <div className="space-y-3">

      {/* Duration */}
      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            border border-[#4a372e]
            bg-[#241916]
            text-[#b85f29]
          "
        >
          <Clock3 size={14} strokeWidth={1.8} />
        </div>

        <div>
          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-[#756b66]
            "
          >
            Duration
          </p>

          <p className="mt-0.5 text-xs text-[#d2cbc6]">
            {plan?.duration}
          </p>
        </div>

      </div>

      {/* Gender */}
      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            border border-[#4a372e]
            bg-[#241916]
            text-[#b85f29]
          "
        >
          <Users size={14} strokeWidth={1.8} />
        </div>

        <div>
          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-[#756b66]
            "
          >
            Gender
          </p>

          <p className="mt-0.5 text-xs capitalize text-[#d2cbc6]">
            {plan?.gender}
          </p>
        </div>

      </div>

      {/* Treadmill */}
      {plan?.treadmillUsageTime && (
        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              border border-[#4a372e]
              bg-[#241916]
              text-[#b85f29]
            "
          >
            <Dumbbell size={14} strokeWidth={1.8} />
          </div>

          <div>
            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#756b66]
              "
            >
              Treadmill Usage
            </p>

            <p className="mt-0.5 text-xs text-[#d2cbc6]">
              {plan?.treadmillUsageTime}
            </p>
          </div>

        </div>
      )}

    </div>

    {/* CTA */}
    <div className="mt-auto pt-6">

      <Link to={`/plan-details/${plan?._id}`}>
        <button
          className="
            w-full
            rounded-xl
            border border-[#cb4e0b]
            bg-accent
            px-4
            py-3
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-[#fff7f0]
            transition-all
            duration-300
            hover:bg-orange-400
            hover:shadow-[0_6px_20px_rgba(184,95,41,0.18)]
          "
        >
          Details
        </button>
      </Link>

    </div>

  </div>
</div>
  );
};

export default PlanCard;