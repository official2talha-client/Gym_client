import { useMemo, useState } from 'react'
import {useGetBusinessForUserQuery} from '../../api/adminApi.js'
import SectionWrapper from '../../components/ui/SectionWrapper'
import { Clock3, Moon } from "lucide-react";
import clsx from 'clsx';
import { motion } from 'motion/react';


export default function Schedule() {
 
  const [activeDay, setActiveDay] = useState("All");

  const {data,isLoading,isError} = useGetBusinessForUserQuery()
  const business = data?.data

  return (
    <SectionWrapper
  id="schedule"
  eyebrow="Weekly Schedule"
  title="When we're open"
  subtitle="Check our weekly opening hours and plan your workout accordingly."
  className="bg-base-card/20"
>
  {/* ================= DAY FILTER ================= */}
  <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-2">
    {["All", ...(business?.weekdays?.map((item) => item.day) || [])].map(
      (day) => (
        <button
          key={day}
          onClick={() => setActiveDay(day)}
          aria-pressed={activeDay === day}
          className={clsx(
            "shrink-0 rounded-full border px-5 py-2.5 text-xs font-semibold transition-all duration-300",
            activeDay === day
              ? "border-[#F56A1F] bg-[#F56A1F] text-white shadow-lg shadow-[#F56A1F]/20"
              : "border-white/10 bg-white/[0.02] text-[#9B8D86] hover:border-[#F56A1F]/30 hover:bg-[#F56A1F]/5 hover:text-white"
          )}
        >
          {day}
        </button>
      )
    )}
  </div>

  {/* ================= SCHEDULE ================= */}
  {business?.weekdays?.length > 0 && (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {business.weekdays
        .filter(
          (item) => activeDay === "All" || item.day === activeDay
        )
        .map((item) => (
          <motion.div
            key={item._id || item.day}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={clsx(
              "group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300",
              item.isOpen
                ? "border-white/10 bg-[#15100E] hover:border-[#F56A1F]/30 hover:bg-[#1A120F]"
                : "border-white/5 bg-white/[0.02]"
            )}
          >
            {/* Orange glow */}
            {item.isOpen && (
              <div
                className="
                  pointer-events-none absolute
                  -right-10 -top-10
                  h-28 w-28 rounded-full
                  bg-[#F56A1F]/10
                  blur-3xl
                  transition-all duration-500
                  group-hover:bg-[#F56A1F]/20
                "
              />
            )}

            <div className="relative flex items-center justify-between">
              {/* Day + Icon */}
              <div className="flex items-center gap-3">
                <div
                  className={clsx(
                    "flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300",
                    item.isOpen
                      ? "border-[#F56A1F]/20 bg-[#F56A1F]/10 text-[#F56A1F] group-hover:scale-105"
                      : "border-white/10 bg-white/[0.03] text-[#756A64]"
                  )}
                >
                  {item.isOpen ? (
                    <Clock3 size={19} strokeWidth={2} />
                  ) : (
                    <Moon size={19} strokeWidth={2} />
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">
                    {item.day}
                  </h3>

                  <p
                    className={clsx(
                      "mt-1 text-[10px] font-semibold uppercase tracking-wider",
                      item.isOpen
                        ? "text-emerald-400"
                        : "text-[#756A64]"
                    )}
                  >
                    {item.isOpen ? "Open" : "Closed"}
                  </p>
                </div>
              </div>

              {/* Status dot */}
              <span
                className={clsx(
                  "h-2 w-2 rounded-full",
                  item.isOpen
                    ? "animate-pulse bg-emerald-400"
                    : "bg-[#514843]"
                )}
              />
            </div>

            {/* Time */}
            <div
              className={clsx(
                "relative mt-5 flex items-center justify-between rounded-xl border px-4 py-3",
                item.isOpen
                  ? "border-white/5 bg-white/[0.03]"
                  : "border-white/5 bg-black/10"
              )}
            >
              <div className="flex items-center gap-2">
                <Clock3
                  size={14}
                  className={
                    item.isOpen ? "text-[#F56A1F]" : "text-[#756A64]"
                  }
                />

                <span className="text-xs text-[#756A64]">
                  Hours
                </span>
              </div>

              <span
                className={clsx(
                  "text-xs font-semibold",
                  item.isOpen ? "text-white" : "text-[#514843]"
                )}
              >
                {item.isOpen
                  ? `${item.openingTime} — ${item.closingTime}`
                  : "Closed"}
              </span>
            </div>
          </motion.div>
        ))}
    </div>
  )}
</SectionWrapper>
  )
}
