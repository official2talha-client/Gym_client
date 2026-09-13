import React,{useState} from "react";
import {
  Check,
  Clock3,
  Users,
  Dumbbell,
  CalendarDays,
  CreditCard,
  ShieldCheck,
  ArrowLeft 
} from "lucide-react";
import { useGetPlanByIdQuery } from "../api/planApi.js";
import { useNavigate, useParams } from "react-router-dom";

import {useGetCurrentUserQuery} from '../api/userApi.js'
import ConfirmModal from "../components/ui/ConfirmModal.jsx";
import {useCreatePurchaseMutation} from '../api/purchaseApi.js'
import toast from 'react-hot-toast'

const PlanDetails = () => {

      const [open,setOpen] = useState(false)

    const {id} =useParams()
    const navigate = useNavigate()

  const {
    data,
    isLoading:planLoading,
    isError,
  } = useGetPlanByIdQuery(id);

  const plan = data?.data;

  const {data:userData} = useGetCurrentUserQuery()
  const user = userData?.data;
  const token = localStorage.getItem("token")
  const authentic = !!user && !!token

const [createPurchase ,{isLoading}] = useCreatePurchaseMutation();

const confirmPurchase = async()=>{
  try {

    const res = await createPurchase(plan?._id).unwrap()    
    setOpen(false)

    toast.success("purchase request successfull")

    navigate("/member/purchase")

    
  } catch (error) {

    console.log("purchase error",error);
    toast.error(error?.data?.message || "plan purchase failed, try again !")
    
    
  }
}


  // Loading
  if (planLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center ">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-[#352823] border-t-orange-500" />
          <p className="text-sm text-ink-muted">
            Loading plan details...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (isError || !plan) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-5 text-center">
          <p className="text-sm font-medium text-red-400">
            Failed to load plan
          </p>

          <p className="mt-1 text-xs text-ink-muted">
            The plan could not be found or something went wrong.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#120D0B] pt-20 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
<button
  type="button"
  onClick={() => navigate(-1)}
  className="group mb-6 inline-flex items-center gap-2 rounded-full border border-[#352823] bg-[#1A1310] px-4 py-2.5 text-sm font-medium text-[#B7A9A1] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-x-1 hover:border-orange-500/30 hover:bg-[#211914] hover:text-white"
>
  <ArrowLeft
    size={17}
    className="transition-transform duration-300 group-hover:-translate-x-1"
  />

  <span>Back</span>
</button>
        {/* Header */}
        <div className="relative mb-6 overflow-hidden rounded-2xl border border-[#352823] bg-[#1A1310] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-orange-500/5 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-400">
                  {plan.type || "Membership"}
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-ink-muted">
                  {plan.gender || "All Members"}
                </span>
              </div>

              <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
                {plan.name}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
                {plan.description}
              </p>
            </div>

            {/* Price */}
            <div className="shrink-0 rounded-2xl border border-orange-500/20 bg-orange-500/5 px-6 py-4 sm:text-right">
              <p className="text-xs uppercase tracking-wider text-ink-muted">
                Total Charge
              </p>

              <p className="mt-1 text-3xl font-bold text-orange-400">
                ৳{plan.totalCharge?.toLocaleString() || "0"}
              </p>

              <p className="mt-1 text-xs text-ink-muted">
                {plan.duration} month membership
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-5 lg:grid-cols-3">

          {/* Left */}
          <div className="space-y-5 lg:col-span-2">

            {/* Membership Overview */}
            <section className="rounded-2xl border border-[#352823] bg-[#1A1310] p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                  <Dumbbell size={19} className="text-orange-400" />
                </div>

                <div>
                  <h2 className="font-semibold text-white">
                    Membership Overview
                  </h2>

                  <p className="text-xs text-ink-muted">
                    Basic information about this plan
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard
                  icon={CalendarDays}
                  label="Duration"
                  value={`${plan.duration} Months`}
                />

                <InfoCard
                  icon={Users}
                  label="Gender"
                  value={plan.gender || "Both"}
                />

                <InfoCard
                  icon={ShieldCheck}
                  label="Membership Type"
                  value={plan.type || "Standard"}
                />

                <InfoCard
                  icon={Clock3}
                  label="Treadmill Usage"
                  value={plan.treadmillUsageTime || "Not specified"}
                />
              </div>
            </section>

            {/* Included Usage */}
            <section className="rounded-2xl border border-[#352823] bg-[#1A1310] p-5">
              <div className="mb-5">
                <h2 className="font-semibold text-white">
                  Included Access
                </h2>

                <p className="mt-1 text-xs text-ink-muted">
                  Facilities and services included with this membership
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {plan.usage?.length > 0 ? (
                  plan.usage.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#211914] px-4 py-3 transition-colors hover:border-orange-500/20"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                        <Check
                          size={14}
                          className="text-emerald-400"
                        />
                      </div>

                      <span className="text-sm text-[#D8CEC8]">
                        {item}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-ink-muted">
                    No usage information available.
                  </p>
                )}
              </div>
            </section>

            {/* Restrictions */}
            <section className="rounded-2xl border border-[#352823] bg-[#1A1310] p-5">
              <div className="mb-5">
                <h2 className="font-semibold text-white">
                  Restrictions
                </h2>

                <p className="mt-1 text-xs text-ink-muted">
                  Areas or services with restrictions under this plan
                </p>
              </div>

              {plan.restriction?.length > 0 ? (
                <div className="space-y-2">
                  {plan.restriction.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="flex items-center gap-3 rounded-lg border border-red-500/10 bg-red-500/5 px-4 py-3"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />

                      <span className="text-sm text-[#B7A9A1]">
                        {item
                          .replace(/\\/g, "")
                          .replace(/"/g, "")
                          .trim()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-4 py-3">
                  <p className="text-sm text-emerald-400">
                    No restrictions
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Right */}
          <div className="space-y-5">

            {/* Pricing */}
            <section className="rounded-2xl border border-[#352823] bg-[#1A1310] p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                  <CreditCard
                    size={19}
                    className="text-orange-400"
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-white">
                    Pricing
                  </h2>

                  <p className="text-xs text-ink-muted">
                    Membership charge breakdown
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <ChargeRow
                  label="Subscription Charge"
                  value={plan.subscriptionCharge}
                />

                <ChargeRow
                  label="Enrollment Charge"
                  value={plan.enrollmentCharge}
                />

                <div className="my-2 border-t border-white/10" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">
                    Total Charge
                  </span>

                  <span className="text-lg font-bold text-orange-400">
                    ৳{plan.totalCharge?.toLocaleString() || "0"}
                  </span>
                </div>
              </div>
            </section>

            <div>

        <button className="w-full rounded-lg bg-orange-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-orange-400" onClick={()=>setOpen(true)} >
            Make Purchase
            </button>

            </div>

          </div>
        </div>
      </div>

  {open && (
  authentic?
  
  (
  <ConfirmModal open={true} onConfirm={confirmPurchase} onCancel={()=>setOpen(false)} loading={isLoading} />
   
)
  
  :
  
  ( <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={()=>setOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-[#342620] bg-[#1d1512] p-6 shadow-2xl">
        {/* Content */}
        <div className="text-center">

          <p className="mt-3 text-sm leading-6 text-[#a99b94]">
            You must have login first, to request any membership!
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={()=>setOpen(false)}
            className="flex-1 rounded-xl border border-[#45352e] bg-[#261c18] px-5 py-3 text-sm font-semibold text-[#c9bbb4] transition hover:bg-[#30231e]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex-1 rounded-xl bg-[#ff681d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e95712]"
          >
            Login
          </button>
        </div>
      </div>
    </div>)

)}

    </div>
  );
};

/* ---------------------------------- */
/* Reusable Components */
/* ---------------------------------- */

const InfoCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-xl border border-white/5 bg-[#211914] p-4">
      <div className="flex items-center gap-3">
        <Icon size={17} className="text-orange-400" />

        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-ink-muted">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-medium text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

const ChargeRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-ink-muted">
        {label}
      </span>

      <span className="text-sm font-medium text-white">
        ৳{value?.toLocaleString() || "0"}
      </span>
    </div>
  );
};

const MetaRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-ink-muted">
        {label}
      </span>

      <span className="text-right text-xs font-medium text-[#D8CEC8]">
        {value}
      </span>
    </div>
  );
};

export default PlanDetails;