import React from 'react'
import Register from '../components/Register'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function RegisterPage() {
    const navigate = useNavigate()
    return (
       <div className='p-6'>


         {/* ============================================
            HEADER
        ============================================ */}

      <div className="pt-12 sm:pt-16 w-full">
  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ff681d]">
    Join Us
  </p>

  <h1 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl">
    Create Your <span className="text-[#ff681d]">Account</span>
  </h1>

  <p className="mt-3 max-w-sm text-sm leading-5 text-[#aaa09b]">
    Create your account and start your fitness journey with us.
  </p>
</div>

        <Register  onSuccess={(response) => {
    toast.success("member registerd successfully")

    navigate("/login");
  }} />
       </div>
    )
}

export default RegisterPage
