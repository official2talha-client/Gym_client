import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useUpdatePlanMutation } from "../../api/planApi.js";
import { Trash2 } from "lucide-react";

const planSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Plan name must be at least 3 characters.")
    .max(100),

  description: z
    .string()
    .trim()
    .min(2, "Description must be at least 2 characters.")
    .max(300),

  duration: z.coerce.number(),

  type: z.enum(["elegant", "basic", "elite"]),

  subscriptionCharge: z.coerce
    .number()
    .min(0, "Subscription charge cannot be negative."),

  enrollmentCharge: z.coerce
    .number()
    .min(0, "Enrollment charge cannot be negative."),

  usage: z
    .array(z.string().trim())
    .min(1, "At least one equipment must be provided."),

  restriction: z
    .array(z.string().trim())
    .optional()
    .default([]),

  treadmillUsageTime: z
    .string()
    .trim()
    .min(1, "Treadmill usage time is required."),

  gender: z.enum(["male", "female", "both"]),
});

const EditPlan = ({ plan, onclose }) => {
  const [updatePlan, { isLoading }] = useUpdatePlanMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(planSchema),

    defaultValues: {
      name: plan?.name || "",
      description: plan?.description || "",
      duration: plan?.duration || "",
      type: plan?.type || "basic",
      subscriptionCharge: plan?.subscriptionCharge || "",
      enrollmentCharge: plan?.enrollmentCharge || "",
      usage: plan?.usage?.length ? plan.usage : [""],
      restriction: plan?.restriction?.length ? plan.restriction : [""],
      treadmillUsageTime: plan?.treadmillUsageTime || "",
      gender: plan?.gender || "both",
    },
  });

  const {
    fields: usageFields,
    append: appendUsage,
    remove: removeUsage,
  } = useFieldArray({
    control,
    name: "usage",
  });

  const {
    fields: restrictionFields,
    append: appendRestriction,
    remove: removeRestriction,
  } = useFieldArray({
    control,
    name: "restriction",
  });

  const handleUpdate = async (data) => {
    try {

      const response = await updatePlan({
        id: plan?._id,
        formData: data

      }).unwrap();

      console.log("Update Response:", response);

      toast.success(
        response?.message || "Plan updated successfully!"
      );

      if (onclose) {
        onclose();
      }
    } catch (error) {
      console.error("Plan update error:", error);

      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to update plan."
      );
    }
  };

  return (
    <div
  className="w-full max-w-4xl max-h-[95vh] overflow-x-hidden overflow-y-auto gym-scrollbar rounded-2xl border border-white/10 bg-[#17100d] p-6 shadow-xl"
  onClick={(e) => e.stopPropagation()}
>
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Edit Membership Plan
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Update the information of this membership plan.
        </p>
      </div>

    <fieldset disabled={isLoading}>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="space-y-6"
      >
        {/* Name */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Plan Name
          </label>

          <input
            {...register("name")}
            type="text"
            placeholder="Enter plan name"
            className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-orange-500"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Description */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Description
          </label>

          <textarea
            {...register("description")}
            rows={4}
            placeholder="Describe this membership plan..."
            className="w-full resize-none rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-orange-500"
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Duration + Type */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Duration
            </label>

            <input
              {...register("duration")}
              type="number"
              placeholder="e.g. 30"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-orange-500"
            />

            {errors.duration && (
              <p className="mt-1 text-sm text-red-400">
                {errors.duration.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Plan Type
            </label>

            <select
              {...register("type")}
              className="w-full rounded-lg border border-white/10 bg-[#17100d] px-4 py-3 text-white outline-none focus:border-orange-500"
            >
              <option value="basic">Basic</option>
              <option value="elegant">Elegant</option>
              <option value="elite">Elite</option>
            </select>

            {errors.type && (
              <p className="mt-1 text-sm text-red-400">
                {errors.type.message}
              </p>
            )}
          </div>

        </div>

        {/* Charges */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Subscription Charge
            </label>

            <input
              {...register("subscriptionCharge")}
              type="number"
              min="0"
              placeholder="Enter subscription charge"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-orange-500"
            />

            {errors.subscriptionCharge && (
              <p className="mt-1 text-sm text-red-400">
                {errors.subscriptionCharge.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Enrollment Charge
            </label>

            <input
              {...register("enrollmentCharge")}
              type="number"
              min="0"
              placeholder="Enter enrollment charge"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-orange-500"
            />

            {errors.enrollmentCharge && (
              <p className="mt-1 text-sm text-red-400">
                {errors.enrollmentCharge.message}
              </p>
            )}
          </div>

        </div>

        {/* Usage */}

        <div>

          <div className="mb-3 flex items-center justify-between">

            <div>
              <label className="text-sm font-medium text-gray-300">
                Equipment Usage
              </label>

              <p className="text-xs text-gray-500">
                Add equipment available in this plan.
              </p>
            </div>

            <button
              type="button"
              onClick={() => appendUsage("")}
              className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
            >
              + Add
            </button>

          </div>

          <div className="space-y-3">

            {usageFields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-2"
              >

                <input
                  {...register(`usage.${index}`)}
                  type="text"
                  placeholder={`Equipment ${index + 1}`}
                  className="flex-1 rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-orange-500"
                />

                {usageFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeUsage(index)}
                    className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 />
                  </button>
                )}

              </div>
            ))}

          </div>

          {errors.usage && (
            <p className="mt-1 text-sm text-red-400">
              {errors.usage.message}
            </p>
          )}

        </div>

        {/* Restrictions */}

        <div>

          <div className="mb-3 flex items-center justify-between">

            <div>
              <label className="text-sm font-medium text-gray-300">
                Restrictions
                <span className="ml-2 text-xs text-gray-500">
                  (Optional)
                </span>
              </label>

              <p className="text-xs text-gray-500">
                Add any restrictions for this plan.
              </p>
            </div>

            <button
              type="button"
              onClick={() => appendRestriction("")}
              className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/20"
            >
              + Add
            </button>

          </div>

          <div className="space-y-3">

            {restrictionFields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-2"
              >

                <input
                  {...register(`restriction.${index}`)}
                  type="text"
                  placeholder={`Restriction ${index + 1}`}
                  className="flex-1 rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-orange-500"
                />

                <button
                  type="button"
                  onClick={() => removeRestriction(index)}
                  className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 />
                </button>

              </div>
            ))}

          </div>

        </div>

        {/* Treadmill */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Treadmill Usage Time
          </label>

          <input
            {...register("treadmillUsageTime")}
            type="text"
            placeholder="e.g. 30 minutes per day"
            className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-orange-500"
          />

          {errors.treadmillUsageTime && (
            <p className="mt-1 text-sm text-red-400">
              {errors.treadmillUsageTime.message}
            </p>
          )}
        </div>

        {/* Gender */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Gender
          </label>

          <select
            {...register("gender")}
            className="w-full rounded-lg border border-white/10 bg-[#17100d] px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            <option value="both">Both</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {errors.gender && (
            <p className="mt-1 text-sm text-red-400">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-3 border-t border-white/10 pt-5">

          <button
            type="button"
            onClick={onclose}
            disabled={isLoading}
            className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-medium text-gray-300 transition hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Plan"}
          </button>

        </div>

      </form>
    </fieldset>

    </div>
  );
};

export default EditPlan;
