import SectionWrapper, { RevealItem } from '../../components/ui/SectionWrapper'
import TrainerCard from '../../components/TrainerCard'
import { SkeletonCard } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import {useFilterTrainersQuery} from '../../api/trainerApi.js'
import { useState } from 'react'

export default function Trainers() {

  const [gender, setGender] = useState("");
  const [shift, setShift] = useState("");

  const { data, isLoading, isError, refetch } = useFilterTrainersQuery({
   gender,
   shift
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

      {/* ================= TRAINER FILTERS ================= */}
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
  {/* Gender */}
  <select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className="
      rounded-xl border border-white/10
      bg-[#15100E] px-4 py-3
      text-sm text-white
      outline-none
      focus:border-[#F56A1F]/50
    "
  >
    <option value="">All Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>

  {/* Shift */}
  <select
    value={shift}
    onChange={(e) => setShift(e.target.value)}
    className="
      rounded-xl border border-white/10
      bg-[#15100E] px-4 py-3
      text-sm text-white
      outline-none
      focus:border-[#F56A1F]/50
    "
  >
    <option value="">All Shifts</option>
    <option value="morning">Morning</option>
    <option value="evening">Evening</option>
  </select>
    </div>

      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {isError && <ErrorState onRetry={refetch} />}

      {!isLoading && !isError && trainers && trainers.length > 0 && (
        <>
          {/* Desktop / tablet grid */}
          <div className=" gap-6 sm:grid sm:grid-cols-1 lg:grid-cols-1 hidden ">
            {trainers.map((t,index) => (
                <TrainerCard trainer={t} index={index} />
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:hidden">
            {trainers.map((t) => (
              <div key={t.id} className="w-[78%] shrink-0 snap-start ">
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
