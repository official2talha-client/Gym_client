import {
  plans,
  trainers,
  testimonials,
  classes,
  blogPosts,
  faqs,
  galleryItems,
  partners,
} from '../data/mockData'
import {
  kpis,
  revenueTrend,
  planDistribution,
  activityFeed,
  expiringMembers,
  members,
  coupons,
  contactMessages,
  bkashTransactions,
  attendanceByHour,
  checkIns,
} from '../data/adminMockData'
import {
  memberProfile,
  progressLogs,
  nutritionPlan,
  myBookings,
  myPayments,
  notifications,
  achievements,
} from '../data/memberMockData'

// ---------------------------------------------------------------------------
// Fake API layer.
//
// Every function here returns a Promise, just like a real HTTP client would,
// and includes an artificial delay so loading states are visible and testable
// during this frontend-only build. When a real backend exists, only the
// function bodies below change (e.g. to axios calls) -- every component that
// consumes these via TanStack Query stays exactly the same.
// ---------------------------------------------------------------------------

const NETWORK_DELAY = 500

function delay(data, ms = NETWORK_DELAY) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export const api = {
  getPlans: () => delay(plans),
  getTrainers: () => delay(trainers),
  getTrainerBySlug: (slug) => delay(trainers.find((t) => t.slug === slug) ?? null),
  getTestimonials: () => delay(testimonials),
  getClasses: () => delay(classes),
  getBlogPosts: () => delay(blogPosts),
  getBlogPostBySlug: (slug) => delay(blogPosts.find((p) => p.slug === slug) ?? null),
  getFaqs: () => delay(faqs),
  getGalleryItems: () => delay(galleryItems),
  getPartners: () => delay(partners),

  // UI-only mocked auth. No real credentials are checked or stored.
  login: (values) => delay({ success: true, role: 'member', ...values }, 700),
  register: (values) => delay({ success: true, ...values }, 700),
  requestPasswordReset: (email) => delay({ success: true, email }, 700),

  submitContact: (values) => delay({ success: true, ...values }, 700),
  subscribeNewsletter: (email) => delay({ success: true, email }, 500),

  // -- Admin panel -----------------------------------------------------
  getKpis: () => delay(kpis),
  getRevenueTrend: (range = '30d') => delay(revenueTrend[range] ?? revenueTrend['30d']),
  getPlanDistribution: () => delay(planDistribution),
  getActivityFeed: () => delay(activityFeed),
  getExpiringMembers: () => delay(expiringMembers),
  getMembers: () => delay(members),
  updateMember: (id, patch) => delay({ success: true, id, ...patch }, 600),
  getCoupons: () => delay(coupons),
  getContactMessages: () => delay(contactMessages),
  getBkashTransactions: () => delay(bkashTransactions),
  getAttendanceByHour: () => delay(attendanceByHour),
  getCheckIns: () => delay(checkIns),

  // Generic mocked mutations for admin quick-edit drawers (blogs, gallery,
  // coupons, messages, faqs, trainers). No server exists yet -- these
  // simulate success/failure so the UI flow is fully real.
  saveRecord: (collection, record) => delay({ success: true, collection, record }, 600),
  deleteRecord: (collection, id) => delay({ success: true, collection, id }, 500),
  exportReport: (reportType) => delay({ success: true, reportType, generatedAt: new Date().toISOString() }, 900),

  // -- Member panel ------------------------------------------------------
  getMemberProfile: () => delay(memberProfile),
  getProgressLogs: () => delay(progressLogs),
  addProgressLog: (log) => delay({ success: true, log }, 600),
  getNutritionPlan: () => delay(nutritionPlan),
  getMyBookings: () => delay(myBookings),
  bookClass: (classId) => delay({ success: true, classId }, 600),
  cancelBooking: (bookingId) => delay({ success: true, bookingId }, 500),
  getMyPayments: () => delay(myPayments),
  getNotifications: () => delay(notifications),
  getAchievements: () => delay(achievements),
}
