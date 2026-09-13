import { SkeletonCard } from "../../components/ui/Skeleton";
import { ErrorState } from "../../components/ui/EmptyState";
import PillButton from "../../components/ui/PillButton";
import { useFilterPlansQuery,useCreatePlanMutation } from "../../api/planApi.js";
import PlanCard from "../../components/admin/PlanCard.jsx";
import { useState } from "react";
import PlanCreation from "../../components/admin/PlanCreation.jsx";

export default function Plans() {

  const [open,setOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useFilterPlansQuery();

  const plans = data?.data || [];

  const [createPlan,{isLoading:planLoading}] = useCreatePlanMutation()



  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <>
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Membership Plans
          </h2>

          <p className="mt-1 text-sm text-ink-muted">
            {plans.length} plans available
          </p>
        </div>

        <PillButton
          variant="orange"
          size="sm"
          onClick={() => {
            setOpen(true)
          }}
        >
          Add Plan
        </PillButton>
      </div>

      {/* Plans */}
      {plans.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-sm text-gray-400">
            No membership plans found.
          </p>

          <div className="mt-4">
            <PillButton
              variant="orange"
              size="sm"
              onClick={() => {
                // open add plan modal
              }}
            >
              Add Your First Plan
            </PillButton>
          </div>
        </div>
      ) : (
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
  {plans.map((plan) => (
    <PlanCard
      key={plan._id || plan.id}
      plan={plan}
    />
  ))}
        </div>
      )}

</div>

{open && (
<div
  className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md"
  onClick={() => setOpen(false)}
>
  <div
    className="my-4 sm:p-6  max-h-[95vh] w-full max-w-4xl overflow-y-auto gym-scrollbar"
    onClick={(e) => e.stopPropagation()}
  >
    <PlanCreation onclose={() => setOpen(false)} />
  </div>
</div>
)}

    </>
  );
}