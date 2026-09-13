import { useQuery } from '@tanstack/react-query'
import SectionWrapper, { RevealItem } from '../components/ui/SectionWrapper'
import PlanCard from '../components/PlanCard'
import FlatCard from '../components/ui/FlatCard'
import { SkeletonCard } from '../components/ui/Skeleton'
import { ErrorState } from '../components/ui/EmptyState'
import { api } from '../lib/api'
import { useDocumentHead } from '../lib/seo'
import { useFilterPlansQuery } from '../api/planApi'



export default function PlansDetail() {

  const { data, isLoading, isError, refetch } = useFilterPlansQuery();
  const plans = data?.data;

  return (
    <div className="pt-14">
      <SectionWrapper
        eyebrow="Membership"
        title="Choose your plan"
        subtitle="Sample pricing — final rates to be confirmed with the client before launch. Payment is handled through bKash only."
      >
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
          </div>
        )}
        {isError && <ErrorState onRetry={refetch} />}
        
<div className="flex w-full max-w-full gap-6 overflow-x-auto px-4 pb-3 gym-scrollbar ">

{!isLoading && !isError && plans && plans.length > 0 && (
  plans.map((plan,idx)=>(


    <PlanCard plan={plan} key={idx} />


  ))
)}
          </div>

      </SectionWrapper>

     
    </div>
  )
}
