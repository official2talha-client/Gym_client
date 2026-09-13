import PillButton from "../components/ui/PillButton";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-28 text-center">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl animate-pulse" />

        <div className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-accent/40 animate-ping" />

        <div className="absolute right-[15%] top-[30%] h-1.5 w-1.5 rounded-full bg-accent/30 animate-pulse [animation-delay:700ms]" />

        <div className="absolute bottom-[20%] left-[20%] h-1.5 w-1.5 rounded-full bg-accent/30 animate-pulse [animation-delay:1.2s]" />

        <div className="absolute bottom-[25%] right-[20%] h-2 w-2 rounded-full bg-accent/30 animate-ping [animation-delay:1.5s]" />
      </div>

      {/* Huge background 404 */}
      <span
        className="
          ghost-word
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          select-none
          font-display
          text-[40vw]
          leading-none
          text-white
          opacity-[0.025]
          animate-[ghostFloat_6s_ease-in-out_infinite]
        "
        aria-hidden="true"
      >
        404
      </span>

      {/* Main content */}
      <div className="relative z-10">
        {/* 404 Number */}
        <div className="relative inline-block animate-[fadeUp_.7s_ease-out]">
          {/* Glow behind number */}
          <div className="absolute inset-0 blur-2xl bg-accent/20 animate-pulse" />

          <p
            className="
              relative
              font-display
              text-7xl
              font-bold
              text-accent
              drop-shadow-[0_0_25px_rgba(255,120,40,0.25)]
              sm:text-8xl
              animate-[float_3s_ease-in-out_infinite]
            "
          >
            404
          </p>
        </div>

        {/* Heading */}
        <h1
          className="
            mt-4
            font-display
            text-3xl
            text-white
            opacity-0
            animate-[fadeUp_.7s_ease-out_.15s_forwards]
            sm:text-4xl
          "
        >
          Page Not Found
        </h1>

        {/* Description */}
        <p
          className="
            mx-auto
            mt-3
            max-w-sm
            text-ink-muted
            opacity-0
            animate-[fadeUp_.7s_ease-out_.3s_forwards]
          "
        >
          The page you're looking for doesn't exist or may have moved.
        </p>

        {/* Divider */}
        <div
          className="
            mx-auto
            my-7
            h-px
            w-16
            bg-gradient-to-r
            from-transparent
            via-accent/50
            to-transparent
            opacity-0
            animate-[fadeUp_.7s_ease-out_.4s_forwards]
          "
        />

        {/* Button */}
        <div className="opacity-0 animate-[fadeUp_.7s_ease-out_.5s_forwards]">
          <PillButton
            to="/"
            variant="orange"
            className="relative transition-transform duration-300 hover:-translate-y-1"
          >
            Back to Home
          </PillButton>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes ghostFloat {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
            }

            50% {
              transform: translate(-50%, -52%) scale(1.03);
            }
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(18px);
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
}