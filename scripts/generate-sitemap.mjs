// Generates sitemap.xml and robots.txt into dist/ at build time, so neither
// file is hand-maintained. Run automatically via the "postbuild" npm script.
// Blog post slugs are pulled from the same mock data used by the app itself
// -- once a real backend exists, swap this loop for an API/DB query.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '../dist')

const SITE_URL = process.env.VITE_SITE_URL || 'https://www.fitelegant.example'

const STATIC_ROUTES = ['/', '/plans', '/blog', '/login', '/register', '/forgot-password']

// Mirrors src/data/mockData.js blog slugs + trainer slugs without importing
// JSX-adjacent modules into this plain Node script.
const BLOG_SLUGS = ['sample-progressive-overload', 'sample-recovery-basics', 'sample-cafe-nutrition']
const TRAINER_SLUGS = ['sample-trainer-1', 'sample-trainer-2', 'sample-trainer-3', 'sample-trainer-4']

const routes = [
  ...STATIC_ROUTES,
  ...BLOG_SLUGS.map((s) => `/blog/${s}`),
  ...TRAINER_SLUGS.map((s) => `/trainers/${s}`),
]

const urls = routes
  .map((route) => `  <url><loc>${SITE_URL}${route}</loc><changefreq>weekly</changefreq></url>`)
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

const robots = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /member\n\nSitemap: ${SITE_URL}/sitemap.xml\n`

writeFileSync(resolve(distDir, 'sitemap.xml'), sitemap)
writeFileSync(resolve(distDir, 'robots.txt'), robots)

console.log(`Generated sitemap.xml (${routes.length} routes) and robots.txt in dist/`)
