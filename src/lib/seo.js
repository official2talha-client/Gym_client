import { useEffect } from 'react'
import { GYM_NAME } from './constants'

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Sets per-page <title>, meta description, and Open Graph / Twitter Card
 * tags. Called once per page component. Since this is a static SPA (no
 * server-side rendering), these tags update on navigation for crawlers
 * that execute JS and for link-preview tools that re-fetch after render.
 */
export function useDocumentHead({ title, description, image, type = 'website' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${GYM_NAME}` : GYM_NAME
    document.title = fullTitle

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    if (image) setMeta('property', 'og:image', image)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    if (image) setMeta('name', 'twitter:image', image)
  }, [title, description, image, type])
}

/** Injects a JSON-LD <script> block for structured data (called once, on Landing). */
export function useJsonLd(data) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
    return () => document.head.removeChild(script)
  }, [data])
}
