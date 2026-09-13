import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import PillButton from "../components/ui/PillButton";
import { useLoginUserMutation } from "../api/userApi.js";
import toast from "react-hot-toast";

// ============================================
// VALIDATION
// ============================================

const schema = z.object({
  emailOrPhone: z
    .string()
    .trim()
    .min(1, "Email or phone number is required")
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
        /^01[3-9]\d{8}$/.test(value),
      {
        message: "Enter a valid email or Bangladeshi phone number",
      }
    ),

  password: z.string().min(1, "Password is required"),
});

// ============================================
// LOGIN
// ============================================

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  const [loginUser, { isLoading }] = useLoginUserMutation();

  // ============================================
  // SUBMIT
  // ============================================

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data).unwrap();
      if (res?.data?.accessToken && res?.data?.refreshToken) {
        localStorage.setItem("token", res.data.accessToken);

        toast.success("Login successful");
      }

      const user = res?.data?.user;

      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/member/dashboard");
      }

    } catch (error) {
      console.log("login error", error);

      toast.error(
        error?.data?.message || "Unable to login. Please check your credentials."
      );
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your fitness journey."
      footer={
        <>
          {/* Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#ff681d] transition hover:text-[#ff8547] hover:underline"
          >
            Create one
          </Link> */}
        </>
      }
    >
      <div className="w-full">

        {/* ========================================
            BRAND HEADER
        ======================================== */}

        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#ff681d]">
            Member Login
          </p>

          <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-5xl">
            Ready To
            <br />
            <span className="text-[#ff681d]">Train?</span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#9d928c]">
            Access your membership, bookings and fitness journey
            from your account.
          </p>
        </div>

        {/* ========================================
            FORM CARD
        ======================================== */}

        <div className="rounded-2xl border border-[#3a2d27] bg-[#1d1512] p-5 shadow-2xl sm:p-7">

          <fieldset disabled={isLoading}>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >

            {/* ====================================
                EMAIL / PHONE
            ==================================== */}

            <FormField
              id="emailOrPhone"
              label="Email or Phone"
              type="text"
              placeholder="you@example.com or 017XXXXXXXX"
              error={errors.emailOrPhone?.message}
              {...register("emailOrPhone")}
            />

            {/* ====================================
                PASSWORD
            ==================================== */}

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-white"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={`w-full rounded-xl border bg-[#140f0d] px-4 py-3 pr-12 text-white outline-none transition placeholder:text-[#665d58] ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-[#ff681d]"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#81756f] transition hover:text-[#ff681d]"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* ====================================
                FORGOT PASSWORD
            ==================================== */}

            {/* <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-[#8f837d] transition hover:text-[#ff681d]"
              >
                Forgot password?
              </Link>
            </div> */}

            {/* ====================================
                SUBMIT
            ==================================== */}
<div className="w-full flex justify-center">
            <PillButton
              type="submit"
              variant="orange"
              loading={isLoading}
              className="w-full justify-center  "
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </PillButton>
</div>
          </form>

          </fieldset>


          {/* ========================================
              DIVIDER
          ======================================== */}

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#352924]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#665b56]">
              OR
            </span>

            <div className="h-px flex-1 bg-[#352924]" />
          </div>

          {/* ========================================
              REGISTER CTA
          ======================================== */}

          <div className="rounded-xl border border-[#332722] bg-[#140f0d] px-4 py-4 text-center">
            <p className="text-sm text-[#8f8580]">
              New to the gym?
            </p>

            <Link
              to="/register"
              className="mt-1 inline-block text-sm font-bold text-[#ff681d] transition hover:text-[#ff8547]"
            >
              Create your account →
            </Link>
          </div>
        </div>

        {/* ========================================
            BOTTOM BRANDING
        ======================================== */}

        <div className="mt-7 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#5f5651]">
            Train Hard • Stay Strong • Transform
          </p>
        </div>

      </div>
    </AuthLayout>
  );
}