import SectionWrapper, { RevealItem } from '../../components/ui/SectionWrapper'
import TrainerCard from '../../components/TrainerCard'
import { SkeletonCard } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import {useGetAllTrainersQuery} from '../../api/trainerApi.js'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'


export default function TrainerSection() {

  const { data, isLoading, isError, refetch } = useGetAllTrainersQuery({
  
  });
  const trainers = data?.data;
  

  return (
    <div className='pt-14'>



    <SectionWrapper
      id="trainers"
      eyebrow="Our coaches"
      title="Train with people who know what they're doing"
      subtitle="Sample trainer profiles shown below — real bios and photos to be added by the client."
    >

<Link
  to="/trainers"
  className="
    group mb-2 flex w-fit items-center gap-2
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
  <span>See All Trainers</span>

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {isError && <ErrorState onRetry={refetch} />}

      {!isLoading && !isError && trainers && trainers.length > 0 && (
        <>
          
          {/* Mobile carousel */}
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 ">
            {trainers.slice(0,3).map((t) => (
              <div key={t.id} className="w-[78%] shrink-0 snap-start">
                <TrainerCard trainer={t} />
              </div>
            ))}
          </div>
        </>
      )}
    </SectionWrapper>
    </div>
  )
}
