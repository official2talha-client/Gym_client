import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import SectionWrapper, { RevealItem } from '../../components/ui/SectionWrapper'
import FlatCard from '../../components/ui/FlatCard'
import PillButton from '../../components/ui/PillButton'
import { useToast } from '../../components/ui/Toast'
import { api } from '../../lib/api'
import { GYM_ADDRESS, GYM_PHONE, GYM_HOURS, GYM_MAP_EMBED } from '../../lib/constants'

const contactSchema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  phone: z.string().min(6, 'Enter a valid phone number'),
  message: z.string().min(10, 'Message should be at least 10 characters'),
})

function ContactForm() {
  const { push } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema) })

  const mutation = useMutation({
    mutationFn: api.submitContact,
    onSuccess: () => {
      push('Message sent — we will get back to you soon.', { tone: 'success' })
      reset()
    },
    onError: () => push('Could not send your message. Please try again.', { tone: 'error' }),
  })

  return (
    <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-white">Full name</label>
        <input
          id="name"
          {...register('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="w-full rounded-xl border border-white/10 bg-base px-4 py-3 text-white placeholder:text-ink-muted/60 focus:border-accent"
          placeholder="Your name"
        />
        {errors.name && <p id="name-error" className="mt-1 text-xs text-accent-light">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-white">Phone number</label>
        <input
          id="phone"
          {...register('phone')}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          className="w-full rounded-xl border border-white/10 bg-base px-4 py-3 text-white placeholder:text-ink-muted/60 focus:border-accent"
          placeholder="+880 1XXX-XXXXXX"
        />
        {errors.phone && <p id="phone-error" className="mt-1 text-xs text-accent-light">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-white">Message</label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="w-full resize-none rounded-xl border border-white/10 bg-base px-4 py-3 text-white placeholder:text-ink-muted/60 focus:border-accent"
          placeholder="Tell us what you're looking for…"
        />
        {errors.message && <p id="message-error" className="mt-1 text-xs text-accent-light">{errors.message.message}</p>}
      </div>

      <PillButton type="submit" variant="orange" loading={isSubmitting || mutation.isPending} className="w-full justify-center">
        Send Message
      </PillButton>
    </form>
  )
}

function Newsletter() {
  const { push } = useToast()
  const [email, setEmail] = useState('')
  const mutation = useMutation({
    mutationFn: api.subscribeNewsletter,
    onSuccess: () => {
      push('Subscribed! Watch your inbox for updates.', { tone: 'success' })
      setEmail('')
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (email) mutation.mutate(email)
      }}
      className="mt-6 flex flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full flex-1 rounded-xl border border-white/10 bg-base px-4 py-3 text-white placeholder:text-ink-muted/60 focus:border-accent"
      />
      <PillButton type="submit" variant="light" loading={mutation.isPending} size="sm">
        Subscribe
      </PillButton>
    </form>
  )
}

export default function Contact() {
  return (
    <SectionWrapper id="contact" eyebrow="Get in touch" title="Come see the studio">
      <div className="grid gap-8 lg:grid-cols-2">
        <RevealItem className="space-y-6">
          <FlatCard className="p-7 sm:p-8">
            <ContactForm />
          </FlatCard>
          <FlatCard className="p-7 sm:p-8">
            <h3 className="mb-2 font-body text-lg font-bold normal-case text-white">Get training tips in your inbox</h3>
            <p className="text-sm text-ink-muted">Sample copy — pending real content. One email a month, no spam.</p>
            <Newsletter />
          </FlatCard>
        </RevealItem>

        <RevealItem className="flex flex-col gap-6">
          <FlatCard className="overflow-hidden p-0">
            <iframe
              title="Fit Elegant Gym & Café location"
              src={GYM_MAP_EMBED}
              className="h-64 w-full sm:h-72"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </FlatCard>
          <FlatCard className="space-y-4 p-7 sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">Address</p>
              <p className="text-white">{GYM_ADDRESS}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">Phone</p>
              <p className="text-white">{GYM_PHONE}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">Hours</p>
              <p className="text-white">{GYM_HOURS}</p>
            </div>
          </FlatCard>
        </RevealItem>
      </div>
    </SectionWrapper>
  )
}
