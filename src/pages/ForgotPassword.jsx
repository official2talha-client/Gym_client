import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import FormField from '../components/FormField'
import PillButton from '../components/ui/PillButton'
import { api } from '../lib/api'

const schema = z.object({ email: z.string().email('Enter a valid email address') })

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: api.requestPasswordReset,
    onSuccess: () => setSent(true),
  })

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <>
          Remembered it?{' '}
          <Link to="/login" className="font-semibold text-accent-light hover:underline">Back to sign in</Link>
        </>
      }
    >
      {sent ? (
        <div className="rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-white">
          If an account exists for that email, a reset link is on its way.
        </div>
      ) : (
        <form onSubmit={handleSubmit((v) => mutation.mutate(v.email))} className="space-y-5" noValidate>
          <FormField id="email" label="Email address" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
          <PillButton type="submit" variant="orange" loading={isSubmitting || mutation.isPending} className="w-full justify-center">
            Send Reset Link
          </PillButton>
        </form>
      )}
    </AuthLayout>
  )
}
