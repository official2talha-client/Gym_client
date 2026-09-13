import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  Dumbbell,
  Mail,
  Phone,
  User,
  Clock3,
  BadgeDollarSign,
  CircleCheck,
  CircleX,
  Timer,
  ShieldCheck,
} from "lucide-react";

import { useGetMembershipByIdQuery } from "../../api/membershipApi.js";

const Membership = () => {
  const { id } = useParams();
    const navigate = useNavigate()


  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetMembershipByIdQuery(id);

  const membership = data?.data;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#120D0B]">
        <div className="text-sm text-[#9B8D86]">
          Loading membership...
        </div>
      </div>
    );
  }

  if (isError || !membership) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#120D0B] px-5">
        <div className="rounded-xl border border-red-500/20 bg-[#1A1310] px-6 py-5 text-center">
          <CircleX className="mx-auto mb-3 h-8 w-8 text-red-400" />

          <h2 className="text-sm font-semibold text-white">
            Membership not found
          </h2>

          <p className="mt-1 text-xs text-[#9B8D86]">
            {error?.data?.message || "Unable to load membership details."}
          </p>

          <Link
            to="/admin/memberships"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-400"
          >
            <ArrowLeft size={16} />
            Back to Memberships
          </Link>
        </div>
      </div>
    );
  }

  const user = membership.user;
  const plan = membership.plan;
  const purchase = membership.purchase;

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return "border-green-500/20 bg-green-500/10 text-green-400";

      case "expired":
        return "border-red-500/20 bg-red-500/10 text-red-400";

      case "cancelled":
        return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";

      default:
        return "border-white/10 bg-white/5 text-[#B7A9A1]";
    }
  };

  return (
    <div className="min-h-screen bg-[#120D0B] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link
              onClick={()=>navigate(-1)}
              className="
                flex h-9 w-9 items-center justify-center
                rounded-lg border border-[#352823]
                bg-[#1A1310]
                text-[#9B8D86]
                transition
                hover:border-orange-500/40
                hover:text-orange-400
              "
            >
              <ArrowLeft size={18} />
            </Link>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-orange-400">
                Membership
              </p>

              <h1 className="mt-0.5 text-xl font-bold text-white">
                Membership Details
              </h1>
            </div>
          </div>

          <span
            className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(
              membership.status
            )}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {membership.status}
          </span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Left - Member Profile */}
          <section className="rounded-2xl border border-[#352823] bg-[#1A1310] p-5 lg:col-span-1">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                <User size={27} />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-lg  text-white">
                  {user?.fullName || "Unknown Member"}
                </h2>

                <p className="text-xs text-[#9B8D86]">
                  @{user?.userName || "—"}
                </p>
              </div>
            </div>

            <div className="space-y-4">

              <InfoRow
                icon={Mail}
                label="Email"
                value={user?.email}
              />

              <InfoRow
                icon={Phone}
                label="Phone"
                value={user?.phone}
              />

              <InfoRow
                icon={CreditCard}
                label="Card Number"
                value={membership.cardNumber}
                mono
              />

            </div>
          </section>

          {/* Right - Membership */}
          <section className="rounded-2xl border border-[#352823] bg-[#1A1310] p-5 lg:col-span-2">

            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-orange-400">
                  Current Plan
                </p>

                <h2 className="mt-1 text-2xl text-white">
                  {plan?.name || "Membership Plan"}
                </h2>
              </div>

              <div className="rounded-xl bg-orange-500/10 px-4 py-2 text-right">
                <p className="text-[10px] uppercase tracking-wider text-[#9B8D86]">
                  Amount
                </p>

                <p className="text-lg font-bold text-orange-400">
                  ৳{membership.amount?.toLocaleString() || "0"}
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              <DateCard
                icon={CalendarDays}
                label="Start Date"
                value={formatDate(membership.startDate)}
              />

              <DateCard
                icon={CalendarDays}
                label="End Date"
                value={formatDate(membership.endDate)}
              />

            </div>

            {/* Plan Details */}
            <div className="mt-5 border-t border-[#352823] pt-5">

              <h3 className="mb-4 text-sm  text-white">
                Plan Information
              </h3>

              <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4">

                <DetailItem
                  icon={Clock3}
                  label="Duration"
                  value={`${plan?.duration || 0} Months`}
                />

                <DetailItem
                  icon={BadgeDollarSign}
                  label="Subscription"
                  value={`৳${plan?.subscriptionCharge?.toLocaleString() || 0}`}
                />

                <DetailItem
                  icon={BadgeDollarSign}
                  label="Enrollment"
                  value={`৳${plan?.enrollmentCharge?.toLocaleString() || 0}`}
                />

                <DetailItem
                  icon={Timer}
                  label="Treadmill"
                  value={plan?.treadmillUsageTime || "—"}
                />

              </div>
            </div>

          </section>
        </div>

        {/* Plan Description + Usage */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* Description */}
          <section className="rounded-2xl border border-[#352823] bg-[#1A1310] p-5">

            <div className="mb-4 flex items-center gap-2">
              <Dumbbell size={18} className="text-orange-400" />

              <h3 className="text-sm text-white">
                Plan Description
              </h3>
            </div>

            <p className="text-sm leading-6 text-[#B7A9A1]">
              {plan?.description || "No description available."}
            </p>

            {/* Type / Gender */}
            <div className="mt-5 flex flex-wrap gap-2">

              {plan?.type && (
                <span className="rounded-lg border border-[#352823] bg-[#211914] px-3 py-1.5 text-xs capitalize text-[#B7A9A1]">
                  Type:{" "}
                  <span className="font-semibold text-white">
                    {plan.type}
                  </span>
                </span>
              )}

              {plan?.gender && (
                <span className="rounded-lg border border-[#352823] bg-[#211914] px-3 py-1.5 text-xs capitalize text-[#B7A9A1]">
                  Gender:{" "}
                  <span className="font-semibold text-white">
                    {plan.gender}
                  </span>
                </span>
              )}

            </div>
          </section>

          {/* Usage */}
          <section className="rounded-2xl border border-[#352823] bg-[#1A1310] p-5">

            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-orange-400" />

              <h3 className="text-sm  text-white">
                Included Usage
              </h3>
            </div>

            {plan?.usage?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {plan.usage.map((item, index) => (
                  <span
                    key={index}
                    className="
                      rounded-lg
                      border border-orange-500/15
                      bg-orange-500/[0.07]
                      px-3 py-2
                      text-xs font-medium
                      text-orange-300
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#9B8D86]">
                No usage information available.
              </p>
            )}

          </section>
        </div>

        {/* Purchase Information */}
        <section className="mt-5 rounded-2xl border border-[#352823] bg-[#1A1310] p-5">

          <div className="mb-5 flex items-center gap-2">
            <BadgeDollarSign size={18} className="text-orange-400" />

            <div>
              <h3 className="text-sm  text-white">
                Purchase Information
              </h3>

              <p className="mt-0.5 text-xs text-[#9B8D86]">
                Original purchase request associated with this membership
              </p>
            </div>
          </div>

          {purchase ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

              <DetailItem
                label="Purchase Status"
                value={purchase.status}
                capitalize
              />

              <DetailItem
                label="Requested At"
                value={formatDateTime(purchase.requestedAt)}
              />

              <DetailItem
                label="Approved At"
                value={formatDateTime(purchase.approvedAt)}
              />


              <DetailItem
                label="Purchase ID"
                value={purchase._id}
                mono
              />

            </div>
          ) : (
            <div className="rounded-lg border border-[#352823] bg-[#211914] px-4 py-3">
              <p className="text-xs text-[#9B8D86]">
                This membership was created offline and has no associated
                purchase request.
              </p>
            </div>
          )}

        </section>

        {/* Plan Charges */}
        <section className="mt-5 rounded-2xl border border-[#352823] bg-[#1A1310] p-5">

          <h3 className="mb-4 text-sm  text-white">
            Financial Details
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            <MoneyCard
              label="Subscription Charge"
              value={plan?.subscriptionCharge}
            />

            <MoneyCard
              label="Enrollment Charge"
              value={plan?.enrollmentCharge}
            />

            <MoneyCard
              label="Total Plan Charge"
              value={plan?.totalCharge}
              highlighted
            />

          </div>
        </section>

        {/* Membership Meta */}
        <section className="mt-5 rounded-2xl border border-[#352823] bg-[#1A1310] p-5">

          <h3 className="mb-4 text-sm text-white">
            Membership Record
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <DetailItem
              label="Membership ID"
              value={membership._id}
              mono
            />

            <DetailItem
              label="Created At"
              value={formatDateTime(membership.createdAt)}
            />

            <DetailItem
              label="Updated At"
              value={formatDateTime(membership.updatedAt)}
            />

            <DetailItem
              label="Membership Status"
              value={membership.status}
              capitalize
            />

          </div>
        </section>

      </div>
    </div>
  );
};


/* ---------------- Components ---------------- */

const InfoRow = ({
  icon: Icon,
  label,
  value,
  mono = false,
}) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#211914] text-[#9B8D86]">
        <Icon size={15} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-[#6F625B]">
          {label}
        </p>

        <p
          className={`mt-0.5 truncate text-sm text-[#E7DBD4] ${
            mono ? "font-mono text-xs" : ""
          }`}
        >
          {value || "—"}
        </p>
      </div>
    </div>
  );
};


const DateCard = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-xl border border-[#352823] bg-[#211914] p-4">
      <div className="mb-2 flex items-center gap-2 text-[#9B8D86]">
        <Icon size={15} />

        <span className="text-[10px] font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
};


const DetailItem = ({
  icon: Icon,
  label,
  value,
  mono = false,
  capitalize = false,
}) => {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        {Icon && (
          <Icon
            size={13}
            className="text-[#8F817A]"
          />
        )}

        <p className="text-[10px] uppercase tracking-wider text-[#6F625B]">
          {label}
        </p>
      </div>

      <p
        className={`
          mt-1 break-words text-xs font-medium text-[#E7DBD4]
          ${mono ? "font-mono text-[10px]" : ""}
          ${capitalize ? "capitalize" : ""}
        `}
      >
        {value || "—"}
      </p>
    </div>
  );
};


const MoneyCard = ({
  label,
  value,
  highlighted = false,
}) => {
  return (
    <div
      className={`
        rounded-xl border p-4
        ${
          highlighted
            ? "border-orange-500/20 bg-orange-500/[0.07]"
            : "border-[#352823] bg-[#211914]"
        }
      `}
    >
      <p className="text-[10px] uppercase tracking-wider text-[#6F625B]">
        {label}
      </p>

      <p
        className={`
          mt-1 text-lg font-bold
          ${
            highlighted
              ? "text-orange-400"
              : "text-white"
          }
        `}
      >
        ৳{Number(value || 0).toLocaleString()}
      </p>
    </div>
  );
};

export default Membership;