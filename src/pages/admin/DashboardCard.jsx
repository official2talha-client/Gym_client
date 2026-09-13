import React from "react";
import {
  Users,
  TrendingUp,
  TrendingDown,
  Wallet,
  Dumbbell,
  CreditCard,
  UserCheck,
  Activity,
} from "lucide-react";

const DashboardCard = ({
  label,
  value,
  grow,
  state,
  line = false,
}) => {
  const getIcon = () => {
    const text = label?.toLowerCase();

    if (text?.includes("member")) return Users;
    if (text?.includes("revenue")) return Wallet;
    if (text?.includes("purchase")) return CreditCard;
    if (text?.includes("active")) return UserCheck;
    if (text?.includes("gym")) return Dumbbell;

    return Activity;
  };

  const Icon = getIcon();

  const hasGrowth = grow !== undefined && grow !== null;
  const isProfit = state === "profit";
  const isLoss = state === "loss";

  return (
    <div
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#1d1512]
        px-4
        py-4
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-[#ff681d]/30
        hover:shadow-lg
        hover:shadow-black/20
      "
    >
      {/* Decorative glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-8
          -top-8
          h-24
          w-24
          rounded-full
          bg-[#ff681d]/10
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-[#ff681d]/15
        "
      />

      {/* Decorative circle */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-7
          -left-7
          h-16
          w-16
          rounded-full
          border
          border-[#ff681d]/5
        "
      />

      {/* Top */}
      <div className="relative flex items-start justify-between gap-3">
        {/* Icon */}
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-[#ff681d]/15
            bg-[#ff681d]/10
            text-[#ff681d]
            transition-all
            duration-300
            group-hover:scale-105
            group-hover:bg-[#ff681d]/15
          "
        >
          <Icon size={17} strokeWidth={1.8} />
        </div>

        {/* Growth */}
        {hasGrowth && (
          <div
            className={`
              flex
              items-center
              gap-1
              rounded-full
              border
              px-2
              py-1
              text-[10px]
              font-semibold
              ${
                isProfit
                  ? "border-emerald-500/15 bg-emerald-500/10 text-emerald-400"
                  : isLoss
                  ? "border-red-500/15 bg-red-500/10 text-red-400"
                  : "border-white/10 bg-white/[0.03] text-[#aaa09b]"
              }
            `}
          >
            {isProfit && <TrendingUp size={11} />}
            {isLoss && <TrendingDown size={11} />}

            {state === "profit" && "▲"}
            {state === "loss" && "▼"}

            {grow > 0
              ? `${grow}%`
              : grow === 0
              ? "0%"
              : null}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative mt-4">
        <p
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.14em]
            text-[#8f847e]
          "
        >
          {label}
        </p>

        <h2
          className="
            mt-0.5
            truncate
            text-2xl
            font-semibold
            tracking-wider
            text-white
          "
        >
          {value}
        </h2>
      </div>

      {/* Bottom */}
      <div className="relative mt-4">
        {line ? (
          <div className="h-6 w-full opacity-80 transition-opacity duration-300 group-hover:opacity-100">
            <svg
              viewBox="0 0 300 40"
              className="h-full w-full"
              preserveAspectRatio="none"
            >
              <path
                d="
                  M0 27
                  C20 20, 35 23, 50 25
                  C70 28, 80 20, 100 22
                  C120 25, 130 17, 150 20
                  C175 23, 185 17, 205 18
                  C225 19, 240 14, 260 16
                  C280 18, 290 12, 300 13
                "
                fill="none"
                stroke="#ff681d"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="
                  M0 27
                  C20 20, 35 23, 50 25
                  C70 28, 80 20, 100 22
                  C120 25, 130 17, 150 20
                  C175 23, 185 17, 205 18
                  C225 19, 240 14, 260 16
                  C280 18, 290 12, 300 13
                "
                fill="none"
                stroke="#ff681d"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.08"
              />
            </svg>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff681d]" />

            <span className="text-[9px] font-medium uppercase tracking-wider text-[#756a64]">
              Current overview
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;