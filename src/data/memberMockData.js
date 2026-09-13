// ---------------------------------------------------------------------------
// Member panel mock data. Placeholder values only, per the build brief.
// ---------------------------------------------------------------------------

export const memberProfile = {
  name: 'Demo Member',
  plan: 'Elegant',
  memberSince: '2025-11-02',
  daysRemaining: 18,
  streakDays: 6,
  workoutsThisMonth: 14,
  weeklyGoalPercent: 72,
  memberId: 'FE-000482',
}

export const progressLogs = [
  { id: 'p1', date: '2026-06-01', weightKg: 82.4, bodyFatPercent: 24.1 },
  { id: 'p2', date: '2026-06-15', weightKg: 81.1, bodyFatPercent: 23.4 },
  { id: 'p3', date: '2026-07-01', weightKg: 80.2, bodyFatPercent: 22.6 },
  { id: 'p4', date: '2026-07-15', weightKg: 79.5, bodyFatPercent: 22.0 },
]

export const nutritionPlan = {
  dailyCalories: 2200,
  macros: { protein: 160, carbs: 220, fat: 65 },
  meals: [
    { id: 'meal1', name: 'Breakfast', description: 'Sample meal — pending real plan from your nutrition coach.', calories: 480 },
    { id: 'meal2', name: 'Lunch', description: 'Sample meal — pending real plan from your nutrition coach.', calories: 620 },
    { id: 'meal3', name: 'Post-Workout', description: 'Sample meal — pending real plan from your nutrition coach.', calories: 340 },
    { id: 'meal4', name: 'Dinner', description: 'Sample meal — pending real plan from your nutrition coach.', calories: 560 },
  ],
}

export const myBookings = [
  { id: 'bk1', className: 'Strength Foundations', day: 'Sat', time: '7:00 AM', status: 'upcoming' },
  { id: 'bk2', className: 'HIIT Burn', day: 'Sun', time: '6:00 PM', status: 'upcoming' },
  { id: 'bk3', className: 'Power Yoga', day: 'Mon', time: '8:00 AM', status: 'completed' },
]

export const myPayments = [
  { id: 'pay1', trxId: 'SAMPLE8X92KQ', amount: 4000, status: 'verified', date: '2026-06-30' },
  { id: 'pay2', trxId: 'SAMPLE7A31LM', amount: 4000, status: 'verified', date: '2026-05-30' },
]

export const notifications = [
  { id: 'n1', text: 'Your membership renews in 18 days.', time: '2 hours ago', read: false },
  { id: 'n2', text: 'HIIT Burn class confirmed for Sunday, 6:00 PM.', time: 'Yesterday', read: false },
  { id: 'n3', text: 'New blog post: Understanding Progressive Overload.', time: '3 days ago', read: true },
]

export const achievements = [
  { id: 'ach1', title: '10 Workouts Logged', earned: true },
  { id: 'ach2', title: '30-Day Streak', earned: false },
  { id: 'ach3', title: 'First Transformation Photo', earned: true },
  { id: 'ach4', title: '5 Classes Attended', earned: true },
]
