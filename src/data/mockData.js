// ---------------------------------------------------------------------------
// MOCK DATA -- Fit Elegant Gym & Café
// All sample pricing, names, and quotes are placeholders per the build
// brief's token legend. Structure mirrors what a real backend response
// would look like so wiring up a real API later is a drop-in swap.
// ---------------------------------------------------------------------------

// Sample pricing -- confirm real membership prices with client before launch.
export const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 2500,
    period: 'mo',
    tagline: 'Get moving with full gym-floor access.',
    popular: false,
    features: [
      'Full gym floor access',
      'Locker room & showers',
      'Standard operating hours',
      '1 free trainer consultation',
    ],
  },
  {
    id: 'elegant',
    name: 'Elegant',
    price: 4000,
    period: 'mo',
    tagline: 'Our most-loved plan for consistent progress.',
    popular: true,
    features: [
      'Everything in Basic',
      'Unlimited group classes',
      'Monthly InBody assessment',
      'Café discount, 10%',
      'Priority booking for classes',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 6500,
    period: 'mo',
    tagline: 'Full access plus 1-on-1 coaching support.',
    popular: false,
    features: [
      'Everything in Elegant',
      '4 personal training sessions / mo',
      'Custom nutrition plan',
      'Café discount, 20%',
      'Guest passes, 2 / mo',
    ],
  },
]

// Sample trainers -- replace names, bios, and photos with real profiles.
export const trainers = [
  {
    id: 't1',
    slug: 'sample-trainer-1',
    name: 'Trainer One',
    specialty: 'Strength',
    tags: ['Powerlifting', 'Hypertrophy'],
    bio: 'Sample bio — pending real profile. Focused on progressive overload and clean technique for lifters at every level.',
    avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop',
    rating: 4.9,
    yearsExperience: 8,
    schedule: [
      { day: 'Sat', time: '7:00 AM – 9:00 AM' },
      { day: 'Mon', time: '7:00 AM – 9:00 AM' },
      { day: 'Wed', time: '5:00 PM – 8:00 PM' },
    ],
  },
  {
    id: 't2',
    slug: 'sample-trainer-2',
    name: 'Trainer Two',
    specialty: 'HIIT',
    tags: ['Conditioning', 'Fat Loss'],
    bio: 'Sample bio — pending real profile. High-energy conditioning coach who builds sustainable habits, not quick fixes.',
    avatar: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=400&auto=format&fit=crop',
    rating: 4.8,
    yearsExperience: 6,
    schedule: [
      { day: 'Sun', time: '6:00 PM – 8:00 PM' },
      { day: 'Tue', time: '6:00 PM – 8:00 PM' },
      { day: 'Thu', time: '6:00 PM – 8:00 PM' },
    ],
  },
  {
    id: 't3',
    slug: 'sample-trainer-3',
    name: 'Trainer Three',
    specialty: 'Yoga',
    tags: ['Mobility', 'Recovery'],
    bio: 'Sample bio — pending real profile. Blends breathwork and mobility work to help members recover between hard sessions.',
    avatar: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=400&auto=format&fit=crop',
    rating: 5.0,
    yearsExperience: 5,
    schedule: [
      { day: 'Sat', time: '8:00 AM – 9:00 AM' },
      { day: 'Mon', time: '8:00 AM – 9:00 AM' },
      { day: 'Fri', time: '5:00 PM – 6:00 PM' },
    ],
  },
  {
    id: 't4',
    slug: 'sample-trainer-4',
    name: 'Trainer Four',
    specialty: 'Nutrition',
    tags: ['Meal Planning', 'Coaching'],
    bio: 'Sample bio — pending real profile. Works alongside training plans to build practical, culturally-relevant meal strategies.',
    avatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=400&auto=format&fit=crop',
    rating: 4.7,
    yearsExperience: 7,
    schedule: [
      { day: 'Sun', time: '10:00 AM – 1:00 PM' },
      { day: 'Wed', time: '10:00 AM – 1:00 PM' },
    ],
  },
]

// isSample flags keep placeholder testimonials easy to find in the data
// layer while the public-facing UI itself renders them without a visible
// "sample" badge, per the brief.
export const testimonials = [
  {
    id: 'r1',
    name: 'Member A.',
    quote:
      'Sample — pending real review. The coaching here actually changed how I train — I look forward to every session.',
    rating: 5,
    isSample: true,
  },
  {
    id: 'r2',
    name: 'Member B.',
    quote: 'Sample — pending real review. Clean facility, great energy, and the trainers actually know what they are doing.',
    rating: 5,
    isSample: true,
  },
  {
    id: 'r3',
    name: 'Member C.',
    quote: 'Sample — pending real review. Three months in and I have more energy than I have had in years.',
    rating: 4,
    isSample: true,
  },
]

export const classes = [
  { id: 'c1', name: 'Strength Foundations', day: 'Sat', time: '7:00 AM', duration: 60, trainerId: 't1', spots: 12, spotsLeft: 4 },
  { id: 'c2', name: 'HIIT Burn', day: 'Sat', time: '6:00 PM', duration: 45, trainerId: 't2', spots: 16, spotsLeft: 9 },
  { id: 'c3', name: 'Power Yoga', day: 'Sun', time: '8:00 AM', duration: 50, trainerId: 't3', spots: 14, spotsLeft: 6 },
  { id: 'c4', name: 'HIIT Burn', day: 'Sun', time: '6:00 PM', duration: 45, trainerId: 't2', spots: 16, spotsLeft: 2 },
  { id: 'c5', name: 'Strength Foundations', day: 'Mon', time: '7:00 AM', duration: 60, trainerId: 't1', spots: 12, spotsLeft: 5 },
  { id: 'c6', name: 'Mobility & Recovery', day: 'Mon', time: '8:00 AM', duration: 40, trainerId: 't3', spots: 14, spotsLeft: 8 },
  { id: 'c7', name: 'HIIT Burn', day: 'Tue', time: '6:00 PM', duration: 45, trainerId: 't2', spots: 16, spotsLeft: 11 },
  { id: 'c8', name: 'Nutrition Workshop', day: 'Wed', time: '10:00 AM', duration: 60, trainerId: 't4', spots: 20, spotsLeft: 14 },
  { id: 'c9', name: 'Strength Foundations', day: 'Wed', time: '5:00 PM', duration: 60, trainerId: 't1', spots: 12, spotsLeft: 3 },
  { id: 'c10', name: 'HIIT Burn', day: 'Thu', time: '6:00 PM', duration: 45, trainerId: 't2', spots: 16, spotsLeft: 7 },
  { id: 'c11', name: 'Power Yoga', day: 'Fri', time: '5:00 PM', duration: 50, trainerId: 't3', spots: 14, spotsLeft: 10 },
]

export const blogPosts = [
  {
    id: 'b1',
    slug: 'sample-progressive-overload',
    title: 'Sample Post: Understanding Progressive Overload',
    excerpt: 'Sample excerpt — pending real content. The single most important principle for long-term strength gains.',
    coverImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',
    author: 'Fit Elegant Team',
    date: '2026-05-12',
    readMinutes: 6,
    tags: ['Strength', 'Training'],
    body: 'Sample body copy — pending real content. This placeholder post exists to demonstrate the blog layout, typography, and reading experience before real articles are supplied by the client.',
  },
  {
    id: 'b2',
    slug: 'sample-recovery-basics',
    title: 'Sample Post: Recovery Basics for Busy Schedules',
    excerpt: 'Sample excerpt — pending real content. Small, sustainable habits that keep you training consistently.',
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
    author: 'Fit Elegant Team',
    date: '2026-04-28',
    readMinutes: 4,
    tags: ['Recovery', 'Wellness'],
    body: 'Sample body copy — pending real content. This placeholder post exists to demonstrate the blog layout, typography, and reading experience before real articles are supplied by the client.',
  },
  {
    id: 'b3',
    slug: 'sample-cafe-nutrition',
    title: 'Sample Post: What We Serve at the Café, and Why',
    excerpt: 'Sample excerpt — pending real content. A look at how the café menu supports your training goals.',
    coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop',
    author: 'Fit Elegant Team',
    date: '2026-04-02',
    readMinutes: 5,
    tags: ['Nutrition', 'Café'],
    body: 'Sample body copy — pending real content. This placeholder post exists to demonstrate the blog layout, typography, and reading experience before real articles are supplied by the client.',
  },
]

export const faqs = [
  {
    id: 'f1',
    question: 'Do I need to book classes in advance?',
    answer: 'Sample answer — pending real content. Yes, spots are limited so booking ahead through the schedule secures your place.',
  },
  {
    id: 'f2',
    question: 'What payment methods are accepted?',
    answer: 'Sample answer — pending real content. Membership payments are handled through bKash — scan the QR code or use the merchant number and submit your Transaction ID for verification.',
  },
  {
    id: 'f3',
    question: 'Can I freeze my membership temporarily?',
    answer: 'Sample answer — pending real content. Yes, memberships can be frozen for a limited period — speak with the front desk or your trainer.',
  },
  {
    id: 'f4',
    question: 'Is there a free trial available?',
    answer: 'Sample answer — pending real content. Yes, first-time visitors can book a free trial session using the button at the top of the page.',
  },
  {
    id: 'f5',
    question: 'Do you offer nutrition coaching?',
    answer: 'Sample answer — pending real content. Yes, our nutrition trainer offers custom meal planning as part of the Elite plan, or as a standalone add-on.',
  },
]

// Before/after transformation gallery -- placeholder imagery only.
export const galleryItems = [
  { id: 'g1', label: 'Sample transformation', before: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop', after: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop' },
  { id: 'g2', label: 'Sample transformation', before: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=600&auto=format&fit=crop', after: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600&auto=format&fit=crop' },
  { id: 'g3', label: 'Sample transformation', before: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=600&auto=format&fit=crop', after: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop' },
  { id: 'g4', label: 'Sample transformation', before: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=600&auto=format&fit=crop', after: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop' },
]

export const partners = [
  { id: 'p1', name: 'Sample Partner 1' },
  { id: 'p2', name: 'Sample Partner 2' },
  { id: 'p3', name: 'Sample Partner 3' },
  { id: 'p4', name: 'Sample Partner 4' },
  { id: 'p5', name: 'Sample Partner 5' },
]

export const statBadges = [
  { id: 's1', value: 10, suffix: '+', label: 'Years Running' },
  { id: 's2', value: 50, suffix: '+', label: 'Trainers & Staff' },
  { id: 's3', value: 1200, suffix: '+', label: 'Members Trained' },
  { id: 's4', value: 98, suffix: '%', label: 'Member Retention' },
]

export const amenities = [
  {
    id: 'a1',
    number: '01',
    title: 'Modern Equipment',
    tags: ['Free weights', 'Machines'],
    description: 'Sample description — pending real content. A full floor of modern strength and cardio equipment, maintained daily.',
  },
  {
    id: 'a2',
    number: '02',
    title: 'Expert Trainers',
    tags: ['Certified', '1-on-1'],
    description: 'Sample description — pending real content. A coaching staff covering strength, conditioning, mobility, and nutrition.',
  },
  {
    id: 'a3',
    number: '03',
    title: 'Group Classes',
    tags: ['HIIT', 'Yoga'],
    description: 'Sample description — pending real content. A weekly rotation of group classes for every training style and level.',
  },
  {
    id: 'a4',
    number: '04',
    title: 'Café & Recovery Lounge',
    tags: ['Fuel', 'Relax'],
    description: 'Sample description — pending real content. A café on-site for post-workout meals, protein shakes, and downtime.',
  },
]
