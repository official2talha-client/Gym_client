import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";
import { z } from "zod";
import toast from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";
import {useRegisterUserMutation} from '../api/userApi.js'

// ============================================
// VALIDATION
// ============================================

const registerSchema = z.object({
     fullName: z
        .string()
        .trim()
        .min(3, "Full name must be at least 3 characters")
        .max(100, "Full name cannot exceed 100 characters")
        .regex(
          /^[a-zA-Z ]+$/,
          "Full name can contain only letters and spaces"
        ),
    
      userName: z
        .string()
        .trim()
        .min(2, "Username must be at least 2 characters")
        .max(50, "Username cannot exceed 50 characters")
        .regex(
          /^[a-zA-Z0-9_]+$/,
          "Username can contain only letters, numbers, and underscores"
        ),
    phone: z
      .string()
      .trim()
      .regex(
        /^01[3-9]\d{8}$/,
        "Enter a valid Bangladeshi phone number"
      ),

    email: z
      .string()
      .trim()
      .email("Enter a valid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(32, "Password cannot exceed 32 characters")
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#_!]{6,32}$/,
          "Password must contain at least one letter and one number"
        ),

    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


// ============================================
// COMPONENT
// ============================================

const Register = ({onSuccess,footer=true}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerUser,{isLoading,isError}] = useRegisterUserMutation()

const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
   try {

    const res = await registerUser(data).unwrap()

   onSuccess(res)
    
   } catch (error) {
    console.log("Register error",error);
    toast.error(error?.data?.message || "user registration failed")
    
   }
  };

  return (
    <div className="min-h-screen bg-[#110c09]  py-10 text-white sm:px-6">

      <div className="mx-auto w-full max-w-lg">

        {/* ============================================
            TOP BRAND STRIP
        ============================================ */}

        <div className="relative mb-8 overflow-hidden border-y border-[#ff681d] bg-[#ff681d] py-3 rotate-[-2deg]">
          <p className="text-center font-black italic tracking-wider text-white text-xl sm:text-2xl">
            Fill up all the field below in proper form.
          </p>
        </div>

        {/* ============================================
            FORM CARD
        ============================================ */}

        <div className="rounded-2xl border border-[#3a2d27] bg-[#1d1512] p-5 shadow-2xl sm:p-7">
  <fieldset disabled={isLoading}>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 lg:grid-cols-2"
    >
      {/* ========================================
          FULL NAME
      ======================================== */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#d7cfca]">
          Full Name
        </label>

        <div className="relative">
          <User
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#81756f]"
          />

          <input
            type="text"
            placeholder="Enter your full name"
            {...register("fullName")}
            className={`w-full rounded-xl border bg-[#140f0d] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#665d58] ${
              errors.fullName
                ? "border-red-500 focus:border-red-500"
                : "border-[#3a2d27] focus:border-[#ff681d]"
            }`}
          />
        </div>

        {errors.fullName && (
          <p className="mt-1.5 text-xs text-red-400">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* ========================================
          USERNAME
      ======================================== */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#d7cfca]">
          Username
        </label>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#81756f]">
            @
          </span>

          <input
            type="text"
            placeholder="Choose a username"
            {...register("userName")}
            className={`w-full rounded-xl border bg-[#140f0d] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#665d58] ${
              errors.userName
                ? "border-red-500 focus:border-red-500"
                : "border-[#3a2d27] focus:border-[#ff681d]"
            }`}
          />
        </div>

        {errors.userName && (
          <p className="mt-1.5 text-xs text-red-400">
            {errors.userName.message}
          </p>
        )}
      </div>

      {/* ========================================
          PHONE
      ======================================== */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#d7cfca]">
          Phone Number
        </label>

        <div className="relative">
          <Phone
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#81756f]"
          />

          <input
            type="tel"
            placeholder="017XXXXXXXX"
            {...register("phone")}
            className={`w-full rounded-xl border bg-[#140f0d] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#665d58] ${
              errors.phone
                ? "border-red-500 focus:border-red-500"
                : "border-[#3a2d27] focus:border-[#ff681d]"
            }`}
          />
        </div>

        {errors.phone && (
          <p className="mt-1.5 text-xs text-red-400">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* ========================================
          EMAIL
      ======================================== */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#d7cfca]">
          Email Address
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#81756f]"
          />

          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className={`w-full rounded-xl border bg-[#140f0d] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#665d58] ${
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-[#3a2d27] focus:border-[#ff681d]"
            }`}
          />
        </div>

        {errors.email && (
          <p className="mt-1.5 text-xs text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* ========================================
          PASSWORD
      ======================================== */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#d7cfca]">
          Password
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#81756f]"
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            {...register("password")}
            className={`w-full rounded-xl border bg-[#140f0d] py-3.5 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-[#665d58] ${
              errors.password
                ? "border-red-500 focus:border-red-500"
                : "border-[#3a2d27] focus:border-[#ff681d]"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#81756f] transition hover:text-[#ff681d]"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1.5 text-xs text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* ========================================
          CONFIRM PASSWORD
      ======================================== */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#d7cfca]">
          Confirm Password
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#81756f]"
          />

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            {...register("confirmPassword")}
            className={`w-full rounded-xl border bg-[#140f0d] py-3.5 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-[#665d58] ${
              errors.confirmPassword
                ? "border-red-500 focus:border-red-500"
                : "border-[#3a2d27] focus:border-[#ff681d]"
            }`}
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword((prev) => !prev)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#81756f] transition hover:text-[#ff681d]"
          >
            {showConfirmPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="mt-1.5 text-xs text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* ========================================
          SUBMIT
      ======================================== */}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-1 w-full rounded-xl bg-[#ff681d] py-3.5 text-sm font-black uppercase tracking-wider text-white transition hover:bg-[#e95712] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 lg:col-span-2"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  </fieldset>

  {/* ========================================
      LOGIN FOOTER
  ======================================== */}

  {footer && (
    <div className="mt-6 border-t border-[#352924] pt-5 text-center">
      <p className="text-sm text-[#8f8580]">
        Already have an account?{" "}

        <Link to="/login">
          <button
            type="button"
            className="font-bold text-[#ff681d] transition hover:text-[#ff8547]"
          >
            Login
          </button>
        </Link>
      </p>
    </div>
  )}
        </div>

             {/* Footer  */}

        <p className="mt-6 text-center text-xs uppercase tracking-widest text-[#5f5651]">
          Train Hard • Stay Strong • Transform
        </p>



      </div>
    </div>
  );
};

export default Register;