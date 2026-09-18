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

  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-7 lg:grid-cols-4">

  {!isLoading &&
    !isError &&
    allBodyParts &&
    allBodyParts?.bodyParts.length > 0 &&
    allBodyParts?.bodyParts.map((bodyPart) => {

      const visual = bodyPartVisuals[bodyPart.toLowerCase()];

      if (!visual) return null;

      return (
        <Link
          key={bodyPart}
          to={`/exercise-video/${bodyPart}`}
          className="block"
        >

          {/* =========================
              3D STAGE
          ========================== */}
          <div
            className="
              group
              relative
              [perspective:900px]
            "
          >

            {/* =========================
                CARD
            ========================== */}
            <div
              className="
                relative
                h-full
                [transform-style:preserve-3d]

                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]

                group-hover:-translate-y-3
                group-hover:scale-[1.035]
                group-hover:[transform:rotateX(3deg)_rotateY(-3deg)_translateZ(32px)]
              "
            >

              {/* =========================
                  MAIN FRONT FACE
              ========================== */}
              <div
                className="
                  relative
                  z-20
                  overflow-hidden
                  rounded-[20px]

                  border
                  border-[#46352e]

                  bg-[#1b1412]

                  shadow-[0_18px_35px_rgba(0,0,0,0.45)]

                  [transform:translateZ(22px)]

                  transition-all
                  duration-500

                  group-hover:border-[#76513d]
                  group-hover:shadow-[0_30px_55px_rgba(0,0,0,0.65)]
                "
              >

                {/* =========================
                    TOP METAL HIGHLIGHT
                ========================== */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    left-5
                    right-5
                    top-0
                    z-40
                    h-px

                    bg-gradient-to-r
                    from-transparent
                    via-[#b96a38]/70
                    to-transparent
                  "
                />

                {/* =========================
                    IMAGE
                ========================== */}
                <div
                  className="
                    relative
                    h-40
                    overflow-hidden
                    sm:h-44
                    
                  "
                >

                  <img
                    src={visual.image}
                    alt={visual.name}
                    className="
                      h-full
                      w-full
                      object-cover

                      transition-all
                      duration-700
                      ease-out

                      group-hover:scale-[1.10]
                    "
                  />

                  {/* Dark cinematic gradient */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-[#1b1412]
                      via-[#1b1412]/15
                      to-black/20
                    "
                  />

                  {/* Premium warm light */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0

                      bg-gradient-to-br
                      from-[#c46b35]/0
                      via-transparent
                      to-[#8b3f20]/0

                      transition-all
                      duration-500

                      group-hover:from-[#c46b35]/10
                      group-hover:to-[#8b3f20]/15
                    "
                  />

                  {/* Image edge */}
                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      h-px
                      bg-[#76513d]/50
                    "
                  />

                </div>


                {/* =========================
                    CONTENT
                ========================== */}
                <div className="relative p-4 sm:p-4">

                  {/* tiny label */}
                  <div className="flex items-center gap-2">

                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-[#b9602e]
                        shadow-[0_0_8px_rgba(185,96,46,0.45)]
                      "
                    />

                    <p
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.24em]
                        text-[#9b6a4b]
                      "
                    >
                      Muscle Group
                    </p>

                  </div>


                  {/* Name */}
                  <h3
                    className="
                      mt-1
                      text-base

                      uppercase
                      leading-tight
                      tracking-[.1em]
                      text-[#f1ebe5]

                      sm:text-lg
                    "
                  >
                    {visual.name}
                  </h3>


                  {/* Bottom row */}
                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      justify-between
                      border-t
                      border-[#332824]
                      pt-2
                    "
                  >

                    <span
                      className="
                        text-[9px]
                        uppercase
                        tracking-wide
                        text-[#807571]
                      "
                    >
                      Explore exercises
                    </span>


                    {/* Arrow */}
                    <span
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center

                        rounded-lg

                        border
                        border-[#5a3d2f]

                        bg-[#bd5c1c]

                        
                        transition-all
                        duration-400

                        group-hover:border-[#a85b30]
                        group-hover:bg-[#b9602e]
                        group-hover:text-[#160d09]

                        group-hover:shadow-[0_0_18px_rgba(185,96,46,0.25)]

                        
                      "
                    >
                      <span
                        className="
                          text-base
                          transition-transform
                          duration-300
                          group-hover:translate-x-0.5
                          text-black
                        "
                      >
                        →
                      </span>
                    </span>

                  </div>

                </div>


                {/* =========================
                    INNER LIGHT EDGE
                ========================== */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-[20px]

                    ring-1
                    ring-inset
                    ring-white/[0.025]

                    transition-all
                    duration-500

                    group-hover:ring-[#b9602e]/10
                  "
                />

              </div>


              {/* =========================
                  RIGHT 3D SIDE
              ========================== */}
              <div
                className="
                  absolute
                  right-0
                  top-2
                  z-10

                  h-[calc(100%-8px)]
                  w-6

                  origin-left

                  rounded-r-[16px]

                  border-r
                  border-[#553326]

                  bg-gradient-to-b
                  from-[#5a3021]
                  via-[#321b14]
                  to-[#120a08]

                  [transform:rotateY(90deg)]
                  [transform-origin:left]
                  [translateZ(22px)]
                "
              />


              {/* =========================
                  BOTTOM 3D SIDE
              ========================== */}
              <div
                className="
                  absolute
                  bottom-0
                  left-2
                  z-10

                  h-6
                  w-[calc(100%-14px)]

                  origin-top

                  rounded-b-[16px]

                  border-b
                  border-[#4a2b21]

                  bg-gradient-to-r
                  from-[#100806]
                  via-[#432319]
                  to-[#180c09]

                  [transform:rotateX(-90deg)]
                  [transform-origin:top]
                  [translateZ(22px)]
                "
              />


              {/* =========================
                  DARK BACK PLATE
              ========================== */}
              <div
                className="
                  absolute
                  inset-0

                  rounded-[20px]

                  bg-[#0d0807]

                  shadow-[0_20px_35px_rgba(0,0,0,0.5)]

                  [transform:translateZ(-4px)]
                "
              />


              {/* =========================
                  FLOOR SHADOW
              ========================== */}
              <div
                className="
                  pointer-events-none
                  absolute

                  -bottom-7
                  left-[8%]
                  right-[8%]

                  h-7

                  rounded-[50%]

                  bg-black/70
                  blur-xl

                  transition-all
                  duration-500

                  group-hover:-bottom-9
                  group-hover:left-[14%]
                  group-hover:right-[14%]
                  group-hover:scale-90
                  group-hover:bg-[#35170e]/40
                "
              />

            </div>

          </div>

        </Link>
      );
    })}

</div>
        
  </SectionWrapper>

        </div>
    )
}

export default Exercise
