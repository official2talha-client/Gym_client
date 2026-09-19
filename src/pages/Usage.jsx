import React from "react";
import {
  UserPlus,
  LogIn,
  CreditCard,
  Dumbbell,
  PlayCircle,
  Users,
  BookOpen,
  UserCircle,
  History,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

const Usage = () => {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Create Your Account",
      description:
        "Start by creating your personal account. Enter your basic information and create secure login credentials.",
      points: [
        "Open the Register page",
        "Enter your required information",
        "Follow the rules mentioned at registration form",
        "Create your account",
        "Log in with your credentials",
      ],
    },
    {
      number: "02",
      icon: LogIn,
      title: "Log In",
      description:
        "After creating your account, log in to access your personal gym features and membership information.",
      points: [
        "Go to the Login page",
        "Enter your email / phone and password",
        "Access your personal dashboard",
        "Keep your account credentials secure",
      ],
    },
    {
      number: "03",
      icon: CreditCard,
      title: "Choose a Membership Plan",
      description:
        "Explore the available membership plans and choose the one that matches your training needs.",
      points: [
        "Open Membership Plans",
        "Compare available plans",
        "Check duration and charges",
        "Select your preferred plan",
      ],
    },
    {
      number: "04",
      icon: CheckCircle2,
      title: "Complete Your Membership",
      description:
        "Submit your membership request and complete the required information. Your membership status can then be managed from your account.",
      points: [
        "Select a membership plan",
        "Your account information will be attached with it",
        "Submit your membership request",
        "Check your membership status",
      ],
    },
    {
      number: "05",
      icon: Dumbbell,
      title: "Explore Exercises",
      description:
        "Browse exercises based on different body parts and training requirements.",
      points: [
        "Open the Exercises section",
        "Choose a body part",
        "Browse available exercises",
        "Open an exercise for full details",
      ],
    },
    {
      number: "06",
      icon: PlayCircle,
      title: "Watch Exercise Videos",
      description:
        "Every exercise can include a demonstration video to help you understand the correct form and movement.",
      points: [
        "Open any exercise",
        "Read the exercise information",
        "Check the target muscle and equipment",
        "Watch the demonstration video",
      ],
    },
    {
      number: "07",
      icon: Users,
      title: "Meet the Trainers",
      description:
        "Check the available trainers and learn more about their experience, schedule, and training information.",
      points: [
        "Open the Trainers section",
        "Browse available trainers",
        "View trainer information",
      ],
    },
   
    {
      number: "09",
      icon: UserCircle,
      title: "Manage Your Profile",
      description:
        "Keep your personal information up to date from your account or profile section.",
      points: [
        "Open your profile",
        "Review your account information",
        "Update available personal details",
        "Keep your information accurate",
      ],
    },
    {
      number: "10",
      icon: History,
      title: "Check Membership History",
      description:
        "Review your previous and current memberships to keep track of your gym subscription activity.",
      points: [
        "Open your membership history",
        "View previous memberships",
        "Check membership dates",
        "Review your current membership status",
      ],
    },
  ];

  return (
    <section className="min-h-screen bg-[#100b09] px-4 py-12 text-white sm:px-6 lg:px-8 pt-10">

      {/* =====================================================
          HERO
      ====================================================== */}

      <div className="mx-auto max-w-5xl text-center pt-8">

        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-orange-500 sm:text-xs">
          User Manual
        </p>

        <h1 className="mt-4 text-3xl font-black uppercase leading-tight tracking-[0.06em] sm:text-4xl lg:text-6xl">
          How To Use The Gym Website
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white">
          New to the platform? Follow this simple guide to create your
          account, choose a membership, explore exercises, watch training
          videos, and manage your gym activities.
        </p>

      </div>


      {/* =====================================================
          QUICK START
      ====================================================== */}

      <div className="mx-auto mt-10 max-w-5xl">

        <div className="rounded-2xl border border-[#3a2b27] bg-[#1b1210] p-5 sm:p-7">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <ArrowRight size={20} />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-orange-500">
                Quick Start
              </p>

              <h2 className="mt-1 text-lg font-black uppercase sm:text-xl">
                Start Here
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Explore membership plans, use the exercise library, training videos, trainers,
                and other features available to members.
                If you want to request for any plans, then you need to login first.
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          STEPS
      ====================================================== */}

      <div className="mx-auto mt-10 max-w-5xl">

        <div className="space-y-5">

          {steps.map((step) => {

            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group rounded-2xl border border-[#3a2b27] bg-[#1b1210] p-5 transition duration-300 hover:border-orange-500/30 sm:p-7"
              >

                <div className="flex flex-col gap-5 sm:flex-row">

                  {/* Number */}

                  <div className="flex shrink-0 items-start gap-4 sm:w-32 sm:flex-col sm:gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-black">
                      <Icon size={21} />
                    </div>

                    <span className="text-[10px] font-black tracking-[0.25em] text-gray-600">
                      STEP {step.number}
                    </span>

                  </div>


                  {/* Content */}

                  <div className="flex-1">

                    <h2 className="text-lg font-black uppercase tracking-wide text-white sm:text-xl">
                      {step.title}
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                      {step.description}
                    </p>


                    {/* Points */}

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">

                      {step.points.map((point, index) => (

                        <div
                          key={index}
                          className="flex items-center gap-2"
                        >

                          <CheckCircle2
                            size={15}
                            className="shrink-0 text-orange-500"
                          />

                          <span className="text-xs text-gray-300">
                            {point}
                          </span>

                        </div>

                      ))}

                    </div>

                  </div>

                </div>

              </div>
            );

          })}

        </div>

      </div>


      {/* =====================================================
          EXERCISE GUIDE
      ====================================================== */}

      <div className="mx-auto mt-12 max-w-5xl">

        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.04] p-6 sm:p-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-black">
              <Dumbbell size={21} />
            </div>

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-orange-500">
                Exercise Library
              </p>

              <h2 className="mt-2 text-xl font-black uppercase">
                How To Find The Right Exercise
              </h2>

              <div className="mt-4 space-y-3 text-sm leading-6 text-gray-400">

                <p>
                  <span className="font-semibold text-white">
                    1.
                  </span>{" "}
                  Open the Exercises section from the navigation menu.
                </p>

                <p>
                  <span className="font-semibold text-white">
                    2.
                  </span>{" "}
                  Select the body part you want to train.
                </p>

                <p>
                  <span className="font-semibold text-white">
                    3.
                  </span>{" "}
                  Select an exercise from the available results.
                </p>

                <p>
                  <span className="font-semibold text-white">
                    4.
                  </span>{" "}
                  Check the target muscle, equipment, difficulty, and
                  duration.
                </p>

                <p>
                  <span className="font-semibold text-white">
                    5.
                  </span>{" "}
                  Watch the exercise demonstration before performing
                  the movement.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          ACCOUNT SAFETY
      ====================================================== */}

      <div className="mx-auto mt-6 max-w-5xl">

        <div className="rounded-2xl border border-[#3a2b27] bg-[#1b1210] p-6 sm:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <ShieldCheck size={20} />
            </div>

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-orange-500">
                Account Security
              </p>

              <h2 className="mt-2 text-lg font-black uppercase">
                Keep Your Account Safe
              </h2>

              <ul className="mt-4 space-y-3 text-sm text-gray-400">

                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 text-orange-500"
                  />
                  Never share your password with anyone.
                </li>

                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 text-orange-500"
                  />
                  Always log out when using a shared device.
                </li>

                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 text-orange-500"
                  />
                  Keep your account information accurate and up to date.
                </li>

                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 text-orange-500"
                  />
                  Contact the gym if you notice an issue with your
                  membership or account.
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          HELP
      ====================================================== */}

      <div className="mx-auto mt-6 max-w-5xl">

        <div className="rounded-2xl border border-[#3a2b27] bg-[#1b1210] p-6 text-center sm:p-8">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
            <HelpCircle size={22} />
          </div>

          <h2 className="mt-4 text-xl font-black uppercase">
            Need Help?
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-400">
            If you have a problem with your account, membership, payment,
            or any other gym service, contact the gym directly for
            assistance.
          </p>

        </div>

      </div>


      {/* =====================================================
          END
      ====================================================== */}

      <div className="mx-auto mt-12 max-w-5xl pb-8 text-center">

        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-600">
          Train Smart • Stay Consistent • Get Stronger
        </p>

      </div>

    </section>
  );
};

export default Usage;