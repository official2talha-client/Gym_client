import React,{useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Clock3,
  Dumbbell,
  Target,
  Activity,
  Gauge,
  CheckCircle2,
  CircleDot,
  Timer,
} from "lucide-react";

import { useGetExerciseByIdQuery } from "../api/exerciseApi.js";
// Change the import path above according to your project structure

const Video = () => {
  const { id } = useParams();
  const [videoDuration, setVideoDuration] = useState(0);

  const navigate = useNavigate()

  const {
    data,
    isError,
    isLoading,
  } = useGetExerciseByIdQuery(id);

  const video = data?.data;
  

  /* =========================
     LOADING
  ========================== */

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#100b09] px-4 py-10 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="animate-pulse">

            {/* Back */}
            <div className="h-4 w-28 rounded bg-[#2a1b17]" />

            {/* Header */}
            <div className="mt-10">
              <div className="h-3 w-28 rounded bg-[#2a1b17]" />

              <div className="mt-3 h-10 w-72 rounded bg-[#2a1b17] sm:w-96" />

              <div className="mt-4 h-7 w-44 rounded-full bg-[#2a1b17]" />
            </div>

            {/* Main */}
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">

              <div className="aspect-video rounded-2xl bg-[#1b1210]" />

              <div className="min-h-[350px] rounded-2xl bg-[#1b1210]" />

            </div>

          </div>

        </div>
      </section>
    );
  }

  /* =========================
     ERROR
  ========================== */

  if (isError || !video) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#100b09] px-4 text-white">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
            <Dumbbell size={28} />
          </div>

          <h1 className="mt-5 text-2xl font-black uppercase">
            Exercise Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            We couldn't find the exercise you're looking for.
          </p>

          <Link
            to="/exercise"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-orange-400"
          >
            <ArrowLeft size={16} />
            Back to Exercises
          </Link>

        </div>

      </section>
    );
  }

  const {
    name,
    bodyPart,
    description,
    difficulty,
    duration,
    equipment,
    secondaryMuscles,
    targetMuscle,
    thumbnail,
    video: videoUrl,
  } = video;

  const cleanSecondaryMuscles =
    secondaryMuscles?.filter(Boolean) || [];

  const difficultyStyles = {
    beginner:
      "border-green-500/20 bg-green-500/10 text-green-400",

    intermediate:
      "border-orange-500/20 bg-orange-500/10 text-orange-400",

    advanced:
      "border-red-500/20 bg-red-500/10 text-red-400",
  };

  return (
    <section className="pt-12 min-h-screen bg-[#100b09] text-white">

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* =====================================================
            BACK BUTTON
        ====================================================== */}

        <Link
          onClick={()=>navigate(-1)}
          className="
            inline-flex
            items-center
            gap-2
            text-xs
            font-medium
            text-gray-500
            transition
            hover:text-orange-500
            sm:text-sm
          "
        >
          <ArrowLeft size={17} />

          Back to Exercises
        </Link>

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-orange-500 sm:text-xs">
              Exercise Details
            </p>

            <h1 className="mt-4 max-w-4xl text-3xl font-black uppercase leading-tight tracking-[0.08em] sm:text-4xl lg:text-5xl">
              {name}
            </h1>

            {/* Tags */}

            <div className="mt-4 flex flex-wrap items-center gap-2">

              {/* Body Part */}

              <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-orange-400 sm:text-[10px]">
                {bodyPart}
              </span>

              {/* Difficulty */}

              <span
                className={`rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider sm:text-[10px] ${
                  difficultyStyles[difficulty] ||
                  "border-gray-500/20 bg-gray-500/10 text-gray-400"
                }`}
              >
                {difficulty}
              </span>

            </div>

          </div>

          {/* Duration */}

          <div className="flex w-fit items-center gap-3 rounded-xl border border-[#3a2b27] bg-[#1b1210] px-4 py-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
              <Clock3 size={18} />
            </div>

            <div>

              <p className="text-[8px] uppercase tracking-[0.2em] text-gray-600 sm:text-[9px]">
                Duration
              </p>

              <p className="text-sm font-bold text-gray-200">
                {videoDuration.toFixed(0) || "—"} second
              </p>

            </div>

          </div>

        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="mt-4 grid gap-6 lg:grid-cols-[1.5fr_0.8fr] lg:gap-8">

          {/* ===================================================
              VIDEO PLAYER
          ==================================================== */}

          <div className="overflow-hidden rounded-2xl border border-[#3a2b27] bg-[#1b1210] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">

            <div className="relative aspect-video bg-black">

              <video
                controls
                playsInline
                preload="metadata"
                poster={thumbnail}
                className="h-full w-full object-cover"
                 onLoadedMetadata={(e) => {
    setVideoDuration(e.currentTarget.duration);
  }}
              >
                <source
                  src={videoUrl}
                  type="video/mp4"
                />

                Your browser does not support the video
                element.
              </video>

            </div>

            {/* Video Bottom Info */}

            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-black">
                  <Play
                    size={17}
                    fill="currentColor"
                  />
                </div>

                <div>

                  <p className="text-xs font-bold text-white">
                    Watch Proper Form
                  </p>

                  <p className="mt-0.5 text-[9px] text-gray-500 sm:text-[10px]">
                    Follow the demonstration carefully
                  </p>

                </div>

              </div>

              <span className="text-[8px] uppercase tracking-[0.2em] text-gray-600 sm:text-[9px]">
                Training Video
              </span>

            </div>

          </div>

          {/* ===================================================
              EXERCISE INFORMATION
          ==================================================== */}

          <div className="flex flex-col rounded-2xl border border-[#3a2b27] bg-[#1b1210] p-5 sm:p-6">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">
                Exercise Overview
              </p>

              <h2 className="mt-2 text-xl font-black uppercase">
                Training Info
              </h2>

            </div>

            <div className="my-5 h-px bg-[#3a2b27]" />

            <div className="space-y-4">

              {/* Target */}

              <InfoItem
                icon={Target}
                title="Target Muscle"
                value={targetMuscle}
              />

              {/* Equipment */}

              <InfoItem
                icon={Dumbbell}
                title="Equipment"
                value={equipment}
              />

              {/* Body Part */}

              <InfoItem
                icon={Activity}
                title="Body Part"
                value={bodyPart}
              />

              {/* Difficulty */}

              <InfoItem
                icon={Gauge}
                title="Difficulty"
                value={difficulty}
                capitalize
              />

              {/* Duration */}

              <InfoItem
                icon={Timer}
                title="Duration"
                value={`${duration || "—"} minutes`}
              />

            </div>

            {/* CTA */}

            {/* <button
              type="button"
              className="
                mt-7
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-orange-500
                px-5
                py-3.5
                text-xs
                font-black
                uppercase
                tracking-wider
                text-black
                transition
                hover:bg-orange-400
                hover:shadow-[0_10px_30px_rgba(249,115,22,0.25)]
              "
            >
              <Play
                size={15}
                fill="currentColor"
              />

              Start Exercise
            </button> */}

          </div>

        </div>

        {/* =====================================================
            LOWER SECTION
        ====================================================== */}

        <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_0.6fr]">

          {/* ===================================================
              DESCRIPTION
          ==================================================== */}

          <div className="rounded-2xl border border-[#3a2b27] bg-[#1b1210] p-5 sm:p-6">

            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-orange-500">
              About This Exercise
            </p>

            <h2 className="mt-2 text-xl font-black uppercase">
              Exercise Guide
            </h2>

            <div className="mt-4 h-px bg-[#3a2b27]" />

            <p className="mt-5 text-sm leading-7 text-gray-400">
              {description ||
                "No description available for this exercise."}
            </p>

          </div>

          {/* ===================================================
              SECONDARY MUSCLES
          ==================================================== */}

          <div className="rounded-2xl border border-[#3a2b27] bg-[#1b1210] p-5 sm:p-6">

            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-orange-500">
              Muscle Activation
            </p>

            <h2 className="mt-2 text-xl font-black uppercase">
              Secondary Muscles
            </h2>

            <div className="mt-5 space-y-3">

              {cleanSecondaryMuscles.length > 0 ? (

                cleanSecondaryMuscles.map(
                  (muscle, index) => (

                    <div
                      key={`${muscle}-${index}`}
                      className="flex items-center gap-3"
                    >

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                        <CheckCircle2 size={14} />
                      </div>

                      <span className="text-xs capitalize text-gray-300">
                        {muscle}
                      </span>

                    </div>

                  )
                )

              ) : (

                <div className="flex items-center gap-3 text-gray-500">

                  <CircleDot size={15} />

                  <span className="text-xs">
                    No secondary muscles specified
                  </span>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

/* ============================================================
   INFO ITEM
============================================================ */

const InfoItem = ({
  icon: Icon,
  title,
  value,
  capitalize = false,
}) => {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
        <Icon size={18} />
      </div>

      <div className="min-w-0">

        <p className="text-[10px] uppercase tracking-wider text-gray-400 sm:text-[10px]">
          {title}
        </p>

        <p
          className={`mt-0.5 truncate text-md text-white ${
            capitalize ? "capitalize" : ""
          }`}
        >
          {value || "Not specified"}
        </p>

      </div>

    </div>
  );
};

export default Video;