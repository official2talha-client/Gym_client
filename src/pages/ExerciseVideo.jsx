import React, { useState } from "react";
import { useParams, Link, useNavigate, NavLink } from "react-router-dom";
import {
  Play,
  Dumbbell,
  Target,
  ArrowLeft,
} from "lucide-react";
import { useFilterExercisesQuery } from "../api/exerciseApi";

const ExerciseVideo = () => {
  const { bodypart } = useParams();

  const [selEquipment,setSelEquipment] = useState("")
  const [selDifficulty,setSelDifficulty] = useState("")

  const {data,isLoading,isError} = useFilterExercisesQuery({
      bodyPart:bodypart,
      difficulty:selDifficulty,
      equipment:selEquipment,

  });
  const exerciseData = data?.data;
  const exercises = data?.data?.exercises;
  const page = exerciseData?.page;
  const limit = exerciseData?.limit;
  const total = exerciseData?.total;
  const totalPage = exerciseData?.totalPage;

  const navigate = useNavigate();
  
  

  const currentBodyPart = bodypart || "Chest";

  return (
    <section className="min-h-screen bg-[#100b09] text-white pt-12">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* Back */}
        <Link
          onClick={()=>navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 transition hover:text-orange-500 sm:text-sm"
        >
          <ArrowLeft size={17} />
          Back to Exercises
        </Link>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-5  md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500 sm:text-xs">
              Exercise Library
            </p>

            <h1 className="mt-2 text-3xl font-black uppercase leading-none tracking-[0.08em] sm:text-4xl lg:text-5xl">
              {currentBodyPart} Exercises
            </h1>

            <p className="mt-3 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
              Explore guided exercises and learn proper form for your
              workouts.
            </p>
          </div>

          {/* Video Count */}
          <div className="w-fit rounded-xl border border-[#3a2b27] bg-[#1b1210] px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500">
              Total Videos
            </p>

            <p className="mt-1 text-2xl font-black text-orange-500 sm:text-3xl">
              {total}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-7 flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:mt-8 sm:gap-3">
          <button className="shrink-0 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-[10px] font-semibold text-orange-400 sm:px-4 sm:py-2 sm:text-xs">
            All Equipment
          </button>

          <button className="shrink-0 rounded-full border border-[#3a2b27] bg-[#1b1210] px-3 py-1.5 text-[10px] text-gray-400 transition hover:border-orange-500/30 hover:text-orange-400 sm:px-4 sm:py-2 sm:text-xs">
            Beginner
          </button>

          <button className="shrink-0 rounded-full border border-[#3a2b27] bg-[#1b1210] px-3 py-1.5 text-[10px] text-gray-400 transition hover:border-orange-500/30 hover:text-orange-400 sm:px-4 sm:py-2 sm:text-xs">
            Intermediate
          </button>

          <button className="shrink-0 rounded-full border border-[#3a2b27] bg-[#1b1210] px-3 py-1.5 text-[10px] text-gray-400 transition hover:border-orange-500/30 hover:text-orange-400 sm:px-4 sm:py-2 sm:text-xs">
            Advanced
          </button>
        </div>

        {/* =========================
            VIDEO GRID
        ========================== */}

{!isError && isLoading && (
  <h1>loading..</h1>
)}

{!isLoading && isError && (
  <h1>error</h1>
)}

  {!isLoading && !isError && exercises && exercises.length === 0 &&(
  <h1>empty</h1>
)}

        <div className="mt-4 grid grid-cols-2 gap-3  sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">

        {!isLoading && !isError && exercises && exercises.length > 0 && (

        exercises?.map((video) => ( 
            <div key={video?._id}
              className="
                group overflow-hidden
                rounded-xl
                border border-[#3a2b27]
                bg-[#1b1210]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-orange-500/50
                hover:shadow-[0_12px_30px_rgba(249,115,22,0.15)]
                sm:rounded-2xl
              "
            >
              {/* ================= IMAGE ================= */}

              <div className="relative h-28 overflow-hidden sm:h-40 md:h-44">
                <img
                  src={video?.thumbnail}
                  alt={video?.name}
                  className="
                    h-full w-full object-cover
                    transition duration-500
                    group-hover:scale-105
                  "
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1210] via-transparent to-transparent" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="
                      flex h-9 w-9 items-center justify-center
                      rounded-full
                      border border-orange-500/30
                      bg-black/50
                      text-orange-500
                      backdrop-blur-sm
                      transition duration-300
                      group-hover:scale-110
                      group-hover:bg-orange-500
                      group-hover:text-black
                      sm:h-12 sm:w-12
                    "
                  >
                    <Play
                      size={15}
                      fill="currentColor"
                      className="sm:h-5 sm:w-5"
                    />
                  </div>
                </div>

                {/* Video Number */}
                <span
                  className="
                    absolute left-2 top-2
                    rounded-md
                    bg-black/50
                    px-1.5 py-1
                    text-[8px]
                    font-bold
                    text-gray-300
                    backdrop-blur-sm
                    sm:left-3 sm:top-3
                    sm:px-2
                    sm:text-[9px]
                  "
                >
                  #{String("here will come count").padStart(2, "0")}
                </span>
              </div>

              {/* ================= CONTENT ================= */}

              <div className="p-3 sm:p-4">

                {/* Name */}
                <h3 className="line-clamp-2 text-sm leading-tight text-white tracking-widest ">
                  {video?.name}
                </h3>

                {/* Equipment */}
                <div className="mt-3 flex items-center gap-2">
                  <div
                    className="
                      flex h-6 w-6 shrink-0
                      items-center justify-center
                      rounded-md
                      bg-orange-500/10
                      text-orange-500
                      sm:h-8 sm:w-8
                    "
                  >
                    <Dumbbell size={12} className="sm:h-4 sm:w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[7px] uppercase tracking-wider text-gray-600 sm:text-[8px]">
                      Equipment
                    </p>

                    <p className="truncate text-[9px] text-gray-400 sm:text-xs">
                      {video?.equipment}
                    </p>
                  </div>
                </div>

                {/* Body Part */}
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className="
                      flex h-6 w-6 shrink-0
                      items-center justify-center
                      rounded-md
                      bg-orange-500/10
                      text-orange-500
                      sm:h-8 sm:w-8
                    "
                  >
                    <Target size={12} className="sm:h-4 sm:w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[7px] uppercase tracking-wider text-gray-600 sm:text-[8px]">
                      Body Part
                    </p>

                    <p className="truncate text-[9px] capitalize text-gray-400 sm:text-xs">
                      {video?.bodyPart}
                    </p>
                  </div>
                </div>

                {/* Watch Button */}

                <Link to={`/video/${video?._id}`}>

                <button
                  type="button"
                  className="
                    mt-3 w-full
                    rounded-lg
                    bg-orange-500
                    py-2
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-black
                    transition
                    hover:bg-orange-400
                    sm:mt-4
                    sm:py-2.5
                    sm:text-[10px]
                  "
                >
                  Watch Exercise
                </button>

                </Link>
              </div>
            </div>
          ))

        )}    
          
        </div>

      </div>
    </section>
  );
};

export default ExerciseVideo;