import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  CalendarDays,
  Clock3,
  Dumbbell,
  UserRound,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";

import { useGetTrainerByIdQuery } from "../api/trainerApi.js";

const TrainerProfile = () => {
  const { id } = useParams();

  const {
    data,
    isLoading,
  } = useGetTrainerByIdQuery(id,{skip:!id});
const trainer = data?.data;

const navigate = useNavigate()

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#100b09] px-4 py-10">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="h-5 w-24 rounded bg-[#2b1d19]" />

          <div className="mt-8 grid overflow-hidden rounded-3xl border border-[#3a2b27] bg-[#1b1210] md:grid-cols-2">

            <div className="h-[450px] bg-[#2b1d19]" />

            <div className="space-y-5 p-8">
              <div className="h-5 w-24 rounded bg-[#2b1d19]" />
              <div className="h-10 w-3/4 rounded bg-[#2b1d19]" />
              <div className="h-16 w-full rounded bg-[#2b1d19]" />

              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 rounded bg-[#2b1d19]" />
                <div className="h-20 rounded bg-[#2b1d19]" />
                <div className="h-20 rounded bg-[#2b1d19]" />
                <div className="h-20 rounded bg-[#2b1d19]" />
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  if (!trainer) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#100b09] px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Trainer not found
          </h2>

          <Link
            to="/trainers"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-bold text-black"
          >
            <ArrowLeft size={17} />
            Back to Trainers
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen mt-12 bg-[#100b09] px-4 py-8 md:py-12">

      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <Link
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-orange-500"
          onClick={()=>navigate(-1)}
        >
          <ArrowLeft size={17} />
          Back to Trainers
        </Link>

        {/* Main Profile */}
        <div className="overflow-hidden rounded-3xl border border-[#3a2b27] bg-[#1b1210] shadow-2xl">

          <div className="grid lg:grid-cols-2">

            {/* ================= IMAGE ================= */}
            <div className="relative min-h-[400px] md:min-h-[600px]">

              <img
                src={trainer?.image}
                alt={trainer?.name}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#100b09] via-transparent to-transparent" />

              {/* Experience Badge */}
              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-xl border border-orange-500/30 bg-[#1b1210]/90 px-4 py-3 backdrop-blur-md">
                <Dumbbell
                  size={18}
                  className="text-orange-500"
                />

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500">
                    Experience
                  </p>

                  <p className="text-sm font-bold text-white">
                    {trainer?.experience} Years
                  </p>
                </div>
              </div>

            </div>

            {/* ================= INFORMATION ================= */}
            <div className="p-6 md:p-10">

              {/* Label */}
              <div className="flex items-center gap-2">
                <span className="h-1 w-8 rounded-full bg-orange-500" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  Professional Trainer
                </span>
              </div>

              {/* Name */}
              <h1 className="mt-4 text-4xl font-black uppercase leading-tight text-white md:text-5xl">
                {trainer?.name}
              </h1>

              {/* Gender / Age */}
              <div className="mt-4 flex flex-wrap gap-2">

                <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold capitalize text-orange-400">
                  {trainer?.gender}
                </span>

                <span className="rounded-full border border-[#3a2b27] bg-[#211613] px-3 py-1.5 text-xs font-semibold text-gray-400">
                  {trainer?.age} Years Old
                </span>

              </div>

              {/* Description */}
              <p className="mt-6 text-sm leading-7 text-gray-400">
                Experienced fitness professional dedicated to helping
                members achieve their fitness goals through structured
                training, proper technique and consistent guidance.
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-3">

                {/* Experience */}
                <div className="rounded-xl border border-[#3a2b27] bg-[#211613] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                      <BriefcaseBusiness size={17} />
                    </div>

                    <div>
                      <p className="text-lg font-bold text-white">
                        {trainer?.experience}
                      </p>

                      <p className="text-[10px] uppercase tracking-wide text-gray-500">
                        Years Experience
                      </p>
                    </div>
                  </div>
                </div>

                {/* Age */}
                <div className="rounded-xl border border-[#3a2b27] bg-[#211613] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                      <UserRound size={17} />
                    </div>

                    <div>
                      <p className="text-lg font-bold text-white">
                        {trainer?.age}
                      </p>

                      <p className="text-[10px] uppercase tracking-wide text-gray-500">
                        Years Old
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shift */}
                <div className="rounded-xl border border-[#3a2b27] bg-[#211613] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                      <Clock3 size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-bold capitalize text-white">
                        {trainer?.shift}
                      </p>

                      <p className="text-[10px] uppercase tracking-wide text-gray-500">
                        Shift
                      </p>
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div className="rounded-xl border border-[#3a2b27] bg-[#211613] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                      <CalendarDays size={17} />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-white">
                        {trainer?.timeRange}
                      </p>

                      <p className="text-[10px] uppercase tracking-wide text-gray-500">
                        Training Hours
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* ================= ACHIEVEMENTS ================= */}
              <div className="mt-8">

                <div className="mb-4 flex items-center gap-2">
                  <Award
                    size={18}
                    className="text-orange-500"
                  />

                  <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
                    Achievements
                  </h2>
                </div>

                <div className="space-y-2">

                  {trainer?.achievements?.map(
                    (achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-xl border border-[#3a2b27] bg-[#211613] px-4 py-3"
                      >
                        <CheckCircle2
                          size={17}
                          className="shrink-0 text-orange-500"
                        />

                        <span className="text-sm text-gray-300">
                          {achievement}
                        </span>
                      </div>
                    )
                  )}

                </div>
              </div>

              {/* CTA */}
              {/* <button
                type="button"
                className="mt-8 w-full rounded-xl bg-orange-500 px-5 py-3 font-bold uppercase tracking-wide text-black transition hover:bg-orange-400 active:scale-[0.98]"
              >
                Book a Training Session
              </button> */}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerProfile;