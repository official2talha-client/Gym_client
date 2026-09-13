import SectionWrapper, { RevealItem } from '../../components/ui/SectionWrapper'
import PlanCard from '../../components/PlanCard'
import { SkeletonCard } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import { api } from '../../lib/api'
import {useFilterPlansQuery} from '../../api/planApi.js'

export default function Plans() {
  const { data, isLoading, isError, refetch } = useFilterPlansQuery({
   
  })
  const plans =data?.data;
  
  


  return (
    <SectionWrapper
      id="plans"
      eyebrow="Membership"
      title="Plans built around your goals"
      subtitle="Sample pricing shown below — final rates confirmed with the client before launch."
      className="bg-base-card/20"
    >
      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {isError && <ErrorState onRetry={refetch} />}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

{!isLoading && !isError && plans && plans.length > 0 && (
  plans.map((plan,idx)=>(
    <PlanCard plan={plan} key={idx} />
  ))
)}
        </div>

    </SectionWrapper>
  )
}
