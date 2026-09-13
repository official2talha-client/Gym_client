// ---------------------------------------------------------------------------
// Admin panel mock data. Same rules as src/data/mockData.js: placeholder
// values only, structured the way a real API response would be.
// ---------------------------------------------------------------------------

export const kpis = [
  { id: 'revenue', label: 'Revenue (30d)', value: 486000, delta: 8.4, format: 'bdt', sparkline: [40, 55, 48, 62, 58, 70, 66, 74, 80, 78, 88, 92] },
  { id: 'active', label: 'Active Members', value: 1284, delta: 3.1, format: 'number', sparkline: [1180, 1190, 1205, 1210, 1225, 1240, 1235, 1250, 1260, 1270, 1275, 1284] },
  { id: 'signups', label: 'New Sign-ups (30d)', value: 96, delta: 12.7, format: 'number', sparkline: [4, 6, 5, 8, 7, 9, 6, 10, 8, 11, 9, 13] },
  { id: 'attendance', label: 'Attendance Today', value: 214, delta: -2.3, format: 'number', sparkline: [180, 190, 200, 195, 210, 205, 220, 215, 225, 218, 222, 214] },
  { id: 'expiring', label: 'Expiring This Week', value: 23, delta: 5.0, format: 'number', sparkline: [12, 14, 15, 13, 18, 17, 19, 20, 18, 21, 22, 23] },
]

export const revenueTrend = {
  '7d': [
    { label: 'Mon', value: 62000 }, { label: 'Tue', value: 58000 }, { label: 'Wed', value: 71000 },
    { label: 'Thu', value: 68000 }, { label: 'Fri', value: 82000 }, { label: 'Sat', value: 95000 }, { label: 'Sun', value: 74000 },
  ],
  '30d': Array.from({ length: 30 }).map((_, i) => ({ label: `${i + 1}`, value: 12000 + Math.round(Math.sin(i / 3) * 4000 + i * 900) })),
  '90d': Array.from({ length: 12 }).map((_, i) => ({ label: `W${i + 1}`, value: 180000 + Math.round(Math.sin(i / 2) * 30000 + i * 6000) })),
  '1y': ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => ({ label: m, value: 400000 + Math.round(Math.sin(i / 2) * 60000 + i * 8000) })),
}

export const planDistribution = [
  { name: 'Basic', value: 420, color: '#B8ADA6' },
  { name: 'Elegant', value: 610, color: '#F56A1F' },
  { name: 'Elite', value: 254, color: '#F97316' },
]

export const activityFeed = [
  { id: 'act1', icon: '💳', text: 'Member A. renewed the Elegant plan', time: '12 minutes ago' },
  { id: 'act2', icon: '🆕', text: 'New sign-up: Member D. joined on the Basic plan', time: '48 minutes ago' },
  { id: 'act3', icon: '📅', text: 'HIIT Burn class fully booked for Saturday, 6:00 PM', time: '2 hours ago' },
  { id: 'act4', icon: '⚠️', text: '3 memberships are expiring in the next 48 hours', time: '3 hours ago' },
  { id: 'act5', icon: '💬', text: 'New contact message received from the website', time: '5 hours ago' },
]

export const expiringMembers = [
  { id: 'em1', name: 'Member E.', plan: 'Elegant', daysLeft: 2, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop' },
  { id: 'em2', name: 'Member F.', plan: 'Basic', daysLeft: 3, avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&auto=format&fit=crop' },
  { id: 'em3', name: 'Member G.', plan: 'Elite', daysLeft: 5, avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=100&auto=format&fit=crop' },
  { id: 'em4', name: 'Member H.', plan: 'Elegant', daysLeft: 6, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop' },
]

export const members = [
  { id: 'm1', name: 'Member A.', email: 'membera@example.com', phone: '+880 1XXX-XXXXXX', plan: 'Elegant', status: 'active', daysLeft: 18, joined: '2025-11-02', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop', attendanceRate: 82 },
  { id: 'm2', name: 'Member B.', email: 'memberb@example.com', phone: '+880 1XXX-XXXXXX', plan: 'Basic', status: 'active', daysLeft: 27, joined: '2025-09-14', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop', attendanceRate: 64 },
  { id: 'm3', name: 'Member C.', email: 'memberc@example.com', phone: '+880 1XXX-XXXXXX', plan: 'Elite', status: 'frozen', daysLeft: 0, joined: '2025-06-30', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200&auto=format&fit=crop', attendanceRate: 41 },
  { id: 'm4', name: 'Member D.', email: 'memberd@example.com', phone: '+880 1XXX-XXXXXX', plan: 'Basic', status: 'active', daysLeft: 30, joined: '2026-06-30', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop', attendanceRate: 90 },
  { id: 'm5', name: 'Member E.', email: 'membere@example.com', phone: '+880 1XXX-XXXXXX', plan: 'Elegant', status: 'active', daysLeft: 2, joined: '2025-03-18', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop', attendanceRate: 55 },
  { id: 'm6', name: 'Member F.', email: 'memberf@example.com', phone: '+880 1XXX-XXXXXX', plan: 'Basic', status: 'expired', daysLeft: -4, joined: '2025-01-22', avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&auto=format&fit=crop', attendanceRate: 12 },
]

export const coupons = [
  { id: 'cp1', code: 'SAMPLE10', discount: '10%', usage: '42 / 100', status: 'active' },
  { id: 'cp2', code: 'WELCOME20', discount: '20%', usage: '18 / 50', status: 'active' },
  { id: 'cp3', code: 'EXPIRED5', discount: '5%', usage: '9 / 20', status: 'expired' },
]

export const contactMessages = [
  { id: 'msg1', name: 'Member A.', phone: '+880 1XXX-XXXXXX', message: 'Sample — pending real content. Interested in the Elite plan, can I get a callback?', status: 'unread', time: '1 hour ago' },
  { id: 'msg2', name: 'Member B.', phone: '+880 1XXX-XXXXXX', message: 'Sample — pending real content. What are your Friday hours?', status: 'read', time: 'Yesterday' },
  { id: 'msg3', name: 'Member C.', phone: '+880 1XXX-XXXXXX', message: 'Sample — pending real content. Do you offer student discounts?', status: 'read', time: '3 days ago' },
]

export const bkashTransactions = [
  { id: 'tx1', member: 'Member A.', trxId: 'SAMPLE8X92KQ', amount: 4000, status: 'pending', time: '20 minutes ago' },
  { id: 'tx2', member: 'Member D.', trxId: 'SAMPLE7A31LM', amount: 2500, status: 'verified', time: '2 hours ago' },
  { id: 'tx3', member: 'Member E.', trxId: 'SAMPLE9C05RT', amount: 4000, status: 'pending', time: '5 hours ago' },
  { id: 'tx4', member: 'Member F.', trxId: 'SAMPLE2D88UV', amount: 6500, status: 'rejected', time: '1 day ago' },
]

export const attendanceByHour = [
  { hour: '6a', count: 12 }, { hour: '7a', count: 28 }, { hour: '8a', count: 22 }, { hour: '9a', count: 14 },
  { hour: '10a', count: 9 }, { hour: '5p', count: 18 }, { hour: '6p', count: 34 }, { hour: '7p', count: 41 },
  { hour: '8p', count: 30 }, { hour: '9p', count: 16 },
]

export const checkIns = [
  { id: 'ci1', name: 'Member A.', class: 'Strength Foundations', time: '7:02 AM' },
  { id: 'ci2', name: 'Member D.', class: 'Strength Foundations', time: '7:05 AM' },
  { id: 'ci3', name: 'Member B.', class: 'HIIT Burn', time: '6:01 PM' },
  { id: 'ci4', name: 'Member E.', class: 'HIIT Burn', time: '6:04 PM' },
]
