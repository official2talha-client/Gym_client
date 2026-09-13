import React from "react";
import { useForm } from "react-hook-form";
import {X} from 'lucide-react'
import {useCreateMembershipMutation} from '../../api/membershipApi.js'
import toast from 'react-hot-toast'

const AcceptPurchaseForm = ({ purchase,close,refetch }) => {    

 const today = new Date();

const startDate = new Date(today);
startDate.setHours(0, 0, 0, 0);

const endDate = new Date(today);
endDate.setMonth(
  endDate.getMonth() + Number(purchase?.plan?.duration || 0)
);

// Format for <input type="date">
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  defaultValues: {
    purchaseId: purchase?._id || "",
    cardNumber: purchase?.user?.membershipCard || "",
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  },
});

const [createMembership,{isLoading}] = useCreateMembershipMutation()

  const onSubmit=async(data)=>{
    try {

        await createMembership(data).unwrap()

        close(false)

        toast.success("membership created")

        refetch();

    } catch (error) {
        console.log("membership creation failed",error)
        toast.error(error?.data?.message || "membership creation failed")
    }
    
  }

  return (

   <div
  className="relative z-[999] w-full max-w-2xl overflow-hidden rounded-2xl border border-[#563c18] bg-[#563c18] shadow-2xl shadow-black/50"
  onClick={(e) => e.stopPropagation()}
>
  {/* Close Button */}
  <button
    type="button"
    onClick={() => close(false)}
    className="
      absolute right-4 top-4 z-20
      flex h-8 w-8 items-center justify-center
      rounded-lg
      border border-white/10
      bg-black/20
      text-lg text-[#9B8D86]
      transition
      hover:border-red-500/30
      hover:bg-red-500/10
      hover:text-red-400
    "
    aria-label="Close"
  >
    <X />
  </button>

  {/* Header */}
  <div className="border-b border-[#352823] bg-[#291d0c] px-5 py-4">
    <div className="flex items-center justify-between pr-10">
      <div>
        <h2 className="text-lg font-bold text-white">
          Accept Purchase
        </h2>

        <p className="mt-1 text-xs text-[#9B8D86]">
          Review membership details before approval
        </p>
      </div>

      <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold capitalize text-orange-400">
        Pending
      </span>
    </div>
  </div>

<fieldset disabled={isLoading}>


  {/* Form */}
  <form  onSubmit={handleSubmit(onSubmit)}
    className="space-y-4 bg-[#120D0B] p-5"
  >
    {/* Purchase Information */}
    <section className="rounded-xl border border-[#352823] bg-[#1A1310] p-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold tracking-wide text-white">
          Purchase Information
        </h3>

        <p className="mt-1 text-xs text-[#9B8D86]">
          Purchase request details
        </p>
      </div>

      {/* Purchase ID */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-[#B7A9A1]">
          Purchase ID
        </label>

        <input
          type="text"
          {...register("purchaseId")}
          readOnly
          className="
            h-10 w-full
            cursor-not-allowed
            rounded-lg
            border border-[#352823]
            bg-[#211914]
            px-3
            font-mono
            text-xs
            text-[#E7DBD4]
            outline-none
          "
        />
      </div>
    </section>

    {/* Membership Details */}
    <section className="rounded-xl border border-[#352823] bg-[#1A1310] p-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold tracking-wide text-white">
          Membership Details
        </h3>

        <p className="mt-1 text-xs text-[#9B8D86]">
          Configure the membership period and card number
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Card Number */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#B7A9A1]">
            Membership Card Number
          </label>

          <input
            type="text"
            placeholder="GYM-12345"
            {...register("cardNumber", {
              required: "Membership card number is required",
            })}
            className="
              h-10 w-full
              rounded-lg
              border border-[#352823]
              bg-[#211914]
              px-3
              text-sm
              text-white
              outline-none
              transition
              placeholder:text-[#6F625B]
              focus:border-orange-500
              focus:ring-1
              focus:ring-orange-500/20
            "
          />

          {errors.cardNumber && (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.cardNumber.message}
            </p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#B7A9A1]">
            Start Date (MM/DD/YY)
          </label>

          <input
            type="date"
            {...register("startDate", {
              required: "Start date is required",
            })}
            className="
              h-10 w-full
              rounded-lg
              border border-[#352823]
              bg-[#211914]
              px-3
              text-sm
              text-white
              outline-none
              [color-scheme:dark]
              focus:border-orange-500
              focus:ring-1
              focus:ring-orange-500/20
            "
          />

          {errors.startDate && (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.startDate.message}
            </p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#B7A9A1]">
            End Date (MM/DD/YY)
          </label>

          <input
            type="date"
            {...register("endDate", {
              required: "End date is required",
            })}
            className="
              h-10 w-full
              rounded-lg
              border border-[#352823]
              bg-[#211914]
              px-3
              text-sm
              text-white
              outline-none
              [color-scheme:dark]
              focus:border-orange-500
              focus:ring-1
              focus:ring-orange-500/20
            "
          />

          {errors.endDate && (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.endDate.message}
            </p>
          )}
        </div>

      </div>
    </section>

    {/* Footer */}
    <div className="flex items-center justify-between border-t border-[#352823] pt-4">
      <p className="max-w-xs text-xs leading-relaxed text-[#8F817A]">
        This will create an active membership for this purchase.
      </p>

      <button
        type="submit"
        className="
          rounded-lg
          bg-orange-500
          px-5
          py-2.5
          text-sm
          font-semibold
          text-white
          shadow-lg
          shadow-orange-950/30
          transition
          hover:bg-orange-400
          active:scale-[0.98]
        "
      >
        {isLoading? "Proccessing..." : "Accept Purchase" }
      </button>
    </div>
  </form>
  </fieldset>
</div>



  );
};

export default AcceptPurchaseForm;