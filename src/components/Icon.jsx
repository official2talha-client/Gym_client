// Small, consistent-stroke icon set used across the admin and member
// sidebars. Kept as inline SVG (no external icon package) to avoid an
// extra dependency for ~15 glyphs.
const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const Icon = {
  dashboard: (p) => <svg {...base} {...p}><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>,
  members: (p) => <svg {...base} {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="8" r="2.6" /><path d="M15.5 14.2c2.6.4 4.5 2.7 4.5 5.3" /></svg>,
  trainers: (p) => <svg {...base} {...p}><path d="M6 7h2M16 7h2M6 17h2M16 17h2" /><rect x="8" y="9" width="8" height="6" rx="1" /><path d="M4 9v6M20 9v6" /></svg>,
  plans: (p) => <svg {...base} {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9h10M7 13h6" /></svg>,
  classes: (p) => <svg {...base} {...p}><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>,
  payments: (p) => <svg {...base} {...p}><rect x="2" y="6" width="20" height="13" rx="2" /><path d="M2 10h20M6 15h4" /></svg>,
  reviews: (p) => <svg {...base} {...p}><path d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z" /></svg>,
  blogs: (p) => <svg {...base} {...p}><path d="M4 4h13a3 3 0 013 3v13H7a3 3 0 01-3-3V4z" /><path d="M8 9h8M8 13h5" /></svg>,
  gallery: (p) => <svg {...base} {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="M21 16l-5.5-5.5L4 21" /></svg>,
  coupons: (p) => <svg {...base} {...p}><path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 000-4V8z" /><path d="M9 6v12" strokeDasharray="2 2" /></svg>,
  messages: (p) => <svg {...base} {...p}><path d="M21 15a2 2 0 01-2 2H8l-5 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
  faqs: (p) => <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5" /><circle cx="12" cy="16.5" r="0.6" fill="currentColor" /></svg>,
  settings: (p) => <svg {...base} {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>,
  reports: (p) => <svg {...base} {...p}><path d="M4 20V10M10 20V4M16 20v-7M20 20H4" /></svg>,
  logout: (p) => <svg {...base} {...p}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></svg>,
  card: (p) => <svg {...base} {...p}><rect x="2" y="6" width="20" height="13" rx="2" /><path d="M2 10h20" /></svg>,
  progress: (p) => <svg {...base} {...p}><path d="M4 20V10M10 20V4M16 20v-7M20 20H4" /></svg>,
  nutrition: (p) => <svg {...base} {...p}><path d="M12 3a6 6 0 016 6c0 5-3 8-6 12-3-4-6-7-6-12a6 6 0 016-6z" /></svg>,
  booking: (p) => <svg {...base} {...p}><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M8 14h3" /></svg>,
  bell: (p) => <svg {...base} {...p}><path d="M6 9a6 6 0 0112 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9z" /><path d="M10 19a2 2 0 004 0" /></svg>,
  achievements: (p) => <svg {...base} {...p}><circle cx="12" cy="9" r="5" /><path d="M9 13.5L7 21l5-3 5 3-2-7.5" /></svg>,
  menu: (p) => <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>,
  close: (p) => <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>,
  membership: (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 9h18M7 14h4" />
    <circle cx="17" cy="14" r="1.5" />
  </svg>

),
 video: (p) => <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <polygon points="5 3 19 12 5 21 5 3" />
</svg>,


purchase: (p) => (
  <svg {...base} {...p}>
    <path d="M6 3h12l2 18H4L6 3Z" />
    <path d="M9 7a3 3 0 0 0 6 0M8 12h8M8 16h5" />
  </svg>
),

}
