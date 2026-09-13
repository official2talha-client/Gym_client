import { useMemo, useState } from 'react'
import SectionWrapper from '../../components/ui/SectionWrapper'
import FlatCard from '../../components/ui/FlatCard'
import GaugeBadge from '../../components/ui/GaugeBadge'
import PillButton from '../../components/ui/PillButton'

const CATEGORIES = [
  { max: 18.5, label: 'Underweight', percent: 25 },
  { max: 25, label: 'Healthy', percent: 60 },
  { max: 30, label: 'Overweight', percent: 80 },
  { max: Infinity, label: 'Obese', percent: 100 },
]

export default function BMICalculator() {
  const [heightCm, setHeightCm] = useState(170)
  const [weightKg, setWeightKg] = useState(70)
  const [submitted, setSubmitted] = useState(false)

  const bmi = useMemo(() => {
    const h = heightCm / 100
    if (!h || !weightKg) return 0
    return weightKg / (h * h)
  }, [heightCm, weightKg])

  const category = useMemo(() => CATEGORIES.find((c) => bmi < c.max) ?? CATEGORIES[CATEGORIES.length - 1], [bmi])

  return (
    <SectionWrapper
      id="bmi"
      eyebrow="Free tool"
      title="Check your BMI"
      subtitle="A quick estimate to start the conversation with your trainer — not a medical diagnosis."
    >
      <FlatCard className="mx-auto grid max-w-3xl gap-8 p-7 sm:p-10 lg:grid-cols-2 lg:items-center">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
        >
          <div>
            <label htmlFor="height" className="mb-2 block text-sm font-semibold text-white">
              Height ({heightCm} cm)
            </label>
            <input
              id="height"
              type="range"
              min="120"
              max="220"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>
          <div>
            <label htmlFor="weight" className="mb-2 block text-sm font-semibold text-white">
              Weight ({weightKg} kg)
            </label>
            <input
              id="weight"
              type="range"
              min="30"
              max="180"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>
          <PillButton type="submit" variant="orange" className="w-full justify-center">
            Calculate BMI
          </PillButton>
        </form>

        <div className="flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <GaugeBadge percent={submitted ? category.percent : 0} centerLabel={submitted ? bmi.toFixed(1) : '—'} size={120} strokeWidth={10} />
          <p className="text-lg font-bold text-white">{submitted ? category.label : 'Adjust and calculate'}</p>
          <p className="max-w-xs text-center text-xs text-ink-muted">
            This is an estimate only. Talk to a trainer for a full assessment tailored to your goals.
          </p>
        </div>
      </FlatCard>
    </SectionWrapper>
  )
}
