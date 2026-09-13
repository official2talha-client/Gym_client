import React from 'react'
import {useFilterPlansQuery} from '../api/planApi.js'
import SectionWrapper from './ui/SectionWrapper.jsx'
import PlanCard from './PlanCard.jsx'
import { SkeletonCard } from './ui/Skeleton.jsx'
import { ErrorState } from './ui/EmptyState'
import {ArrowRight} from 'lucide-react'
import { Link } from 'react-router-dom'


function ShortPlan() {

     const { data, isLoading, isError, refetch } = useFilterPlansQuery({
       
      })
      const plans =data?.data;



    return (
        <div className=''>
            <SectionWrapper
      id="plans"
      eyebrow="Membership"
      title="Plans built around your goals"
      subtitle="Choose the perfect plan for you based on your goal!"
      className="bg-base-card/20"
    >

  <Link
  to="/plans"
  className="
    group mb-2 ml-4 flex w-fit items-center gap-2
    self-end
    rounded-xl
    border border-[#F56A1F]/30
    bg-[#F56A1F]/10
    px-4 py-2.5
    text-xs font-semibold
    tracking-wide text-white
    shadow-[0_0_20px_rgba(245,106,31,0.06)]
    transition-all duration-300
    hover:border-[#F56A1F]/70
    hover:bg-[#F56A1F]
    hover:shadow-[0_0_25px_rgba(245,106,31,0.2)]
  "
>
  <span>See All Plans</span>

  <span
    className="
      flex h-6 w-6 items-center justify-center
      rounded-lg
      bg-[#F56A1F]/20
      transition-all duration-300
      group-hover:bg-white/15
      group-hover:translate-x-1
    "
  >
    <ArrowRight
      size={15}
      strokeWidth={2.5}
      className="transition-transform duration-300 group-hover:translate-x-0.5"
    />
  </span>
</Link>

      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {isError && <ErrorState onRetry={refetch} />}

    <div className="flex w-full max-w-full justify-between overflow-x-auto px-4 pb-3 gym-scrollbar gap-4">

    {!isLoading && !isError && plans && plans.length > 0 && (

  plans.slice(0,4).map((plan,idx)=>(

    <PlanCard plan={plan} key={idx} />

  ))
    )}
      </div>

    </SectionWrapper>
        </div>
    )
}

export default ShortPlan
