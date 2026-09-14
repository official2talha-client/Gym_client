import { Link } from 'react-router-dom'
import FlatCard from './ui/FlatCard'
import { Badge } from './ui/Badge'
import GaugeBadge from './ui/GaugeBadge'

export default function TrainerCard({ trainer,index }) {
  
  return (
   <FlatCard className="group overflow-hidden rounded-2xl border border-white/10 bg-[#15100E]">
  <div
    className={`flex flex-col ${
      index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
    }`}
  >
   {/* ================= IMAGE ================= */}
<div className="relative w-full lg:w-[60%]">
  <div className="relative h-[360px] w-full overflow-hidden lg:h-[440px]">
    <img
      src={trainer?.image}
      alt={trainer?.name}
      className="
        h-full w-full
        object-cover object-top
        transition-transform duration-700
        ease-out
        group-hover:scale-105
      "
      loading="lazy"
    />

    {/* Gradient */}
    <div
      className="
        pointer-events-none
        absolute inset-0
        bg-gradient-to-t
        from-black/75
        via-black/10
        to-transparent
      "
    />

    {/* Gender */}
    <div className="absolute right-5 top-5">
      <span
        className="
          rounded-full
          border border-white/10
          bg-black/40
          px-4 py-2
          text-[10px] font-bold
          uppercase tracking-widest
          text-white
          backdrop-blur-md
        "
      >
        {trainer?.gender}
      </span>
    </div>

    {/* Available */}
    <div className="absolute left-5 top-5">
      <span
        className="
          flex items-center gap-2
          rounded-full
          border border-emerald-400/20
          bg-black/40
          px-4 py-2
          text-[10px] font-semibold
          uppercase tracking-wider
          text-emerald-400
          backdrop-blur-md
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Available
      </span>
    </div>

    {/* Image Name */}
    {/* <div className="absolute bottom-5 left-5">
      <p
        className="
          text-[10px] font-semibold
          uppercase tracking-[0.25em]
          text-[#F56A1F]
        "
      >
        Personal Trainer
      </p>

      <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
        {trainer?.name}
      </h3>
    </div> */}
  </div>
</div>

    {/* ================= INFORMATION ================= */}
    <div className="flex w-full flex-col justify-between p-6 lg:w-[40%] lg:p-8">
      <div>
        <p
          className="
            text-[10px] font-semibold
            uppercase tracking-[0.2em]
            text-[#F56A1F]
          "
        >
          Trainer Profile
        </p>

        <h3 className="mt-2 text-xl font-bold text-white">
          {trainer?.name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#9B8D86] hidden sm:flex">
          Professional fitness trainer dedicated to helping members achieve
          their fitness goals through structured training and personalized
          guidance.
        </p>

        {/* Availability */}
        <div
          className="
            mt-6 rounded-xl
            border border-white/10
            bg-white/[0.03]
            p-4
          "
        >
          <p
            className="
              text-[10px] font-semibold
              uppercase tracking-wider
              text-[#756A64]
            "
          >
            Availability
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            {trainer?.shift}
          </p>
        </div>

        {/* Achievements */}
        {/* <div className="mt-5">
          <p
            className="
              mb-2 text-[10px] font-semibold
              uppercase tracking-wider
              text-[#756A64]
            "
          >
            Expertise & Achievements
          </p>

          <div className="flex flex-wrap gap-2">
            {trainer?.achievements?.slice(0, 4).map((achievement) => (
              <span
                key={achievement}
                className="
                  rounded-full
                  border border-[#F56A1F]/15
                  bg-[#F56A1F]/5
                  px-3 py-1.5
                  text-[10px] font-medium
                  text-[#D8C9C1]
                "
              >
                {achievement}
              </span>
            ))}
          </div>
        </div> */}
      </div>

      {/* CTA */}
      <Link
        to={`/trainers/${trainer?._id}`}
        className="
          group/link mt-8
          flex w-full items-center
          justify-between
          rounded-xl
          border border-[#F56A1F]/30
          bg-[#F56A1F]/10
          px-5 py-3.5
          text-sm font-semibold text-white
          transition-all duration-300
          hover:border-[#F56A1F]
          hover:bg-[#F56A1F]
        "
      >
        <span>View Details</span>

        <span
          className="
            text-lg
            transition-transform duration-300
            group-hover/link:translate-x-1
          "
        >
          →
        </span>
      </Link>
    </div>
  </div>
</FlatCard>
  )
}
