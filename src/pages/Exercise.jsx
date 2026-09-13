import React from 'react'
import SectionWrapper from '../components/ui/SectionWrapper'
import {useGetExerciseFilterFieldsQuery} from '../api/exerciseApi.js'
  import {
  Dumbbell,
  HeartPulse,
  PersonStanding,
  Accessibility,
  Activity,
  MoveVertical,
  CircleDot,
  Hand,
  Footprints,
  UserRound,
} from "lucide-react";
import {Link} from 'react-router-dom'

// images 
import Abductors from "../bodyparts/abductors.png";
import Abs from "../bodyparts/abs.png";
import Adductors from "../bodyparts/adductors.png";
import Back from "../bodyparts/back.png";
import Biceps from "../bodyparts/biceps.png";
import Calves from "../bodyparts/calves.png";
import Cardio from "../bodyparts/cardio.png";
import Chest from "../bodyparts/chest.png";
import Forearms from "../bodyparts/forearms.png";
import FullBody from "../bodyparts/full_body.png";
import Glutes from "../bodyparts/glutes.png";
import Hamstrings from "../bodyparts/hamstrings.png";
import HipFlexors from "../bodyparts/hip_flexors.png";
import LowerBack from "../bodyparts/lower_back.png";
import Neck from "../bodyparts/neck.png";
import Obliques from "../bodyparts/obliques.png";
import Quadriceps from "../bodyparts/quadriceps.png";
import Shoulders from "../bodyparts/shoulders.png";
import Traps from "../bodyparts/traps.png";
import Triceps from "../bodyparts/triceps.png";


function Exercise() {

  const bodyPartVisuals = {
  chest: {
    name: "Chest",
    image: Chest,
  },

  back: {
    name: "Back",
    image: Back,
  },

  shoulders: {
    name: "Shoulders",
    image: Shoulders,
  },

  biceps: {
    name: "Biceps",
    image: Biceps,
  },

  triceps: {
    name: "Triceps",
    image: Triceps,
  },

  forearms: {
    name: "Forearms",
    image: Forearms,
  },

  abs: {
    name: "Abs",
    image: Abs,
  },

  obliques: {
    name: "Obliques",
    image: Obliques,
  },

  glutes: {
    name: "Glutes",
    image: Glutes,
  },

  quadriceps: {
    name: "Quadriceps",
    image: Quadriceps,
  },

  hamstrings: {
    name: "Hamstrings",
    image: Hamstrings,
  },

  calves: {
    name: "Calves",
    image: Calves,
  },

  adductors: {
    name: "Adductors",
    image: Adductors,
  },

  abductors: {
    name: "Abductors",
    image: Abductors,
  },

  hip_flexors: {
    name: "Hip Flexors",
    image: HipFlexors,
  },

  lower_back: {
    name: "Lower Back",
    image: LowerBack,
  },

  traps: {
    name: "Traps",
    image: Traps,
  },

  neck: {
    name: "Neck",
    image: Neck,
  },

  full_body: {
    name: "Full Body",
    image: FullBody,
  },

  cardio: {
    name: "Cardio",
    image: Cardio,
  },
};
    const {data,isLoading,isError} = useGetExerciseFilterFieldsQuery();
    const allBodyParts = data?.data;

    
    return (

        <div className='pt-14'>

          <SectionWrapper
                eyebrow="Exercises"
                title="Find Your daily workout"
                subtitle="Find your desire workout with equipment and all details. Select any body parts to find suitable exercise!"
              >

{!isError && isLoading && (
  <h1>loading..</h1>
)}

{!isLoading && isError && (
  <h1>error</h1>
)}

  {!isLoading && !isError && allBodyParts && allBodyParts?.bodyParts.length === 0 &&(
  <h1>empty</h1>
)}   

  <div className="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-3 lg:grid-cols-4 ">

{!isLoading && !isError && allBodyParts && allBodyParts?.bodyParts.length > 0 && (

  allBodyParts?.bodyParts?.map((bodyPart) => {
      
      const visual = bodyPartVisuals[bodyPart.toLowerCase()];

    if (!visual) return null;

    return (

        <Link to={`/exercise-video/${bodyPart}`}>

     <div className="group [perspective:1400px]">
  <button
    key={bodyPart}
    type="button"
    className="
      relative w-full
      [transform-style:preserve-3d]
      transition-all duration-500 ease-out
      hover:-translate-y-4
      hover:[transform:rotateX(4deg)_rotateY(-4deg)]
    "
  >
    {/* =========================
        3D BOX
    ========================== */}

    <div
      className="
        relative
        [transform-style:preserve-3d]
      "
    >
      {/* FRONT FACE */}
      <div
        className="
          relative z-20
          overflow-hidden
          rounded-2xl
          border border-orange-500/25
          bg-[#211512]
          shadow-[0_12px_25px_rgba(0,0,0,0.45)]
          [transform:translateZ(18px)]
        "
      >
        {/* Top edge highlight */}
        <div
          className="
            absolute left-4 right-4 top-0 z-30
            h-px
            bg-gradient-to-r
            from-transparent
            via-orange-400/70
            to-transparent
          "
        />

        {/* IMAGE */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={visual.image}
            alt={visual.name}
            className="
              h-full w-full object-cover
              transition-transform duration-700
              group-hover:scale-110
            "
          />

          {/* Dark gradient */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-[#211512]
              via-transparent
              to-black/10
            "
          />

          {/* Orange light */}
          <div
            className="
              absolute inset-0
              bg-orange-500/0
              transition duration-500
              group-hover:bg-orange-500/10
            "
          />
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-orange-500">
            Muscle Group
          </p>

          <h3 className="mt-1 text-lg font-black uppercase tracking-wide text-white">
            {visual.name}
          </h3>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Explore exercises
            </span>

            <span
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl
                border border-orange-500/30
                bg-orange-500/10
                text-lg text-orange-500
                transition-all duration-300
                group-hover:bg-orange-500
                group-hover:text-black
                group-hover:shadow-[0_5px_20px_rgba(249,115,22,0.4)]
              "
            >
              →
            </span>
          </div>
        </div>
      </div>

      {/* =========================
          RIGHT SIDE OF BOX
      ========================== */}

      <div
        className="
          absolute right-0 top-2 z-10
          h-[calc(100%-8px)]
          w-5
          origin-left
          rounded-r-xl
          border-r border-orange-950
          bg-gradient-to-b
          from-[#4a281c]
          via-[#2c1812]
          to-[#120a08]
          [transform:rotateY(90deg)]
          [transform-origin:left]
          [translateZ(18px)]
        "
      />

      {/* =========================
          BOTTOM SIDE OF BOX
      ========================== */}

      <div
        className="
          absolute bottom-0 left-2 z-10
          h-5
          w-[calc(100%-12px)]
          origin-top
          rounded-b-xl
          border-b border-orange-950
          bg-gradient-to-r
          from-[#120a08]
          via-[#3a1e16]
          to-[#160b09]
          [transform:rotateX(-90deg)]
          [transform-origin:top]
          [translateZ(18px)]
        "
      />

      {/* =========================
          DARK BACK / BASE
      ========================== */}

      <div
        className="
          absolute inset-0
          rounded-2xl
          bg-[#0d0705]
          [transform:translateZ(-2px)]
        "
      />
    </div>

    {/* =========================
        FLOOR SHADOW
    ========================== */}

    <div
      className="
        absolute
        -bottom-7
        left-[8%]
        right-[8%]
        h-8
        rounded-[50%]
        bg-black/70
        blur-xl
        transition-all duration-500
        group-hover:scale-90
        group-hover:bg-orange-950/30
      "
    />
  </button>
     </div>

        </Link>

    );
  })

)}

</div>
        
              </SectionWrapper>

        </div>
    )
}

export default Exercise
