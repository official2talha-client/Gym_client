import { useQuery } from '@tanstack/react-query'
import FlatCard from '../../components/ui/FlatCard'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import { api } from '../../lib/api'

export default function MemberNutrition() {
  const { data: plan, isLoading, isError, refetch } = useQuery({ queryKey: ['nutrition-plan'], queryFn: api.getNutritionPlan })

  if (isLoading) return <Skeleton className="h-80 w-full" />
  if (isError) return <ErrorState onRetry={refetch} />

  const macroTotal = plan.macros.protein + plan.macros.carbs + plan.macros.fat

  return (
    <div className="space-y-6">
      <FlatCard className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">Daily target</p>
            <p className="font-display text-3xl text-accent-light">{plan.dailyCalories} kcal</p>
          </div>
          <div className="flex gap-6">
            {[
              { label: 'Protein', value: plan.macros.protein, color: 'bg-accent' },
              { label: 'Carbs', value: plan.macros.carbs, color: 'bg-white' },
              { label: 'Fat', value: plan.macros.fat, color: 'bg-ink-muted' },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <p className="font-display text-lg text-white">{m.value}g</p>
                <p className="text-xs text-ink-muted">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full bg-accent" style={{ width: `${(plan.macros.protein / macroTotal) * 100}%` }} />
          <div className="h-full bg-white" style={{ width: `${(plan.macros.carbs / macroTotal) * 100}%` }} />
          <div className="h-full bg-ink-muted" style={{ width: `${(plan.macros.fat / macroTotal) * 100}%` }} />
        </div>
      </FlatCard>

      <div className="grid gap-4 sm:grid-cols-2">
        {plan.meals.map((meal) => (
          <FlatCard key={meal.id} className="p-5">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-body text-base font-bold normal-case text-white">{meal.name}</h3>
              <span className="text-sm text-accent-light">{meal.calories} kcal</span>
            </div>
            <p className="text-sm text-ink-muted">{meal.description}</p>
          </FlatCard>
        ))}
      </div>
    </div>
  )
}
