import { useForm } from "react-hook-form";
import { useUpdateMembershipMutation } from "../../api/membershipApi";
import toast from 'react-hot-toast'
import {X} from 'lucide-react'
import { useState } from "react";

const MembershipForm = ({ membership,isopen }) => {

const [select,setSelect] = useState("")
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: membership?.startDate
        ? new Date(membership.startDate)
            .toISOString()
            .split("T")[0]
        : "",

      endDate: membership?.endDate
        ? new Date(membership.endDate)
            .toISOString()
            .split("T")[0]
        : "",

      cardNumber: membership?.cardNumber || "",
      status:membership?.status || ""
    },
  });

  const [updateMembership,{isLoading}] = useUpdateMembershipMutation()

  const onSubmit = async(data) => {
    try {

        await updateMembership({
            id:membership?._id,
            formData:data
        }).unwrap()

        isopen(false)

        toast.success("membership updated successfully")

    } catch (error) {
        console.log("membership updation failed",error);
        toast.error(error?.data?.message || "membership updation failed")
        
    }
  };

  return (
    <>

    <div className="w-full h-full flex justify-center items-center" onClick={(d)=>d.stopPropagation()}>
       

<fieldset disabled={isLoading} className="w-full max-w-md rounded-2xl border border-[#352823] bg-[#191310] p-5">

    <form
      onSubmit={handleSubmit(onSubmit)}
      
    >
      <div className="flex justify-between">

      <h2 className="mb-5 text-xl font-bold text-white">
        Update Membership
      </h2>

      <div onClick={()=>isopen(false)}>
        <X />
       </div>
      </div>

      {/* Start Date */}
      <div className="mb-4">
        <label className="mb-2 block text-sm text-gray-400">
          Start Date
        </label>

        <input
          type="date"
          {...register("startDate", {
            required: "Start date is required",
          })}
          className="w-full rounded-lg border border-[#352823] bg-[#211914] px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500"
        />

        {errors.startDate && (
          <p className="mt-1 text-xs text-red-400">
            {errors.startDate.message}
          </p>
        )}
      </div>

      {/* End Date */}
      <div className="mb-4">
        <label className="mb-2 block text-sm text-gray-400">
          End Date
        </label>

        <input
          type="date"
          {...register("endDate", {
            required: "End date is required",
          })}
          className="w-full rounded-lg border border-[#352823] bg-[#211914] px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500"
        />

        {errors.endDate && (
          <p className="mt-1 text-xs text-red-400">
            {errors.endDate.message}
          </p>
        )}
      </div>

      {/* Card Number */}
      <div className="mb-5">
        <label className="mb-2 block text-sm text-gray-400">
          Card Number
        </label>

        <input
          type="text"
          {...register("cardNumber", {
            required: "Card number is required",
          })}
          className="w-full rounded-lg border border-[#352823] bg-[#211914] px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500"
        />

        {errors.cardNumber && (
          <p className="mt-1 text-xs text-red-400">
            {errors.cardNumber.message}
          </p>
        )}
      </div>

      {/* status  */}

<div className="mb-5">
        <label className="mb-2 block text-sm text-gray-400">
          Status
        </label>

       <select
  {...register("status", {
    required: "Status is required",
    onChange: (e) => setSelect(e.target.value),
  })}
  className="w-full rounded-lg border border-[#352823] bg-[#211914] px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500"
>
  <option value="">Select Status</option>
  <option value="active">Active</option>
  <option value="expired">Expired</option>
  <option value="suspended">Suspended</option>
</select>

        {errors.status && (
          <p className="mt-1 text-xs text-red-400">
            {errors.status.message}
          </p>
        )}
      </div>


      {/* cta  */}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-orange-500 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
      >
       {isLoading? "Updating...":" Update Membership"}
      </button>
    </form>

</fieldset>
    </div>
    </>
  );
};

export default MembershipForm;