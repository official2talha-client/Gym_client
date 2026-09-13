import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

const Forbidden = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#120D0B] px-5 text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.04] blur-3xl" />

        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-600/[0.05] blur-3xl animate-pulse" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-400/[0.04] blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-[15%] top-[25%] h-1 w-1 rounded-full bg-orange-400/40 animate-ping" />
        <span className="absolute left-[75%] top-[20%] h-1.5 w-1.5 rounded-full bg-orange-400/30 animate-pulse" />
        <span className="absolute left-[20%] bottom-[25%] h-1.5 w-1.5 rounded-full bg-orange-500/30 animate-pulse [animation-delay:700ms]" />
        <span className="absolute right-[18%] bottom-[30%] h-1 w-1 rounded-full bg-orange-400/40 animate-ping [animation-delay:1s]" />
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-lg text-center">

        {/* Animated Shield */}
        <div className="relative mx-auto mb-8 flex h-36 w-36 items-center justify-center">

          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-orange-500/10 animate-[spin_12s_linear_infinite]" />

          {/* Middle Ring */}
          <div className="absolute inset-3 rounded-full border border-orange-500/15 animate-[spin_8s_linear_infinite_reverse]" />

          {/* Glow */}
          <div className="absolute inset-8 rounded-full bg-orange-500/10 blur-xl animate-pulse" />

          {/* Shield */}
          <div className="
            relative flex h-20 w-20 items-center justify-center
            rounded-2xl
            border border-orange-500/25
            bg-[#1A1310]
            shadow-[0_0_40px_rgba(249,115,22,0.12)]
            animate-[float_3s_ease-in-out_infinite]
          ">
            <ShieldAlert
              size={38}
              strokeWidth={1.5}
              className="text-orange-400"
            />

            {/* Small status dot */}
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#1A1310] bg-red-500">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-2 overflow-hidden">
          <h1 className="
            text-7xl font-black tracking-[0.15em]
            text-orange-500
            animate-[fadeUp_.7s_ease-out]
            sm:text-8xl
          ">
            403
          </h1>
        </div>

        {/* Title */}
        <h2
          className="
            text-2xl font-bold text-white
            animate-[fadeUp_.7s_ease-out_.1s_both]
            sm:text-3xl
          "
        >
          Access Forbidden
        </h2>

        {/* Description */}
        <p
          className="
            mx-auto mt-3 max-w-md
            text-sm leading-6 text-[#9B8D86]
            animate-[fadeUp_.7s_ease-out_.2s_both]
          "
        >
          You don't have permission to access this area.
          Please return to a page you are authorized to view.
        </p>

        {/* Divider */}
        <div
          className="
            mx-auto my-7 h-px w-20
            bg-gradient-to-r from-transparent via-orange-500/40 to-transparent
            animate-[fadeUp_.7s_ease-out_.3s_both]
          "
        />

        {/* Buttons */}
        <div
          className="
            flex flex-col items-center justify-center gap-3
            sm:flex-row
            animate-[fadeUp_.7s_ease-out_.4s_both]
          "
        >
          <button
            onClick={() => window.history.back()}
            className="
              inline-flex items-center justify-center gap-2
              rounded-lg
              border border-[#352823]
              bg-[#1A1310]
              px-5 py-2.5
              text-sm font-medium
              text-[#B7A9A1]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-orange-500/30
              hover:bg-[#211914]
              hover:text-white
            "
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          <Link
            to="/"
            className="
              inline-flex items-center justify-center gap-2
              rounded-lg
              bg-orange-500
              px-5 py-2.5
              text-sm font-semibold
              text-white
              shadow-lg shadow-orange-950/30
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-orange-400
              hover:shadow-orange-500/20
              active:translate-y-0
            "
          >
            <Home size={16} />
            Go Home
          </Link>
        </div>

        {/* Bottom Security Text */}
        <div
          className="
            mt-8 flex items-center justify-center gap-2
            text-[10px] uppercase tracking-[0.2em]
            text-[#5F534D]
            animate-[fadeUp_.7s_ease-out_.5s_both]
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500/50" />
          Fit Elegant Security
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500/50" />
        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Forbidden;