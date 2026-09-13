import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Search,
  User,
  CreditCard,
  CalendarDays,
  X,
} from "lucide-react";

const ManualMembershipForm = ({
  plans = [],
  users = [],
  name,
  setName,
  onSubmitMembership,
  onClose,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: "",
      plan: "",
      cardNumber: "",
      startDate: "",
      endDate: "",
    },
  });

  const selectedUser = watch("user");
  const selectedPlan = watch("plan");

  const [showUsers, setShowUsers] = useState(false);

  const filteredUsers = users?.filter((user) =>
    (
      user?.userName ||
      user?.fullName ||
      ""
    )
      .toLowerCase()
      .includes((name || "").toLowerCase())
  );

  const handleUserSelect = (user) => {
    setValue("user", user._id, {
      shouldValidate: true,
    });

    setName(user.userName || user.fullName || "");
    setShowUsers(false);
  };

  const submitForm = (data) => {
    onSubmitMembership(data);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={() => onClose?.()}
    >
      <div
        className="
          relative w-full max-w-2xl overflow-hidden
          rounded-2xl border border-[#352823]
          bg-[#1A1310] shadow-2xl shadow-black/50
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Create Manual Membership
            </h2>

            <p className="mt-1 text-xs text-[#9B8D86]">
              Create a membership directly for an existing user
            </p>
          </div>

          <button
            type="button"
            onClick={() => onClose?.()}
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg border border-white/10
              bg-white/[0.03] text-[#9B8D86]
              transition hover:border-red-500/30
              hover:bg-red-500/10 hover:text-red-400
            "
          >
            <X size={17} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(submitForm)}
          className="space-y-5 p-6"
        >
          {/* User Search */}
          <div className="relative">
            <label className="mb-2 block text-xs font-medium text-[#B7A9A1]">
              Search User
            </label>

            <div className="relative">
              <Search
                size={17}
                className="
                  pointer-events-none absolute left-3
                  top-1/2 -translate-y-1/2
                  text-[#756A64]
                "
              />

              <input
                type="text"
                value={name || ""}
                onChange={(e) => {
                  setName(e.target.value);
                  setShowUsers(true);

                  // Clear previously selected user
                  setValue("user", "", {
                    shouldValidate: true,
                  });
                }}
                onFocus={() => setShowUsers(true)}
                placeholder="Search by username or name..."
                className="
                  h-11 w-full rounded-xl
                  border border-white/10
                  bg-[#211914]
                  pl-10 pr-4
                  text-sm text-white
                  placeholder:text-[#756A64]
                  outline-none transition
                  focus:border-orange-500/50
                  focus:ring-1 focus:ring-orange-500/20
                "
              />
            </div>

            {/* Search Results */}
            {showUsers && name?.trim() && (
              <div
                className="
                  absolute left-0 right-0 top-full z-50 mt-2
                  max-h-60 overflow-y-auto
                  rounded-xl border border-white/10
                  bg-[#211914] shadow-2xl
                "
              >
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <button
                      key={user._id}
                      type="button"
                      onClick={() => handleUserSelect(user)}
                      className="
                        flex w-full items-center gap-3
                        border-b border-white/[0.05]
                        px-4 py-3 text-left
                        transition hover:bg-white/[0.04]
                      "
                    >
                      {/* Avatar */}
                      <div
                        className="
                          flex h-9 w-9 shrink-0
                          items-center justify-center
                          rounded-lg border border-orange-500/15
                          bg-orange-500/10
                          text-orange-400
                        "
                      >
                        <User size={16} />
                      </div>

                      {/* User info */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">
                          {user?.fullName || user?.userName}
                        </p>

                        <div className="mt-0.5 flex flex-wrap gap-x-3 text-[11px] text-[#756A64]">
                          {user?.userName && (
                            <span>@{user.userName}</span>
                          )}

                          {user?.phone && (
                            <span>{user.phone}</span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-[#9B8D86]">
                      No users found
                    </p>

                    <p className="mt-1 text-xs text-[#756A64]">
                      Try another username or name
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Selected user indicator */}
            {selectedUser && (
              <div className="mt-2 flex items-center gap-2 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                User selected
              </div>
            )}

            <input
              type="hidden"
              {...register("user", {
                required: "Please select a user",
              })}
            />

            {errors.user && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.user.message}
              </p>
            )}
          </div>

          {/* Plan */}
          <div>
            <label className="mb-2 block text-xs font-medium text-[#B7A9A1]">
              Membership Plan
            </label>

            <select
              {...register("plan", {
                required: "Please select a plan",
              })}
              className="
                h-11 w-full rounded-xl
                border border-white/10
                bg-[#211914]
                px-3
                text-sm text-white
                outline-none transition
                focus:border-orange-500/50
                focus:ring-1 focus:ring-orange-500/20
              "
            >
              <option value="">Select a plan</option>

              {plans.map((plan) => (
                <option key={plan._id} value={plan._id}>
                  {plan.name}
                </option>
              ))}
            </select>

            {errors.plan && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.plan.message}
              </p>
            )}
          </div>

          {/* Card Number */}
          <div>
            <label className="mb-2 block text-xs font-medium text-[#B7A9A1]">
              Membership Card Number
            </label>

            <div className="relative">
              <CreditCard
                size={17}
                className="
                  pointer-events-none absolute left-3
                  top-1/2 -translate-y-1/2
                  text-[#756A64]
                "
              />

              <input
                type="text"
                placeholder="Enter membership card number"
                {...register("cardNumber", {
                  required: "Card number is required",
                })}
                className="
                  h-11 w-full rounded-xl
                  border border-white/10
                  bg-[#211914]
                  pl-10 pr-4
                  text-sm text-white
                  placeholder:text-[#756A64]
                  outline-none transition
                  focus:border-orange-500/50
                  focus:ring-1 focus:ring-orange-500/20
                "
              />
            </div>

            {errors.cardNumber && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Start Date */}
            <div>
              <label className="mb-2 block text-xs font-medium text-[#B7A9A1]">
                Start Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="
                    pointer-events-none absolute left-3
                    top-1/2 -translate-y-1/2
                    text-[#756A64]
                  "
                />

                <input
                  type="date"
                  {...register("startDate", {
                    required: "Start date is required",
                  })}
                  className="
                    h-11 w-full rounded-xl
                    border border-white/10
                    bg-[#211914]
                    pl-10 pr-3
                    text-sm text-white
                    outline-none transition
                    focus:border-orange-500/50
                    focus:ring-1 focus:ring-orange-500/20
                    [color-scheme:dark]
                  "
                />
              </div>

              {errors.startDate && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="mb-2 block text-xs font-medium text-[#B7A9A1]">
                End Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="
                    pointer-events-none absolute left-3
                    top-1/2 -translate-y-1/2
                    text-[#756A64]
                  "
                />

                <input
                  type="date"
                  {...register("endDate", {
                    required: "End date is required",
                    validate: (value) => {
                      const startDate = watch("startDate");

                      if (
                        startDate &&
                        value &&
                        new Date(value) <= new Date(startDate)
                      ) {
                        return "End date must be after start date";
                      }

                      return true;
                    },
                  })}
                  className="
                    h-11 w-full rounded-xl
                    border border-white/10
                    bg-[#211914]
                    pl-10 pr-3
                    text-sm text-white
                    outline-none transition
                    focus:border-orange-500/50
                    focus:ring-1 focus:ring-orange-500/20
                    [color-scheme:dark]
                  "
                />
              </div>

              {errors.endDate && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 border-t border-white/[0.06] pt-5">
            <button
              type="button"
              onClick={() => onClose?.()}
              className="
                rounded-xl border border-white/10
                bg-white/[0.03] px-5 py-2.5
                text-sm font-medium text-[#B7A9A1]
                transition hover:border-white/20
                hover:bg-white/[0.06] hover:text-white
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                rounded-xl bg-orange-500
                px-5 py-2.5
                text-sm font-semibold text-white
                transition
                hover:bg-orange-600
                disabled:cursor-not-allowed
                disabled:opacity-50
                active:scale-[0.98]
              "
            >
              {isSubmitting
                ? "Creating..."
                : "Create Membership"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManualMembershipForm;