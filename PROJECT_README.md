# Fit Elegant Gym & Café — Frontend

A frontend-only React application for Fit Elegant Gym & Café, a gym in Dhaka,
Bangladesh. This repository contains the **public marketing site**, the
**admin panel**, and the **member panel** described in the build brief —
all running on mocked/static data. There is no backend or database in this
project; one will be connected later, separately.

## Tech stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion (+ a small amount of GSAP-style scroll work handled via Framer Motion/CSS)
- React Router v6
- TanStack Query (against a mocked async data layer)
- React Hook Form + Zod
- Axios (configured, unused until a real backend exists)
- Recharts (admin/member dashboards)
- jsPDF / xlsx (client-side PDF & Excel report export)

## Getting started

```bash
cd client
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

```bash
npm run build      # production build to client/dist, then generates sitemap.xml + robots.txt
npm run preview     # preview the production build locally
npm run lint         # ESLint
```

## Environment variables

Copy `client/.env.example` to `client/.env` and fill in real values when ready:

| Variable | Purpose |
|---|---|
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for image/video uploads |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Unsigned upload preset for client-side Cloudinary uploads |
| `VITE_GOOGLE_MAPS_EMBED_KEY` | Optional — only needed if you switch the Contact section's map embed to an API-key-based embed |
| `VITE_WHATSAPP_NUMBER` | Real WhatsApp number for the floating contact button |
| `VITE_FB_PAGE_URL` | Facebook page URL |
| `VITE_API_BASE_URL` | Reserved for when a real backend exists — currently unused |
| `VITE_SITE_URL` | Used only by `scripts/generate-sitemap.mjs` at build time |

Nothing in the app will break if these are left empty — components fall back
to placeholder images/behavior (see "Placeholder content" below).

## Project structure

```
client/
  src/
    components/        Shared UI library (PillButton, FlatCard, Modal, Toast,
                        Skeleton, Badge, Stepper, Timeline, EmptyState,
                        StatCounter, GaugeBadge, MarqueeRibbon, SectionWrapper,
                        WhatsAppFAB, DashboardSidebar/Topbar, Drawer, etc.)
    components/layout/  PublicLayout, AdminLayout, MemberLayout
    components/admin/   Admin-only building blocks (KPICard)
    pages/               Public marketing site pages
    pages/sections/      Landing page sections (Hero, About, Plans, ...)
    pages/admin/         Admin panel screens
    pages/member/        Member panel screens
    data/                Mock data (mockData.js, adminMockData.js, memberMockData.js)
    lib/                 api.js (mocked async layer), constants.js (placeholder
                         tokens), AuthContext.jsx (mocked session), seo.js,
                         cloudinary.js
    hooks/               useReducedMotion, useCountUp, usePagination
  scripts/
    generate-sitemap.mjs Runs after `npm run build` to emit sitemap.xml + robots.txt
```

## Routes

**Public:** `/`, `/plans`, `/trainers/:slug`, `/blog`, `/blog/:slug`, `/login`,
`/register`, `/forgot-password`, `/maintenance`, `/error`, and a catch-all 404.

**Admin** (`/admin/...`, requires the mocked `admin` role): `dashboard`,
`members`, `trainers`, `plans`, `classes`, `payments`, `reviews`, `blogs`,
`gallery`, `coupons`, `messages`, `faqs`, `reports`, `settings`.

**Member** (`/member/...`, requires the mocked `member` or `trainer` role):
`dashboard`, `card`, `progress`, `nutrition`, `booking`, `payments`,
`notifications`, `achievements`, `settings`.

Admin and member routes are code-split into separate bundles — visiting the
public site never downloads either panel's JavaScript.

## Everything is mocked — how to demo it

There is no backend. Authentication is simulated: the **Login** page has a
"Sign in as" selector (Member / Trainer / Admin) purely for demoing the three
different panels — this selector is clearly labeled as demo-only and will be
replaced by real role data once a backend exists. Signing in stores a mock
session in `localStorage` via `src/lib/AuthContext.jsx`; signing out (in
either dashboard sidebar) clears it.

All list/detail data — members, trainers, classes, plans, blog posts,
reviews, coupons, messages, bKash transactions, progress logs, etc. — comes
from `src/data/*.js` through a fake async API in `src/lib/api.js`. Every
function there returns a real Promise with an artificial network delay, so
loading states are visible and the eventual swap to a real backend only
requires changing what's *inside* each function, not any component code.

## Placeholder content

Anything not yet provided by the client (real pricing, trainer bios/photos,
gym hours, address, blog copy, testimonials, gallery photos) is filled in
with clearly-labeled placeholder tokens — see `src/lib/constants.js` for the
single source of truth on business info, and `src/data/mockData.js` /
`adminMockData.js` / `memberMockData.js` for content collections. Sample
testimonials are flagged `isSample: true` in the data layer (not shown as a
public badge) so they're easy to find and swap for real reviews later.

## Payments

bKash is the only payment method in this project. The QR code, merchant
number, and Transaction-ID submission flow are treated as an existing,
already-built flow per the brief — this repo only reflects that flow in the
UI (Payments screens in both the admin and member panels). No payment
gateway of any kind is integrated.

## Known environment limitation for this build

This project was authored in a sandboxed environment without npm registry
access, so dependencies were never installed and the dev server was never
run here. Every file was hand-written and checked for import correctness and
brace/paren balance, but please run `npm install && npm run dev` as your
first step and report anything that doesn't compile — it will be fixed
immediately.

## Roadmap

See [`ROADMAP.md`](./ROADMAP.md) for documented-but-not-built future scope
(backend integration, QR attendance scanning, SMS OTP, referral rewards,
push notifications, AI recommendations, and more).

## User guide

See [`USERGUIDE.md`](./USERGUIDE.md) for a walkthrough of using the site as a
visitor, member, and admin.
